import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Thermometer, Droplets, Wind, ShieldCheck } from 'lucide-react';
import { View, NodeData } from '../types';

interface NodeDetailProps {
  node: NodeData;
  onBack: () => void;
}

export const NodeDetail: React.FC<NodeDetailProps> = ({ node, onBack }) => {
  return (
    <div className="immersive-card max-w-2xl mx-auto">
      <div className="immersive-header-label underline decoration-brand-primary underline-offset-4 decoration-2">
        Módulo de Detalle
      </div>
      
      <div className="p-6 flex flex-col min-h-full">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h3 className="font-black text-xl text-gray-800 uppercase tracking-tighter">{node.name}</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{node.location}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 px-3 py-1 rounded text-[10px] font-mono text-gray-400">
            ID: NODE-{node.id.padStart(3, '0')}
          </div>
        </div>

        <div className="space-y-5 flex-1">
          <div className="border-l-4 border-green-500 pl-4 py-1 bg-green-50/30">
            <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Gas detectado</p>
            <p className="text-lg font-mono font-bold text-gray-800 leading-none mt-1">
              {node.gas} ppm <span className="text-green-600 ml-2 text-xs font-sans uppercase">BAJO</span>
            </p>
          </div>
          
          <div className="border-l-4 border-amber-500 pl-4 py-1 bg-amber-50/30">
            <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Temperatura</p>
            <p className="text-lg font-mono font-bold text-gray-800 leading-none mt-1">
              {node.temperature}°C <span className="text-gray-400 ml-2 text-xs font-sans italic lowercase font-normal">estable</span>
            </p>
          </div>
          
          <div className={`border-l-4 pl-4 py-1 bg-rose-50/30 ${node.humidity < 20 ? 'border-red-600' : 'border-blue-500'}`}>
            <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Humedad</p>
            <p className="text-lg font-mono font-bold text-gray-800 leading-none mt-1">
              {node.humidity}% <span className={`ml-2 text-xs font-sans uppercase ${node.humidity < 20 ? 'text-red-600' : 'text-blue-600'}`}>
                {node.humidity < 20 ? 'CRÍTICO' : 'NORMAL'}
              </span>
            </p>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-100 p-3 rounded-lg text-[10px] text-gray-600 italic flex items-center gap-3">
            <div className="shrink-0 p-1 bg-white rounded-full">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
            <span>Simbiosis de datos: <span className="font-bold text-blue-600 uppercase not-italic">Estable</span>. No se detectan desviaciones algorítmicas.</span>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="w-full border-2 border-gray-200 text-gray-500 py-3 rounded-lg text-xs font-black uppercase mt-8 hover:bg-gray-50 hover:text-gray-800 transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al panel principal
        </button>
      </div>
    </div>
  );
};
