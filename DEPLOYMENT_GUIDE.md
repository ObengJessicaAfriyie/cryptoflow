# CryptoFlow - Deployment Guide

## ⚠️ Important Before Deploying

**IMPORTANT**: This is an educational demo project. Before deploying to any platform, ensure:

1. ✅ Add prominent educational disclaimers on all pages
2. ✅ Update page titles and metadata to clarify it's a demo
3. ✅ Clearly state "NOT a real cryptocurrency exchange"
4. ✅ Include "Educational Project" in project description
5. ✅ Document that it's a student portfolio project
6. ❌ DO NOT use this to deceive anyone
7. ❌ DO NOT impersonate a real exchange
8. ❌ DO NOT collect real user data
9. ❌ DO NOT process real transactions

---

## Deployment Platforms

### Vercel (Recommended for Frontend)

**Why Vercel?**
- Free tier for students
- Perfect for Vite projects
- Automatic deployments from GitHub
- Great performance

**Steps:**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add CryptoFlow educational demo"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite

3. **Configure Project**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables** (if needed)
   - Project Settings → Environment Variables
   - Add any required .env variables

5. **Deploy**
   - Click "Deploy"
   - Your app will be live!

**Vercel Redeployment After GitHub Flagging:**
- The previous flag was likely due to misleading project naming
- New deployment should include:
  - Clear "EDUCATIONAL DEMO" in title
  - Prominent disclaimers
  - Clear project purpose
  - This should resolve previous flags

---

### Netlify (Alternative for Frontend)

**Steps:**

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New site from Git"
   - Select your GitHub repository
   - Authorize Netlify

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Deploy**
   - Netlify will automatically build and deploy
   - Your site will be live!

**Note**: `netlify.toml` is pre-configured for Vercel

---

### Heroku or Railway (For Backend)

The backend can be deployed separately if needed.

**Environment Variables Needed:**
```
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

**Deployment Steps:**

1. Ensure `server/package.json` is properly configured
2. Push to GitHub
3. Connect to Heroku/Railway
4. Set environment variables
5. Deploy!

---

## Frontend + Backend Integration

### Option 1: Frontend on Vercel, Backend on Heroku

```javascript
// In frontend code, set API URL based on environment
const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';

// Use this when making API calls
fetch(`${API_URL}/api/cryptocurrencies`);
```

### Option 2: Everything on Same Service

Use Vercel's serverless functions to replace backend:
1. Create `/api/` directory in root
2. Add serverless functions
3. No separate backend needed

### Option 3: Full Stack on Render.com

- Supports both frontend and backend
- Easy to configure
- Good for student projects

---

## Security & Legal Considerations

### For Deployment:

1. **Add Disclaimers**
   ```jsx
   // Add to every page
   <div className="bg-yellow-100 border border-yellow-400 p-3 mb-4">
     <p className="text-yellow-800 font-bold">
       ⚠️ Educational Demo Only - Not a real cryptocurrency exchange
     </p>
   </div>
   ```

2. **Update Metadata**
   ```html
   <title>CryptoFlow - Educational Cryptocurrency Demo</title>
   <meta name="description" 
         content="Educational demo project. NOT affiliated with Coinbase or any real exchange." />
   ```

3. **Update README**
   - Ensure GitHub README has prominent disclaimers
   - Clearly state student project
   - Link to this deployment guide

4. **Project Description**
   - GitHub: "Educational Cryptocurrency Demo (Student Project)"
   - Vercel: "Portfolio Project - Educational Demo"
   - Never just "Crypto Exchange" or "Coinbase Clone"

### What NOT to do:

- ❌ Don't hide disclaimers
- ❌ Don't make it look exactly like Coinbase
- ❌ Don't collect real user data
- ❌ Don't accept real payments
- ❌ Don't process real transactions
- ❌ Don't claim it's a real financial service

---

## Troubleshooting

### "Project Blocked" on Vercel/Netlify

**Causes:**
- Project name is too similar to real exchange
- No disclaimers visible
- Misleading descriptions

**Solutions:**
1. Update project name to include "Demo" or "Educational"
2. Add prominent disclaimers on all pages
3. Update repository description
4. Contact support with explanation

### Build Failures

**Check:**
1. Node version compatibility (v18+)
2. All dependencies installed (`npm install`)
3. Build command works locally (`npm run build`)
4. Environment variables set correctly

### API Connection Issues

**If backend is separate:**
1. Ensure backend is running
2. Check CORS settings in backend
3. Verify API URL in frontend code
4. Check browser console for errors

---

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://your-backend.com
```

### Backend (server/.env)
```
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend.com
```

---

## Monitoring & Maintenance

After deployment:

1. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor error rates
   - Track load times

2. **Keep Updated**
   - Update dependencies regularly
   - Fix security vulnerabilities
   - Add new features

3. **Backup Code**
   - Keep GitHub updated
   - Tag releases
   - Document changes

---

## Redeployment Strategy

Since your project was previously flagged:

1. **Rebrand Everything** ✅ (Already done)
   - Changed name to "CryptoFlow"
   - Updated all references
   - Added disclaimers

2. **Update Repository**
   - New project description
   - Add DEPLOYMENT_GUIDE.md
   - Update README with disclaimers

3. **Clean Deployment**
   - Deploy to new domain/URL if possible
   - Or redeploy to same platform with updated settings
   - Add all disclaimers prominently

4. **Contact Platform Support**
   - Explain it's educational
   - Provide documentation
   - Request review of new deployment

---

## Quick Deployment Checklist

- [ ] All code changes committed and pushed
- [ ] README updated with disclaimers
- [ ] Vercel/Netlify configured
- [ ] Environment variables set
- [ ] Build test locally (`npm run build`)
- [ ] Disclaimers visible on frontend
- [ ] Page titles updated
- [ ] GitHub description updated
- [ ] Backend deployed (if using separate service)
- [ ] CORS settings configured
- [ ] API URLs updated
- [ ] Final review of all disclaimers

---

## Support

If you encounter issues:

1. Check platform documentation
2. Review your build logs
3. Test locally first
4. Contact platform support with:
   - Project name and URL
   - Build logs
   - GitHub repository link
   - Explanation that it's educational

---

**Remember**: Be honest and transparent about your project. Educational demos are great for portfolios when properly labeled. Deception is not!

Happy deploying! 🚀
