import React from "react";

const RightArrow = ({ rightBtnIcon, ...props }) => {
  return <button {...props}>{rightBtnIcon}</button>;
};

export default RightArrow;
