import classes from "./user-profile.module.css";
import { useState } from "react";
import { Image } from "next/image";

async function getProfileImage(key) {
  const uriResponse = await fetch(`/api/s3-generate-url?key=${key}`);
  const { S3TempUrl } = await uriResponse.json();
  return S3TempUrl;
}

function UserProfile({ session }) {
  console.log(session);
  const [imageUrl, setImageUrl] = useState("");

  if (session.user.s3key) {
    getProfileImage(session.user.s3key).then((url) => {
      setImageUrl(url);
    });
  }

  return (
    <section className={classes.profile}>
      <p>
        Currently logged as <u>{session.user.email}</u>.<br />
        <br />
        <small>
          Session will expire after 30 minutes of inactivity, at
          <br />
          {new Date(session.expires).toString()}
        </small>
      </p>

      {imageUrl && (
        <p>
          <img src={imageUrl} />
        </p>
      )}
    </section>
  );
}

export default UserProfile;
