import styled from "@emotion/styled";
import {
  detectScrollType,
  getNormalizedScrollLeft,
} from "normalize-scroll-left";
import { useCallback, useContext, useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { RTLContext } from "../../context/RTLContext";

const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  //   y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

const CutomTabs = () => {
  const tabsRef = useRef();
  const tabRef = useRef([]);
  const [isActive, setIsActive] = useState(4);
  const [pos, setPos] = useState(0);
  const posRef = useRef(0);
  const onRightBtnClick = () => {
    if (tabsRef.current.clientWidth < tabsRef.current.scrollWidth) {
      tabsRef.current.scrollLeft += tabRef.current[0].offsetWidth + 50;
    }
  };

  const { isRTL } = useContext(RTLContext);

  const onLeftBtnClick = () => {
    if (tabsRef.current.clientWidth < tabsRef.current.scrollWidth) {
      tabsRef.current.scrollLeft -= tabRef.current[0].offsetWidth + 50;
    }
  };

  const onTabClick = (index) => {
    setIsActive(index);
  };
  // console.log(isActive);

  useEffect(() => {
    scrollSelectedIntoView();
  }, [isActive]);

  const getScrollSize = () => {
    const containerSize = tabsRef.current["clientWidth"];
    let totalSize = 0;
    const children = Array.from(tabRef.current);

    for (let i = 0; i < children.length; i += 1) {
      const tab = children[i];

      if (totalSize + tab["clientWidth"] > containerSize) {
        break;
      }

      totalSize += tabRef.current[isActive].clientWidth;
    }

    return totalSize;
  };

  const moveTabsScroll = (delta) => {
    let scrollValue = tabsRef.current["scrollLeft"];

    scrollValue += delta * (isRTL ? -1 : 1); // Fix for Edge

    scrollValue *= isRTL ? -1 : 1;

    console.log(scrollValue);
    tabsRef.current.scrollLeft = scrollValue;
  };

  const scrollSelectedIntoView = () => {
    let start = "left";
    let end = "right";
    let scrollStart = "scrollLeft";
    if (
      tabRef.current[isActive].getBoundingClientRect()[start] <
      tabsRef.current.getBoundingClientRect()[start]
    ) {
      // left side of button is out of view
      const nextScrollStart =
        tabsRef.current.scrollLeft +
        (tabRef.current[isActive].getBoundingClientRect()[start] -
          tabsRef.current.getBoundingClientRect()[start]);
      tabsRef.current.scrollLeft = nextScrollStart;
    } else if (
      tabRef.current[isActive].getBoundingClientRect()[end] >
      tabsRef.current.getBoundingClientRect()[end]
    ) {
      // right side of button is out of view
      const nextScrollStart =
        tabsRef.current.scrollLeft +
        (tabRef.current[isActive].getBoundingClientRect()[end] -
          tabsRef.current.getBoundingClientRect()[end]);
      tabsRef.current.scrollLeft = nextScrollStart;
    }
  };

  // hide and show arrows
  // showStartScroll = isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
  //       showEndScroll = !isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
  useEffect(() => {
    // tabsRef.current.scrollLeft = 1;
    if (isRTL) {
      console.log(-Math.abs(posRef.current), "rtl");
      setTimeout(() => {
        tabsRef.current.scrollLeft += posRef.current;
      }, 130);
    } else {
      console.log(Math.abs(posRef.current), "ltr");

      setTimeout(() => {
        tabsRef.current.scrollLeft += posRef.current;
      }, 100);
    }
  }, [isRTL]);

  const onTabsScroll = useCallback((e) => {
    const parentPos = tabsRef.current.getBoundingClientRect();
    const childPos = tabRef.current[isActive].getBoundingClientRect();

    const correction = isRTL
      ? getNormalizedScrollLeft(tabsRef.current, "rtl") +
        tabsRef.current.clientWidth -
        tabsRef.current.scrollWidth
      : tabsRef.current.scrollLeft;

    let startIndicator = isRTL ? "right" : "left";

    const scrollPos =
      tabRef.current[isActive].getBoundingClientRect()[startIndicator] -
      tabsRef.current.getBoundingClientRect()[startIndicator] +
      correction;

    posRef.current = scrollPos;
  });

  return (
    <StyledTabsContainer>
      <button className="right" onClick={onRightBtnClick}>
        {">"}{" "}
      </button>
      <button className="left" onClick={onLeftBtnClick}>
        {" "}
        {"<"}{" "}
      </button>
      <StyledCutomTabs ref={tabsRef} onScroll={onTabsScroll}>
        {[...Array(40).keys()].map((item, index) => (
          <div
            key={item}
            onClick={() => onTabClick(index)}
            ref={(el) => (tabRef.current[index] = el)}
            className={`tab  ${isActive === index ? "bg-primary" : ""}`}
          >
            item {item}
          </div>
        ))}
      </StyledCutomTabs>
    </StyledTabsContainer>
  );
};

export default CutomTabs;
const StyledCutomTabs = styled.div`
  box-sizing: border-box;
  scroll-behavior: smooth;
  background: red;
  display: flex;
  overflow: auto;
  position: relative;
  .tab {
    padding: 10px 40px;
    white-space: nowrap;
    cursor: pointer;
  }
`;

const StyledTabsContainer = styled.div`
  position: relative;
  button {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    &.right {
      right: -30px;
    }
    &.left {
      left: -30px;
    }
  }
`;
