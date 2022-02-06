import { FC } from "react";
import Content from "./Content";
import SearchBar from "./SearchBar";

interface WrapperProps {}

const Wrapper: FC<WrapperProps> = () => {
  return (
    <>
      <div className='main_content grid grid-cols-1 grid-rows-3 content-center items-center justify-items-center text-center w-4/5'>
        <h1>Weather App</h1>
        <SearchBar />
        <Content />
      </div>
    </>
  );
};

export default Wrapper;
