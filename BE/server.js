const express = require("express");

const app = express();

app.use(express.json());

// API test
app.get("/", (req, res) => {
  res.send("Backend running...");
});

// API example
app.get("/products", (req, res) => {
  const products = [
    { id: 1, name: "Iphone", price: 1000 },
    { id: 2, name: "Laptop", price: 2000 },
  ];

  res.json(products);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
