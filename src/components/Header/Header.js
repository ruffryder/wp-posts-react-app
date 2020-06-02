import React from "react";
import { Link } from "react-router-dom";
import Logo from "../UI/Logo/Logo";
import "./Header.css";

function Header() {
  return (
    <Link to="/">
      <header className="main-header">
        <Logo />
        <h1 className="main-header__title">The Corner Blog</h1>
      </header>
    </Link>
  );
}

export default Header;
