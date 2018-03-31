import HTTP from '../components/lib/http-common'

export default {
  fetchLocations (payload) {
    return HTTP.get(`locations/${payload}`)
  },
  saveLocation (payload) {
    if (payload.id === 0) {
      return HTTP.post('locations', payload)
    } else {
      return HTTP.put(`locations/${payload.id}`, payload)
    }
  },
  deleteLocation (payload) {
    return HTTP.delete(`locations/${payload}`)
  }
}
