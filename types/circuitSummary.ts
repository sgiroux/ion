import { Circuit } from "./circuit";
import { CircuitMetrics } from "./circuitMetrics";

export type CircuitSummary = {
  circuit: Circuit,
  circuitMetrics: CircuitMetrics
}
