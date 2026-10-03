import { supabase } from "../supabaseClient";


export async function importOsmStations() {
  const rawStations = await fetchOsmStations();
  const transformed = rawStations.map(transformOsmStation);

  const { data, error } = await supabase.from("stations").insert(transformed);

  if (error) {
    console.log("Import error:", error);
    return;
  }

  console.log("Imported successfully:", transformed.length, "stations");
}

export async function fetchOsmStations() {
  const query = `
    [out:json];
    (
      node["amenity"="fuel"](10.20,123.90,10.36,124.05);
      way["amenity"="fuel"](10.20,123.90,10.36,124.05);
    );
    out center;
  `;

  const url = "https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query);

  const response = await fetch(url);
  const data = await response.json();

  return data.elements;
}

export function transformOsmStation(osmStation) {
  const lat = osmStation.lat ?? osmStation.center.lat;
  const lng = osmStation.lon ?? osmStation.center.lon;
  const tags = osmStation.tags || {};

  return {
    name: tags.name || tags.brand || "Unnamed Station",
    barangay: tags["addr:city"] || tags["addr:suburb"] || "",
    lat: lat,
    lng: lng,
    diesel: 0,
    gasoline: 0,
    premium: 0,
    kerosene: 0,
    brandDiesel: 0,
    brandGasoline: 0,
    brandPremium: 0,
    brandKerosene: 0,
    distanceKm: 0,
    reportedAt: null,
  };
}
