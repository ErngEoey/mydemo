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

// async function SignOut(data){
//   const res = await To(HttpCommon.post('/logout',data))
//   return res
// }

async function SignOut(data){
  const res = await To(HttpCommon.post('/logout',{params: {data}}))
  return res
}

export {
  Login, Signup, SignOut
}