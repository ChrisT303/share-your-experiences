import React from "react";

import "./PlaceInput.css";

const PlaceInput = (props) => {
  const elementToggle =
    props.elementToggle === "input" ? (
      <input id={props.id} type={props.type} placeholder={props.placeholder} />
    ) : (
      <textarea id={props.id} rows={props.rows || 3 } />
    );

  return (
    <div className={`form-control`}>
      <label htmlFor={props.id}>{props.label}</label>
      {elementToggle}
    </div>
  );
};

export default PlaceInput;
