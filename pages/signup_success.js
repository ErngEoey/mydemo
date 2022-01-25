import React from 'react'
import Link from 'next/link';

export default function SignupSuccess() {

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
              <div className="text-center">
                <span className="icon-success"><img src="/img/success.png" /></span>
                <h2>ลงทะเบียนสำเร็จ</h2>
                <p className="card-details mb-2">ระบบได้รับข้อมูลการลงทะเบียนของท่านเรียบร้อยแล้ว</p>
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

    </div>
  )
}
