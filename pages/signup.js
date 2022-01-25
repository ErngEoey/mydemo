import React, { useState } from 'react'
import { useRouter } from 'next/router';
import _, { isNull } from 'lodash';
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Login, Signup } from '../services';

const SignUp = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, watch, setError, clearErrors } = useForm();
  const [dataEmpty, setDataEmpty] = useState(false);
  
  useEffect(() => {
    localStorage.removeItem('email');
  }, [])

  useEffect(() => {
    clearErrors('email')
  }, [watch('email')])

  useEffect(() => {
    if (errors.email?.type == 'required' || errors.password?.type == 'required' || errors.confirmPass?.type == 'required') {
      setDataEmpty(true)
    } else {
      setDataEmpty(false)
    }
  }, [watch('username'), watch('email'), watch('password'), watch('confirmPass'),
  errors.email, errors.confirmPass, errors.password])

  function createAccount(data) {
    console.log("createAccount");
    data.type = 'normal'
    Signup(data).then(res => {
      if (res.status !== 200) throw res
      console.log('res');
      console.log(res);
      localStorage.setItem("email", data.email);
      router.push('/verify_email');
    }).catch(e => {
      console.log('error', e)
      if (e.status == 400) {
        if (e.data.message.search('This email') !== -1)
          setError('email', {message: "อีเมลถูกใช้ไปแล้ว"})
      } else {
        var toastLive = document.getElementById('ToastError');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
        router.push("/signup_fail")
      }
    })
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      router.push('/');
    }
  }, [])

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
                <h3 className="text-center mb-3">ลงทะเบียน</h3>
                <p>กรุณากรอกข้อมูลของท่านให้ถูกต้องครบถ้วนในการลงทะเบียน</p>
              </div>
              <fieldset>
                <form>
                  {
                    dataEmpty &&
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                      <i className="fas fa-exclamation-triangle icon-alert" />
                      <span className="ms-2">บันทึกข้อมูลไม่ถูกต้อง โปรดกรอกข้อมูลให้ครบถ้วน</span>
                    </div>
                  }
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">อีเมล</label>
                    <input type="email" className={`form-control ${(errors.email) ? 'is-invalid' : ''}`} id="email" placeholder="email@address.com"
                      {...register('email',
                        {
                          required: { value: true },
                          pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'กรุณากรอกอีเมลให้ถูกต้อง (name@example.com)' },
                        })}
                    />
                    <div id="validationServer03Feedback" className="invalid-feedback">
                      {errors.email?.message}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">รหัสผ่าน</label>
                    <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" placeholder="กรุณากรอกรหัสผ่าน"
                      {...register('password',
                        {
                          required: true,
                          minLength: { value: 8, message: 'กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัว (หรือมากกว่า) เท่านั้น' },
                          pattern: { value: /^[a-zA-Z0-9]+$/, message: 'รหัสผ่านจะต้องประกอบไปด้วย a-z, A-Z, 0-9 เท่านั้น' }
                        })}
                    />
                    <div id="validationServer03Feedback" className="invalid-feedback">
                      {errors.password?.message}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-password" className="form-label">ยืนยันรหัสผ่าน</label>
                    <input type="password" className={`form-control ${errors.confirmPass ? 'is-invalid' : ''}`} id="cf-password" placeholder="กรุณากรอกรหัสผ่านอีกครั้ง"
                      {...register('confirmPass',
                        {
                          required: true,
                          validate: value => value === watch("password") || 'รหัสผ่านไม่ตรงกัน'
                        })}
                    />
                    <div id="validationServer03Feedback" className="invalid-feedback">
                      {errors.confirmPass?.message}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-check">
                      <input className={`form-check-input ${errors.agreeTerms ? 'is-invalid' : ''}`} type="checkbox" defaultValue id="flexCheckDefault"
                        {...register('agreeTerms',
                          {
                            required: { value: true },
                          })}
                      />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        ฉันยอมรับข้อตกลงและเงื่อนไขการใช้งาน
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <a className="mb-3 btn btn-primary btn-block w-100" type="submit" style={{ fontWeight: 'bold' }} onClick={handleSubmit(createAccount)}>
                      ลงทะเบียน</a>
                    <div className="signin-signup">
                      <p>คุณมีบัญชีแล้วใช่หรือไม่? <Link href='/signin'><a>เข้าสู่ระบบ</a></Link></p>
                    </div>
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

export default SignUp
