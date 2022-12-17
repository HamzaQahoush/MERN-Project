import React from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
function NavLinks(props) {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          all users
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/places"> My places</NavLink>
      </li>
      <li>
        <NavLink to="/places/new"> add place</NavLink>
      </li>

      <li>
        <NavLink to="/auth">login</NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
