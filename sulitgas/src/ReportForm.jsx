import {useState} from "react";

export default function ReportForm() {

const [stationName, setStationName] = useState("");

return (
    <form className="report-form">
        <input 
        type = "text"
        placeholder = "Station name"
        value={stationName}
        onChange={(e) => setStationName(e.target.value)}/>
    </form>
)

}