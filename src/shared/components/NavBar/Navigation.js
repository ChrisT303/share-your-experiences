import React from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import "./Navigation.css";

const Navigation = (props) => {
  return (
    <Header>
      <button className="main-navigation__menu-btn">
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <Link to='/'>
        Places Visited
        </Link>
        </h1>
      <nav>...</nav>
    </Header>
  );
};

export default Navigation;
