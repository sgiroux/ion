import useSWR from "swr"
import { CircuitSummary } from "../types/circuitSummary"
import { DatePeriod } from "../types/datePeriod"

export interface CircuitsHookResponse {
  data?: Array<CircuitSummary>,
  error?: any,
}

export const useCircuits = (datePeriod:DatePeriod) : CircuitsHookResponse => {
  const {data, error} = useSWR(`/api/circuits?datePeriod=${datePeriod}`, {
    refreshInterval: 60000, // Refresh every 30 seconds
    shouldRetryOnError: true,
  })

  return {
    data: data,
    error: error,
  }
}
