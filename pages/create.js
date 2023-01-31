import CreateForm from "../components/auth/create-form";
import { getSession } from "next-auth/react";
import Head from "next/head";

function CreatePage() {
  return (
    <>
      <Head>
        <title>Create new user</title>
        <meta name="description" content="Create a new user with NextJS" />
      </Head>
      <CreateForm />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session || (session && session.user.writepermission !== "1")) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default CreatePage;
