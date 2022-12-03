import React from "react";
import MuiDemo from "../components/Demos/MuiDemo";
import NavDemo from "../components/Demos/NavDemo";
import ResturantMenuDemo from "../components/Demos/ResturantMenuDemo";
import SimpleDemo from "../components/Demos/SimpleDemo";
import { NextSeo } from "next-seo";
import RcTabsDemo from "../components/Demos/RcTabsDemo";
import WithTabScreens from "../components/Demos/WithTabScreens";
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
        <WithTabScreens title="With tabs screen" scrollToId="withTabScreens" />
        <MuiDemo title="Mui like tabs" />
        <NavDemo title={"Route navigation tabs (Next Js)"} />
        <ResturantMenuDemo title="Resturant menu demo" />
        <RcTabsDemo title="Rc-tabs demo" />
      </div>{" "}
      {children}
    </div>
  );
};

export default DemosLayout;
