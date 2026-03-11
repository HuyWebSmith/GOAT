const express = require("express");
const path = require("path");

const app = express();

// Cấu hình static files (CSS, JS, Images)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cấu hình EJS template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes - Serve HTML files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/admin", (req, res) => {
  res.render("admin", { loginHistory: [] });
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "products.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "cart.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});

app.get("/myaccount", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "myaccount.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/category", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "category.html"));
});

app.get("/details", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "details.html"));
});

app.get("/specials", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "specials.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Frontend running on http://localhost:${PORT}`);
});
