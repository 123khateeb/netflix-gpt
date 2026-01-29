import React from "react";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  return (
    <div className="login_main_div">
      <Header />
      <div className="login_form_outter_div">
        <h1 className="login_heading">
          Enter your info to sign in
        </h1>
        <p className="login_sub_heading">Or get started with a new account.</p>
        <form action="">
            <input type="text" placeholder="Email or Mobile Number"/>
        </form>
      </div>
    </div>
  );
};

export default Login;
