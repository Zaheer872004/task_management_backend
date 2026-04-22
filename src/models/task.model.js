'use strict';
import mongoose from 'mongoose';
import { TASK_STATUS } from '../config/constants.js';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: '',
    },

    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.TODO,
    },

    dueDate: {
      type: Date,
      default: null,
    },

    // creator (assigner)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // assigned user (optional)
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

// Validation (VERY IMPORTANT)
taskSchema.pre('save', function () {
  if (this.assignee && this.assignee.equals(this.createdBy)) {
    throw new Error('User cannot assign task to themselves');
  }
});


taskSchema.pre('save', function () {
  if (this.taskType === 'assigned' && !this.assignee) {
    throw new Error('Assigned task must have assignee');
  }

  if (this.taskType === 'personal' && this.assignee) {
    throw new Error('Personal task cannot have assignee');
  }
});

// Indexes
taskSchema.index({ createdBy: 1 });
taskSchema.index({ assignee: 1 });
taskSchema.index({ createdBy: 1, assignee: 1 });

export const Task = mongoose.model('Task', taskSchema);