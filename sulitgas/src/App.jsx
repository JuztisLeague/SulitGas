import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import { supabase } from "./supabaseClient";
import NavBar from "./NavBar";
import Home from "./pages/Home";
import Report from "./pages/Report";
import "./App.css";
import News from "./pages/News";

export default function App() {
  const [stations, setStations] = useState([]);
  
  useEffect(() => {
    async function fetchStations() {
      const {data, error} = await supabase.from("stations").select("*");
      if (error) {
        console.log("Error fetching stations, error");
        return;
      }
      setStations(data);
    }
    fetchStations();
  }, []);

 

  async function handleReport(newReport) {
    const existing = stations.find (
      (station) => station.name.toLowerCase() === newReport.name.toLowerCase()
    );

    if (!existing) return;

    const now = new Date().toISOString();

    const{error} = await supabase
    .from("stations")
    .update({
      [newReport.fuelType]: newReport.price,
      reportedAt: now,
    })

    .eq("id", existing.id);

    if (error) {
      console.log("Error updating station:", error);
    }

    setStations((prevStations) => 
      prevStations.map((station) => 
      station.id === existing.id
    ? { ...station, [newReport.fuelType]: newReport.price, reportedAt: now}
    :station
      )
  );
  }
  
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home stations = {stations}/>} />
      <Route path = "/news" element={<News />} />
      <Route path = "/report" element={<Report onReport= {handleReport}/>} />
    </Routes>
    </>
    
  )
}