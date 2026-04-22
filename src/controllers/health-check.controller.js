'use strict';
import asyncHandler from '../helper/asyncHandler.js';
import { ApiResponse } from '../helper/ApiResponse.js';

export const healthCheck = asyncHandler(async (req, res) => {
  res.json(new ApiResponse(200, { status: 'ok', uptime: process.uptime() }, 'Server is healthy'));
});
