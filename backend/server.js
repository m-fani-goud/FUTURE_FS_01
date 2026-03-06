const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/auth");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Database connection
connectDB();


// Routes
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("CRM API Running");
});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});