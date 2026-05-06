import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Flame, Wind, Thermometer, Droplets, ShieldAlert, X } from 'lucide-react';
import { NodeData } from '../types';

interface FireAlertProps {
  node: NodeData;
  onConfirm: () => void;
  onDismiss: () => void;
}

export const FireAlert: React.FC<FireAlertProps> = ({ node, onConfirm, onDismiss }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#2d0606] flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Emergency Pulsing Background */}
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        className="absolute inset-0 bg-red-600 pointer-events-none mix-blend-color-dodge"
      />
      
      {/* Ambient Sparks / Digital Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '110%', x: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ 
              y: '-10%', 
              opacity: [0, 1, 0],
              x: `${(Math.random() * 100) + (Math.sin(i) * 10)}%`
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2 + Math.random() * 3, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-red-400 rounded-full blur-[1px]"
          />
        ))}
      </div>
      
      {/* Scanline / CRT Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-brand-critical rounded-xl shadow-alert overflow-hidden flex flex-col ring-8 ring-red-600/30 border border-white/20 relative"
      >
        {/* Animated Danger Tape Borders */}
        <div className="h-2 w-full danger-pattern shrink-0" />

        <div className="bg-red-950/80 p-3 border-b border-white/10 font-black text-[10px] uppercase flex items-center justify-between text-white tracking-widest z-10">
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-3 h-3 text-yellow-400" />
            SISTEMA DE ALERTA CRÍTICA
          </span>
          <motion.span 
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.4 }}
            className="text-red-500 flex items-center gap-1"
          >
            <div className="w-2 h-2 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,1)]" />
            VIVO
          </motion.span>
        </div>

        <div className="p-8 flex flex-col text-center justify-center space-y-6 relative z-10">
          <div className="space-y-2">
            <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/70 italic">Protocolo de Emergencia</p>
            <motion.h2 
              animate={{ 
                x: [0, -1, 1, -1, 0],
                filter: ["hue-rotate(0deg)", "hue-rotate(10deg)", "hue-rotate(-10deg)", "hue-rotate(0deg)"]
              }}
              transition={{ repeat: Infinity, duration: 0.2 }}
              className="text-4xl font-display font-black italic text-white leading-none tracking-tighter"
            >
              INCENDIO CONFIRMADO
            </motion.h2>
            <div className="text-white/60 font-mono text-xs mt-2 bg-black/20 py-1 rounded inline-block px-3 border border-white/5">
              COORD: {node.location}
            </div>
          </div>

          <div className="bg-black/30 rounded-lg p-5 text-left border border-white/5 backdrop-blur-sm">
            <p className="text-[9px] uppercase font-black text-white/50 mb-3 tracking-widest">Validación de Variables</p>
            <ul className="text-xs space-y-2 font-mono text-white/90">
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>⚡ GAS ANORMAL</span>
                <span className="text-emerald-400 font-bold">✔</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>🌡 TEMP ASCENDENTE</span>
                <span className="text-emerald-400 font-bold">✔</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>💧 HUM CRÍTICA</span>
                <span className="text-emerald-400 font-bold">✔</span>
              </li>
              <li className="text-rose-300 pt-2 flex justify-between font-bold">
                <span>PROB. ERROR</span>
                <span>0.02%</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <button 
              onClick={onConfirm}
              className="w-full bg-white text-brand-critical py-4 rounded-lg text-xs font-black uppercase shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Activar Respuesta de Emergencia
            </button>
            <button 
              onClick={onDismiss}
              className="w-full bg-transparent border border-white/30 text-white/70 py-2.5 rounded-lg text-[10px] font-bold uppercase hover:bg-white/5"
            >
              Descartar Alerta Falsa
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
