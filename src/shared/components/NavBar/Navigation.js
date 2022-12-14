import React from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import Links from './Links';
import NavMobile from "./NavMobile";
import "./Navigation.css";

const Navigation = (props) => {
  return (
    <>
    <NavMobile>
        <nav className="main-navigation__drawer-nav">
        <Links/>
        </nav>
    </NavMobile>
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
      <nav className="main-navigation__header-nav">
       <Links/>
      </nav>
    </Header>
    </>
  );
};

export default Navigation;
