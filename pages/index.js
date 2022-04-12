import { useContext, useRef, useState } from "react";
import TabsContainer from "../components/TabsContainer";

import { RTLContext } from "../context/RTLContext";

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
