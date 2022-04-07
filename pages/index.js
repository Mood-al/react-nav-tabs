import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRouter } from "next/dist/client/router";
import { useContext, useState } from "react";
import MatTabs from "../components/MatTabs";
import CustomTabs from "../components/Tabs/CutomTabs";
import { RTLContext } from "../context/RTLContext";

import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const theme = createTheme({
    direction: "rtl", // Both here and <body dir="rtl">
  });

  const [activeTab, setActiveTab] = useState(8);
  const onTabClick = (e, index) => {
    setActiveTab(index);
  };
  const { isRTL } = useContext(RTLContext);

  return (
    <div className="container">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae nemo
      voluptate dolor sit voluptatem optio repellendus, quos reprehenderit
      aliquid molestias saepe officia aspernatur adipisci? Fuga cumque esse
      deleniti nemo molestias.
      {/* <MatTabs /> */}
      <CustomTabs activeTab={activeTab} onTabClick={onTabClick} isRTL={isRTL} />
    </div>
  );
}
