import {useState} from "react";

export default function ReportForm({station, onReport}) {

const [fuelType, setFuelType] = useState("diesel");
const [price, setPrice] = useState("");

function handleSubmit(e) {
    e.preventDefault();

    onReport({
       name: station.name,
       fuelType: fuelType,
       price: Number(price) 
    })

    setFuelType("diesel");
    setPrice("");
}

return (
    <form className="report-form" onSubmit={handleSubmit}>

        
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
        
        <button type="submit" className= "report-cta">Submit Report</button>
    </form>
)

}