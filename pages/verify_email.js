import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Verify_Email() {
  const [email, setEmail] = useState();

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, [])

  return (
    <div className="page-signing">
      <div className="row">
        <div className="col-6 p-0">
          <Link href="/">
            <a className="logo">
              <img src="/img/restgo_logo.png" alt />
            </a>
          </Link>
          <img className="img-1" src="/img/picture5.jpg" alt />
        </div>
        <div className="col-6 p-0">
          <div className="signing-form">
            <div className="form-width">
              <div className="text-center">
                <span className="icon-email"><img src="/img/email.png" /></span>
                <h4>ยืนยันอีเมลของคุณ</h4>
                <p className="card-details mb-2">เราได้ส่งลิงก์สำหรับการยืนยันตัวตนไปยัง <b style={{ color: '#1e78ff' }}>{email}</b> กรุณาตรวจสอบ</p>
              </div>
              <fieldset>
                <form>
                  <div className="my-3 signin-signup">
                    คุณไม่ได้รับอีเมลใช่หรือไม่? <a href="#">ส่งลิงก์อีกครั้ง</a>
                  </div>
                </form>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
