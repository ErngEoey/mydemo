import Link from 'next/link'
import React, { useState } from 'react'

export default function password_checkEmail() {
  
  return (
    <div className="row">
      <div className="col-6 p-0">
        <div className="logo">
          <h3>Logo</h3>
        </div>
        <img className="img-1" src="/img/picture3.jpg" alt=""/>
      </div>
      <div className="col-6 p-0">
        <div className="signing-form">
          <div className="form-width">
            <div className="text-center">
              <h4>โปรดตรวจสอบอีเมล</h4>
              <p className="card-details mb-2">เราได้ส่งอีเมลเพื่อยืนยันให้แน่ใจว่าคุณเป็นเจ้าของอีเมล <b style={{color: "#1e78ff"}}>email@address.com</b> โปรดตรวจสอบกล่องขาเข้าของคุณเพื่อดำเนินการกำหนดรหัสผ่านของคุณให้เสร็จสมบูรณ์</p>
            </div>
            <fieldset>
              <form>
                <div className="verify-otp text-center">
                  <a className="w-100" type="submit">ส่งลิงก์อีกครั้ง</a>
                  <Link href='/forgot_password'><a>กรอกอีเมลใหม่</a></Link>
                </div>
              </form>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  )
}
