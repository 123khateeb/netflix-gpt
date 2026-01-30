import { Link } from "react-router-dom";
import Header from "./Header";
import "./Login.css";
import { useState } from "react"; 

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () =>{
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div className="login_main_div">
      <Header />
      <div className="login_form_outter_div">
        <h1 className="login_heading">
          Enter your info to  {isSignInForm? "Sign In": "Sign Up"}
        </h1>
        {isSignInForm && <p className="login_sub_heading">Or get started with a new account.</p>}
        <form action="">
            {!isSignInForm && (<input type="text" placeholder="Full Name"/>)}
            {!isSignInForm && (<input type="number" placeholder="Phone Number"/>)}
            <input type="text" placeholder="Email"/>
            
            {/* <p className="login_error">Please enter a valid email or mobile number.</p> */}
            <input type="password" placeholder="Password"/>
            <button className="submit_button">{isSignInForm? "sign in": "sign Up"}</button>
        </form>

        <p className="login_bottom_text"> {isSignInForm?"New to NetFlix ?": "Already Registerd ?"} <span className="signup_link" onClick={toggleSignInForm}>{isSignInForm?"Sign Up Now":"Sign In Now"}</span></p>
      </div>
    </div>
  );
};

export default Login;
