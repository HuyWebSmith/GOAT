const express = require("express");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS Middleware - PHẢI ĐẶT TRƯỚC CÁC ROUTES
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // Xử lý preflight request
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running on port 3001" });
});

// API Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found", path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({ error: "Internal server error", message: err.message });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend API running on http://localhost:${PORT}`);
  console.log(`✅ CORS enabled for all origins`);
  console.log(`✅ Test endpoint: http://localhost:${PORT}/api/health`);
});
