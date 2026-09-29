import  Gauge  from "../Gauge";

export default function News() {
  return (
    <div>
      <h1 className="app-title">Gas News</h1>
      <div className = "gauge-grid">
        <Gauge label="Diesel" price={58.45} nextWeekPrice={60.55} />
        <Gauge label="Gasoline" price={63.2} nextWeekPrice={62.8} />
        <Gauge label="Premium" price={68.9} nextWeekPrice={68.9} />
        <Gauge label="Kerosene" price={52.1} nextWeekPrice={51.95} />
      </div>
    </div>
  );
}