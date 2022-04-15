import styled from "@emotion/styled";
import { useEventCallback } from "../../hooks/useEventCallback";
import { getNormalizedScrollLeft } from "../../utils/getNormalizedScrollLeft";
import {
  memo,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useMemo,
  cloneElement,
  Children,
} from "react";
import animate from "../../utils/animate";
import { debounce } from "../../utils/debounce";
import RightArrowIcon from "../Arrows/RightArrowIcon";
import LeftArrowIcon from "../Arrows/LeftArrowIcon";
import LeftArrow from "../Arrows/LeftArrow";
import RightArrow from "../Arrows/RightArrow";
import ownerDocument from "../../utils/ownerDocument";
// import ownerWindow from "../../utils/ownerWindow";

const defaultIndicatorStyle = {};

const nextItem = (list, item) => {
  if (list === item) {
    return list.firstChild;
  }

  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }

  return list.firstChild;
};

const previousItem = (list, item) => {
  if (list === item) {
    return list.lastChild;
  }

  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }

  return list.lastChild;
};

const moveFocus = (list, currentFocus, traversalFunction) => {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus);

  while (nextFocus) {
    // Prevent infinite loop.
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return;
      }

      wrappedOnce = true;
    } // Same logic as useAutocomplete.js

    const nextFocusDisabled =
      nextFocus.disabled || nextFocus.getAttribute("aria-disabled") === "true";

    if (!nextFocus.hasAttribute("tabindex") || nextFocusDisabled) {
      // Move to the next element.
      nextFocus = traversalFunction(list, nextFocus);
    } else {
      nextFocus.focus();
      return;
    }
  }
};

