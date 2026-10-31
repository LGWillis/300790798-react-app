import { Outlet } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/cookies', label: 'Cookie Menu' },
  { to: '/order', label: 'My Order' },
];

function Layout() {
  return (
    <>
      <Header title="Luke's Cookies" />
      <NavBar links={navLinks} />
      <main>
        <Outlet />
      </main>
      <Footer text="Luke's Cookies | 2026" />
    </>
  );
}

export default Layout;