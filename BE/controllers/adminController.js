const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "../logs/loginHistory.json");

// Lấy lịch sử đăng nhập
exports.getLoginHistory = (req, res) => {
  let history = [];

  if (fs.existsSync(LOG_FILE)) {
    try {
      history = JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
    } catch (e) {
      history = [];
    }
  }

  res.json({
    success: true,
    data: history,
    total: history.length,
    success_count: history.filter((log) => log.success === true).length,
    failed_count: history.filter((log) => log.success === false).length,
  });
};

// Xóa lịch sử đăng nhập
exports.clearLoginHistory = (req, res) => {
  try {
    if (fs.existsSync(LOG_FILE)) {
      fs.unlinkSync(LOG_FILE);
    }
    res.json({
      success: true,
      message: "Đã xóa lịch sử đăng nhập",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa lịch sử",
    });
  }
};

// Xuất CSV
exports.exportLoginHistory = (req, res) => {
  let history = [];

  if (fs.existsSync(LOG_FILE)) {
    try {
      history = JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
    } catch (e) {
      history = [];
    }
  }

  let csv = "Tên người dùng,Đăng nhập thành công,Thời gian,Địa chỉ IP\n";
  history.forEach((log) => {
    csv += `"${log.username}","${log.success}","${log.timestamp}","${log.ipAddress}"\n`;
  });

  res.header("Content-Type", "text/csv");
  res.header("Content-Disposition", 'attachment; filename="login-history.csv"');
  res.send(csv);
};
