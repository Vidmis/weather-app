import { useEffect, useState } from "react";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T>();

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
        .then<T>((res) => {
          return res.json();
        })
        .then((data) => {
          setData(data);
          console.log("passed url ", url);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [url]);

  return { data };
};

export default useFetch;
