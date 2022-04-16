
import axios from "axios";
import moment from "moment";
import { CircuitConfig } from "../types/circuitConfig";
import { CircuitDatapoint } from "../types/circuitDatapoint";
import { CircuitSummary } from "../types/circuitSummary";
import { DatePeriod } from "../types/datePeriod";
import configService from "./configService";


class CircuitService {

  private getCircuitMetrics = async (circuitConfig: CircuitConfig, datePeriod:DatePeriod): Promise<CircuitSummary> => {
    let startDate = null;
    let endDate = null;

    switch (datePeriod) {
      case DatePeriod.LAST_SEVEN_DAYS:
        startDate = moment().subtract(7, 'days')
        endDate = moment().endOf('day')
      break;
      case DatePeriod.LAST_FOURTEEN_DAYS:
        startDate = moment().subtract(14, 'days')
        endDate = moment().endOf('day')
      break;
      case DatePeriod.LAST_THIRTY_DAYS:
        startDate = moment().subtract(30, 'days')
        endDate = moment().endOf('day')
      break;
      case DatePeriod.LAST_SIXTY_DAYS:
        startDate = moment().subtract(60, 'days')
        endDate = moment().endOf('day')
      break;
      case DatePeriod.LAST_NINETY_DAYS:
        startDate = moment().subtract(90, 'days')
        endDate = moment().endOf('day')
      break;
      default:
        console.error("Invalid DatePeriod", datePeriod)
        throw new Error("Invalid Type")
    }

    const query = CircuitService.constructQuery(circuitConfig, startDate!, endDate!)

    const MAX_RESULTS = 1
    const url = CircuitService.constructUrl(circuitConfig, query)
    const response = await CircuitService.makeRequest(url)
    const results = response['data']['results'];

    if (results.length !== MAX_RESULTS) {
      console.error("Error Querying Influx", circuitConfig.metric)
      throw Error("Error Querying")
    }

    for (let i=0; i < MAX_RESULTS; i++) {
      if (!('series' in results[i])) {
        console.error("Error Querying Influx", circuitConfig.metric)
        throw Error("Error Querying")
      }
    }

    const hourlyDatapoints = results[0]['series'][0].values;
    const dailyDatapoints = CircuitService.convertInfluxHourlyDatapointToDaily(hourlyDatapoints)
    const filteredDailyDatapoints = CircuitService.filterDailyDatapoints(dailyDatapoints, startDate, endDate)
    const totalConsumption = filteredDailyDatapoints.reduce((sum, item) => {
      return sum + item.value
    }, 0)

    return {
      circuit: {
        id: circuitConfig.id,
        name: circuitConfig.name
      },
      circuitMetrics: {
        totalConsumption: totalConsumption,
        totalCost: configService.getCostPerKWh() * totalConsumption,
        datapoints: filteredDailyDatapoints
      }
    }
  }

  private static constructQuery = (circuitConfig:CircuitConfig, startDate: moment.Moment, endDate: moment.Moment): string => {
    return `SELECT sum("value") / 1000 FROM "${circuitConfig.metric}" WHERE time >= ${startDate.valueOf()}ms and time <= ${endDate.valueOf()}ms GROUP BY time(1h) fill(0) %3B`;
  }

  public getCircuits = async(datePeriod:DatePeriod): Promise<CircuitSummary[]> => {
    let circuits:Promise<CircuitSummary>[] = [];
    configService.getCircuitConfigs().forEach((value: CircuitConfig) => {
      circuits.push(this.getCircuitMetrics(value, datePeriod))
    });

    return await Promise.all<CircuitSummary>(circuits);
  }

  private static constructUrl = (circuitConfig:CircuitConfig, query:string): string => {
    return `${circuitConfig.url}/query?db=${circuitConfig.db}&u=${circuitConfig.username}&p=${circuitConfig.password}&q=${query}`;
  };

  private static makeRequest = async (url:string):Promise<any> => {
    try {
      const response = await axios.get(url);
      return response
    } catch (err) {
      console.error("Error Querying Influx", url)
      throw new Error("Error Querying Influx")
    }
  }



  private static convertInfluxHourlyDatapointToDaily = (series : Array<Array<any>>) : Array<CircuitDatapoint> => {
    const mappingOfDayToTotals = series.reduce((accumulator:any, item:Array<any>) => {
      const day = moment(item[0]).format('YYYY-MM-DD')
      const value = item[1]
      accumulator[day] = value + (accumulator[day] || 0);
      return accumulator;
    }, {});

    const dailyTotals:Array<CircuitDatapoint> = Object.entries(mappingOfDayToTotals).map((item) => {
      return {
        'timestamp':item[0],
        'value': Number(item[1])
      }
    });

    return dailyTotals
  }

  private static filterDailyDatapoints = (series : Array<CircuitDatapoint>, startDate: moment.Moment, endDate: moment.Moment) : Array<CircuitDatapoint> => {
    const filteredDailyTotals = series.filter(item => {
      const day = moment(item.timestamp)
      return day.isSameOrAfter(startDate) && day.isSameOrBefore(endDate)
    })

    return filteredDailyTotals;
  }
}


const circuitService = new CircuitService()
export default circuitService
