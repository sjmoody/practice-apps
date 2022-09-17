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
  let sql = `INSERT INTO responses (
    user_name,
    user_email,
    user_password,
    shipping_address_line_1,
    shipping_address_line_2,
    shipping_city,
    shipping_state,
    shipping_zip,
    shipping_phone,
    billing_cc,
    billing_expiry_date,
    billing_cvv,
    billing_zip)

    VALUES (
    'Steven Moody',
    'smoody07@gmail.com',
    'asdasd',
    '3710 El Camino Real',
    'Apt 6919',
    'Santa Clara',
    'CA',
    '95051',
    '17028868834',
    '234234',
    '2022-01-01',
    '4564',
    '95060'
  )`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.log(`1 record inserted I guess`);

  })
  // on cb send res
  res.send("Purchase made")
  // TODO: construct mysql save and save to db.
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
