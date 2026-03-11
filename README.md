# 🚀 Hướng dẫn Chạy Backend & Frontend Riêng Biệt

## 📋 Cấu trúc

```
Backend (BE) ❌ Không serve HTML nữa
├── Port: 3001
├── Chức năng: API Server
├── Routes:
│   ├── POST /auth/login - Đăng nhập (trả về JSON)
│   ├── GET /admin - Xem lịch sử đăng nhập (JSON)
│   ├── POST /admin/clear-history - Xóa lịch sử
│   └── GET /admin/export-csv - Xuất CSV
└── Files: controllers/, routes/, models/

Frontend (FE) ✅ Serve HTML
├── Port: 3000
├── Chức năng: UI & gọi API từ BE
├── Pages:
│   ├── /login - Trang đăng nhập
│   ├── /admin - Dashboard admin
│   ├── / - Trang chủ
│   └── /about, /products, /contact, /cart...
└── Files: views/, public/, controllers/
```

## ⚙️ Cách Cài Đặt

### 1️⃣ Backend Setup

```bash
cd BE
npm install
```

### 2️⃣ Frontend Setup

```bash
cd FE
npm install
```

## 🎯 Chạy Ứng Dụng

### Option 1: Chạy bằng 2 Terminal riêng biệt

**Terminal 1 - Backend (Port 3001):**

```bash
cd BE
npm start
# Output: Backend API running on http://localhost:3001
```

**Terminal 2 - Frontend (Port 3000):**

```bash
cd FE
npm start
# Output: Frontend running on http://localhost:3000
```

### Option 2: Chạy development mode

Cài nodemon trước:

```bash
npm install -g nodemon
```

**Terminal 1:**

```bash
cd BE
nodemon app.js
```

**Terminal 2:**

```bash
cd FE
nodemon src/app.js
```

## 📱 Sử Dụng

1. **Mở trình duyệt:** `http://localhost:3000`
2. **Đăng nhập:**
   - Username: `admin`
   - Password: `123`
3. **Admin Page:** Xem lịch sử đăng nhập chi tiết
4. **Xuất CSV:** Click nút "Xuất CSV"
5. **Xóa lịch sử:** Click nút "Xóa lịch sử"

## 🔑 API Endpoints (Backend)

### Authentication

```bash
POST /auth/login
Body: { "username": "admin", "password": "123" }
Response: { "success": true, "message": "Đăng nhập thành công", "redirect": "/admin" }
```

### Admin

```bash
GET /admin
Response: { "success": true, "data": [...], "total": 5, "success_count": 3, "failed_count": 2 }

POST /admin/clear-history
Response: { "success": true, "message": "Đã xóa lịch sử đăng nhập" }

GET /admin/export-csv
Response: CSV file (text/csv)
```

## 📂 Lịch sử Đăng nhập

- **Lưu tại:** `BE/logs/loginHistory.json`
- **Format:**

```json
[
  {
    "username": "admin",
    "success": true,
    "timestamp": "9/3/2026, 10:30:45",
    "ipAddress": "::1"
  }
]
```

## 🌐 CORS

Backend đã bật CORS cho Frontend gọi API từ port 3000 tới port 3001.

## ⚡ Chú ý

- ✅ BE cung cấp API (JSON responses)
- ✅ FE xử lý UI & gọi API
- ✅ Lịch sử đăng nhập được lưu trữ trên BE
- ✅ Có thể dùng REST client (Postman) để test API
# GOAT
