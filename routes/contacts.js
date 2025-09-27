// routes/contacts.js

const express = require("express");
const router = express.Router();
const contactsController = require("../controller/contacts");

// GET all contacts
router.get("/", contactsController.getAll);

// GET single contact by ID
router.get("/:id", contactsController.getSingle);

// POST create a new contact
router.post("/", contactsController.createContact);

// PUT update a contact
router.put("/:id", contactsController.updateContact);

// DELETE remove a contact
router.delete("/:id", contactsController.deleteContact);

module.exports = router;
