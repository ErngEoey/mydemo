import axios from "axios";

const HttoCommon = axios.create({
  baseURL: '/api',
  headers: {
    'Content-type': 'application/json',
  },
  timeout: 8000,
  timeoutErrorMessage: 'timeout',
})

export default HttoCommon