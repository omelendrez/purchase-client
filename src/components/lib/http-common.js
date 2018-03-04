import axios from 'axios'
// http://localhost:3020/
// https://escng-purchase.herokuapp.com/
const HTTP = axios.create({
  baseURL: 'https://escng-purchase.herokuapp.com/',
  headers: {
    // Authorization: 'Bearer {token}'
  }
})

export {
  HTTP as default
}
