import "./App.scss";
import { Component } from "react";
import { Form } from "./Components/Forms/Form";
import { ProductList } from "./Components/Products/ProductList";
import { Modal } from "./Components/Modal/Modal";
import { ImagesList } from "./views/PexelsImages/ImagesListClass";
import { SearchForm } from "./views/PexelsImages/SearchForm";

// console.dir(axios)
// import { DeleteButton } from './components/Widgets/RemoveItem';
// import { Counter } from './components/Counter/Counter';

// let searchQuery = "banana";
// let searchPage = 1;
// let searchPerPage = 5;
// let endPoint = 'search';
// let params = `?query=${searchQuery}&page=${searchPage}&per_page=${searchPerPage }`;
// let url = endPoint + params;

// eslint-disable-next-line
const text = {
  title: "title-1",
  content: "content-1",
  backBtn: "go back",
  deleteBtn: "delete",
};

class App extends Component {
  state = {
    counter: 0,
    isOpen: false,
    showModal: false,
    allProducts: [],
    searchValue: "",
    perPage: 5,
  };

  componentDidMount() {
    console.log("MOUNT");
    const localProducts = localStorage.getItem("products");
    const parseProducts = JSON.parse(localProducts);
    if (parseProducts) {
      this.setState({ allProducts: parseProducts });
    }

    this.setState({ allProducts: parseProducts });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("UPDATE");
    // если изменилось значение поля стейта prevState.prop
    // то будем переписывато локал сторадж
    if (prevState.allProducts !== this.state.allProducts) {
      localStorage.setItem("products", JSON.stringify(this.state.allProducts));
    }

    // if (prevState.searchValue !== this.state.searchValue) {
    //   console.log('dd')
    //   }
  }

  componentWillUnmount() {
    console.log("UNMOUNT");
  }

  addNewProduct = (obj) =>
    this.setState((prevState) => ({
      allProducts: [...prevState.allProducts, obj],
    }));

  deleteProduct = (id) =>
    this.setState((prev) => ({
      allProducts: prev.allProducts.filter((prod) => prod.id !== id),
    }));

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  // handleDecrement = () => {
  //   // просто перепишем текущий стейт
  //   // this.setState({
  //   //   counter: this.state.counter - 1,
  //   // })
  //   // если нужно отталкиваться от предыдущего значения
  //   // this.setState((prevState) => {
  //   //   return {
  //   //     counter: prevState.counter - 1,
  //   //   }
  //   // })
  //   // или короче
  //   if (this.state.counter > 0) {
  //     this.setState(prevState => ({
  //       counter: prevState.counter - 1,
  //     }));
  //   }
  // };
  // handleIncrement = () => {
  //   this.setState(prevState => ({
  //     counter: prevState.counter + 1,
  //   }));
  // };

  // Module 3 Lesson 3

  getSearchValues = (searchValue, perPage) =>
    this.setState({ searchValue, perPage });

  render() {
    // console.log("RENDER METHOD");
    // console.log("state:", this.state.title, this.state.desc);
    const { searchValue, perPage, allProducts } = this.state;
    console.log(searchValue, perPage);
    return (
      <div className="App">
        <SearchForm getSearchValues={this.getSearchValues} />
        <ImagesList searchValue={searchValue} perPage={perPage} />

        {this.state.showModal && (
          <Modal toggleModal={this.toggleModal}>
            <Form addNewProduct={this.addNewProduct} />
          </Modal>
        )}
        <h1>FE-35 Product</h1>
        <button type="button" onClick={this.toggleModal}>
          Add product
        </button>
        <ProductList
          products={allProducts}
          onDeleteProduct={this.deleteProduct}
        />
      </div>
    );
  }
}
export default App;

// const { counter, isOpen } = this.state;
// const { handleDecrement, handleIncrement } = this;
// {/* <DeleteButton isOpen={!isOpen} text={text} />
// <DeleteButton isOpen={isOpen} /> */}
// {/* <Counter
//   counter={counter}
//   handleDecrement={handleDecrement}
//   handleIncrement={handleIncrement}
// /> */}

// click => onClick
// submit => onSubmit
