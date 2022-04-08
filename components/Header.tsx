import React from "react";
import { DatePeriodStore } from "../stores/datePeriodStore";
import { DatePeriod } from "../types/datePeriod";
import DatePeriodSelector from "./DatePeriodSelector";

const calculateDatePeriodText = (datePeriod: DatePeriod): string => {
  switch (datePeriod) {
    case DatePeriod.LAST_SEVEN_DAYS:
      return "Last 7 Days";
    case DatePeriod.LAST_FOURTEEN_DAYS:
      return "Last 14 Days";
    case DatePeriod.LAST_THIRTY_DAYS:
      return "Last 30 Days";
    case DatePeriod.LAST_NINETY_DAYS:
      return "Last 90 Days";
  }
};

interface HeaderProps {
  appName: string;
}

const Header: React.FC<HeaderProps> = ({ appName }) => {
  const datePeriod = DatePeriodStore.useState((s) => s.datePeriod);
  const [datePeriodText, setDatePeriodText] = React.useState(
    calculateDatePeriodText(datePeriod)
  );
  React.useEffect(() => {
    setDatePeriodText(calculateDatePeriodText(datePeriod));
  }, [datePeriod]);

  return (
    <header className="sticky top-0 z-10 py-1 px-5 bg-[#007abc] drop-shadow-lg flex justify-between items-center">
      <span className="text-xl text-white opacity-75">{appName}</span>
      <span className="text-sm text-white opacity-50">{datePeriodText}</span>
      <DatePeriodSelector />
    </header>
  );
};

export default Header;
