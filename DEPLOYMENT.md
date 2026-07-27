# Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository

### Steps

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/chand-motors.git
   git push -u origin main
   ```

2. **Import project to Vercel**
   - Go to https://vercel.com/new
   - Select "Import Git Repository"
   - Select your GitHub repo
   - Select "frontend" as root directory

3. **Set Environment Variables**
   - In Vercel project settings, add:
     ```
     VITE_API_BASE_URL=https://your-backend-url.com/api
     VITE_APP_NAME=Chand Motors
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build completion
   - Your frontend will be live at a Vercel URL

### Custom Domain
- In Vercel Settings > Domains
- Add your custom domain
- Update DNS records as instructed

---

## Backend Deployment (Render)

### Prerequisites
- Render account (https://render.com)
- GitHub repository with backend code
- MongoDB Atlas account (free tier available)

### Steps

1. **Create MongoDB Atlas Cluster**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free cluster
   - Create database user
   - Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/dbname`

2. **Deploy to Render**
   - Go to https://render.com
   - Click "New +" > "Web Service"
   - Connect GitHub account and select repository
   - Configure:
     - Name: `chand-motors-api`
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Start Command: `node server.js`
     - Instance Type: Free

3. **Set Environment Variables**
   - In Render > Environment:
     ```
     PORT=5000
     MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/chand-motors
     JWT_SECRET=your-very-secure-random-string-here
     NODE_ENV=production
     CORS_ORIGIN=https://your-frontend-url.vercel.app
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy your backend URL (e.g., https://chand-motors-api.onrender.com)

5. **Update Frontend**
   - Update Vercel environment variable:
     ```
     VITE_API_BASE_URL=https://chand-motors-api.onrender.com/api
     ```
   - Redeploy frontend

---

## Backend Deployment (Railway)

### Alternative to Render

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository

3. **Configure Services**
   - Add MongoDB plugin (if needed)
   - Or connect to MongoDB Atlas

4. **Set Variables**
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_random_string
   NODE_ENV=production
   CORS_ORIGIN=https://your-frontend-url.vercel.app
   ```

5. **Deploy**
   - Railway auto-deploys on push to main
   - Get your backend URL from Railway dashboard

---

## Backend Deployment (Heroku Alternative - Free Tiers Ended)

Note: Heroku free tier ended. Use Render or Railway instead.

---

## Health Checks

### Test Frontend
```bash
# Should load without errors
https://your-frontend-url.vercel.app

# Check specific pages
https://your-frontend-url.vercel.app/vehicles
https://your-frontend-url.vercel.app/services
```

### Test Backend
```bash
# Health check endpoint
https://your-backend-url.com/api/health

# Expected response:
{
  "status": "ok",
  "message": "Chand Motors API is running"
}

# Test a route (e.g., get all cars)
https://your-backend-url.com/api/cars
```

---

## Troubleshooting

### Frontend shows blank page
- Check browser console for errors
- Verify `VITE_API_BASE_URL` is correct
- Check CORS settings on backend

### Backend returns 500 error
- Check MongoDB connection string
- Verify environment variables are set
- Check backend logs for specific errors

### API calls timeout
- Verify backend is deployed and running
- Check frontend's `VITE_API_BASE_URL`
- Verify CORS is enabled

### Database connection fails
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure credentials are correct

---

## Production Checklist

- [ ] Update JWT_SECRET with strong random value
- [ ] Enable HTTPS (automatic on Vercel/Render)
- [ ] Set NODE_ENV=production
- [ ] Verify CORS_ORIGIN matches frontend URL
- [ ] Set up SSL/TLS certificate
- [ ] Configure proper error logging
- [ ] Set up monitoring and alerts
- [ ] Regular database backups
- [ ] Update API documentation
- [ ] Test all critical flows end-to-end
- [ ] Set up CI/CD pipeline
- [ ] Performance optimization

---

## Cost Estimates

- **Vercel Frontend**: Free tier (up to 100GB bandwidth/month)
- **Render Backend**: Free tier (limited) or ~$12/month for production
- **MongoDB Atlas**: Free tier (up to 512MB storage) or ~$9/month for production
- **Total**: Can start free, production ~$20-30/month

---

## Performance Tips

### Frontend
- Enable image optimization
- Use CDN for static assets
- Implement code splitting
- Enable caching

### Backend
- Use database indexing
- Implement API rate limiting
- Enable compression
- Set up Redis caching

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Docs: https://docs.mongodb.com
- Railway Docs: https://docs.railway.app
