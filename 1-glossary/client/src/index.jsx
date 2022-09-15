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
// import db from '../../server/db.js'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      mode: 'Create'
    }
    this.loadSeedWords=this.loadSeedWords.bind(this);
    this.onEditClick=this.onEditClick.bind(this);
    this.onDeleteClick=this.onDeleteClick.bind(this);
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


  onEditClick(){
    console.log("Index says edit requested")
    this.setState({mode: 'Edit'})
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
    <NewWordForm />
    <DefinitionList onDeleteClick={this.onDeleteClick} onEditClick={this.onEditClick} words={this.state.words}/>
    <Button
      onClick={()=>console.log("click on this other button")}
    >Other

    </Button>
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
