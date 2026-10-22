import { supabase } from "../supabaseClient";
import { fetchOsmStations, transformOsmStation } from "./fetchOsmStations";

const EAST_COAST = "10.24,123.80,10.58,124.08";

const keyOf = (lat, lng) => `${Number(lat).toFixed(6)},${Number(lng).toFixed(6)}`;

async function findNewStations() {
  const raw = await fetchOsmStations(EAST_COAST);
  const found = raw
    .map(transformOsmStation)
    .filter((s) => s.name !== "Unnamed Station");

  const { data: existing, error } = await supabase.from("stations").select("lat, lng");
  if (error) throw error;

  const seen = new Set(existing.map((s) => keyOf(s.lat, s.lng)));
  const fresh = [];

  for (const s of found) {
    const k = keyOf(s.lat, s.lng);
    if (seen.has(k)) continue;
    seen.add(k);
    fresh.push(s);
  }

  return { found, fresh };
}

export async function previewMoreStations() {
  const { found, fresh } = await findNewStations();
  console.log(`OSM returned ${found.length} named stations; ${fresh.length} are new.`);
  console.table(
    fresh.map((s) => ({ name: s.name, lat: s.lat, lng: s.lng }))
  );
}

export async function addMoreStations() {
  const { fresh } = await findNewStations();
  if (fresh.length === 0) {
    console.log("Nothing new to add.");
    return;
  }

  const { error } = await supabase.from("stations").insert(fresh);
  if (error) {
    console.log("Insert failed:", error);
    return;
  }
  console.log(`Added ${fresh.length} stations.`);
}