function CookieLineup({ cookies }) {
  return (
    <section id="cookies">
      <h2>Current Cookie Lineup</h2>
      <p>
        At Luke's Cookies, we offer four permanent cookie flavors, with one
        monthly special. This month's lineup includes:
      </p>
      <ul className="cookie-list">
        {cookies.map((cookie) => (
          <li key={cookie.id}>{cookie.name}</li>
        ))}
      </ul>
      <img
        className="cookie-image"
        src="/images/cookies.jpg"
        alt="An assortment of gourmet cookies"
      />
    </section>
  );
}

export default CookieLineup;