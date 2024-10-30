const express = require("express");
const smsRoutes = require("./routes/smsRoutes");

const app = express();
app.use(express.json());

app.use("/api/sms", smsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
