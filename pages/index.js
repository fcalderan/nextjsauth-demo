import StartingPageContent from "../components/starting-page/starting-page";
import Head from "next/head";

function HomePage() {
  return (
    <>
      <Head>
        <title>NextJS ad Next-auth demo site</title>
        <meta
          name="description"
          content="A simple demo site showing how to realize an authenticated area with NextJS"
        />
      </Head>
      <StartingPageContent />;
    </>
  );
}

export default HomePage;
