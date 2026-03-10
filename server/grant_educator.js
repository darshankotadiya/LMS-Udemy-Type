import mongoose from 'mongoose';
import User from './model/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const updateRole = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // We are updating the user with this email to 'educator'
    const email = 'vimalsata9913@gmail.com';
    const user = await User.findOneAndUpdate(
      { email },
      { role: 'educator' },
      { new: true }
    );
    
    if (user) {
      console.log(`Successfully updated ${user.email} to educator role.`);
    } else {
      console.log(`User with email ${email} not found.`);
    }
  } catch (error) {
    console.error('Error updating role:', error);
  } finally {
    mongoose.connection.close();
  }
};

updateRole();
