'use strict';
import asyncHandler from '../helper/asyncHandler.js';
import { ApiResponse } from '../helper/ApiResponse.js';
import * as AuthService from '../services/auth.service.js';
import { cookieOptions } from '../config/cookieOptions.js';

// REGISTER
export const register = asyncHandler(async (req, res) => {
  console.log('Registering user with data:', req.body);

  const { user, accessToken, refreshToken } =
    await AuthService.registerUser(req.body);

  res
    .status(201)
    // 🔄 store refresh token in cookie (secure)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        201,
        {
          user,
          accessToken, // send access token in response
          refreshToken, // send refresh token in response (optional, since it's in cookie)
        },
        'Registered successfully'
      )
    );
});

// LOGIN
export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } =
    await AuthService.loginUser(req.body);

  res
    .status(200)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user,
          accessToken,
          refreshToken,
        },
        'Logged in successfully'
      )
    );
});

// LOGOUT
export const logout = asyncHandler(async (req, res) => {
  await AuthService.logoutUser(req.user._id);

  res
    .clearCookie('refreshToken', cookieOptions)
    .json(new ApiResponse(200, null, 'Logged out successfully'));
});

// GET CURRENT USER
export const getMe = asyncHandler(async (req, res) => {
  const user = await AuthService.getMe(req.user._id);
  res.json(new ApiResponse(200, { user }));
});

// GET ALL USERS
export const getUsers = asyncHandler(async (req, res) => {
  const users = await AuthService.getAllUsers(req.user._id);
  res.json(new ApiResponse(200, { users }));
});


export const refreshToken = asyncHandler(async (req, res) => {
  // 🔄 Get refresh token from cookie
  const refreshToken = req.cookies.refreshToken;

  const { accessToken, refreshToken: newRefreshToken } =
    await AuthService.refreshAccessToken(refreshToken);

  res
    // 🔁 Update refresh token cookie
    .cookie('refreshToken', newRefreshToken, cookieOptions)
    .json(
      new ApiResponse(200, { accessToken }, 'Access token refreshed')
    );
});