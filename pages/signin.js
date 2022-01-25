import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Login, Signup } from '../services';
import { GoogleLogin } from "react-google-login";

export default function SignIn() {
  const router = useRouter();
  const { register: signin, handleSubmit, formState: { errors } } = useForm();
  const [failSignIn, setFailSignIn] = useState(false);

  useEffect(() => {
    localStorage.removeItem('is_enable')
    localStorage.removeItem('verify_token');
    localStorage.removeItem('email');
  }, [])

  function checkAccount(data, type) {
    console.log(data);
    data.type = type;
    Login(data).then(res => {
      console.log(res);
      if (res.status !== 200) throw res
      const user = res.data.token;
      localStorage.setItem("token", JSON.stringify(user));
      console.log('res');
      console.log(res);
      if (res.data.data.verify_email) {
        if (res.data.data.is_enable) {
          router.push('/')
        } else {
          router.push('/personal_setting')
        }
      } else {
        localStorage.setItem("is_enable", JSON.stringify(res.data.data.is_enable));
        router.push('/verify_email')
      }

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
  }

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("token"))) {
  //     router.push('/');
  //   }
  // }, [])

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
    <div className="page-signing">
      <div className="row">
        <div className="col-6 p-0">
          <a href="#" className="logo">
            <img src="/img/restgo_logo.png" alt />
          </a>
          <img className="img-1" src="/img/picture5.jpg" alt />
        </div>
        <div className="col-6 p-0">
          <div className="signing-form">
            <div className="form-width">
              <div className="creat-acc">
                <h3 className="text-center mb-3">ยินดีต้อนรับสู่ Restgo</h3>
                <p>ร่วมเดินทางไปกับเรา เว็บไซต์ค้นหาที่พักชั้นนำของประเทศไทย </p>
              </div>
              <fieldset>
                <form>
                  {
                    failSignIn &&
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                      <i className="fas fa-exclamation-triangle icon-alert" />
                      <span className="ms-2">ขออภัย อีเมลหรือรหัสผ่านของคุณไม่ถูกต้อง</span>
                    </div>
                  }
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">อีเมล</label>
                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" placeholder="email@address.com"
                      {...signin('email',
                        {
                          required: true
                        })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">รหัสผ่าน</label>
                    <input type="password" className={`form-control ${errors.password || errors.email ? 'is-invalid' : ''}`} id="password" placeholder="กรุณากรอกรหัสผ่าน"
                      {...signin('password',
                        {
                          required: true
                        })}
                    />
                  </div>
                  <div className="form-group">
                    <div className="hstack justify-content-between">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          จดจำฉัน
                        </label>
                      </div>
                      <a href="/restgo-affiliate/apps/html/signing/password-forgot.html">ลืมรหัสผ่าน?</a>
                    </div>
                  </div>
                  <a className="mb-3 btn btn-primary btn-block w-100" type="submit" style={{ fontWeight: 'bold' }} onClick={handleSubmit((data) => checkAccount(data, 'normal'))}>
                    เข้าสู่ระบบ
                  </a>
                  <div className="text-line mb-2">
                    <span>หรือ</span>
                  </div>
                  <div className="hstack gap-3 social-container">
                    <GoogleLogin
                      clientId="718300339229-9v9iqu9o2mmv9hhaef1pl9ur1k1kchnu.apps.googleusercontent.com"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}

                      render={renderProps => (
                        <a className="btn google" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                          <span className="logo-wrapper me-1"><img src="/img/logo-google.png" /></span>
                          <span className="btn-label"> เข้าใช้งานด้วยบัญชี Google</span>
                        </a>
                      )}
                    >
                    </GoogleLogin>
                  </div>
                  <div className="signin-signup">
                    <p>คุณยังไม่มีบัญชีใช่หรือไม่? <Link href='/signup'><a>ลงทะเบียน</a></Link></p>
                  </div>
                  <div className="signin-signup">
                    ยอมรับ <a href="#">ข้อกำหนดการใช้งาน</a> และ <a href="#">นโยบายความเป็นส่วนตัว</a>
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
    </div>
  )
}
