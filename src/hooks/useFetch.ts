import { useEffect, useState } from "react";

interface Locations {
  id: number;
  name: string;
  country: string;
  timezone: string;
  adminArea: string;
  lon: number;
  lat: number;
}
interface Data {
  locations: Locations[];
}

const useFetch = (url: string) => {
  const [data, setData] = useState<Data[]>([]);

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
        .then((data: Data[]) => setData(data))
        .catch((err) => {
          console.error(err);
        });
    }
  }, [url]);

  return { data };
};

export default useFetch;
