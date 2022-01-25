import Link from 'next/link';
import React from 'react';

export default function signupFail() {

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
            <span className="icon-success"><img src="/img/fail.png" /></span>
            <h2>ลงทะเบียนไม่สำเร็จ</h2>
            <p className="card-details mb-2">มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง</p>
          </div>
          <fieldset>
            <form>        
              <div className="form-group">
                <div className="signin-signup">
                  <Link href="/signup"><a>ไปที่หน้าลงทะเบียน</a></Link>
                </div>
              </div></form></fieldset>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
