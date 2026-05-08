import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Activity, CheckCircle, Database, ZoomIn, ZoomOut, RotateCcw, Battery, Wifi, AlertTriangle } from 'lucide-react';
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

  const activeNodes = nodes.filter(n => n.status !== 'offline').length;
  const maintenanceNeeded = nodes.filter(n => n.maintenanceRequired).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-start">
      {/* Left Column: Stats & Actions */}
      <div className="space-y-6 md:col-span-1 h-full overflow-y-auto custom-scrollbar">
        <div className="immersive-card">
          <div className="immersive-header-label">Estado de la Red</div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 border border-gray-100 p-3 rounded-lg text-center">
                <p className="text-[8px] uppercase font-black text-gray-400 tracking-widest">Nodos Activos</p>
                <p className="text-xl font-display font-black text-brand-primary">{activeNodes}/{nodes.length}</p>
              </div>
              <div className={maintenanceNeeded > 0 ? "bg-amber-50 border border-amber-100 p-3 rounded-lg text-center" : "bg-green-50 border border-green-100 p-3 rounded-lg text-center"}>
                <p className="text-[8px] uppercase font-black text-gray-400 tracking-widest">Mantenimiento</p>
                <p className={`text-xl font-display font-black ${maintenanceNeeded > 0 ? 'text-amber-600 font-black' : 'text-green-600'}`}>
                  {maintenanceNeeded}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest px-1">Infraestructura Crítica</p>
              {nodes.filter(n => n.battery < 30 || n.status === 'offline' || n.maintenanceRequired).slice(0, 3).map(node => (
                <div key={node.id} className="flex items-center justify-between bg-white border border-gray-100 p-2 rounded text-[9px] font-bold">
                  <span className="truncate max-w-[100px]">{node.name}</span>
                  <div className="flex gap-2 items-center">
                    {node.status === 'offline' ? <span className="text-red-500 uppercase">Offline</span> : (
                      <>
                        <div className="flex items-center gap-1">
                          <Battery className={`w-3 h-3 ${node.battery < 20 ? 'text-red-500' : 'text-amber-500'}`} />
                          <span>{Math.round(node.battery)}%</span>
                        </div>
                        {node.maintenanceRequired && <AlertTriangle className="w-3 h-3 text-amber-500" />}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => onNavigate(View.REPORTS)}
                className="flex-1 immersive-button shadow-md flex items-center justify-center gap-2 text-[10px]"
              >
                Reportes de Red
              </button>
              <button 
                onClick={() => onNavigate(View.COMMUNITY)}
                className="flex-1 bg-white hover:bg-slate-50 text-brand-primary border-2 border-brand-primary/20 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tight flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                Panel Comunitario
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">Protocolo LoraWAN OK</p>
            <p className="text-[9px] text-emerald-700 italic">Gateways operativos en banda AU915. Latencia en rango nominal.</p>
          </div>
        </div>
      </div>

      {/* Center/Right Column: Interactive Map */}
      <div className="immersive-card md:col-span-2 h-full min-h-[500px] relative overflow-hidden">
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
                      top: `${node.y ?? (20 + (i * 12) % 65)}%`, 
                      left: `${node.x ?? (15 + (i * 15) % 75)}%` 
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
                      className={`w-6 h-6 rounded-full border-2 border-white shadow-[0_0_15px_rgba(0,0,0,0.3)] cursor-pointer flex items-center justify-center ${
                        node.status === 'offline' ? 'bg-gray-400 opacity-50' :
                        node.status === 'critical' ? 'bg-brand-critical animate-pulse ring-4 ring-red-500/30' : 
                        node.maintenanceRequired ? 'bg-amber-500' : 'bg-green-500 hover:bg-green-400'
                      }`}
                    >
                      {node.status === 'offline' ? <div className="w-1.5 h-1.5 rounded-full bg-white/20" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/50" />}
                    </motion.button>

                    {/* Tooltip */}
                    <AnimatePresence>
                      {hoveredNode?.id === node.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, x: '-50%' }}
                          animate={{ opacity: 1, y: -5, x: '-50%' }}
                          exit={{ opacity: 0, y: 10, x: '-50%' }}
                          className="absolute bottom-full left-1/2 mb-2 w-56 bg-slate-900 text-white rounded-lg p-3 shadow-2xl z-50 pointer-events-none"
                        >
                          <div className="text-[10px] uppercase font-black tracking-tighter mb-1 border-b border-white/10 pb-1 flex justify-between">
                            <span className="truncate max-w-[120px]">{node.name}</span>
                            <span className={
                              node.status === 'critical' ? 'text-red-400' : 
                              node.status === 'offline' ? 'text-gray-500' : 'text-emerald-400'
                            }>
                              {node.status.toUpperCase()}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center mb-3">
                            <div className="text-[8px] font-mono text-white/50">{node.coordinates}</div>
                            <div className="flex gap-2">
                              {node.maintenanceRequired && <AlertTriangle className="w-3 h-3 text-amber-500" />}
                              <div className="flex items-center gap-1 text-[8px] font-mono">
                                <Battery className={`w-2.5 h-2.5 ${node.battery < 20 ? 'text-red-500' : 'text-emerald-500'}`} />
                                {Math.round(node.battery)}%
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-1 text-center bg-white/5 p-1.5 rounded border border-white/10">
                            <div>
                              <p className="text-[7px] text-white/40 uppercase">Gas</p>
                              <p className="text-[9px] font-mono font-bold leading-none">{Math.round(node.gas)}</p>
                            </div>
                            <div>
                              <p className="text-[7px] text-white/40 uppercase">ºC</p>
                              <p className="text-[9px] font-mono font-bold leading-none">{node.temperature.toFixed(1)}</p>
                            </div>
                            <div>
                              <p className="text-[7px] text-white/40 uppercase">Sig</p>
                              <p className="text-[9px] font-mono font-bold leading-none">{Math.round(node.signal)}</p>
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
            Monitor de Infraestructura EcoAlerta Forestal v2.4 • Zoom: {(zoom * 100).toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
};
