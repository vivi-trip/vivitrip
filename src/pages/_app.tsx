import Favicon from "@/src/components/Favicon";
import ScrollToTopHandler from "@/src/components/ScrollHandler/ScrollToTopHandler";
import "@/src/components/calendar/calendar.css";
import Modal from "@/src/components/modal/Modal";
import Footer from "@/src/containers/Footer";
import GNB from "@/src/containers/GNB";
import ScrollProvider from "@/src/contexts/ScrollContext";
import useUserStore from "@/src/stores/userStore";
import "@/src/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
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

  const { userData, checkAndClearUserData } = useUserStore();

  const { pathname, query } = useRouter();

  const hasQuery = Object.keys(query).length !== 0;
  const isHome = pathname === "/home" && hasQuery;
  const isActivityPage = pathname.startsWith("/activity") && hasQuery;
  const isScrollToTopEnabled = isHome || isActivityPage;
  const isHomeOrSearch = pathname === "/home" || pathname === "/search";
  const is404Page = pageProps?.statusCode === 404;

  useEffect(() => {
    if (userData) {
      checkAndClearUserData();
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>vivitrip | for your experience</title>
        <Favicon />
      </Head>
      <Modal />
      <div className="min-w-240">
        {is404Page || pathname.includes("sign") ? null : <GNB />}
        <ScrollProvider
          as="main"
          className={clsx(
            "px-24 md:px-32",
            is404Page || pathname.includes("sign")
              ? "bg-brand-50"
              : "h-main bg-gray-50",
          )}>
          {!isScrollToTopEnabled && <ScrollToTopHandler />}
          <div
            className={clsx(
              "mx-auto min-h-main",
              !isHomeOrSearch && "max-w-screen-xl",
            )}>
            {getLayout(<Component {...pageProps} />)}
          </div>
          {is404Page || pathname.includes("sign") ? null : <Footer />}
        </ScrollProvider>
      </div>
    </QueryClientProvider>
  );
};

export default App;
