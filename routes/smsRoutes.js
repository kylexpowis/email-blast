const express = require("express");
const { sendBulkSMS } = require("../controllers/smsControllers");

const router = express.Router();

router.post("/send-bulk-sms", sendBulkSMS);

module.exports = router;
