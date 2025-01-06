import Favicon from "../components/Favicon";
import Modal from "../components/modal/Modal";
import "@/src/components/calendar/calendar.css";
import Footer from "@/src/containers/Footer";
import GNB from "@/src/containers/GNB";
import "@/src/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import type { AppProps } from "next/app";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  const pathname = usePathname().split("/")[1];

  // 404 page 여부 확인
  const is404Page = pageProps?.statusCode === 404;

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>vivitrip | for your experience</title>
        <Favicon />
      </Head>
      <Modal />
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
    </QueryClientProvider>
  );
};

export default App;
