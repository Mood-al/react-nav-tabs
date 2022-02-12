import styled from "@emotion/styled";
import { getNormalizedScrollLeft } from "normalize-scroll-left";
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
  console.log(isActive);

  useEffect(() => {
    setTimeout(() => {
      tabsRef.current.scrollLeft +=
        Math.abs(tabRef.current[isActive].getBoundingClientRect().x) -
        tabRef.current[0].offsetWidth;
    }, 200);
  }, [isActive]);
  useEffect(() => {
    // tabsRef.current.scrollLeft = 1;
    if (isRTL) {
      console.log(-Math.abs(posRef.current), "rtl");
      setTimeout(() => {
        tabsRef.current.scrollLeft += posRef.current;
      }, 100);
    } else {
      console.log(Math.abs(posRef.current), "ltr");

      setTimeout(() => {
        tabsRef.current.scrollLeft += posRef.current;
      }, 100);
      //   tabsRef.current.scrollLeft += posRef.current;
      //   tabsRef.current.scrollLeft += posRef.current;
    }
  }, [isRTL]);
  //   useEffect(() => {
  //     if (isRTL) {
  //       console.log(Math.abs(posRef.current), "rtl");
  //       tabsRef.current.scrollLeft += -Math.abs(posRef.current);
  //     } else {
  //       console.log(Math.abs(posRef.current), "ltr");

  //       tabsRef.current.scrollLeft += Math.abs(posRef.current);
  //       //   tabsRef.current.scrollLeft += posRef.current;
  //       //   tabsRef.current.scrollLeft += posRef.current;
  //     }
  //   }, [isRTL]);
  const onTabsScroll = useCallback((e) => {
    // console.log(posRef.current, "refPos");
    // console.log(getScrollPosition(e.target), "tabPos");
    // console.log(getScrollPosition(e.target).x, "calc");
    const parentPos = tabsRef.current.getBoundingClientRect();
    const childPos = tabRef.current[isActive].getBoundingClientRect();
    // console.log(parentPos.x);
    // console.log(getScrollPosition(e.target));
    // console.log(childPos.left , "child");
    // // console.log(posRef.current, "ref");
    // console.log(
    //   Math.abs(getScrollPosition(e.target).x) -
    //     Math.abs(childPos.x - tabsRef.current.offsetWidth),
    //   "new"
    // );
    // console.log(childPos.x - tabsRef.current.offsetWidth, "sss");
    // console.log(
    //   Math.abs(tabsRef.current.getBoundingClientRect().left - childPos.x),
    //   "sss"
    // );

    // console.log(tabRef.current[isActive].getBoundingClientRect().width);
    // console.log(
    //   tabsRef.current.offsetWidth +
    //     tabRef.current[isActive].getBoundingClientRect().width * 2,
    //   "new"
    // );
    // console.log(getScrollPosition(e.target).x, "scroll pos");
    // console.log(parentPos.x - childPos.x, "acgtive");
    // console.log(
    //   Math.abs(getScrollPosition(e.target).x) -
    //     parentPos.x -
    //     childPos.x +
    //     tabsRef.current.offsetWidth
    // );
    // console.log(
    //   tabsRef.current.scrollLeft +
    //     tabsRef.current.clientWidth -
    //     tabsRef.current.scrollWidth
    // );
    // console.log(
    //   tabsRef.current.scrollLeft / tabsRef.current.clientWidth,
    //   "ssss"
    // );
    console.log(getNormalizedScrollLeft(tabsRef.current, "rtl"));
    const correction = isRTL
      ? getNormalizedScrollLeft(tabsRef.current, "rtl") +
        tabsRef.current.clientWidth -
        tabsRef.current.scrollWidth
      : tabsRef.current.scrollLeft;
    // console.log(
    //   tabsRef.current.scrollLeft +
    //     tabsRef.current.clientWidth -
    //     tabsRef.current.scrollWidth,
    //   "corr"
    // );
    // console.log(
    //   tabsRef.current.scrollWidth -
    //     Math.abs(tabsRef.current.scrollLeft) -
    //     tabsRef.current.clientWidth
    // );
    let startIndicator = isRTL ? "right" : "left";

    const scrollPos =
      tabRef.current[isActive].getBoundingClientRect()[startIndicator] -
      tabsRef.current.getBoundingClientRect()[startIndicator] +
      correction;
    console.log(scrollPos);
    // console.log(tabsRef.current.scrollLeft);
    // console.log(getScrollPosition(e.target).x);
    // console.log(
    //   tabsRef.current.offsetWidth -
    //     tabRef.current[isActive].getBoundingClientRect().width * 2
    // );
    const { x, width, left, right } =
      tabRef.current[isActive].getBoundingClientRect();
    // console.log({ x, width, left, right });
    posRef.current = scrollPos;
    // console.log(parentPos.x - childPos.x, "p - c");

    // setPos(getScrollPosition(e.target).x - (parentPos.x - childPos.x));

    // pos = getScrollPosition(e.target).x - (parentPos.x - childPos.x);
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
