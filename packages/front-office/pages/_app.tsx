import { ThemeProvider } from "next-themes";
import { hotjar } from "react-hotjar";
import { useEffect } from "react";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_HOTJAR_ENABLED === "1") {
      hotjar.initialize(
        parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID),
        parseInt(process.env.NEXT_PUBLIC_HOTJAR_VERSION)
      );
    }
  }, []);

  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
