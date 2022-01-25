import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery, useQueryClient } from 'react-query';
import { getProfile } from '../services';

export default function Index() {
  const router = useRouter();
  const [token, setToken] = useState(undefined);

  const { data, isLoading, isError } = useQuery(token ? "getUser" : undefined, token ? () => getProfile(token?.access_token) : undefined)
  console.log(data);

  return (
    <div className="page-landing">
      <header className="site-header">
        <nav className="navbar navbar-expand-lg navbar-light head__custom-nav">
          <a href="#" className="logo">
            <img src="/img/restgo_logo.png" alt />
          </a>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <div className="navbar-nav">
              <div className="hstack gap-2 header-icon">
                <Link href="/signup"><a className="btn btn-primary d-lg-inline-block mb-0">ลงทะเบียน</a></Link>
                <Link href="/signin"><a className="btn btn-primary d-lg-inline-block mb-0">เข้าสู่ระบบ</a></Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className="landing">
        <section>
          <div className="container">
            <div className="welcome">
              <fieldset>
                <form>
                  <div className="text-center">
                    <h2>ทำเงินให้คุณได้มากแค่ไหน เราบอกให้รู้กันไปเลย!</h2>
                    <p>ระบุจำนวนการจองที่เช็คเอาต์แล้วที่ท่านคาดว่าจะได้รับต่อเดือน</p>
                  </div>
                  <div className="input-group mb-3">
                    <input type="number" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" placeholder="จำนวนการจองที่เช็คเอ้าต์แล้ว" />
                    <span className="input-group-text">0.00</span>
                  </div>
                  <div className="input-group mb-3">
                    <input type="number" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" placeholder="มูลค่าการจองโดยเฉลี่ย" />
                    <span className="input-group-text">0.00</span>
                  </div>
                  <div className="input-group mb-3">
                    <input type="number" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" placeholder="เปอร์เซ็นต์คอมมิชชั่น" />
                    <span className="input-group-text">0.00</span>
                  </div>
                </form>
              </fieldset>
            </div>
          </div>
        </section>
      </main>
      <footer>
      </footer>
    </div>
  )
}
