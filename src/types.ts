export enum View {
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  NODE_DETAIL = 'node_detail',
  FIRE_ALERT = 'fire_alert',
  CONTACTS = 'contacts',
  REPORTS = 'reports',
  COMMUNITY = 'community'
}

export interface NodeData {
  id: string;
  name: string;
  location: string;
  coordinates: string;
  gas: number;
  temperature: number;
  humidity: number;
  status: 'normal' | 'warning' | 'critical' | 'offline' | 'maintenance';
  lastUpdate: string;
  battery: number;
  signal: number; // RSSI in dBm
  lastMaintenance?: string;
  maintenanceRequired?: boolean;
  x?: number; // Position X in %
  y?: number; // Position Y in %
}

export interface ReportEvent {
  id: string;
  date: string;
  time: string;
  location: string;
  severity: 'info' | 'warning' | 'critical';
  responseTime: string;
  status: 'controlado' | 'en_proceso' | 'liquidado' | 'falsa_alarma';
  description: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  phone: string;
  actionType: 'call' | 'message' | 'gps';
}
