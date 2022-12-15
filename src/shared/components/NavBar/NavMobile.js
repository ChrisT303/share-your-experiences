import React from "react";
// import { ReactDOM } from "react-dom";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./NavMobile.css";

const NavMobile = (props) => {
  const content = (
    <CSSTransition in={props.show} timeout={200} callsNames="slide-in-left" mountOnEnter unmountOnExit>
      <aside className="nav-mobile" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );
  return createPortal(content, document.getElementById("mobile-hook"));
};

export default NavMobile;
