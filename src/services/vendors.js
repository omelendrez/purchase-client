import HTTP from '../components/lib/http-common'

export default {
  fetchVendors (payload) {
    return HTTP.get(`vendors/${payload}`)
  },
  saveVendor (payload) {
    if (payload.id === 0) {
      return HTTP.post('vendors', payload)
    } else {
      return HTTP.put(`vendors/${payload.id}`, payload)
    }
  },
  deleteVendor (payload) {
    return HTTP.delete(`vendors/${payload}`)
  }
}
