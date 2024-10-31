import Footer from "@/src/containers/Footer";
import GNB from "@/src/containers/GNB";
import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";

const App = ({ Component, pageProps }: AppProps) => {
  const pathname = usePathname().split("/")[1];

  // 404 page 여부 확인
  const is404Page = pageProps?.statusCode === 404;

  const mainStyles = is404Page ? "bg-brand-50" : "bg-gray-50 h-main";

  return (
    <>
      {!is404Page && <GNB />}
      <main className={`overflow-auto px-32 ${mainStyles}`}>
        <div className="mx-auto min-h-main max-w-screen-xl">
          <Component {...pageProps} />
        </div>
        {is404Page || pathname.includes("sign") ? null : <Footer />}
      </main>
    </>
  );
};

export default App;
