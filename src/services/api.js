// API utility for backend calls
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
console.log('🔗 API URL configured:', API_URL);

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  console.log(`📡 API Call: ${options.method || 'GET'} ${url}`);
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
      console.error(`❌ API Error (${endpoint}):`, errorMsg);
      throw new Error(errorMsg);
    }
    console.log(`✅ API Success (${endpoint}):`, data);
    return data;
  } catch (err) {
    console.error(`❌ API Error (${endpoint}):`, err.message);
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
