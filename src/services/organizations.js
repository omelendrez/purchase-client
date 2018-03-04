import HTTP from '../components/http-common'

export default {
  fetchOrganizations() {
    return HTTP.get('organizations')
  },
  saveOrganization(payload) {
    if (payload.id === 0) {
      return HTTP.post('organizations', payload)
    } else {
      return HTTP.put(`organizations/${payload.id}`, payload)
    }
  },
  deleteOrganization(payload) {
    return HTTP.delete(`organizations/${payload}`)
  }
}
