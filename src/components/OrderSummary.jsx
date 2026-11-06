import { Link } from 'react-router-dom';

function OrderSummary({ items, quantities, totalCount, totalPrice, onClear }) {
  return (
    <section id="order">
      <h2>My Order</h2>

      {totalCount === 0 ? (
        <p>
          Your order is empty. Add cookies from the{' '}
          <Link to="/cookies">Cookie Menu</Link>.
        </p>
      ) : (
        <>
          <ul className="cookie-list">
            {items.map((cookie) => (
              <li key={cookie.id}>
                {quantities[cookie.id]} × {cookie.name} — $
                {(quantities[cookie.id] * cookie.price).toFixed(2)}
              </li>
            ))}
          </ul>
          <p><strong>Total cookies:</strong> {totalCount}</p>
          <p><strong>Total price:</strong> ${totalPrice.toFixed(2)}</p>

          <div className="order-actions">
            <Link className="button-link" to="/checkout">
              Proceed to Checkout
            </Link>
            <button type="button" className="clear-button" onClick={onClear}>
              Clear Order
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default OrderSummary;