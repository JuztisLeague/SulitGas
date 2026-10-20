import {useState} from "react";


export default function ReportForm({ station, onReport }) {
  const fuelTypes = [
    { value: "diesel", label: "Diesel" },
    { value: "gasoline", label: "Gasoline" },
    { value: "premium", label: "Premium" },
    { value: "kerosene", label: "Kerosene" },
  ];

  const [prices, setPrices] = useState({
    diesel: "",
    gasoline: "",
    premium: "",
    kerosene: "",
  });

  const [error, setError] = useState("");

  function handlePriceChange(fuelType, value) {
    setPrices((prev) => ({
      ...prev,
      [fuelType]: value,
    }));
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    const enteredPrices = fuelTypes.filter(
      (fuel) => prices[fuel.value].trim() !== ""
    );

    if (enteredPrices.length === 0) {
      setError("Please enter at least one fuel price.");
      return;
    }

    const invalidPrice = enteredPrices.some(
      (fuel) =>
        !Number.isFinite(Number(prices[fuel.value])) ||
        Number(prices[fuel.value]) <= 0
    );

    if (invalidPrice) {
      setError("Please enter a valid price greater than zero for each filled field.");
      return;
    }

    enteredPrices.forEach((fuel) => {
      onReport({
        id: station.id,
        name: station.name,
        fuelType: fuel.value,
        price: Number(prices[fuel.value]),
      });
    });

    setPrices({
      diesel: "",
      gasoline: "",
      premium: "",
      kerosene: "",
    });

    setError("");
  }

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <div className="manual-form-heading">
        <h2>Enter fuel prices</h2>
        <p>Fill in the prices you know. Leave other fields blank.</p>
      </div>

      <div className="fuel-price-grid">
        {fuelTypes.map((fuel) => (
          <label className="form-label" key={fuel.value}>
            {fuel.label}
            <div className="fuel-price-input">
              <span>₱</span>
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={prices[fuel.value]}
                onChange={(e) =>
                  handlePriceChange(fuel.value, e.target.value)
                }
                className="form-input"
              />
            </div>
          </label>
        ))}
      </div>

      <p className="manual-form-note">
        Only enter prices available at this station.
      </p>

      {error && <p className="manual-form-error">{error}</p>}

      <button type="submit" className="report-cta">
        Submit prices
      </button>
    </form>
  );
}
