// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [firmwares, setFirmwares] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Запрос к твоему FastAPI бэкенду
    fetch('http://localhost:8000/firmwares')
      .then(response => response.json())
      .then(data => {
        setFirmwares(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка загрузки:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: '20px' }}>⏳ Загрузка прошивок...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>🚗 Firmware Shop</h1>
      <h2>Каталог прошивок</h2>
      <ul>
        {firmwares.map((firmware) => (
          <li key={firmware.id}>
            {firmware.name} — {firmware.price} ₽
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;