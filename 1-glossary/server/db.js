require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/glossary');

const wordSchema = new mongoose.Schema({
  headword: String,
  definition: String
});

const Word = mongoose.model('Word', wordSchema);


const readAll = async () => {
  // This function will be called in server to get all documents
  console.log("Read all requested from mongoose");
  Word.find({}, function(err, docs) {
    if(err) {
      console.log(`Error: ${err}`)
    } else {
      console.log(`Success. Docs: ${docs}`);
      return docs;
    }
  })
}

const addOne = (doc) => {
  // given a doc for a new word, add it to db and save
  console.log(`Attempting to add doc to db: ${doc}`)
  Word.create({headword: doc.headword, definition: doc.definition}, function(err, res) {
    if (err) return handleError(err);
  })

}

const editOne = (doc) => {
  // given a doc, find it in db and update it
  console.log(`Attempting to update doc in db: ${doc}`)
  Word.updateOne({doc}, (err, res) => {
    if(err){
      console.log(`error: ${err}`);
    } else{
      console.log(res);
    }
  })

}

const removeOne = (doc) => {
  // given a doc, remove it from db
  // deleteOne accepts a cb
  console.log(`Attempting to remove doc from db: ${doc}`)
  Word.deleteOne({doc}, function(err) {
    if(err) console.log(`error: ${err}`);
  })
}

module.exports.readAll = readAll;
module.exports.addOne = addOne;
module.exports.editOne = editOne;
module.exports.removeOne = removeOne;
