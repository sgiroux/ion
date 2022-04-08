import { Store } from "pullstate";
import { DatePeriod } from "../types/datePeriod";

interface IDatePeriodStore {
  datePeriod: DatePeriod;
}

export const DatePeriodStore = new Store<IDatePeriodStore>({
  datePeriod: DatePeriod.LAST_THIRTY_DAYS,
});
