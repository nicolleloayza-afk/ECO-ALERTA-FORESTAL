import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Thermometer, Droplets, Wind, ShieldCheck, Battery, Wifi, Settings, AlertTriangle, Activity, TrendingUp } from 'lucide-react';
import { View, NodeData } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_HISTORY = [
  { time: '00:00', temp: 22, hum: 45, gas: 120 },
  { time: '04:00', temp: 20, hum: 48, gas: 115 },
  { time: '08:00', temp: 24, hum: 42, gas: 130 },
  { time: '12:00', temp: 31, hum: 35, gas: 145 },
  { time: '16:00', temp: 29, hum: 38, gas: 140 },
  { time: '20:00', temp: 25, hum: 43, gas: 125 },
  { time: '23:59', temp: 23, hum: 46, gas: 122 },
];

interface NodeDetailProps {
  node: NodeData;
  onBack: () => void;
}

export const NodeDetail: React.FC<NodeDetailProps> = ({ node, onBack }) => {
  return (
    <div className="immersive-card max-w-2xl mx-auto flex flex-col min-h-[500px]">
      <div className="flex flex-col md:flex-row border-b border-gray-100">
        {/* Left Column: Environmental Data */}
        <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <div className="immersive-header-label mb-6">Métricas Ambientales</div>
          
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4 py-1 bg-green-50/30">
              <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Gas detectado</p>
              <p className="text-xl font-mono font-bold text-gray-800 leading-none mt-1">
                {Math.round(node.gas)} ppm <span className="text-green-600 ml-2 text-xs font-sans uppercase">BAJO</span>
              </p>
            </div>
            
            <div className="border-l-4 border-amber-500 pl-4 py-1 bg-amber-50/30">
              <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Temperatura</p>
              <p className="text-xl font-mono font-bold text-gray-800 leading-none mt-1">
                {node.temperature.toFixed(1)}°C <span className="text-gray-400 ml-2 text-xs font-sans italic lowercase font-normal">estable</span>
              </p>
            </div>
            
            <div className={`border-l-4 pl-4 py-1 bg-rose-50/30 ${node.humidity < 20 ? 'border-red-600' : 'border-blue-500'}`}>
              <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Humedad</p>
              <p className="text-xl font-mono font-bold text-gray-800 leading-none mt-1">
                {Math.round(node.humidity)}% <span className={`ml-2 text-xs font-sans uppercase ${node.humidity < 20 ? 'text-red-600' : 'text-blue-600'}`}>
                  {node.humidity < 20 ? 'CRÍTICO' : 'NORMAL'}
                </span>
              </p>
            </div>
          </div>

          <button 
            onClick={onBack}
            className="w-full border-2 border-gray-200 text-gray-500 py-3 rounded-lg text-[10px] font-black uppercase mt-12 hover:bg-gray-50 hover:text-gray-800 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al panel
          </button>
        </div>

        {/* Right Column: Infrastructure & Network */}
        <div className="flex-1 p-6 bg-slate-50/50">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-black text-lg text-gray-800 uppercase tracking-tighter leading-none">{node.name}</h3>
              <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase tracking-widest">{node.location}</p>
            </div>
            <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${
              node.status === 'offline' ? 'bg-gray-200 text-gray-600 border-gray-300' :
              node.status === 'critical' ? 'bg-red-500 text-white border-red-600 animate-pulse' :
              'bg-emerald-500 text-white border-emerald-600'
            }`}>
              {node.status}
            </div>
          </div>

          <div className="space-y-4">
            {/* Battery Status */}
            <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Battery className={`w-4 h-4 ${node.battery < 20 ? 'text-red-500' : 'text-emerald-500'}`} />
                  <span className="text-[10px] font-black uppercase text-gray-500">Energía (Solar/Bat)</span>
                </div>
                <span className={`text-xs font-mono font-bold ${node.battery < 20 ? 'text-red-600' : 'text-gray-700'}`}>{Math.round(node.battery)}%</span>
              </div>
              <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all ${node.battery < 20 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                  style={{ width: `${node.battery}%` }} 
                />
              </div>
            </div>

            {/* LoRa Signal */}
            <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <Wifi className={`w-4 h-4 ${node.signal < -110 ? 'text-red-500' : 'text-blue-500'}`} />
                  <span className="text-[10px] font-black uppercase text-gray-500">Señal LoRaWAN</span>
                </div>
                <span className="text-xs font-mono font-bold text-gray-700">{Math.round(node.signal)} dBm</span>
              </div>
              <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">
                RSSI: {node.signal > -90 ? 'Excelente' : node.signal > -105 ? 'Bueno' : 'Bajo'}
              </p>
            </div>

            {/* Connection Status */}
            <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Activity className={`w-4 h-4 ${node.status === 'offline' ? 'text-gray-400' : 'text-emerald-500'}`} />
                <span className="text-[10px] font-black uppercase text-gray-500">Estado de Sincronización</span>
              </div>
              <p className="text-[10px] font-bold text-gray-800">
                {node.status === 'offline' ? 'DESCONECTADO' : 'CONECTADO Y TRANSMITIENDO'}
              </p>
              <p className="text-[8px] text-gray-400 italic">Último paquete: {node.lastUpdate}</p>
            </div>

            {/* Maintenance Alert */}
            {node.maintenanceRequired && (
              <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] font-black uppercase text-red-700 leading-none">Mantenimiento Requerido</p>
                  <p className="text-[8px] text-red-600 mt-1 italic">Sensores muestran degradación o baja potencia sostenida.</p>
                </div>
              </div>
            )}

            {/* Last Maintenance History */}
            <div className="pt-2 border-t border-gray-200 mt-2">
              <div className="flex items-center gap-2">
                <Settings className="w-3 h-3 text-gray-400" />
                <span className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Último Mantenimiento: {node.lastMaintenance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Historical Trends Chart */}
      <div className="p-6 bg-white shrink-0">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-brand-primary" />
          <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Tendencias Históricas (Últimas 24h)</p>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_HISTORY} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 8, fontWeight: 'bold', fill: '#94a3b8' }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 8, fontWeight: 'bold', fill: '#94a3b8' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: 'none', 
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="temp" 
                name="Temperatura (°C)"
                stroke="#f59e0b" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorTemp)" 
              />
              <Area 
                type="monotone" 
                dataKey="gas" 
                name="Gas (ppm)"
                stroke="#10b981" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorGas)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-2 justify-center">
          <div className="flex items-center gap-1">
            <div className="w-2 h-0.5 bg-[#f59e0b]" />
            <span className="text-[8px] font-black uppercase text-gray-400">Temperatura</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-0.5 bg-[#10b981]" />
            <span className="text-[8px] font-black uppercase text-gray-400">Gas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
