import HTTP from '../components/http-common'

export default {
  fetchBranches() {
    return HTTP.get('locations')
  },
  saveBranch(payload) {
    if (payload.id === 0) {
      return HTTP.post('locations', payload)
    } else {
      return HTTP.put(`locations/${payload.id}`, payload)
    }
  },
  deleteBranch(payload) {
    return HTTP.delete(`locations/${payload}`)
  }
}
