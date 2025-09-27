// routes/contacts.js

const express = require("express");
const router = express.Router();

const contactsController = require("../controller/contacts");

// GET all contacts
router.get("/", contactsController.getAll);

// GET single contact by ID
router.get("/:id", contactsController.getSingle);

module.exports = router;
