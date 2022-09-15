require("dotenv").config();
const express = require('express')
const app = express();
const port = 3000;
const db = require('./db.js')



app.use(express.static(__dirname + '/../client/dist'))

app.get('/api', (req, res) => {
  // res.send(`Hello from Express`)
  // let response = "no response yet"
  const promise = Promise.resolve(db.readAll())
  .then((data) => {
    if(!data) {throw(data)}
    console.log(`data returned to server: ${data}`);
    res.send(data);
    })
    .catch(err => {console.log(`Error getting data: ${err}`)})

  // res.send(response);
  // docs.then((data) => console.log(`data returned to server: ${data}`))
  // console.log("end of get function")
});


app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})