import type { AppProps } from "next/app";
import { Inter, Playfair_Display } from "next/font/google";
import React from "react";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

type ComponentWithLayout = AppProps["Component"] & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as ComponentWithLayout).getLayout ??
    ((page: React.ReactElement) => page);

  return (
    <div className={`${inter.variable} ${playfair.variable} font-sans`}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
