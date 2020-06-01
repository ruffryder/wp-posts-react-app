import React from "react";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>
        &copy;
        {currentYear}
        {" "}
        The corner blog. All rights reserved
      </p>
      <div>
        Icons made by
        {" "}
        <a
          href="https://www.flaticon.com/free-icon/diagonal-arrows_2413708"
          title="iconixar"
        >
          iconixar
        </a>
        {" "}
        from
        {" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </footer>
  );
}
