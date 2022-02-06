import { FC } from "react";
import useFetch from "../hooks/useFetch";

interface DailyProps {
  countryId: number;
}

interface IForecast {
  forecast: {
    date: string;
    maxTemp: number;
    maxWindSpeed: number;
    minTemp: number;
    precipAccum: number;
    symbol: string;
    windDir: number;
  }[];
}

const Daily: FC<DailyProps> = ({ countryId }) => {
  const { data: daily } = useFetch<IForecast>(
    `https://foreca-weather.p.rapidapi.com/forecast/daily/${countryId}?tempunit=C`
  );

  const getDayOfWeek = (date: string | number) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][dayOfWeek];
  };

  return (
    <div className='mx-10'>
      <ul className='flex overflow-x-scroll'>
        {daily?.forecast?.map((cast) => {
          return (
            <li className='flex-shrink-0'>
              <div className='w'>
                <p>{getDayOfWeek(cast.date)}</p>
                <p className='text-3xl font-bold underline'>
                  {cast.maxTemp}&#176; {cast.minTemp}&#176; C
                </p>
                <img src={`/src/img/icons/${cast.symbol}.png`} alt='symbol' />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Daily;
