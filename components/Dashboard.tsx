import React from "react";
import { Circuit } from "../types/circuit";
import CircuitOverview from "./CircuitOverview";
import Header from "./Header";

interface DashboardProps {
  appName: string;
  circuits: Circuit[];
}

const Dashboard: React.FC<DashboardProps> = ({ appName, circuits }) => {
  return (
    <div className="pb-5">
      <Header appName={appName} />
      {circuits.map((circuit: Circuit) => {
        return <CircuitOverview circuit={circuit} key={circuit.id} />;
      })}
    </div>
  );
};

export default Dashboard;
