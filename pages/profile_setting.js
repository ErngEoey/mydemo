import Link from 'next/link'
import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { getProfile } from '../Services/profile.service';
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { updateProfile } from '../Services/profile.service';

export default function Profile_setting() {
  const queryClient = useQueryClient()
  const { register: setting, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const {
    register: setPass,
    formState: { errors: errorPass },
    handleSubmit: handleSubmitPass,
    watch: watchPass,
    setValue: setValue2
  } = useForm();

  const router = useRouter();
  const [token, setToken] = useState(undefined);
  const [usernameUsed, setUsernameUsed] = useState(false);
  const [emailUsed, setEmailUsed] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [samePass, setSamePass] = useState(false);
  const [google, setGoogle] = useState(false);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token")));
    if (!JSON.parse(localStorage.getItem("token"))) {
      router.push('/signin')
    }
  }, [])

  const { data, isLoading, isError } = useQuery(token ? "getUser" : undefined, token ? () => getProfile(token?.access_token) : undefined)

  // console.log("v-- get data user --v");
  // console.log(data);

  useEffect(() => {
    if (data?.data.type_of_person_id == 'google') {
      setGoogle(true);
    }
  }, [data])

  async function updateAccount(update, type) {
    console.log('updateAccount')
    console.log(update)
    console.log(type)
    let data = {}

    if (type == 'username') {
      data.username = update.username
    } else if (type == 'fname') {
      data.fname = update.fname
    } else if (type == 'lname') {
      data.lname = update.lname
    } else if (type == 'email') {
      data.email = update.email
    } else if (type == 'password') {
      data.currentPass = update.currentPass;
      data.password = update.password;
      data.confirmPass = update.confirmPass;
    }
    console.log('data for update');
    console.log(data);
    updateProfile(token?.access_token, data).then(res => {
      console.log(res)
      if (res.status !== 200) throw res
      queryClient.invalidateQueries('getUser')

      if (type == 'username') {
        console.log('click username')
        document.getElementById("btnUsername").click();
      }

      if (type == 'fname') {
        document.getElementById("btnFname").click();
      }

      if (type == 'lname') {
        document.getElementById("btnLname").click();
      }

      if (type == 'email') {
        document.getElementById("btnEmail").click();
      }

      if (update.currentPass != update.password) {
        document.getElementById("btnPass").click();
      }

    }).catch(e => {
      console.log('error', e)
      if (e.status == 400) {
        if (e.data.message.search('Email') !== -1)
          setEmailUsed(true);
        if (e.data.message.search('Username') !== -1)
          setUsernameUsed(true);
        if (e.data.message.search('current') !== -1)
          setWrongPass(true);
        if (e.data.message.search('Same') !== -1)
          setSamePass(true);
      }
    })
  }

  useEffect(() => {
    setUsernameUsed(false)
  }, [watch('username')])

  useEffect(() => {
    setEmailUsed(false)
  }, [watch('email')])

  useEffect(() => {
    setWrongPass(false)
  }, [watchPass('currentPass')])

  useEffect(() => {
    setSamePass(false)
  }, [watchPass('password')])

  function test() {

  }

  return (
    <body>
      {isLoading ? <></> : <> <main className="side-profile">
        <div className="container">
          <div className="col md-4">
            <div className="shadow card mb-3 mt-3 content">
              <h1 className="m-3 pt-3">Profile Setting</h1>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <h5>Username
                    </h5></div>
                  <div className="col-md-9 text-secondary">
                    <p className="edit-profile">
                      <span>{data?.data?.username}</span>
                      <a id='btnUsername' onClick={() => { setValue('username', data?.data?.username), errors.username = null }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseUsername" aria-expanded="false" aria-controls="collapseUsername">
                        <i className="fas fa-pen icon-edit-username" />
                      </a>
                    </p>
                    <div className="collapse" id="collapseUsername">
                      <div className="card card-body">
                        <div className="mb-3 form-group">
                          <label htmlFor="username" className="form-label">Username</label>
                          <input defaultValue={data?.data?.username} type="text" className={`form-control ${(errors.username || usernameUsed) && 'is-invalid'}`} id="username" {...setting('username',
                            {
                              required: true,
                              maxLength: { value: 255, message: 'Maximum at 255 characters.' },
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
                        <div className="hstack gap-3 edit-information">
                          <button type="submit" className="btn btn-primary" onClick={handleSubmit((data) => updateAccount(data, 'username'))}>Save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-3">
                    <h5>Firstname</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    <p className="edit-profile">
                      <span>{data?.data?.firstname}</span>
                      <a id='btnFname' onClick={() => { setValue('fname', data?.data?.firstname), errors.fname = null }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFirstname" aria-expanded="false" aria-controls="collapseFirstname">
                        <i className="fas fa-pen icon-edit-firstname" />
                      </a>
                    </p>
                    <div className="collapse" id="collapseFirstname">
                      <div className="card card-body">
                        <div className="mb-3 form-group">
                          <label htmlFor="firstname" className="form-label">Firstname</label>
                          <input defaultValue={data?.data?.firstname} type="text" className={`form-control ${errors.fname ? 'is-invalid' : ''}`} id="firstname" {...setting('fname',
                            { required: true }
                          )} />
                        </div>
                        <div className="hstack gap-3 edit-information">
                          <button type="submit" className="btn btn-primary" onClick={handleSubmit((data) => updateAccount(data, 'fname'))}>Save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-3">
                    <h5>Lastname</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    <p className="edit-profile">
                      <span>{data?.data?.lastname}</span>
                      <a id='btnLname' onClick={() => { setValue('lname', data?.data?.lastname), errors.lname = null }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseLastname" aria-expanded="false" aria-controls="collapseLastname">
                        <i className="fas fa-pen icon-edit-lastname" />
                      </a>
                    </p>
                    <div className="collapse" id="collapseLastname">
                      <div className="card card-body">
                        <div className="mb-3 form-group">
                          <label htmlFor="lastname" className="form-label">Lastname</label>
                          <input defaultValue={data?.data?.lastname} type="text" className={`form-control ${errors.lname ? 'is-invalid' : ''}`} id="lastname" {...setting('lname',
                            { required: true }
                          )} />
                        </div>
                        <div className="hstack gap-3 edit-information">
                          <button type="submit" className="btn btn-primary" onClick={handleSubmit((data) => updateAccount(data, 'lname'))}>Save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-3">
                    <h5>Email Address</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    <p className="edit-profile">
                      <span>{data?.data?.email}</span>
                      {
                        google == false &&
                        <a id='btnEmail' onClick={() => { setValue('email', data?.data?.email), errors.email = null }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseEmail" aria-expanded="false" aria-controls="collapseEmail">
                          <i className="fas fa-pen icon-edit-email" />
                        </a>
                      }
                    </p>
                    <div className="collapse" id="collapseEmail">
                      <div className="card card-body">
                        <div className="mb-3 form-group">
                          <label htmlFor="email" className="form-label">Email Address</label>
                          <input defaultValue={data?.data?.email} type="email" className={`form-control ${(errors.email || emailUsed) ? 'is-invalid' : ''}`} id="email" {...setting('email',
                            {
                              required: true,
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
                        <div className="hstack gap-3 edit-information">
                          <button type="submit" className="btn btn-primary" onClick={handleSubmit((data) => updateAccount(data, 'email'))}>Save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                {
                  google == false &&
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Password</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      <p className="edit-profile">
                        <span>*************</span>
                        <a id='btnPass' onClick={() => {
                          setValue2('currentPass', null),
                            setValue2('password', null),
                            setValue2('confirmPass', null),
                            setWrongPass(false),
                            errorPass.currentPass = null,
                            errorPass.password = null,
                            errorPass.confirmPass = null
                        }} type="button" data-bs-toggle="collapse" data-bs-target="#collapsePassword" aria-expanded="false" aria-controls="collapsePassword">
                          <i className="fas fa-pen icon-edit-password" />
                        </a>
                      </p>
                      <div className="collapse" id="collapsePassword">
                        <div className="card card-body">
                          <div className="mb-3 form-group">
                            <label htmlFor="password" className="form-label">Current password</label>
                            <input type="password" className={`form-control ${errorPass.currentPass || wrongPass ? 'is-invalid' : ''}`} id="password" {...setPass('currentPass',
                              {
                                required: true
                              })} />
                            <div id="validationServer05Feedback" className="invalid-feedback">
                              {errorPass.currentPass?.message}
                            </div>
                            {
                              wrongPass &&
                              <div id="isTaken">
                                Current password incorrect.
                              </div>
                            }
                          </div>
                          <div className="mb-3 form-group">
                            <label htmlFor="password" className="form-label">New Password</label>
                            <input type="password" className={`form-control ${errorPass.password || samePass ? 'is-invalid' : ''}`} id="password" {...setPass('password',
                              {
                                required: true,
                                minLength: { value: 8, message: 'At least 8 characters.' },
                                pattern: { value: /^[a-zA-Z0-9]+$/, message: 'Wrong pattern' }
                              })} />
                            <div id="validationServer05Feedback" className="invalid-feedback">
                              {errorPass.password?.message}
                            </div>
                            {
                              samePass &&
                              <div id="isTaken">
                                Do not use the same password as the current password.
                              </div>
                            }
                          </div>
                          <div className="mb-3 form-group">
                            <label htmlFor="password" className="form-label">Confirm New Password</label>
                            <input type="password" className={`form-control ${errorPass.confirmPass ? 'is-invalid' : ''}`} id="password" {...setPass('confirmPass',
                              {
                                required: true,
                                validate: value => value === watchPass("password") || 'New Passwords are not identical. Try again.'
                              })} />
                            <div id="validationServer05Feedback" className="invalid-feedback">
                              {errorPass.confirmPass?.message}
                            </div>
                          </div>
                          <div className="hstack gap-3 edit-information">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmitPass((data) => updateAccount(data, 'password'))}>Save</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {
                  google == false &&
                  <hr />
                }
              </div>
            </div>
          </div>
        </div>
      </main></>}

    </body>
  )
}
