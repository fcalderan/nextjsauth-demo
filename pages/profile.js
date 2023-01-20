import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/react";

function ProfilePage({ session }) {
  return <UserProfile session={session} />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
