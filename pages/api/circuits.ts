import { NextApiRequest, NextApiResponse } from "next"
import circuitService from "../../services/circuitService"
import configService from "../../services/configService"
import { DatePeriod } from "../../types/datePeriod"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const datePeriod = req.query.datePeriod as DatePeriod
  configService.loadAndValidate()
  const circuits = await circuitService.getCircuits(datePeriod)


  //Create a dictionary of id to metrics
  res.status(200).json(circuits)
}
