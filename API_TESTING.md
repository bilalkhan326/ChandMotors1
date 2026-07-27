# API Testing Guide

Use this guide to test all API endpoints using cURL, Postman, or any HTTP client.

## Base URLs
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend-url.com/api`

## Authentication

All protected endpoints require a bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### 1. Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+92 333 456 7890",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Signup successful",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+92 333 456 7890"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Logout
```bash
curl -X POST http://localhost:5000/api/auth/logout
```

---

## Cars Endpoints

### 1. Get All Cars
```bash
curl -X GET "http://localhost:5000/api/cars?limit=10&skip=0"
```

**Query Parameters:**
- `limit` - Number of cars to return (default: 10)
- `skip` - Number of cars to skip (default: 0)
- `type` - Filter by type (Sedan, SUV, Electric, Sports, Van, Truck)
- `search` - Search by name or description

### 2. Get Car by ID
```bash
curl -X GET http://localhost:5000/api/cars/CAR_ID
```

### 3. Search Cars
```bash
curl -X GET "http://localhost:5000/api/cars/search?q=sedan&minPrice=50000&maxPrice=70000&type=Sedan"
```

**Query Parameters:**
- `q` - Search query
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `type` - Filter by type

### 4. Create Car (Admin)
```bash
curl -X POST http://localhost:5000/api/cars \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Luxury Sedan 2024",
    "type": "Sedan",
    "price": 65000,
    "power": "450 HP",
    "speed": "0-60 in 4.2s",
    "capacity": "5 Seats",
    "warranty": "5 Years",
    "description": "Premium luxury vehicle",
    "features": ["Hybrid Engine", "Premium Interior"]
  }'
```

### 5. Update Car (Admin)
```bash
curl -X PUT http://localhost:5000/api/cars/CAR_ID \
  -H "Content-Type: application/json" \
  -d '{
    "price": 68000,
    "featured": true
  }'
```

### 6. Delete Car (Admin)
```bash
curl -X DELETE http://localhost:5000/api/cars/CAR_ID
```

---

## Services Endpoints

### 1. Get All Services
```bash
curl -X GET http://localhost:5000/api/services
```

### 2. Get Service by ID
```bash
curl -X GET http://localhost:5000/api/services/SERVICE_ID
```

### 3. Create Service (Admin)
```bash
curl -X POST http://localhost:5000/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Regular Maintenance",
    "description": "Routine maintenance service",
    "price": 150,
    "duration": "1-2 hours",
    "features": ["Oil Change", "Inspection"]
  }'
```

### 4. Book Service (Authenticated)
```bash
curl -X POST http://localhost:5000/api/services/book \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "serviceId": "SERVICE_ID",
    "vehicleModel": "Honda Civic",
    "preferredDate": "2024-02-20",
    "notes": "First service after purchase"
  }'
```

---

## Users Endpoints (Authenticated)

### 1. Get Profile
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer TOKEN"
```

### 2. Update Profile
```bash
curl -X PUT http://localhost:5000/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "name": "John Doe Updated",
    "phone": "+92 333 999 9999",
    "address": "G-9, Islamabad"
  }'
```

### 3. Get User Bookings
```bash
curl -X GET http://localhost:5000/api/users/bookings \
  -H "Authorization: Bearer TOKEN"
```

---

## Contact Endpoints

### 1. Send Message
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+92 333 456 7890",
    "subject": "Inquiry about vehicles",
    "message": "I am interested in your luxury sedan"
  }'
```

### 2. Get All Messages (Admin)
```bash
curl -X GET http://localhost:5000/api/contact
```

---

## Health Check

```bash
curl -X GET http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Chand Motors API is running"
}
```

---

## HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Access denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Common Error Responses

```json
{
  "success": false,
  "message": "Email already registered"
}
```

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

```json
{
  "success": false,
  "message": "No token provided. Please login",
  "errors": []
}
```

---

## Testing with Postman

1. Import the collection from `postman_collection.json`
2. Set environment variable `BASE_URL` to your API URL
3. Set `token` variable after login
4. Test all endpoints

---

## Sample Valid Data

### User Registration
```json
{
  "name": "Ahmed Khan",
  "email": "ahmed@example.com",
  "phone": "+92 300 1234567",
  "password": "SecurePass123"
}
```

### Car Creation
```json
{
  "name": "Tesla Model S",
  "type": "Electric",
  "price": 95000,
  "power": "500 HP",
  "speed": "0-60 in 3.2s",
  "capacity": "5 Seats",
  "warranty": "8 Years",
  "description": "Premium electric sedan",
  "features": ["Autopilot", "Supercharging", "60 kWh Battery"]
}
```

---

**Ready to test! Start with signup, then explore all endpoints.**
