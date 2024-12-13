const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const EnsureAuthentication = require("./Routes/ensureAuthentication");
const OrderRouter = require("./Routes/OrderRouter");
const UserModel = require("./Models/User");
const bcrypt = require("bcrypt");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(cors());

require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("PONG");
});
app.get("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const user = await UserModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() }, // Ensure the token hasn't expired
    });

    if (!user) {
      return res.status(400).send("Invalid or expired reset token.");
    }

    // Render a reset password form or respond with a message
    res.send(`
      <form action="/reset-password/${token}" method="POST">
        <input type="password" name="password" placeholder="New password" required />
        <button type="submit">Reset Password</button>
      </form>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
});

app.post("/reset-password/:token", async (req, res) => {
  try {
    if (!req.body || !req.body.password) {
      return res.status(400).json({ message: "Password is required." });
    }

    const { token } = req.params;
    const { password } = req.body;

    const user = await UserModel.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token." });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.use("/auth", AuthRouter);
app.use("/checkAuth", EnsureAuthentication);
app.use("/orders", OrderRouter); // Order management routes

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
