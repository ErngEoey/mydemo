import Link from 'next/link';
import React from 'react';

export default function ContactSetting() {
  return (
    <body class="page-profile-data">
      <header className="site-header">
        <a href className="nav-link logo">
          <img src="/img/restgo_logo.png" alt />
        </a>
        <div className="nav site-navigator">
          <a className="nav-link" href>แดชบอร์ด</a>
          <a className="nav-link disabled" href>เครื่องมือ</a>
          <a className="nav-link disabled" href>รายงาน</a>
          <a className="nav-link" href="/restgo-affiliate/apps/html/profile-setting/show-profile.html">บัญชี</a>
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
                      <span className="me-2 fas fa-check " />
                      <p>ข้อมูลส่วนตัว</p>
                    </div>
                    <div className="text-line ms-2 me-2" />
                    <div className="step-second span-active">
                      <span className="me-2">2</span>
                      <p> ช่องทางการติดต่อ</p>
                    </div>
                  </div>
                  <div className="input-info">
                    <h4>ช่องทางการติดต่อ</h4>
                    <fieldset>
                      <form>
                        <div className="row">
                          <div className="form-group mb-3">
                            <div className="d-flex">
                              <label htmlFor="address-detail" className="form-label">ที่อยู่</label>
                              <span className="ms-1" style={{ color: 'red' }}>*</span>
                            </div>
                            <textarea className="form-control is-invalid" id="address-detail" rows={2} placeholder="กรอกข้อมูล" defaultValue={""} />
                            <div id="validationServer05Feedback" className="invalid-feedback">
                              จำเป็นต้องกรอกข้อมูล
                            </div>
                          </div>
                          <div className="form-group mb-3">
                            <div className="d-flex">
                              <label htmlFor="province" className="form-label">จังหวัด</label>
                              <span className="ms-1" style={{ color: 'red' }}>*</span>
                            </div>
                            <select className="form-select is-invalid" id="province" required>
                              <option selected disabled value>เลือก</option>
                              <option>...</option>
                              <option>...</option>
                            </select>
                            <div id="validationServer05Feedback" className="invalid-feedback">
                              จำเป็นต้องเลือกข้อมูล
                            </div>
                          </div>
                          <div className="form-group mb-3">
                            <div className="d-flex">
                              <label htmlFor="district" className="form-label">อำเภอ/เขต</label>
                              <span className="ms-1" style={{ color: 'red' }}>*</span>
                            </div>
                            <select className="form-select is-invalid" id="district" required>
                              <option selected disabled value>เลือก</option>
                              <option>...</option>
                              <option>...</option>
                            </select>
                            <div id="validationServer05Feedback" className="invalid-feedback">
                              จำเป็นต้องเลือกข้อมูล
                            </div>
                          </div>
                          <div className="form-group mb-3">
                            <div className="d-flex">
                              <label htmlFor="subdistrict" className="form-label">ตำบล/แขวง</label>
                              <span className="ms-1" style={{ color: 'red' }}>*</span>
                            </div>
                            <select className="form-select is-invalid" id="subdistrict" required>
                              <option selected disabled value>เลือก</option>
                              <option>...</option>
                              <option>...</option>
                            </select>
                            <div id="validationServer05Feedback" className="invalid-feedback">
                              จำเป็นต้องเลือกข้อมูล
                            </div>
                          </div>
                          <div className="form-group mb-3">
                            <div className="d-flex">
                              <label htmlFor="zipcode" className="form-label">รหัสไปรษณีย์</label>
                              <span className="ms-1" style={{ color: 'red' }}>*</span>
                            </div>
                            <input type="text" maxLength={5} className="form-control is-invalid" id="zipcode" placeholder="กรอกข้อมูล" />
                            <div id="validationServer05Feedback" className="invalid-feedback">
                              จำเป็นต้องกรอกข้อมูล
                            </div>
                          </div>
                          <div className="btn-step-second">
                            <div className="back-step">
                              <Link href='/personal_setting'>
                                <a className="btn-back">
                                  <i className="fas fa-chevron-left" />
                                  ย้อนกลับ
                                </a>
                              </Link>
                            </div>
                            {/* Button trigger modal */}
                            <div className="btn-save">
                              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                บันทึก
                              </button>
                            </div>
                            {/* Modal */}
                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                              <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                  <div className="modal-header modal-head-success">
                                  </div>
                                  <div className="modal-body">
                                    <div className="modal-body-success">
                                      <i className="fas fa-check-circle" />
                                      <h3>ลงทะเบียนสำเร็จ!</h3>
                                      <h4>คุณได้เปิดบัญชีสำหรับ Affiliate Restgo เรียบร้อยแล้ว</h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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
              <img src="/restgo-affiliate/apps/img/restgo_logo.png" alt />
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
    </body>
  )
}
