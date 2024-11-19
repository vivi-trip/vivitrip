import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="ko">
      <Head />
      <body className="antialiased">
        <Main />
        <div id='_modal' />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
