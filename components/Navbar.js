import styled from "@emotion/styled";
import React from "react";
import Title from "./Title";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="nav bg-primary">
      <div className="container">
        <nav className="nav text-white d-flex align-items-center justify-content-between">
          <a
            className="fs-2 "
            href="https://www.npmjs.com/search?q=react-tabs-scrollable"
          >
            React-tabs-scrollable
          </a>
          <Link href="/demos">
            <a>Demos</a>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
