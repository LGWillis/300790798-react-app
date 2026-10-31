import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { cookies } from './cookies.js';
import Layout from './components/Layout';
import Home from './pages/Home';
import CookieMenu from './pages/CookieMenu';
import Order from './pages/Order';

function App() {
  // Shared state: { [cookieId]: quantity }
  const [quantities, setQuantities] = useState({});

  function handleAdd(id) {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  function handleRemove(id) {
    setQuantities((prev) => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id] -= 1;
      } else {
        delete next[id];
      }
      return next;
    });
  }

  function handleClear() {
    setQuantities({});
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home cookies={cookies} />} />
        <Route
          path="cookies"
          element={
            <CookieMenu
              cookies={cookies}
              quantities={quantities}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          }
        />
        <Route
          path="order"
          element={
            <Order
              cookies={cookies}
              quantities={quantities}
              onClear={handleClear}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;