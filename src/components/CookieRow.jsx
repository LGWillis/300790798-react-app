function CookieRow({ cookie, quantity, onAdd, onRemove }) {
  return (
    <tr>
      <td>{cookie.name}</td>
      <td>{cookie.description}</td>
      <td>${cookie.price.toFixed(2)}</td>
      <td>
        <div className="qty-controls">
          <button type="button" onClick={() => onRemove(cookie.id)} disabled={quantity === 0}>−</button>
          <span className="qty">{quantity}</span>
          <button type="button" onClick={() => onAdd(cookie.id)}>+</button>
        </div>
      </td>
    </tr>
  );
}

export default CookieRow;