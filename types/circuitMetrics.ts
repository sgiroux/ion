import { CircuitDatapoint } from "./circuitDatapoint";

export type CircuitMetrics = {
  datapoints: Array<CircuitDatapoint>,
  totalConsumption: number,
  totalCost: number
}


