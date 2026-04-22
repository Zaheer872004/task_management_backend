'use strict';
import { Task } from '../models/task.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../helper/ApiError.js';
import {
  canViewTask,
  canDeleteTask,
  getAllowedUpdateFields,
} from '../policies/task.policy.js';

// CREATE TASK
export const createTask = async (data, userId) => {
  const { title, description, status, dueDate, assignee } = data;

  // Assigned Task
  if (assignee) {
    const assigneeUser = await User.findById(assignee);
    if (!assigneeUser) throw new ApiError(404, 'Assignee user not found');

    if (assignee === userId.toString()) {
      throw new ApiError(400, 'You cannot assign a task to yourself');
    }

    return Task.create({
      title,
      description,
      status,
      dueDate,
      createdBy: userId,
      assignee,
    });
  }

  // Personal Task
  return Task.create({
    title,
    description,
    status,
    dueDate,
    createdBy: userId,
    assignee: null,
  });
};

// GET ALL TASKS (own + assigned)
export const getTasks = async (userId) => {
  const tasks = await Task.find({
    $or: [
      { createdBy: userId },
      { assignee: userId },
    ],
  })
    .populate('createdBy', 'fullName email')
    .populate('assignee', 'fullName email')
    .sort({ createdAt: -1 });

  return tasks;
};

// GET SINGLE TASK
export const getTaskById = async (taskId, userId) => {
  const task = await Task.findById(taskId)
    .populate('createdBy', 'fullName email')
    .populate('assignee', 'fullName email');

  if (!task) throw new ApiError(404, 'Task not found');

  if (!canViewTask(task, userId)) {
    throw new ApiError(403, 'Access denied');
  }

  return task;
};

// UPDATE TASK (role-based)
export const updateTask = async (taskId, updates, userId) => {
  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, 'Task not found');

  const allowedFields = getAllowedUpdateFields(task, userId);

  const filteredUpdates = {};

  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      filteredUpdates[field] = updates[field];
    }
  }

  if (Object.keys(filteredUpdates).length === 0) {
    throw new ApiError(400, 'No permitted fields to update');
  }

  const updated = await Task.findByIdAndUpdate(
    taskId,
    { $set: filteredUpdates },
    { new: true, runValidators: true }
  )
    .populate('createdBy', 'fullName email')
    .populate('assignee', 'fullName email');

  return updated;
};

// DELETE TASK
export const deleteTask = async (taskId, userId) => {
  const task = await Task.findById(taskId);
  if (!task) throw new ApiError(404, 'Task not found');

  if (!canDeleteTask(task, userId)) {
    throw new ApiError(403, 'Only the creator can delete this task');
  }

  await Task.findByIdAndDelete(taskId);

  return { message: 'Task deleted successfully' };
};