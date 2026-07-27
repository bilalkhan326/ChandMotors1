# Chand Motors - Full Stack Car Marketplace

A modern, premium car marketplace web application with vehicle management, service booking, and user authentication.

## 📁 Project Structure

```
CMotors/
├── frontend/                 # React.js + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── layouts/         # Layout components
│   │   ├── context/         # Context API for state
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom hooks
│   │   └── assets/          # Images and icons
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── backend/                  # Node.js + Express backend
    ├── controllers/         # Business logic
    ├── models/             # MongoDB schemas
    ├── routes/             # API routes
    ├── middleware/         # Custom middleware
    ├── utils/              # Helper functions
    ├── config/             # Configuration files
    ├── server.js           # Entry point
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local or cloud - MongoDB Atlas)
- Git

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file (copy from .env.example)
cp .env.example .env.local

# Start development server
npm run dev
```

The frontend will run at `http://localhost:5173`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update .env with your configuration
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chand-motors
# JWT_SECRET=your-secret-key

# Start development server
npm run dev
```

The backend will run at `http://localhost:5000`

## 📝 Environment Configuration

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Chand Motors
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chand-motors
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## 🎯 Features

### Frontend Features
- ✅ Modern responsive design matching Chand Motors reference
- ✅ User authentication (Login/Signup)
- ✅ Car listing and search/filter
- ✅ Car details page
- ✅ Service booking
- ✅ User dashboard
- ✅ Contact form
- ✅ Toast notifications
- ✅ Dark premium theme
- ✅ Smooth animations with Framer Motion

### Backend Features
- ✅ User authentication with JWT
- ✅ Car CRUD operations
- ✅ Service management
- ✅ Service booking system
- ✅ Contact message handling
- ✅ Protected routes
- ✅ MongoDB integration
- ✅ Input validation
- ✅ Error handling

## 📦 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car details
- `GET /api/cars/search` - Search cars
- `POST /api/cars` - Create car (Admin)
- `PUT /api/cars/:id` - Update car (Admin)
- `DELETE /api/cars/:id` - Delete car (Admin)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service details
- `POST /api/services` - Create service (Admin)
- `POST /api/services/book` - Book service (Authenticated)

### Users
- `GET /api/users/profile` - Get user profile (Authenticated)
- `PUT /api/users/profile` - Update profile (Authenticated)
- `GET /api/users/bookings` - Get user bookings (Authenticated)

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (Admin)

## 🗄️ MongoDB Collections

### Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  address: String,
  role: String (user/admin),
  createdAt: Date,
  updatedAt: Date
}
```

### Cars
```javascript
{
  _id: ObjectId,
  name: String,
  type: String,
  price: Number,
  power: String,
  speed: String,
  capacity: String,
  warranty: String,
  image: String,
  description: String,
  features: [String],
  specifications: Object,
  inStock: Boolean,
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Services
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  duration: String,
  features: [String],
  available: Boolean,
  createdAt: Date
}
```

### Bookings
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  service: ObjectId (ref: Service),
  vehicleModel: String,
  preferredDate: Date,
  notes: String,
  status: String (Pending/Confirmed/Completed/Cancelled),
  price: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Contacts
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: String (New/Read/Replied),
  createdAt: Date
}
```

## 🛠️ Build & Deployment

### Frontend Deployment (Vercel)

```bash
# Build for production
npm run build

# Preview build
npm run preview
```

Deployment steps:
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Backend Deployment (Render/Railway)

```bash
# Build is automatic on Render

# Ensure package.json has proper "start" script:
"start": "node server.js"
```

Deployment steps:
1. Push code to GitHub
2. Connect to Render or Railway
3. Set environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Secure random string
   - `CORS_ORIGIN` - Your frontend URL
   - `NODE_ENV` - production
4. Deploy

## 🔐 Security

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- Protected API routes
- CORS enabled for frontend domain only
- Input validation on all endpoints
- Environment variables for sensitive data

## 📚 Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router DOM
- React Toastify
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- Express Validator

## 📄 Sample Data

You can seed the database with sample data by running:

```bash
# Coming soon - Database seeding script
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
- Email: support@chandmotors.pk
- Phone: +92 333 456 7890

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## ✨ Credits

Design Reference: Chand Motors (https://chandmotors.vercel.app/)

---

**Built with ❤️ by Development Team**
