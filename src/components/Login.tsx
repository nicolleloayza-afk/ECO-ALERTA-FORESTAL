import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Fingerprint, Lock, ChevronRight } from 'lucide-react';
import { View } from '../types';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({ user: '', pass: '' });

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="immersive-card max-w-sm w-full shadow-2xl"
      >
        <div className="immersive-header-label flex items-center gap-2">
          <Shield className="w-3 h-3 text-brand-primary" />
          Protocolo de Acceso Seguro
        </div>
        
        <div className="p-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex p-4 rounded-full bg-emerald-50 border border-emerald-100 mb-2">
              <Fingerprint className="w-10 h-10 text-brand-primary" />
            </div>
            <h1 className="text-3xl font-display font-black tracking-tighter uppercase italic bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent drop-shadow-sm leading-none">
              Iniciar Sesión
            </h1>
            <p className="text-[10px] text-brand-primary/60 font-black uppercase tracking-tight italic pt-2">
              Acceso autorizado al Centro Regional de Monitoreo
            </p>
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); onLogin(); }}
            className="space-y-4"
          >
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">🏛️ Municipalidad / Institución</label>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm font-bold focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                  placeholder="Ej. Municipalidad Distrital de Majes"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">👤 Usuario institucional</label>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm font-mono focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                  placeholder="Ingrese su usuario"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Contraseña de Red</label>
              <div className="relative">
                <input 
                  type="password" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-sm font-mono focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="immersive-button flex items-center justify-center gap-2 group h-12 text-xs"
            >
              Acceder al Sistema
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-[9px] text-gray-400 italic text-center leading-snug">
              Este sistema es de uso restringido para personal autorizado. 
              Cualquier acceso no autorizado será registrado vía coordenadas GPS.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
