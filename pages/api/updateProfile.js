import axios from 'axios';
import Config from '../../helpers/Config';
import To from '../../helpers/HandleResponse';

var FormData = require('form-data')
var qs = require('qs');

export default async function handler(req, res) {
  const data = req.body
  console.log(data)
  req.headers.access_token = data.token
  // let formData = new FormData();
  // formData.append('username', data.data.username)
  // formData.append('current_password', data.data.currentPass)
  // formData.append('password', data.data.password)
  // formData.append('confirm_password', data.data.confirmPass)
  // formData.append('email', data.data.email)
  // formData.append('firstname', data.data.fname)
  // formData.append('lastname', data.data.lname)

  var formUrl = qs.stringify({
    'username': data.data.username,
    'current_password': data.data.currentPass,
    'password': data.data.password,
    'confirm_password': data.data.confirmPass,
    'firstname': data.data.fname,
    'lastname': data.data.lname,
    'email': data.data.email
  });

  const config = {
    method: req.method,
    url: "https://0af5-58-11-27-222.ngrok.io" + '/updateprofileuser',
    data: formUrl,
    headers: {
      "Content-type": 'application/x-www-form-urlencoded',
      Authorization: "Bearer " + data.token,
      // ...data.getHeaders(),
    },
  };
  const response = await To(axios(config))

  res.status(response.status).json(response.data)
}