import React from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { CircuitsHookResponse, useCircuits } from "../hooks/useCircuits";
import { DatePeriodStore } from "../stores/datePeriodStore";
import { Circuit } from "../types/circuit";
import { CircuitDatapoint } from "../types/circuitMetrics";
import { formatNumber } from "../utils/numberUtil";

type CircuitOverviewProps = {
  circuit: Circuit;
};

const DEFAULT_COST = 200;
const DEFAULT_CONSUMPTION = 200;
const DEFAULT_DATAPOINTS = [
  { timestamp: "1", value: 200 },
  { timestamp: "2", value: 100 },
  { timestamp: "3", value: 50 },
  { timestamp: "4", value: 190 },
  { timestamp: "5", value: 180 },
  { timestamp: "6", value: 20 },
  { timestamp: "7", value: 300 },
  { timestamp: "8", value: 120 },
  { timestamp: "9", value: 100 },
];

const CircuitOverview: React.FC<CircuitOverviewProps> = ({ circuit }) => {
  const datePeriod = DatePeriodStore.useState((s) => s.datePeriod);
  const { data, error }: CircuitsHookResponse = useCircuits(datePeriod);

  const [totalCost, setTotalCost] = React.useState<number>(DEFAULT_COST);
  const [totalConsumption, setTotalConsumption] =
    React.useState<number>(DEFAULT_CONSUMPTION);
  const [datapoints, setDatapoints] =
    React.useState<CircuitDatapoint[]>(DEFAULT_DATAPOINTS);

  const isLoading = !data && !error;

  React.useEffect(() => {
    if (data) {
      const circuitSummary = data.find((c) => c.circuit.id === circuit.id);
      if (circuitSummary) {
        setTotalCost(circuitSummary.circuitMetrics.totalCost);
        setTotalConsumption(circuitSummary?.circuitMetrics.totalConsumption);
        setDatapoints(circuitSummary?.circuitMetrics.datapoints);
      }
    }
  }, [data, circuit.id]);

  return (
    <div className="relative mx-5 mt-5 rounded-lg drop-shadow-sm">
      <div className="bg-white rounded-r-sm h-36">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className={isLoading ? "blur-[12px] animate-pulse" : "opacity-20"}
        >
          <AreaChart
            width={500}
            height={400}
            data={datapoints}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007abc" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#007abc" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#007abc"
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute inset-0 m-3 opacity-60 p-5 w-min bg-[#f4f4f4] drop-shadow-md">
        <span className="block text-3xl text-gray-600 truncate">
          {circuit.name}
        </span>
        <div className={isLoading ? "blur-[4px] animate-pulse" : ""}>
          <span className="text-xl text-[#007abc] block">
            ${formatNumber(totalCost, 2)}
          </span>
          <span className="block text-xs text-gray-400">
            {formatNumber(totalConsumption, 0)} KWh
          </span>
        </div>
      </div>
    </div>
  );
};

export default CircuitOverview;
