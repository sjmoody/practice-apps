require("dotenv").config();
const express = require('express')
const app = express();
const port = 3000;
const db = require('./db.js')


app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'))

app.post('/api/word', (req, res) => {
  console.log("post request made to server to create a new word. Payload:")
  console.log(`Req body:`);
  console.log(req.body);
  // query database to create word with req.body values
  let doc = {
    headword: req.body.headword,
    definition: req.body.definition
  }
  db.addOne(doc);
})

app.put('/api/word', (req, res) => {
  console.log(`Attempt to update word with id ${req.body._id}`);
  console.log(`New word: ${req.body.headword}`)
  console.log(`New definition: ${req.body.definition}`)
  let _id = req.body._id;
  let newDoc = {
    headword: req.body.headword,
    definition: req.body.definition
  }
  const promise = Promise.resolve(db.editOne(_id, newDoc))
  .then(() => {
    console.log("success updating doc. Fetching all results")
    return db.readAll()
  })
  .then((data) => {
    console.log("new data from db")
    console.log(data);
    res.send(data);
  })


})

app.delete('/api/word', (req, res) => {
  console.log("attempt delete of word:");
  console.log(req.body);
  let doc = {
    headword: req.body.headword,
    definition: req.body.definition,
    _id: req.body._id
  }
  const promise = Promise.resolve(db.removeOne(doc))
  .then(() => {
    console.log("success deleting doc. Fetching all results")
    return db.readAll()
  })
  .then((data) => {
    console.log("new data from db")
    console.log(data);
    res.send(data);
  })
})

app.get('/api/dataloader', (req, res) => {
  console.log("request to server to load data");
  const promise = Promise.resolve(db.dataLoad())
    .then((data) => {
      if(!data) {
        throw(data);
      }
      console.log("success loading data")
      console.log(data)
      res.send(data);
    })
    .catch(err => {console.log(`Error loading new data: ${err}`)})
})

app.get('/api/words', (req, res) => {
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