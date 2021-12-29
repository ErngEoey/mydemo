export default async function (req, url, data) {
  let config = {
    method: req.method,
    url:"https://0af5-58-11-27-222.ngrok.io" + url,
    data: data,
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + req.headers.access_token,
    },
  };
  return config;
}