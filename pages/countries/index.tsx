import { useMemo, useState } from "react";
import useSWR from "swr";
import { Counter } from "../../components/Counter";

interface fetchStats {
  updated: Date;
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  };
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
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}

export default function TopNCases() {
  const [search, setSearch] = useState<string>("");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://disease.sh/v3/covid-19/countries",
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <section className="w-full mt-4 flex items-center flex-col justify-center">
      <h1 className="font-black text-4xl text-white text-center">
        Search for cases
      </h1>
      <div className="w-full flex justify-center items-center">
        <input
          className="p-4 w-1/2"
          type="text"
          placeholder="Search a country"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {data &&
        data
          .filter((country: fetchStats) =>
            country.country.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a: fetchStats, b: fetchStats) => b.cases - a.cases)
          .slice(0, 10)
          .map((cases: fetchStats, i: number) => (
            <>
              <h1
                key={i}
                className="text-center font-bold text-white text-4xl my-4"
              >
                {cases.country}
              </h1>
              <div className="grid w-2/3 gap-4 lg:grid-cols-3 lg:grid-rows-1">
                <div className="bg-gray-400 shadow-md shadow-gray-500 p-4 mx-4">
                  <div className="font-bold text-md lg:text-xl">Confirmed</div>
                  <div className="font-black text-lg lg:text-4xl text-right">
                    <Counter from={0} to={cases.cases} />
                  </div>
                </div>

                <div className="bg-green-400 shadow-md shadow-gray-500 p-4 mx-4">
                  <div className="font-bold text-md lg:text-xl">Recovered</div>
                  <div className="font-black text-lg lg:text-4xl text-right">
                    <Counter
                      from={0}
                      to={cases.recovered ? cases.recovered : 0}
                    />
                  </div>
                </div>
                <div className="bg-red-400 shadow-md shadow-gray-500 p-4 mx-4">
                  <div className="font-bold text-md lg:text-xl">Deaths</div>
                  <div className="font-black text-lg lg:text-4xl text-right">
                    <Counter from={0} to={cases.deaths} />
                  </div>
                </div>
              </div>
            </>
          ))}
    </section>
  );
}
