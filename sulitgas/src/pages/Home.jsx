import {useState} from "react";
import FuelToggle from "../FuelToggle";
import StationList from "../StationList"

export default function Home({stations}) {

  const [fuel, setFuel] = useState("diesel");
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState("");

  function handleNearMe() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError("");
        console.log("Got coordinates", position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setLocationError("Couldn't get your location. Check your permissions.");
      }
    );
  }
  
  return (
    <div className="app-title">
    <h1>SulitGas Watch</h1>
      <div className="search-bar">
        <input 
        type="text"
        placeholder="Search station or area"
        value = {searchTerm}
        onChange ={(e) => setSearchTerm(e.target.value)}
        className="search-input"/>
        <button onClick = {handleNearMe} className="report-cta">Near me</button>
      </div>
     

    {locationError && <p style={{color: "var(--bad)"}}>{locationError}</p>}
    <FuelToggle fuel={fuel} setFuel={setFuel} />
    <StationList stations = {stations} fuel = {fuel} searchTerm = {searchTerm}/>
    </div>
  );
}