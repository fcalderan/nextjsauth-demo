import { useState, useRef, use } from "react";
import { signIn } from "next-auth/react";
import classes from "./auth-form.module.css";
import { useRouter } from "next/router";

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authSourceInputRef = useRef();
  const router = useRouter();

  const [isLogging, setIsLogging] = useState(0);
  const [loginError, setLoginError] = useState("");

  async function submitHandler(event) {
    event.preventDefault();
    setIsLogging(1);
    setLoginError("");

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredAuthSource = authSourceInputRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
      source: enteredAuthSource,
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
      <form onSubmit={submitHandler} noValidate>
        <div className={classes.control}>
          <label htmlFor="authsource">Source</label>
          <select id="authsource" name="authsource" ref={authSourceInputRef}>
            <option value="mongodb">MongoDB</option>
            <option value="contentful">Contentful</option>
          </select>
        </div>
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
