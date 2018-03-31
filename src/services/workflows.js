import HTTP from '../components/lib/http-common'

export default {
  fetchWorkflows (payload) {
    return HTTP.get(`workflows/${payload}`)
  },
  saveWorkflow (payload) {
    if (payload.id === 0) {
      return HTTP.post('workflows', payload)
    } else {
      return HTTP.put(`workflows/${payload.id}`, payload)
    }
  },
  deleteWorkflow (payload) {
    return HTTP.delete(`workflows/${payload}`)
  }
}
