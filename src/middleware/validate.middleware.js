'use strict';
import { ApiError } from '../helper/ApiError.js';

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const messages = result.error.issues.map((err) => err.message);
    return next(new ApiError(422, 'Validation failed', messages));
  }

  // replace req.body with parsed data (important)
  req.body = result.data;

  next();
};