import React from "react";
// import { ReactDOM } from "react-dom";
import { createPortal } from "react-dom";

import "./NavMobile.css";

const NavMobile = (props) => {
  const content = <aside className="nav-mobile">{props.children}</aside>;
  return createPortal(
    content,
    document.getElementById("mobile-hook")
  );
};

export default NavMobile;
