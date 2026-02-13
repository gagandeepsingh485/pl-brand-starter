import { Navbar, Publisher, Footer as FooterType } from "publive-cms-sdk";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

interface MainLayoutProps {
  children: React.ReactElement;
  publisher: Publisher;
  navbar: Navbar[];
  footer: FooterType;
}

const MainLayout = ({ children, publisher, navbar, footer }: MainLayoutProps) => {
  return (
    <>
      <Head>
        <title>Publive | Starter App</title>
        <meta name="description" content="Publive" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col bg-[#F8F7F2]">
        {children && <Header publisher={publisher} navbar={navbar} />}
        <main className="flex-1">{children}</main>
        {children && <Footer publisher={publisher} footer={footer} />}
      </div>
    </>
  );
};

export default MainLayout;
