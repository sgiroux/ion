import { Circuit } from "./circuit";

export type ApplicationConfig = {
  appName: string,
  circuits: Circuit[],
  costPerKWh: number
}
