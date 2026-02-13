import MainLayout from "@/component/layout";
import { APIService } from "@/lib/api";
import { StaticLayoutRender } from "@/lib/FieldMap";
import { GetServerSidePropsContext } from "next";
import { Post, Publisher } from "publive-cms-sdk";
import React from "react";
import { FooterData, HomePageData, NavbarData } from "@/lib/data/page";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const publive = new APIService().getSDK();
  const publisher = await publive.auth.fetchPublisher();

  // const post = await publive.content.fetch("/home-page");
  const post = HomePageData;
  
  // const navbar = await publive.utils.layout.fetchNavbar();
  const navbar = NavbarData;

  // const footer = await publive.utils.layout.fetchFooter();
  const footer = FooterData;

  return {
    props: {
      publisher: publisher.data,
      post: post.data,
      navbar: navbar.data,
      footer: footer.data,
    },
  };
};

interface HomeProps {
  publisher: Publisher;
  post: Post;
}

const Home = ({ publisher, post }: HomeProps) => {
  return (
    <StaticLayoutRender components={post.custom_entity.layout} />
  );
};

/* ── Sub-components ── */

const Row = ({
  label,
  value,
  mono,
}: {
  label: string;
  value?: string;
  mono?: boolean;
}) => (
  <div className="flex items-baseline justify-between gap-6">
    <dt className="text-[13px] text-[#666]">{label}</dt>
    <dd
      className={`truncate text-[13px] text-[#222] ${mono ? "font-mono text-[12px]" : ""}`}
    >
      {value || <span className="text-[#999]">&mdash;</span>}
    </dd>
  </div>
);

const Card = ({
  href,
  title,
  desc,
}: {
  href: string;
  title: string;
  desc: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group border-b border-r border-[#222]/10 p-6 transition-colors last:border-r-0 hover:bg-[#222]/[0.03] sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
  >
    <h3 className="mb-1.5 text-[14px] font-semibold text-[#222]">
      {title}{" "}
      <span className="inline-block text-[#666] transition-transform group-hover:translate-x-1">
        &rarr;
      </span>
    </h3>
    <p className="text-[13px] leading-relaxed text-[#555]">{desc}</p>
  </a>
);

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <MainLayout publisher={page.props.publisher} navbar={page.props.navbar} footer={page.props.footer}>
      {page}
    </MainLayout>
  );
};

export default Home;
