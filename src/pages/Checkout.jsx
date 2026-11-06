import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createOrder } from '../api';
import { getOrderDetails } from '../orderUtils';

const MAX_PER_COOKIE = 12;

function Checkout({ cookies, quantities, onClear, onSessionExpired }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const { items, totalCount, totalPrice } = getOrderDetails(cookies, quantities);

  function cookieName(id) {
    return cookies.find((cookie) => cookie.id === id)?.name ?? `Cookie #${id}`;
  }

  async function handlePlaceOrder() {
    const tooMany = items.some((cookie) => quantities[cookie.id] > MAX_PER_COOKIE);
    if (tooMany) {
      setError(`You can order at most ${MAX_PER_COOKIE} of each cookie. Please lower a quantity.`);
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const orderItems = items.map((cookie) => ({
        cookieId: cookie.id,
        quantity: quantities[cookie.id],
      }));

      const order = await createOrder(orderItems);
      setConfirmation(order);
      onClear();
    } catch (err) {
      if (err.status === 401) {
        onSessionExpired();
        return;
      }
      setError(
        err.status === 403
          ? "Your account isn't allowed to place orders."
          : err.message
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <section id="checkout">
        <h2>Order Placed!</h2>
        <p>
          Your order number is <strong>#{confirmation.id}</strong>.
        </p>
        <ul className="cookie-list">
          {confirmation.items.map((item) => (
            <li key={item.cookieId}>
              {item.quantity} × {cookieName(item.cookieId)} — $
              {(item.quantity * item.unitPrice).toFixed(2)}
            </li>
          ))}
        </ul>
        <p><strong>Order total:</strong> ${confirmation.total.toFixed(2)}</p>
        <p>
          <Link to={`/my-orders/${confirmation.id}`}>View this order</Link>
          {' · '}
          <Link to="/cookies">Back to the Cookie Menu</Link>
        </p>
      </section>
    );
  }

  if (totalCount === 0) {
    return (
      <section id="checkout">
        <h2>Checkout</h2>
        <p>
          Your cart is empty. Add cookies from the{' '}
          <Link to="/cookies">Cookie Menu</Link> first.
        </p>
      </section>
    );
  }

  return (
    <section id="checkout">
      <h2>Checkout</h2>
      <p>Review your order, then place it.</p>

      <ul className="cookie-list">
        {items.map((cookie) => (
          <li key={cookie.id}>
            {quantities[cookie.id]} × {cookie.name} — $
            {(quantities[cookie.id] * cookie.price).toFixed(2)}
          </li>
        ))}
      </ul>
      <p><strong>Total cookies:</strong> {totalCount}</p>
      <p><strong>Estimated total:</strong> ${totalPrice.toFixed(2)}</p>

      {error && (
        <p className="form-message error" role="alert">
          {error}
        </p>
      )}

      <div className="checkout-actions">
        <button type="button" onClick={handlePlaceOrder} disabled={submitting}>
          {submitting ? 'Placing order...' : 'Place Order'}
        </button>
        <Link to="/order">Edit order</Link>
      </div>
    </section>
  );
}

export default Checkout;