import React from "react";
import { ApplicationConfig } from "../types/applicationConfiguration";
import { GetServerSideProps } from "next";
import Dashboard from "../components/Dashboard";

type IndexPageProps = {
  appConfig: ApplicationConfig;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/config");
    const data: ApplicationConfig = await res.json();
    return {
      props: {
        appConfig: data,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/error",
        statusCode: 307,
      },
    };
  }
};

const IndexPage = ({ appConfig }: IndexPageProps) => {
  return (
    <Dashboard appName={appConfig.appName} circuits={appConfig.circuits} />
  );
};

export default IndexPage;
