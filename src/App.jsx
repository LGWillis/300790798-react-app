import { useState } from 'react';
import './App.css';
import { cookies } from './cookies.js';
import Header from './components/Header';
import NavBar from './components/NavBar';
import About from './components/About';
import CookieLineup from './components/CookieLineup';
import CookieRow from './components/CookieRow';
import OrderSummary from './components/OrderSummary';
import Footer from './components/Footer';

const navLinks = [
  { href: '#about', label: 'Who I am' },
  { href: '#cookies', label: 'Cookie Lineup' },
  { href: '#descriptions', label: 'Cookie Descriptions' },
  { href: '#order', label: 'My Order' },
];

function App() {
  // State
  const [quantities, setQuantities] = useState({});

  function handleAdd(id) {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  function handleRemove(id) {
    setQuantities((prev) => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id] -= 1;
      } else {
        delete next[id];
      }
      return next;
    });
  }

  function handleClear() {
    setQuantities({});
  }

  // Derived values
  const orderedCookies = cookies.filter((cookie) => quantities[cookie.id]);
  const totalCount = orderedCookies.reduce((sum, c) => sum + quantities[c.id], 0);
  const totalPrice = orderedCookies.reduce((sum, c) => sum + quantities[c.id] * c.price, 0);

  return (
    <>
      <Header title="Luke's Cookies" />
      <NavBar links={navLinks} />

      <main>
        <About />
        <CookieLineup cookies={cookies} />

        <section id="descriptions">
          <h2>Cookie Descriptions</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Flavor</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Order</th>
                </tr>
              </thead>
              <tbody>
                {cookies.map((cookie) => (
                  <CookieRow
                    key={cookie.id}
                    cookie={cookie}
                    quantity={quantities[cookie.id] || 0}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <OrderSummary
          items={orderedCookies}
          quantities={quantities}
          totalCount={totalCount}
          totalPrice={totalPrice}
          onClear={handleClear}
        />
      </main>

      <Footer text="Luke's Cookies | 2026" />
    </>
  );
}

export default App;