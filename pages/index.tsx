import { Counter } from "../components/Counter";

import moment from "moment";
import Link from "next/link";

import type { GetServerSideProps } from "next";
import type { GlobalData } from "../components/types/Global";
import Box from "../components/Box";

const Home = ({ data }: { data: GlobalData }) => {
  const globalData: GlobalData = data;
  const {
    cases,
    recovered,
    deaths,
    active,
    population,
    todayCases,
    todayRecovered,
    todayDeaths,
  } = globalData;
  const casesToDeathsRatio = (cases / deaths).toFixed(0);
  const casesToRecoveredRatio = ((recovered / cases) * 100).toFixed(0);

  const lastUpdate = moment(globalData.updated).toString();
  const todayDate = moment().toDate().toDateString().split(" ").slice(1).join(" ")

  return (
    <div>
      <h1 className="mt-8 text-center text-4xl lg:text-8xl">
        <span className="not-italic font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-400">
          COVID-19
        </span>
      </h1>

      {/* Global */}
      <section className="w-full mt-4">
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-1 mx-4">
          <Box setTitle="Total Cases" caseType="Confirmed" value={cases} />
          <Box setTitle="Total Recovered" caseType="Recovered" value={recovered} />
          <Box setTitle="Total Deaths" caseType="Deaths" value={deaths} />
        </div>
      </section>

      {/* Daily Stats */}
      <section className="mt-8 bg-[#5800FF] p-4 mx-4 rounded-md">
        <section className="w-full px-2">
          <div className="text-white font-black text-2xl mb-4 text-center lg:text-4xl lg:text-left">
            {todayDate}
          </div>
          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-1">
            <Box caseType="Confirmed" value={+todayCases} />
            <Box caseType="Recovered" value={+todayRecovered} />
            <Box caseType="Deaths" value={+todayDeaths} />
          </div>
        </section>
      </section>

      <section className="mt-8 bg-[#0096FF] p-4 mx-4 rounded-md">
        <section className="w-full px-2">
          <div className="text-white font-black text-2xl mb-4 text-center lg:text-4xl lg:text-left">
            Metrics
          </div>
          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-1">
            <Box setTitle="World Population" customBgColor="bg-teal-400" value={+population} />
            <Box setTitle="Recovered Ratio" caseType="Recovered" value={+casesToRecoveredRatio}>
              %<span className="text-xs italic font-normal"> of total cases</span>
            </Box>
            <Box setTitle="Death Ratio" caseType="Deaths" value={+casesToDeathsRatio} childrenAfterCounter={true}>
              1:
            </Box>
          </div>
        </section>
      </section>

      <div className="w-full flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center p-4">
        <div className=" mx-4 font-semibold text-xs md:text-md text-white text-center">
          * Last update: {lastUpdate} *
        </div>
        <div className="p-4 mx-4 text-normal text-white bg-black rounded-md">
          Powered by{" "}
          <Link href="https://disease.sh" passHref>
            <a href="#" target="_blank">
              <span className="text-blue-500 cursor-pointer">disease.sh</span>
            </a>
          </Link>
        </div>
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
