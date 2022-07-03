import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setSSR] = useState(true);

  useEffect(() => {
    setSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <div>
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-10 overflow-auto videos flex-1 h-[88vh]"></div>
      <Component {...pageProps} />;
    </div>
  );
};

export default MyApp;
