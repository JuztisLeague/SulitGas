import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path = "/report" element={<Report />} />
      

    </Routes>
  )
}
