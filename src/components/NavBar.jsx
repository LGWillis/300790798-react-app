import { NavLink } from 'react-router-dom';

function NavBar({ links, currentUser, authLoading, onLogout }) {
  return (
    <nav className="site-nav">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.end}>
          {link.label}
        </NavLink>
      ))}

      <div className="nav-user">
        {!authLoading &&
          (currentUser ? (
            <>
              <NavLink to="/my-orders">My Orders</NavLink>
              <span className="nav-greeting">
                Logged in as {currentUser.username}
              </span>
              <button type="button" onClick={onLogout}>
                Log Out
              </button>
            </>
          ) : (
            <NavLink to="/login">Log In</NavLink>
          ))}
      </div>
    </nav>
  );
}

export default NavBar;