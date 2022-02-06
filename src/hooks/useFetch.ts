import { useEffect, useState } from "react";

interface ILocations {
  id: number;
  name: string;
  country: string;
  timezone: string;
  adminArea: string;
  lon: number;
  lat: number;
}
interface ICurrentWeather {
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
}
interface IState<T> {
  data: T;
}

const useFetch = (
  url: string
): {
  data: IState<ILocations[] | ICurrentWeather[]>;
} => {
  let val = {};
  const [data, setData] = useState<IState<ILocations[] | ICurrentWeather[]>>(
    val as IState<ILocations[] | ICurrentWeather[]>
  );

  console.log("fetch data", data);
  

  useEffect(() => {
    if (url !== "") {
      fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
          "x-rapidapi-key":
            "009c2a4f19msh6eb8fa0ec6baf08p1b2e88jsn8f7c887a28ca",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data: IState<ILocations[] | ICurrentWeather[]>) => setData(data))
        .catch((err) => {
          console.error(err);
        });
    }
  }, [url]);

  return { data };
};

export default useFetch;
