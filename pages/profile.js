import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/react";
import Head from "next/head";

function ProfilePage({ session }) {
  return (
    <>
      <Head>
        <title>Profile page</title>
        <meta name="description" content="Profile page with NextJS" />
      </Head>
      <UserProfile session={session} />;
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
