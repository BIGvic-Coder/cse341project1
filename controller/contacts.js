// controller/contacts.js

const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// GET all contacts
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDatabase()
      .collection("contacts")
      .find()
      .toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one contact by ID
const getSingle = async (req, res) => {
  try {
    const contactId = req.params.id;
    const result = await mongodb
      .getDatabase()
      .collection("contacts")
      .findOne({ _id: new ObjectId(contactId) });

    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a new contact
const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await mongodb
      .getDatabase()
      .collection("contacts")
      .insertOne(contact);

    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE a contact
const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const result = await mongodb
      .getDatabase()
      .collection("contacts")
      .updateOne({ _id: new ObjectId(contactId) }, { $set: updatedContact });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(204).send(); // no content, update successful
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a contact
const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const result = await mongodb
      .getDatabase()
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(contactId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(204).send(); // no content, delete successful
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
