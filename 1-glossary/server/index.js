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
  .then((res) => {
    console.log(`Result of attempt to update doc: ${res}`)
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
  .then((res) => {
    console.log(`Result of attempt to delete: ${res}`)
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

app.get(`/api/word`, (req, res) => {
    // if query use this query
    let q = req.query.q;
    console.log(`searching for values matching query ${q}`);
    const promise = Promise.resolve(db.findWhere(q))
    .then((data) => {
      console.log(`data returned to server: ${data}`);
      res.send(data);
    })
    .catch(err => {console.log(`Error searching for ${q}: ${err}`)})

})

app.get('/api/words', (req, res) => {
    console.log("no query received")
    const promise = Promise.resolve(db.readAll())
    .then((data) => {
      if(!data) {throw(data)}
      console.log(`data returned to server: ${data}`);
      res.send(data);
      })
      .catch(err => {console.log(`Error getting data: ${err}`)})
  });



app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})