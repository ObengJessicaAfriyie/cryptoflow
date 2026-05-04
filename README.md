[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/fcRde9Vj)

# CryptoFlow - Educational Cryptocurrency Demo

## ⚠️ CRITICAL DISCLAIMER

### **THIS IS AN EDUCATIONAL DEMO PROJECT - NOT A REAL CRYPTOCURRENCY EXCHANGE**

**This is a student project created for a multimedia web development course.**

**NOT affiliated with Coinbase, any cryptocurrency exchange, or any real financial institution.**

### Important Notes:
- ❌ **NO REAL TRANSACTIONS** occur in this application
- ❌ **NO REAL ACCOUNTS** are created
- ❌ **NO REAL MONEY** is involved
- ❌ **NO REAL MARKET DATA** is used (mock data only)
- ✅ **EDUCATIONAL PURPOSES ONLY** - Portfolio and learning project
- ✅ **STUDENT PROJECT** - Created as assignment work

**Using this for any commercial purpose, impersonating a real exchange, or deceiving users would be illegal and unethical.**

link to the site - This is just for educational demo - practice -  cryptoflowcash.vercel.app

---

## 📚 Overview

CryptoFlow is an educational web application that demonstrates modern web development concepts through a cryptocurrency interface demo. It includes:

- **Frontend**: React + Tailwind CSS + React Router
- **Backend**: Node.js + Express (educational API)
- **Features**: Mock crypto data, simulated trading interface, portfolio tracker
- **Purpose**: Learning web development, component architecture, and API integration

This project is intended for:
- ✅ Portfolio demonstration
- ✅ Learning purposes
- ✅ Academic coursework
- ✅ Skill showcase
- ❌ NOT for commercial use
- ❌ NOT for financial services
- ❌ NOT for deceiving users

---

## 🚀 Quick Start

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Backend Setup

```bash
# Navigate to backend directory
cd server

# Install dependencies  
npm install

# Start backend server
npm run dev

# Backend API will be available at http://localhost:5000
```

### Full Stack Development

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd server
npm run dev
```

Then access the app at `http://localhost:5173`

---

## 📁 Project Structure

```
cryptoflow-demo/
├── src/                         # Frontend (React)
│   ├── components/
│   │   ├── common/              # Reusable UI components
│   │   ├── layout/              # Layout components
│   │   └── crypto/              # Crypto-specific components
│   ├── pages/                   # Page components
│   ├── data/                    # Mock data
│   ├── App.jsx                  # Main app with routing
│   └── main.jsx                 # Entry point
├── server/                      # Backend (Node.js/Express)
│   ├── server.js                # Main server file
│   ├── package.json             # Backend dependencies
│   ├── .env.example             # Environment variables template
│   └── README.md                # Backend documentation
├── package.json                 # Frontend dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
└── README.md                    # This file
```

---

## 🔧 Technical Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **Vite** - Build tool
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin support
- **dotenv** - Environment configuration

---

## 📖 Features

### Current Features
- ✅ Multiple pages (Home, Explore, Learn, SignIn, SignUp)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Mock cryptocurrency data
- ✅ Asset detail pages
- ✅ Search functionality
- ✅ Crypto price charts
- ✅ Educational demo backend API

### What's NOT Included
- ❌ Real market data (uses mock data)
- ❌ Real user authentication (demo only)
- ❌ Real transactions
- ❌ Real wallets
- ❌ Real payment processing
- ❌ Database persistence (in-memory only)

---

## 🌐 API Endpoints (Backend)

All API responses include a disclaimer notice.

### Health Check
```
GET /health
```

### Cryptocurrencies
```
GET /api/cryptocurrencies          # Get all cryptos
GET /api/cryptocurrencies/:id      # Get specific crypto (e.g., BTC)
```

### Market Data
```
GET /api/market/stats              # Get market statistics
```

### Authentication (Demo)
```
POST /api/auth/signup              # Demo signup
POST /api/auth/signin              # Demo signin
```

