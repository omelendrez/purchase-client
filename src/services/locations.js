import HTTP from '../components/http-common'

export default {
  fetchLocations() {
    return HTTP.get('locations')
  },
  saveLocation(payload) {
    if (payload.id === 0) {
      return HTTP.post('locations', payload)
    } else {
      return HTTP.put(`locations/${payload.id}`, payload)
    }
  },
  deleteLocation(payload) {
    return HTTP.delete(`locations/${payload}`)
  }
}
