import { supabase } from "../supabaseClient";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function lookupAddress(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2&addressdetails=1`;
  const response = await fetch(url);
  const data = await response.json();
  const a = data.address || {};

  return {
    road: a.road || "",
    barangay: a.suburb || a.village || a.neighbourhood || "",
    city: a.city || a.town || a.municipality || "",
  };
}

export async function testLookup() {
  const { data } = await supabase.from("stations").select("id, name, lat, lng").limit(1);
  const station = data[0];
  const result = await lookupAddress(station.lat, station.lng);
  console.log(station.name, result);
}

export async function enrichStations() {
  const { data: stations, error } = await supabase
    .from("stations")
    .select("id, name, lat, lng")
    .is("city", null)
    .order("id");

  if (error) {
    console.log("Could not load stations:", error);
    return;
  }

  for (const station of stations) {
    try {
      const result = await lookupAddress(station.lat, station.lng);
      const { error: updateError } = await supabase
        .from("stations")
        .update(result)
        .eq("id", station.id);

      if (updateError) {
        console.log("Save failed for", station.id, updateError);
      } else {
        console.log(`Done ${station.id}: ${station.name} -> ${result.barangay}`);
      }
    } catch (e) {
      console.log("Lookup failed for", station.id, e);
    }
    await wait(1100);
  }

  console.log("Finished");
}