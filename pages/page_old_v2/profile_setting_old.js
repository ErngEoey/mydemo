import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { getProfile, updateProfile } from '../../services';
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Header from "../../components/Header";

export default function Profile_setting() {
  const queryClient = useQueryClient()
  const { register: setting, handleSubmit, formState: { errors }, watch, setValue, clearErrors, setError } = useForm();
  const {
    register: setPass,
    formState: { errors: errorPass },
    handleSubmit: handleSubmitPass,
    watch: watchPass,
    setValue: setValue2
  } = useForm();

  const router = useRouter();
  const [token, setToken] = useState(undefined);
  const [usernameUsed, setUsernameUsed] = useState(false);
  const [emailUsed, setEmailUsed] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [google, setGoogle] = useState(false);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token")));
    if (!JSON.parse(localStorage.getItem("token"))) {
      router.push('/signin')
    }
  }, [])

  const { data, isLoading, isError } = useQuery(token ? "getUser" : undefined, token ? () =>
    getProfile(token?.access_token) : undefined)

  console.log("v-- get data user --v");
  if (data) {
    console.log(data);
    if (data.status == 401) {
      if (data.data.message.search('Please login') !== -1) {
        localStorage.removeItem("token")
      }
    }
  }


  useEffect(() => {
    if (data?.data?.data?.type_of_person_id == 'google') {
      setGoogle(true);
    }
  }, [data])

  useEffect(() => {
    clearErrors('fname')
  }, [watch('fname')])

  async function updateAccount(update, type) {
    console.log('updateAccount')
    console.log(update)
    console.log(type)
    let data = {}

    if (type == 'username') {
      data.username = update.username
    } else if (type == 'fname') {
      if (!update.fname) {
        setError('fname')
        return
      }
      data.fname = update.fname
    } else if (type == 'lname') {
      if (!update.lname) {
        setError('lname')
        return
      }
      data.lname = update.lname
    } else if (type == 'email') {
      data.email = update.email
    } else if (type == 'password') {
      data.currentPass = update.currentPass;
      data.password = update.password;
      data.confirmPass = update.confirmPass;
    }
    console.log('v--data for update--v');
    console.log(data);
    updateProfile(token?.access_token, data).then(res => {
      console.log(res)
      if (res.status !== 200) throw res
      queryClient.invalidateQueries('getUser')

      if (type == 'username') {
        var toastLive = document.getElementById('Toastbtnusername');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
        document.getElementById("btnUsername").click();
      }

      if (type == 'fname') {
        var toastLive = document.getElementById('Toastbtnfname');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
        document.getElementById("btnFname").click();
      }

      if (type == 'lname') {
        var toastLive = document.getElementById('Toastbtnlname');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
        document.getElementById("btnLname").click();
      }

      if (type == 'email') {
        var toastLive = document.getElementById('Toastbtnemail');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
        document.getElementById("btnEmail").click();
      }

      if (update.currentPass != update.password) {
        var toastLive = document.getElementById('Toastbtnpassword');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
        document.getElementById("btnPass").click();
      }

    }).catch(e => {
      console.log('error', e.response)
      console.log('error', e.status)
      if (e.status == 400) {
        if (e.data.message.search('Email') !== -1)
          setEmailUsed(true);
        if (e.data.message.search('Username') !== -1)
          setUsernameUsed(true);
        if (e.data.message.search('current') !== -1)
          setWrongPass(true);
      } else if (e.status == 401) {
        localStorage.removeItem("token")
      }
      else {
        var toastLive = document.getElementById('ToastError');
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
      }
    })
  }

  useEffect(() => {
    setUsernameUsed(false)
  }, [watch('username')])

  useEffect(() => {
    setEmailUsed(false)
  }, [watch('email')])

  useEffect(() => {
    setWrongPass(false)
  }, [watchPass('currentPass')])

  return (
    <body className="profile">
      <Header />
      <div className="row">
        <div className="cover-profile flex-column mb-3">
          <div>
            <div className="profile mb-2">
              <img className="img" src="/img/user-profile.png" alt />
              {/* <div class="img img-text">
                  <p class="mb-0">M</p>
              </div>  */}
              <div className="input-group-text-changes-images" data-bs-toggle="collapse" href="#btEdtphoto" role="button" aria-expanded="false" aria-controls="btEdtphoto">
                <button className="edt-img">
                  <i className="fas fa-camera" />
                </button>
              </div>
              <div className="collapse" id="btEdtphoto">
                <div className="menu-edtphoto">
                  <div className="border-bottom">
                    <label className="mb-1" htmlFor="inputGroupFile01">
                      <a className="edtphoto">แก้ไขรูปภาพ</a>
                    </label>
                  </div>
                  <input type="file" className="form-control changes-images" id="inputGroupFile01" />
                  <a className="edtphoto" data-bs-toggle="modal" data-bs-target="#edtphotoModal" data-bs-dismiss="modal" aria-label="Close">ลบรูปภาพ</a>
                </div>
                <div className="modal fade" id="edtphotoModal" tabIndex={-1} aria-labelledby="edtphotoModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <i className="far fa-trash-alt" />
                        {/* <i class="fas fa-times-circle" style="text-align: center;"></i> */}
                        <h5 className="modal-title ms-2" id="edtphotoModalLabel">ลบรูปภาพ</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                      </div>
                      <div className="modal-body">
                        คุณต้องการลบรูปภาพใช่หรือไม่?
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" style={{ width: 70 }} data-bs-dismiss="modal">ยกเลิก</button>
                        <button type="button" className="btn btn-danger" style={{ width: 70 }} id="edtphoto" data-bs-dismiss="modal" aria-label="Close">ลบ</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                  <div id="Toastedtphoto" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                      <strong className="me-auto">
                        <i className="fas fa-check-circle" />
                        ลบสำเร็จ!</strong>
                      <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                    </div>
                    <div className="toast-body">
                      รูปภาพถูกลบเรียบร้อยแล้ว
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-0">{data?.data?.data?.username}</h4>
          </div>
        </div>
        <div className="content-profile d-flex">
          <div className="site-nav-profile d-block">
            <div className="text-boxbig">
              <div className="flex-column nav nav-tabs" id="myTab" role="tablist">
                <div className="etprofile nav-link active text-center mb-2" id="Edtprofile-tab" data-bs-toggle="tab" data-bs-target="#Edtprofile" type="button" role="tab" aria-controls="Edtprofile" aria-selected="true">
                  <span className>บัญชีของฉัน</span>
                </div>
                <div className="etprofile nav-link text-center" id="Edtpsw-tab" data-bs-toggle="tab" data-bs-target="#Edtpsw" type="button" role="tab" aria-controls="Edtpsw" aria-selected="false">
                  <span className>เปลี่ยนรหัสผ่าน</span>
                </div>
              </div>
            </div>
          </div>
          <div className="site-profile tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="Edtprofile" role="tabpanel" aria-labelledby="Edtprofile-tab">
              <div className="text-borderbottom">
                <h4>บัญชีของฉัน</h4>
                <p>จัดการข้อมูลของคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</p>
              </div>
              <div className="profile-edit d-block">
                <div className="d-flex">
                  <div className="col-md-3 text-secondary">
                    <h6>ชื่อบัญชีผู้ใช้</h6>
                  </div>
                  <div className="col-md-9">
                    <p className="edit-profile">
                      <span>{data?.data?.data?.username}</span>
                    </p>
                    <div className="collapse" id="collapseUsername">
                      <div className="card card-body">
                        <div className="mb-3 form-group">
                          <label htmlFor="username" className="form-label">ชื่อบัญชีผู้ใช้</label>
                          <input defaultValue={data?.data?.data?.username} type="text" className={`form-control ${(errors.username || usernameUsed) && 'is-invalid'}`} id="username"
                            {...setting('username',
                              {
                                // required: { value: true, message: '' },
                                minLength: { value: 5, message: 'ชื่อผู้ใช้ต้องมีอย่างน้อย 5 ตัวอักษร' },
                                pattern: { value: /^[a-zA-Z0-9]+$/, message: 'ชื่อผู้ใช้จะต้องประกอบไปด้วย a-z, A-Z, 0-9 เท่านั้น' }
                              })} />
                          <div id="validationServer03Feedback" className="invalid-feedback">
                            {errors.username?.message}
                          </div>
                          {
                            usernameUsed &&
                            <div id="isTaken">
                              ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว
                            </div>
                          }
                        </div>
                        <div className="hstack gap-3 edit-information">
                          <button type="submit" className="btn btn-primary btn-save" id="btnusername">บันทึก</button>
                          <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                            <div id="Toastbtnusername" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                              <div className="toast-header">
                                <strong className="me-auto">
                                  <i className="fas fa-check-circle" />
                                  บันทึกสำเร็จ!</strong>
                                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                              </div>
                              <div className="toast-body">
                                ชื่อบัญชีผู้ใช้ถูกบันทึกเรียบร้อยแล้ว
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col-md-3 text-secondary">
                    <h6>อีเมล</h6>
                  </div>
                  <div className="col-md-9">
                    <p className="edit-profile">
                      <span>{data?.data?.data?.email}</span>
                    </p>
                    <div className="collapse" id="collapseEmail">
                      <div className="card card-body">
                        <div className="mb-3 form-group">
                          <label htmlFor="email" className="form-label">อีเมล</label>
                          <input defaultValue={data?.data?.data?.email} type="email" className="form-control is-invalid" id="email" />
                          <div id="validationServer03Feedback" className="invalid-feedback">
                            อีเมลนี้ถูกใช้ไปแล้ว
                          </div>
                        </div>
                        <div className="hstack gap-3 edit-information">
                          <button type="submit" className="btn btn-primary btn-save" id="btnemail">บันทึก</button>
                          <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                            <div id="Toastbtnemail" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                              <div className="toast-header">
                                <strong className="me-auto">
                                  <i className="fas fa-check-circle" />
                                  บันทึกสำเร็จ!</strong>
                                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                              </div>
                              <div className="toast-body">
                                อีเมลถูกบันทึกเรียบร้อยแล้ว
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col-md-3 text-secondary">
                    <h6>ชื่อ</h6>
                  </div>
                  <div className="col-md-9">
                    <p className="edit-profile">
                      <span>{data?.data?.data?.firstname ? data?.data?.data?.firstname : 'ไม่มีข้อมูล'}</span>
                      <a className="edt mb-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFirstname" aria-expanded="false" aria-controls="collapseFirstname">
                        <i className="fas fa-pen icon-edit-firstname" />
                      </a>
                    </p>
                    <div className="collapse" id="collapseFirstname">
                      <div className="card card-body">
                        <div className="mb-3 form-group">
                          <label htmlFor="firstname" className="form-label">ชื่อ</label>
                          <input defaultValue={data?.data?.data?.firstname} type="text" className={`form-control ${(errors.fname) && 'is-invalid'}`} id="firstname"
                            {
                            ...setting('fname',
                            )}
                          />
                        </div>
                        <div className="hstack gap-3 edit-information">
                          <button type="submit" className="btn btn-primary btn-save" id="btnfirstname">บันทึก</button>
                          <fieldset>
                            <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                              <div id="Toastbtnfirstname" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="toast-header">
                                  <strong className="me-auto">
                                    <i className="fas fa-check-circle" />
                                    บันทึกสำเร็จ!</strong>
                                  <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                                </div>
                                <div className="toast-body">
                                  ชื่อถูกเปลี่ยนเรียบร้อยแล้ว
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col-md-3 text-secondary">
                    <h6>นามสกุล</h6>
                  </div>
                  <div className="col-md-9">
                    <p className="edit-profile">
                      <span>{data?.data?.data?.lastname ? data?.data?.data?.lastname : 'ไม่มีข้อมูล'}</span>
                      <a className="edt mb-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLastname" aria-expanded="false" aria-controls="collapseLastname">
                        <i className="fas fa-pen icon-edit-lastname" />
                      </a>
                    </p>
                    <div className="collapse" id="collapseLastname">
                      <div className="card card-body">
                        <div className="mb-3 form-group">
                          <label htmlFor="lastname" className="form-label">นามสกุล</label>
                          <input defaultValue={data?.data?.data?.lastname} type="text" className={`form-control ${(errors.lname) && 'is-invalid'}`} id="lastname"
                            {
                            ...setting('lname',
                            )} />
                        </div>
                        <div className="hstack gap-3 edit-information">
                          <button type="submit" className="btn btn-primary btn-save" id="btnlastname">บันทึก</button>
                          <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                            <div id="Toastbtnlastname" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                              <div className="toast-header">
                                <strong className="me-auto">
                                  <i className="fas fa-check-circle" />
                                  บันทึกสำเร็จ!</strong>
                                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                              </div>
                              <div className="toast-body">
                                นามสกุลถูกเปลี่ยนเรียบร้อยแล้ว
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="Edtpsw" role="tabpanel" aria-labelledby="Edtpsw-tab">
              <div className="text-borderbottom">
                <h4>เปลี่ยนรหัสผ่าน</h4>
                <p>กรุณาอย่าเปิดเผยรหัสผ่านแก่คนอื่นๆ เพื่อความปลอดภัยของบัญชีผู้ใช้คุณเอง</p>
              </div>
              <div className="profile-edit d-block">
                <div className="d-flex">
                  <div className="col-md-3 text-secondary">
                    <h6>รหัสผ่าน</h6>
                  </div>
                  <div className="col-md-9">
                    <p className="edit-profile">
                      <span>*************</span>
                      <a className="edt" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePassword" aria-expanded="false" aria-controls="collapsePassword">
                        <i className="fas fa-pen icon-edit-password" />
                      </a>
                    </p>
                    <div className="collapse" id="collapsePassword">
                      <div className="card card-body">
                        <div className="mb-3 form-group">
                          <label htmlFor="password" className="form-label">รหัสผ่านปัจจุบัน</label>
                          <input type="password" className="form-control is-invalid" id="password" />
                          <div id="validationServer05Feedback" className="invalid-feedback">
                            รหัสผ่านปัจจุบันไม่ถูกต้อง
                          </div>
                        </div>
                        <div className="mb-3 form-group">
                          <label htmlFor="password" className="form-label">รหัสผ่านใหม่</label>
                          <input type="password" className="form-control is-invalid" id="password" />
                          <div id="validationServer05Feedback" className="invalid-feedback">
                            ห้ามตั้งรหัสผ่านซ้ำกับรหัสผ่านปัจจุบัน
                          </div>
                        </div>
                        <div className="mb-3 form-group">
                          <label htmlFor="password" className="form-label">ยืนยันรหัสผ่าน</label>
                          <input type="password" className="form-control is-invalid" id="password" />
                          <div id="validationServer05Feedback" className="invalid-feedback">
                            รหัสผ่านไม่ตรงกัน โปรดลองอีกครั้ง
                          </div>
                        </div>
                        <div className="hstack gap-3 edit-information">
                          <button type="submit" className="btn btn-primary btn-save" id="btnpsw">บันทึก</button>
                          <fieldset>
                            <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                              <div id="Toastbtnpsw" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="toast-header">
                                  <strong className="me-auto">
                                    <i className="fas fa-check-circle" />
                                    บันทึกสำเร็จ!</strong>
                                  <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                                </div>
                                <div className="toast-body">
                                  เปลี่ยนรหัสผ่านสำเร็จแล้ว
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          <fieldset>
                            <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
                              <div id="Toastbtnpsw" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="toast-header">
                                  <strong className="me-auto">
                                    <i className="fas fa-times-circle" />
                                    บันทึกไม่สำเร็จ!</strong>
                                  <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                                </div>
                                <div className="toast-body">
                                  รหัสผ่านยังไม่มีการเปลี่ยนแปลง
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}
