import Favicon from "@/src/components/Favicon";
import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="ko">
      <Head>
        <title>vivitrip | for your experience</title>
        <Favicon />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
