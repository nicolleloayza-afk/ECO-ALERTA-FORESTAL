import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { View, NodeData } from './types';
import { Dashboard } from './components/Dashboard';
import { NodeDetail } from './components/NodeDetail';
import { FireAlert } from './components/FireAlert';
import { EmergencyContacts } from './components/EmergencyContacts';
import { Reports } from './components/Reports';
import { Login } from './components/Login';
import { CommunityPanel } from './components/CommunityPanel';
import { io } from 'socket.io-client';

import { LogOut } from 'lucide-react';

const MOCK_NODES: NodeData[] = [
  { id: '1', name: 'Nodo Machu Picchu', location: 'Cusco, Urubamba', coordinates: '13.16S 72.54W', gas: 120, temperature: 22, humidity: 45, status: 'normal', lastUpdate: '2m', battery: 92, signal: -85, lastMaintenance: '2026-04-15' },
  { id: '2', name: 'Nodo Manu Reserve', location: 'Madre de Dios', coordinates: '12.18S 71.30W', gas: 110, temperature: 28, humidity: 38, status: 'normal', lastUpdate: '5m', battery: 88, signal: -92, lastMaintenance: '2026-04-20' },
  { id: '3', name: 'Nodo Chanchamayo', location: 'Junín, Selva Central', coordinates: '11.05S 75.31W', gas: 140, temperature: 26, humidity: 40, status: 'normal', lastUpdate: '10m', battery: 45, signal: -88, lastMaintenance: '2026-03-10', maintenanceRequired: true },
  { id: '4', name: 'Nodo Kuelap', location: 'Amazonas, Luya', coordinates: '6.41S 77.92W', gas: 130, temperature: 19, humidity: 30, status: 'offline', lastUpdate: '2h', battery: 5, signal: -115, lastMaintenance: '2026-02-15', maintenanceRequired: true },
  { id: '5', name: 'Nodo Oxapampa', location: 'Pasco, Selva Alta', coordinates: '10.57S 75.40W', gas: 850, temperature: 52, humidity: 12, status: 'critical', lastUpdate: 'Justo ahora', battery: 78, signal: -75, lastMaintenance: '2026-05-01' },
  { id: '6', name: 'Nodo Pucallpa', location: 'Ucayali, Coronel Portillo', coordinates: '8.37S 74.55W', gas: 125, temperature: 31, humidity: 42, status: 'normal', lastUpdate: '15m', battery: 95, signal: -82, lastMaintenance: '2026-04-28' },
];

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [nodes, setNodes] = useState<NodeData[]>(MOCK_NODES);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  useEffect(() => {
    const socket = io();

    socket.on('init_nodes', (initialNodes: NodeData[]) => {
      setNodes(initialNodes);
    });

    socket.on('nodes_update', (updatedNodes: NodeData[]) => {
      setNodes(updatedNodes);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Update selectedNode if its data changed in nodes array
  useEffect(() => {
    if (selectedNode) {
      const updated = nodes.find(n => n.id === selectedNode.id);
      if (updated) setSelectedNode(updated);
    }
  }, [nodes, selectedNode?.id]);

  // Trigger auto-alert for Node #005 later to not interrupt login
  useEffect(() => {
    if (currentView === View.DASHBOARD) {
      const timer = setTimeout(() => {
        const criticalNode = nodes.find(n => n.status === 'critical');
        if (criticalNode) {
          setSelectedNode(criticalNode);
          setCurrentView(View.FIRE_ALERT);
        }
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const handleNavigate = (view: View, node?: NodeData) => {
    if (node) setSelectedNode(node);
    setCurrentView(view);
  };

  const handleBackToDashboard = () => {
    setCurrentView(View.DASHBOARD);
    setSelectedNode(null);
  };

  const handleLogout = () => {
    setCurrentView(View.LOGIN);
    setSelectedNode(null);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background-soft font-sans">
      {/* Immersive Header Navigation */}
      <nav className="bg-brand-primary text-white p-4 flex justify-between items-center shadow-lg shrink-0">
        <div>
          <h1 className="text-xl font-black tracking-tighter uppercase leading-none">EcoAlerta Forestal</h1>
          <p className="text-[10px] opacity-70 uppercase tracking-widest mt-1">Escuchando al bosque antes del fuego</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-[10px] font-mono uppercase font-bold tracking-tight">Sistema Activo</span>
          </div>
          <div className="text-right hidden sm:block border-l border-white/20 pl-4">
            <p className="text-[9px] opacity-60 uppercase font-bold">Sincronización</p>
            <p className="text-xs font-mono font-bold">En tiempo real</p>
          </div>
          {currentView !== View.LOGIN && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="ml-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest border border-white/20 transition-colors shadow-lg"
            >
              <LogOut className="w-3 h-3" />
              Salir
            </motion.button>
          )}
        </div>
      </nav>

      <main className="flex-1 p-4 overflow-auto scrollbar-hide">
        <div className="max-w-5xl mx-auto h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full"
            >
              {currentView === View.LOGIN && (
                <Login onLogin={() => setCurrentView(View.DASHBOARD)} />
              )}

              {currentView === View.DASHBOARD && (
                <Dashboard 
                  nodes={nodes} 
                  onNavigate={handleNavigate} 
                />
              )}

              {currentView === View.NODE_DETAIL && selectedNode && (
                <NodeDetail 
                  node={selectedNode} 
                  onBack={handleBackToDashboard} 
                />
              )}

              {currentView === View.FIRE_ALERT && selectedNode && (
                <FireAlert 
                  node={selectedNode} 
                  onConfirm={() => setCurrentView(View.CONTACTS)}
                  onDismiss={handleBackToDashboard}
                />
              )}

              {currentView === View.CONTACTS && selectedNode && (
                <EmergencyContacts 
                  node={selectedNode}
                  onBack={() => setCurrentView(View.FIRE_ALERT)} 
                />
              )}

              {currentView === View.REPORTS && (
                <Reports 
                  onBack={handleBackToDashboard} 
                />
              )}
              {currentView === View.COMMUNITY && (
                <CommunityPanel 
                  onBack={handleBackToDashboard} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Immersive Footer */}
      <footer className="bg-white border-t border-gray-300 p-3 flex justify-between items-center text-[9px] text-gray-500 shrink-0">
        <div className="flex gap-6 font-bold uppercase tracking-tight">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>COORDENADAS: 16.32S 72.22W</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>NIVEL DE SEÑAL: EXCELENTE</span>
        </div>
        <div className="font-mono font-black italic">
          PROTOTIPO ECOALERTA FORESTAL V.2.1.0
        </div>
      </footer>
    </div>
  );
}
