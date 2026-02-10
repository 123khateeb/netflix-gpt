import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Login.css";
import { useRef, useState } from "react"; 
import { checkValidData } from "../utils/validate.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";

const Login = () => {
  // use State Hooks
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  //use navigate hook 

  const navigate = useNavigate();
  
  // use Ref Hooks
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const number = useRef(null);

  //Toggle Sign In/Sign Up form
  const toggleSignInForm = () =>{
    setIsSignInForm(!isSignInForm);
  }

  //handle Submit
  const handleButtonClick = () =>{
    
    // Validate the form data
    const message = checkValidData(email.current.value, password.current.value, name.current?.value, number.current?.value);
    setErrorMessage(message);

    //If error then stop
    if(message) return;

    //create sihn in or sign up logic

    if (!isSignInForm){
      //here Sighnup logic

      createUserWithEmailAndPassword(auth, email.current.value, password.current.value,)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value, photoURL: "https://lh3.googleusercontent.com/a/ACg8ocKM62JLiHG-bdQDetA0PI08AIbLIKfpIBj0rd4sOJGd3WE-y_wF=s96-c"
            }).then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL} = auth.currentUser;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName , photoURL: photoURL}));
              // navigate("/")
              setIsSignInForm(true)
            }).catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
          // ..
        });


    }else{
      //Here Sign in logic

      signInWithEmailAndPassword(auth, email.current.value, password.current.value,)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/browse")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " - " + errorMessage);
      });
    }
  }
  return (
    <div className="login_main_div">
      <Header isLoginPage={true}/>
      <div className="login_form_outter_div">
        <h1 className="login_heading">
          Enter your info to  {isSignInForm? "Sign In": "Sign Up"}
        </h1>
        {isSignInForm && <p className="login_sub_heading">Or get started with a new account.</p>}
        {errorMessage && <p className="login_error">{errorMessage}</p>}
        <form action="" onSubmit={(e)=>{e.preventDefault()}}>
            {!isSignInForm && (<input ref={name} type="text" placeholder="Full Name"/>)}
            {!isSignInForm && (<input ref={number} type="number" placeholder="Phone Number"/>)}
            <input ref={email} type="text" placeholder="Email"/>
            <input ref={password} type="password" placeholder="Password"/>
            <button className="submit_button" onClick={handleButtonClick}>{isSignInForm? "sign in": "sign Up"}</button>
        </form>

        <p className="login_bottom_text"> {isSignInForm?"New to NetFlix ?": "Already Registerd ?"} <span className="signup_link" onClick={toggleSignInForm}>{isSignInForm?"Sign Up Now":"Sign In Now"}</span></p>
      </div>
    </div>
  );
};

export default Login;
