import StartingPageContent from "../components/starting-page/starting-page";

function HomePage() {
  return <StartingPageContent />;
}

export default HomePage;

export async function getStaticProps(context) {
  return {
    props: {},
    revalidate: 1000, // In seconds
  };
}
