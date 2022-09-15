import React from 'react';
import Stack from 'react-bootstrap/Stack';
import $ from 'jquery';


class NewWordForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {wordValue: '', definitionValue: '' }
    // wordInput: from props
    // definitionInput: from props


    this.handleDefinitionChange = this.handleDefinitionChange.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDefinitionChange(e){
    // TODO: move this to index
    this.setState({definitionValue: e.target.value})
    this.props.handleDefinitionChange(e)
  }

  handleWordChange(e){
    // TODO: move this to index
    this.setState({wordValue: e.target.value})
    this.props.handleWordChange(e)
  }

  handleSubmit(e){
    this.props.handleCreateOrUpdateWord();
    event.preventDefault();
    // if(this.props.mode === 'Create') {
    //   console.log("Attempting to create new word from input")
    //   handleCreateWord();

    //   let payload = {
    //     headword: this.state.wordValue,
    //     definition: this.state.definitionValue
    //   }
    //   $.ajax({
    //     url: '/api/word',
    //     type: 'POST',
    //     contentType: "application/json",
    //     data: JSON.stringify(payload)
    //   })

    // } else if (this.props.mode === 'Edit') {
    //   console.log(`Attempting to update word with id: ${this.props.focusWordId}`)
    //   let payload = {
    //     _id: this.props.focusWordId
    //   }
    //   $.ajax({
    //     url: '/api/word',
    //     type: 'PUT',
    //     data: JSON.stringify(payload)
    //   })
    // }


  }


  render() {
    return (
      <div>
      <h4>{this.props.mode==='Edit' ? "Update word" : "Add a new word:"}</h4>

        <Stack direction="horizontal" gap={3}>

        <form onSubmit={this.handleSubmit}>
          <label>Word</label>
          <input type="text" value={this.props.wordInput} onChange={this.handleWordChange} />
          <label>Definition</label>
          <textarea type="text" rows="3" value={this.props.definitionInput} onChange={this.handleDefinitionChange} />
          <input
            type="submit"
            value="Submit"
            />
        </form>
        </Stack>
        </div>
      )
  }

}

export default NewWordForm;