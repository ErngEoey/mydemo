import Link from 'next/link'
import React from 'react'


export default function VerifyEmail() {

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
            <div className="text-center">
              <span className="icon-success"><img src="/img/success.png" /></span>
              <h1>ยืนยันอีเมลสำเร็จ</h1>
              <p className="card-details mb-2">เยี่ยม! ยืนยันอีเมลของคุณเรียบร้อยแล้ว</p>
            </div>
            <fieldset>
              <form>
                <div className="form-group">
                  <div className="signin-signup">
                    <Link href='/signin'><a>ไปที่หน้าเข้าสู่ระบบ</a></Link>
                  </div>
                </div>
              </form>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  )
}
