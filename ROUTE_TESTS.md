# Direct Navigation
Entering /, /cookies, /cookies/:id, /order in the URL return the correct pages

# Clicking on Links
- Clicking on the navigation links changes url, the view, and the page doesn't reload
- Clicking on a cookie name opens the cookie detail page
- Clicking "back to the menu" returns you to /cookies
- After adding cookies and clicking "my order", the order contents remain
- The active nav link highlights the current page

# Broswer Back
Home > Menu > Details > Order, then clicking back and forward, show the previous and next page. The order contents also remain unchanged on back and forward.

# Refreshing Routed Page
/cookies/:id (like /cookies/2) displays the same details when the page reloads. /order reloads the order page and as of now, the order contents are erased due to quantities being stored in the React State and not in localStorage.

# Invalid Identifiers
- /cookies/202 returns "Page Not Found" with a message namning id 202
- /cookies/sprite returns the same, but the message names id sprite
- /koolaid returns "Page Not Found" with a generic message.