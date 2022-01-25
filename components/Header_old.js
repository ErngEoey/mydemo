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
      <style jsx>{` 
.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-items: center;
    color: white;
}
.header-icon{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
/*.lang-button {
    background-color: whitesmoke;
    border-radius: 1rem;
    padding: .25rem .5rem .25rem .5rem;
}*/
.user-menu{
    position: relative;
}
.user-menu .wrap-menu{
    display: none;
    position: absolute;
    top: 1.5rem;
    right: 0;
    padding-top: 1rem;
}
.user-menu .wrap-menu .menu-content {
    background-color: rgb(255, 255, 255);
    color: black;
    padding: .5rem;
    border-radius: .25rem;
    width: 10rem;
}
.user-menu:hover .wrap-menu{
    display: block;
}
.icon-menu {
    display: flex;
}
.icon-content {
    margin-top: .75rem;
}
.text-content {
    margin-bottom: .5rem;
}
/*้header end*/
.side-profile .card-body{
    width: 100%;
}
.card{
    display: flex;
    flex-direction: column;
}
a.text-content {
    color: black;
    text-decoration: none;
}
.shadow.card {
    position: inherit;
}
.input-group{
    display: block;
}
.form-control.changes-images{
    position: absolute;
    z-index: -1;
    top: 0;
	width: 0;
	height: 0;
	visibility: hidden;
}
.input-group-text-changes-images{
    width: 155px;
    height: 40px;
    background-color: #1a73e8;
    border-radius: 4px;
    padding: .5rem;
}
button.btn-light{
    color: #1a73e8;
    width: 100px;
    height: 40px;
    margin-right: .5rem;
}
button.btn-primary{
    width: 100px;
    height: 40px;
}
button.btn-light.icon-delete{
    border: thin solid #cecece;
    width: 150px;
    height: 40px;
    margin-right: .5rem;
}
button.btn-primary.icon-change{
    width: 150px;
    height: 40px;
}
button.edit{
    background-color: #3764B9;
    border: thin solid #3764B9;
}
h3.text-images{
    font-size: 20px;
    color: #3764B9;
}
.edit-profile{
    display: flex;
    justify-content: space-between;
}
.content{
    background-color: white;
}
.sidebar{
    background-color: white;
    color: white;
    height: 100%;
}
.sidebar a{
    margin-left: 10px;
    display: block;
    color: white;
    padding-bottom: 10px;
    font-size: 30px;
    text-decoration: none;
}
.logoHeading{
  color: white;
}
.text-profile-picture{
    color: black;
} `}</style>
      <style global jsx>{` *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
body{
    background-color: #222d32 !important;
    font-family: 'Montserrat', sans-serif;
} `}</style>
      <div className="container">
        <div className="header-content">
          <div>
            <Link href='/'><a className='logoHeading'><h3 className="pt-1">Logo</h3></a></Link>
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
