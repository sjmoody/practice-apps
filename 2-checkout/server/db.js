const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });



db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      `CREATE TABLE IF NOT EXISTS responses (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_name varchar(255),
        user_email varchar(255),
        user_session varchar(255),
        user_password varchar(255),
        shipping_address_line_1 varchar(255),
        shipping_address_line_2 varchar(255),
        shipping_city varchar(255),
        shipping_state varchar(255),
        shipping_zip varchar(255),
        shipping_phone varchar(16),
        billing_cc varchar(20),
        billing_expiry_date DATE,
        billing_cvv varchar(5),
        billing_zip varchar(9)
        )`
    )
  )
  .catch((err) => console.log(err));

module.exports = db;

