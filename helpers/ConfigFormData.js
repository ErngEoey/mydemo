export default async function (req, url, data) {
  let config = {
    method: req.method,
    url:"http://70bb-27-145-207-169.ngrok.io" + url,
    data: data,
    headers: {
      "Content-type": "multipart/form-data",
      // Authorization: "Bearer " + req.headers.access_token,
      ...data.getHeaders(),
    },
  };
  return config;
}