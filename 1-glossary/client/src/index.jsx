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
      searchInput: '',
      wordInput: '',
      definitionInput: '',
      focusWordId: '',
      filterWords: []
    }
    this.loadSeedWords=this.loadSeedWords.bind(this);
    this.onEditClick=this.onEditClick.bind(this);
    this.onDeleteClick=this.onDeleteClick.bind(this);
    this.handleDefinitionChange=this.handleDefinitionChange.bind(this);
    this.handleWordChange=this.handleWordChange.bind(this);
    this.handleCreateOrUpdateWord=this.handleCreateOrUpdateWord.bind(this);
    this.handleSearchChange=this.handleSearchChange.bind(this);

  }

  handleSearchChange(q){
    console.log(`Change in search box. Value: ${q}`)
    this.setState({searchInput: q})
    q = q.toUpperCase();
    let filterWords = this.state.words.filter((word) => {
      let target = word.headword.toUpperCase();
      return target.includes(q)
    })
    this.setState({filterWords});

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
        this.setState({
          mode: 'Create',
          wordInput: '',
          definitionInput: '',
          focusWordId: ''

          })
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
          // expect new set of words
          let words=data.docs;
          this.setState({words});

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
  }

  componentDidMount() {
    $.get('/api/words')
    .then((data) => {
      if (!data) {
        this.setState({words});
      } else {
        console.log(`Data returned from server`);
        console.log(data.docs);
        let words = data.docs;
        this.setState({words});
      }
    })
  }


  render() {

    return (
      <div>
    <h1> Glossary app</h1>
    <Stack gap={3}>
    <SearchBar handleSearchChange={this.handleSearchChange} value={this.state.searchInput}/>
    <NewWordForm
      mode={this.state.mode}
      wordInput={this.state.wordInput}
      definitionInput={this.state.definitionInput}
      focusWordId={this.state.focusWordId}

      handleDefinitionChange={this.handleDefinitionChange}
      handleWordChange={this.handleWordChange}
      handleCreateOrUpdateWord={this.handleCreateOrUpdateWord}

      />
    <DefinitionList
      onDeleteClick={this.onDeleteClick}
      onEditClick={this.onEditClick}
      // words={this.state.words}
      words={this.state.filterWords.length > 0 ? this.state.filterWords : this.state.words}
      />
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
