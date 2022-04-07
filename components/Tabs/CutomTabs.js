import styled from "@emotion/styled";
import { useEventCallback } from "@mui/material";
import {
  detectScrollType,
  getNormalizedScrollLeft,
} from "normalize-scroll-left";
import React, { useCallback, useContext, useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { RTLContext } from "../../context/RTLContext";
import animate from "../../utils/animate";
import { debounce } from "../../utils/debounce";

const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  //   y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

let warnedOnceTabPresent = false;
const defaultIndicatorStyle = {};

const CutomTabs = ({ onTabClick, activeTab, isRTL, children }) => {
  const tabsRef = useRef();
  const tabRef = useRef([]);

  const [displayScroll, setDisplayScroll] = useState({
    start: false,
    end: false,
  });
  const [indicatorStyle, setIndicatorStyle] = useState(defaultIndicatorStyle);

  const valueToIndex = new Map();

  const getTabsRects = () => {
    const tabsNode = tabsRef.current;
    let tabsRects;

    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect(); // create a new object with ClientRect class props + scrollLeft

      tabsRects = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        scrollLeftNormalized: getNormalizedScrollLeft(
          tabsNode,
          isRTL ? "rtl" : "ltr"
        ),
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
      };
    }

    let tabRect;

    if (tabsNode) {
      const children = tabRef.current;

      if (children.length > 0) {
        const tab = tabRef.current[activeTab];

        if (process.env.NODE_ENV !== "production") {
          if (!tab) {
            console.error(
              [
                `rn-tabs: The \`activeTab\` provided to the Tabs component is invalid.`,
                `None of the Tabs' children match with "${activeTab}".`,
                valueToIndex.keys
                  ? `You can provide one of the following values: ${Array.from(
                      valueToIndex.keys()
                    ).join(", ")}.`
                  : null,
              ].join("\n")
            );
          }
        }

        tabRect = tab ? tab.getBoundingClientRect() : null;

        if (process.env.NODE_ENV !== "production") {
          if (
            process.env.NODE_ENV !== "test" &&
            !warnedOnceTabPresent &&
            tabRect &&
            tabRect.width === 0 &&
            tabRect.height === 0
          ) {
            tabsRects = null;
            console.error(
              [
                "rn-tabs: The `value` provided to the Tabs component is invalid.",
                `The Tab with this \`value\` ("${activeTab}") is not part of the document layout.`,
                "Make sure the tab item is present in the document or that it's not `display: none`.",
              ].join("\n")
            );
            warnedOnceTabPresent = true;
          }
        }
      }
    }

    return {
      tabsRects,
      tabRect,
    };
  };

  const updateIndicatorState = useEventCallback(() => {
    const { tabsRects, tabRect } = getTabsRects();
    let startValue = 0;
    let startIndicator;

    startIndicator = isRTL ? "right" : "left";

    if (tabRect && tabsRects) {
      const correction = isRTL
        ? tabsRects.scrollLeftNormalized +
          tabsRects.clientWidth -
          tabsRects.scrollWidth
        : tabsRects.scrollLeft;
      startValue =
        (isRTL ? -1 : 1) *
        (tabRect[startIndicator] - tabsRects[startIndicator] + correction);
    }

    const newIndicatorStyle = {
      [startIndicator]: startValue,
      // May be wrong until the font is loaded.
      ["width"]: tabRect ? tabRect["width"] : 0,
    }; // IE11 support, replace with Number.isNaN
    // eslint-disable-next-line no-restricted-globals

    if (
      isNaN(indicatorStyle[startIndicator]) ||
      isNaN(indicatorStyle["width"])
    ) {
      setIndicatorStyle(newIndicatorStyle);
    } else {
      const dStart = Math.abs(
        indicatorStyle[startIndicator] - newIndicatorStyle[startIndicator]
      );
      const dSize = Math.abs(
        indicatorStyle["width"] - newIndicatorStyle["width"]
      );

      if (dStart >= 1 || dSize >= 1) {
        setIndicatorStyle(newIndicatorStyle);
      }
    }
  });

  const updateScrollButtonState = useEventCallback(() => {
    const { scrollWidth, clientWidth } = tabsRef.current;
    let showStartScroll;
    let showEndScroll;

    const scrollLeft = getNormalizedScrollLeft(
      tabsRef.current,
      isRTL ? "rtl" : "ltr"
    ); // use 1 for the potential rounding error with browser zooms.
    console.log(Math.floor(scrollLeft.toFixed(2)), "ddddddddddddddddddddddd");
    console.log(
      Math.ceil(scrollLeft.toFixed(2)) < scrollWidth - clientWidth - 1
    );
    showStartScroll = Math.floor(scrollLeft.toFixed(2)) > 1;
    showEndScroll =
      Math.ceil(scrollLeft.toFixed(2)) < scrollWidth - clientWidth - 1;

    if (
      showStartScroll !== displayScroll.start ||
      showEndScroll !== displayScroll.end
    ) {
      setDisplayScroll({
        start: showStartScroll,
        end: showEndScroll,
      });
    }
  });

  const posRef = useRef(0);
  const onRightBtnClick = () => {
    // if (tabsRef.current.clientWidth < tabsRef.current.scrollWidth) {
    //   scroll(+tabRef.current[0].offsetWidth);
    //   // tabsRef.current.scrollLeft += tabRef.current[0].offsetWidth;
    // }

    // moveTabsScroll(tabsRef.current.clientWidth);
    scroll(
      tabsRef.current.scrollLeft + tabRef.current[activeTab].clientWidth * 2,
      300
    );
  };

  const onLeftBtnClick = () => {
    console.log(tabRef.current);
    // if (tabsRef.current.clientWidth < tabsRef.current.scrollWidth) {
    //   scroll(-tabRef.current[0].offsetWidth);
    //   // tabsRef.current.scrollLeft -= tabRef.current[0].offsetWidth;
    // }
    // moveTabsScroll(-1 * tabsRef.current.clientWidth);
    scroll(
      tabsRef.current.scrollLeft - tabRef.current[activeTab].clientWidth * 2,
      300
    );
  };

  const onNativeTabClick = (e, index) => {
    onTabClick(e, index);
  };

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

  const scrollSelectedIntoView = useEventCallback(() => {
    console.log("dfffffff");
    let start = "left";
    let end = "right";

    if (
      tabRef.current[activeTab].getBoundingClientRect()[start] <
      tabsRef.current.getBoundingClientRect()[start]
    ) {
      // left side of button is out of view
      const nextScrollStart =
        tabsRef.current.scrollLeft +
        (tabRef.current[activeTab].getBoundingClientRect()[start] -
          tabsRef.current.getBoundingClientRect()[start]);
      // tabsRef.current.scrollLeft = nextScrollStart;
      scroll(nextScrollStart, 300);
    } else if (
      tabRef.current[activeTab].getBoundingClientRect()[end] >
      tabsRef.current.getBoundingClientRect()[end]
    ) {
      // right side of button is out of view
      const nextScrollStart =
        tabsRef.current.scrollLeft +
        (tabRef.current[activeTab].getBoundingClientRect()[end] -
          tabsRef.current.getBoundingClientRect()[end]);
      // tabsRef.current.scrollLeft = nextScrollStart;
      scroll(nextScrollStart, 300);
    }
  });

  React.useEffect(() => {
    // Don't animate on the first render.
    scrollSelectedIntoView();
  }, [scrollSelectedIntoView, indicatorStyle]);

  React.useEffect(() => {
    /* Updating the indicator state. */
    updateIndicatorState();
    // updateScrollButtonState();
  });

  useEffect(() => {
    updateScrollButtonState();
  }, [isRTL]);

  const handleTabsScroll = React.useMemo(
    () =>
      debounce(() => {
        updateScrollButtonState();
      }),
    [updateScrollButtonState]
  );
  React.useEffect(() => {
    return () => {
      handleTabsScroll.clear();
    };
  }, [handleTabsScroll]);

  return (
    <StyledTabsContainer>
      {displayScroll.end && (
        <button className="right" onClick={onRightBtnClick}>
          <span dir="ltr"> {">"}</span>{" "}
        </button>
      )}

      <StyledCutomTabs ref={tabsRef} onScroll={handleTabsScroll}>
        {[...Array(40).keys()].map((item, index) => (
          <div
            key={item}
            onClick={(e) => onNativeTabClick(e, index)}
            ref={(el) => (tabRef.current[index] = el)}
            className={`tab  ${activeTab === index ? "bg-primary" : ""}`}
          >
            item {item}
          </div>
        ))}
      </StyledCutomTabs>

      {displayScroll.start && (
        <button className="left" onClick={onLeftBtnClick}>
          {" "}
          <span dir="ltr"> {"<"}</span>{" "}
        </button>
      )}
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
  padding: 0 25px;
  position: relative;
  button {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    &.right {
      right: -0px;
    }
    &.left {
      left: -0px;
    }
  }
`;
