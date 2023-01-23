//import dynamic from "next/dynamic";
import MainNavigation from "./main-navigation";

// const DynMainNavigation = dynamic(() => import("./main-navigation"), {
//   loading: () => "Loading...",
// });

function Layout(props) {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
