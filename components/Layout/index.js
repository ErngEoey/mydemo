import { useRouter } from "next/router";
import React from "react";
import Header from "../Header";

const Layout = (props) => {
  const path = useRouter();
  console.log(path.asPath);
  return (
    <>
      {path.asPath != "/signin" && path.asPath != "/signup" 
      && path.asPath != "/forgot_password" && path.asPath != "/signup_success" 
      && path.asPath != "/password_checkEmail" && path.asPath != "/reset_password" 
      && path.asPath != "/reset_password_success" && path.asPath != "/" && path.asPath != "/profile_setting" 
      && path.asPath != "/verify_email"
      && <Header />}
      {props.children}
    </>
  );
};

export default Layout;