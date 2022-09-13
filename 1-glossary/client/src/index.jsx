import "./styles.css";
import React from 'react';
import ReactDOM from 'react-dom';
import NewWordForm from './components/NewWordForm.jsx'
import SearchBar from './components/SearchBar.jsx'
import DefinitionList from './components/DefinitionList.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [
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
      ]
    }
  }

  render() {

    return (
      <div>
    <h1> Glossary app</h1>
    <SearchBar />
    <NewWordForm />
    <DefinitionList words={this.state.words}/>
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
