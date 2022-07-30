import moment, { Moment } from "moment";
import useSWR from "swr";
import { GetServerSideProps } from "next";

interface Daily {
  confirmed: string;
  countryRegion: string;
  deaths: string;
  lastUpdate: Date;
  provinceState: string;
  recovered: string;
}

const getDates = (startDate: string, stopDate: string) => {
  const dateArr: Moment[] = [];
  let currDate = moment(startDate);
  let endDate = moment(stopDate);
  while (currDate < endDate) {
    dateArr.push(moment(currDate.format("MM-DD-YYYY"))._i);
    currDate = moment(currDate).add(1, "days");
  }
  return dateArr;
};

const dates = getDates("1-22-2020", "3-1-2020");

export default function Home({ data }: { data: Daily[][] }) {
  let totalCase = [];
  for (let i = 0; i < data.length; i++) {
    let temp = 0;
    for (let j = 0; j < data[i].length; j++) {
      temp += +data[i][j].confirmed;
    }
    totalCase.push(temp);
  }

  const dateAndCase = totalCase.map((daily, i) => [dates[i], daily]);

  console.log(dateAndCase);

  return <div>Nothing!</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = [];

  for (let i = 0; i < dates.length; i++) {
    const temp = await fetch(
      `https://covid19.mathdro.id/api/daily/${dates[i]}`
    ).then((res) => res.json());
    data.push(temp);
  }

  return {
    props: {
      data,
    },
  };
};
