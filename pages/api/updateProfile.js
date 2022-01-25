import axios from 'axios';
import Config from '../../helpers/Config';
import To from '../../helpers/HandleResponse';

var FormData = require('form-data')
var qs = require('qs');

export default async function handler(req, res) {
  const data = req.body
  console.log(data)
  req.headers.access_token = data.token

  var formUrl = qs.stringify({
    'username': data.data.username,
    'current_password': data.data.currentPass,
    'password': data.data.password,
    'confirm_password': data.data.confirmPass,
    'firstname': data.data.fname,
    'lastname': data.data.lname,
    'email': data.data.email
  });

  console.log('formUrl to update')
  console.log(formUrl)

  const config = {
    method: req.method,
    url: "http://ffad-171-100-79-34.ngrok.io" + '/updateprofileuser',
    data: formUrl,
    headers: {
      "Content-type": 'application/x-www-form-urlencoded',
      Authorization: "Bearer " + data.token,
    },
  };
  const response = await To(axios(config))

  res.status(response.status).json(response.data)
  // setTimeout(() => {res.status(response.status).json(response.data) }, 10000);
  
}