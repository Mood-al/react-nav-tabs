import { useContext, useRef, useState } from "react";

import CustomTabs from "../components/Tabs/CustomTabs";
import TabsContainer from "../components/TabsContainer";
import { RTLContext } from "../context/RTLContext";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae nemo
      voluptate dolor sit voluptatem optio repellendus, quos reprehenderit
      aliquid molestias saepe officia aspernatur adipisci? Fuga cumque esse
      deleniti nemo molestias.
      {/* <MatTabs /> */}
      <TabsContainer />
    </div>
  );
}
