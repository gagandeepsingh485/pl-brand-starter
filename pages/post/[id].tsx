import MainLayout from "@/component/layout";
import { APIService } from "@/lib/api";
import { StaticLayoutRender } from "@/lib/FieldMap";
import { GetServerSidePropsContext } from "next";
import { Post, Publisher } from "publive-cms-sdk";
import React from "react";
import { FooterData, HomePageData, NavbarData } from "@/lib/data/page";

// Draft / Preview Route for a single post
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params?.id as string;
  if (!id || isNaN(parseInt(id))) {
    return {
      notFound: true
    }
  }

  const publive = new APIService().getSDK();
  const publisher = await publive.auth.fetchPublisher();

  const identifiedPost = await publive.content.identify(`/post/${id}`);

  if (!identifiedPost.data || !identifiedPost.data.content) {
    return {
      notFound: true,
    };
  }

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

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <MainLayout publisher={page.props.publisher} navbar={page.props.navbar} footer={page.props.footer}>
      {page}
    </MainLayout>
  );
};

export default Home;
