'use strict';
import { z } from 'zod';

// 🔹 Register Schema
export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(50),

  email: z
    .string()
    .trim()
    .email('Please provide a valid email'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),

});

// 🔹 Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please provide a valid email'),

  password: z
    .string()
    .min(1, 'Password is required'),
});