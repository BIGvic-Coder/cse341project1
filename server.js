// server.js

const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Contacts API 🚀",
    endpoints: {
      contacts: "/contacts",
      users: "/users",
    },
    docs: "/api-docs",
  });
});

// Routes
app.use("/", require("./routes"));

// Database connection
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});
