import { Link } from 'react-router-dom';

function AccessDenied({ message = "You don't have permission to view this page." }) {
  return (
    <section id="access-denied">
      <h2>Access Denied</h2>
      <p>{message}</p>
      <p>
        <Link to="/my-orders">Go to My Orders</Link> or{' '}
        <Link to="/">return Home</Link>.
      </p>
    </section>
  );
}

export default AccessDenied;