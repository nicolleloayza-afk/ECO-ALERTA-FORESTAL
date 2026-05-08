import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  const PORT = 3000;

  // Mock data generator for nodes
  const nodes = [
    { id: '1', name: 'Nodo Machu Picchu', location: 'Cusco, Urubamba', coordinates: '13.16S 72.54W', gas: 120, temperature: 22, humidity: 45, status: 'normal', lastUpdate: '2m', battery: 92, signal: -85, lastMaintenance: '2026-04-15', x: 25, y: 30 },
    { id: '2', name: 'Nodo Manu Reserve', location: 'Madre de Dios', coordinates: '12.18S 71.30W', gas: 110, temperature: 28, humidity: 38, status: 'normal', lastUpdate: '5m', battery: 88, signal: -92, lastMaintenance: '2026-04-20', x: 65, y: 20 },
    { id: '3', name: 'Nodo Chanchamayo', location: 'Junín, Selva Central', coordinates: '11.05S 75.31W', gas: 140, temperature: 26, humidity: 40, status: 'normal', lastUpdate: '10m', battery: 45, signal: -88, lastMaintenance: '2026-03-10', maintenanceRequired: true, x: 50, y: 55 },
    { id: '4', name: 'Nodo Kuelap', location: 'Amazonas, Luya', coordinates: '6.41S 77.92W', gas: 130, temperature: 19, humidity: 30, status: 'offline', lastUpdate: '2h', battery: 5, signal: -115, lastMaintenance: '2026-02-15', maintenanceRequired: true, x: 20, y: 75 },
    { id: '5', name: 'Nodo Oxapampa', location: 'Pasco, Selva Alta', coordinates: '10.57S 75.40W', gas: 850, temperature: 52, humidity: 12, status: 'critical', lastUpdate: 'Justo ahora', battery: 78, signal: -75, lastMaintenance: '2026-05-01', x: 45, y: 40 },
    { id: '6', name: 'Nodo Pucallpa', location: 'Ucayali, Coronel Portillo', coordinates: '8.37S 74.55W', gas: 125, temperature: 31, humidity: 42, status: 'normal', lastUpdate: '15m', battery: 95, signal: -82, lastMaintenance: '2026-04-28', x: 80, y: 60 },
  ];

  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.emit('init_nodes', nodes);

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  // Broadcast updates every 5 seconds
  setInterval(() => {
    nodes.forEach(node => {
      if (node.status === 'offline') return;
      
      // Randomly fluctuate values
      node.temperature = Math.max(15, Math.min(60, node.temperature + (Math.random() * 2 - 1)));
      node.gas = Math.max(50, Math.min(1000, node.gas + (Math.random() * 20 - 10)));
      node.humidity = Math.max(5, Math.min(95, node.humidity + (Math.random() * 4 - 2)));
      node.battery = Math.max(0, node.battery - 0.01);
      node.lastUpdate = 'Justo ahora';
      
      // Small random walk for position
      if (node.x !== undefined) node.x = Math.max(5, Math.min(95, node.x + (Math.random() * 0.4 - 0.2)));
      if (node.y !== undefined) node.y = Math.max(5, Math.min(95, node.y + (Math.random() * 0.4 - 0.2)));
    });
    io.emit('nodes_update', nodes);
  }, 5000);

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
