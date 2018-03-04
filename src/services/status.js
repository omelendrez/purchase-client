import HTTP from '../components/lib/http-common'

export default {
  fetchStatus () {
    return HTTP.get('status')
  }
}
