import axios from 'axios'
// http://localhost:3020/
// https://escng-purchase.herokuapp.com/
import Store from "../../store/store";

const HTTP = axios.create({
  baseURL: 'http://localhost:3020/',
  onDownloadProgress: function (progressEvent) {
    if (progressEvent.loaded === progressEvent.total) {
      Store.dispatch("LOADED")
    }
  },
  headers: {
    // Authorization: 'Bearer {token}'
  }
})

export {
  HTTP as default
}
