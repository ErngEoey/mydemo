import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Login, Signup } from '../Services/login.service';
import { GoogleLogin, GoogleLogout, useGoogleLogin } from "react-google-login";
import ReactDOM from 'react-dom';

// import { getUsers, updateDB, updateUserLogin } from '../Redux/actions/UsersAction';

const SignIn = () => {
  const dispatch = useDispatch();
  // const db = useSelector((state) => state.users.db);
  const router = useRouter();
  const { register: signin, handleSubmit, formState: { errors } } = useForm();
  const [failSignIn, setFailSignIn] = useState(false);
  let clientId;

  function checkAccount(data, type) {
    console.log(data);
    data.type = type;
    Login(data).then(res => {
      console.log(res);
      if (res.status !== 200) throw res
      const user = res.data.token;
      localStorage.setItem("token", JSON.stringify(user));
      router.push('/landing');
      console.log('res');
      console.log(res);
    }).catch(e => {
      console.log('login error ', e)
      setFailSignIn(true)
    })
    // db = JSON.parse(localStorage.getItem("db"));
    // const index = db.findIndex(x => (x.email === data.email || x.username === data.email) && x.password === data.password);
    // console.log(index + "erng");

    // if (index > -1) {
    //   dispatch(updateUserLogin(index));
    //   localStorage.setItem("user", JSON.stringify(JSON.parse(localStorage.getItem("db"))[index]));
    //   router.push('/account');
    // } else {
    //   setFailSignIn(true);
    // }
  }

  useEffect(() => {
    // if (!JSON.parse(localStorage.getItem("db"))) {
    //   localStorage.setItem("db", JSON.stringify(db));
    // }
    if (JSON.parse(localStorage.getItem("token"))) {
      router.push('/landing');
    }
  }, [])

  const responseGoogle = (response) => {
    console.log(response)
    if (response.profileObj) {
      const data = {
        email: response.profileObj.email,
        fname: response.profileObj.givenName,
        lname: response.profileObj.familyName,
        googleId: response.profileObj.googleId,
        type: 'google'
      }
      Signup(data).then(res => {
        if (res.status !== 200) throw res
        console.log(res)
        checkAccount(data, 'google')
      }).catch(e => {
        console.log('error', e)
        checkAccount(data, 'google')
      })
    }

  }


  return (
    <body>
      <div className="global-container">
        <div className="card signin-form">
          <div className="card-body">
            <h1 className="card-title text-center">SIGN IN</h1>
            <div className="card-text">
              <fieldset>
                <form>
                  {
                    failSignIn &&
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                      <i className="fas fa-exclamation-triangle icon-alert"></i>
                      <span className="ms-2">An error occurred! Try again.</span>
                    </div>
                  }

                  <div className="hstack gap-3 social-container">
                    <GoogleLogin
                      clientId="718300339229-9v9iqu9o2mmv9hhaef1pl9ur1k1kchnu.apps.googleusercontent.com"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}

                      render={renderProps => (
                        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='google'>
                          <span className="logo-wrapper"><img src="/img/logo-google.png" /></span>
                          <span className="btn-label">Sign in with Google</span>
                        </button>
                      )}
                    >
                    </GoogleLogin>
                    <div>
                      <button className="facebook">
                        <span className="logo-wrapper"><img src="/img/logo-facebook.png" /></span>
                        <span className="btn-label">Sign in with Facebook</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-line">
                    <span>Or</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Username or Email</label>
                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" {...signin('email',
                      {
                        required: true
                      })} />
                    <div id="validationServer05Feedback" className="invalid-feedback">{errors.email?.message}</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className={`form-control ${errors.password || errors.email ? 'is-invalid' : ''}`} id="password" {...signin('password',
                      {
                        required: true
                      })} />
                    <div id="validationServer05Feedback" className="invalid-feedback">{errors.password?.message}</div>
                    <a href="#" style={{ float: 'right', fontSize: 13 }}>Forgot Password?</a>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <button type="button" className="mb-3 btn btn-primary btn-block w-100" onClick={handleSubmit((data) => checkAccount(data, 'normal'))}>
                    Sign In
                  </button>
                  <div className="signin-signup">
                    Do you not have an account ? <Link href='/signup'><a>Signup</a></Link>
                  </div>

                </form>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default SignIn