const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const artisans = [
  {
    name: 'Olumide Johnson',
    email: 'olumide@example.com',
    password: 'password123',
    role: 'artisan',
    profilePicture: 'https://images.unsplash.com/photo-1540560085022-b8d2823c882a?q=80&w=300&h=300&auto=format&fit=crop',
    phoneNumber: '08012345678',
    artisanProfile: {
      businessName: 'Olu Electricals',
      skills: ['Electrician'],
      bio: 'Professional electrician with 10 years experience in house wiring and industrial maintenance.',
      location: {
        state: 'Lagos',
        city: 'Ikeja',
        coordinates: { lat: 6.6018, lng: 3.3515 }
      },
      portfolio: [
        { imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=500&auto=format&fit=crop', description: 'Main electrical box installation' },
        { imageUrl: 'https://images.unsplash.com/photo-1558444391-7899b475903b?q=80&w=500&auto=format&fit=crop', description: 'Smart home lighting setup' }
      ],
      rating: 4.8,
      numberOfReviews: 12,
      availability: true
    }
  },
  {
    name: 'Chidi Okoro',
    email: 'chidi@example.com',
    password: 'password123',
    role: 'artisan',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&auto=format&fit=crop',
    phoneNumber: '07098765432',
    artisanProfile: {
      businessName: 'Chidi Woodworks',
      skills: ['Carpenter'],
      bio: 'Master carpenter specializing in bespoke furniture and modern kitchen cabinets.',
      location: {
        state: 'Abuja',
        city: 'Garki',
        coordinates: { lat: 9.0765, lng: 7.3986 }
      },
      portfolio: [
        { imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=500&auto=format&fit=crop', description: 'Custom Mahogany Dining Table' }
      ],
      rating: 4.9,
      numberOfReviews: 8,
      availability: true
    }
  },
  {
    name: 'Fatima Yusuf',
    email: 'fatima@example.com',
    password: 'password123',
    role: 'artisan',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=300&auto=format&fit=crop',
    phoneNumber: '09011223344',
    artisanProfile: {
      businessName: 'Fatima Stitches',
      skills: ['Tailor'],
      bio: 'Fashion designer and tailor focused on traditional and western attire for all occasions.',
      location: {
        state: 'Ibadan',
        city: 'Bodija',
        coordinates: { lat: 7.3775, lng: 3.9470 }
      },
      portfolio: [
        { imageUrl: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f68e?q=80&w=500&auto=format&fit=crop', description: 'Bespoke Ankara Gown' }
      ],
      rating: 4.7,
      numberOfReviews: 15,
      availability: true
    }
  }
];

const seedDB = async () => {
  try {
    await User.deleteMany({ email: { $in: artisans.map(a => a.email) } });
    await User.create(artisans);
    console.log('Seed data inserted successfully');
  } catch (err) {
    console.error('Seeding error:', err);
  }
};

module.exports = seedDB;

if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/craftconnect')
    .then(async () => {
      console.log('Connected to MongoDB for seeding...');
      await seedDB();
      process.exit();
    })
    .catch(err => {
      console.error('Seeding error:', err);
      process.exit(1);
    });
}
