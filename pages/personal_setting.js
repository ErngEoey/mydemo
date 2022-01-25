import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PersonalSetting() {
  const router = useRouter();
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("token"))) {
      router.push('/signin')
    }
  }, [])

  return (
    <div className="page-profile-data">
      <div>
        <header className="site-header">
          <a href className="nav-link logo">
            <img src="/img/restgo_logo.png" alt />
          </a>
          <div className="nav site-navigator">
            <a className="nav-link" href>แดชบอร์ด</a>
            <a className="nav-link disabled" href>เครื่องมือ</a>
            <a className="nav-link disabled" href>รายงาน</a>
            <a className="nav-link disabled" href="/restgo-affiliate/apps/html/profile-setting/show-profile.html">บัญชี</a>
          </div>
        </header>
        <main className="personal-data">
          <section className="section section-personal">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="content">
                    <article className="word-header">
                      <h3>เปิดบัญชี Affiliate กับ Restgo</h3>
                      <p>ลงทะเบียนเป็น Restgo Affiliate Partner ได้ง่ายๆ ในอีก 2 ขั้นตอน</p>
                    </article>
                    <div className="step">
                      <div className="step-first span-active">
                        <span className="me-2">1</span>
                        <p>ข้อมูลส่วนตัว</p>
                      </div>
                      <div className="text-line ms-2 me-2" />
                      <div className="step-second">
                        <span className="me-2">2</span>
                        <p> ช่องทางการติดต่อ</p>
                      </div>
                    </div>
                    <div className="email-info mail-padding">
                      <div className="d-flex">
                        <span>อีเมล :</span>
                        <p style={{ fontWeight: 'bold' }} id="email">email@address.com</p>
                      </div>
                      <div className="edt-psw">
                      </div>
                    </div>
                    <div className="input-info">
                      <h4>ข้อมูลส่วนตัว</h4>
                      <fieldset>
                        <form>
                          <div className="row">
                            <div className="form-group col-md-6 mb-3">
                              <div className="d-flex">
                                <label htmlFor="firstname" className="form-label">ชื่อ</label>
                                <span className="ms-1" style={{ color: 'red' }}>*</span>
                              </div>
                              <input type="text" className="form-control is-invalid" id="firstname" placeholder="กรอกข้อมูล" />
                              <div id="validationServer05Feedback" className="invalid-feedback">
                                จำเป็นต้องกรอกข้อมูล
                              </div>
                            </div>
                            <div className="form-group col-md-6 mb-3">
                              <div className="d-flex">
                                <label htmlFor="lastname" className="form-label">นามสกุล</label>
                                <span className="ms-1" style={{ color: 'red' }}>*</span>
                              </div>
                              <input type="text" className="form-control is-invalid" id="lastname" placeholder="กรอกข้อมูล" />
                              <div id="validationServer05Feedback" className="invalid-feedback">
                                จำเป็นต้องกรอกข้อมูล
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-group mb-3">
                              <div className="d-flex">
                                <label htmlFor="birthdate" className="form-label">วันเกิด</label>
                                <span className="ms-1" style={{ color: 'red' }}>*</span>
                              </div>
                              <input type="date" className="form-control is-invalid" id="birthdate" placeholder />
                              <div id="validationServer05Feedback" className="invalid-feedback">
                                จำเป็นต้องกรอกข้อมูล
                              </div>
                            </div>
                          </div>
                          <div className="btn-next">
                            <Link href='/contact_setting'><a className="btn btn-primary">ถัดไป</a></Link>
                          </div>
                        </form>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <div className="container">
            <div className="footer-personal-data">
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="footer-header">
                    <h3>แดชบอร์ด</h3>
                  </div>
                  <nav className="footer-nav">
                  </nav>
                </div>
                <div className="col-md-3">
                  <div className="footer-header">
                    <h3>เครื่องมือ</h3>
                  </div>
                  <nav className="footer-nav">
                  </nav>
                </div>
                <div className="col-md-3">
                  <div className="footer-header">
                    <h3>รายงาน</h3>
                  </div>
                  <nav className="footer-nav">
                    <a className="nav-link disabled" href>รายงานข้อมูลการจอง</a>
                  </nav>
                </div>
                <div className="col-md-3">
                  <div className="footer-header">
                    <h3>การใช้งาน</h3>
                  </div>
                  <nav className="footer-nav">
                    <a className="nav-link disabled" href>คู่มือการใช้งาน</a>
                    <a className="nav-link disabled" href>วิธีการทำงาน</a>
                  </nav>
                </div>
              </div>
            </div>
            <div className="about-us">
              <a className="nav-link logo" href>
                <img src="/img/restgo_logo.png" alt />
              </a>
              <article className="salogan">
                <p className="mb-0">
                  ค้นหาโรงแรมราคาถูกกับ Rest go โดยใช้เครื่องมือการค้นหาโรงแรมเพื่อหาดีลโรงแรมที่ถูกที่สุดของจุดหมายปลายทางหลักทั้งหมดจากทั่วโลก
                </p>
                <p>Get the best prices on 2,000,000+ properties, worldwide</p>
              </article>
            </div>
            <div className="copyright">
              <p className="mb-0">© 2021 Tenfuse Co., Ltd. All Rights Reserved.</p>
              <nav className="policy-link d-flex">
                <a className="nav-link disabled" href>Privacy Policy</a>
                <a className="nav-link disabled" href>Cookie Policy</a>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
