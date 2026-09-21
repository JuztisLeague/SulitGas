import {useState} from "react";
import {stations} from "./data/stations";
import FuelToggle from "./FuelToggle";
import StationList from "./StationList";

export default function App() {

  const [fuel, setFuel] = useState("diesel");


  return (
    <div>
    <h1>SulitGas Watch</h1>
    <FuelToggle fuel={fuel} setFuel={setFuel} />
    <StationList stations = {stations} fuel = {fuel}/>
    </div>
  );
}