'use strict';
import { User } from '../models/user.model.js';
import { ApiError } from '../helper/ApiError.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../helper/generateTokens.js';


export const registerUser = async ({ fullName, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, 'Email already registered');

  const user = await User.create({ fullName, email, password });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: user.toSafeObject(),
    accessToken,
    refreshToken,
  };
};


export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new ApiError(401, 'Invalid email or password');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(401, 'Invalid email or password');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // update refresh token
  user.refreshToken = refreshToken;
  await user.save();

  return {
    user: user.toSafeObject(),
    accessToken,
    refreshToken,
  };
};


export const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
  return { message: 'Logged out successfully' };
};


export const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, 'User not found');

  return user.toSafeObject();
};


export const getAllUsers = async (currentUserId) => {
  const users = await User.find({
    _id: { $ne: currentUserId },
  }).select('fullName email _id');

  return users;
};


// REFRESH TOKEN API
export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new ApiError(401, 'Refresh token required');

  const user = await User.findOne({ refreshToken });
  if (!user) throw new ApiError(403, 'Invalid refresh token');

  const accessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  // update refresh token in DB
  user.refreshToken = newRefreshToken;
  await user.save();


  return { accessToken, refreshToken: newRefreshToken };
};

