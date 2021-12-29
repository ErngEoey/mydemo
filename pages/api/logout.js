import axios from 'axios';
import Config from '../../helpers/Config';
import To from '../../helpers/HandleResponse';

export default async function handler(req, res) {
  console.log("token-->",req.body)
  req.headers.access_token = req.body.params.data
  const config = await Config(
    req, '/logout'
  )
  const response = await To(axios(config))
  // console.log('response')
  // console.log(response)

  // const index = db.find(x => (x.username === username) && x.password === password);

  res.status(response?.status).json(response?.data)
}