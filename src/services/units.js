import HTTP from '../components/lib/http-common'

export default {
  fetchUnits () {
    return HTTP.get('units')
  },
  saveUnit (payload) {
    if (payload.id === 0) {
      return HTTP.post('units', payload)
    } else {
      return HTTP.put(`units/${payload.id}`, payload)
    }
  },
  deleteUnit (payload) {
    return HTTP.delete(`units/${payload}`)
  }
}
