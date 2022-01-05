import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Index() {

  const router = useRouter();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("token"))) {
      router.push('/signin')
    }
  }, [])

  return (
    <body>
      <main className="main-home">
        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col-6 h-left text-center">
                <img className="img-home" src="../img/travel.jpg" alt="" />
              </div>
              <div className="col-6 h-right">
                <article>
                  <h1>Lorem ipsum dolor sit,</h1>
                  <p> amet consectetur adipisicing elit. Aliquid vitae, fugit,
                    veritatis eveniet recusandae unde quos laboriosam qui officia nulla iste tempora nam excepturi.
                    Assumenda optio quidem dignissimos voluptatem possimus!</p>
                  <a href="#" className="btn-home">Click</a>
                </article>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="footer">
        <div className="bottom">
          <p className="copy-right">@ 2021 Tenfuse.</p>
        </div>
      </footer>
    </body>
  )
}
