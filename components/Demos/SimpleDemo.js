import React from "react";
import { Tab, Tabs } from "react-tabs-scrollable";
import Title from "../Title";

const SimpleDemo = ({ title }) => {
  const [activeTab, setActiveTab] = React.useState(1);

  // define a onClick function to bind the value on tab click
  const onTabClick = (e, index) => {
    console.log(e);
    setActiveTab(index);
  };
  return (
    <div>
      <Title className="display-6" title={title} />

      <div className="p-2 shadow-sm">
        <Tabs activeTab={activeTab} onTabClick={onTabClick}>
          {/* generating an array to loop through it  */}
          {[...Array(20).keys()].map((item) => (
            <Tab key={item}>Tab {item}</Tab>
          ))}
        </Tabs>
      </div>
      <iframe
        src="https://codesandbox.io/embed/react-tabs-scrollable-demo-s471xv?fontsize=14&hidenavigation=1&theme=dark"
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
    </div>
  );
};

export default SimpleDemo;
