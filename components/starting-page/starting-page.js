import CodeBlock from "../codeblock/codeblock";
import classes from "./starting-page.module.css";

const sourceApp = `import Layout from "../components/layout/layout";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
export default MyApp;`;

const sourceLogin = `import { getSession } from "next-auth/react";

[...]

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
}`;

const sourceNav = `import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import classes from "./main-navigation.module.css";

function MainNavigation() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <header className={classes.header}>
    
      <Link href="/" aria-current={router.pathname === "/" ? "page" : null}>
        Next Auth
      </Link>

      <nav>
        <ul>
          
          {!session && (
            <li>
              <Link
                href="/login"
                aria-current={router.pathname === "/login" ? "page" : null}
              >
                Login
              </Link>
            </li>
          )}

          {session && (
            <>
              <li>
                <Link
                  href="/profile"
                  aria-current={router.pathname === "/profile" ? "page" : null}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={signOut}>Logout</button>
              </li>
            </>
          )}

        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;`;

function StartingPageContent() {
  return (
    <section className={classes.starting}>
      <hgroup>
        <h1>NextJS authentication</h1>
        <p>with MongoDB and next-auth</p>
      </hgroup>

      <p>
        This is a simple demo project aiming to show how to realize a NextJS
        application able to load some credentials from a MongoDB collection and
        the keep a session until the user performs a logout action.
      </p>

      <p>
        The <code>/pages/_app.js</code> file exports the function
      </p>

      <CodeBlock language="javascript" code={sourceApp} />

      <p>
        The <code>Layout</code> component is wrapped into a
        <code>SessionProvider</code> component, so it's available in all the
        components of the app.
      </p>

      <p>
        The <code>login</code> page can be accessed only when the user is not
        logged in and there is no session available. To check if a session is
        available we run the login page on server side through the
        getServerSideProps function. Since <code>getSession</code> is
        asynchronous we use <code>async/await</code>:
      </p>

      <CodeBlock language="javascript" code={sourceLogin} />

      <p>
        If a session is available the user is redirected to the
        <code>/profile</code> page. The top navigation is condiotnally rendering
        some links wheter the user is logged in or not.
      </p>

      <CodeBlock language="javascript" code={sourceNav} />
    </section>
  );
}

export default StartingPageContent;
