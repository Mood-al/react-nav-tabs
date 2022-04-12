import styled from "@emotion/styled";
import React from "react";
import Title from "./Title";

const Navbar = () => {
  return (
    <div className="nav bg-primary mb-3">
      <div className="container">
        <Title
          title={
            <>
              {" "}
              <a href="https://www.npmjs.com/search?q=react-tabs-scrollable">
                React-tabs-scrollable
              </a>{" "}
            </>
          }
          className="text-light"
        />
      </div>
    </div>
  );
};

export default Navbar;
