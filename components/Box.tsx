import { Counter } from "./Counter";

interface BoxType {
  caseType?: "Confirmed" | "Deaths" | "Recovered";
  value: number;
  setTitle?: string;
  customBgColor?: string
  children?: React.ReactNode
  childrenAfterCounter?: boolean
}

const Box = ({ caseType, value, setTitle, customBgColor, children, childrenAfterCounter }: BoxType) => {
  let bgColor = "";
  switch (caseType) {
    case "Confirmed":
      bgColor = "bg-gray-400";
      break;
    case "Deaths":
      bgColor = "bg-red-400";
      break;
    case "Recovered":
      bgColor = "bg-green-400";
      break;
  }
  return (
    <div className={`${customBgColor ? customBgColor : bgColor} rounded-md shadow-md shadow-gray-500 p-4`}>
      <div className="font-bold text-md lg:text-xl">{setTitle ? setTitle : caseType}</div>
      <div className="font-black text-lg lg:text-4xl text-right">
        {childrenAfterCounter ? children : ""}
        <Counter from={0} to={value} />
        {!childrenAfterCounter ? children : ""}
      </div>
    </div>
  );
};

export default Box;
