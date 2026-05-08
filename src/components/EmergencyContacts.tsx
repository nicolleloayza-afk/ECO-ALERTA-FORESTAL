import React from 'react';
import { Phone, MessageSquare, MapPin, ArrowLeft, Send } from 'lucide-react';
import { View, Contact, NodeData } from '../types';

interface EmergencyContactsProps {
  onBack: () => void;
  node: NodeData;
}

const EMERGENCY_CONTACTS: Contact[] = [
  { id: '1', name: 'Bomberos Voluntarios', role: 'Estación B12', phone: '116', actionType: 'call' },
  { id: '2', name: 'Presidente Comunal', role: 'Comunidad Campesina', phone: '+51 987 654 321', actionType: 'message' },
  { id: '3', name: 'Brigada de Respuesta', role: 'Respuesta Rápida', phone: 'GPRS-ACTIVE', actionType: 'gps' },
];

export const EmergencyContacts: React.FC<EmergencyContactsProps> = ({ onBack, node }) => {
  return (
    <div className="immersive-card max-w-md mx-auto">
      <div className="immersive-header-label">Directorio de Respuesta Crítica</div>
      <div className="p-4 flex flex-col gap-5">
        <div className="space-y-4">
          {EMERGENCY_CONTACTS.map((contact) => (
            <div key={contact.id} className="group border-b border-gray-100 pb-4 last:border-0 hover:bg-gray-50/50 p-2 rounded transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs font-black text-gray-800 uppercase tracking-tighter">{contact.name}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{contact.role}</p>
                </div>
                <div className="text-[10px] font-mono font-bold text-gray-300">#{contact.id}</div>
              </div>
              <button 
                className={`w-full text-white text-[10px] py-2 rounded uppercase font-black tracking-widest shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] ${
                  contact.actionType === 'call' ? 'bg-green-600' :
                  contact.actionType === 'message' ? 'bg-blue-600' : 'bg-brand-primary'
                }`}
              >
                {contact.actionType === 'call' && <Phone className="w-3.5 h-3.5" />}
                {contact.actionType === 'message' && <MessageSquare className="w-3.5 h-3.5" />}
                {contact.actionType === 'gps' && <Send className="w-3.5 h-3.5" />}
                
                {contact.actionType === 'call' ? 'Llamar Central' : 
                 contact.actionType === 'message' ? 'Enviar Reporte' : 
                 'Emitir Coordenadas GPS'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-auto p-4 bg-red-50 border border-red-200 rounded-lg text-[10px] text-red-900 leading-snug flex flex-col gap-2">
          <div className="flex items-center gap-2 font-black uppercase tracking-tighter">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
            Transmisión Automática Exitosa
          </div>
          <p className="italic">
            Se han enviado las coordenadas geográficas exactas y la dirección vinculada al <strong>{node.name}</strong> ubicado en <strong>{node.location}</strong>. 
            El sistema EcoAlerta ha detectado condiciones de ignición y ha compartido el paquete de datos (Gas, Temp, Hum) con los centros de respuesta inmediata mencionados arriba.
          </p>
        </div>

        <button 
          onClick={onBack}
          className="w-full text-gray-400 py-2 border border-gray-200 rounded text-[10px] font-bold uppercase hover:bg-gray-50 transition-colors"
        >
          Volver a la alerta
        </button>
      </div>
    </div>
  );
};
