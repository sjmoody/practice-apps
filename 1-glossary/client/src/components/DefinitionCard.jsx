import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';

// TODO: add buttons to edit or delete entry
// Buttons should map to functions that relay to server


class DefinitionCard extends React.Component {
  constructor(props){
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(){
    // use word._id to manage edits
    console.log(`clicked on edit for word ${this.props.word.headword} with id ${this.props.word._id}`);
  }

  handleDelete(){
    // use word._id to manage delete
    console.log(`clicked on delete for word ${this.props.word.headword} with id ${this.props.word._id}`);
    let _id = this.props.word._id;
    $.ajax({
      url: '/api/word',
      type: 'DELETE',
      contentType: "application/json",
      data: JSON.stringify({_id})
    })
  }

  render(){
    return (
      <Card style={{ width: '48rem'}}>
      <Card.Header>{this.props.word.headword}</Card.Header>
      <Card.Body>
      <Card.Text>
      {this.props.word.definition}
      </Card.Text>
      </Card.Body>
      <Card.Footer><Button onClick={this.handleEdit}>Edit</Button>  <Button onClick={this.handleDelete}>Delete</Button></Card.Footer>
    </Card>
    )
  }
}

export default DefinitionCard;