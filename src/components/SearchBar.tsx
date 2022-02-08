import { FC, FormEventHandler, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { countryId, cityName } from "../features/country-slice";
import useFetch from "../hooks/useFetch";

interface SearchBarProps {}
interface IError {
  error: boolean;
}

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

export const ShowError: FC<IError> = (props) => {
  if (props.error) {
    return (
      <p className='text-red-300 text-center bg-gray-700 rounded-md py-2'>
        Input should consist letters only
      </p>
    );
  }
  return null;
};

const SearchBar: FC<SearchBarProps> = () => {
  const [input, setInput] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const { data: cities } = useFetch<IState<ILocations[]>>(
    `https://foreca-weather.p.rapidapi.com/location/search/${city}`
  );
  const dispatch = useAppDispatch();

  const cityObj = sessionStorage.getItem("cityObj");

  if (cityObj) {
    const defaultCity = JSON.parse(cityObj);
    dispatch(cityName(defaultCity.city));
    dispatch(countryId(parseInt(defaultCity.id)));
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const letters = /^[a-zA-Z\s]*$/;
    if (input.match(letters)) {
      setCity(input);
      setError(false);
    } else {
      setCity("");
      setError(true);
    }
  };

  const handleSelectCityId = (id: number, city: string) => {
    dispatch(countryId(id));
    dispatch(cityName(city));
    sessionStorage.setItem("cityObj", JSON.stringify({ id, city }));

    console.log("City entered: ", city);

    setInput("");
    setCity("");
  };

  return (
    <>
      <form autoComplete='off' className='' onSubmit={handleSubmit}>
        <div className='bg-white h-10 w-72 relative rounded-md'>
          <input
            autoComplete='off'
            className='inpt'
            type='text'
            placeholder='Enter City'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={30}
          />
          <button type='submit' className='absolute p-1 mx-2 right-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 my-1 text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </button>

          <ShowError error={error} />

          <ul className='bg-neutral-600 rounded-md absolute overflow-auto w-72 z-10'>
            {cities?.locations?.slice(0, 5).map((city) => {
              return (
                <li
                  className='hover:bg-neutral-700 bg-opacity-10 px-3 py-1'
                  key={city.id}
                  onClick={() => handleSelectCityId(city.id, city.name)}
                >
                  {city.name}
                </li>
              );
            })}
          </ul>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
