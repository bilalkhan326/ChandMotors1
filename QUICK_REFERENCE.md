# 🚀 Quick Reference Guide

## One-Minute Setup

```bash
# Terminal 1: Frontend
cd frontend && npm install && npm run dev

# Terminal 2: Backend
cd backend && npm install && npm run dev

# Open http://localhost:5173
```

---

## Most Important Files

### Frontend
| File | Purpose |
|------|---------|
| `src/App.jsx` | Routes & main app structure |
| `src/context/AuthContext.jsx` | User authentication state |
| `src/services/api.js` | All API calls |
| `src/pages/Home.jsx` | Landing page with hero |
| `.env.local` | Frontend config |

### Backend
| File | Purpose |
|------|---------|
| `server.js` | Express app entry point |
| `models/User.js` | User database schema |
| `controllers/authController.js` | Auth logic |
| `routes/auth.js` | Auth endpoints |
| `.env` | Backend config |

---

## Common Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Check code

# Backend
npm run dev          # Start with auto-reload
npm run seed         # Add sample data
npm start            # Start production

# Database
mongod               # Start MongoDB (macOS/Linux)
```

---

## Key Passwords & Tokens

### Demo Login
```
Email: demo@example.com
Password: demo123
```

### JWT Secret (Backend)
```
Change in production!
Currently: your_super_secret_jwt_key_here_change_in_production
```

---

## API Quick Test

```bash
# Health check
curl http://localhost:5000/api/health

# Get cars
curl http://localhost:5000/api/cars

# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"User","email":"user@test.com","phone":"+92333","password":"pass123"}'
```

---

## Folder Quick Guide

```
frontend/
├── src/pages/          ← Pages (Home, Vehicles, Login, etc)
├── src/components/     ← Reusable parts (Navbar, CarCard, etc)
├── src/services/       ← API client
└── .env.local          ← Config (API URL)

backend/
├── controllers/        ← Business logic
├── models/             ← Database schemas
├── routes/             ← API endpoints
└── .env                ← Config (MongoDB, JWT)
```

---

## Important Endpoints

| Method | Path | Auth Required |
|--------|------|---------------|
| POST | `/auth/signup` | ❌ |
| POST | `/auth/login` | ❌ |
| GET | `/cars` | ❌ |
| GET | `/cars/:id` | ❌ |
| GET | `/services` | ❌ |
| POST | `/services/book` | ✅ |
| GET | `/users/profile` | ✅ |
| POST | `/contact` | ❌ |

---

## Environment Variables

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/chand-motors
JWT_SECRET=your-secret-key
PORT=5000
```

---

## Database Collections

- **users** → User accounts
- **cars** → Vehicle listings
- **services** → Service offerings
- **bookings** → Service reservations
- **contacts** → Contact form messages

---

## Port Numbers

- Frontend: **5173** (Vite)
- Backend: **5000** (Express)
- MongoDB: **27017** (default)

---

## Colors Used

- Primary Dark: `#0f172a`
- Secondary Dark: `#1e293b`
- Accent Orange: `#ff6b35`
- Gold: `#d4af37`

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Port already in use | Change port in `.env` or kill process |
| CORS error | Check `CORS_ORIGIN` in backend `.env` |
| MongoDB failed | Start MongoDB with `mongod` |
| API returns 401 | Login first and copy token |
| Component not updating | Clear browser cache |

---

## File Size Estimate

- Frontend dependencies: ~300MB (node_modules)
- Backend dependencies: ~200MB (node_modules)
- Source code: ~5MB
- **Total**: ~500MB before node_modules

---

## Features at a Glance

✅ Modern UI matching reference
✅ User auth with JWT
✅ Car listing & search
✅ Service booking
✅ User dashboard
✅ Contact form
✅ Responsive design
✅ Dark theme
✅ Smooth animations

---

## Deployment URLs

### Frontend (Vercel)
```
https://your-chand-motors.vercel.app
```

### Backend (Render/Railway)
```
https://chand-motors-api.onrender.com
```

---

## Next Steps

1. ✅ Run `npm install` in both folders
2. ✅ Create `.env` files
3. ✅ Start MongoDB
4. ✅ Start both servers
5. ✅ Test at http://localhost:5173
6. ✅ Read `INSTALLATION_STEPS.md` for detailed setup
7. ✅ See `DEPLOYMENT.md` when ready to go live

---

## Testing Checklist

- [ ] Homepage loads
- [ ] Can view cars
- [ ] Can search cars
- [ ] Can signup
- [ ] Can login
- [ ] Can view dashboard
- [ ] Can book service
- [ ] Can submit contact form

---

## Pro Tips

💡 Use `npm run seed` to add sample cars & services
💡 Keep `.env` files private (add to `.gitignore`)
💡 Clear browser cache if UI doesn't update
💡 Check browser console for error messages
💡 Use Postman for API testing

---

## Support Files

📄 `README.md` - Full documentation
📄 `INSTALLATION_STEPS.md` - Detailed setup
📄 `DEPLOYMENT.md` - Deploy to production
📄 `API_TESTING.md` - Test all endpoints
📄 `PROJECT_SUMMARY.md` - What's included

---

**Everything is set up and ready to use!**

**Start here: `INSTALLATION_STEPS.md` →**
