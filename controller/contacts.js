// controller/contacts.js

const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// GET all contacts
const getAll = async (req, res) => {
  try {
    const db = mongodb.getDatabase().db("portfolioDB"); // change if your db is different
    const result = await db.collection("contacts").find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one contact by ID
const getSingle = async (req, res) => {
  try {
    const contactId = req.params.id;
    const db = mongodb.getDatabase().db("portfolioDB");
    const result = await db
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

module.exports = {
  getAll,
  getSingle,
};
