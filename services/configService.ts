import fs from 'fs';
import { CircuitConfig } from '../types/circuitConfig';

class ConfigService {

  private appName:string = "ion";
  private costPerKWh:number = 0;
  private circuitConfigs:CircuitConfig[] = []
  private isLoaded = false;

  constructor() {
    this.loadAndValidate()
  }

  public getAppName = ():string => {
    return this.appName;
  }

  public getCostPerKWh = ():number => {
    return this.costPerKWh;
  }

  public getCircuitConfigs = (): CircuitConfig[] => {
    return this.circuitConfigs;
  }

  private validateCostPerKWh = (data: any) : number => {
    if (!('costPerKWh' in data)) {
      throw new Error('costPerKWh not found in configuration')
    }

    if (typeof(data.costPerKWh) !== 'number') {
      throw new Error('costPerKWh is not a valid number')
    }

    return data.costPerKWh;
  }

  private validateCircuitConfigs = (data:any) : CircuitConfig[] => {
    if (!('circuits' in data)) {
      throw new Error('circuits not found in configuration')
    }

    if (!(Array.isArray(data.circuits))) {
      throw new Error('circuits is not a valid array')
    }

    const ids:number[] = []
    data.circuits.forEach((circuit:any) => {

      if (!('id' in circuit)) {
        throw new Error('id not found in configuration')
      }

      if (typeof(circuit.id) !== 'number') {
        throw new Error('id is not a number')
      }

      if (circuit.id in ids) {
        throw new Error('circuit id is not a number')
      }
      ids.push(circuit.id)


      if (!('url' in circuit)) {
        throw new Error('url not found in configuration')
      }

      if (typeof(circuit.url) !== 'string') {
        throw new Error('url is not a string')
      }

      if (!('metric' in circuit)) {
        throw new Error('metric not found in configuration')
      }

      if (typeof(circuit.metric) !== 'string') {
        throw new Error('metric is not a string')
      }

      if (!('name' in circuit)) {
        throw new Error('name not found in configuration')
      }

      if (typeof(circuit.name) !== 'string') {
        throw new Error('name is not a string')
      }

      if (!('db' in circuit)) {
        throw new Error('db not found in configuration')
      }

      if (typeof(circuit.db) !== 'string') {
        throw new Error('db is not a string')
      }
    });

    return data.circuits;
  }

  public loadAndValidate = () => {
    if (this.isLoaded === false) {
      try {
        const config_directory = process.env.CONFIG_DIRECTORY ? process.env.CONFIG_DIRECTORY : process.cwd()
        const data = JSON.parse(fs.readFileSync(config_directory+ "/config.json", 'utf-8'));

        // Ensure we have all the configurations set correctly.
        this.costPerKWh = this.validateCostPerKWh(data);
        this.circuitConfigs = this.validateCircuitConfigs(data);
        this.appName = 'ion';
        this.isLoaded = true;
      } catch (e:any) {
        console.error("Error Loading Configuration", e)
        throw new Error(e)
      }
    }

  }
}

const configService = new ConfigService();

export default configService;
