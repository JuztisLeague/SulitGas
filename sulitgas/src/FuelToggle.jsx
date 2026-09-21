export default function FuelToggle({ fuel, setFuel }) {
    return (
        <div>
      
      <button onClick={() => setFuel("diesel")}
        style = {{ 
          fontWeight: fuel === "diesel" ? "bold" : "normal",
          color: fuel === "diesel" ? "#FFA500" : "#FFFFFF"
        }}
        >
          Diesel
      </button>

      <button onClick={() => setFuel("gasoline")}
        style = {{ 
          fontWeight: fuel === "gasoline" ? "bold" : "normal",
          color: fuel === "gasoline" ? "#FFA500" : "#FFFFFF"
        }}
        >
          Gasoline
      </button>
      </div>
    );
}