'use strict';
import asyncHandler from '../helper/asyncHandler.js';
import { ApiResponse } from '../helper/ApiResponse.js';
import * as TaskService from '../services/task.service.js';
import {
  createTaskSchema,
  updateTaskSchema,
} from '../validations/task.validation.js';
import { logger } from '../helper/logger.js';

// CREATE TASK
export const createTask = asyncHandler(async (req, res) => {
  const result = createTaskSchema.safeParse(req.body);

  if (!result.success) {
    logger.error('Task creation validation failed', {
      errors: result.error.issues,
      input: req.body,
    });
    throw new Error(result.error.issues[0].message);
  }

  const task = await TaskService.createTask(result.data, req.user._id);

  res
    .status(201)
    .json(new ApiResponse(201, { task }, 'Task created successfully'));
});

// GET ALL TASKS
export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await TaskService.getTasks(req.user._id);

  res.json(new ApiResponse(200, { tasks }));
});

// GET SINGLE TASK
export const getTask = asyncHandler(async (req, res) => {
  const task = await TaskService.getTaskById(
    req.params.id,
    req.user._id
  );

  res.json(new ApiResponse(200, { task }));
});

// UPDATE TASK
export const updateTask = asyncHandler(async (req, res) => {
  const result = updateTaskSchema.safeParse(req.body);

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  const task = await TaskService.updateTask(
    req.params.id,
    result.data,
    req.user._id
  );

  res.json(
    new ApiResponse(200, { task }, 'Task updated successfully')
  );
});

// DELETE TASK
export const deleteTask = asyncHandler(async (req, res) => {
  await TaskService.deleteTask(req.params.id, req.user._id);

  res.json(new ApiResponse(200, null, 'Task deleted successfully'));
});