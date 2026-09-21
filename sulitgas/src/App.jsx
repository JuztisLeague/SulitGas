import {useState} from "react";
import {stations} from "./data/stations";

export default function App() {

  const [fuel, setFuel] = useState("diesel");

  const sortedStations = [...stations].sort((a, b) => a[fuel] - b[fuel]);

  return (
    <div>
      <h1>SulitGas Watch</h1>

      <button onClick={() => setFuel("diesel")}
        style = {{ 
          fontWeight: fuel === "diesel" ? "bold" : "normal",
          color: fuel === "diesel" ? "#FFA500" : "#FFFFFF"
        }}
        >
          Diesel
      </button>

      <button onClick={() => setFuel("gasoline")}
        style = {{ 
          fontWeight: fuel === "gasoline" ? "bold" : "normal",
          color: fuel === "gasoline" ? "#FFA500" : "#FFFFFF"
        }}
        >
          Gasoline
      </button>

      <ul>
        {sortedStations.map((station)  => (

          <li key={station.name}>
            {station.name} - ₱{station[fuel]}
          </li>
        ))}
      </ul>
    </div>
  );
}