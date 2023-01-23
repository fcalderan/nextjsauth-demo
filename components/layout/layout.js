import MainNavigation from "./main-navigation";

import dynamic from "next/dynamic";

const DynMainNavigation = dynamic(() => import("./main-navigation"), {
  loading: () => "Loading...",
});

function Layout(props) {
  return (
    <>
      <DynMainNavigation />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
