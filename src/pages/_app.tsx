import Favicon from "../components/Favicon";
import Modal from "../components/modal/Modal";
import "@/src/components/calendar/calendar.css";
import Footer from "@/src/containers/Footer";
import GNB from "@/src/containers/GNB";
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

  const currentPathname =
    pathname === "/home" || pathname === "/search"
      ? pathname
      : pathname.split("/")[1];

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
          "overflow-auto px-24 md:px-32",
          is404Page ? "bg-brand-50" : "h-main bg-gray-50",
        )}>
        <div
          className={clsx(
            "mx-auto min-h-main",
            currentPathname ? null : "max-w-screen-xl",
          )}>
          {getLayout(<Component {...pageProps} />)}
        </div>
        {is404Page || pathname.includes("sign") ? null : <Footer />}
      </main>
    </QueryClientProvider>
  );
};

export default App;
