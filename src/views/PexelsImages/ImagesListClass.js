import { Component } from "react";
import { PexelsFetchObject } from "../../services/pexels";
let base_url = `https://api.pexels.com/v1/`;
let api_key = `563492ad6f9170000100000188f3b8d3cd1047e392f28560cf9684bd`;

const newPexelsFetchObject = new PexelsFetchObject(base_url, api_key);
console.log(newPexelsFetchObject);

export class ImagesList extends Component {
  state = {
    searchResults: [],
    status: "init",
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchValue !== this.props.searchValue ||
      prevProps.perPage !== this.props.perPage
    ) {
      console.log(`get fetch`);
      this.setState({ status: "pending" });
      newPexelsFetchObject.resetPage();
      newPexelsFetchObject.searchQuery = this.props.searchValue;
      newPexelsFetchObject.perPage = this.props.perPage;
      newPexelsFetchObject
        .searchPhotos()
        .then((searchResults) => {
          console.log(searchResults);
          this.setState({ searchResults, status: "success" });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ status: "error" });
        });
    }
  }

  handleClick = () => {
    newPexelsFetchObject.page = 1;
    console.log(newPexelsFetchObject.page);
    newPexelsFetchObject.searchPhotos().then((searchResults) => {
      console.log(searchResults);
      this.setState((prev) => ({
        searchResults: [...prev.searchResults, ...searchResults],
        status: "success",
      }));
    });
  };

  render() {
    if (this.state.status === "init") {
      return <h1>Helo, search something</h1>;
    }
    if (this.state.status === "pending") {
      return <h1>Loading</h1>;
    }
    if (this.state.status === "success") {
      return (
        <>
          <ul>
            {this.state.searchResults.map((el) => (
              <li key={el.id}>
                <img src={el.src.tiny} alt={el.photographer} />
              </li>
            ))}
          </ul>
          <button type="button" onClick={this.handleClick}>
            Load more
          </button>
        </>
      );
    }

    if (this.state.status === "error") {
      return <h1>Alarma!!!</h1>;
    }
  }
}
