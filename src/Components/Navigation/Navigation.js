import { NavLink } from "react-router-dom";
export function Navigation() {
  return (
    <nav>
      <li>
        <NavLink
          exact
          to="/"
          className="naVLink"
          activeClassName="activeNavLink"
        >
          Home
        </NavLink>
        <NavLink
          to="/pexels"
          className="naVLink"
          activeClassName="activeNavLink"
        >
          Pexels
        </NavLink>
        <NavLink
          to="/products"
          className="naVLink"
          activeClassName="activeNavLink"
        >
          Products
        </NavLink>
      </li>
    </nav>
  );
}
