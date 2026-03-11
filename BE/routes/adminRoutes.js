const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/", adminController.getLoginHistory);
router.post("/clear-history", adminController.clearLoginHistory);
router.get("/export-csv", adminController.exportLoginHistory);

module.exports = router;
