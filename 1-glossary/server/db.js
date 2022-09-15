require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/glossary');

const wordSchema = new mongoose.Schema({
  headword: String,
  definition: String
});

const Word = mongoose.model('Word', wordSchema);

const dataLoad = async () => {
  console.log("db request to load many docs")
  // TODO: delete all and then load data from static
  await Word.deleteMany({});
  await Word.insertMany([
      {
        headword: "Java",
        definition: "delicious coffee"
      },{
        headword: "Jest",
        definition: "a way to joke about testing"
      },{
        headword: "Apple",
        definition: "An often overpriced fruit"
      },
      {
        headword: "Google",
        definition: "A very large number of killed startups"
      }
    ]
  )
  const query = Word.find({})
  const docs = await query;
  return {docs};

}

// const promise = Promise.resolve(db.findWhere(q))
const findWhere = async(q) => {
  console.log(`in db searching for ${q}`)
  const query = Word.find({headword: q})
    // { "headword": {"regex": q, "options": "i"}});
  const docs = await query;
  return {docs};
}


const readAll = async () => {
  // This function will be called in server to get all documents
  console.log("Read all requested from mongoose");
  const query = Word.find({})
  const docs = await query;
  console.log(`docs returned`)
  return {docs};
}

const addOne = (doc) => {
  // given a doc for a new word, add it to db and save
  console.log(`Attempting to add doc to db: ${doc.headword}`)
  Word.create({headword: doc.headword, definition: doc.definition}, function(err, res) {
    if (err) return handleError(err);
  })

}

const editOne = async (_id, newDoc) => {
  // given a doc, find it in db and update it
  console.log(`Attempting to update doc in db: ${_id}`)
  console.log(`New information for word: ${newDoc.headword} with definition: ${newDoc.definition}`)
  const res = await Word.replaceOne({_id: _id}, newDoc)
  console.log(`Count of modified: ${res.nModified}`);
  return res;

}

const removeOne = async (_id) => {
  // given a doc, remove it from db
  // deleteOne accepts a cb
  console.log(`Attempting to remove doc from db: ${_id}`)
  const res = await Word.deleteOne({_id})
  return res;
}

module.exports.readAll = readAll;
module.exports.addOne = addOne;
module.exports.editOne = editOne;
module.exports.removeOne = removeOne;
module.exports.dataLoad = dataLoad;
module.exports.findWhere = findWhere;