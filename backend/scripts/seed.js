const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../src/models/User');
const Team = require('../src/models/Team');
const Equipment = require('../src/models/Equipment');

dotenv.config();

const seedData = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gearguard');
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // 1. Clear existing data to avoid duplicates
    await User.deleteMany({});
    await Team.deleteMany({});
    await Equipment.deleteMany({});
    console.log('--- Old data cleared ---');

    // 2. Create a User (Technician)
    const technician = await User.create({
      name: 'Alice Wonderland',
      role: 'technician',
      email: 'alice@example.com'
    });
    console.log(`✅ User Created: ${technician.name} (ID: ${technician._id})`);

    // 3. Create a Team and assign the Technician
    const team = await Team.create({
      name: 'Alpha Team',
      technicians: [technician._id]
    });
    console.log(`✅ Team Created: ${team.name} (ID: ${team._id})`);

    // 4. Create Equipment linked to the Team and Technician
    const equipment = await Equipment.create({
      name: 'CNC Machine 001',
      serialNumber: 'CNC-001-XYZ',
      department: 'Production',
      maintenanceTeam: team._id,
      assignedEmployee: technician._id,
      defaultTechnician: technician._id
    });
    console.log(`✅ Equipment Created: ${equipment.name} (ID: ${equipment._id})`);

    // 5. Test Scrap Logic
    console.log('--- Testing Scrap Logic ---');
    equipment.status = 'scrapped';
    equipment.isScrapped = true;
    equipment.isActive = false;
    await equipment.save();
    console.log(`✅ Equipment Scrapped! Status: ${equipment.status}, Active: ${equipment.isActive}`);

    console.log('--- Data Seeding Complete ---');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
