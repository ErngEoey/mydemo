import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { SignOut, getProfile } from '../services';
import { useQuery, useQueryClient } from 'react-query';

export default function Header() {
  const router = useRouter();
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token")))
      setToken(JSON.parse(localStorage.getItem("token")));
  }, [])

  function logOut() {
    console.log(token);
    SignOut(token?.access_token).then(res => {
      console.log(res);
      if (res.status !== 200) throw res
      localStorage.removeItem('token');
      router.push('/signin');
    }).catch(e => {
      console.log('login error ', e)
    })
  }

  const { data, isLoading, isError } = useQuery(token ? "getUser" : undefined, token ? () => getProfile(token?.access_token) : undefined)
  console.log(data);

  return (
    <>
      {isLoading ? <></> : <>
        <header className="head">
          <nav className="navbar navbar-expand-lg navbar-light head__custom-nav">
            <div className="logo-nav">
              <Link href='/'><h3>Logo</h3></Link>
            </div>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <div className="navbar-nav">
                <div className="header-icon">
                  <div className="user-menu">
                    <article>
                      <i className="fas fa-user-circle" />
                      <p className="ms-1">{data?.data?.data?.type_of_person_id == 'normal' ? data?.data?.data?.username : data?.data?.data?.firstname}</p>
                    </article>
                    <div className="wrap-menu">
                      <div className="menu-content">
                        {
                          router.asPath == "/" &&
                          <div className="icon-menu border-bottom mb-2" role="button">
                            <i className="icon-content fas fa-cog fa-xs" />
                            <Link href='/profile_setting'><a className="text-content ms-2" role="button">ตั้งค่าโปรไฟล์</a></Link>
                          </div>
                        }
                        {
                          router.asPath == "/profile_setting" &&
                          <div className="icon-menu border-bottom mb-2" role="button">
                            <i className="icon-content fas fa-home fa-xs" />
                            <Link href='/'><a className="text-content ms-2" role="button">หน้าหลัก</a></Link>
                          </div>
                        }
                        <div className="icon-menu" role="button">
                          <i className="icon-content fas fa-sign-out-alt fa-xs" />
                          <a className="text-content ms-2" role="button" onClick={logOut}>ออกจากระบบ</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header></>}
    </>
  )
}
