import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import {stations as initialStations} from "./data/stations";
import NavBar from "./NavBar";
import Home from "./pages/Home";
import Report from "./pages/Report";
import "./App.css";
import News from "./pages/News";
import Ask from "./pages/Ask";

export default function App() {
  const [stations, setStations] = useStates(() => {
  const saved = localStorage.getItem("sulitgas-stations");
  return saved ? JSON.parse(saved) : initialStations;
  })
  
  useEffect(() => {
    localStorage.setItem("sulitgas-stations", JSON.stringify(stations));
  }, [stations]);


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
      <Route path = "/ask" element={<Ask />} />
    </Routes>
    </>
    
  )
}
