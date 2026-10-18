import './App.css';
import { cookies } from './cookies.js';

function App() {
  return (
    <>
      <header className="site-header">
        <h1>Luke's Cookies</h1>
      </header>

      <nav className="site-nav">
        <a href="#about">Who I am</a>
        <a href="#cookies">Cookie Lineup</a>
        <a href="#descriptions">Cookie Descriptions</a>
      </nav>

      <main>
        <section id="about">
          <h2>Learn about Luke's Cookies</h2>
          <p>
            When I started Luke's Cookies, I had no idea where to begin.
            I knew I loved to bake desserts of all varieties, but I wasn't
            sure how to turn that passion into a business. After careful
            consideration of many career paths, I decided to specialize
            in selling gourmet cookies and other baked goods.
          </p>
          <p>
            I now offer four permanent cookie flavors, with one monthly
            special. You can purchase my cookies online or in person at
            the University of Rio Grande's campus. Thank you for your support!
          </p>
        </section>

        <section id="cookies">
          <h2>Current Cookie Lineup</h2>
          <p>
            At Luke's Cookies, we offer four permanent cookie flavors,
            with one monthly special. This month's lineup includes:
          </p>

          <ul className="cookie-list">
            {cookies.map((cookie) => (
              <li key={cookie.name}>{cookie.name}</li>
            ))}
          </ul>

          <img
            className="cookie-image"
            src="/images/cookies.jpg"
            alt="An assortment of gourmet cookies"
          />
        </section>

        <section id="descriptions">
          <h2>Cookie Descriptions</h2>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Flavor</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                {cookies.map((cookie) => (
                  <tr key={cookie.name}>
                    <td>{cookie.name}</td>
                    <td>{cookie.description}</td>
                    <td>${cookie.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Luke's Cookies | 2026</p>
      </footer>
    </>
  );
}

export default App;