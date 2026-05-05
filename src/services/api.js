// API utility for backend calls
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data?.error || `HTTP ${response.status}`;
      throw new Error(errorMsg);
    }
    return data;
  } catch (err) {
    console.error(`API Error (${endpoint}):`, err);
    throw err;
  }
};

// ── Authentication ──

export const signUp = (email, password, name) =>
  apiCall('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });

export const signIn = (email, password) =>
  apiCall('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const getUserProfile = (token) =>
  apiCall('/api/auth/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

// ── Cryptocurrencies ──

export const getCryptos = () => apiCall('/api/crypto');

export const getCryptoById = (id) => apiCall(`/api/crypto/${id}`);

export const getTopGainers = () => apiCall('/api/crypto/gainers');

export const getNewListings = () => apiCall('/api/crypto/new');

export const addCrypto = (name, symbol, price, image, change24h) =>
  apiCall('/api/crypto', {
    method: 'POST',
    body: JSON.stringify({ name, symbol, price, image, change24h }),
  });

// ── Market Stats ──

export const getMarketStats = () => apiCall('/api/market/stats');
