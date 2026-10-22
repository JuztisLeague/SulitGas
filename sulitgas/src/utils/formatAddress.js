export function formatAddress(station) {
  return [station.road, station.barangay && `Brgy. ${station.barangay}`, station.city]
    .filter(Boolean)
    .join(", ");
}