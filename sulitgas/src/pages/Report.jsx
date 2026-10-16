import {useState, useRef} from "react";
import { useParams } from "react-router-dom";
import ReportForm from "../ReportForm";
import {PenLine, Camera, Image as ImageIcon} from "lucide-react";
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
  const [results, setResults] = useState([]);
  const [scanMessage, setScanMessage] = useState("");
  const {stationId} = useParams();
  const station = stations.find((s) => String(s.id) === stationId);
  const [showMenu, setShowMenu] = useState(false);
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);

  function handlePick(e) {
    const file = e.target.files[0];
    if (file) setPhoto(file);
  }

  if (!station) {
    return (
      <div className="report-page">
        <h1 className="app-title">Station Not Found</h1>
      </div>
    )
  }

 async function handleScan() {
  setScanMessage("Reading the photo...");
  setResults([]);

  const base64 = await fileToBase64(photo);
  const { data, error } = await supabase.functions.invoke("scan-price", {
    body: { image: base64, mimeType: photo.type },
  });
   
  if (error || !data || data.error) {
    setScanMessage("The AI is busy right now. Try again in a minute, or type the price in.");
    return;
  }

  try {
    const parsed = JSON.parse(data.text);
    if (parsed.length === 0) {
      setScanMessage("Couldn't read the prices clearly. Try a closer, sharper photo.");
      return;
    }
    setResults(parsed);
    setScanMessage("");
  } catch {
    setScanMessage("Couldn't understand the AI's answer. Try again.");
  }
}

 function updatePrice(index, newPrice){
    setResults((prev)  => 
      prev.map((r, i) => (i === index ? {...r, price: newPrice} : r))
  );
  }

  async function submitScanned() {
  for (const r of results) {
    const price = Number(r.price);
    if (!(price > 0)) continue;

    await onReport({
      id: station.id,
      name: station.name,
      fuelType: r.fuel,
      price: price,
    });
  }

  setResults([]);
  setScanMessage("Thanks! Prices submitted.");
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
          
          <button type="button" className="photo-drop" onClick={() => setShowMenu(true)}>
              <span className="photo-drop-icon"><Camera size={28} /></span>
              <span className="photo-drop-title">Tap to add a photo</span>
              <span className="photo-drop-sub">Take one now or choose from your gallery</span>
            </button>

            {showMenu && (
              <div className="photo-menu">
                <button type="button" onClick={() => { cameraRef.current.click(); setShowMenu(false); }}>
                  <Camera size={18} /> Take a photo
                </button>
                <button type="button" onClick={() => { galleryRef.current.click(); setShowMenu(false); }}>
                  <ImageIcon size={18} /> Choose from gallery
                </button>
                <button type="button" className="photo-menu-cancel" onClick={() => setShowMenu(false)}>
                  Cancel
                </button>
              </div>
            )}

            <input ref={cameraRef} type="file" accept="image/*" capture="environment" hidden onChange={handlePick} />
            <input ref={galleryRef} type="file" accept="image/*" hidden onChange={handlePick} />
            {!photo && (
              <div className="photo-tips">
                <p className="photo-tips-title">Note before taking a picture</p>
                <p>1. Fill the frame with the price board.</p>
                <p>2. Avoid glare and shadows.</p>
                <p>3. Hold steady so the digits are sharp.</p>
              </div>
            )}

          {photo && <p>Selected: {photo.name}</p>}
           {photo && (
      <img
        src={URL.createObjectURL(photo)}
        alt="Price board preview"
        style={{ maxWidth: "100%", borderRadius: "12px", marginTop: "12px" }}
      />
    )}
        {photo && <button onClick={handleScan}>Read price</button>}
        {scanMessage && <p>{scanMessage}</p>}

          {results.length > 0 && (
                      <div className="scan-results">
                        <p className="scan-note">Found {results.length} prices. Fix any that are wrong.</p>
                        {results.map((r, index) => (
                          <label key={r.fuel} className="price-row">
                            <span className="price-row-fuel">{r.fuel}</span>
                            <span className="price-row-field">
                              ₱
                              <input
                                type="number"
                                step="0.01"
                                value={r.price}
                                onChange={(e) => updatePrice(index, e.target.value)}
                              />
                            </span>
                          </label>
                        ))}
                        <button className="submit-scan" onClick={submitScanned}>Submit these prices</button>
                        <button
                          className="scan-again"
                          onClick={() => { setPhoto(null); setResults([]); setScanMessage(""); }}
                        >
                          Choose another photo
                        </button>
                      </div>
                    )}
                  </div>
              )}
    </div>
  );
}