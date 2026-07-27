import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Car from './models/Car.js'
import Service from './models/Service.js'
import User from './models/User.js'

dotenv.config()

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chand-motors')
    console.log('✓ Connected to MongoDB')

    // Clear existing data
    console.log('Clearing existing data...')
    await Car.deleteMany({})
    await Service.deleteMany({})
    // Uncomment to clear users: await User.deleteMany({})

    // Sample cars
    const sampleCars = [
      {
        name: 'Luxury Sedan 2024',
        model: '2024 Premium Edition',
        type: 'Sedan',
        price: 65000,
        engineCC: '3.0L',
        capacity: '5 Seats',
        image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=400&fit=crop',
        description: 'Experience ultimate luxury with premium features and advanced technology',
        features: ['Hybrid Engine', 'Premium Interior', 'AI Assistant', 'All-Wheel Drive', 'Panoramic Sunroof'],
        specifications: {
          engine: 'Hybrid V6',
          transmission: 'Automatic 8-Speed',
          fuelType: 'Hybrid',
          mpg: '35 MPG',
          acceleration: '0-60 in 4.2s',
          topSpeed: '155 MPH',
          seating: '5 Passengers',
          trunkSpace: '16.5 cu ft'
        },
        featured: true,
        inStock: true
      },
      {
        name: 'Performance SUV 2024',
        model: '2024 Sport Edition',
        type: 'SUV',
        price: 75000,
        engineCC: '3.5L',
        capacity: '7 Seats',
        image: 'https://images.unsplash.com/photo-1606664515524-2ddc6c2f0ad9?w=500&h=400&fit=crop',
        description: 'High-performance SUV designed for adventure and comfort',
        features: ['Twin Turbo Engine', 'Panoramic Roof', 'Night Vision', 'Adaptive Suspension', 'All-Terrain Mode'],
        specifications: {
          engine: 'Twin Turbo V8',
          transmission: 'Automatic 10-Speed',
          fuelType: 'Premium Gasoline',
          mpg: '22 MPG',
          acceleration: '0-60 in 3.8s',
          topSpeed: '165 MPH',
          seating: '7 Passengers',
          trunkSpace: '25.3 cu ft'
        },
        featured: true,
        inStock: true
      },
      {
        name: 'Electric Crossover 2024',
        model: '2024 EV Edition',
        type: 'Electric',
        price: 55000,
        engineCC: 'Electric Motor',
        capacity: '5 Seats',
        image: 'https://images.unsplash.com/photo-1568605118036-5ec8f60618fb?w=500&h=400&fit=crop',
        description: 'Eco-friendly electric vehicle with excellent range and efficiency',
        features: ['Electric Motor', '500km Range', 'Fast Charging', 'Eco Mode', 'Regenerative Braking'],
        specifications: {
          engine: 'Electric Motor',
          transmission: 'Single Speed',
          fuelType: 'Electric',
          mpg: '4.5 mi/kWh',
          acceleration: '0-60 in 5.1s',
          topSpeed: '140 MPH',
          seating: '5 Passengers',
          trunkSpace: '17.2 cu ft'
        },
        featured: true,
        inStock: true
      },
      {
        name: 'Sports Coupe 2024',
        model: '2024 Turbo Edition',
        type: 'Sports',
        price: 85000,
        engineCC: '5.0L',
        capacity: '2 Seats',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b83ad38?w=500&h=400&fit=crop',
        description: 'High-octane sports car for enthusiasts',
        features: ['Twin Turbo', 'Carbon Fiber', 'Active Aerodynamics', 'Track Mode'],
        specifications: {
          engine: 'Twin Turbo V12',
          transmission: 'Manual 6-Speed',
          fuelType: 'Premium Gasoline',
          mpg: '18 MPG',
          acceleration: '0-60 in 3.2s',
          topSpeed: '190 MPH',
          seating: '2 Passengers',
          trunkSpace: '12.1 cu ft'
        },
        featured: false,
        inStock: true
      },
      {
        name: 'Family Van 2024',
        model: '2024 Family Edition',
        type: 'Van',
        price: 48000,
        engineCC: '2.5L',
        capacity: '8 Seats',
        image: 'https://images.unsplash.com/photo-1621625996145-f3f77c5e7e9a?w=500&h=400&fit=crop',
        description: 'Perfect family vehicle with spacious interior',
        features: ['3-Row Seating', 'Sliding Doors', 'Smart Storage', 'Entertainment System'],
        specifications: {
          engine: 'V6',
          transmission: 'Automatic 6-Speed',
          fuelType: 'Gasoline',
          mpg: '26 MPG',
          acceleration: '0-60 in 6.5s',
          topSpeed: '130 MPH',
          seating: '8 Passengers',
          trunkSpace: '32.4 cu ft'
        },
        featured: false,
        inStock: true
      }
    ]

    // Sample services
    const sampleServices = [
      {
        name: 'Regular Maintenance',
        description: 'Keep your vehicle running smoothly with our comprehensive maintenance services including oil changes and inspections',
        price: 150,
        duration: '1-2 hours',
        features: ['Oil & Filter Change', 'Fluid Top-ups', 'Belt Inspection', 'Battery Check', 'Tire Rotation'],
        available: true
      },
      {
        name: 'Hybrid Diagnostics',
        description: 'Advanced diagnostic services to identify and resolve any issues with precision using state-of-the-art equipment',
        price: 250,
        duration: '2-3 hours',
        features: ['Computer Scan', 'System Analysis', 'Performance Report', 'Detailed Assessment', 'Hybrid System Check'],
        available: true
      },
      {
        name: 'Safety Inspection',
        description: 'Comprehensive safety checks to ensure your vehicle meets all safety standards and performs optimally',
        price: 200,
        duration: '1.5-2 hours',
        features: ['Brake Check', 'Suspension Test', 'Light Inspection', 'Safety Report', 'Alignment Check'],
        available: true
      },
      {
        name: 'Electrical Services',
        description: 'Expert electrical system repairs and upgrades for your vehicle power and charging systems',
        price: 300,
        duration: '2-4 hours',
        features: ['Battery Service', 'Alternator Check', 'Wiring Inspection', 'System Upgrade', 'Charging System Test'],
        available: true
      },
      {
        name: 'Engine Care',
        description: 'Complete engine servicing including repairs, overhauls, and performance optimization for maximum efficiency',
        price: 400,
        duration: '4-6 hours',
        features: ['Engine Tune-up', 'Fluid Flush', 'Spark Plugs', 'Performance Boost', 'Carbon Cleaning'],
        available: true
      },
      {
        name: 'Performance Tuning',
        description: 'Enhance your vehicle performance with custom tuning and optimization services from expert technicians',
        price: 500,
        duration: '3-5 hours',
        features: ['ECU Tuning', 'Suspension Upgrade', 'Exhaust Mod', 'Power Increase', 'Dyno Testing'],
        available: true
      }
    ]

    // Insert cars
    const insertedCars = await Car.insertMany(sampleCars)
    console.log(`✓ Inserted ${insertedCars.length} cars`)

    // Insert services
    const insertedServices = await Service.insertMany(sampleServices)
    console.log(`✓ Inserted ${insertedServices.length} services`)

    console.log('\n✅ Database seeded successfully!\n')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding error:', error)
    process.exit(1)
  }
}

seedDatabase()
