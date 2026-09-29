export default function Guage ({label, price, nextWeekPrice}) {

    const isUp = nextWeekPrice > price;
    const isFlat = nextWeekPrice === price;

    return (
        <div className = "gauge-card">
            <div className = "gauge-ring">
                <div className = "gauge-inner">
                    <span className="gauge-price">₱{price}</span>
                </div>
            </div>
            <p className="gauge-label">{label}</p>
            <p className={`gauge-trend ${isFlat ? "flat" : isUp ? "up" : "down"}`}>₱{nextWeekPrice} next week</p>
        </div>
    )

}