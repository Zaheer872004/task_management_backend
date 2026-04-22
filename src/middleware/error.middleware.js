'use strict';
import { ApiError } from '../helper/ApiError.js';
import { ApiResponse } from '../helper/ApiResponse.js';
import { logger } from '../helper/logger.js';

// eslint-disable-next-line no-unused-vars
export const errorMiddleware = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(
      new ApiResponse(err.statusCode, null, err.message)
    );
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(422).json(new ApiResponse(422, null, err.message));
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json(new ApiResponse(401, null, 'Invalid token'));
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json(new ApiResponse(401, null, 'Token expired'));
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json(new ApiResponse(409, null, `${field} already exists`));
  }

  return res.status(500).json(new ApiResponse(500, null, 'Internal server error'));
};
