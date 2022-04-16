import React from "react";
import DatePeriodSelector from "./DatePeriodSelector";

interface HeaderProps {
  appName: string;
}

const Header: React.FC<HeaderProps> = ({ appName }) => {
  return (
    <header className="sticky top-0 z-10 py-2 px-5 bg-[#007abc] drop-shadow-lg flex justify-between items-center">
      <span className="text-xl text-white opacity-75">{appName}</span>
      <DatePeriodSelector />
    </header>
  );
};

export default Header;
