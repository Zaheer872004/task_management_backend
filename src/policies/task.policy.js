"use strict";
import { ApiError } from "../helper/ApiError.js";

//* Determine allowed update fields

export const getAllowedUpdateFields = (task, userId) => {
  const uid = userId.toString();
  const createdBy = task.createdBy?._id?.toString() || task.createdBy?.toString();
  const assignee = task.assignee?._id?.toString() || task.assignee?.toString();

  const isCreator = createdBy === uid;
  const isAssignee = assignee === uid;

  //* Not related → no access to update
  if (!isCreator && !isAssignee) {
    throw new ApiError(403, "You do not have permission to modify this task");
  }

  //* PERSONAL TASK (no assignee)
  if (!task.assignee) {
    if (!isCreator) {
      throw new ApiError(403, "You do not have permission");
    }

    return ["title", "description", "status", "dueDate"];
  }

  //* ASSIGNED TASK

  //* Assignee → only status
  if (isAssignee) {
    return ["status"];
  }

  //* Creator → everything except status
  if (isCreator) {

    //! if required assginer only update the dueDate then only pass dueDate in allowed fields
    return ["title", "description", "dueDate"];
  }

  throw new ApiError(403, "You do not have permission");
};

//* Can view task

export const canViewTask = (task, userId) => {
  const uid = userId.toString();

  const createdBy =
    task.createdBy?._id?.toString() || task.createdBy?.toString();

  const assignee =
    task.assignee?._id?.toString() || task.assignee?.toString();

  return createdBy === uid || assignee === uid;
};

//* Can delete task (ONLY creator)

export const canDeleteTask = (task, userId) => {
  return task.createdBy?._id?.toString() === userId.toString();
};
