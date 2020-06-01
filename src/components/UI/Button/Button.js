import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

export default function Button({ clickHandler, textValue }) {
  return (
    <button type="button" onClick={clickHandler} className="btn btn-primary">
      {textValue}
    </button>
  );
}

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  textValue: PropTypes.string.isRequired,
};