See `server/README.md` for detailed API documentation.

---

## 🛠️ Development

### Build Frontend
```bash
npm run build
```

### Lint Frontend
```bash
npm run lint
```

### Build Backend
Backend doesn't require building. Run directly with Node.js.

---

## 📋 Requirements Checklist

- [x] Use **React** and **React Router** for routing
- [x] Use **functional components** with hooks
- [x] Create **reusable components**
- [x] Use **Tailwind CSS** for styling
- [x] Implement **responsive design**
- [x] Use **React state management** (useState)
- [x] Follow **proper file structure**
- [x] Write **clean, readable code**
- [x] Add **educational disclaimers** throughout
- [x] Create **backend API structure**
- [x] Document all code and APIs

---

## 🎓 Learning Outcomes

By studying this project, you'll learn:

1. **Frontend Development**
   - Component-based architecture
   - React hooks and state management
   - React Router for SPA navigation
   - Responsive CSS with Tailwind
   - Data visualization with charts

2. **Backend Development**
   - Express.js server setup
   - REST API design
   - CORS handling
   - Environment configuration
   - Error handling

3. **Full Stack Integration**
   - Frontend-backend communication
   - API consumption with fetch
   - Error handling across stack
   - Development workflow
   - Deployment considerations

---

## ⚠️ Important Notes for Developers

### When Deploying:
1. **Add prominent disclaimers** on all pages
2. **Update the page title and metadata** to clearly indicate it's a demo
3. **Never use real company branding** in a misleading way
4. **Clearly state it's educational** in all marketing materials
5. **Don't use for any commercial purpose**

### Code Quality:
- All code is documented with comments
- Educational purposes clearly stated
- Mock data clearly labeled as such
- No real API integration

### Deployment:
- This project is suitable for:
  - ✅ Personal portfolio
  - ✅ GitHub showcase
  - ✅ Educational presentations
  - ✅ Learning platforms

- This project is NOT suitable for:
  - ❌ Production use
  - ❌ Real financial services
  - ❌ Commercial deployment
  - ❌ Deceiving users

---

## 📚 Resources & References

- [React Documentation](https://react.dev/)
- [React Router v6](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Express.js Guide](https://expressjs.com/)
- [Vite Documentation](https://vitejs.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 📝 License

MIT License - See LICENSE file for details

---

## 👨‍💼 Author

**Student Project** - Created for educational purposes

Created: 2024-2025
Course: Multimedia Web Development

---

## 🤝 Contributing

This is a student project. For modifications:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. **Maintain all disclaimers**
5. Submit a pull request

---

## ❓ FAQ

**Q: Can I use this commercially?**
A: No. This is an educational demo only. Do not use for commercial purposes or to deceive users.

**Q: Where is the real data?**
A: This project uses mock/simulated data for educational purposes. See the `data/` folder for data sources.

**Q: Can I deploy this?**
A: Yes, but ensure all disclaimers are prominent and it's clearly marked as an educational demo.

**Q: Is this affiliated with Coinbase?**
A: No. This is a student project created for learning purposes only and is not affiliated with Coinbase or any real company.

**Q: Will my transactions be saved?**
A: No. This is a demo. No real transactions, accounts, or data persistence occurs.

---

## 📞 Support

For issues or questions:
1. Check existing documentation
2. Review code comments
3. Consult course materials
4. Ask instructors or TAs

---

**Remember: This is educational software. Use responsibly and ethically.**
- [Heroicons](https://heroicons.com/) - Free SVG icons
- [reacticons](https://react-icons.github.io/react-icons/) - Free SVG icons

---

## 🌐 Deployment on Netlify

You must deploy your completed project on **Netlify**.

---

## 🔗 Deployed URLs

- **Frontend (Vercel):** https://cryptoflowcash.vercel.app
- **Backend (Render):** https://cryptoflow-wjxi.onrender.com

These are the live deployments used during development and testing. The frontend is configured to call the backend at the Render URL via `VITE_API_URL`.
