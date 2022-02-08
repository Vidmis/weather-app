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

  const cityForConsole = selectedCity?.current;

  console.log("Current weather conditions: ", {
    "Temperature": cityForConsole?.temperature,
    "Wind speed": cityForConsole?.windSpeed,
    "Precipitation": cityForConsole?.precipProb,
    "Humidity": cityForConsole?.relHumidity,
  });

  return (
    <div className='rounded-md relative min-w-0'>
      {cityName && (
        <div className='flex flex-col justify-items-center items-center'>
          <h2 className='mb-4 text-2xl font-bold sm:text-4xl text-center'>
            {cityName}
          </h2>
          <div className='mb-6 sm:mb-20 flex flex-row items-center w-76 sm:w-96 justify-around'>
            {selectedCity && (
              <img
                className='w-12 sm:w-16 mx-1'
                src={`/src/img/icons/${selectedCity?.current?.symbol}.png`}
                alt='symbol'
              />
            )}
            <div className='flex flex-row'>
              <h5 className='font-bold text-6xl'>
                {selectedCity?.current?.temperature}
              </h5>
              <span className='text-2xl font-bold'>&#176;C</span>
              <h5 className='flex flex-col justify-center w-34 sm:w-36 text-xs sm:text-sm ml-2 pl-2 border-l-2'>
                <span>Precipitation: {selectedCity?.current?.precipProb}%</span>
                <span>Humidity: {selectedCity?.current?.relHumidity}%</span>
                <span>Wind: {selectedCity?.current?.windSpeed}m/s</span>
              </h5>
            </div>
          </div>
          <div>
            <Daily countryId={countryId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
