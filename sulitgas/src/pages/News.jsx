import  Gauge  from "../Gauge";
import{news} from "../data/news";


export default function News() {
  function timeAgo(isoString) {
    const minutes = Math.floor((Date.now() - new Date(isoString)) / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours/ 24);
    if (minutes < 60) return `${minutes} mins ago`;
    if (hours < 24) return `${hours} hr ago`;
    return `${days} day ago`;
  }



  return (
    <div>
      <h1 className="app-title">Gas News</h1>
      <div className = "gauge-grid">
        <Gauge label="Diesel" price={58.45} nextWeekPrice={60.55} />
        <Gauge label="Gasoline" price={63.2} nextWeekPrice={62.8} />
        <Gauge label="Premium" price={68.9} nextWeekPrice={68.9} />
        <Gauge label="Kerosene" price={52.1} nextWeekPrice={51.95} />
      </div>

      <div className="news-feed">
        {news.map((item) => (
          <div key={item.id} className="news-card">
            <p className="news-tag">{item.tag}</p>
            <p className="news-headline">{item.headline}</p>
            <p className="news-time">{timeAgo(item.postedAt)}</p>
          </div>

        ))}
      </div>
    </div>
  );
}