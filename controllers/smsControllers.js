const { sendSMS } = require("../services/twilioService");

const sendBulkSMS = async (req, res) => {
  const { contacts, message } = req.body;

  try {
    const results = await Promise.all(
      contacts.map((contact) => sendSMS(contact.phone, message))
    );
    res.status(200).json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { sendBulkSMS };
