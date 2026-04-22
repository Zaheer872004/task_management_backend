'use strict';
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';

const MONGODB_URI = env.MONGODB_URI;

const users = [
  { fullName: 'Alice Johnson', email: 'alice@demo.com', password: 'password123' },
  { fullName: 'Bob Smith', email: 'bob@demo.com', password: 'password123' },
  { fullName: 'Carol White', email: 'carol@demo.com', password: 'password123' },
];

const seed = async () => {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const { default: UserModel } = await import('../models/user.model.js');

  for (const u of users) {
    const exists = await UserModel.findOne({ email: u.email });
    if (!exists) {
      await UserModel.create(u);
      console.log(`Created user: ${u.email}`);
    } else {
      console.log(`User already exists: ${u.email}`);
    }
  }

  console.log('Seeding complete');
  process.exit(0);
};

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
