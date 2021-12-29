import { useRouter } from "next/router";
import React from "react";
import Header from "../Header";

const Layout = (props) => {
  const path = useRouter();
  console.log(path.asPath);
  return (
    <>
      {path.asPath != "/signin" && path.asPath != "/signup" && <Header />}
      {props.children}
    </>
  );
};

export default Layout;