import styled from "@emotion/styled";
import React from "react";
import { Tab, Tabs } from "react-tabs-scrollable";
import Title from "../Title";

const RcTabsDemo = ({ title }) => {
  const [activeTab, setActiveTab] = React.useState(1);

  // define a onClick function to bind the value on tab click
  const onTabClick = (e, index) => {
    console.log(e);
    setActiveTab(index);
  };
  return (
    <StyledRcTabs>
      <Title className="display-6" title={title} />

      <StyledRcTabs className="p-2 shadow-sm d-flex">
        <Tabs
          activeTab={activeTab}
          onTabClick={onTabClick}
          hideNavBtns
          tabsContainerClassName="overflow-auto"
        >
          {/* generating an array to loop through it  */}
          {[...Array(20).keys()].map((item) => (
            <Tab key={item}>Tab {item}</Tab>
          ))}
        </Tabs>

        <select
          name="ss"
          value={activeTab}
          onChange={(val) => setActiveTab(+val.target.value)}
        >
          {[...Array(20).keys()].map((item) => (
            <option value={item} key={item}>
              Tab {item}
            </option>
          ))}
        </select>
      </StyledRcTabs>
      <iframe
        src="https://codesandbox.io/embed/react-tabs-scrollable-rc-tabs-like-example-lrbt2j?fontsize=14&hidenavigation=1&theme=dark"
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
    </StyledRcTabs>
  );
};

export default RcTabsDemo;
const StyledRcTabs = styled.div``;
