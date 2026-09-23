import {useState} from "react";

export default function ReportForm() {

const [stationName, setStationName] = useState("");
const [fuelType, setFuelType] = useState("diesel");
const [price, setPrice] = useState("");

return (
    <form className="report-form">

        <label className="form-label">
            Station Name
             <input 
                type = "text"
                placeholder = "e.g. Caltex Pilipog Cordova"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                className="form-input"/>
        </label>

        
        <label className="form-label">
            Fuel Type
            <select 
            value={fuelType} 
            onChange={(e) => setFuelType(e.target.value)}
            className="form-input">

                <option value = "diesel">Diesel</option>
                <option value = "gasoline">Gasoline</option>
                <option value = "premium">Premimum</option>
                <option value = "kerosene">Kerosene</option>
            </select>
        </label>
        
        <label className="form-label">
            Fuel price per liter (₱)
            <input 
            type = "number"
            placeholder = "Price per Liter"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"/>
        </label>
        
        <button type="submit">Submit Report</button>
    </form>
)

}