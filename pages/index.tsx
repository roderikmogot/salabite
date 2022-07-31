import Head from "next/head";
import { Counter } from "../components/Counter";
import type { GetServerSideProps } from "next";
import Navbar from "../components/Navbar";
import moment from "moment"

interface GlobalData {
  confirmed: {
    detail: string;
    value: number;
  };
  countryDetail: {
    pattern: string;
    example: string;
  };
  dailySummary: string;
  dailyTimeSeries: {
    pattern: string;
    example: string;
  };
  deaths: {
    detail: string;
    value: number;
  };
  image: string;
  lastUpdate: Date;
  recovered: {
    detail: string;
    value: number;
  };
  source: string;
}

const Home = ({ data }: { data: GlobalData }) => {
  const globalData: GlobalData = data;
  console.log(globalData.lastUpdate)
  const lastUpdate = moment(globalData.lastUpdate).toString()

  return (
    <div>
      <h1 className="mt-8 text-center text-4xl lg:text-8xl">
        <span className="not-italic font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-400">COVID-19</span> 🌍
      </h1>

      {/* Global */}
      <section className="w-full mt-4">
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-1">
          <div className="bg-gray-400 shadow-md shadow-gray-500 p-4 mx-4">
            <div className="font-bold text-md lg:text-xl">Confirmed</div>
            <div className="font-black text-lg lg:text-4xl text-right">
              <Counter from={0} to={globalData.confirmed.value} />
            </div>
          </div>
          <div className="bg-green-400 shadow-md shadow-gray-500 p-4 mx-4">
            <div className="font-bold text-md lg:text-xl">Recovered</div>
            <div className="font-black text-lg lg:text-4xl text-right">
              <Counter from={0} to={globalData.recovered.value} />
            </div>
          </div>
          <div className="bg-red-400 shadow-md shadow-gray-500 p-4 mx-4">
            <div className="font-bold text-md lg:text-xl">Deaths</div>
            <div className="font-black text-lg lg:text-4xl text-right">
              <Counter from={0} to={globalData.deaths.value} />
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
  const data = await fetch("https://covid19.mathdro.id/api").then((res) =>
    res.json()
  );
  return {
    props: {
      data,
    },
  };
};
