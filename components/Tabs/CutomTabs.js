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
import animate from "../../utils/animate";

const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  //   y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

const CutomTabs = () => {
  const tabsRef = useRef();
  const tabRef = useRef([]);
  const [isActive, setIsActive] = useState(20);
  const [displayScroll, setDisplayScroll] = useState({
    start: false,
    end: false,
  });
  const { isRTL } = useContext(RTLContext);

  useEffect(() => {
    setTimeout(() => {
      scrollSelectedIntoView();
    }, 130);
  }, [isActive]);
  useEffect(() => {
    // tabsRef.current.scrollLeft = 1;
    // updateScrollButtonState();
    if (isRTL) {
      setTimeout(() => {
        scroll(tabsRef.current.scrollLeft + posRef.current);
        // tabsRef.current.scrollLeft += posRef.current;
      }, 130);
    } else {
      setTimeout(() => {
        // scroll(posRef.current);
        // tabsRef.current.scrollLeft += posRef.current;
        scroll(tabsRef.current.scrollLeft + posRef.current);
      }, 100);
    }
  }, [isRTL]);

  const moveTabsScroll = (delta) => {
    let scrollValue = tabsRef.current.scrollLeft;

    scrollValue += delta; // Fix for Edge

    // scrollValue *= isRTL ? -1 : 1;

    scroll(scrollValue);
  };

  const updateScrollButtonState = () => {
    const { scrollTop, scrollHeight, clientHeight, scrollWidth, clientWidth } =
      tabsRef.current;
    let showStartScroll;
    let showEndScroll;

    const scrollLeft = getNormalizedScrollLeft(
      tabsRef.current,
      isRTL ? "rtl" : "ltr"
    ); // use 1 for the potential rounding error with browser zooms.

    showStartScroll = isRTL
      ? Math.ceil(scrollLeft.toFixed(2)) < scrollWidth - clientWidth - 1
      : scrollLeft > 1;
    showEndScroll = !isRTL
      ? Math.ceil(scrollLeft.toFixed(2)) < scrollWidth - clientWidth - 1
      : scrollLeft > 1;

    if (
      showStartScroll !== displayScroll.start ||
      showEndScroll !== displayScroll.end
    ) {
      setDisplayScroll({
        start: isRTL ? showEndScroll : showStartScroll,
        end: isRTL ? showStartScroll : showEndScroll,
      });
    }
  };

  const posRef = useRef(0);
  const onRightBtnClick = () => {
    // if (tabsRef.current.clientWidth < tabsRef.current.scrollWidth) {
    //   scroll(+tabRef.current[0].offsetWidth);
    //   // tabsRef.current.scrollLeft += tabRef.current[0].offsetWidth;
    // }

    // moveTabsScroll(tabsRef.current.clientWidth);
    scroll(
      tabsRef.current.scrollLeft + tabRef.current[isActive].clientWidth * 2,
      300
    );
  };

  const onLeftBtnClick = () => {
    // if (tabsRef.current.clientWidth < tabsRef.current.scrollWidth) {
    //   scroll(-tabRef.current[0].offsetWidth);
    //   // tabsRef.current.scrollLeft -= tabRef.current[0].offsetWidth;
    // }
    // moveTabsScroll(-1 * tabsRef.current.clientWidth);
    scroll(
      tabsRef.current.scrollLeft - tabRef.current[isActive].clientWidth * 2,
      300
    );
  };

  const getScrollSize = () => {
    const clientSize = "clientWidth";
    const containerSize = tabsRef.current[clientSize];
    let totalSize = 0;
    const children = Array.from(tabRef.current);

    for (let i = 0; i < children.length; i += 1) {
      const tab = children[i];

      if (totalSize + tab[clientSize] > containerSize) {
        break;
      }

      totalSize += tab[clientSize];
    }

    return totalSize;
  };
  const onTabClick = (index) => {
    setIsActive(index);
  };
  // console.log(isActive);

  const scroll = (scrollValue, duration, animation = true) => {
    console.log(scrollValue);
    if (animation) {
      animate("scrollLeft", tabsRef.current, scrollValue, {
        duration: duration ? duration : 500,
      });
    } else {
      tabsRef.current.scrollLeft = scrollValue;
    }
  };

  const scrollSelectedIntoView = () => {
    console.log("dfffffff");
    let start = "left";
    let end = "right";

    if (
      tabRef.current[isActive].getBoundingClientRect()[start] <
      tabsRef.current.getBoundingClientRect()[start]
    ) {
      // left side of button is out of view
      const nextScrollStart =
        tabsRef.current.scrollLeft +
        (tabRef.current[isActive].getBoundingClientRect()[start] -
          tabsRef.current.getBoundingClientRect()[start]);
      // tabsRef.current.scrollLeft = nextScrollStart;
      scroll(nextScrollStart, 300);
    } else if (
      tabRef.current[isActive].getBoundingClientRect()[end] >
      tabsRef.current.getBoundingClientRect()[end]
    ) {
      // right side of button is out of view
      const nextScrollStart =
        tabsRef.current.scrollLeft +
        (tabRef.current[isActive].getBoundingClientRect()[end] -
          tabsRef.current.getBoundingClientRect()[end]);
      // tabsRef.current.scrollLeft = nextScrollStart;
      scroll(nextScrollStart, 300);
    }
  };

  // hide and show arrows
  // showStartScroll = isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
  //       showEndScroll = !isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;

  const onTabsScroll = (e) => {
    updateScrollButtonState();

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
  };

  return (
    <StyledTabsContainer>
      {displayScroll.end && (
        <button className="right" onClick={onRightBtnClick}>
          {"> end"}{" "}
        </button>
      )}
      {displayScroll.start && (
        <button className="left" onClick={onLeftBtnClick}>
          {" "}
          {"< start"}{" "}
        </button>
      )}
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
  /* scroll-behavior: smooth; */
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
