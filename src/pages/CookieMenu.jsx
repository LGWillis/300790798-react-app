import CookieRow from '../components/CookieRow';

function CookieMenu({ cookies, quantities, onAdd, onRemove }) {
  return (
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
                onAdd={onAdd}
                onRemove={onRemove}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CookieMenu;