import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  MapPin, 
  Camera, 
  MessageSquare, 
  Bell, 
  ArrowLeft, 
  Send, 
  Flame, 
  AlertTriangle,
  Upload,
  CheckCircle2
} from 'lucide-react';
import { View } from '../types';

interface CommunityPanelProps {
  onBack: () => void;
}

interface Message {
  id: string;
  user: string;
  text: string;
  time: string;
  type: 'general' | 'alert' | 'update';
}

const MOCK_MESSAGES: Message[] = [
  { id: '1', user: 'Juan Pérez', text: 'Vi algo de humo cerca del sector norte hace 10 minutos.', time: '09:45 AM', type: 'alert' },
  { id: '2', user: 'Maria G.', text: 'Brigada lista en Oxapampa para apoyo preventivo.', time: '09:12 AM', type: 'update' },
  { id: '3', user: 'Carlos R.', text: 'El camino hacia la quebrada está despejado.', time: '08:30 AM', type: 'general' },
];

export const CommunityPanel: React.FC<CommunityPanelProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [reportText, setReportText] = useState('');
  const [isReporting, setIsReporting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      user: 'Tú (Usuario)',
      text: newMessage,
      time: 'Justo ahora',
      type: 'general'
    };
    setMessages([msg, ...messages]);
    setNewMessage('');
  };

  const handleReport = () => {
    if (!reportText && !selectedFile) return;
    setIsReporting(true);
    // Simulate API call
    setTimeout(() => {
      setIsReporting(false);
      setShowSuccess(true);
      
      // Auto-post to feed
      const msg: Message = {
        id: Date.now().toString(),
        user: 'Tú (Reporte)',
        text: `REPORTADO: ${reportText}`,
        time: 'Justo ahora',
        type: 'alert'
      };
      setMessages([msg, ...messages]);

      setReportText('');
      setSelectedFile(null);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="immersive-card max-w-4xl mx-auto flex flex-col md:flex-row h-[75vh] overflow-hidden">
      {/* Participation Sidebar */}
      <div className="w-full md:w-80 p-6 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col bg-slate-50/50">
        <div className="immersive-header-label mb-6">Acción Ciudadana</div>
        
        <div className="space-y-6 flex-1">
          {/* Report Smoke Form */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Reportar Humo/Fuego</span>
            </div>
            
            <textarea 
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="Describe lo que ves y ubicación aproximada..."
              className="w-full text-[10px] p-2 bg-gray-50 border border-gray-200 rounded-lg h-24 focus:ring-1 focus:ring-brand-primary outline-none transition-all placeholder:italic"
            />

            <div className="mt-3 flex gap-2">
              <label className="flex-1 cursor-pointer">
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                <div className="flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <Camera className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[9px] font-black uppercase text-gray-500">Foto</span>
                </div>
              </label>
              <button 
                onClick={handleReport}
                disabled={isReporting}
                className="flex-[2] bg-brand-primary text-white py-2 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-md hover:bg-brand-primary/90 transition-all disabled:opacity-50"
              >
                {isReporting ? 'Enviando...' : 'Enviar Alerta'}
              </button>
            </div>
            
            {selectedFile && (
              <div className="mt-2 relative">
                <img src={selectedFile} alt="Vista previa" className="w-full h-16 object-cover rounded border border-gray-200" />
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                >
                  <ArrowLeft className="w-2 h-2 rotate-45" />
                </button>
              </div>
            )}
          </div>

          {/* Quick Alerts */}
          <div className="space-y-2">
            <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest px-1">Alertas Rápidas</p>
            <button className="w-full flex items-center gap-2 p-2 bg-orange-50 text-orange-700 rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-tight">Reportar Avistamiento</span>
            </button>
            <button className="w-full flex items-center gap-2 p-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-tight">Unirse a Brigada Local</span>
            </button>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="w-full border-2 border-gray-200 text-gray-500 py-2.5 rounded-lg text-[9px] font-black uppercase mt-6 hover:bg-white hover:text-gray-800 transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver al Panel
        </button>
      </div>

      {/* Community Feed / Messages */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brand-primary" />
            <h3 className="text-xs font-black uppercase tracking-tight text-gray-800">Mensajes Vecinales</h3>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-primary/10 rounded-full border border-brand-primary/10">
            <div className="w-1 h-1 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-[8px] font-black uppercase text-brand-primary">Vecinos Activos: 24</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-50 text-emerald-700 p-3 rounded-lg border border-emerald-100 flex items-center gap-3 mb-4"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Reporte enviado con éxito. La brigada ha sido notificada.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.type === 'alert' ? 'bg-orange-50 border-orange-100' : 'bg-gray-50 border-gray-100'} p-3 rounded-xl border shadow-sm`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-black uppercase text-gray-800">{msg.user}</span>
                <span className="text-[8px] font-mono font-bold text-gray-400">{msg.time}</span>
              </div>
              <p className="text-[10px] text-gray-600 leading-relaxed font-medium">{msg.text}</p>
              {msg.type === 'alert' && (
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[8px] font-black uppercase text-orange-600">Alerta de Comunidad</span>
                </div>
              )}
            </div>
          ))}

          <div className="text-center py-10 opacity-20 flex flex-col items-center">
            <Users className="w-10 h-10 mb-2" />
            <p className="text-[10px] font-black uppercase italic">Fin del hilo comunitario</p>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje a la comunidad..."
              className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-[10px] font-medium focus:ring-1 focus:ring-brand-primary outline-none transition-all"
            />
            <button 
              type="submit"
              className="bg-brand-primary text-white p-2 rounded-lg hover:bg-brand-primary/90 shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
