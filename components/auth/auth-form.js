import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import classes from "./auth-form.module.css";
import { useRouter } from "next/router";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const router = useRouter();

  const [isLogging, setIsLogging] = useState(0);
  const [loginError, setLoginError] = useState("");

  async function submitHandler(event) {
    event.preventDefault();
    setIsLogging(1);
    setLoginError("");

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    setIsLogging(0);

    if (result.ok) {
      router.replace("/profile");
    } else {
      setLoginError(result.error);
    }
  }

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler} novalidate>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="nextemail"
            ref={emailInputRef}
          />{" "}
          <i className={classes.credentials}>(nextjs@auth.com)</i>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="nextpassword"
            ref={passwordInputRef}
          />
          <i className={classes.credentials}>(nextjs)</i>
        </div>
        <div className={classes.actions}>
          <button>Login</button>

          <div aria-live="polite">
            {isLogging === 1 && <p className={classes.status}>Loading...</p>}
            {loginError !== "" && (
              <p className={classes.error}>{loginError}. Try again.</p>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
