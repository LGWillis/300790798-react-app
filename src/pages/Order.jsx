import OrderSummary from '../components/OrderSummary';

function Order({ cookies, quantities, onClear }) {
  // Derived values: calculated from props on every render
  const orderedCookies = cookies.filter((cookie) => quantities[cookie.id]);
  const totalCount = orderedCookies.reduce((sum, c) => sum + quantities[c.id], 0);
  const totalPrice = orderedCookies.reduce(
    (sum, c) => sum + quantities[c.id] * c.price,
    0
  );

  return (
    <OrderSummary
      items={orderedCookies}
      quantities={quantities}
      totalCount={totalCount}
      totalPrice={totalPrice}
      onClear={onClear}
    />
  );
}

export default Order;