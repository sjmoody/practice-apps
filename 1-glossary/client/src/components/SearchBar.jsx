import React from 'react';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state={value: ''}
  }

  handleChange(event){
    this.setState({value: event.target.value});
    // TODO: filter list of definitions to match value. May need to rename key
  }

  render(){
    return (
      <div>
        <label>Search for a word</label>
        <input type="search" value={this.state.value} onChange={this.handleChange}></input>
      </div>
    )
  }

}

export default SearchBar