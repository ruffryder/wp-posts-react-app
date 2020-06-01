import React from "react";
import logo from "../../../assets/img/arrow.svg";
import "./Logo.css";

export default function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="The corner blog" />
    </div>
  );
}
