import { Link } from 'react-router-dom';

function NotFound({ message = "We couldn't find that page." }) {
  return (
    <section id="not-found">
      <h2>Page Not Found</h2>
      <p>{message}</p>
      <p>
        <Link to="/">Back to Home</Link> or <Link to="/cookies">browse the Cookie Menu</Link>.
      </p>
    </section>
  );
}

export default NotFound;