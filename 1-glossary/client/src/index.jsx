import "./styles.css";
import React from 'react';
import ReactDOM from 'react-dom';
import NewWordForm from './components/NewWordForm.jsx'
import SearchBar from './components/SearchBar.jsx'
import DefinitionList from './components/DefinitionList.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      mode: 'Create',
      wordInput: '',
      definitionInput: '',
      focusWordId: ''
    }
    this.loadSeedWords=this.loadSeedWords.bind(this);
    this.onEditClick=this.onEditClick.bind(this);
    this.onDeleteClick=this.onDeleteClick.bind(this);
    this.handleDefinitionChange=this.handleDefinitionChange.bind(this);
    this.handleWordChange=this.handleWordChange.bind(this);
    this.handleCreateOrUpdateWord=this.handleCreateOrUpdateWord.bind(this);
    // this.handleCreateWord=this.handleCreateWord.bind(this);
    // this.handleUpdateWord=this.handleUpdateWord.bind(this);
  }

  onDeleteClick(_id){
    console.log(`clicked on delete for word with id ${_id}`);
    $.ajax({
      url: '/api/word',
      type: 'DELETE',
      contentType: "application/json",
      data: JSON.stringify({_id})
    })
    .then((data) => {
      if(!data) {
        console.log(`Nothing from server`);
      } else {
        let words = data.docs;
        this.setState({words});
      }
    })
  }


  onEditClick(_id){
    console.log("Index says edit requested")
    this.setState({mode: 'Edit'})
    console.log(`attempt to update form state with word id ${_id}`)
    let targetWord = this.state.words.find(w => w._id === _id)
    if(targetWord) {
      this.setState({
        wordInput: targetWord.headword,
        definitionInput: targetWord.definition,
        focusWordId: _id
      })
    }

  }

  handleCreateOrUpdateWord(){
    console.log(`In index. State: ${this.state.mode} focusWordId: ${this.state.focusWordId} wordInput: ${this.state.wordInput} definition: ${this.state.definitionInput}`)
    if(this.state.mode==='Create'){
      let payload = {
        headword: this.state.wordInput,
        definition: this.state.definitionInput
      }
      $.ajax({
        url: '/api/word',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(payload)
      })
      .then((data) => {
        console.log("maybe created word how do I render")
      })
      } else if (this.state.mode==='Edit'){
          let payload = {
          _id: this.state.focusWordId,
          headword: this.state.wordInput,
          definition: this.state.definitionInput
        }
        console.log(`Index will attempt to update word with data ${payload}`);

        $.ajax({
          url: '/api/word',
          type: 'PUT',
          contentType: "application/json",
          data: JSON.stringify(payload)
        })
        .then((data) => {
          console.log("maybe updated word")
        })
      }

    }



  handleDefinitionChange(e){
    this.setState({definitionInput: e.target.value})
  }

  handleWordChange(e){
    this.setState({wordInput: e.target.value})
  }

  loadSeedWords(){
    console.log("Request to load seed words")
    $.get('/api/dataloader')
    .then((data) => {
      if (!data) {
        throw(data);
      }
      console.log(`Data returned from load request`);
      console.log(data.docs);
      let words = data.docs;
      this.setState({words});
    })

    // TODO: request dataLoad via the server
    // db.dataLoad();
    // console.log(`words to load: ${words}`)
  }

  componentDidMount() {
    let words = [
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
    ];
    $.get('/api/words')
    .then((data) => {
      if (!data) {
        this.setState({words});
      } else {
        console.log(`Data returned from server`);
        console.log(data.docs);
        words = data.docs;
        this.setState({words});
      }
    })
  }


  render() {

    return (
      <div>
    <h1> Glossary app</h1>
    <Stack gap={3}>
    <SearchBar />
    <NewWordForm
      mode={this.state.mode}
      wordInput={this.state.wordInput}
      definitionInput={this.state.definitionInput}
      focusWordId={this.state.focusWordId}

      handleDefinitionChange={this.handleDefinitionChange}
      handleWordChange={this.handleWordChange}
      handleCreateOrUpdateWord={this.handleCreateOrUpdateWord}
      // handleUpdateWord={this.handleUpdateWord}
      // handleCreateWord={this.handleCreateWord}
      />
    <DefinitionList onDeleteClick={this.onDeleteClick} onEditClick={this.onEditClick} words={this.state.words}/>
    <Button
      onClick={this.loadSeedWords}
      >
      Load Words</Button>
    </Stack>
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
