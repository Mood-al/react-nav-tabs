import styled from "@emotion/styled";
import React from "react";
import { Tab, Tabs } from "react-tabs-scrollable";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Title from "../Title";

const MuiDemo = ({ title }) => {
  const [activeTab, setActiveTab] = React.useState(1);

  // define a onClick function to bind the value on tab click
  const onTabClick = (e, index) => {
    console.log(e);
    setActiveTab(index);
  };
  return (
    <>
      <Title className="display-6" title={title} />
      <StyledMuiDemo className="p-2 shadow-sm">
        <Tabs
          activeTab={activeTab}
          leftBtnIcon={<FiChevronLeft size={"1.5em"} />}
          rightBtnIcon={<FiChevronRight size={"1.5em"} />}
          onTabClick={onTabClick}
        >
          {/* generating an array to loop through it  */}
          {[...Array(20).keys()].map((item) => (
            <Tab key={item}>Tab {item}</Tab>
          ))}
        </Tabs>
      </StyledMuiDemo>
      <iframe
        src="https://codesandbox.io/embed/mui-like-react-tabs-scrollable-example-e7jccy?fontsize=14&hidenavigation=1&theme=dark"
        style={{
          width: "100%",
          height: "500px",
          border: 0,
          borderRadius: "4px",
          overflow: "hidden",
        }}
        className="my-4"
        title="mui like react tabs scrollable example"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </>
  );
};

export default MuiDemo;
const StyledMuiDemo = styled.div`
  .rts___tabs {
    padding: 0;
  }
  .rts___tab {
    margin: 0;
    position: relative;
  }
  .rts___nav___btn svg {
    max-width: unset;
  }

  .rts___btn {
    border-radius: unset;
    border: none;
  }

  .rts___tab::after {
    content: "";
    margin: auto;
    height: 3px;
    background: transparent;
    transition: width 0.5s ease, background-color 0.5s ease;
    width: 0;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .rts___tab___selected {
    color: #000;
    position: relative;
    width: 100%;
    background: transparent;
    box-shadow: none;
  }
  .rts___tab___selected::after {
    background: var(--rts-primary-color);

    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
  }
  .rts___nav___btn:hover {
    background-color: unset;
  }
  .rts___nav___btn:hover > svg {
    stroke: rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 991.98px) {
    .rts___tabs___container {
      padding: 0;
    }
  }
  @media (max-width: 767.98px) {
    .rts___tab {
      padding: 5px;
    }
  }
`;
