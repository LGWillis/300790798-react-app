function OrderSummary({ items, quantities, totalCount, totalPrice, onClear }) {
  return (
    <section id="order">
      <h2>My Order</h2>

      {totalCount === 0 ? (
        <p>Your order is empty. Use the + buttons above to add cookies.</p>
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
          <button type="button" className="clear-button" onClick={onClear}>
            Clear Order
          </button>
        </>
      )}
    </section>
  );
}

export default OrderSummary;