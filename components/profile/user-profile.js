import classes from "./user-profile.module.css";

function UserProfile({ session }) {
  return (
    <section className={classes.profile}>
      <p>
        Currently logged as <u>{session.user.email}</u>.
      </p>
    </section>
  );
}

export default UserProfile;
