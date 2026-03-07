const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/auth");

const app = express();

/* ----------------------------- */
/* Middleware */
/* ----------------------------- */

app.use(cors());
app.use(express.json());


/* ----------------------------- */
/* Database Connection */
/* ----------------------------- */

connectDB();


/* ----------------------------- */
/* Routes */
/* ----------------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);


/* ----------------------------- */
/* Health Check Route */
/* ----------------------------- */

app.get("/", (req, res) => {
  res.send("CRM API Running 🚀");
});


/* ----------------------------- */
/* Handle Unknown Routes */
/* ----------------------------- */

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});


/* ----------------------------- */
/* Start Server */
/* ----------------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});