import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Login, Signup } from '../../services';
import { GoogleLogin } from "react-google-login";

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
      router.push('/');
      console.log('res');
      console.log(res);
    }).catch(e => {
      console.log('login error ', e)
      if (e.status == 400) {
        if (e.data.message.search('Please verify') !== -1) {
          var toastLive = document.getElementById('ToastVerify');
          var toast = new bootstrap.Toast(toastLive)
          toast.show()
        } else {
          setFailSignIn(true)
        }
      } else {
        var toastLive = document.getElementById('ToastError');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
      }

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
      router.push('/');
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

  function verifyEmail() {
    var toastLive = document.getElementById('ToastCheckEmail');
    var toastLive2 = document.getElementById('ToastVerify');
    var toast2 = new bootstrap.Toast(toastLive2)
    var toast = new bootstrap.Toast(toastLive)
    toast2.hide()
    toast.show()
  }


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
            <h1 className="text-center">เข้าสู่ระบบ</h1>
            <div className="card-text">
              <fieldset>
                <form>
                  {
                    failSignIn &&
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                      <i className="fas fa-exclamation-triangle icon-alert"></i>
                      <span className="ms-2">ขออภัย ชื่อผู้ใช้หรือรหัสผ่านของคุณไม่ถูกต้อง</span>
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
                          <span className="logo-wrapper me-1"><img src="/img/logo-google.png" /></span>
                          <span className="btn-label">เข้าสู่ระบบด้วย Google</span>
                        </button>
                      )}
                    >
                    </GoogleLogin>
                    <button className="facebook">
                      <span className="logo-wrapper me-1"><img src="/img/logo-facebook.png" /></span>
                      <span className="btn-label">เข้าสู่ระบบด้วย Facebook</span>
                    </button>
                  </div>
                  <div className="text-line mb-2">
                    <span>หรือ</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">ชื่อผู้ใช้หรืออีเมล</label>
                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" {...signin('email',
                      {
                        required: true
                      })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">รหัสผ่าน</label>
                    <input type="password" className={`form-control ${errors.password || errors.email ? 'is-invalid' : ''}`} id="password" {...signin('password',
                      {
                        required: true
                      })} />


                  </div>
                  <div className="form-group">
                    <div className="hstack justify-content-between">
                      <div className="form-check ">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          จดจำฉัน
                        </label>
                      </div>
                      <Link href='/forgot_password'><a>ลืมรหัสผ่าน ?</a></Link>
                    </div>
                  </div>
                  <button type="submit" className="mb-3 btn btn-primary btn-block w-100" onClick={handleSubmit((data) => checkAccount(data, 'normal'))}>
                    เข้าสู่ระบบ
                  </button>
                  <div className="signin-signup">
                    คุณยังไม่มีบัญชีใช่หรือไม่ ? <Link href='/signup'><a>สมัครสมาชิก</a></Link>
                  </div>

                </form>
              </fieldset>
            </div>
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
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
        <div id="ToastVerify" className="toast resetPassword" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
          <div className="toast-header">
            <strong className="me-auto"><i className="fas fa-exclamation-circle"></i> Failed!</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            คุณยังไม่ได้ยืนยันอีเมล <br />
            <a href='#' onClick={verifyEmail}>คลิกเพื่อยืนยันอีเมล</a>
          </div>
        </div>
        <div id="ToastCheckEmail" className="toast resetPassword" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
          <div className="toast-header">
            <strong className="me-auto"><i className="fas fa-exclamation-circle"></i> Please check!</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body"> 
            โปรดตรวจสอบกล่องขาเข้าของคุณ <br />
            เพื่อดำเนินการให้เสร็จสมบูรณ์
          </div>
        </div>
      </div>
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
        
      </div>
    </div>
  )
}

export default SignIn