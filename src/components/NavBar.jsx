import { NavLink } from 'react-router-dom';

function NavBar({ links }) {
  return (
    <nav className="site-nav">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.end}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavBar;