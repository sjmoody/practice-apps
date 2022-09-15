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

const editOne = (_id, newDoc) => {
  // given a doc, find it in db and update it
  console.log(`Attempting to update doc in db: ${_id}`)
  console.log(`New information for word: ${newDoc}`)
  // Word.updateOne({doc}, (err, res) => {
  //   if(err){
  //     console.log(`error: ${err}`);
  //   } else{
  //     console.log(res);
  //   }
  // })

}

const removeOne = (_id) => {
  // given a doc, remove it from db
  // deleteOne accepts a cb
  console.log(`Attempting to remove doc from db: ${_id}`)
  Word.deleteOne({_id}, function(err) {
    if(err) console.log(`error: ${err}`);
  })
}

module.exports.readAll = readAll;
module.exports.addOne = addOne;
module.exports.editOne = editOne;
module.exports.removeOne = removeOne;
