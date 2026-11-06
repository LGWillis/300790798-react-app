const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request(path, options = {}) {
  const headers = { ...options.headers };
  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  let response;
  try {
    response = await fetch(API_URL + path, {
      credentials: 'include',
      ...options,
      headers,
    });
  } catch {
    throw new ApiError('Could not reach the server. Please try again.', 0);
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // The response had no JSON body
  }

  if (!response.ok) {
    throw new ApiError(data?.error || `Request failed (${response.status})`, response.status);
  }

  return data;
}

export function login(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return request('/auth/logout', { method: 'POST' });
}

export function getCurrentUser() {
  return request('/auth/me');
}

export function createOrder(items) {
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify({ items }),
  });
}

export function getMyOrders() {
  return request('/orders');
}

export function getOrder(id) {
  return request(`/orders/${id}`);
}