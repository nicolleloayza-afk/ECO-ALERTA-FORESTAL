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
            <h1 className="text-2xl font-display font-black tracking-tighter uppercase italic text-brand-primary">
              EcoAlerta
            </h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
              Vigilancia Ambiental • V.2.1.0
            </p>
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); onLogin(); }}
            className="space-y-4"
          >
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Identificador de Operador</label>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-10 text-sm font-mono focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                  placeholder="ID-USER-XXXX"
                  required
                />
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Pin de Seguridad (GPRS-KEY)</label>
              <div className="relative">
                <input 
                  type="password" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-10 text-sm font-mono focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              </div>
            </div>

            <button 
              type="submit"
              className="immersive-button flex items-center justify-center gap-2 group h-12 text-xs"
            >
              Iniciar Sincronización
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
