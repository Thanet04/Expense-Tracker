# Expense Tracker Backend

Backend API สำหรับ Expense Tracker application ที่รองรับทั้ง MongoDB และ MySQL

## Features

- ✅ MongoDB และ MySQL database connections
- ✅ JWT Authentication
- ✅ User Sign Up / Sign In
- ✅ Password hashing ด้วย bcrypt
- ✅ TypeScript support
- ✅ Error handling middleware
- ✅ Validation middleware

## Installation

1. ติดตั้ง dependencies:
```bash
npm install
```

2. สร้างไฟล์ `.env` จาก `.env.example`:
```bash
cp .env.example .env
```

3. แก้ไขค่าในไฟล์ `.env` ตามที่ต้องการ:
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/expense-tracker

# MySQL
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=expense_tracker

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

## Running the Server

### Development mode:
```bash
npm run dev
```

### Build:
```bash
npm run build
```

### Production mode:
```bash
npm start
```

## API Endpoints

### Authentication

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Sign In
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Profile (Protected)
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

## Response Format

### Success Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "jwt_token_here"
  }
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Project Structure

```
src/
├── config/          # Database และ JWT configuration
│   ├── database.ts  # MongoDB และ MySQL connections
│   └── jwt.ts       # JWT utilities
├── controllers/     # Route controllers
│   └── authController.ts
├── middleware/      # Express middleware
│   ├── auth.ts      # JWT authentication
│   ├── error.ts     # Error handling
│   └── validation.ts # Request validation
├── models/          # Database models
│   └── User.ts      # User model (MongoDB)
├── routes/          # API routes
│   ├── authRoutes.ts
│   └── index.ts
├── services/        # Business logic
│   └── authService.ts
└── index.ts         # Entry point
```

## Database Setup

### MongoDB
- MongoDB จะสร้าง collection `users` อัตโนมัติเมื่อมีการสร้าง user ครั้งแรก
- ไม่จำเป็นต้องสร้าง database หรือ collection ล่วงหน้า

### MySQL
- ต้องสร้าง database ก่อน:
```sql
CREATE DATABASE expense_tracker;
```
- Connection pool จะจัดการการเชื่อมต่อให้อัตโนมัติ

## Security Notes

- ⚠️ **เปลี่ยน JWT_SECRET** ใน production
- ⚠️ ใช้ environment variables สำหรับ sensitive data
- ⚠️ ใช้ HTTPS ใน production
- ⚠️ ตั้งค่า strong password policy

## License

ISC
