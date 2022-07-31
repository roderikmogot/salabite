import Head from "next/head";
import { Counter } from "../components/Counter";
import type { GetServerSideProps } from "next";
import Navbar from "../components/Navbar";
import moment from "moment";

interface GlobalData {
  updated: Date;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
  affectedCountries: number;
}

const Home = ({ data }: { data: GlobalData }) => {
  const globalData: GlobalData = data;
  const lastUpdate = moment(globalData.updated).toString();

  return (
    <div>
      <h1 className="mt-8 text-center text-4xl lg:text-8xl">
        <span className="not-italic font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-400">
          COVID-19
        </span>{" "}
        🌍
      </h1>

      {/* Global */}
      <section className="w-full mt-4">
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-1">
          <div className="bg-gray-400 shadow-md shadow-gray-500 p-4 mx-4">
            <div className="font-bold text-md lg:text-xl">Confirmed</div>
            <div className="font-black text-lg lg:text-4xl text-right">
              <Counter from={0} to={globalData.cases} />
            </div>
          </div>
          <div className="bg-green-400 shadow-md shadow-gray-500 p-4 mx-4">
            <div className="font-bold text-md lg:text-xl">Recovered</div>
            <div className="font-black text-lg lg:text-4xl text-right">
              <Counter from={0} to={globalData.recovered} />
            </div>
          </div>
          <div className="bg-red-400 shadow-md shadow-gray-500 p-4 mx-4">
            <div className="font-bold text-md lg:text-xl">Deaths</div>
            <div className="font-black text-lg lg:text-4xl text-right">
              <Counter from={0} to={globalData.deaths} />
            </div>
          </div>
        </div>
      </section>

      <div className="font-semibold text-sm md:text-md text-white p-4 mx-4 w-full text-center">
        * Last update: {lastUpdate} *
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch("https://disease.sh/v3/covid-19/all").then((res) =>
    res.json()
  );
  return {
    props: {
      data,
    },
  };
};
