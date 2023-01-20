import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import classes from "./main-navigation.module.css";

function MainNavigation() {
  const router = useRouter();
  const { data: session, status } = useSession();
  //console.log(status, session);

  return (
    <header className={classes.header}>
      <Link href="/" aria-current={router.pathname === "/" ? "page" : null}>
        NextJS Auth
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

export default MainNavigation;
