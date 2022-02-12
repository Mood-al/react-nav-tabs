import styled from "@emotion/styled";
import { useCallback, useContext, useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { RTLContenxt } from "../../context/RTLContenxt";

const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  //   y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

const CutomTabs = () => {
  const tabsRef = useRef();
  const tabRef = useRef([]);
  const [isActive, setIsActive] = useState(4);

  const RTLPosRef = useRef(0);
  const posRef = useRef(0);
  const onRightBtnClick = () => {
    if (tabsRef.current.clientWidth < tabsRef.current.scrollWidth) {
      tabsRef.current.scrollLeft += tabRef.current[0].offsetWidth + 50;
    }
  };

  const { isRTL } = useContext(RTLContenxt);

  const onLeftBtnClick = () => {
    if (tabsRef.current.clientWidth < tabsRef.current.scrollWidth) {
      tabsRef.current.scrollLeft -= tabRef.current[0].offsetWidth + 50;
    }
  };

  const onTabClick = (index) => {
    setIsActive(index);
  };

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
        tabsRef.current.scrollLeft += -Math.abs(posRef.current);
      }, 100);
    } else {
      console.log(Math.abs(posRef.current), "ltr");

      setTimeout(() => (tabsRef.current.scrollLeft += posRef.current), 150);

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
    const parentPos = tabsRef.current.getBoundingClientRect();
    const childPos = tabRef.current[isActive].getBoundingClientRect();

    // const CP =
    //   tabsRef.current.offsetWidth -
    //   Math.abs(tabsRef.current.getBoundingClientRect().left - childPos.x) -
    //   tabRef.current[isActive].offsetWidth;
    // console.log(parentPos.x);
    // console.log(CP, "new");
    console.log(childPos.left);
    // console.log(childPos.left);
    // console.log(tabsRef.current.offsetWidth);
    console.log(
      tabsRef.current.scrollWidth - (tabsRef.current.scrollWidth - childPos.x)
    );
    // console.log(getScrollPosition(e.target).x, "scrollPos");
    // console.log(tabsRef.current.clientWidth);
    // console.log(getScrollPosition(e.target).x - (parentPos.x - childPos.x));
    // const { x, width, left, right } =
    //   tabRef.current[isActive].getBoundingClientRect();
    // console.log({ x, width, left, right });
    posRef.current = getScrollPosition(e.target).x - (parentPos.x - childPos.x);
  });

  return (
    <StyledTabsContainer>
      {/* <button className="right" onClick={onRightBtnClick}>
        {">"}{" "}
      </button>
      <button className="left" onClick={onLeftBtnClick}>
        {" "}
        {"<"}{" "}
      </button> */}
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
