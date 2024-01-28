import { header } from "components/user-container";
import { Html, Main } from "next/document";

const { Head, NextScript } = require("next/document");

export default function Document() {
  return (
    <Html>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
