import { FC, FormEventHandler, useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { countryId } from "../features/country-slice";
import useFetch from "../hooks/useFetch";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => {
  const [input, setInput] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const { data: cities } = useFetch(
    `https://foreca-weather.p.rapidapi.com/location/search/${city}`
  );
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const letters = /^[A-Za-z]+$/;
    if (input.match(letters) && input.length <= 30) {
      setCity(input);
    } else {
      console.log("Input should be letters only and up to 30 symbols");
    }
  };

  const handleSelectCityId = (val: number) => {
    dispatch(countryId(val));
    setInput("");
    setCity("");
    console.log("handle clikc val", val);
  };

  useEffect(() => {
    cities?.locations.forEach((loc) => console.log(loc));
    console.log("cities data", cities?.locations);
    console.log('cityies', cities);
    
  }, [cities]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            placeholder='Enter City'
            name='city'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete='given-name'
          />
          <button type='submit'>Search</button>
        </div>
      </form>
      <ul>
        {/* {cities?.locations.map((city) => {
          return (
            <li key={city.id} onClick={() => handleSelectCityId(city.id)}>
              {city.name}
            </li>
          );
        })} */}
      </ul>
    </>
  );
};

export default SearchBar;
