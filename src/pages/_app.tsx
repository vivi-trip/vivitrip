import Footer from "@/src/containers/Footer";
import GNB from "@/src/containers/GNB";
import "@/src/styles/globals.css";
import clsx from "clsx";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";

const App = ({ Component, pageProps }: AppProps) => {
  const pathname = usePathname().split("/")[1];

  // 404 page 여부 확인
  const is404Page = pageProps?.statusCode === 404;

  return (
    <>
      {is404Page ? null : <GNB />}
      <main
        className={clsx(
          "overflow-auto px-32",
          is404Page ? "bg-brand-50" : "h-main bg-gray-50",
        )}>
        <div className="mx-auto min-h-main max-w-screen-xl">
          <Component {...pageProps} />
        </div>
        {is404Page || pathname.includes("sign") ? null : <Footer />}
      </main>
    </>
  );
};

export default App;
