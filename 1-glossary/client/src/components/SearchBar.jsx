import React from 'react';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.handleChange=this.handleChange.bind(this);
  }


  handleChange(event){
    console.log(`new value of search: ${event.target.value}`)
    this.props.handleSearchChange(event.target.value);
    // this.setState({value: event.target.value});
    // TODO: filter list of definitions to match value. May need to rename key
  }

  render(){
    return (
      <div>
        <label>Search for a word</label>
        <input type="search"
        value={this.props.value}
        onChange={this.handleChange}></input>
      </div>
    )
  }

}

export default SearchBar