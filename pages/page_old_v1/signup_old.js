import React, { useState } from 'react'
import { useRouter } from 'next/router';
import _, { isNull } from 'lodash';
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Login, Signup } from '../../services';
// import { getUsers, updateDB, updateUserLogin } from '../Redux/actions/UsersAction'
// import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const router = useRouter();
  // const dispatch = useDispatch();
  // const db = useSelector((state) => state.users.db);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [usernameUsed, setUsernameUsed] = useState(false);
  const [emailUsed, setEmailUsed] = useState(false);
  

  useEffect(() => {
    setUsernameUsed(false)
  }, [watch('username')])

  useEffect(() => {
    setEmailUsed(false)
  }, [watch('email')])

  

  function createAccount(data) {
    console.log("createAccount");
    data.type = 'normal'
    Signup(data).then(res => {
      if (res.status !== 200) throw res
      Login(data).then(res2 => {
        if (res2.status !== 200) throw res2
        localStorage.setItem("token", JSON.stringify(res2.data.token));
        router.push('/');
        console.log('res2');
        console.log(res2);
      }).catch(e => {
        console.log('login error ', e)
      })
      console.log('res');
      console.log(res);
    }).catch(e => {
      console.log('error', e)
      if (e.status == 400) {
        if (e.data.message.search('Email') !== -1)
          setEmailUsed(true);
        if (e.data.message.search('Username') !== -1)
          setUsernameUsed(true);
      }
    })

    // db = JSON.parse(localStorage.getItem("db"));

    // if (_.find(db, x => x.username === data.username)) {
    //   setUsernameUsed(true);
    // } else {
    //   setUsernameUsed(false);
    //   if (_.find(db, x => x.email === data.email)) {
    //     setEmailUsed(true);
    //   } else {
    //     setEmailUsed(false);
    //     const lastId = db.length;
    //     const newUser = {
    //       id: lastId,
    //       email: data.email,
    //       password: data.password,
    //       username: data.username,
    //       firstname: data.fname,
    //       lastname: data.lname,
    //     };
    //     db.push(newUser);
    //     dispatch(updateDB(db));
    //     localStorage.setItem("db", JSON.stringify(db));
    //     localStorage.setItem("user", JSON.stringify({
    //       id: lastId, email: data.email, password: data.password, username: data.username, firstname: data.fname,
    //       lastname: data.lname
    //     }));
    //     dispatch(updateUserLogin(lastId));
    //     router.push('/account');
    //   }
    // }
  }

  useEffect(() => {
    // if (!JSON.parse(localStorage.getItem("db"))) {
    //   localStorage.setItem("db", JSON.stringify(db));
    // }
    if (JSON.parse(localStorage.getItem("token"))) {
      router.push('/');
    }
  }, [])

  return (
    <body>
      <div className="global-container">
        <div className="card signup-form">
          <div className="card-body">
            <h1 className="card-title text-center">SIGN UP</h1>
            <div className="card-text">
              <fieldset>
                <form>


                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label htmlFor="firstname" className="form-label">First name</label>
                        <input type="text" className={`form-control ${errors.fname ? 'is-invalid' : ''}`} placeholder="First name" aria-label="First name" {...register('fname')} />
                      </div>
                      <div className="col">
                        <label htmlFor="lastname" className="form-label">Last name</label>
                        <input type="text" className={`form-control ${errors.lname ? 'is-invalid' : ''}`} placeholder="Last name" aria-label="Last name" {...register('lname')} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className={`form-control ${(errors.username || usernameUsed) && 'is-invalid'}`} id="username" placeholder="username"
                      {...register('username',
                        {
                          required: { value: true, message: '' },
                          minLength: { value: 5, message: 'At least 5 characters.' },
                          pattern: { value: /^[a-zA-Z0-9]+$/, message: 'Wrong pattern' }
                        })} />
                    <div id="validationServer03Feedback" className="invalid-feedback">
                      {errors.username?.message}
                    </div>
                    {
                      usernameUsed &&
                      <div id="isTaken">
                        Username is already taken.
                      </div>
                    }
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className={`form-control ${(errors.email || emailUsed) ? 'is-invalid' : ''}`} id="email" placeholder="name@example.com" 
                    {...register('email',
                      {
                        required: { value: true },
                        pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Please enter a valid email. (name@example.com)' },
                      })} />
                    <div id="validationServer03Feedback" className="invalid-feedback">
                      {errors.email?.message}
                    </div>
                    {
                      emailUsed &&
                      <div id="isTaken">
                        Email is already taken.
                      </div>
                    }
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" placeholder="********" 
                    {...register('password',
                      {
                        required: true,
                        minLength: { value: 8, message: 'At least 8 characters.' },
                        pattern: { value: /^[a-zA-Z0-9]+$/, message: 'Wrong pattern' }
                      })} />
                    <div id="validationServer03Feedback" className="invalid-feedback">
                      {errors.password?.message}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-password" className="form-label">Confirm Password</label>
                    <input type="password" className={`form-control ${errors.confirmPass ? 'is-invalid' : ''}`} id="cf-password" placeholder="********" 
                    {...register('confirmPass',
                      {
                        required: true,
                        validate: value => value === watch("password") || 'Passwords are not identical. Try again.'
                      })} />
                    <div id="validationServer03Feedback" className="invalid-feedback">
                      {errors.confirmPass?.message}
                    </div>
                  </div>
                </form>
                <form className="was-validated">
                  <div className="form-group">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="validationFormCheck1" {...register('agreeTerms',
                        {
                          required: { value: true, message: 'You must agree before submitting.' },
                        })} required />
                      <label className="form-check-label" htmlFor="validationFormCheck1">I Agree to terms and conditions</label>
                      <div className="invalid-feedback">{errors.agreeTerms?.message}</div>
                    </div>

                    <button type="button" className="mb-3 btn btn-primary btn-block w-100" onClick={handleSubmit(createAccount)}>
                      Sign Up
                    </button>
                    <div className="signin-signup">
                      have an account ? <Link href='/signin'><a>Sign in</a></Link>
                    </div>
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

export default SignUp
