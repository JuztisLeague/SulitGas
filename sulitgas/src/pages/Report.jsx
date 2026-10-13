import {useState} from "react";
import { useParams } from "react-router-dom";
import ReportForm from "../ReportForm";
import {PenLine, Camera} from "lucide-react";
import {supabase} from "../supabaseClient";


function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Report({stations, onReport}) {
  const [mode, setMode] = useState(null);
  const [photo, setPhoto] = useState(null);
  const {stationId} = useParams();
  const station = stations.find((s) => String(s.id) === stationId);

  if (!station) {
    return (
      <div className="report-page">
        <h1 className="app-title">Station Not Found</h1>
      </div>
    )
  }

 async function handleScan() {
  const base64 = await fileToBase64(photo);
  const { data, error } = await supabase.functions.invoke("scan-price", {
    body: { image: base64 },
  });
  console.log("Function data:", data);
  console.log("Function error:", error);
}


  return (
    <div className="report-page">
      <h1 className="app-title">Report a price</h1>
      <p style={{ color: "var(--text-muted)", textAlign: "center" }}>{station.name}</p>
      
      {!mode && (
  <div className="report-mode-choice">
    <button className="mode-card mode-card-highlight" onClick={() => setMode("photo")}>
      <span className="mode-icon"><Camera/></span>
      <span>
        <span className="mode-title">Scan a photo</span>
        <span className="mode-desc">Snap the price board, AI reads it for you</span>
      </span>
    </button>
    <button className="mode-card" onClick={() => setMode("manual")}>
      <span className="mode-icon"><PenLine/></span>
      <span>
        <span className="mode-title">Type it in</span>
        <span className="mode-desc">Enter the fuel type and price yourself</span>
      </span>
    </button>
  </div>
)}
      {mode === "manual" && <ReportForm station={station} onReport={onReport} />}
      {mode === "photo"  && (
        <div className="photo-upload">
          <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange = {(e) => setPhoto(e.target.files[0])}/>
          {photo && <p>Selected: {photo.name}</p>}
           {photo && (
      <img
        src={URL.createObjectURL(photo)}
        alt="Price board preview"
        style={{ maxWidth: "100%", borderRadius: "12px", marginTop: "12px" }}
      />
    )}
        {photo && <button onClick={handleScan}>Read price</button>}
        </div>
      )}
    </div>
  );
}