import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Activity, CheckCircle, Database, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { View, NodeData } from '../types';

interface DashboardProps {
  onNavigate: (view: View, node?: NodeData) => void;
  nodes: NodeData[];
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, nodes }) => {
  const [zoom, setZoom] = useState(1);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));
  const handleReset = () => setZoom(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-start">
      {/* Left Column: Stats & Actions */}
      <div className="immersive-card md:col-span-1 h-fit">
        <div className="immersive-header-label">Centro de Control</div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-gray-50 border border-gray-100 p-3 rounded-lg">
              <p className="text-[8px] uppercase font-black text-gray-400 tracking-widest">Nodos</p>
              <p className="text-xl font-display font-black text-brand-primary">12/12</p>
            </div>
            <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
              <p className="text-[8px] uppercase font-black text-green-600 tracking-widest">Estado</p>
              <p className="text-[10px] font-black text-green-800 uppercase mt-1">Operativo</p>
            </div>
          </div>
          
          <button 
            onClick={() => onNavigate(View.REPORTS)}
            className="immersive-button shadow-md flex items-center justify-center gap-2"
          >
            Ver reportes históricos
          </button>
          
          <p className="text-[10px] text-gray-400 italic text-center leading-tight">
            Sistema operando con normalidad.<br/>No se detectan anomalías.
          </p>
        </div>
      </div>

      {/* Center/Right Column: Interactive Map */}
      <div className="immersive-card md:col-span-2 h-full min-h-[400px] relative overflow-hidden">
        <div className="immersive-header-label flex justify-between items-center bg-white/90 backdrop-blur-md absolute top-0 left-0 right-0 z-20">
          <span>Vigilancia Georeferenciada</span>
          <span className="font-mono text-[9px] text-brand-primary">LAT: 16.32S LONG: 72.22W</span>
        </div>

        {/* Map Container */}
        <div className="relative flex-1 bg-blue-50/50 overflow-hidden h-full cursor-grab active:cursor-grabbing">
          <motion.div 
            animate={{ scale: zoom }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 origin-center h-full"
          >
            <div className="absolute inset-0 grayscale opacity-10 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center h-full" />
            
            {/* Markers Container */}
            <div className="absolute inset-0 p-8 h-full">
              <div className="relative w-full h-full">
                {nodes.map((node, i) => (
                  <div 
                    key={node.id}
                    className="absolute z-10"
                    style={{ 
                      top: `${20 + (i * 12) % 65}%`, 
                      left: `${15 + (i * 15) % 75}%` 
                    }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.5 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(View.NODE_DETAIL, node);
                      }}
                      className={`w-5 h-5 rounded-full border-2 border-white shadow-[0_0_15px_rgba(0,0,0,0.3)] cursor-pointer flex items-center justify-center ${
                        node.status === 'critical' ? 'bg-brand-critical animate-pulse ring-4 ring-red-500/30' : 'bg-green-500 hover:bg-green-400'
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                    </motion.button>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {hoveredNode?.id === node.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, x: '-50%' }}
                          animate={{ opacity: 1, y: -5, x: '-50%' }}
                          exit={{ opacity: 0, y: 10, x: '-50%' }}
                          className="absolute bottom-full left-1/2 mb-2 w-48 bg-slate-900 text-white rounded-lg p-3 shadow-2xl z-50 pointer-events-none"
                        >
                          <div className="text-[10px] uppercase font-black tracking-tighter mb-1 border-b border-white/10 pb-1 flex justify-between">
                            <span>{node.name}</span>
                            <span className={node.status === 'critical' ? 'text-red-400' : 'text-emerald-400'}>
                              {node.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-1 text-center">
                            <div>
                              <p className="text-[8px] text-white/40 uppercase">Gas</p>
                              <p className="text-[10px] font-mono font-bold leading-none">{node.gas}</p>
                            </div>
                            <div>
                              <p className="text-[8px] text-white/40 uppercase">ºC</p>
                              <p className="text-[10px] font-mono font-bold leading-none">{node.temperature}</p>
                            </div>
                            <div>
                              <p className="text-[8px] text-white/40 uppercase">Hum</p>
                              <p className="text-[10px] font-mono font-bold leading-none">{node.humidity}%</p>
                            </div>
                          </div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
            <button 
              onClick={handleZoomIn}
              className="p-3 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 text-gray-600 hover:text-brand-primary hover:bg-white transition-all cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button 
              onClick={handleZoomOut}
              className="p-3 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 text-gray-600 hover:text-brand-primary hover:bg-white transition-all cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button 
              onClick={handleReset}
              className="p-3 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 text-gray-600 hover:text-brand-primary hover:bg-white transition-all cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-sm border border-gray-200 shadow-sm text-[8px] font-mono font-bold uppercase text-gray-500 z-20">
            Escaneo activo EcoAlerta v2.4 • Zoom: {(zoom * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
};
