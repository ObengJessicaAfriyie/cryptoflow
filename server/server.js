/**
 * CryptoFlow Backend Server
 * ⚠️ EDUCATIONAL DEMO ONLY - Not affiliated with Coinbase or any real crypto exchange
 * 
 * This is a student project for multimedia web development course.
 * It demonstrates basic Node.js/Express server setup with crypto data APIs.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB, { getDBReadyState, isDBConnected } from './db.js';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
// Also try loading .env.local for developer overrides (ignored by git)
try {
  dotenv.config({ path: './.env.local' });
} catch (e) {
  // ignore if not present
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize DB connection (if MONGODB_URI is provided)
connectDB().catch(err => {
  console.error('Database init error (ignored):', err && err.message ? err.message : err);
});

const ensureDatabase = (req, res, next) => {
  if (!isDBConnected()) {
    return res.status(503).json({
      success: false,
      error: 'Database not connected',
      message: 'Set MONGODB_URI and redeploy the backend so MongoDB can connect.',
      readyState: getDBReadyState(),
    });
  }

  next();
};

// ── Middleware ──
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://cryptoflowcash.vercel.app'],
  credentials: true,
}));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'}`);
  next();
});

// ── Educational Disclaimer ──
app.use((req, res, next) => {
  res.setHeader('X-Educational-Disclaimer', 'This is an educational demo project, not a real cryptocurrency exchange');
  next();
});

// ── Mock Crypto Data ──
const mockCryptoData = [
  {
    id: 'BTC',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67730.65,
    change24h: -1.66,
    marketCap: 1.34e12,
    volume24h: 42e9,
    supply: 21e6,
  },
  {
    id: 'ETH',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3534.36,
    change24h: -0.93,
    marketCap: 425e9,
    volume24h: 21e9,
    supply: 120.5e6,
  },
  {
    id: 'USDT',
    symbol: 'USDT',
    name: 'Tether',
    price: 10.77,
    change24h: 0.01,
    marketCap: 112.5e9,
    volume24h: 79.1e9,
    supply: 10.44e9,
  },
];

// ── Routes ──

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'CryptoFlow backend is running',
    endpoints: [
      'GET /health',
      'GET /api/cryptocurrencies',
      'GET /api/cryptocurrencies/:id',
      'GET /api/market/stats',
      'GET /api/users',
      'POST /api/auth/signup',
      'POST /api/auth/signin',
    ],
    databaseConnected: isDBConnected(),
    readyState: getDBReadyState(),
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'CryptoFlow Backend is running',
    disclaimer: 'This is an educational demo project',
    databaseConnected: isDBConnected(),
  });
});

// Get all crypto data
app.get('/api/cryptocurrencies', (req, res) => {
  res.json({
    success: true,
    data: mockCryptoData,
    notice: 'DEMO DATA: This is not real market data. For educational purposes only.',
  });
});

// Get single crypto
app.get('/api/cryptocurrencies/:id', (req, res) => {
  const crypto = mockCryptoData.find(c => c.id === req.params.id.toUpperCase());
  if (!crypto) {
    return res.status(404).json({
      success: false,
      error: 'Cryptocurrency not found',
    });
  }
  res.json({
    success: true,
    data: crypto,
    notice: 'DEMO DATA: This is not real market data.',
  });
});

// Mock authentication endpoint (for demo purposes only)
app.post('/api/auth/signup', ensureDatabase, async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, error: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, passwordHash, name });

    res.status(201).json({ success: true, data: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, error: 'Could not create user' });
  }
});

app.post('/api/auth/signin', ensureDatabase, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash || '');
    if (!match) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    res.json({ success: true, data: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ success: false, error: 'Signin failed' });
  }
});

// Simple users listing for verification (development only)
app.get('/api/users', ensureDatabase, async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash -__v');
    res.json({ success: true, data: users });
  } catch (err) {
    console.error('List users error:', err);
    res.status(500).json({ success: false, error: 'Could not list users' });
  }
});

// Market stats endpoint
app.get('/api/market/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalMarketCap: 2.43e12,
      totalVolume: 1.26e11,
      btcDominance: 60.17,
      lastUpdated: new Date().toISOString(),
    },
    notice: 'DEMO DATA: This is not real market data.',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /api/cryptocurrencies',
      'GET /api/cryptocurrencies/:id',
      'GET /api/market/stats',
      'GET /api/users',
      'POST /api/auth/signup',
      'POST /api/auth/signin',
    ],
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CryptoFlow Backend running on port ${PORT}`);
  console.log(`⚠️  EDUCATIONAL DEMO ONLY - Not a real cryptocurrency exchange`);
  console.log(`📍 Base URL: http://localhost:${PORT}`);
  console.log(`💪 Check /health for status`);
});
