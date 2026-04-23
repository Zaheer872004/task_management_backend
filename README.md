# Task Manager Application - Backend

The backend API for the Task Manager system, built with Node.js, Express, and MongoDB. It provides secure JWT-based authentication, relational data handling, and strict role-based permission checks for task manipulation.

## 🔗 Project Links
- **Live API Base URL:** [https://task-management-backend-1-kwpm.onrender.com/api/v1](https://task-management-backend-1-kwpm.onrender.com/api/v1)
- **Live Application (Frontend):** [https://task-management-frontend-roan-zeta.vercel.app](https://task-management-frontend-roan-zeta.vercel.app)
- **Frontend Repository:** [GitHub - Frontend](https://github.com/Zaheer872004/task_management_frontend.git)
- **Postman Collection:** [Test Endpoints Here](https://lunar-shadow-336806.postman.co/workspace/Team-Workspace~597bb334-6196-49e3-8936-7e26cc35c81c/collection/38128014-8dc1cabb-a495-4d3b-93f9-0b73470e8169?action=share&source=copy-link&creator=38128014)

---

## 🛠 Tech Stack
- **Node.js & Express.js**
- **MongoDB + Mongoose** (Data Modeling)
- **JSON Web Tokens (JWT)** (Authentication)
- **Bcrypt** (Password Hashing)
- **CORS** (Secure cross-origin requests)
- **dotenv** (Environment variable management)

---

## ✨ Features
- User registration and login flow.
- JWT-based authentication.
- Fetch current authenticated user (`/auth/me`).
- Full Task CRUD APIs with pagination/filtering logic.
- Role/permission-based updates (Creators can delete/edit all; Assignees can only update status).

---

## 🗄️ Database Models Overview
- **User Model:** Stores credentials (`fullName`, `email`, hashed `password`).
- **Task Model:** Stores task details (`title`, `description`, `status`), references the `createdBy` User ID, and references the `assignedTo` User ID to handle relational queries securely.

---

## 🚀 Local Setup Instructions

### 1) Clone repository
```bash
git clone https://github.com/Zaheer872004/task_management_backend.git
cd task_management_backend
```

### 2) Install dependencies
```bash
npm install
```

### 3) Configure Environment Variables
Create a `.env` file in the backend root:
```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.jhvitxu.mongodb.net/task_manage?retryWrites=true&w=majority
JWT_ACCESS_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=1d
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```
*(Replace `<username>` and `<password>` with your actual MongoDB credentials)*

### 4) Run the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```
The server will run on `http://localhost:8000`.

---

## 📡 Main API Endpoints

### Auth
- `POST /api/v1/auth/register` - Create a new user
- `POST /api/v1/auth/login` - Authenticate and receive tokens
- `POST /api/v1/auth/logout` - Clear user session
- `GET /api/v1/auth/me` - Get current logged-in user profile

### Tasks
- `GET /api/v1/tasks` - Fetch tasks (filtered by ownership)
- `GET /api/v1/tasks/:id` - Fetch single task details
- `POST /api/v1/tasks` - Create a new task
- `PATCH /api/v1/tasks/:id` - Update task (checks creator vs assignee permissions)
- `DELETE /api/v1/tasks/:id` - Delete task (creator only)

---
*Developed with a focus on code quality, clarity, and secure API design.*