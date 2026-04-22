'use strict';
import { z } from 'zod';
import { TASK_STATUS, TASK_TYPE } from '../config/constants.js';

// 🔹 Create Task Schema
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),

  description: z.string().max(1000).optional().default(''),

  status: z.enum(Object.values(TASK_STATUS)).optional(),

  dueDate: z.string().datetime().optional().nullable(),

  assignee: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId')
    .optional(),
});
  

// 🔹 Update Task Schema
export const updateTaskSchema = z
  .object({
    title: z.string().min(1).max(200).optional(),

    description: z.string().max(1000).optional(),

    status: z
      .enum(Object.values(TASK_STATUS))
      .optional(),

    dueDate: z
      .string()
      .datetime()
      .optional()
      .nullable(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: 'At least one field must be provided',
    }
  );