import { Component } from "react";

export class SearchForm extends Component {
  state = {
    searchValue: "",
    perPage: 5,
  };

  handleSearchChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("before fetch", this.state.searchValue, this.state.perPage);
    //  this.setState = { searchValue: '' }
    this.props.getSearchValues(this.state.searchValue, this.state.perPage);
    this.setState({ searchValue: "", perPage: 5 });
  };

  render() {
    return (
      <form onSubmit={this.handleSearchSubmit}>
        <input
          type="text"
          name="searchValue"
          onChange={this.handleSearchChange}
          value={this.state.searchValue}
          placeholder="Value"
        />
        <input
          type="number"
          name="perPage"
          onChange={this.handleSearchChange}
          value={this.state.perPage}
          placeholder="How many results"
        />
        <button type="submit">search</button>
      </form>
    );
  }
}
