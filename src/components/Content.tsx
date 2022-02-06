import { useAppSelector } from "../app/hooks";
import useFetch from "../hooks/useFetch";
import Daily from "./Daily";

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

const Content = () => {
  const { countryId } = useAppSelector((state) => state.country.value);
  const { cityName } = useAppSelector((state) => state.country.value);
  const { data: selectedCity } = useFetch<ICurrentWeather>(
    `https://foreca-weather.p.rapidapi.com/current/${countryId}?tempunit=C`
  );

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
            <Daily countryId={countryId} />
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
