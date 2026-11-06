import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/';

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (trimmedEmail === '' || password === '') {
      setError('Please enter your email and password.');
      return;
    }

    if (!trimmedEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const data = await login(trimmedEmail, password);
      onLogin(data.user);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
      setPassword('');
      setSubmitting(false);
    }
  }

  return (
    <section id="login">
      <h2>Log In</h2>
      <p>Log in to place your cookie order.</p>

      {location.state?.from && (
        <p className="form-message" role="status">
            You need to log in to view that page.
        </p>
      )}
      
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />

        {error && (
          <p className="form-message error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </section>
  );
}

export default Login;