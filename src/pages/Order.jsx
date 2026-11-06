import OrderSummary from '../components/OrderSummary';
import { getOrderDetails } from '../orderUtils';

function Order({ cookies, quantities, onClear }) {
  const { items, totalCount, totalPrice } = getOrderDetails(cookies, quantities);

  return (
    <OrderSummary
      items={items}
      quantities={quantities}
      totalCount={totalCount}
      totalPrice={totalPrice}
      onClear={onClear}
    />
  );
}

export default Order;