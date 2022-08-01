import { Counter } from "../components/Counter";
import type { GetServerSideProps } from "next";
import moment from "moment";
import Link from "next/link";

export interface GlobalData {
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
  const casesToDeaths = (deaths / cases).toFixed(2);
  const casesToDeathsRatio = (cases / deaths).toFixed(0);
  const casesToRecoveredRatio = ((recovered / cases) * 100).toFixed(0);

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
          <div className="bg-gray-400 shadow-md shadow-gray-500 p-4 mx-4 rounded-md">
            <div className="font-bold text-md lg:text-xl">Total Cases</div>
            <div className="font-black text-lg lg:text-4xl text-right">
              <Counter from={0} to={cases} />
            </div>
          </div>
          <div className="bg-green-400 shadow-md shadow-gray-500 p-4 mx-4 rounded-md">
            <div className="font-bold text-md lg:text-xl">Recovered</div>
            <div className="font-black text-lg lg:text-4xl text-right">
              <Counter from={0} to={recovered} />
            </div>
          </div>
          <div className="bg-red-400 shadow-md shadow-gray-500 p-4 mx-4 rounded-md">
            <div className="font-bold text-md lg:text-xl">Deaths</div>
            <div className="font-black text-lg lg:text-4xl text-right">
              <Counter from={0} to={deaths} />
            </div>
          </div>
        </div>
      </section>

      {/* Other stats */}

      {/* Daily Stats */}
      <section className="mt-8 bg-[#5800FF] p-4 mx-4 rounded-md">
        <section className="w-full">
          <div className="mx-4 text-white font-black text-2xl mb-4 text-center lg:text-4xl lg:text-left">
            Daily
          </div>
          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-1">
            <div className="bg-gray-400 shadow-md shadow-gray-500 p-4 mx-4 rounded-md">
              <div className="font-bold text-md lg:text-xl">Active</div>
              <div className="font-black text-lg lg:text-4xl text-right">
                <Counter from={0} to={+todayCases} />
              </div>
            </div>
            <div className="bg-green-400 shadow-md shadow-gray-500 p-4 mx-4 rounded-md">
              <div className="font-bold text-md lg:text-xl">Recovered</div>
              <div className="font-black text-lg lg:text-4xl text-right">
                <Counter from={0} to={+todayRecovered} />
              </div>
            </div>
            <div className="bg-red-400 shadow-md shadow-gray-500 p-4 mx-4 rounded-md">
              <div className="font-bold text-md lg:text-xl">Death</div>
              <div className="font-black text-lg lg:text-4xl text-right">
                <Counter from={0} to={+todayDeaths} />
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="mt-8 bg-[#0096FF] p-4 mx-4 rounded-md">
        <section className="w-full">
          <div className="mx-4 text-white font-black text-2xl mb-4 text-center lg:text-4xl lg:text-left">
            Metrics
          </div>
          <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-1">
            <div className="bg-teal-400 shadow-md shadow-gray-500 p-4 mx-4 rounded-md">
              <div className="font-bold text-md lg:text-xl">
                World Population
              </div>
              <div className="font-black text-lg lg:text-4xl text-right">
                <Counter from={0} to={+population} />
              </div>
            </div>
            <div className="bg-green-400 shadow-md shadow-gray-500 p-4 mx-4 rounded-md">
              <div className="font-bold text-md lg:text-xl">
                Recovered Ratio
              </div>
              <div className="font-black text-lg lg:text-4xl text-right">
                <Counter from={0} to={+casesToRecoveredRatio} />%{" "}
                <span className="text-xs italic font-normal">
                  of total cases
                </span>
              </div>
            </div>
            <div className="bg-red-400 shadow-md shadow-gray-500 p-4 mx-4 rounded-md">
              <div className="font-bold text-md lg:text-xl">Death Ratio</div>
              <div className="font-black text-lg lg:text-4xl text-right">
                1:
                <Counter from={0} to={+casesToDeathsRatio} />
              </div>
            </div>
          </div>
        </section>
      </section>

      <div className="w-full flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center p-4">
        <div className=" mx-4 font-semibold text-xs md:text-md text-white text-center">
          * Last update: {lastUpdate} *
        </div>
        <div className="p-4 mx-4 text-normal text-white bg-black rounded-md">
          Powered by <Link href="https://disease.sh" passHref><a href="#" target="_blank"><span className="text-blue-500 cursor-pointer">disease.sh</span></a></Link>
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
