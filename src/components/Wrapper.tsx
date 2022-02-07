import { FC } from "react";
import Content from "./Content";
import SearchBar from "./SearchBar";

interface WrapperProps {}

const Wrapper: FC<WrapperProps> = () => {
  return (
    <>
      <div className='main_content h-screen grid grid-rows-8 w-full items-center justify-items-center'>
        <h1 className='h-10 row-span-1 text-3xl font-bold mt-7'>Weather App</h1>
        <div className='search_bar row-span-1'>
          <SearchBar />
        </div>
        <div className='content row-span-6'>
          <Content />
        </div>
      </div>
    </>
  );
};

export default Wrapper;
