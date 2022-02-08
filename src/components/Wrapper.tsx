import { FC } from "react";
import Content from "./Content";
import SearchBar from "./SearchBar";

interface WrapperProps {}

const Wrapper: FC<WrapperProps> = () => {
  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 19;

  return (
    <>
      <div className='h-screen p-4 flex items-center justify-center relative overflow-hidden'>
        <div
          className={`flex-1 p-4 rounded-lg bg-day-image shadow-xl max-w-md bg-zinc-700 sm:h-fits ${
            isDayTime
              ? "bg-gradient-to-b from-sky-500 to-green-500"
              : "bg-gradient-to-b from-violet-800 to-sky-700 "
          }`}
        >
          <div className='aspect-w-3 aspect-h-4'>
            <div className='flex flex-col items-center justify-items-center'>
              <div className='search_bar mt-1 sm:mt-5'>
                <SearchBar />
              </div>
              <div className='content absolute bottom-3'>
                <Content />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wrapper;
