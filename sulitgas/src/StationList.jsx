export default function StationList ({stations, fuel}) {
    
const sortedStations = [...stations].sort((a, b) => a[fuel] - b[fuel]);

function timeAgo(isoString){
  const minutes = Math.floor((Date.now() - new Date(isoString)) / 60000);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes/60);
  return `${hours} hr ago`;
}

return(
     <ul className="station-list">
        {sortedStations.map((station)  => {

          const brandKey = fuel === "diesel" ? "brandDiesel" : "brandGasoline";
          const diff = station[fuel] - station[brandKey];
          const isAboveBrand = diff > 0.5;

          return(
            <li key={station.name} className="station-card">
            <div className="station-name">{station.name}</div> 
             <div className="station-distance">{station.distanceKm} km away</div>
            <div className="station-price">₱{station[fuel]}</div>
            <span className= {`station-tag ${isAboveBrand ? "bad" : "good"}`}>
              {isAboveBrand
              ? `₱${diff.toFixed(2)} above brand price`
                : "Matches brand price" }
            </span>
            <span className="station-time"> Updated {timeAgo(station.reportedAt)}</span>
          </li>
          );
        })}
      </ul>
)}