const Tabs = ({
  onTabClick,
  activeTab,
  isRTL = false,
  children,
  action,
  tabsScrollAmount = 3,
  didReachEnd = () => null,
  didReachStart = () => null,
  selectedTabCoordinates = () => null,
  animationDuration = 300,
  navBtnCLickAnimationDuration = 300,
  selectedAnimationDuration = 300,
  NavBtnsIconColor = "#ddd",
  rightBtnIcon = <RightArrowIcon NavBtnsIconColor={NavBtnsIconColor} />,
  leftBtnIcon = <LeftArrowIcon NavBtnsIconColor={NavBtnsIconColor} />,
  hideNavBtnsOnMobile = false,
  hideNavBtns = false,
  showTabsScroll = false,
}) => {
  let start = "left";
  let end = "right";
  let scrollLeft = "scrollLeft";

  const tabsRef = useRef();
  const tabRef = useRef([]);
  const [arrowsDisplay, setArrowsDisplay] = useState({
    start: false,
    end: false,
  });
  const [indicatorStyle, setIndicatorStyle] = useState(defaultIndicatorStyle);

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

    let tabRects;

    if (tabsNode) {
      const children = tabRef.current;

      if (children.length > 0) {
        const tab = tabRef.current[activeTab];

        tabRects = tab ? tab.getBoundingClientRect() : null;
      }
    }

    return {
      tabsRects,
      tabRects,
    };
  };

  const updateIndicatorState = useEventCallback(() => {
    const { tabsRects, tabRects } = getTabsRects();
    let startValue = 0;
    let startIndicator;

    startIndicator = isRTL ? "right" : "left";

    if (tabRects && tabsRects) {
      const correction = isRTL
        ? tabsRects.scrollLeftNormalized +
          tabsRects.clientWidth -
          tabsRects.scrollWidth
        : tabsRects.scrollLeft;
      startValue =
        (isRTL ? -1 : 1) *
        (tabRects[startIndicator] - tabsRects[startIndicator] + correction);
    }

    const newIndicatorStyle = {
      [startIndicator]: startValue,
      // May be wrong until the font is loaded.
      width: tabRects ? tabRects["width"] : 0,
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

    showStartScroll = Math.floor(scrollLeft.toFixed(2)) > 1;
    showEndScroll =
      Math.ceil(scrollLeft.toFixed(2)) < scrollWidth - clientWidth - 1;

    if (
      showStartScroll !== arrowsDisplay.start ||
      showEndScroll !== arrowsDisplay.end
    ) {
      setArrowsDisplay({
        start: showStartScroll,
        end: showEndScroll,
      });
      didReachEnd(!showEndScroll);
      didReachStart(!showStartScroll);
    }
  });

  const onRightBtnClick = () => {
    const { tabsRects } = getTabsRects();

    scroll(
      tabsRects[scrollLeft] +
        tabRef.current[activeTab].clientWidth * tabsScrollAmount,
      navBtnCLickAnimationDuration
        ? navBtnCLickAnimationDuration
        : animationDuration
    );
  };

  const onLeftBtnClick = () => {
    const { tabsRects } = getTabsRects();

    scroll(
      tabsRects[scrollLeft] -
        tabRef.current[activeTab].clientWidth * tabsScrollAmount,
      navBtnCLickAnimationDuration
        ? navBtnCLickAnimationDuration
        : animationDuration
    );
  };

  const goToStart = () => {
    scroll(0);
  };
  const goToEnd = () => {
    const { tabsRects } = getTabsRects();
    const { scrollWidth } = tabsRects;
    scroll((isRTL ? -1 : 1) * scrollWidth);
  };

  useImperativeHandle(
    action,
    () => ({
      onLeftBtnClick,
      onRightBtnClick,
      goToStart,
      goToEnd,
    }),
    [onLeftBtnClick, onRightBtnClick, goToStart, goToEnd]
  );

  const onNativeTabClick = useEventCallback((e, index) => {
    onTabClick(e, index);
  });

  const scroll = (scrollValue, duration, animation = true) => {
    if (animation) {
      animate(scrollLeft, tabsRef.current, scrollValue, {
        duration: duration ? duration : 300,
      });
    } else {
      tabsRef.current.scrollLeft = scrollValue;
    }
  };

  const scrollSelectedIntoView = useEventCallback((animation) => {
    const { tabsRects, tabRects } = getTabsRects();

    // if (!tabMeta || !tabsMeta) {
    //   return;
    // }
    if (tabRects[start] < tabsRects[start]) {
      // left side of button is out of view
      const nextScrollStart =
        tabsRects[scrollLeft] + (tabRects[start] - tabsRects[start]);

      scroll(
        nextScrollStart,
        selectedAnimationDuration
          ? selectedAnimationDuration
          : animationDuration,
        animation
      );
    } else if (tabRects[end] > tabsRects[end]) {
      // right side of button is out of view
      const nextScrollStart =
        tabsRects[scrollLeft] + (tabRects[end] - tabsRects[end]);

      scroll(
        nextScrollStart,
        selectedAnimationDuration
          ? selectedAnimationDuration
          : animationDuration
      );
    }
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      updateIndicatorState();
      updateScrollButtonState();
    });

    const win = tabsRef.current;
    win.addEventListener("resize", handleResize);
    let resizeObserver;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      Array.from(tabRef.current).forEach((child) => {
        resizeObserver.observe(child);
      });
    }

    return () => {
      handleResize.clear();
      win.removeEventListener("resize", handleResize);

      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [updateIndicatorState, updateScrollButtonState]);
  const handleTabsScroll = useMemo(
    () =>
      debounce(() => {
        updateScrollButtonState();
      }),
    [updateScrollButtonState]
  );
  useEffect(() => {
    return () => {
      handleTabsScroll.clear();
    };
  }, [handleTabsScroll]);

  useEffect(() => {
    /* Updating the indicator state. */
    // const timer = setTimeout(() => {
    updateIndicatorState();
    updateScrollButtonState();

    // }, 100);
    // () => clearTimeout(timer);
  });

  useEffect(() => {
    // Don't animate on the first render.
    // const timer = setTimeout(() => {
    scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
    // }, 100);
    // selectedTabCoordinates(indicatorStyle);
    // return () => clearTimeout(timer);
  }, [scrollSelectedIntoView, indicatorStyle]);

  // useEffect(() => {
  //   // I put the timeout because there is an issue happened when i put an external css file
  //   // I tried to fix it or at least know why did that happened but i couldnt find the issue so i put this timeout.
  //   // so this timeout responsible on triggring this function after 100s to aviod some unexpected bugs
  //   // the issue that i faced when i used a main css file inside my project and tried to use Raleway font from google fonts inside that css file
  //   // so when I imported this css file inside my project this function didnt trigger
  //   //  on first render and that caused a bug inside the navigation button
  //   // const timer = setTimeout(() =>
  //   updateScrollButtonState()
  //   // , 100);
  //   // return () => clearTimeout(timer);
  // }, [isRTL]);

  const handleKeyDown = (event) => {
    const list = tabsRef.current;
    const currentFocus = ownerDocument(list).activeElement; // Keyboard navigation assumes that [role="tab"] are siblings
    // though we might warn in the future about nested, interactive elements
    // as a a11y violation

    const role = currentFocus.getAttribute("role");

    if (role !== "tab") {
      return;
    }

    let previousItemKey = "ArrowLeft";
    let nextItemKey = "ArrowRight";

    if (isRTL) {
      // swap previousItemKey with nextItemKey
      previousItemKey = "ArrowRight";
      nextItemKey = "ArrowLeft";
    }

    switch (event.key) {
      case previousItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, previousItem);
        break;

      case nextItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, nextItem);
        break;

      case "Home":
        event.preventDefault();
        moveFocus(list, null, nextItem);
        break;

      case "End":
        event.preventDefault();
        moveFocus(list, null, previousItem);
        break;

      default:
        break;
    }
  };

  //  TODO find a new way to control prev and next btns!
  const startBtn = (
    <div className="rn___nav___btn___container">
      {!hideNavBtns && (
        <>
          {isRTL ? (
            <RightArrow
              disabled={!arrowsDisplay.end}
              className={`rn___right___nav___btn rn___btn rn___nav___btn ${
                hideNavBtnsOnMobile ? "display___md___none" : ""
              }`}
              onClick={onRightBtnClick}
              dir="ltr"
              rightBtnIcon={rightBtnIcon}
            />
          ) : (
            <LeftArrow
              disabled={!arrowsDisplay.start}
              className={`rn___left___nav___btn rn___btn rn___nav___btn ${
                hideNavBtnsOnMobile ? "display___md___none" : ""
              }`}
              onClick={onLeftBtnClick}
              dir="ltr"
              leftBtnIcon={leftBtnIcon}
            />
          )}
        </>
      )}
    </div>
  );

  const endBtn = (
    <div className="rn___nav___btn___container">
      {!hideNavBtns && (
        <>
          {isRTL ? (
            <LeftArrow
              disabled={!arrowsDisplay.start}
              className={`rn___left___nav___btn rn___btn rn___nav___btn${
                hideNavBtnsOnMobile ? "display___md___none" : ""
              }`}
              onClick={onLeftBtnClick}
              dir="ltr"
              leftBtnIcon={leftBtnIcon}
            />
          ) : (
            <RightArrow
              disabled={!arrowsDisplay.end}
              className={`rn___right___nav___btn rn___btn rn___nav___btn${
                hideNavBtnsOnMobile ? "display___md___none" : ""
              }`}
              onClick={onRightBtnClick}
              dir="ltr"
              rightBtnIcon={rightBtnIcon}
            />
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="rn___tabs___container">
      {startBtn}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="tabs"
        onKeyDown={handleKeyDown}
        onScroll={handleTabsScroll}
        className={`rn___tabs ${
          !showTabsScroll ? "hide___rn___tabs___scroll" : ""
        }`}
      >
        <>
          {Children.map(children, (child, index) =>
            cloneElement(child, {
              ref: (ref) => (tabRef.current[index] = ref),
              onClick: (e) => onNativeTabClick(e, index),
              role: "tab",
              ["aria-selected"]: activeTab === index ? "true" : "false",
              ["aria-controls"]: `panel-${index}`,
              id: `tab-${index}`,
              tabIndex: activeTab === index ? "0" : "-1",
              className: `rn___tab rn___btn ${
                activeTab === index ? "rn___tab___selected" : ""
              }`,
            })
          )}
        </>
      </div>
      {endBtn}
    </div>
  );
};

export default memo(Tabs);
const StyledCutomTabs = styled.div`
  /* box-sizing: border-box; */
  background: red;
  display: flex;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  .tab {
    padding: 10px 40px;
    white-space: nowrap;
    cursor: pointer;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTabsContainer = styled.div`
  padding: 0 25px;
  position: relative;
  display: flex;
  button {
    /* position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    &.right {
      right: -0px;
    }
    &.left {
      left: -0px;
    } */
  }
`;
