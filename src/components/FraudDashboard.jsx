import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FraudDashboard() {
  const API_BASE = "https://wy-worker-fraud-api.will-086.workers.dev/";
  const [logs, setLogs] = useState([]);
  const [flaggedIPs, setFlaggedIPs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLogs();
    fetchFlaggedIPs();
  }, []);

  const fetchLogs = async () => {
  try {
    const response = await fetch(`${API_BASE}/logs`);
    if (!response.ok) {
      throw new Error(`Failed to fetch logs: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Logs fetched:', data);  // Check the fetched data
    setLogs(data);
  } catch (error) {
    console.error('Error fetching logs:', error);
    alert('Failed to fetch logs');
  }
};


  const fetchFlaggedIPs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/flagged`);
      const data = await response.json();
      setFlaggedIPs(data);
    } catch (error) {
      setError('Failed to fetch flagged IPs');
    } finally {
      setLoading(false);
    }
  };

  const unflagIP = async (ip) => {
    await fetch(`${API_BASE}/unflag/${ip}`, { method: "POST" });
    fetchFlaggedIPs();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Fraud Prevention Dashboard</h1>
      
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Flagged IPs</h2>
          <ul className="mt-2 space-y-2">
            {flaggedIPs.map((ip) => (
              <li key={ip} className="flex justify-between items-center p-2 border rounded-lg">
                {ip}
                <Button onClick={() => unflagIP(ip)} variant="destructive" className="bg-red-500 text-white hover:bg-red-700">Unflag</Button>
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
