import classes from "./user-profile.module.css";

function UserProfile({ session }) {
  console.log(session);
  return (
    <section className={classes.profile}>
      <p>
        Currently logged as <u>{session.user.email}</u>.<br />
        <br />
        <small>
          Session will expire after 10 minutes of inactivity, at
          <br />
          {new Date(session.expires).toString()}
        </small>
      </p>
    </section>
  );
}

export default UserProfile;
