import "../styles/globals.css";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mui/styles";
import { RTLProvider } from "../context/RTLContext";
import Head from "next/head";
import "../styles/rn-tabs.css";

function MyApp({ Component, pageProps }) {
  const [isRTL, setIsRTL] = useState(false);
  const onRTLSwitcher = () => {
    setIsRTL((prev) => !prev);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    isRTL ? body.setAttribute("dir", "rtl") : body.setAttribute("dir", "ltr");
  }, [isRTL]);

  const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
  });

  const theme = createTheme({
    direction: isRTL ? "rtl" : "unset",
  });
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
      </Head>
      <RTLProvider isRTL={isRTL}>
        <StylesProvider jss={jss}>
          <ThemeProvider theme={theme}>
            <button
              type="button"
              style={{ padding: 30, background: "cyan" }}
              onClick={onRTLSwitcher}
              dir="ltr"
            >
              you are in {isRTL ? "rtl" : "ltr"} click me to switch!
            </button>
            <Component {...pageProps} />
          </ThemeProvider>
        </StylesProvider>
      </RTLProvider>
    </>
  );
}

export default MyApp;
