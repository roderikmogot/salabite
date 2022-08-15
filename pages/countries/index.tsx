import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import type { Country } from "../../components/types/Country";
import { FaSearch } from "react-icons/fa";
import Box from "../../components/Box";

export default function TopNCases() {
  const [search, setSearch] = useState<string>("");

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: countriesData, error } = useSWR(
    "https://disease.sh/v3/covid-19/countries",
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (!countriesData) {
    return <p>Loading...</p>;
  }

  const flagLoader = ({ src }) => {
    return `https://countryflagsapi.com/png/${src}`;
  };

  return (
    <section className="w-full mt-4 flex items-center flex-col justify-center">
      <h1 className="font-black text-4xl text-white text-center">
        Search for cases
      </h1>
      <div className="w-1/2 relative my-4">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <FaSearch className="text-md text-gray-300" />
        </div>
        <input
          type="search"
          className="block p-4 pl-10 w-full text-sm rounded-md text-gray-900 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
          placeholder="Search for a country"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col items-center">
        {countriesData &&
          countriesData
            .filter(({ country }: Country) =>
              country.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a: Country, b: Country) => b.cases - a.cases)
            .slice(0, 5)
            .map(
              (
                {
                  country,
                  countryInfo,
                  recovered,
                  cases: confirmed,
                  deaths,
                }: Country,
                i: number
              ) => (
                <>
                  <h1
                    key={i}
                    className={`${i > 0 ? "mt-8": ""} text-center font-bold text-white text-4xl my-4 flex items-center gap-4 justify-center`}
                  >
                    {country}
                    <div className="w-8 h-auto">
                      <Image
                        loader={flagLoader}
                        src={countryInfo.iso2}
                        width={500}
                        height={300}
                        className="w-full h-full"
                        alt={country}
                      />
                    </div>
                  </h1>
                  <div className="grid w-2/3 gap-4 lg:grid-cols-3 lg:grid-rows-1">
                    <Box caseType="Confirmed" value={confirmed} />
                    <Box caseType="Recovered" value={recovered ? recovered : 0} />
                    <Box caseType="Deaths" value={deaths} />
                  </div>
                </>
              )
            )}
      </div>
    </section>
  );
}
