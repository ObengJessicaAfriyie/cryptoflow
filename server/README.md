# CryptoFlow Backend Server

## ⚠️ EDUCATIONAL DEMO ONLY

This backend is part of an educational student project. **It is NOT a real cryptocurrency exchange or financial service.**

## Overview

CryptoFlow Backend is a simple Node.js/Express server that provides mock cryptocurrency data and APIs for the educational CryptoFlow demo application.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
cd server
npm install
```

### Running the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /health
```
Returns server status and educational disclaimer.

### Cryptocurrencies

Get all cryptocurrencies:
```
GET /api/cryptocurrencies
```

Get specific cryptocurrency:
```
GET /api/cryptocurrencies/:id
```
Example: `GET /api/cryptocurrencies/BTC`

### Market Stats

Get market statistics:
```
GET /api/market/stats
```

### Authentication (Demo Only)

Sign up (demo):
```
POST /api/auth/signup
Body: { "email": "user@example.com" }
```

Sign in (demo):
```
POST /api/auth/signin
Body: { "email": "user@example.com" }
```

## Data

All data returned by this backend is **mock/demo data** for educational purposes. It does not represent real market data or prices.

## Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your preferred settings.

### Optional MongoDB Configuration

To enable a MongoDB connection using Mongoose, set the following environment variable in your `.env` file:

```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.example.mongodb.net/mydb
MONGODB_DBNAME=cryptoflow
```

If `MONGODB_URI` is not set, the server will run with the built-in demo/mocked data and skip DB connection.

### Persistent Authentication (Development)

The demo now supports basic persistent signup/signin backed by MongoDB.

- `POST /api/auth/signup` — Body: `{ "email": "...", "password": "...", "name": "..." }` — creates a user in the database.
- `POST /api/auth/signin` — Body: `{ "email": "...", "password": "..." }` — verifies credentials against stored user.
- `GET /api/users` — Lists users (development only; does not expose password hashes).

These endpoints are intentionally minimal for educational purposes. Do not use them in production without adding proper validation, rate-limiting, email verification, and secure token issuance (JWT/refresh tokens).

## Project Structure

```
server/
├── server.js           # Main server file
├── package.json        # Dependencies
├── .env.example        # Example environment variables
├── .env                # Environment variables (not in git)
└── README.md          # This file
```

## Important Notes

- **This is educational software only**
- No real transactions occur
- No real user accounts are created
- Data is mock/simulated
- Not affiliated with Coinbase or any real exchange
- Intended for learning and portfolio purposes

## Development

The backend uses:
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## License

MIT

## Disclaimer

This project is created for educational purposes as part of a multimedia web development course. It is not affiliated with Coinbase, any cryptocurrency exchange, or any financial institution. The data provided is mock data for demonstration purposes only.
