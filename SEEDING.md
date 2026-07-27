# Sample Database Seeding Script

You can use this script to populate your MongoDB with sample data.

## Creating Sample Data

Create a file `backend/seed.js` with the following content:

```javascript
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Car from './models/Car.js'
import Service from './models/Service.js'

dotenv.config()

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Car.deleteMany({})
    await Service.deleteMany({})

    // Sample cars
    const sampleCars = [
      {
        name: 'Luxury Sedan 2024',
        type: 'Sedan',
        price: 65000,
        power: '450 HP',
        speed: '0-60 in 4.2s',
        capacity: '5 Seats',
        warranty: '5 Years',
        description: 'Experience ultimate luxury with premium features',
        features: ['Hybrid Engine', 'Premium Interior', 'AI Assistant', 'All-Wheel Drive'],
        featured: true
      },
      {
        name: 'Performance SUV 2024',
        type: 'SUV',
        price: 75000,
        power: '520 HP',
        speed: '0-60 in 3.8s',
        capacity: '7 Seats',
        warranty: '5 Years',
        description: 'High-performance SUV for adventure seekers',
        features: ['Twin Turbo Engine', 'Panoramic Roof', 'Night Vision', 'Adaptive Suspension'],
        featured: true
      },
      {
        name: 'Electric Crossover 2024',
        type: 'Electric',
        price: 55000,
        power: '400 HP',
        speed: '0-60 in 5.1s',
        capacity: '5 Seats',
        warranty: '8 Years',
        description: 'Eco-friendly electric vehicle with great range',
        features: ['Electric Motor', '500km Range', 'Fast Charging', 'Eco Mode'],
        featured: true
      }
    ]

    // Sample services
    const sampleServices = [
      {
        name: 'Regular Maintenance',
        description: 'Keep your vehicle running smoothly',
        price: 150,
        duration: '1-2 hours',
        features: ['Oil & Filter Change', 'Fluid Top-ups', 'Belt Inspection', 'Battery Check']
      },
      {
        name: 'Hybrid Diagnostics',
        description: 'Advanced diagnostic services with precision',
        price: 250,
        duration: '2-3 hours',
        features: ['Computer Scan', 'System Analysis', 'Performance Report', 'Detailed Assessment']
      },
      {
        name: 'Safety Inspection',
        description: 'Comprehensive safety checks and certification',
        price: 200,
        duration: '1.5-2 hours',
        features: ['Brake Check', 'Suspension Test', 'Light Inspection', 'Safety Report']
      }
    ]

    // Insert data
    await Car.insertMany(sampleCars)
    await Service.insertMany(sampleServices)

    console.log('✅ Database seeded successfully')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding error:', error)
    process.exit(1)
  }
}

seedDatabase()
```

## Running the Seed Script

```bash
# Add to package.json scripts
"seed": "node seed.js"

# Run it
npm run seed
```
