import Footer from "@/src/containers/Footer";
import GNB from "@/src/containers/GNB";
import "@/src/styles/globals.css";
import type { AppProps } from "next/app";
import { usePathname } from "next/navigation";

const App = ({ Component, pageProps }: AppProps) => {
  const pathname = usePathname().split("/")[1];

  return (
    <>
      <GNB />
      <main className="h-main overflow-auto bg-gray-50 px-32">
        <div className="mx-auto min-h-main max-w-screen-xl">
          <Component {...pageProps} />
        </div>
        {pathname.includes("sign") ? null : <Footer />}
      </main>
    </>
  );
};

export default App;
