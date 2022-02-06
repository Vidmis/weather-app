import { FC } from "react";
import Content from "./Content";
import SearchBar from "./SearchBar";

interface WrapperProps {
    
}
 
const Wrapper: FC<WrapperProps> = () => {
    return (  
        <>
            <div className="main_content">
                <h1>Weather App</h1>
                <SearchBar />
                <Content />
            </div>
        </>
    );
}
 
export default Wrapper;