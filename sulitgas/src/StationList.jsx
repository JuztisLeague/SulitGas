import { getDistanceKm } from "./utils/distance";
import { Link } from "react-router-dom";

export default function StationList({ stations, fuel, searchTerm, userLocation, onSelectStation }) {

  const RADIUS_KM = 5;

    const words = searchTerm
    .toLowerCase()
    .replace(/brgy\.?|barangay/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  let visibleStations = stations.filter((station) => {
    const searchable = [station.name, station.road, station.barangay, station.city]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return words.every((w) => searchable.includes(w));
  });

  if (userLocation) {
    visibleStations = visibleStations
      .map((station) => ({
        ...station,
        distance: getDistanceKm(userLocation.lat, userLocation.lng, station.lat, station.lng),
      }))
      .filter((station) => station.distance <= RADIUS_KM)
      .sort((a, b) => a.distance - b.distance);
  } else {
    const priceOf = (s) => (s[fuel] > 0 ? s[fuel] : Infinity);
    visibleStations = [...visibleStations].sort((a, b) => {
    const pa = priceOf(a);
    const pb = priceOf(b);
    if (pa === pb) return 0;
    return pa < pb ? -1 : 1;
  });
}

  function timeAgo(isoString) {
  const minutes = Math.floor((Date.now() - new Date(isoString)) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} ${days === 1 ? "day" : "days"} ago`;

  const months = Math.floor(days / 30);
  if (days < 365) return `${months} ${months === 1 ? "month" : "months"} ago`;

  const years = Math.floor(days / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}
  return (
    <ul className="station-list">
      {visibleStations.map((station) => {

        const brandKeyMap = {
          diesel: "brandDiesel",
          gasoline: "brandGasoline",
          premium: "brandPremium",
          kerosene: "brandKerosene"
        }
        const brandKey = brandKeyMap[fuel];
        const diff = station[fuel] - station[brandKey];
        const isAboveBrand = diff > 0.5;
        const hasPrice = station[fuel] > 0;
        const displayDistance = userLocation
          ? station.distance.toFixed(1)
          : station.distanceKm;

        return (
          <li key={station.id} className="station-card" onClick={() => onSelectStation(station)}>
            <div className="station-name">{station.name}</div>
            <div className="station-address">
              {[station.road, station.barangay && `Brgy. ${station.barangay}`, station.city]
                .filter(Boolean)
                .join(", ")}
            </div>
            <div className="station-distance">{displayDistance} km away</div>
            <div className="station-price">{hasPrice ? `₱${station[fuel]}` : "No Price yet"}</div>
            {hasPrice ? (
                <span className={`station-tag ${isAboveBrand ? "bad" : "good"}`}>
                  {isAboveBrand ? `₱${diff.toFixed(2)} above brand price` : "Matches brand price"}
                </span>
              ) : (
                <span className="station-tag none">No reports yet</span>
              )}
            {station.reportedAt && <span className="station-time"> Updated {timeAgo(station.reportedAt)}</span>}
            <Link to={`/report/${station.id}`} className="station-report-btn" onClick={(e) => e.stopPropagation()}>Report</Link>
          </li>
        );
      })}
    </ul>
  );
}