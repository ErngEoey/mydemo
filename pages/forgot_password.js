import React from 'react'
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ForgotPwd } from '../services';
import { useRouter } from 'next/router';

export default function ForgotPassword() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  function sendEmail(data) {
    ForgotPwd(data).then(res => {
      if (res.status !== 200) throw res
      console.log('res');
      console.log(res);
      localStorage.setItem("emailForCheck", data.email);
      router.push('/password_checkEmail');
    }).catch(e => {
      console.log('error', e)
    })
  }

  return (
    <body>
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
              <div className="text-center">
                <h4>คุณลืมรหัสผ่านใช่หรือไม่ ?</h4>
                <p className="card-details mb-2">โปรดกรอกอีเมลของคุณที่ใช้ในการสมัครสมาชิก แล้วเราจะส่งอีเมลแจ้งชื่อผู้ใช้ของคุณพร้อมกับลิงก์สำหรับการรีเซ็ตรหัสผ่าน</p>
              </div>
              <fieldset>
                <form>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">อีเมล</label>
                    <input type="email" className={`form-control ${(errors.email) ? 'is-invalid' : ''}`} id="email" placeholder="email@address.com"
                      {...register('email',
                        {
                          required: { value: true },
                          pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'กรุณากรอกอีเมลให้ถูกต้อง (name@example.com)' },
                        })} />
                  </div>

                  <a className="mb-3 btn btn-primary btn-block w-100" type="submit" onClick={handleSubmit(sendEmail)}>ส่งลิงก์</a>

                  <div className="text-line mb-2">
                    <span>หรือ</span>
                  </div>

                  <div className="signin-signup" style={{marginBottom: 6}}>
                    <Link href='/signin'><a>เข้าสู่ระบบ</a></Link>
                  </div>
                  <div className="signin-signup">
                    <Link href='/signup'><a>สร้างบัญชีใหม่</a></Link>
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
