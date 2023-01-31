import { useState, useRef } from "react";
import { useS3Upload } from "next-s3-upload";
import classes from "./create-form.module.css";

function CreateForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const imageInputRef = useRef();

  const [isLogging, setIsLogging] = useState(0);
  const [loginError, setLoginError] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  //let { uploadToS3 } = useS3Upload();

  async function createUser(email, password, image) {
    console.log(image.current.files[0]);
    const S3response = await uploadToS3(image.current.files[0]);
    console.log(S3response);
    const S3Url = S3response.url;
    console.log(S3Url);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, S3Url }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    setImageUrl(S3Url);

    return data;
  }

  async function submitHandler(event) {
    event.preventDefault();
    setIsLogging(1);
    setLoginError("");

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredImage = imageInputRef;

    try {
      const result = await createUser(
        enteredEmail,
        enteredPassword,
        enteredImage
      );
      console.log(result);
    } catch (error) {
      console.log("Catch ", error);
    }

    setIsLogging(0);
  }

  return (
    <section className={classes.auth}>
      <h1>Create User</h1>
      <form onSubmit={submitHandler} noValidate>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="nextemail" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="nextpassword"
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Select an image</label>
          <input type="file" id="image" name="nextimage" ref={imageInputRef} />
        </div>

        <div className={classes.actions}>
          <button>Create</button>

          <div aria-live="polite">
            {isLogging === 1 && <p className={classes.status}>Loading...</p>}
            {loginError !== "" && (
              <p className={classes.error}>{loginError}. Try again.</p>
            )}
          </div>
        </div>
      </form>

      {imageUrl && <img src={imageUrl} />}
    </section>
  );
}

export default CreateForm;
