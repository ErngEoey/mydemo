export default async function (req, url, data) {
  let config = {
    method: req.method,
    url: "http://ffad-171-100-79-34.ngrok.io" + url,
    data: data,
    headers: {
      "Content-type": "multipart/form-data",
      // Authorization: "Bearer " + req.headers.access_token,
      ...data.getHeaders(),
    },
  };
  return config;
}