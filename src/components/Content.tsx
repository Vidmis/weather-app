import { FC, useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import useFetch from "../hooks/useFetch";

interface ContentProps {}

const Content: FC<ContentProps> = () => {
  const countryId = useAppSelector((state) => state.country.value);
  const { data: selectedCity } = useFetch(
    `https://foreca-weather.p.rapidapi.com/current/${countryId}`
  );

  useEffect(() => {
    console.log("city", selectedCity);
  }, [countryId, selectedCity]);

  return (
    <>
      {countryId && (
        <div>
          <h2>City {selectedCity}</h2>
          <p>20 C</p>
        </div>
      )}
    </>
  );
};

export default Content;
