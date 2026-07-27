# Complete Installation & Setup Guide

## 🚀 Quick Setup (5-10 minutes)

### Step 1: Prepare Your Machine

**Install Required Software:**
- Node.js 16+ (https://nodejs.org/) - Choose LTS version
- MongoDB (https://www.mongodb.com/try/download/community) - Or use MongoDB Atlas (cloud)
- Git (https://git-scm.com/)

**Verify Installation:**
```bash
node --version    # Should show v16.0.0 or higher
npm --version     # Should show 8.0.0 or higher
git --version     # Should show 2.30.0 or higher
```

---

## Step 2: Clone & Navigate

```bash
# Clone or navigate to your project folder
cd CMotors

# Check the structure
ls -la
# You should see: frontend/, backend/, README.md, etc.
```

---

## Step 3: Setup MongoDB

### Option A: Local MongoDB (Windows/Mac/Linux)

```bash
# Start MongoDB service (depends on your OS)

# Windows:
# MongoDB should auto-start, or run: mongod

# Mac:
# brew services start mongodb-community

# Linux:
# sudo systemctl start mongod
```

### Option B: MongoDB Atlas (Recommended for Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (free tier)
4. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/dbname`

---

## Step 4: Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start development server
npm run dev

# Open in browser: http://localhost:5173
```

**Expected Output:**
```
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## Step 5: Backend Setup

### In a new terminal:

```bash
# Navigate to backend (from root)
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your settings:
# nano .env (on Mac/Linux) or use text editor on Windows

# If using MongoDB Atlas, update:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chand-motors

# If using local MongoDB:
MONGODB_URI=mongodb://localhost:27017/chand-motors

# Start backend
npm run dev

# Expected output:
# ✓ MongoDB connected
# 🚀 Server running on http://localhost:5000
```

---

## Step 6: Seed Sample Data (Optional)

```bash
# In backend directory
npm run seed

# Expected output:
# ✓ Connected to MongoDB
# ✓ Inserted 5 cars
# ✓ Inserted 6 services
# ✅ Database seeded successfully!
```

---

## Step 7: Test the Application

### Frontend Tests
1. Open http://localhost:5173
2. Browse to different pages
3. Try to create account (sign up)
4. Login with test credentials
5. View dashboard

### Backend Tests
```bash
# In terminal, test API endpoints:

# Health check
curl http://localhost:5000/api/health

# Get all cars
curl http://localhost:5000/api/cars

# Get all services
curl http://localhost:5000/api/services
```

---

## Useful Commands

### Frontend
```bash
cd frontend

npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality
```

### Backend
```bash
cd backend

npm run dev          # Start development server (uses nodemon)
npm run seed         # Seed database with sample data
npm start            # Start production server
```

---

## Configuration Reference

### Frontend `.env.local`
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Chand Motors
```

### Backend `.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chand-motors
# For MongoDB Atlas: mongodb+srv://user:pass@cluster.mongodb.net/dbname

JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

---

## Troubleshooting

### Frontend won't load

**Error: Cannot find module**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Port 5173 already in use:**
```bash
# Kill process on that port (Mac/Linux)
lsof -ti:5173 | xargs kill -9

# Or change port in vite.config.js
```

### Backend connection issues

**Error: MongoDB connection failed**
- Check if MongoDB is running
- Verify connection string in .env
- For Atlas: Check IP whitelist and credentials

**Error: Port 5000 already in use:**
```bash
# Kill process (Mac/Linux)
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
```

**CORS error in frontend:**
- Verify CORS_ORIGIN in backend .env matches frontend URL
- Restart backend after changing

### API calls returning 401 (Unauthorized)

- Make sure you're logged in
- Check token is being stored in localStorage
- Clear browser cache and try again

---

## Database Schema Reference

### Collections Created Automatically

When you first save data, MongoDB creates:
- **users** - User accounts
- **cars** - Vehicle listings
- **services** - Service offerings
- **bookings** - Service bookings
- **contacts** - Contact form submissions

---

## Project Structure

```
CMotors/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── CarCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Vehicles.jsx
│   │   │   ├── VehicleDetails.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Contact.jsx
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js      # API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.local
│
└── backend/
    ├── controllers/        # Business logic
    │   ├── authController.js
    │   ├── carController.js
    │   ├── serviceController.js
    │   ├── userController.js
    │   └── contactController.js
    ├── models/            # Database schemas
    │   ├── User.js
    │   ├── Car.js
    │   ├── Service.js
    │   ├── Booking.js
    │   └── Contact.js
    ├── routes/            # API routes
    │   ├── auth.js
    │   ├── cars.js
    │   ├── services.js
    │   ├── users.js
    │   └── contact.js
    ├── middleware/        # Custom middleware
    │   ├── auth.js
    │   └── validation.js
    ├── utils/             # Helper functions
    │   ├── jwt.js
    │   └── response.js
    ├── server.js          # Entry point
    ├── seed.js            # Database seeding
    ├── package.json
    └── .env
```

---

## Next Steps

1. **Frontend Customization**
   - Update colors in `tailwind.config.js`
   - Add your logo/images in `src/assets/`
   - Customize navbar/footer

2. **Backend Enhancement**
   - Add email notifications
   - Implement payment gateway
   - Add admin dashboard APIs

3. **Deployment**
   - See `DEPLOYMENT.md` for detailed steps
   - Deploy frontend to Vercel
   - Deploy backend to Render/Railway

4. **Database**
   - Add more seed data
   - Set up automated backups
   - Create indexes for performance

---

## Performance Tips

### Frontend
- Use production build for testing
- Clear browser cache regularly
- Test on different devices

### Backend
- Index frequently queried fields
- Use pagination for large datasets
- Monitor database performance

---

## Support & Resources

### Documentation Files
- `README.md` - Project overview
- `DEPLOYMENT.md` - Deployment instructions
- `API_TESTING.md` - API endpoint testing
- `SEEDING.md` - Database seeding help

### External Resources
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com/docs
- MongoDB: https://docs.mongodb.com
- Express: https://expressjs.com

---

## Checklist

- [ ] Node.js installed
- [ ] MongoDB installed/configured
- [ ] Frontend dependencies installed
- [ ] Backend dependencies installed
- [ ] .env files created and configured
- [ ] MongoDB connected
- [ ] Frontend running on port 5173
- [ ] Backend running on port 5000
- [ ] Sample data seeded
- [ ] Can login to dashboard
- [ ] Can view cars and services
- [ ] Can submit contact form

---

**You're all set! Happy coding! 🚀**

*For issues, check troubleshooting section or create an issue on GitHub.*
