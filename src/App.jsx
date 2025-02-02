import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function App() {
  const API_BASE = "https://wy-worker-fraud-api.will-086.workers.dev";
  const [logs, setLogs] = useState([]);
  const [flaggedIPs, setFlaggedIPs] = useState([]);

  useEffect(() => {
    fetchLogs();
    fetchFlaggedIPs();
  }, []);

  const fetchLogs = async () => {
    const response = await fetch(`${API_BASE}/logs`);
    const data = await response.json();
    setLogs(data);
  };

  const fetchFlaggedIPs = async () => {
    const response = await fetch(`${API_BASE}/flagged`);
    const data = await response.json();
    setFlaggedIPs(data);
  };

  const unflagIP = async (ip) => {
    await fetch(`${API_BASE}/unflag/${ip}`, { method: "POST" });
    fetchFlaggedIPs();
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <a href="https://yourwebsite.com" target="_blank">
          <img 
            src="https://media-content-storage.b-cdn.net/xone/web-assets/Xone_Logo%20RGB-04.png" 
            className="logo" 
            alt="Xone Logo" 
          />
        </a>
      </div>
      <h1 className="text-2xl font-bold">Xone Fraud Dashboard</h1>
      
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Flagged IPs</h2>
          <ul className="mt-2 space-y-2">
            {flaggedIPs.map((ip) => (
              <li key={ip} className="flex justify-between items-center p-2 border rounded-lg">
                {ip}
                <Button onClick={() => unflagIP(ip)} variant="destructive">Unflag</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Fraud Logs</h2>
          <ul className="mt-2 space-y-2">
            {logs.map((log, index) => (
              <li key={index} className="p-2 border rounded-lg">
                <strong>IP:</strong> {log.ip}, <strong>Country:</strong> {log.country}, <strong>Time:</strong> {log.timestamp}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
