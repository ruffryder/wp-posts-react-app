import React from "react";
import Logo from "../UI/Logo/Logo";
import "./Header.css";

function Header() {
  return (
    <header className="main-header">
      <Logo />
      <h1 className="main-header__title">The Corner Blog</h1>
    </header>
  );
}

export default Header;
