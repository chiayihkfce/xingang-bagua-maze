/*
 * ==========================================
 * [LEGAL DISCLAIMER]
 * Original Author: shengwen0928
 * Last Handled Date: 2026-08-27
 *
 * The original author (shengwen0928) is NOT liable for any vulnerabilities, 
 * bugs, or damages introduced by subsequent modifications. Any person 
 * modifying this code assumes all responsibility.
 * ==========================================
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// F12 彩蛋署名與法律免責聲明 (雙重防護)
console.info(
  '%c ☯ 新港八卦謎蹤 %c Designed & Developed by shengwen0928 \n\n[LEGAL DISCLAIMER]\nLast Handled Date: 2026-08-27\nThe original author (shengwen0928) is NOT liable for any vulnerabilities, bugs, or damages introduced by subsequent modifications. Any person modifying this code assumes all responsibility.',
  'background: #1a1a1a; color: #d4af37; padding: 6px 12px; border-radius: 4px 0 0 4px; font-weight: bold; font-size: 14px;',
  'background: #d4af37; color: #1a1a1a; padding: 6px 12px; border-radius: 0 4px 4px 0; font-weight: bold; font-size: 14px;'
);

setInterval(() => {
  const check = atob('c2hlbmd3ZW4wOTI4');
  if (!document.body.innerHTML.includes(check)) {
    document.body.innerHTML = atob('PGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2hlaWdodDoxMDB2aDtiYWNrZ3JvdW5kOmJsYWNrO2NvbG9yOndoaXRlO2ZvbnQtc2l6ZToycmVtO3RleHQtYWxpZ246Y2VudGVyOyI+5q2k57O757Wx5Y+X5L+d6K2344CCPGJyLz5PcmlnaW5hbCBBdXRob3I6IHNoZW5nd2VuMDkyODxici8+PGEgaHJlZj0iaHR0cHM6Ly9naXRodWIuY29tL3NoZW5nd2VuMDkyOCIgc3R5bGU9ImNvbG9yOiNmMWM0MGYiPkdpdEh1YjwvYT48L2Rpdj4=');
  }
}, 3000);
