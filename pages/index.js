import { useContext, useRef, useState } from "react";

import CustomTabs from "../components/Tabs/CutomTabs";
import { RTLContext } from "../context/RTLContext";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [activeTab, setActiveTab] = useState(2);
  const onTabClick = (e, index) => {
    setActiveTab(index);
  };
  const { isRTL } = useContext(RTLContext);
  const ref = useRef();
  console.log(ref);
  const [isLeftArrowDisapled, setIsLeftArrowDisabled] = useState(false);
  const [isRightArrowDisapled, setIsRightArrowDisabled] = useState(false);

  const didReachEnd = (val) => setIsRightArrowDisabled(val);
  const didReachStart = (val) => setIsLeftArrowDisabled(val);
  return (
    <div className="">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae nemo
      voluptate dolor sit voluptatem optio repellendus, quos reprehenderit
      aliquid molestias saepe officia aspernatur adipisci? Fuga cumque esse
      deleniti nemo molestias.
      {/* <MatTabs /> */}
      <CustomTabs
        activeTab={activeTab}
        onTabClick={onTabClick}
        // the props returns a group of events to control the tabs such as onLeftBtnClick
        action={ref}
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
        // rightBtnIcon={">"}
        // sets the left navitgation vutton icon
        // default feather arrow-left svg icon
        // leftBtnIcon={"<"}
        //hides the navigantion button
        // default false
        hideNavBtns={false}
        // hides the navigation buttons on mobile devices
        // default false
        hideNavBtnsOnMobile={true}
        // shows the scroll of the tabs
        // default false
        showTabsScroll={false}
        // sets the color of navigation buttons if you dont want to use your own
        // it just change the stroke color of the svg icon
        // default #fff
        // you cant use this option if you used your own btns

        NavBtnsIconColor={"rgba(0, 0, 0, 0.6)"}
      >
        {[...Array(20).keys()].map((item, index) => (
          <button
            key={item}
            onClick={(e) => onNativeTabClick(e, index)}
            ref={(el) => (tabRef.current[index] = el)}
            className={`tab  ${
              activeTab === index ? "rn___tab___selected bg-primary" : ""
            }`}
          >
            item {item}
          </button>
        ))}
      </CustomTabs>
      <button
        disabled={isLeftArrowDisapled}
        onClick={() => ref.current.onLeftBtnClick()}
      >
        left
      </button>
      <button
        disabled={isRightArrowDisapled}
        onClick={() => ref.current.onRightBtnClick()}
      >
        right
      </button>
    </div>
  );
}
