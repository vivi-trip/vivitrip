import Footer from "@/src/containers/Footer";
import GNB from "@/src/containers/GNB";
import "@/src/styles/globals.css";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GNB />
      <main className="h-main overflow-auto bg-gray-50 px-32">
        <div className="min-h-main mx-auto max-w-screen-xl py-16">
          <Component {...pageProps} />
        </div>
        <Footer />
      </main>
    </>
  );
};

export default App;
