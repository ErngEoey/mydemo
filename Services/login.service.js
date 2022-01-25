import To from "../helpers/HandleResponse";
import HttpCommon from "../helpers/Http-common";

async function Login(data){
  const res = await To(HttpCommon.post('/login',data))
  return res
}

async function Signup(data){
  const res = await To(HttpCommon.post('/signup',data))
  return res
}

async function SignOut(data){
  const res = await To(HttpCommon.post('/logout',{params: {data}}))
  return res
}

async function ForgotPwd(data){
  const res = await To(HttpCommon.post('/forgot_password',data))
  return res
}

async function ResetPwd(token,data){
  const res = await To(HttpCommon.put('/reset_password', {token,data}))
  return res
}

async function VerifyEmail(token) {
  // console.log(data)
  const res = await To(HttpCommon.put('/verify_email', {token}))
  return res
}

export {
  Login, Signup, SignOut, ForgotPwd, ResetPwd, VerifyEmail
}