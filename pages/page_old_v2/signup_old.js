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
  const [dataEmpty, setDataEmpty] = useState(false);

  useEffect(() => {
    setUsernameUsed(false)
  }, [watch('username')])

  useEffect(() => {
    setEmailUsed(false)
  }, [watch('email')])

  useEffect(() => {
    console.log('check data empty');
    console.log(errors);
    console.log(watch('username'));
    if (errors.username?.type == 'required' || errors.email?.type == 'required' ||
      errors.password?.type == 'required' || errors.confirmPass?.type == 'required') {
      setDataEmpty(true)
    } else {
      setDataEmpty(false)
    }
    // if (watch('username') == '' || watch('email') == '' || 
    // watch('password') == '' || watch('confirmPass') == '') {
    //   setDataEmpty(true)
    // }else{
    //   setDataEmpty(false)
    // }
  }, [watch('username'), watch('email'), watch('password'), watch('confirmPass'),
  errors.username, errors.email, errors.confirmPass, errors.password])

  function createAccount(data) {
    console.log("createAccount");
    data.type = 'normal'
    Signup(data).then(res => {
      if (res.status !== 200) throw res
      console.log('res');
      console.log(res);
      router.push('/signup_success');
      // Login(data).then(res2 => {
      //   if (res2.status !== 200) throw res2
      //   localStorage.setItem("token", JSON.stringify(res2.data.token));
      //   router.push('/');
      //   console.log('res2');
      //   console.log(res2);
      // }).catch(e => {
      //   console.log('login error ', e)
      // })
    }).catch(e => {
      console.log('error', e)
      if (e.status == 400) {
        if (e.data.message.search('Email') !== -1)
          setEmailUsed(true);
        if (e.data.message.search('Username') !== -1)
          setUsernameUsed(true);
      } else {
        var toastLive = document.getElementById('ToastError');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
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
    <div className="row">
      <div className="col-6 p-0">
        <div className="logo">
          <h3>Logo</h3>
        </div>
        <img className="img-1" src="/img/picture3.jpg" alt />
      </div>

      <div className="col-6 p-0">
        <div className="signing-form">
          <div className="form-width">
            <h1 className="text-center">ลงทะเบียน</h1>
            <fieldset>
              <form>
                {
                  dataEmpty &&
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <i className="fas fa-exclamation-triangle icon-alert"></i>
                    <span className="ms-2">บันทึกข้อมูลไม่ถูกต้อง โปรดกรอกข้อมูลให้ครบถ้วน</span>
                  </div>
                }
                <div className="form-group">
                  <label htmlFor="username" className="form-label">ชื่อผู้ใช้</label>
                  <input type="text" className={`form-control ${(errors.username || usernameUsed) && 'is-invalid'}`} id="username"
                    {...register('username',
                      {
                        required: { value: true, message: '' },
                        pattern: { value: /^[a-zA-Z0-9]+$/, message: 'ชื่อผู้ใช้จะต้องประกอบไปด้วย a-z, A-Z, 0-9 เท่านั้น' },
                        minLength: { value: 5, message: 'ชื่อผู้ใช้ต้องมีอย่างน้อย 5 ตัวอักษร' },
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
                <div className="form-group">
                  <label htmlFor="email" className="form-label">อีเมล</label>
                  <input type="email" className={`form-control ${(errors.email || emailUsed) ? 'is-invalid' : ''}`} id="email"
                    {...register('email',
                      {
                        required: { value: true },
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
                <div className="form-group">
                  <label htmlFor="password" className="form-label">รหัสผ่าน</label>
                  <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password"
                    {...register('password',
                      {
                        required: true,
                        minLength: { value: 8, message: 'กรุณากรอกรหัสผ่าน 8 หลัก (หรือมากกว่า) เท่านั้น' },
                        pattern: { value: /^[a-zA-Z0-9]+$/, message: 'รหัสผ่านจะต้องประกอบไปด้วย a-z, A-Z, 0-9 เท่านั้น' }
                      })} />
                  <div id="validationServer03Feedback" className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="cf-password" className="form-label">ยืนยันรหัสผ่าน</label>
                  <input type="password" className={`form-control ${errors.confirmPass ? 'is-invalid' : ''}`} id="cf-password"
                    {...register('confirmPass',
                      {
                        required: true,
                        validate: value => value === watch("password") || 'รหัสผ่านไม่ตรงกัน'
                      })} />
                  <div id="validationServer03Feedback" className="invalid-feedback">
                    {errors.confirmPass?.message}
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input className={`form-check-input ${errors.agreeTerms ? 'is-invalid' : ''}`} type="checkbox" value="" id="flexCheckDefault" {...register('agreeTerms',
                      {
                        required: { value: true, message: 'You must agree before submitting.' },
                      })} />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      ฉันยอมรับข้อตกลงและเงื่อนไขการใช้งาน
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="mb-3 btn btn-primary btn-block w-100" onClick={handleSubmit(createAccount)}>
                    สมัครใช้งาน
                  </button>
                  <div className="signin-signup">
                    คุณมีบัญชีแล้วใช่หรือไม่ ? <Link href='/signin'><a>เข้าสู่ระบบ</a></Link>
                  </div>
                </div>

              </form>
            </fieldset>
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
    </div>
  )
}

export default SignUp
