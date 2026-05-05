# CryptoFlow Backend

⚠️ **EDUCATIONAL DEMO ONLY** - Not affiliated with Coinbase or any real cryptocurrency exchange.

This is a student project demonstrating Node.js/Express backend with MongoDB integration for a cryptocurrency dashboard application.

## Features

- ✅ JWT-based authentication (Register/Login)
- ✅ Protected user profile endpoint
- ✅ MongoDB data persistence
- ✅ Cryptocurrency CRUD operations
- ✅ Top gainers and new listings endpoints
- ✅ RESTful API design
- ✅ Error handling and validation

## Setup & Installation

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud instance)
- npm or yarn

### Environment Variables

Create a `.env` file in the server directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cryptoflow
MONGODB_DBNAME=cryptoflow
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

For MongoDB Atlas:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cryptoflow
```

### Installation Steps

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Seed initial data:**
   ```bash
   node scripts/seed.js
   ```

4. **Start the server:**
   ```bash
   npm start        # Production
   npm run dev      # Development (with auto-reload)
   ```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Get User Profile (Protected)
```
GET /api/auth/profile
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "_id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T..."
  }
}
```

### Cryptocurrencies

#### Get All Cryptocurrencies
```
GET /api/crypto

Response:
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Bitcoin",
      "symbol": "BTC",
      "price": 67730.65,
      "change24h": -1.66,
      ...
    }
  ]
}
```

#### Get Single Cryptocurrency
```
GET /api/crypto/:id
```

#### Get Top Gainers (Top 10)
```
GET /api/crypto/gainers

Response:
{
  "success": true,
  "data": [
    {
      "name": "Solana",
      "symbol": "SOL",
      "price": 145.67,
      "change24h": 8.90,
      ...
    }
  ]
}
```

#### Get New Listings (Top 10)
```
GET /api/crypto/new
```

#### Add New Cryptocurrency
```
POST /api/crypto
Content-Type: application/json

{
  "name": "Ethereum",
  "symbol": "ETH",
  "price": 3534.36,
  "image": "https://...",
  "change24h": -0.93
}
```

#### Update Cryptocurrency
```
PUT /api/crypto/:id
Content-Type: application/json

{
  "price": 3600.00,
  "change24h": 2.5
}
```

#### Delete Cryptocurrency
```
DELETE /api/crypto/:id
```

## Database Schema

### User Model
```javascript
{
  email: String (unique, required),
  passwordHash: String,
  name: String,
  createdAt: Date
}
```

### Crypto Model
```javascript
{
  name: String (required),
  symbol: String (unique, uppercase),
  price: Number (required),
  image: String,
  change24h: Number,
  marketCap: Number,
  volume24h: Number,
  supply: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure

```
server/
├── controllers/
│   ├── authController.js      # Auth logic
│   └── cryptoController.js    # Crypto logic
├── middleware/
│   └── auth.js               # JWT verification
├── models/
│   ├── User.js               # User schema
│   └── Crypto.js             # Crypto schema
├── scripts/
│   └── seed.js               # Database seeding
├── db.js                      # MongoDB connection
├── server.js                  # Main server file
├── package.json
└── README.md
```

## Authentication Flow

1. User registers with email and password
2. Password is hashed with bcryptjs
3. JWT token is generated (expires in 7 days)
4. Token is sent to frontend
5. Frontend stores token and sends in Authorization header for protected routes
6. Backend verifies token before granting access

## Development Notes

- Default JWT secret: `your-secret-key` (change in production!)
- Passwords are hashed using bcryptjs with salt rounds 10
- CORS enabled for localhost and Vercel deployment
- All responses include `success` boolean and appropriate HTTP status codes

## Deployment

### Vercel
1. Connect GitHub repo
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

## License

MIT - Educational Project Only


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
Body: { "email": "user@example.com", "password": "secret123", "name": "Personal" }
```

Sign in (demo):
```
POST /api/auth/signin
Body: { "email": "user@example.com", "password": "secret123" }
```

### Users (Development Only)
```
GET /api/users
```
Lists users without password hashes.

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
