import React from "react";
import { Tab, Tabs } from "react-tabs-scrollable";
import Title from "../Title";

const WithTabScreens = ({ title, scrollToId = "" }) => {
  const [activeTab, setActiveTab] = React.useState(1);

  // define a onClick function to bind the value on tab click
  const onTabClick = (e, index) => {
    setActiveTab(index);
  };
  const TabScreen = ({ activeTab, idx, ...props }) => {
    return (
      <div
        className="animate__animated animate__fadeInLeft"
        role="tabpanel"
        {...props}
      >
        {activeTab === idx && <div className="mx-5">Tab screen {idx}</div>}
      </div>
    );
  };
  return (
    <>
      <Title
        className="display-6"
        title={
          <>
            <a href={`#${scrollToId}`}>#</a>
            {title}
          </>
        }
      />

      <div className="p-2 shadow-sm">
        <Tabs activeTab={activeTab} onTabClick={onTabClick}>
          {/* generating an array to loop through it  */}
          {[...Array(20).keys()].map((item) => (
            <Tab className="rounded" key={item}>
              Page {item}
            </Tab>
          ))}
        </Tabs>
        {[...Array(20).keys()].map((item) => (
          <TabScreen activeTab={activeTab} idx={item} key={item}>
            Page {item}
          </TabScreen>
        ))}
      </div>
      <iframe
        src="https://codesandbox.io/embed/react-tabs-scrollable-example-with-tabs-screens-zu3v4t?fontsize=14&hidenavigation=1&theme=dark"
        style={{
          width: "100%",
          height: "500px",
          border: 0,
          borderRadius: "4px",
          overflow: "hidden",
        }}
        className="my-4"
        title="react tabs scrollable example with tabs screens"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </>
  );
};

export default WithTabScreens;
