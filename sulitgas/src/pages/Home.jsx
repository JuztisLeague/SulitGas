import {useState} from "react";
import {stations} from "../data/stations";
import FuelToggle from "../FuelToggle";
import StationList from "../StationList"
import {Link} from "react-router-dom";

export default function Home() {

  const [fuel, setFuel] = useState("diesel");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="app-title">
    <h1>SulitGas Watch</h1>
    <Link to="/report">Report a Price</Link>
     <input 
    type="text"
    placeholder="Search station or area"
    value = {searchTerm}
    onChange ={(e) => setSearchTerm(e.target.value)}
    className="search-input"></input>
    <FuelToggle fuel={fuel} setFuel={setFuel} />
    <StationList stations = {stations} fuel = {fuel} searchTerm = {searchTerm}/>
    </div>
  );
}