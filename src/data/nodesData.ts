export interface Node {
  id: number;
  deviceName: string;
  ip: string;
  platform: string;
  status: string;
  lastPing: string;
  anomaliesDetected: string;
}

const today = new Date().toISOString().slice(0, 19).replace('T', ' ');

export const nodes: Node[] = [
  {
    id: 1,
    deviceName: "Device 1",
    ip: "192.168.1.1",
    platform: "Linux",
    status: "active",
    lastPing: "2024-09-13T12:34:56",
    anomaliesDetected: "Yes",
  },
  {
    id: 2,
    deviceName: "Device 2",
    ip: "192.168.1.2",
    platform: "Windows",
    status: "inactive",
    lastPing: "2024-09-12T10:20:30",
    anomaliesDetected: "No",
  },
  // Add more nodes as needed
];
