export default function To(promise) {
  return promise
  .then((data) => {
  return data;
  })
  .catch((e) => {
  // console.log(e);
  return e.response;
  });
  }