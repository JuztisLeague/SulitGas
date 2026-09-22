import {Routes, Route} from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./pages/Home";
import Report from "./pages/Report";
import "./App.css";
import News from "./pages/News";
import Ask from "./pages/Ask";

export default function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path = "/news" element={<News />} />
      <Route path = "/report" element={<Report />} />
      <Route path = "/ask" element={<Ask />} />
    </Routes>
    </>
    
  )
}
