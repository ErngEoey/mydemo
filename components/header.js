import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { SignOut } from '../services/login.service';

const Header = () => {
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

  return (
    <header className="hd-home p-2 mb-2 border-bottom">
      <div className="container">
        <div className="header-content">
          <div>
            <h3 className="pt-1">Logo</h3>
          </div>
          <div className="header-icon">
            <div className="lang-button">
              <i className="fas fa-globe fa-sm me-1"></i>
              <span>English</span>
              <span type="arrow-down" className="fa"></span>
            </div>
            <div>
              <i className="p-2 far fa-question-circle fa-lg" role="button"></i>
            </div>
            <div className="user-menu">
              <i className="p-2 far fa-user-circle fa-lg" role="button"></i>
              <div className="wrap-menu">
                <div className="menu-content">
                  <div className="icon-menu border-bottom" role="button">
                    <i className="icon-content fas fa-cog fa-xs"></i>
                    <Link href='/profile_setting'><a className="text-content ms-2" role="button">Profile Setting</a></Link>
                  </div>
                  <div className="icon-menu border-bottom" role="button">
                    <i className="icon-content fas fa-sign-out-alt fa-xs"></i>
                    <a className="text-content ms-2" role="button" onClick={logOut}>Sign out</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
