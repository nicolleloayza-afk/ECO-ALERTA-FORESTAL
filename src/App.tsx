import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { View, NodeData } from './types';
import { Dashboard } from './components/Dashboard';
import { NodeDetail } from './components/NodeDetail';
import { FireAlert } from './components/FireAlert';
import { EmergencyContacts } from './components/EmergencyContacts';
import { Reports } from './components/Reports';
import { Login } from './components/Login';

const MOCK_NODES: NodeData[] = [
  { id: '1', name: 'Nodo Forestal #001', location: 'Valle Central', gas: 120, temperature: 24, humidity: 45, status: 'normal', lastUpdate: '2m' },
  { id: '2', name: 'Nodo Forestal #002', location: 'Cerro Blanco', gas: 110, temperature: 26, humidity: 38, status: 'normal', lastUpdate: '5m' },
  { id: '3', name: 'Nodo Forestal #003', location: 'Pampa Alta', gas: 140, temperature: 25, humidity: 40, status: 'normal', lastUpdate: '10m' },
  { id: '4', name: 'Nodo Forestal #004', location: 'La Joya Norte', gas: 130, temperature: 27, humidity: 30, status: 'normal', lastUpdate: '1m' },
  { id: '5', name: 'Nodo Forestal #005', location: 'Quebrada Honda', gas: 850, temperature: 48, humidity: 12, status: 'critical', lastUpdate: 'Justo ahora' },
  { id: '6', name: 'Nodo Forestal #006', location: 'Sector Este', gas: 125, temperature: 25, humidity: 42, status: 'normal', lastUpdate: '15m' },
];

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  // Trigger auto-alert for Node #005 later to not interrupt login
  useEffect(() => {
    if (currentView === View.DASHBOARD) {
      const timer = setTimeout(() => {
        const criticalNode = MOCK_NODES.find(n => n.status === 'critical');
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

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background-soft font-sans">
      {/* Immersive Header Navigation */}
      <nav className="bg-brand-primary text-white p-4 flex justify-between items-center shadow-lg shrink-0">
        <div>
          <h1 className="text-xl font-black tracking-tighter uppercase leading-none">EcoAlerta</h1>
          <p className="text-[10px] opacity-70 uppercase tracking-widest mt-1">Sistema de Vigilancia Forestal</p>
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
                  nodes={MOCK_NODES} 
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
          PROTOTIPO ECOALERTA V.2.1.0
        </div>
      </footer>
    </div>
  );
}
