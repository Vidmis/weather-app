import { FC, FormEventHandler, useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { countryId, cityName } from "../features/country-slice";
import useFetch from "../hooks/useFetch";

interface SearchBarProps {}

interface ILocations {
  id: number;
  name: string;
  country: string;
  timezone: string;
  adminArea: string;
  lon: number;
  lat: number;
}

interface IState<T> {
  locations: T;
}

const SearchBar: FC<SearchBarProps> = () => {
  const [input, setInput] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const { data: cities } = useFetch<IState<ILocations[]>>(
    `https://foreca-weather.p.rapidapi.com/location/search/${city}`
  );
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const letters = /^[a-zA-Z\s]*$/;
    if (input.match(letters) && input.length <= 30) {
      setCity(input);
    } else {
      console.log("Input should be letters only and up to 30 symbols");
    }
  };

  const handleSelectCityId = (id: number, city: string) => {
    dispatch(countryId(id));
    dispatch(cityName(city));
    setInput("");
    setCity("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className='inpt'
            type='text'
            placeholder='Enter City'
            name='city'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete='given-name'
          />
        </div>
      </form>
      <ul>
        {cities?.locations?.slice(0, 5).map((city) => {
          return (
            <li
              key={city.id}
              onClick={() => handleSelectCityId(city.id, city.name)}
            >
              {city.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SearchBar;
