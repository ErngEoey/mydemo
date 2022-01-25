import axios from 'axios';
import ConfigFormData from '../../helpers/ConfigFormData';
import To from '../../helpers/HandleResponse';

var FormData = require('form-data')

export default async function handler(req, res) {
  const data = req.body

  let formData = new FormData();

  formData.append('email', data.email)
  formData.append('type_person', 'normal')

  const config = await ConfigFormData(
    req, '/forgot', formData
  )
  const response = await To(axios(config))

  res.status(response.status).json(response.data)
}