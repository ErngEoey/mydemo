import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { VerifyEmail } from '../services';

export default function SignupVerify() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.token) {
      localStorage.setItem("verify_token", JSON.stringify(router.query.token));
      verifyEmail();
    }
  }, [router.query.token])

  function verifyEmail() {
    const token = JSON.parse(localStorage.getItem("verify_token"));
    console.log(token);
    VerifyEmail(token).then(res => {
      if (res.status !== 200) throw res
      console.log(res)
      localStorage.removeItem('verify_token');
      router.push('/signup_success')
    }).catch(e => {
      console.log('error', e)
      localStorage.removeItem('verify_token');
      router.push('/signup_fail')
    })
  }

  return (
    <>
    </>
  )
}