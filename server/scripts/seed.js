/**
 * Seed script to populate initial cryptocurrency data
 * Run with: node scripts/seed.js
 */

import dotenv from 'dotenv';
import connectDB, { isDBConnected } from '../db.js';
import Crypto from '../models/Crypto.js';

dotenv.config();
dotenv.config({ path: './.env.local' });

const initialCryptos = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 67730.65,
    image: 'https://cryptoicons.org/api/icon/btc/200',
    change24h: -1.66,
    marketCap: 1.34e12,
    volume24h: 42e9,
    supply: 21e6,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3534.36,
    image: 'https://cryptoicons.org/api/icon/eth/200',
    change24h: -0.93,
    marketCap: 425e9,
    volume24h: 21e9,
    supply: 120.5e6,
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    price: 10.77,
    image: 'https://cryptoicons.org/api/icon/usdt/200',
    change24h: 0.01,
    marketCap: 112.5e9,
    volume24h: 79.1e9,
    supply: 10.44e9,
  },
  {
    name: 'Binance Coin',
    symbol: 'BNB',
    price: 612.43,
    image: 'https://cryptoicons.org/api/icon/bnb/200',
    change24h: 2.45,
    marketCap: 93.8e9,
    volume24h: 1.2e9,
    supply: 153.26e6,
  },
  {
    name: 'XRP',
    symbol: 'XRP',
    price: 2.45,
    image: 'https://cryptoicons.org/api/icon/xrp/200',
    change24h: 5.32,
    marketCap: 135e9,
    volume24h: 2.3e9,
    supply: 55.0e9,
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 145.67,
    image: 'https://cryptoicons.org/api/icon/sol/200',
    change24h: 8.90,
    marketCap: 68e9,
    volume24h: 1.8e9,
    supply: 467e6,
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.98,
    image: 'https://cryptoicons.org/api/icon/ada/200',
    change24h: 3.21,
    marketCap: 36e9,
    volume24h: 0.8e9,
    supply: 36.5e9,
  },
  {
    name: 'Polkadot',
    symbol: 'DOT',
    price: 8.34,
    image: 'https://cryptoicons.org/api/icon/dot/200',
    change24h: 4.56,
    marketCap: 12e9,
    volume24h: 0.5e9,
    supply: 1.44e9,
  },
];

async function seed() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    
    if (!isDBConnected()) {
      console.error('❌ Database connection failed');
      process.exit(1);
    }

    console.log('✅ Connected to database');

    // Clear existing cryptos
    console.log('Clearing existing cryptocurrencies...');
    await Crypto.deleteMany({});
    console.log('✅ Cleared existing data');

    // Insert initial cryptos
    console.log('Inserting initial cryptocurrency data...');
    const inserted = await Crypto.insertMany(initialCryptos);
    console.log(`✅ Inserted ${inserted.length} cryptocurrencies`);

    // Display inserted data
    console.log('\n📊 Initial Data:');
    inserted.forEach(crypto => {
      console.log(`  ${crypto.symbol}: $${crypto.price} (${crypto.change24h > 0 ? '+' : ''}${crypto.change24h}%)`);
    });

    console.log('\n✅ Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
