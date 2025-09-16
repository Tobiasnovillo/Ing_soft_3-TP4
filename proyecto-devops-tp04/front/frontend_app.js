import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:3001';

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkHealth = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/health`);
      setHealth(response.data);
    } catch (error) {
      console.error('Error checking health:', error);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>DevOps Pipeline Demo</h1>
        <p>Frontend + Backend con Azure DevOps</p>
      </header>

      <main className="App-main">
        <section className="status-section">
          <h2>Estado del Backend</h2>
          {health ? (
            <div className="status-card">
              <p>✅ Status: {health.status}</p>
              <p>⏱️ Uptime: {Math.floor(health.uptime)} segundos</p>
            </div>
          ) : (
            <p>⏳ Verificando conexión...</p>
          )}
        </section>

        <section className="users-section">
          <h2>Usuarios</h2>
          <button onClick={fetchUsers} disabled={loading}>
            {loading ? 'Cargando...' : 'Cargar Usuarios'}
          </button>
          
          {users.length > 0 && (
            <div className="users-grid">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;