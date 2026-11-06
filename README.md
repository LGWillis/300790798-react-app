# Luke's Cookies

A React + Vite storefront for Luke's Cookies. Visitors can browse the cookie lineup and build a cart. After logging in, they can place an order and review their past orders. The frontend talks to an Express + MySQL backend that handles accounts, sessions, and orders.

- **Frontend:** React 19, Vite, React Router
- **Backend:** Express 5, MySQL, `express-session` ([backend repository](https://github.com/LGWillis/application-development-1/tree/main/final-project))

## Running the Project Locally

### Backend

1. Create a MySQL database named `recipe_app`, then run `recipe.sql` followed by `cookie_orders.sql` (both are in the backend repository).
2. Copy `.env.example` to `.env` and fill in the values: `SESSION_SECRET`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and optionally `DB_HOST` and `FRONTEND_ORIGIN`.
3. Run `npm install`, then `node server.js`. The API runs at `http://localhost:3000`.

### Frontend

1. Run `npm install`.
2. Copy `.env.example` to `.env`. It contains `VITE_API_URL=http://localhost:3000`.
3. Run `npm run dev`. The site runs at `http://localhost:5173`.

The app has no sign-up page, so you'll have to create a test account with `POST /auth/register` (I used Postman) with a username, email, and password.

## Route Plan

`/` -> Home (Public)
`/cookies` -> Cookie Menu, (Public)
`/cookies/:id` -> Cookie Details (Public)
`/order` -> My Order (cart), (Public)  
`/login` -> Log In, (Public)
`/checkout` -> Checkout (Logged in)
`/my-orders` -> Order History, (Logged in)
`/my-orders/:id` | Order Details, (Logged in)
`*` -> Not Found, (Public)

## Backend Authentication

The frontend uses the Express + MySQL backend from Application Development I (repository linked earlier), extended with `cookies`, `orders`, and `order_items` tables. It runs locally at `http://localhost:3000`. Authentication uses server-side sessions: after login, the server sends a `connect.sid` session cookie, and the browser returns it with later requests.

### Login endpoint

`POST /auth/login`

Request body (JSON):
{ "email": "user@example.com", "password": "..." }

Valid credentials -> 200 OK	{ "message": "Login successful", "user": { "id", "username", "email" } } plus a session cookie

### How authentication is carried between frontend and backend

1. The login form sends the email and password to `POST /auth/login` over `fetch`.
2. The server checks the password against a bcrypt hash and, if successsul, stores the user's id in a server-side session. It responds with a `Set-Cookie: connect.sid=...` header.
3. The session cookie is `HttpOnly`, so JavaScript in the page cannot read it. The browser attaches it automatically to later requests, which is why every `fetch` in `src/api.js` uses `credentials: 'include'`.
4. The server's `requireAuth` middleware rejects any protected request whose session has no user id with `401`. Order routes also check that the order belongs to the logged-in user and return `403` otherwise.
5. Because the frontend (`localhost:5173`) and backend (`localhost:3000`) are different origins, the backend enables CORS for that exact origin with `credentials: true`. A wildcard origin would not work with cookies.

The frontend never stores a password or token. The only user data it keeps is the non-sensitive `currentUser` object (id, username, email) in React state, and nothing is saved to `localStorage`. The password exists only in the login form's state until the request completes, and it is cleared after a failed attempt.

### What should never be committed to a public frontend repository

- Database passwords or any database connection details
- The session signing secret (`SESSION_SECRET`) or any other server secret
- Real `.env` files (only `.env.example` with placeholder values is committed)
- Private API keys or tokens
- Real user passwords, including test account passwords
- Session cookie values or screenshots that show them

### The browser network panel

- The login request returns `200` with a `Set-Cookie: connect.sid=...; HttpOnly` response header.
- The `POST /orders` request returns `201`. Its request headers include the session cookie, and its payload contains only `cookieId` and `quantity`, with no password and no prices.
- A protected request made after the session has been wiped (for example, after a backend restart) returns `401`.
