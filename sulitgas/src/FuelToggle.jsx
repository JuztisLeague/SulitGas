export default function FuelToggle({ fuel, setFuel }) {
    return (
        <div className="buttonToggle">
      
      <button onClick={() => setFuel("diesel")}
        style = {{ 
          fontWeight: fuel === "diesel" ? "bold" : "normal",
          background: fuel === "diesel" ? "#F5DEB3" : "#003262",
          color: fuel === "diesel" ? "#003262" : "#FFFFFF"
        }}
        >
          Diesel
      </button>

      <button onClick={() => setFuel("gasoline")}
        style = {{ 
          fontWeight: fuel === "gasoline" ? "bold" : "normal",
          background: fuel === "gasoline" ? "#F5DEB3" : "#003262",
          color: fuel === "gasoline" ? "#003262" : "#FFFFFF"
        }}
        >
          Gasoline
      </button>
      <button onClick={() => setFuel("premium")}
        style = {{ 
          fontWeight: fuel === "premium" ? "bold" : "normal",
          background: fuel === "premium" ? "#F5DEB3" : "#003262",
          color: fuel === "premium" ? "#003262" : "#FFFFFF"
        }}
        >
          Premium
      </button>
      <button onClick={() => setFuel("kerosene")}
        style = {{ 
          fontWeight: fuel === "kerosene" ? "bold" : "normal",
          background: fuel === "kerosene" ? "#F5DEB3" : "#003262",
          color: fuel === "kerosene" ? "#003262" : "#FFFFFF"
        }}
        >
          Kerosene
      </button>
      </div>
    );
}