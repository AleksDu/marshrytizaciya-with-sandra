import { lazy, Suspense } from "react";
import { Navigation } from "./Components/Navigation/Navigation";
import "./App.css";
import { useHistory, useLocation } from "react-router";
import { Route, Switch } from "react-router-dom";
import { Loader } from "./Components/Loader/Loader";
import { routes } from "./route";

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
  const backToHome = () => {
    history.push(location?.state?.from?.location ?? "/");
  };
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        {" "}
        <Suspense fallback={<Loader />}>
          <Switch>
            {routes.map((route) => {
              console.log(route);
              const { path, exact, component: Component } = route;
              return (
                <Route path={path} exact={exact}>
                  <Component />
                </Route>
              );
            })}
            {/* <Route exact path="/" component={HomePage} />
            <Route exact path="/pexels">
              <PexelsPage title="Main Title" />
            </Route>
            <Route path="/pexels/:imageId">
              <ImageCard />
            </Route>
            <Route exact path="/products" component={ProductsPage} /> */}
            <Route>
              <p>Page not found! please back to Home</p>
              <button type="button" onClick={backToHome}>
                back to Home
              </button>
            </Route>
          </Switch>
        </Suspense>
      </main>
      <footer>
        <p>&copy; FE-35 all rights reserved 2021</p>
      </footer>
    </>
  );
}

export default App;
