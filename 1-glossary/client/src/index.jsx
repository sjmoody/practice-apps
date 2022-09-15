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
      words: []
    }
  }

  componentDidMount(){
    //TODO: get words from db
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
    $.get('/api')
    // .then((response) => response.json())
    .then((data) => console.log(`Data returned from server: ${data}`));

    this.setState({words})
  }
  render() {

    return (
      <div>
    <h1> Glossary app</h1>
    <Stack gap={3}>
    <SearchBar />
    <NewWordForm />
    <DefinitionList words={this.state.words}/>
    </Stack>
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
