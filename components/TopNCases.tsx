import { useMemo, useState } from "react";
import useSWR from "swr";
import { Counter } from "./Counter";

interface fetchStats {
  provinceState: string;
  countryRegion: string;
  lastUpdate: number;
  lat: number;
  long: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
  admin2: number;
  fips: number;
  combinedKey: string;
  incidentRate: number;
  peopleTested: number;
  peopleHospitalized: number;
  uid: number;
  iso3: string;
  cases28Days: number;
  deaths28Days: number;
  iso2: string;
}

interface stats {
  countryRegion: string;
  confirmed: number;
  recovered: number;
  deaths: number;
}

export default function TopNCases() {
  const [search, setSearch] = useState<string>("");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://covid19.mathdro.id/api/confirmed",
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (!data) {
    return <p>Loading...</p>;
  }

  const countPerCoutry = (data: fetchStats[]): stats[] => {
    const statsPerCountry: stats[] = [];
    for (const { countryRegion, confirmed, deaths, recovered } of data) {
      let hasCountry = false;
      for (let i = 0; i < statsPerCountry.length; i++) {
        if (statsPerCountry[i].countryRegion === countryRegion) {
          statsPerCountry[i] = {
            ...statsPerCountry[i],
            confirmed: confirmed + statsPerCountry[i].confirmed,
            deaths: deaths + statsPerCountry[i].deaths,
            recovered: recovered + statsPerCountry[i].recovered,
          };
          hasCountry = true;
        }
      }
      if (!hasCountry) {
        const addCountry = {
          countryRegion,
          confirmed,
          deaths,
          recovered,
        };
        statsPerCountry.push(addCountry);
      }
    }
    return statsPerCountry;
  };

  const allCountry = countPerCoutry(data);

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
      {allCountry &&
        allCountry
          .filter((country) =>
            country.countryRegion.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => b.confirmed - a.confirmed)
          .slice(0, 10)
          .map((cases, i) => (
            <>
              <h1
                key={i}
                className="text-center font-bold text-white text-4xl my-4"
              >
                {cases.countryRegion}
              </h1>
              <div className="grid w-2/3 gap-4 lg:grid-cols-3 lg:grid-rows-1">
                <div className="bg-gray-400 shadow-md shadow-gray-500 p-4 mx-4">
                  <div className="font-bold text-xl">Confirmed</div>
                  <div className="font-black text-4xl text-right">
                    <Counter from={0} to={cases.confirmed} />
                  </div>
                </div>

                <div className="bg-green-400 shadow-md shadow-gray-500 p-4 mx-4">
                  <div className="font-bold text-xl">Recovered</div>
                  <div className="font-black text-4xl text-right">
                    <Counter
                      from={0}
                      to={cases.recovered ? cases.recovered : 0}
                    />
                  </div>
                </div>
                <div className="bg-red-400 shadow-md shadow-gray-500 p-4 mx-4">
                  <div className="font-bold text-xl">Deaths</div>
                  <div className="font-black text-4xl text-right">
                    <Counter from={0} to={cases.deaths} />
                  </div>
                </div>
              </div>
            </>
          ))}
    </section>
  );
}
