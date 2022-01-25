import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { VerifyEmail } from '../services';

export default function CheckEnable() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.token) {
      localStorage.setItem("verify_token", JSON.stringify(router.query.token));
      verifyEmail();
    }
    if (JSON.parse(localStorage.getItem("is_enable")) == false) {
      localStorage.removeItem('verify_token');
      router.push('/personal_setting')
    } else {
      localStorage.removeItem('verify_token');
      localStorage.removeItem("is_enable")
      router.push('/')
    }
  }, [router.query.token])

  function verifyEmail() {
    const token = JSON.parse(localStorage.getItem("verify_token"));
    console.log(token);
    VerifyEmail(token).then(res => {
      if (res.status !== 200) throw res
      console.log(res)
    }).catch(e => {
      console.log('error', e)
    })
  }

  return (
    <>
    </>
  )
}