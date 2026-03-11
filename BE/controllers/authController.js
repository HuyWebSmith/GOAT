const fs = require("fs");
const path = require("path");

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "123";
const LOG_FILE = path.join(__dirname, "../logs/loginHistory.json");

// Tạo thư mục logs nếu không tồn tại
const logsDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Hàm lưu lịch sử đăng nhập
const saveLoginHistory = (username, success, ipAddress) => {
  let history = [];

  if (fs.existsSync(LOG_FILE)) {
    try {
      history = JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
    } catch (e) {
      history = [];
    }
  }

  history.push({
    username: username,
    success: success,
    timestamp: new Date().toLocaleString("vi-VN"),
    ipAddress: ipAddress,
  });

  fs.writeFileSync(LOG_FILE, JSON.stringify(history, null, 2));
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const ipAddress = req.ip || req.connection.remoteAddress;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    saveLoginHistory(username, true, ipAddress);
    res.json({
      success: true,
      message: "Đăng nhập thành công",
      redirect: "/admin",
    });
  } else {
    saveLoginHistory(username, false, ipAddress);
    res.status(401).json({
      success: false,
      message: "Tên đăng nhập hoặc mật khẩu không đúng",
    });
  }
};
