import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../api';

function OrderHistory({ onSessionExpired }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadOrders() {
      try {
        const data = await getMyOrders();
        if (!ignore) setOrders(data);
      } catch (err) {
        if (ignore) return;
        if (err.status === 401) {
          onSessionExpired();
        } else {
          setError(err.message);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadOrders();

    return () => {
      ignore = true;
    };
  }, [onSessionExpired]);

  return (
    <section id="orders">
      <h2>My Orders</h2>

      {loading && <p role="status">Loading your orders...</p>}

      {error && (
        <p className="form-message error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && orders.length === 0 && (
        <p>
          You haven't placed any orders yet. Browse the{' '}
          <Link to="/cookies">Cookie Menu</Link>.
        </p>
      )}

      {orders.length > 0 && (
        <ul className="cookie-list">
          {orders.map((order) => (
            <li key={order.id}>
              <Link to={`/my-orders/${order.id}`}>Order #{order.id}</Link> — $
              {order.total.toFixed(2)} —{' '}
              {new Date(order.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default OrderHistory;