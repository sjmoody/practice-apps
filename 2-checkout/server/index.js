require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

app.use(express.json());

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

/****
 *
 *
 * Other routes here....
 *
 *
 */
app.post('/purchase', (req, res) => {
  console.log(`Server request to make a purchase. Details from request:`)
  console.log(req.body)
  console.log(req)
  res.send("Purchase made")
  // TODO: construct mysql save and save to db.
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
