import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Newspaper} from "lucide-react";
import FuelToggle from "../FuelToggle";
import StationList from "../StationList"
import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import L from "leaflet";

const userIcon = L.divIcon({
  className: "user-dot",
  iconSize: [18, 18],
});

const stationIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FlyToStation({ station }) {
  const map = useMap();

  useEffect(() => {
    if (station) {
      map.flyTo([station.lat, station.lng], 15);
    }
  }, [station, map]);

  return null;
}

export default function Home({stations}) {

  const navigate = useNavigate();

  const [fuel, setFuel] = useState("diesel");
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [selectedStation, setSelectedStation] = useState(null);

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
    <div className="home-page">
      <div className="home-header">
        <div className="home-brand">
          <h1 className="app-title">SulitGas Watch</h1>
          <p>Find better fuel prices near you</p>
        </div>

        <button
          className="news-button"
          onClick={() => navigate("/news")}
          aria-label="Open news"
        >
          <Newspaper size={20} />
          <span>News</span>
        </button>
      </div>
    

    <div className="home-search">

        <div className="search-bar">
        <input 
        type="text"
        placeholder="Search station or area"
        value = {searchTerm}
        onChange ={(e) => setSearchTerm(e.target.value)}
        className="search-input"/>
        <button onClick = {handleNearMe} className="report-cta">Near me</button>
      </div>
    </div>
      {locationError && <p style={{color: "var(--bad)"}}>{locationError}</p>}
      <FuelToggle fuel={fuel} setFuel={setFuel} />

      <div className="home-workspace">
        <section className="home-stations">
           <StationList 
              stations = {stations} 
              fuel = {fuel} 
              searchTerm = {searchTerm} 
              userLocation={userLocation} 
              onSelectStation={setSelectedStation}/>
        </section>

        <section className="home-map">
          <MapContainer 
            center={[10.3157, 123.9054]} 
            zoom={12}
            style={{height: "100%", borderRadius:"1005"}}>
              <TileLayer 
                url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'/>

              <FlyToStation station = {selectedStation} />
              {stations.map((station) => (
                <Marker key = {station.id} position={[station.lat, station.lng]} icon={stationIcon}>
                  <Popup>{station.name}</Popup>
                </Marker>
              ))}

              {userLocation && (
                <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} zIndexOffset={1000}>
                  <Popup>You are here</Popup>
                </Marker>
              )}
          </MapContainer>
        </section>
      </div>
    </div>
  );
}