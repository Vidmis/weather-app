import { FC } from "react";
import { useAppSelector } from "../app/hooks";
import useFetch from "../hooks/useFetch";

interface ICurrentWeather {
  current: {
    time: string;
    symbol: string;
    symbolPhrase: string;
    temperature: number;
    feelsLikeTemp: number;
    relHumidity: number;
    dewPoint: number;
    windSpeed: number;
    windDirString: string;
    windGust: number;
    precipProb: number;
    precipRate: number;
    cloudiness: number;
    thunderProb: number;
    uvIndex: number;
    pressure: number;
    visibility: number;
  };
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

const Content = () => {
  const { countryId } = useAppSelector((state) => state.country.value);
  const { cityName } = useAppSelector((state) => state.country.value);
  const { data: selectedCity } = useFetch<ICurrentWeather>(
    `https://foreca-weather.p.rapidapi.com/current/${countryId}?tempunit=C`
  );
  const { data: daily } = useFetch<IForecast>(
    `https://foreca-weather.p.rapidapi.com/forecast/daily/${countryId}?tempunit=C`
  );

  daily?.forecast?.map((cast) => console.log(cast.date));

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

  console.log(getDayOfWeek("2022-02-17"), getDayOfWeek(Date.now()));

  return (
    <>
      {cityName && (
        <div>
          <h2>{cityName}</h2>
          <p>
            <span>Current {selectedCity?.current?.temperature}&#176;C </span>
            <img
              src={`/src/img/icons/${selectedCity?.current?.symbol}.png`}
              alt='symbol'
            />
          </p>

          <div>
            {" "}
            <ul>
              {daily?.forecast?.map((cast) => {
                return (
                  <li>
                    <div>
                      <p>{getDayOfWeek(cast.date)}</p>
                      <p>
                        {cast.maxTemp}&#176; {cast.minTemp}&#176; C
                      </p>
                      <img
                        src={`/src/img/icons/${cast.symbol}.png`}
                        alt='symbol'
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
