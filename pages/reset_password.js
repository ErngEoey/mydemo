import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { ResetPwd } from '../services';

export default function ResetPassword() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [passwordUsed, setPasswordUsed] = useState(false);
  const [forgotToken, setForgotToken] = useState(undefined);

  useEffect(() => {
    if (router.query.token) {
      localStorage.setItem("forgot_token", JSON.stringify(router.query.token));
      router.push('/reset_password')
    }
    if (JSON.parse(localStorage.getItem("forgot_token"))) {
      setForgotToken(JSON.parse(localStorage.getItem("forgot_token")));
    }
  }, [router.query.token])

  function resetPassword(data) {
    console.log(data);
    console.log(forgotToken);
    ResetPwd(forgotToken, data).then(res => {
      if (res.status !== 200) throw res
      console.log(res)
      localStorage.removeItem('forgot_token');
      router.push('/reset_password_success')
    }).catch(e => {
      console.log('error', e)
      if (e.status == 400) {
        if (e.data.message.search('You use old') !== -1) {
          setPasswordUsed(true)
        }
      } else if (e.status == 401) {
        if (e.data.message.search('expired') !== -1) {
          var toastLive = document.getElementById('ToastExpired');
          var toast = new bootstrap.Toast(toastLive)
          toast.show()
        }
        if (e.data.message.search('notmatch') !== -1) {
          var toastLive = document.getElementById('ToastExpired');
          var toast = new bootstrap.Toast(toastLive)
          toast.show()
        }
      }
    })
  }

  useEffect(() => {
    setPasswordUsed(false)
  }, [watch("password")])

  useEffect(() => {
    setPasswordUsed(false)
  }, [watch("confirmPass")])

  function removeToken(){
    localStorage.removeItem('forgot_token');
    router.push('/signin')
  }


  return (
    <div className="row">
      <div className="col-6 p-0">
        <div className="logo">
          <h3>Logo</h3>
        </div>
        <img className="img-1" src="/img/picture3.jpg" alt="" />
      </div>
      <div className="col-6 p-0">
        <div className="signing-form">
          <div className="form-width">
            <h1 className="text-center">กำหนดรหัสผ่านใหม่</h1>
            <fieldset>
              <form>
                {
                  passwordUsed &&
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <i className="fas fa-exclamation-triangle icon-alert"></i>
                    <span className="ms-2">เลือกรหัสผ่านที่คุณไม่เคยใช้มาก่อน</span>
                  </div>
                }
                <div className="form-group">
                  <label htmlFor="password" className="form-label">รหัสผ่านใหม่</label>
                  <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" placeholder="กรุณากรอกรหัสผ่าน"
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
                  <label htmlFor="cf-password" className="form-label">รหัสผ่านใหม่อีกครั้ง</label>
                  <input type="password" className={`form-control ${errors.confirmPass ? 'is-invalid' : ''}`} id="cf-password" placeholder="กรุณากรอกรหัสผ่านอีกครั้ง"
                    {...register('confirmPass',
                      {
                        required: true,
                        validate: value => value === watch("password") || 'รหัสผ่านไม่ตรงกัน'
                      })} />
                  <div id="validationServer03Feedback" className="invalid-feedback">
                    {errors.confirmPass?.message}
                  </div>
                </div>
                <a className="mb-3 btn btn-primary btn-block w-100" type="submit" onClick={handleSubmit(resetPassword)}>รีเซ็ตรหัสผ่าน</a>
              </form>
            </fieldset>
          </div>
        </div>
      </div>
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
        <div id="ToastExpired" className="toast resetPassword" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
          <div className="toast-header">
            <strong className="me-auto"><i className="fas fa-exclamation-circle"></i> Failed!</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            URL is expired! Please try again. <br/>
            <a href='#' onClick={removeToken}>Click here</a>
          </div>
        </div>
      </div>
    </div>
  )
}
