import axios from 'axios';
import Config from '../../helpers/Config';
import To from '../../helpers/HandleResponse';

export default async function handler(req, res) {
  console.log("token-->",req.body.token)
  req.headers.access_token = req.body.token
  const config = await Config(
    req, '/verifyemail'
  )
  const response = await To(axios(config))
  // console.log('response')
  // console.log(response)

  res.status(response?.status).json(response?.data)
}
