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


  function handleReport(newReport) {
    setStations((prevStations) => {
      const existingIndex = prevStations.findIndex(
        (station) => station.name.toLowerCase() === newReport.name.toLowerCase()
      );

      if (existingIndex !== -1) {
        const updated = [...prevStations];
        updated[existingIndex] = {...updated[existingIndex],
          [newReport.fuelType]: newReport.price,
        };
        return updated;
      }
      return prevStations;
    });
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
