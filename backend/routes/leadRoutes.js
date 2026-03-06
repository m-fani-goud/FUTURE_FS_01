const express = require("express");
const router = express.Router();

const {
  getLeads,
  createLead,
  updateLead,
  deleteLead
} = require("../controllers/leadController");


// GET all leads
router.get("/", getLeads);

// CREATE lead
router.post("/", createLead);

// UPDATE lead
router.put("/:id", updateLead);

// DELETE lead
router.delete("/:id", deleteLead);

module.exports = router;