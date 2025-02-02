import { useState, useEffect } from "react";

function App() {
  const [logs, setLogs] = useState([]);
  const [flaggedIPs, setFlaggedIPs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch logs from Cloudflare Worker API
    async function fetchLogs() {
      try {
        const response = await fetch("https://wy-worker-fraud-api.will-086.workers.dev/logs");
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch logs", error);
      }
    }

    // Fetch flagged IPs from Cloudflare Worker API
    async function fetchFlaggedIPs() {
      try {
        const response = await fetch("https://wy-worker-fraud-api.will-086.workers.dev/flagged");
        const data = await response.json();
        setFlaggedIPs(data);
      } catch (error) {
        console.error("Failed to fetch flagged IPs", error);
      }
    }

    // Run both functions
    Promise.all([fetchLogs(), fetchFlaggedIPs()]).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="container">
        <a href="https://xone.digital" target="_blank">
          <img 
            src="https://media-content-storage.b-cdn.net/xone/web-assets/Xone_Logo%20RGB-04.png" 
            className="logo" 
            alt="Xone Logo" 
          />
        </a>
        <h1>Xone Fraud Dashboard</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Display Logs */}
            <div className="card">
              <h2>Logs</h2>
              <ul>
                {logs.length > 0 ? (
                  logs.map((log, index) => <li key={index}>{JSON.stringify(log)}</li>)
                ) : (
                  <p>No logs available.</p>
                )}
              </ul>
            </div>

            {/* Display Flagged IPs */}
            <div className="card">
              <h2>Flagged IPs</h2>
              <ul>
                {flaggedIPs.length > 0 ? (
                  flaggedIPs.map((ip, index) => <li key={index}>{ip}</li>)
                ) : (
                  <p>No flagged IPs.</p>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;


