import AuthForm from "../components/auth/auth-form";
import { getSession } from "next-auth/react";
import Head from "next/head";

function LoginPage() {
  return;
  <>
    <Head>
      <title>Login page</title>
      <meta name="description" content="Login page with NextJS" />
    </Head>
    <AuthForm />
  </>;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default LoginPage;
