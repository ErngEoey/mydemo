import axios from 'axios';
import ConfigFormData from '../../helpers/ConfigFormData';
import To from '../../helpers/HandleResponse';

var FormData = require('form-data')

export default async function handler(req, res) {
  const data = req.body

  let formData = new FormData();

  if (data.type == 'normal') {
    formData.append('username', data.username)
    formData.append('password', data.password)
    formData.append('confirm_password', data.confirmPass)
    formData.append('email', data.email)
    formData.append('firstname', data.fname)
    formData.append('lastname', data.lname)
    formData.append('type_person', data.type)
  }else{
    formData.append('firstname', data.fname)
    formData.append('lastname', data.lname)
    formData.append('email', data.email)
    formData.append('google_id', data.googleId)
    formData.append('type_person', data.type)
  }

  const config = await ConfigFormData(
    req, '/signup', formData
  )
  const response = await To(axios(config))

  res.status(response.status).json(response.data)
}