import React from "react";
import PersonalLogo from "./PersonalLogo";

const Footer = () => {
  return (
    <div className="bg-primary text-center d-flex justify-content-center align-items-center py-2 text-light">
      Made with ❤ By <PersonalLogo />{" "}
    </div>
  );
};

export default Footer;
