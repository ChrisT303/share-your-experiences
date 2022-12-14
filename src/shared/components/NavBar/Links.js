import React from "react";
import { NavLink } from "react-router-dom";

import "./Links.css";

const Links = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Active Members
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/places">Places Visited</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">Add New Place</NavLink>
      </li>
      <li>
        <NavLink to="/auth">Validate</NavLink>
      </li>
    </ul>
  );
};

export default Links;
