'use strict';
import { ApiResponse } from '../helper/ApiResponse.js';

export const notFound = (req, res) => {
  res.status(404).json(new ApiResponse(404, null, `Route ${req.originalUrl} not found`));
};
