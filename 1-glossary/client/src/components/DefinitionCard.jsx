import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';

class DefinitionCard extends React.Component {
  constructor(props){
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(e){
    console.log(`clicked on edit for word ${this.props.word.headword} with id ${this.props.word._id}`);
    let _id=(this.props.word._id)
    this.props.onEditClick(_id);
  }

  handleDelete(e){
    console.log(this.props.word._id)
    let _id=(this.props.word._id)
    this.props.onDeleteClick(_id);
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
      <Card.Footer>
        <Button
          onClick={this.handleEdit}>
            Edit
        </Button>
        <Button
          onClick={this.handleDelete}>
            Delete
        </Button>
        </Card.Footer>
    </Card>
    )
  }
}

export default DefinitionCard;