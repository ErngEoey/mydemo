import React from 'react';

export default function ProfileSetting() {
  return (
    <body className="page-profile-data">
        <header className="site-header">
          <a href className="nav-link logo">
            <img src="/img/restgo_logo.png" alt />
          </a>
          <div className="nav site-navigator">
            <a className="nav-link" href>แดชบอร์ด</a>
            <a className="nav-link disabled" href>เครื่องมือ</a>
            <a className="nav-link disabled" href>รายงาน</a>
            <a className="nav-link" href="#">บัญชี</a>
          </div>
        </header>
        <main className="personal-data">
          <section className="section section-personal">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="content">
                    <article className="word-header">
                      <h3>บัญชี Restgo Affiliate</h3>
                      <p>รายละเอียดข้อมูลส่วนตัวและช่องทางการติดต่อ</p>
                    </article>
                    <div className="input-info mb-3" id="showEmail">
                      <fieldset>
                        <form>
                          <div className="d-flex justify-content-between">
                            <h4>ข้อมูลบัญชี</h4>
                            <div className="edit-info">
                              <a className="btn-edt" id="show-editPsw" role="button">
                                เปลี่ยนรหัสผ่าน
                              </a>
                            </div>
                          </div>
                          <div className="data-row mb-0">
                            <dl>
                              <dt>อีเมล</dt>
                              <dd>email@address.com</dd>
                            </dl>
                          </div>
                        </form>
                      </fieldset>
                    </div>
                    <div className="d-none" id="edtPsw">
                      <div className="input-info mb-3">
                        <div className="d-flex justify-content-between">
                          <h4>ข้อมูลบัญชี</h4>
                          <div className="edit-info">
                            <a className="btn-edt" id="btn-cancleedtPsw" role="button">
                              ยกเลิก
                            </a>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group mb-3">
                            <label className="form-label">
                              <span>อีเมล</span>
                            </label>
                            <div>
                              <span>email@address.com</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group mb-3">
                            <label htmlFor="currentpassword" className="form-label d-flex">
                              <span>รหัสผ่านปัจจุบัน</span>
                              <span className="ms-1" style={{ color: 'red' }}>*</span>
                            </label>
                            <input type="password" className="form-control is-invalid" id="currentpassword" />
                            <div id="validationServer05Feedback" className="invalid-feedback">
                              รหัสผ่านปัจจุบันไม่ถูกต้อง
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group mb-3">
                            <label htmlFor="newpassword" className="form-label d-flex">
                              <span>รหัสผ่านใหม่</span>
                              <span className="ms-1" style={{ color: 'red' }}>*</span>
                            </label>
                            <input type="password" className="form-control is-invalid" id="newpassword" />
                            <div id="validationServer05Feedback" className="invalid-feedback">
                              ห้ามตั้งรหัสผ่านซ้ำกับรหัสผ่านปัจจุบัน
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group mb-3">
                            <label htmlFor="repeatpassword" className="form-label d-flex">
                              <span>ยืนยันรหัสผ่านใหม่</span>
                              <span className="ms-1" style={{ color: 'red' }}>*</span>
                            </label>
                            <input type="password" className="form-control is-invalid" id="repeatpassword" />
                            <div id="validationServer05Feedback" className="invalid-feedback">
                              รหัสผ่านไม่ตรงกัน โปรดลองอีกครั้ง
                            </div>
                          </div>
                        </div>
                        <div className="edit-info">
                          <a className="btn btn-primary" id="btnEmailPsw">บันทึก</a>
                        </div>
                        <fieldset>
                          <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                            <div id="ToastbtnEmailPsw" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                              <div className="toast-header">
                                <strong className="me-auto">
                                  <i className="fas fa-check-circle" />
                                  บันทึกสำเร็จ!</strong>
                                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                              </div>
                              <div className="toast-body">
                                รหัสผ่านใหม่ถูกอัพเดทเรียบร้อยแล้ว
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <div className="input-info mb-3" id="showpersonal-data">
                      <fieldset>
                        <form>
                          <div className="d-flex justify-content-between">
                            <h4>ข้อมูลส่วนตัว</h4>
                            <div className="edit-info">
                              <a className="btn-edt" id="show-editPersonalData" role="button">
                                แก้ไข
                              </a>
                            </div>
                          </div>
                          <div className="data-row">
                            <dl>
                              <dt>ชื่อ</dt>
                              <dd>Nisarat Bunluerat</dd>
                            </dl>
                          </div>
                          <div className="data-row mb-0">
                            <dl>
                              <dt>วันเกิด</dt>
                              <dd>10/05/2000</dd>
                            </dl>
                          </div>
                        </form>
                      </fieldset>
                    </div>
                    <div className="d-none" id="edtPersonalData">
                      <div className="input-info mb-3">
                        <div className="d-flex justify-content-between">
                          <h4>ข้อมูลส่วนตัว</h4>
                          <div className="edit-info">
                            <a className="btn-edt" id="btn-canclePersonalData" role="button">
                              ยกเลิก
                            </a>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6 mb-3">
                            <div className="d-flex">
                              <label htmlFor="firstname" className="form-label">ชื่อ</label>
                              <span className="ms-1" style={{ color: 'red' }}>*</span>
                            </div>
                            <input type="text" className="form-control is-invalid" id="firstname" placeholder="กรอกข้อมูล" defaultValue="Nisarat" />
                            <div id="validationServer05Feedback" className="invalid-feedback">
                              จำเป็นต้องกรอกข้อมูล
                            </div>
                          </div>
                          <div className="form-group col-md-6 mb-3">
                            <div className="d-flex">
                              <label htmlFor="lastname" className="form-label">นามสกุล</label>
                              <span className="ms-1" style={{ color: 'red' }}>*</span>
                            </div>                                            <input type="text" className="form-control is-invalid" id="lastname" placeholder="กรอกข้อมูล" defaultValue="Bunluerat" />
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
                        <div className="edit-info">
                          <a className="btn btn-primary" id="btnPersonal">บันทึก</a>
                        </div>
                        <fieldset>
                          <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                            <div id="ToastbtnPersonal" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                              <div className="toast-header">
                                <strong className="me-auto">
                                  <i className="fas fa-check-circle" />
                                  บันทึกสำเร็จ!</strong>
                                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                              </div>
                              <div className="toast-body">
                                ข้อมูลส่วนตัวถูกอัพเดทเรียบร้อยแล้ว
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <div className="input-info" id="showcontact-data">
                      <fieldset>
                        <form>
                          <div className="d-flex justify-content-between">
                            <h4>ช่องทางการติดต่อ</h4>
                            <div className="edit-info">
                              <a className="btn-edt" id="show-editContactData" role="button">
                                แก้ไข
                              </a>
                            </div>
                          </div>
                          <div className="data-row">
                            <dl>
                              <dt>ที่อยู่</dt>
                              <dd>
                                169 มหาวิทยาลัยบูรพา ถนน ลงหาดบางแสน
                              </dd>
                              <dd>
                                จังหวัดชลบุรี อำเภอเมืองชลบุรี ตำบลแสนสุข 20130
                              </dd>
                            </dl>
                          </div>
                        </form>
                      </fieldset>
                    </div>
                    <div className="d-none" id="edtContactData">
                      <div className="input-info" id="showcontact-data">
                        <fieldset>
                          <form>
                            <div className="d-flex justify-content-between">
                              <h4>ช่องทางการติดต่อ</h4>
                              <div className="edit-info">
                                <a className="btn-edt" id="btn-cancleContactData" role="button">
                                  ยกเลิก
                                </a>
                              </div>
                            </div>
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
                              <div className="edit-info">
                                <a className="btn btn-primary" id="btnContact">บันทึก</a>
                              </div>
                              <fieldset>
                                <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                                  <div id="ToastbtnContact" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                    <div className="toast-header">
                                      <strong className="me-auto">
                                        <i className="fas fa-check-circle" />
                                        บันทึกสำเร็จ!</strong>
                                      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                                    </div>
                                    <div className="toast-body">
                                      ที่อยู่ถูกอัพเดทเรียบร้อยแล้ว
                                    </div>
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                          </form>
                        </fieldset>
                      </div>
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
    </body>
  )
}
