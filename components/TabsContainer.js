import { useContext, useRef, useState } from "react";
import { RTLContext } from "../context/RTLContext";
import ControlTabsBtns from "./Features/ControlTabsBtns";
import CustomNavBtns from "./Features/CustomNavBtns";
import RtlSwitchBtn from "./Features/RtlSwitchBtn";
import TabsMeta from "./Features/TabsMeta";
import Tab from "./Tab";
import Tabs from "./Tabs";

const TabsContainer = () => {
  const [activeTab, setActiveTab] = useState(14);
  const onTabClick = (e, index) => {
    setActiveTab(index);
  };
  const { isRTL } = useContext(RTLContext);
  const navBtnsRef = useRef();

  const [isLeftArrowDisapled, setIsLeftArrowDisabled] = useState(false);
  const [isRightArrowDisapled, setIsRightArrowDisabled] = useState(false);
  const [selectedTabCoor, setSelectedTabCoor] = useState({});
  const [showTabsFeaturesObj, setShowTabsFeaturesObj] = useState({
    tabsAmount: 3,
  });

  const didReachEnd = (val) => setIsRightArrowDisabled(val);
  const didReachStart = (val) => setIsLeftArrowDisabled(val);
  const selectedTabCoordinates = (coors) => setSelectedTabCoor(coors);

  return (
    <div>
      <Tabs
        activeTab={activeTab}
        onTabClick={onTabClick}
        // the props returns a group of events to control the tabs such as onLeftBtnClick
        action={navBtnsRef}
        // sets if the direction of the page is RTL or not
        isRTL={isRTL}
        // sets if the tabs reached the end point of the tab container
        didReachEnd={didReachEnd}
        // sets if the tabs reached the start point container
        didReachStart={didReachStart}
        // sets how many tabs you want to scroll on every move
        // default 3 tabs on each navigation button click
        tabsScrollAmount={3}
        // sets the general animation duration when you click on the navigation buttons and when you click out the tabs view
        // default 300s
        animationDuration={300}
        // sets the animation of the scroll when you click on the navigation buttons
        // note : this will overwirte the animationDuration value
        // default 300s
        navBtnCLickAnimationDuration={300}
        // sets the animation of the scroll when you click on a tab that is out of the view
        // note : this will overwirte the animationDuration value
        // default 300s
        selectedAnimationDuration={300}
        // sets the right navitgation vutton icon
        // default feather arrow-right svg icon
        /* Setting the right navigation button icon. */
        /* Setting the right navigation button icon. */
        // rightBtnIcon={">"}
        // sets the left navitgation vutton icon
        // default feather arrow-left svg icon
        // leftBtnIcon={"<"}
        //hides the navigantion button
        // default false
        hideNavBtns={false}
        // hides the navigation buttons on mobile devices
        // default false
        hideNavBtnsOnMobile={false}
        // shows the scroll of the tabs
        // default false
        showTabsScroll={false}
        // sets the color of navigation buttons if you dont want to use your own
        // it just change the stroke color of the svg icon
        // default #fff
        // you cant use this option if you used your own btns

        NavBtnsIconColor={"rgba(0, 0, 0, 0.6)"}
        // gets the coordinate of the selected tab
        // returns object of the width and the scrollLeft of the selected tab
        // be carefulwhen you use state with this function it will be triggered on every scroll movement and when the app rerenders
        selectedTabCoordinates={selectedTabCoordinates}
      >
        {[...Array(20).keys()].map((item, index) => (
          <Tab key={item}>item {item}</Tab>
        ))}
      </Tabs>

      <CustomNavBtns
        navBtnsRef={navBtnsRef}
        isRightArrowDisapled={isRightArrowDisapled}
        isLeftArrowDisapled={isLeftArrowDisapled}
      />
      <TabsMeta
        activeTab={activeTab}
        isLeftArrowDisapled={isLeftArrowDisapled}
        isRightArrowDisapled={isRightArrowDisapled}
        selectedTabCoor={selectedTabCoor}
        isRTL={isRTL}
      />
      <ControlTabsBtns navBtnsRef={navBtnsRef} />
      <RtlSwitchBtn />
    </div>
  );
};

export default TabsContainer;
