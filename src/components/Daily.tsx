import { FC } from "react";
import useFetch from "../hooks/useFetch";

interface DailyProps {
  countryId: number;
}

interface IForecast {
  forecast: {
    symbol: string;
    date: string;
    symbolPhrase: string;
    maxTemp: number;
    minTemp: number;
    maxFeelsLikeTemp: number;
    minFeelsLikeTemp: number;
    maxRelHumidity: number;
    minRelHumidity: number;
    maxDewPoint: number;
    minDewPoint: number;
    precipAccum: number;
    snowAccum: number;
    maxWindSpeed: number;
    windDir: number;
    maxWindGust: number;
    precipProb: number;
    cloudiness: number;
    sunrise: string;
    sunset: string;
    sunriseEpoch: number;
    sunsetEpoch: number;
    moonrise: string;
    moonset?: any;
    moonPhase: number;
    uvIndex: number;
    minVisibility: number;
    pressure: number;
  }[];
}

const Daily: FC<DailyProps> = ({ countryId }) => {
  const { data: daily } = useFetch<IForecast>(
    `https://foreca-weather.p.rapidapi.com/forecast/daily/${countryId}?alt=0&tempunit=C&windunit=MS&dataset=full`
  );

  const getDayOfWeek = (date: string | number) => {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeek];
  };

  return (
    <div className='sm:max-w-sm w-72 sm:w-fit rounded-lg overflow-auto bg-slate-800 bg-opacity-80 text-white shadow-2xl'>
      <ul className='overflow-x-scroll flex'>
        {daily?.forecast?.map((cast, index) => {
          return (
            <li
              key={index}
              className='flex-none py-6 px-3 first:pl-6 last:pr-6'
            >
              <div className='flex flex-col items-center justify-center gap-6'>
                <p className='text-base'>{getDayOfWeek(cast.date)}</p>
                <div className='flex flex-col gap-1 items-center justify-center'>
                  <p className='text-sm'>
                    {cast.maxTemp}&#176;{" "}
                    <span className='opacity-60'>{cast.minTemp}&#176;</span>
                  </p>
                  <img
                    className='w-12 h-12'
                    src={`img/icons/${cast.symbol}.png`}
                    alt='img'
                  />
                  <p className='text-sm'>
                    {cast.maxWindSpeed}{" "}
                    <span className='text-sm opacity-60'>m/s</span>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Daily;
