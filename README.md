# Task Manager Backend

Backend API for Task Manager, built with Node.js, Express, and MongoDB.

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cookie Parser
- CORS
- dotenv

## Features
- User registration and login
- JWT-based authentication
- Get current user (`/auth/me`)
- Task CRUD APIs
- Assign tasks to users
- Role/permission-based task updates

## Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local or cloud)

## Setup

### 1) Clone repository
```bash
git clone https://github.com/Zaheer872004/task_management_backend.git
cd task_management_backend
```

### 2) Install dependencies
```bash
npm install
```

### 3) Add environment variables
Create `.env` in backend root:

```env
PORT=8000
MONGODB_URI=mongodb+srv://username:password@cluster0.jhvitxu.mongodb.net/task_manage?retryWrites=true&w=majority
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=7d
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

## Run Backend

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

Server runs on:
- `http://localhost:8000`

## API Base URL
```text
/api/v1
```

## Main Endpoints

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/refresh-token` (optional)

### Tasks
- `GET /api/v1/tasks`
- `GET /api/v1/tasks/:id`
- `POST /api/v1/tasks`
- `PATCH /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`

## Example Login Response
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "123",
      "fullName": "Zaheer"
    },
    "accessToken": "jwt_token_here"
  },
  "message": "Login successful",
  "success": true
}
```

## Folder Structure (example)
```bash
src/
  controllers/
  routes/
  models/
  middleware/
  helper/
  utils/
  app.js
  index.js
```

## Notes
- Make sure MongoDB is running before starting backend.
- If frontend cannot access backend, verify:
  - `.env` values
  - CORS origin
  - port availability
- Keep secrets out of version control.