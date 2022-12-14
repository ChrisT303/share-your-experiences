import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import NavLinks from "./NavLinks";
import NavMobile from "./NavMobile";
import Backdrop from "../UIElements/Backdrop";
import "./Navigation.css";

const Navigation = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const openMenu = () => {
        setMenuOpen(true);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    }

  return (
    <>
    {menuOpen && <Backdrop onClick={closeMenu}/>}
    {menuOpen && (
      <NavMobile>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </NavMobile> )}
      <Header>
        <button className="main-navigation__menu-btn" onClick={openMenu}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Places Visited</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </Header>
    </>
  );
};

export default Navigation;
