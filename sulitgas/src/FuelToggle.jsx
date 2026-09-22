export default function FuelToggle({ fuel, setFuel }) {
    return (
        <div className="buttonToggle">
      
      <button onClick={() => setFuel("diesel")}
        style = {{ 
          fontWeight: fuel === "diesel" ? "bold" : "normal",
          background: fuel === "diesel" ? "#FFA500" : "#04634F",
          color: fuel === "diesel" ? "#04634F" : "#FFFFFF"
        }}
        >
          Diesel
      </button>

      <button onClick={() => setFuel("gasoline")}
        style = {{ 
          fontWeight: fuel === "gasoline" ? "bold" : "normal",
          background: fuel === "gasoline" ? "#FFA500" : "#04634F",
          color: fuel === "gasoline" ? "#04634F" : "#FFFFFF"
        }}
        >
          Gasoline
      </button>
      <button onClick={() => setFuel("premium")}
        style = {{ 
          fontWeight: fuel === "premium" ? "bold" : "normal",
          background: fuel === "premium" ? "#FFA500" : "#04634F",
          color: fuel === "premium" ? "#04634F" : "#FFFFFF"
        }}
        >
          Premium
      </button>
      <button onClick={() => setFuel("kerosene")}
        style = {{ 
          fontWeight: fuel === "kerosene" ? "bold" : "normal",
          background: fuel === "kerosene" ? "#FFA500" : "#04634F",
          color: fuel === "kerosene" ? "#04634F" : "#FFFFFF"
        }}
        >
          Kerosene
      </button>
      </div>
    );
}