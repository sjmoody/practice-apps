import React from 'react'
import DefinitionCard from './DefinitionCard.jsx';

function DefinitionList(props) {
  const words = props.words;
  console.log(words);
  return (
    <div>
    <h3>Glossary so far:</h3>
    <h3>There are {words.length} words to show</h3>
    <div>
      {words.map((word) =>
      <DefinitionCard onEditClick={props.onEditClick} onDeleteClick={props.onDeleteClick} key={word._id.toString()} word={word} />
      )}
    </div>
    </div>
  );
}


export default DefinitionList;