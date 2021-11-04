import axios from "axios";

// OOP
export class PexelsFetchObject {
  constructor(base_url, api_key) {
    this.base_url = base_url;
    this.api_key = api_key;
    this._searchQuery = "";
    this._page = 1;
    this._perPage = 5;
    this.endPoint = "";
  }

  get searchQuery() {
    return this._searchQuery;
  }

  set searchQuery(value) {
    return (this._searchQuery = value);
  }

  get page() {
    return this._page;
  }

  set page(value) {
    return (this._page += value);
  }
  resetPage() {
    return (this._page = 1);
    // ((this._perPage = 5));
  }
  get perPage() {
    return this._perPage;
  }

  set perPage(value) {
    return (this._perPage = value);
  }

  async searchPhotos() {
    axios.defaults.baseURL = this.base_url;
    axios.defaults.headers.common.Authorization = this.api_key;
    this.endPoint = "search";
    console.log(
      "searchQuery",
      this.searchQuery,
      "page",
      this.page,
      "perPage",
      this.perPage
    );
    let params = `?query=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}`;
    let url = this.endPoint + params;
    try {
      const result = await axios.get(url);
      const data = result.data.photos;
      return data;
    } catch (error) {
      return error.message;
    }
    // return axios
    //   .get(url)
    //   .then((result) => {
    //     // console.log(result)
    //     return result.data;
    //   })
    //   .then((data) => {
    //     // console.log(data)
    //     return data.photos;
    //   })

    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
}

// // // Declarative
// export function PexelsFetchFunc() {
//   let base_url = `https://api.pexels.com/v1/`;
//   let api_key = `563492ad6f9170000100000188f3b8d3cd1047e392f28560cf9684bd`;
//   axios.defaults.baseURL = base_url;
//   axios.defaults.headers.common.Authorization = api_key;

//   const searchPhotos = (searchQuery, searchPage, searchPerPage) => {
//     axios.defaults.baseURL = this.base_url;
//     axios.defaults.headers.common.Authorization = this.api_key;
//     let endPoint = "search";
//     let params = `?query=${searchQuery}&page=${searchPage}&per_page=${searchPerPage}`;
//     let url = endPoint + params;

//     axios
//       .get(url)
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// }
