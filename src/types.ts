export enum View {
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  NODE_DETAIL = 'node_detail',
  FIRE_ALERT = 'fire_alert',
  CONTACTS = 'contacts',
  REPORTS = 'reports'
}

export interface NodeData {
  id: string;
  name: string;
  location: string;
  gas: number;
  temperature: number;
  humidity: number;
  status: 'normal' | 'warning' | 'critical';
  lastUpdate: string;
}

export interface ReportEvent {
  id: string;
  title: string;
  type: 'info' | 'warning' | 'critical';
  timestamp: string;
  description: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  phone: string;
  actionType: 'call' | 'message' | 'gps';
}
