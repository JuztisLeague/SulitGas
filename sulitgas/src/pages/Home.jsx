import {useState} from "react";
import FuelToggle from "../FuelToggle";
import StationList from "../StationList"
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L from "leaflet";

const stationIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

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

    <MapContainer 
    center={[10.3157, 123.9054]} 
    zoom={12}
    style={{height: "300px", borderRadius:"12px"}}>
      <TileLayer 
        url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'/>

      {stations.map((station) => (
        <Marker key = {station.id} position={[station.lat, station.lng]} icon={stationIcon}>
          <Popup>{station.name}</Popup>
        </Marker>
      ))}





    </MapContainer>







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
    <StationList stations = {stations} fuel = {fuel} searchTerm = {searchTerm} userLocation={userLocation}/>
    </div>
  );
}