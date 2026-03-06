const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN = {
  email: "admin@crm.com",
  password: "admin123"
};

router.post("/login", (req, res) => {

  const { email, password } = req.body;

  if (email === ADMIN.email && password === ADMIN.password) {

    const token = jwt.sign(
      { email },
      "secretkey",
      { expiresIn: "1h" }
    );

    return res.json({ token });

  }

  res.status(401).json({ message: "Invalid credentials" });

});

module.exports = router;