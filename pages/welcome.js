import React, { useState } from 'react'
import { useRouter } from 'next/router';
import _ from 'lodash';
import { getUsers, updateDB, updateUserLogin } from '../Redux/actions/UsersAction'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from 'axios';

const Welcome = () => {
  const dispatch = useDispatch();
  const db = useSelector((state) => state.users.db);

  function signUpPage() {
    container.classList.add("right-panel-active");
  }

  function signInPage() {
    container.classList.remove("right-panel-active");
  }

  const router = useRouter();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [newUsername, setNewUsername] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [fname, setFName] = useState('First Name');
  const [lname, setLName] = useState('Last Name');

  function checkAccount() {
    // if (db.find(x => x.id === id) && db.find(x => x.password === password))
    //   router.push('/account');

    // if (_.find(props.users.db, x => x.email === email) && _.find(props.users.db, x => x.password === password)) {
    //   dispatch(userLogin(0));
    //   router.push('/account');
    // }

    db = JSON.parse(localStorage.getItem("db"));
    const index = db.findIndex(x => (x.email === username || x.username === username) && x.password === password);
    console.log(index + "erng");

    if (index > -1) {
      dispatch(updateUserLogin(index));
      localStorage.setItem("user", JSON.stringify(JSON.parse(localStorage.getItem("db"))[index]));
      router.push('/account');
    }
  }

  function createAccount() {
    console.log("createAccount");
    if (_.find(db, x => x.username === newUsername)) {
      alert("This username has already been used.");
    } else if (_.find(db, x => x.email === newEmail)) {
      alert("This email has already been used.");
    } else {
      const lastId = db.length;
      const newUser = {
        id: lastId,
        email: newEmail,
        password: newPassword,
        username: newUsername,
        firstname: fname,
        lastname: lname,
      };
      db.push(newUser);
      dispatch(updateDB(db));
      localStorage.setItem("db", JSON.stringify(db));
      localStorage.setItem("user", JSON.stringify({
        id: lastId, email: newEmail, password: newPassword, username: newUsername, firstname: fname,
        lastname: lname
      }));
      dispatch(updateUserLogin(lastId));
      router.push('/account');
    }
  }

  function validate() {
    if (newUsername != null && newUsername != "" &&
      newEmail != null && newEmail != "" &&
      newPassword != null && newPassword != "" &&
      confirmPassword != null && confirmPassword != "") {
      if (newPassword === confirmPassword)
        createAccount();
      else
        alert("Passwords do not match, try again.");
    }
    else
      alert("Fill out the information completely.");
  }

  useEffect(() => {
    db = JSON.parse(localStorage.getItem("db"));
    if (!JSON.parse(localStorage.getItem("db"))) {
      localStorage.setItem("db", JSON.stringify(db));
    }
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push('/account');
    }
  }, [])

  return (
    <div className="container" id="container">
      <div className="form-container sign-up-container">
        <form>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Username" onChange={(e) => setNewUsername(e.target.value)} />
          <input type="email" placeholder="Email" onChange={(e) => setNewEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setNewPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type="button" name="button2" onClick={validate}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <input type="text" placeholder="Username or Email" onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <a href="#">Forgot your password?</a>
          <button type="button" name="button1" onClick={checkAccount}>Sign In</button>
        </form>


      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn" onClick={() => signInPage()}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp" onClick={() => signUpPage()}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
