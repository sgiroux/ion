export type CircuitMetrics = {
  datapoints: Array<CircuitDatapoint>,
  totalConsumption: number,
  totalCost: number
}


export type CircuitDatapoint = {
  timestamp: string,
  value: number
}
