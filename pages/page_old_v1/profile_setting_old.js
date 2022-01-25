// import styles from '../assets/style.module.css'
import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { getProfile, updateProfile } from '../../services';
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function Profile_setting() {
  const queryClient = useQueryClient()
  const { register: setting, handleSubmit, formState: { errors }, watch, setValue, clearErrors, setError } = useForm();
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
  const [google, setGoogle] = useState(false);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token")));
    if (!JSON.parse(localStorage.getItem("token"))) {
      router.push('/signin')
    }
  }, [])

  const { data, isLoading, isError } = useQuery(token ? "getUser" : undefined, token ? () => getProfile(token?.access_token) : undefined)

  console.log("v-- get data user --v");
  console.log(data);

  useEffect(() => {
    if (data?.data?.data?.type_of_person_id == 'google') {
      setGoogle(true);
    }
  }, [data])

  useEffect(() => {
    clearErrors('fname')
  }, [watch('fname')])

  async function updateAccount(update, type) {
    console.log('updateAccount')
    console.log(update)
    console.log(type)
    let data = {}

    if (type == 'username') {
      data.username = update.username
    } else if (type == 'fname') {
      if (!update.fname) {
        setError('fname')
        return
      }
      data.fname = update.fname
    } else if (type == 'lname') {
      if (!update.lname) {
        setError('lname')
        return
      }
      data.lname = update.lname
    } else if (type == 'email') {
      data.email = update.email
    } else if (type == 'password') {
      data.currentPass = update.currentPass;
      data.password = update.password;
      data.confirmPass = update.confirmPass;
    }
    console.log('v--data for update--v');
    console.log(data);
    updateProfile(token?.access_token, data).then(res => {
      console.log(res)
      if (res.status !== 200) throw res
      queryClient.invalidateQueries('getUser')

      if (type == 'username') {
        var toastLive = document.getElementById('Toastbtnusername');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
        document.getElementById("btnUsername").click();
      }

      if (type == 'fname') {
        var toastLive = document.getElementById('Toastbtnfname');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
        document.getElementById("btnFname").click();
      }

      if (type == 'lname') {
        var toastLive = document.getElementById('Toastbtnlname');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
        document.getElementById("btnLname").click();
      }

      if (type == 'email') {
        var toastLive = document.getElementById('Toastbtnemail');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
        document.getElementById("btnEmail").click();
      }

      if (update.currentPass != update.password) {
        var toastLive = document.getElementById('Toastbtnpassword');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
        document.getElementById("btnPass").click();
      }

    }).catch(e => {
      console.log('error', e.response)
      console.log('error', e.status)
      if (e.status == 400) {
        if (e.data.message.search('Email') !== -1)
          setEmailUsed(true);
        if (e.data.message.search('Username') !== -1)
          setUsernameUsed(true);
        if (e.data.message.search('current') !== -1)
          setWrongPass(true);
      } else if (e.status == 401) {
        localStorage.removeItem("token")
      }
      else {
        var toastLive = document.getElementById('ToastError');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
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





  return (
    <div>
      <style jsx>{` 
      
.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-items: center;
    color: white;
}
.header-icon{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
/*.lang-button {
    background-color: whitesmoke;
    border-radius: 1rem;
    padding: .25rem .5rem .25rem .5rem;
}*/
.user-menu{
    position: relative;
}
.user-menu .wrap-menu{
    display: none;
    position: absolute;
    top: 1.5rem;
    right: 0;
    padding-top: 1rem;
}
.user-menu .wrap-menu .menu-content {
    background-color: rgb(255, 255, 255);
    color: black;
    padding: .5rem;
    border-radius: .25rem;
    width: 10rem;
}
.user-menu:hover .wrap-menu{
    display: block;
}
.icon-menu {
    display: flex;
}
.icon-content {
    margin-top: .75rem;
}
.text-content {
    margin-bottom: .5rem;
}
/*้header end*/
.side-profile .card-body{
    width: 100%;
}
.card{
    display: flex;
    flex-direction: column;
}
a.text-content {
    color: black;
    text-decoration: none;
}

.shadow.card {
    position: inherit;
}
.input-group{
    display: block;
}
.form-control.changes-images{
    position: absolute;
    z-index: -1;
    top: 0;
	width: 0;
	height: 0;
	visibility: hidden;
}
.input-group-text-changes-images{
    width: 155px;
    height: 40px;
    background-color: #1a73e8;
    border-radius: 4px;
    padding: .5rem;
}
button.btn-light{
    color: #1a73e8;
    width: 100px;
    height: 40px;
    margin-right: .5rem;
}
button.btn-primary{
    width: 100px;
    height: 40px;
}
button.btn-light.icon-delete{
    border: thin solid #cecece;
    width: 150px;
    height: 40px;
    margin-right: .5rem;
}
button.btn-primary.icon-change{
    width: 150px;
    height: 40px;
}
button.edit{
    background-color: #3764B9;
    border: thin solid #3764B9;
}
h3.text-images{
    font-size: 20px;
    color: #3764B9;
}
.edit-profile{
    display: flex;
    justify-content: space-between;
}
.content{
    background-color: white;
}
.sidebar{
    background-color: white;
    color: white;
    height: 100%;
}
.sidebar a{
    margin-left: 10px;
    display: block;
    color: white;
    padding-bottom: 10px;
    font-size: 30px;
    text-decoration: none;
}
.text-profile-picture{
    color: black;
}
.fas.fa-check-circle{
  color: rgb(25, 185, 3);
}
.card-body {
  flex: 1 1 auto;
  padding: 1rem 1rem;
}
`}
      </style>
      <style global jsx>{` *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body{
    background-color: #222d32 !important;
    font-family: 'Montserrat', sans-serif;
} `}</style>
      {isLoading ? <></> : <> <main className="side-profile">
        <div className="container">
          <div className="col md-4">
            <div className="shadow card mb-3 mt-3 content">
              <h1 className="m-3 pt-3">Profile Setting</h1>
              <div className="card-body">
                {
                  google == false &&
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Username
                      </h5></div>
                    <div className="col-md-9 text-secondary">
                      <p className="edit-profile">
                        <span>{data?.data?.data?.username}</span>
                        {/* <a className="btn-edit" id='btnUsername' onClick={() => { setValue('username', data?.data?.username), clearErrors('username') }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseUsername" aria-expanded="false" aria-controls="collapseUsername">
                          <i className="fas fa-pen icon-edit-username" />
                        </a> */}
                      </p>
                      <div className="collapse" id="collapseUsername">
                        <div className="card card-body">
                          <div className="mb-3 form-group">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input defaultValue={data?.data?.data?.username} type="text" className={`form-control ${(errors.username || usernameUsed) && 'is-invalid'}`} id="username" 
                            {...setting('username',
                              {
                                // required: { value: true, message: '' },
                                minLength: { value: 5, message: 'ชื่อผู้ใช้ต้องมีอย่างน้อย 5 ตัวอักษร' },
                                pattern: { value: /^[a-zA-Z0-9]+$/, message: 'ชื่อผู้ใช้จะต้องประกอบไปด้วย a-z, A-Z, 0-9 เท่านั้น' }
                              })} />
                            <div id="validationServer03Feedback" className="invalid-feedback">
                              {errors.username?.message}
                            </div>
                            {
                              usernameUsed &&
                              <div id="isTaken">
                                ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว
                              </div>
                            }
                          </div>
                          <div className="hstack gap-3 edit-information">
                            <button type="submit" className="btn btn-primary" id="saveUsername" onClick={handleSubmit((data) => updateAccount(data, 'username'))}>Save</button>

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

                <div className="row">
                  <div className="col-md-3">
                    <h5>Firstname</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    <p className="edit-profile">
                      <span>{data?.data?.data?.firstname ? data?.data?.data?.firstname : 'ไม่มีข้อมูล'}</span>
                      <a className="btn-edit" id='btnFname' onClick={() => { setValue('fname', data?.data?.data?.firstname), clearErrors('fname') }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFirstname" aria-expanded="false" aria-controls="collapseFirstname">
                        <i className="fas fa-pen icon-edit-firstname" />
                      </a>
                    </p>
                    <div className="collapse" id="collapseFirstname">
                      <div className="card card-body">
                        <div className="mb-3 form-group">
                          <label htmlFor="firstname" className="form-label">Firstname</label>
                          <input defaultValue={data?.data?.data?.firstname} type="text" className={`form-control ${(errors.fname) && 'is-invalid'}`} id="firstname" 
                          {...setting('fname',
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
                      <span>{data?.data?.data?.lastname ? data?.data?.data?.lastname : 'ไม่มีข้อมูล'}</span>
                      <a className="btn-edit" id='btnLname' onClick={() => { setValue('lname', data?.data?.data?.lastname), clearErrors('lname') }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseLastname" aria-expanded="false" aria-controls="collapseLastname">
                        <i className="fas fa-pen icon-edit-lastname" />
                      </a>
                    </p>
                    <div className="collapse" id="collapseLastname">
                      <div className="card card-body">
                        <div className="mb-3 form-group">
                          <label htmlFor="lastname" className="form-label">Lastname</label>
                          <input defaultValue={data?.data?.data?.lastname} type="text" className={`form-control ${errors.lname ? 'is-invalid' : ''}`} id="lastname" {...setting('lname',
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
                      <span>{data?.data?.data?.email}</span>
                      {/* <a className="btn-edit" id='btnEmail' onClick={() => { setValue('email', data?.data?.email), clearErrors('email') }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseEmail" aria-expanded="false" aria-controls="collapseEmail">
                          <i className="fas fa-pen icon-edit-email" />
                        </a> */}
                    </p>
                    <div className="collapse" id="collapseEmail">
                      <div className="card card-body">
                        <div className="mb-3 form-group">
                          <label htmlFor="email" className="form-label">Email Address</label>
                          <input defaultValue={data?.data?.data?.email} type="email" className={`form-control ${(errors.email || emailUsed) ? 'is-invalid' : ''}`} id="email" {...setting('email',
                            {
                              // required: { value: true },
                              pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'กรุณากรอกอีเมลให้ถูกต้อง (name@example.com)' },
                            })} />
                          <div id="validationServer03Feedback" className="invalid-feedback">
                            {errors.email?.message}
                          </div>
                          {
                            emailUsed &&
                            <div id="isTaken">
                              อีเมลนี้ถูกใช้ไปแล้ว
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
                        <a className="btn-edit" id='btnPass' onClick={() => {
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
                                required: true,
                                pattern: { value: /^[a-zA-Z0-9]+$/, message: 'รหัสผ่านจะต้องประกอบไปด้วย a-z, A-Z, 0-9 เท่านั้น' }
                              })} />
                            <div id="validationServer05Feedback" className="invalid-feedback">
                              {errorPass.currentPass?.message}
                            </div>
                            {
                              wrongPass &&
                              <div id="isTaken">
                                รหัสผ่านปัจจุบันไม่ถูกต้อง
                              </div>
                            }
                          </div>
                          <div className="mb-3 form-group">
                            <label htmlFor="password" className="form-label">New Password</label>
                            <input type="password" className={`form-control ${errorPass.password ? 'is-invalid' : ''}`} id="password" {...setPass('password',
                              {
                                required: true,
                                minLength: { value: 8, message: 'กรุณากรอกรหัสผ่าน 8 หลัก (หรือมากกว่า) เท่านั้น' },
                                pattern: { value: /^[a-zA-Z0-9]+$/, message: 'รหัสผ่านจะต้องประกอบไปด้วย a-z, A-Z, 0-9 เท่านั้น' },
                                validate: value => value != watchPass("currentPass") || 'ห้ามตั้งรหัสผ่านซ้ำกับรหัสผ่านเดิม'
                              })} />
                            <div id="validationServer05Feedback" className="invalid-feedback">
                              {errorPass.password?.message}
                            </div>
                            {/* {
                              samePass &&
                              <div id="isTaken">
                                Do not use the same password as the current password.
                              </div>
                            } */}
                          </div>
                          <div className="mb-3 form-group">
                            <label htmlFor="password" className="form-label">Confirm New Password</label>
                            <input type="password" className={`form-control ${errorPass.confirmPass ? 'is-invalid' : ''}`} id="password" {...setPass('confirmPass',
                              {
                                required: true,
                                validate: value => value === watchPass("password") || 'รหัสผ่านไม่ตรงกัน'
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
      </main>
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div id="Toastbtnusername" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto"><i className="fas fa-check-circle"></i> Success!</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              Username saved successfully.
            </div>
          </div>
        </div>
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div id="Toastbtnemail" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto"><i className="fas fa-check-circle"></i> Success!</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              Email saved successfully.
            </div>
          </div>
        </div>
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div id="Toastbtnpassword" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto"><i className="fas fa-check-circle"></i> Success!</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              Password saved successfully.
            </div>
          </div>
        </div>
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div id="Toastbtnfname" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto"><i className="fas fa-check-circle"></i> Success!</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              Firstname saved successfully.
            </div>
          </div>
        </div>
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div id="Toastbtnlname" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto"><i className="fas fa-check-circle"></i> Success!</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              Lastname saved successfully.
            </div>
          </div>
        </div>
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div id="ToastError" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto"><i className="fas fa-exclamation-circle"></i> Failed!</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              Server not available. Please try again later.
            </div>
          </div>
        </div>
      </>}

    </div>
  )
}
