import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// --- AITDL NETWORK SECURITY ENFORCEMENT ---

// 2. RUNTIME WATERMARK (ANTI-COPY PSYCHOLOGY)
(function () {
  const watermark = document.createElement('div');
  watermark.innerText = "AITDL Network";
  watermark.style.position = "fixed";
  watermark.style.bottom = "10px";
  watermark.style.right = "10px";
  watermark.style.opacity = "0.05";
  watermark.style.fontSize = "12px";
  watermark.style.pointerEvents = "none";
  watermark.style.zIndex = "9999";
  document.body.appendChild(watermark);
})();

// 3. CODE FINGERPRINTING (ADVANCED)
async function generateAndLogFingerprint() {
  try {
    const content = new TextEncoder().encode(Date.now().toString() + "AITDL_NETWORK");
    const hashBuffer = await crypto.subtle.digest('SHA-256', content);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log("AITDL Build ID:", hashHex);
  } catch (e) {
    console.log("AITDL Build ID:", Date.now().toString(36));
  }
}
generateAndLogFingerprint();

// 4. LICENSE ENFORCEMENT CHECK
if (!window.location.hostname.includes("aitdl.com") && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
  console.warn("⚠ Unauthorized usage detected - AITDL Network");
}

// ------------------------------------------

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
