import React from "react";
import MuiDemo from "../components/Demos/MuiDemo";
import NavDemo from "../components/Demos/NavDemo";
import ResturantMenuDemo from "../components/Demos/ResturantMenuDemo";
import SimpleDemo from "../components/Demos/SimpleDemo";
import { NextSeo } from "next-seo";
const DemosLayout = ({ children }) => {
  return (
    <div className="container">
      {" "}
      <NextSeo
        title="demos"
        description="React tabs scrollable demos and examples"
      />
      <div>
        <SimpleDemo title={"Simple tabs"} />
        <MuiDemo title="Mui like tabs" />
        <NavDemo title={"Route navigation tabs (Next Js)"} />
        <ResturantMenuDemo title="Resturant menu demo" />
      </div>{" "}
      {children}
    </div>
  );
};

export default DemosLayout;
