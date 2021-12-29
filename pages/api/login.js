import axios from 'axios';
import ConfigFormData from '../../helpers/ConfigFormData';
import To from '../../helpers/HandleResponse';

var FormData = require('form-data')

export default async function handler(req, res) {
  const data = req.body
  console.log("data-->", data)

  let formData = new FormData();

  if (data.type == 'normal') {
    formData.append('username', data.email)
    formData.append('password', data.password)
    formData.append('type_person', data.type)
    console.log('formData')
    console.log(formData)
  } else {
    formData.append('username', data.email)
    formData.append('google_id', data.googleId)
    formData.append('type_person', data.type)
    console.log('formData')
    console.log(formData)
  }

  const config = await ConfigFormData(
    req, '/signin', formData
  )
  const response = await To(axios(config))
  console.log('response')
  console.log(response)

  // const index = db.find(x => (x.username === username) && x.password === password);

  res.status(response.status).json(response.data)
}
