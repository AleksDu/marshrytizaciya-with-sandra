import { lazy } from "react";
// DYNAMIC IMPORTS
const HomePage = lazy(() =>
  import("./pages/Home/Home" /* webpackChunkName: 'Home Page'*/)
);
const PexelsPage = lazy(() =>
  import("./pages/Pexels/Pexels" /* webpackChunkName: 'Pexels Page'*/)
);
const ProductsPage = lazy(() =>
  import("./pages/Products/Products" /* webpackChunkName: 'Products Page'*/)
);
const ImageCard = lazy(() =>
  import(
    "./views/PexelsImages/ImageCard" /* webpackChunkName: 'ImageCard Page'*/
  )
);
export const routes = [
  {
    name: "Home page",
    exact: true,
    path: "/",
    component: HomePage,
  },
  {
    name: "Pexels page",
    exact: true,
    path: "/pexels",
    component: PexelsPage,
  },
  {
    name: "Image Card page",
    exact: true,
    path: "/pexels/:imageId",
    component: ImageCard,
  },
  {
    name: "Products page",
    exact: true,
    path: "/products",
    component: ProductsPage,
  },
];
