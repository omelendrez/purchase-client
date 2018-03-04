import axios from 'axios'
// http://localhost:3010/
// https://pure-ridge-51583.herokuapp.com/
const HTTP = axios.create({
  baseURL: 'https://escng-purchase.herokuapp.com/',
  headers: {
    // Authorization: 'Bearer {token}'
  }
})

export {
  HTTP as default
}
