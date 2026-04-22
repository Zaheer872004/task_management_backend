'use strict';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

// 🔐 ACCESS TOKEN (short expiry)
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id },
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_EXPIRES_IN || '15m' }
  );
};

// 🔄 REFRESH TOKEN (long expiry)
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
};