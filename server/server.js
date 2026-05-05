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
import User from './models/User.js';
import Crypto from './models/Crypto.js';
import verifyToken from './middleware/auth.js';
import { register, login, getProfile } from './controllers/authController.js';
import {
  getAllCryptos,
  getCryptoById,
  getTopGainers,
  getNewListings,
  addCrypto,
  updateCrypto,
  deleteCrypto,
} from './controllers/cryptoController.js';
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

// ── Routes ──

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'CryptoFlow backend is running',
    endpoints: [
      'GET /health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/profile (protected)',
      'GET /api/crypto',
      'GET /api/crypto/:id',
      'GET /api/crypto/gainers',
      'GET /api/crypto/new',
      'POST /api/crypto',
      'GET /api/market/stats',
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

// ── Authentication Routes ──

// Register new user
app.post('/api/auth/register', ensureDatabase, register);

// Login user
app.post('/api/auth/login', ensureDatabase, login);

// Get user profile (protected)
app.get('/api/auth/profile', verifyToken, getProfile);

// ── Cryptocurrency Routes ──

// Get all cryptocurrencies
app.get('/api/crypto', getAllCryptos);

// Get top gainers (must be before /:id route)
app.get('/api/crypto/gainers', getTopGainers);

// Get new listings (must be before /:id route)
app.get('/api/crypto/new', getNewListings);

// Get single cryptocurrency by ID
app.get('/api/crypto/:id', getCryptoById);

// Add new cryptocurrency (for admin/demo purposes)
app.post('/api/crypto', addCrypto);

// Update cryptocurrency (for admin/demo purposes)
app.put('/api/crypto/:id', updateCrypto);

// Delete cryptocurrency (for admin/demo purposes)
app.delete('/api/crypto/:id', deleteCrypto);

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

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'GET /health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/profile',
      'GET /api/crypto',
      'GET /api/crypto/:id',
      'GET /api/crypto/gainers',
      'GET /api/crypto/new',
      'POST /api/crypto',
      'GET /api/market/stats',
      'GET /api/users',
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
