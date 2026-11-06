import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth({ currentUser, authLoading, children }) {
  const location = useLocation();

  if (authLoading) {
    return <p role="status">Checking your login...</p>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children ?? <Outlet />;
}

export default RequireAuth;