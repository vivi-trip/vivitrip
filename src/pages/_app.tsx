import ScrollToTopHandler from "../components/ScrollHandler/ScrollToTopHandler";
import Favicon from "@/src/components/Favicon";
import "@/src/components/calendar/calendar.css";
import Modal from "@/src/components/modal/Modal";
import Footer from "@/src/containers/Footer";
import GNB from "@/src/containers/GNB";
import ScrollProvider from "@/src/contexts/ScrollContext";
import "@/src/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

const App = ({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  const { pathname } = useRouter();

  const isHomePage = pathname === "/home" || pathname === "/search";

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
      <ScrollProvider
        as="main"
        className={clsx(
          "px-24 md:px-32",
          is404Page ? "bg-brand-50" : "h-main bg-gray-50",
        )}>
        <ScrollToTopHandler />
        <div
          className={clsx(
            "mx-auto min-h-main",
            !isHomePage && "max-w-screen-xl",
          )}>
          {getLayout(<Component {...pageProps} />)}
        </div>
        {is404Page || pathname.includes("sign") ? null : <Footer />}
      </ScrollProvider>
    </QueryClientProvider>
  );
};

export default App;
