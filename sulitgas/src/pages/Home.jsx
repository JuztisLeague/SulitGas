import {useState} from "react";
import FuelToggle from "../FuelToggle";
import StationList from "../StationList"

export default function Home({stations}) {

  const [fuel, setFuel] = useState("diesel");
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="app-title">
    <h1>SulitGas Watch</h1>
     <input 
        type="text"
        placeholder="Search station or area"
        value = {searchTerm}
        onChange ={(e) => setSearchTerm(e.target.value)}
        className="search-input">
      </input>
    <FuelToggle fuel={fuel} setFuel={setFuel} />
    <StationList stations = {stations} fuel = {fuel} searchTerm = {searchTerm}/>
    </div>
  );
}