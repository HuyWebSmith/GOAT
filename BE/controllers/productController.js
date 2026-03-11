const products = require("../models/productModel");

// Lấy tất cả sản phẩm
exports.getProducts = (req, res) => {
  res.json({
    success: true,
    data: products,
    total: products.length,
  });
};

// Thêm sản phẩm mới
exports.addProduct = (req, res) => {
  const { name, price, description } = req.body;

  // Kiểm tra dữ liệu
  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập tên và giá sản phẩm",
    });
  }

  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    name: name.trim(),
    price: parseFloat(price),
    description: description || "",
    createdAt: new Date().toLocaleString("vi-VN"),
  };

  products.push(newProduct);

  res.json({
    success: true,
    message: "Thêm sản phẩm thành công!",
    product: newProduct,
  });
};

// Xóa sản phẩm
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Sản phẩm không tồn tại",
    });
  }

  const deletedProduct = products.splice(index, 1);
  res.json({
    success: true,
    message: "Xóa sản phẩm thành công!",
    product: deletedProduct[0],
  });
};

// Cập nhật sản phẩm
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Sản phẩm không tồn tại",
    });
  }

  if (name) product.name = name.trim();
  if (price) product.price = parseFloat(price);
  if (description) product.description = description;

  res.json({
    success: true,
    message: "Cập nhật sản phẩm thành công!",
    product,
  });
};
