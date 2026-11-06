import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOrder } from '../api';
import AccessDenied from '../components/AccessDenied';
import NotFound from './NotFound';

function OrderDetails({ onSessionExpired }) {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failure, setFailure] = useState(null);

  useEffect(() => {
    let ignore = false;

    getOrder(id)
      .then((data) => {
        if (!ignore) setOrder(data);
      })
      .catch((err) => {
        if (ignore) return;
        if (err.status === 401) {
          onSessionExpired();
        } else {
          setFailure({ status: err.status, message: err.message });
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id, onSessionExpired]);

  if (loading) {
    return (
      <section id="order-details">
        <p role="status">Loading order...</p>
      </section>
    );
  }

  if (failure?.status === 403) {
    return (
      <AccessDenied message="You're logged in, but this order belongs to a different account, so you can't view it." />
    );
  }

  if (failure?.status === 404) {
    return <NotFound message={`There is no order #${id}.`} />;
  }

  if (failure) {
    return (
      <section id="order-details">
        <h2>Could Not Load Order</h2>
        <p className="form-message error" role="alert">
          {failure.message}
        </p>
        <p><Link to="/my-orders">Back to My Orders</Link></p>
      </section>
    );
  }

  if (!order) {
    // A 401 was handled above and the guard is about to redirect to login
    return null;
  }

  return (
    <section id="order-details">
      <h2>Order #{order.id}</h2>
      <p>Placed {new Date(order.createdAt).toLocaleString()}</p>

      <ul className="cookie-list">
        {order.items.map((item) => (
          <li key={item.cookieId}>
            {item.quantity} × {item.name} — $
            {(item.quantity * item.unitPrice).toFixed(2)}
          </li>
        ))}
      </ul>

      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      <p><Link to="/my-orders">← Back to My Orders</Link></p>
    </section>
  );
}

export default OrderDetails;