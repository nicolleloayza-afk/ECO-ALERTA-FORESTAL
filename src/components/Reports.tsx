import React, { useState } from 'react';
import { Download, Search, Filter, Calendar, AlertTriangle, ShieldCheck, XCircle, Clock } from 'lucide-react';
import { View, ReportEvent } from '../types';

interface ReportsProps {
  onBack: () => void;
}

const MOCK_REPORTS: ReportEvent[] = [
  { 
    id: '1', 
    date: '2026-05-06', 
    time: '14:20', 
    location: 'Oxapampa, Pasco', 
    severity: 'critical', 
    responseTime: '12 min', 
    status: 'liquidado',
    description: 'Incendio forestal de fase inicial detectado por sensor N#005.' 
  },
  { 
    id: '2', 
    date: '2026-05-06', 
    time: '10:15', 
    location: 'Machu Picchu, Cusco', 
    severity: 'info', 
    responseTime: '5 min', 
    status: 'falsa_alarma',
    description: 'Detección de humo por quema agrícola controlada.' 
  },
  { 
    id: '3', 
    date: '2026-05-05', 
    time: '08:45', 
    location: 'Manu, Madre de Dios', 
    severity: 'warning', 
    responseTime: '18 min', 
    status: 'controlado',
    description: 'Incremento de temperatura atípico en zona de reserva.' 
  },
  { 
    id: '4', 
    date: '2026-05-04', 
    time: '16:30', 
    location: 'Chanchamayo, Junín', 
    severity: 'critical', 
    responseTime: '14 min', 
    status: 'controlado',
    description: 'Incendio controlado - Quebrada Honda - Respuesta inmediata.' 
  },
  { 
    id: '5', 
    date: '2026-05-03', 
    time: '23:10', 
    location: 'Pucallpa, Ucayali', 
    severity: 'info', 
    responseTime: 'N/A', 
    status: 'en_proceso',
    description: 'Monitoreo preventivo por alta densidad de CO2.' 
  },
];

export const Reports: React.FC<ReportsProps> = ({ onBack }) => {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchDate, setSearchDate] = useState<string>('');

  const filteredReports = MOCK_REPORTS.filter(report => {
    const matchSeverity = filterSeverity === 'all' || report.severity === filterSeverity;
    const matchStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchDate = searchDate === '' || report.date.includes(searchDate);
    return matchSeverity && matchStatus && matchDate;
  });

  return (
    <div className="immersive-card max-w-4xl mx-auto flex flex-col h-[70vh]">
      <div className="immersive-header-label flex justify-between items-center">
        <span>Historial de Eventos Críticos</span>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 text-gray-400" />
            <input 
              type="date" 
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="bg-transparent border-none text-[10px] focus:ring-0 cursor-pointer p-0"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-3 h-3 text-gray-400" />
            <select 
              value={filterSeverity} 
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-transparent border-none text-[10px] focus:ring-0 cursor-pointer p-0 font-black uppercase"
            >
              <option value="all">Todas Severidades</option>
              <option value="critical">Crítico</option>
              <option value="warning">Advertencia</option>
              <option value="info">Informativo</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
            <tr>
              <th className="p-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Fecha/Hora</th>
              <th className="p-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Ubicación</th>
              <th className="p-3 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Gravedad</th>
              <th className="p-3 text-[10px] font-black uppercase tracking-widest text-gray-400">T. Respuesta</th>
              <th className="p-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Estado</th>
              <th className="p-3 text-[10px] font-black uppercase tracking-widest text-gray-400">Detalles</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-600">{report.date}</span>
                    <span className="text-[9px] font-mono text-gray-400">{report.time}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className="text-[10px] font-black text-gray-800 uppercase italic tracking-tighter">{report.location}</span>
                </td>
                <td className="p-3 text-center">
                  <div className={`mx-auto w-2 h-2 rounded-full ${
                    report.severity === 'critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse' :
                    report.severity === 'warning' ? 'bg-amber-400' : 'bg-blue-400'
                  }`} />
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-gray-300" />
                    <span className="text-[10px] font-mono font-bold text-gray-500">{report.responseTime}</span>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                    report.status === 'liquidado' ? 'bg-green-100 text-green-700' :
                    report.status === 'controlado' ? 'bg-blue-100 text-blue-700' :
                    report.status === 'en_proceso' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {report.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-3">
                  <p className="text-[9px] text-gray-500 leading-tight italic max-w-xs truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:bg-white group-hover:relative group-hover:z-50 group-hover:p-1 group-hover:rounded group-hover:shadow-lg">
                    {report.description}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredReports.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search className="w-8 h-8 mb-2 opacity-20" />
            <p className="text-xs font-bold uppercase tracking-widest">No se encontraron eventos</p>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex gap-4 mb-4 justify-center">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] animate-pulse" />
            <span className="text-[9px] font-black uppercase text-gray-500">Crítico</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-[9px] font-black uppercase text-gray-500">Advertencia</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-[9px] font-black uppercase text-gray-500">Informativo</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <button className="flex-1 max-w-[200px] bg-white text-gray-600 py-2.5 rounded text-[10px] font-black uppercase border border-gray-300 flex items-center justify-center gap-2 shadow-sm hover:bg-gray-100 transition-colors">
            <Download className="w-3.5 h-3.5" /> Exportar Registro
          </button>
          <button 
            onClick={onBack}
            className="text-gray-400 px-4 py-2 rounded text-[9px] font-black uppercase hover:text-gray-600 transition-colors"
          >
            Cerrar Bitácora
          </button>
        </div>
      </div>
    </div>
  );
};
