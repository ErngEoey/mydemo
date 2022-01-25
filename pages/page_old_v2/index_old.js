import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from "../../components/Header";

export default function Index() {
  const router = useRouter();
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token")));
    if (!JSON.parse(localStorage.getItem("token"))) {
      router.push('/signin')
    }
  }, [])

  return (
    <body>
        <section className="header">
        <Header />
          <div className="welcomeMessage">
            <h1>
              Welcome
            </h1>
            <h2 className="welcome-h2">
              ยินดีต้อนรับเข้าสู่ระบบ
            </h2>
          </div>
        </section>
        <section id="welcome">
          <div className="container">
            <div className="welcome text-center">
              <h1>ที่เที่ยวยอดนิยมในประเทศไทย</h1>
              <p>เพลิดเพลินไปกับช่วงเวลาที่น่าจดจำของคุณด้วยเที่ยวบินและสถานที่พักที่น่าพอใจนับล้านที่เรารวบรวมมาไว้ให้กับคุณที่นี่แล้ว คุณจะพบกับประสบการณ์และโปรโมชั่นราคาที่ดีที่สุดแบบที่ไม่เคยมีมาก่อน</p>
              <button type="button" className="btn btn-readmore" href="#">อ่านเพิ่มเติม</button>
            </div>
          </div>
        </section>
        <section className="about">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center p-0">
                <img src="/img/picture3.jpg" className="img-travel" />
              </div>
              <div className="col-md-6">
                <h3>ดีลโรงแรมดีที่สุดจากเว็บไซต์จองโรงแรมชั้นนำ</h3>
                <p>ดีลโรงแรมดีที่สุดจากเว็บไซต์จองโรงแรมชั้นนำกว่า 100,000 แห่ง ไม่ว่าคุณจะเป็นนักท่องเที่ยวสายหรู 5 ดาว สายประหยัดอยู่ง่าย ตลอดไปจนถึงสายรักครอบครัว เราก็สามารถจัดการหาที่พักสุดแสนเหมาะสมเพื่อคุณและคนที่คุณรักได้ในราคาที่คุ้มที่สุด แถมจองง่ายสะดวกรวดเร็วเพียงไม่กี่ขั้นตอน</p>
                <button type="button" className="btn btn-primary" style={{ width: 108 }}>อ่านรีวิว</button>
                <button type="button" className="btn btn-secondary ms-2" style={{ width: 108 }}>รายละเอียด</button>
              </div>
            </div>
          </div>
        </section>
        <section className="guide">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h3>เที่ยวเกาะหลีเป๊ะ กิน เที่ยว พักที่ไหน?<br />รีวิวมาให้ครบ! ฉบับปี 2021</h3>
                <p>สถานที่ท่องเที่ยวไหนเป็นที่นิยมที่สุดในเกาะหลีเป๊ะ? มีคู่มือท่องเที่ยวเกาะหลีเป๊ะล่าสุด ปี 2022 โดยได้รวบรวมข้อมูลสถานที่ท่องเที่ยวยอดนิยม ได้แก่ หาดซันไรส์,หาดพัทยา,หาดซันเซ็ต เกาะหลีเป๊ะ อยู่ใน เมืองสตูลมาเพิ่มพูน ธรรมชาติ ให้สดใสมาพักผ่อน ร่างกาย สบายใจช่างสุขใจ สุขจิต ชีวิตดี</p>
                <button type="button" className="btn btn-primary" style={{ width: 108 }}>อ่านรีวิว</button>
                <button type="button" className="btn btn-secondary ms-2" style={{ width: 108 }}>รายละเอียด</button>
              </div>
              <div className="col-md-6 p-0">
                <iframe src="https://www.youtube.com/embed/1JVEQbDmNJg" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="img-travel" />
              </div>
            </div>
          </div>
        </section>
        <section className="pricing">
          <div className="container">
            <div className="pricing">
              <article className="text-center">
                <h1>ท่องเที่ยววันนี้ราคาถูกกว่า</h1>
                <p>ที่พักแนะนำ - อ้างอิงจากที่พักที่ท่านเคยดูข้อมูล</p>
              </article>
              <div>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <div className="box-content">
                  <div className="box-header">
                    <article className="border-bottom mb-3">
                      <a className="prc mb-0" href="#">โรงแรมเบอรีเคียว หัวหิน (Bercure Hua-Hin)</a>
                      <h2>฿ 1,353</h2>
                    </article>
                    <div className="w-textcontent">
                      <article className="text-secondary">
                        <div className="d-flex">
                          <i className="icon-color fas fa-check-circle mt-1" />
                          <p className="ms-2 mb-0">สระว่ายน้ำกลางแจ้ง</p>
                        </div>
                        <div className="d-flex">
                          <i className="icon-color fas fa-check-circle mt-1" />
                          <p className="ms-2 mb-0">รูมเซอร์วิส 24 ชั่วโมง</p>
                        </div>
                        <div className="d-flex">
                          <i className="icon-color fas fa-check-circle mt-1" />
                          <p className="ms-2 mb-0">Wi-Fi ทุกห้อง (ฟรี)</p>
                        </div>
                        <div className="d-flex">
                          <i className="icon-color fas fa-check-circle mt-1" />
                          <p className="ms-2 mb-0">ห้องอาหาร</p>
                        </div>
                        <div className="d-flex">
                          <i className="icon-color fas fa-check-circle mt-1" />
                          <p className="ms-2 mb-0">บาร์</p>
                        </div>
                      </article>
                    </div>
                    <div>
                      <button className="btn-pricing btn btn-secondary">เต็มหมดแล้ว</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="box-content">
                  <div className="box-header">
                    <article className="border-bottom mb-3">
                      <a className="prc mb-0" href="#">อาโอวี หัวหิน โฮเทล (Rov Hua-Hin Hotel)</a>
                      <h2 className="price-red">฿ 1,009</h2>
                    </article>
                    <div className="w-textcontent">
                      <article className="text-secondary">
                        <div className="d-flex">
                          <i className="icon-color-green fas fa-check-circle mt-1" />
                          <p className="ms-2 mb-0">แผนกต้อนรับ (24 ชั่วโมง)</p>
                        </div>
                        <div className="d-flex">
                          <i className="icon-color-green fas fa-check-circle mt-1" />
                          <p className="ms-2 mb-0">บริการรถรับส่ง</p>
                        </div>
                        <div className="d-flex">
                          <i className="icon-color-green fas fa-check-circle mt-1" />
                          <p className="ms-2 mb-0">ห้องฟิตเนส</p>
                        </div>
                        <div className="d-flex">
                          <i className="icon-color-green fas fa-check-circle mt-1" />
                          <p className="ms-2 mb-0">สปา</p>
                        </div>
                      </article>
                    </div>
                    <div>
                      <button className="btn-pricing btn btn-primary">เลือกห้องพัก</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="box-content">
                  <div className="box-header">
                    <article className="border-bottom mb-3">
                      <a className="prc mb-0" href="#">เดอะซัน อพาร์ตเม้นต์ ชะอำ (The Sun Apartment Cha-am)</a>
                      <h2>฿ 556</h2>
                    </article>
                    <div className="w-textcontent">
                      <article className="text-secondary">
                        <div className="d-flex">
                          <i className="icon-color fas fa-check-circle mt-1" />
                          <p className="ms-2 mb-0">เช็คอิน/เช็คเอาต์ด่วนพิเศษ</p>
                        </div>
                        <div className="d-flex">
                          <i className="icon-color fas fa-check-circle mt-1" />
                          <p className="ms-2 mb-0">อาหารเช้า (ฟรี)</p>
                        </div>
                        <div className="d-flex">
                          <i className="icon-color fas fa-check-circle mt-1" />
                          <p className="ms-2 mb-0">Wi-Fi (ฟรี)</p>
                        </div>
                      </article>
                    </div>
                    <div>
                      <button className="btn-pricing btn btn-secondary">เต็มหมดแล้ว</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="box-content">
                  <div className="box-header">
                    <article className="border-bottom mb-3">
                      <a className="prc mb-0" href="#">บ้านชะอำลุงไก่ (Baan Cha-am Lung Gai)</a>
                      <h2 className="price-red">฿ 353</h2>
                    </article>
                    <div className="w-textcontent">
                      <article className="text-secondary">
                        <div className="d-flex">
                          <i className="icon-color-green fas fa-check-circle mt-1" />
                          <p className="ms-2 mb-0">ที่จอดรถ</p>
                        </div>
                        <div className="d-flex">
                          <i className="icon-color-green fas fa-check-circle mt-1" />
                          <p className="ms-2 mb-0">กาแฟและชา</p>
                        </div>
                      </article></div>
                    <div>
                      <button className="btn-pricing btn btn-primary">เลือกห้องพัก</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="download">
          <div className="container">
            <div className="row">
              <div className="col-md-6 p-0">
                <img src="/img/picture1.jpg" className="img-travel" />
              </div>
              <div className="col-md-6">
                <h3>สมัครรับจดหมายข่าว</h3>
                <p>คุณสามารถสมัครรับข้อเสนอและการอัปเดตในอีเมลของคุณ เพื่อรับข้อเสนอและโปรโมชั่นที่พิเศษที่สุดก่อนใคร</p>
                <div className="input-group" style={{ width: '75%' }}>
                  <input type="email" className="form-control" placeholder="ป้อนที่อยู่อีเมล" />
                  <div className="input-group-append ms-3">
                    <button type="submit" className="btn btn-primary">ลงทะเบียน</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </body>
  )
}
