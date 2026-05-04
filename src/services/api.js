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
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error(`API Error (${endpoint}):`, err);
    throw err;
  }
};

export const signUp = (email, password, name) =>
  apiCall('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });

export const signIn = (email, password) =>
  apiCall('/api/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const getCryptos = () => apiCall('/api/cryptocurrencies');
export const getCryptoById = (id) => apiCall(`/api/cryptocurrencies/${id}`);
export const getMarketStats = () => apiCall('/api/market/stats');
