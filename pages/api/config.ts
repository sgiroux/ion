import { NextApiRequest, NextApiResponse } from "next"
import configService from "../../services/configService"
import { CircuitConfig } from "../../types/circuitConfig"


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  configService.loadAndValidate()
  const costPerKWh = configService.getCostPerKWh()
  const circuitConfigs = configService.getCircuitConfigs().map((circuitConfig: CircuitConfig) => {
    return {
      id: circuitConfig.id,
      name: circuitConfig.name
    }
  })
  const appName = configService.getAppName()

  res.status(200).json({
    appName: appName,
    circuits: circuitConfigs,
    costPerKWh: costPerKWh
  })
}
