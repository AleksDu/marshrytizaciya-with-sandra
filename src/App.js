import { lazy, Suspense } from "react";
import { Navigation } from "./Components/Navigation/Navigation";
import "./App.css";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
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
const ImageCard = lazy(() =>
  import(
    "./views/PexelsImages/ImageCard" /* webpackChangName:' Image Page'   */
  )
);
// import { SolidTitle } from './components/Titles/SolidTitle';
function App() {
  const history = useHistory();
  const location = useLocation();
  //   const [counter, setCounter] = useState(0);
  //   const [isOpen, setIsOpen] = useState(false);
  // === свои хуки
  // const [searchValue, setSearchValue] = useState("");

  // === свои хуки

  // - список

  // - список
  const GoToHome = () => {
    history.push(location?.state?.from?.location ?? "/");
  };
  return (
    <div className="App">
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route path="/pexels">
            <PexelsPage title="Main Title" />
          </Route>
          <Route exact path="/pexels/:imageId">
            <ImageCard title="Image title" />
          </Route>
          <Route exact path="/products" component={ProductsPage} />
          <Route>
            <button type="button" onClick={GoToHome}>
              Go To Home
            </button>
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
