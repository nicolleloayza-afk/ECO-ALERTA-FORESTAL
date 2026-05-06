import React from 'react';
import { Download, History, Clock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { View, ReportEvent } from '../types';

interface ReportsProps {
  onBack: () => void;
}

const MOCK_REPORTS: ReportEvent[] = [
  { id: '1', title: 'Alerta leve detectada', type: 'warning', timestamp: '10:30 am', description: 'Incremento puntual de calor en sector Norte.' },
  { id: '2', title: 'Sistema estable', type: 'info', timestamp: '09:10 am', description: 'Todos los nodos reportando valores normales.' },
  { id: '3', title: 'Nodo #003 Mantenimiento', type: 'info', timestamp: 'Ayer', description: 'Limpieza de sensores de gas completada.' },
  { id: '4', title: 'Incendio controlado', type: 'critical', timestamp: '04/05/2026', description: 'Evento validado en Quebrada Honda liquidado.' },
];

export const Reports: React.FC<ReportsProps> = ({ onBack }) => {
  return (
    <div className="immersive-card max-w-md mx-auto">
      <div className="immersive-header-label">Bitácora de Eventos</div>
      <div className="flex-1 flex flex-col min-h-[500px]">
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="space-y-4">
            {MOCK_REPORTS.map((event) => (
              <div key={event.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 group last:border-0">
                <div className={`w-1.5 h-10 rounded-full shrink-0 ${
                  event.type === 'critical' ? 'bg-red-600' :
                  event.type === 'warning' ? 'bg-orange-400' : 'bg-green-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[10px] font-black text-gray-800 uppercase tracking-tight truncate">{event.title}</p>
                    <p className="text-[8px] text-gray-400 font-mono font-bold tracking-tighter shrink-0">{event.timestamp}</p>
                  </div>
                  <p className="text-[9px] text-gray-500 leading-tight italic line-clamp-2">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 space-y-2 bg-gray-50 border-t border-gray-200">
          <button className="w-full bg-white text-gray-600 py-3 rounded text-[10px] font-black uppercase border border-gray-300 flex items-center justify-center gap-2 shadow-sm hover:bg-gray-100 transition-colors">
            <Download className="w-3.5 h-3.5" /> Descargar Bitácora PDF
          </button>
          <button 
            onClick={onBack}
            className="w-full text-gray-400 py-2 rounded text-[9px] font-black uppercase hover:text-gray-600"
          >
            Cerrar Historial
          </button>
        </div>
      </div>
    </div>
  );
};
