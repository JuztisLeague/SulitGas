export default function StationList ({stations, fuel}) {
    
const sortedStations = [...stations].sort((a, b) => a[fuel] - b[fuel]);

return(
     <ul>
        {sortedStations.map((station)  => (
          <li key={station.name}>
            {station.name} - ₱{station[fuel]}
          </li>
        ))}
      </ul>
)}