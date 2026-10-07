import {useState} from "react";
import { useParams } from "react-router-dom";
import ReportForm from "../ReportForm";
import {PenLine, Camera} from "lucide-react";

export default function Report({stations, onReport}) {
  const [mode, setMode] = useState(null);
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
      {!mode && (
          <div className="report-mode-choice">
          <button onClick={() => setMode("photo")}><Camera size = {15}/>  Scan a Photo</button>
          <button onClick={() => setMode("manual")}><PenLine size = {15}/> Type it in</button>
          </div>
      )}
      {mode === "manual" && <ReportForm station={station} onReport={onReport} />}
      {mode === "photo"  && <p style={{color: "var()--text-muted", textAlign: "center"}}>Photo scanning coming soon</p>}
    </div>
  );
}