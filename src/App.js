import { lazy, Suspense } from "react";
import { Navigation } from "./Components/Navigation/Navigation";
import "./App.css";
import { NavLink, Route, Switch } from "react-router-dom";
import { Loader } from "./Components/Loader/Loader";
const HomePage = lazy(() =>
  import("./pages/Home/Home" /* webpackChangName: 'Home Page'   */)
);
const PexelsPage = lazy(() =>
  import("./pages/Pexels/Pexels" /* webpackChangName: 'Pexels Page '  */)
);
const ProductsPage = lazy(() =>
  import("./pages/Products/Products" /* webpackChangName:' Products Page'   */)
);
// import { SolidTitle } from './components/Titles/SolidTitle';
function App() {
  //   const [counter, setCounter] = useState(0);
  //   const [isOpen, setIsOpen] = useState(false);
  // === свои хуки
  // const [searchValue, setSearchValue] = useState("");

  // === свои хуки

  // - список

  // - список

  return (
    <div className="App">
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route path="/pexels">
            <PexelsPage title="Main Title" />
          </Route>
          <Route path="/products" component={ProductsPage} />
          <Route>
            <p>Page not found </p>
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
