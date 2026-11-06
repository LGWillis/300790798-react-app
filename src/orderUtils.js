export function getOrderDetails(cookies, quantities) {
  const items = cookies.filter((cookie) => quantities[cookie.id]);
  const totalCount = items.reduce((sum, c) => sum + quantities[c.id], 0);
  const totalPrice = items.reduce((sum, c) => sum + quantities[c.id] * c.price, 0);

  return { items, totalCount, totalPrice };
}