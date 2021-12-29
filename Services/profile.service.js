import To from "../helpers/HandleResponse";
import HttpCommon from "../helpers/Http-common";

async function getProfile(data) {
  // console.log(data)
  const res = await To(HttpCommon.get('/getProfile', { params: { token: data } }))
  return res
}

async function updateProfile(token,data) {
  // console.log(data)
  const res = await To(HttpCommon.put('/updateProfile', {token,data}))
  return res
}

export {
  getProfile, updateProfile
}