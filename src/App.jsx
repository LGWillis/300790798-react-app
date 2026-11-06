import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { cookies } from './cookies.js';
import { getCurrentUser, logout } from './api';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import CookieMenu from './pages/CookieMenu';
import CookieDetails from './pages/CookieDetails';
import Order from './pages/Order';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  // Shared state: { [cookieId]: quantity }
  const [quantities, setQuantities] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    getCurrentUser()
      .then((data) => {
        if (!ignore) setCurrentUser(data.user);
      })
      .catch(() => {
        
      })
      .finally(() => {
        if (!ignore) setAuthLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

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

  function handleLogin(user) {
    setCurrentUser(user);
  }

  async function handleLogout() {
    try {
      await logout();
    } catch {
      // Ignore
    }
    setCurrentUser(null);
    setQuantities({});
    navigate('/login');
  }

  const handleSessionExpired = useCallback(() => {
    setCurrentUser(null);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            currentUser={currentUser}
            authLoading={authLoading}
            onLogout={handleLogout}
          />
        }
      >
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
          path="cookies/:id"
          element={
            <CookieDetails
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
        <Route path="login" element={<Login onLogin={handleLogin} />} />

        <Route
          element={
            <RequireAuth currentUser={currentUser} authLoading={authLoading} />
          }
        >
          <Route
            path="checkout"
            element={
              <Checkout
                cookies={cookies}
                quantities={quantities}
                onClear={handleClear}
                onSessionExpired={handleSessionExpired}
              />
            }
          />
          <Route
            path="my-orders"
            element={<OrderHistory onSessionExpired={handleSessionExpired} />}
          />
          <Route
            path="my-orders/:id"
            element={<OrderDetails onSessionExpired={handleSessionExpired} />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;