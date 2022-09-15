import "./styles.css";
import React from 'react';
import ReactDOM from 'react-dom';
import NewWordForm from './components/NewWordForm.jsx'
import SearchBar from './components/SearchBar.jsx'
import DefinitionList from './components/DefinitionList.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import $ from 'jquery'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      mode: 'Create'
    }
  }

  onDeleteClick(_id){
    let seedWords = [
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
    // console.log("Index says delete requested")
    console.log(`clicked on delete for word with id ${_id}`);
    $.ajax({
      url: '/api/word',
      type: 'DELETE',
      contentType: "application/json",
      data: JSON.stringify({_id}),
      success: function(data) {
        console.log("succeeded to delete");
        if(!data) {
          words = seedWords;
          this.setState({words})
        } else {
          words = data.docs;
          this.setState({words})
        }
      }
    })
  }

  onEditClick(){
    console.log("Index says edit requested")
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
    </Stack>
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
