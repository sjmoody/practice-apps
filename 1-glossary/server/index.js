require("dotenv").config();
const express = require('express')
const app = express();
const port = 3000;
const db = require('./db.js')



app.use(express.static(__dirname + '/../client/dist'))

app.get('/api', (req, res) => {
  res.send(`Hello from Express`)
  let docs = new Promise(db.readAll)
  // let docs = db.readAll();
  docs.then(data => console.log(`data returned to server: ${data}`))
  console.log("end of get function")
});


app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})