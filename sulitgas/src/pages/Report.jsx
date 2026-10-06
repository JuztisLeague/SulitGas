import { useParams } from "react-router-dom";
import ReportForm from "../ReportForm";

export default function Report({stations, onReport}) {

  const {stationId} = useParams();
  const station = stations.find((s) => String(s.id) === stationId);

  if (!station) {
    return (
      <div className="report-page">
        <h1 className="app-title">Station Not Found</h1>
      </div>
    )
  }



  return (
    <div className="report-page">
      <h1 className="app-title">Report a price</h1>
      <p style={{ color: "var(--text-muted)", textAlign: "center" }}>{station.name}</p>
      <ReportForm station={station} onReport = {onReport}/>
    </div>
  );
}