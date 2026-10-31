import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound';

function CookieDetails({ cookies, quantities, onAdd, onRemove }) {
  const { id } = useParams();
  const cookie = cookies.find((c) => c.id === Number(id));
  
  if (!cookie) {
    return <NotFound message={`No cookie found with the id "${id}".`} />;
  }

  const quantity = quantities[cookie.id] || 0;

  return (
    <section id="cookie-details">
      <h2>{cookie.name}</h2>
      <p>{cookie.description}</p>
      <p><strong>Price:</strong> ${cookie.price.toFixed(2)} each</p>

      <div className="qty-controls">
        <button type="button" onClick={() => onRemove(cookie.id)} disabled={quantity === 0}>−</button>
        <span className="qty">{quantity}</span>
        <button type="button" onClick={() => onAdd(cookie.id)}>+</button>
      </div>

      <p>
        <Link to="/cookies">← Back to the menu</Link>
      </p>
    </section>
  );
}

export default CookieDetails;