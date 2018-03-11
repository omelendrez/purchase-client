import HTTP from '../components/lib/http-common'

export default {
  fetchRequisitions(payload) {
    return HTTP.get(`requisitions/${payload}`)
  },
  saveRequisition(payload) {
    if (payload.id === 0) {
      return HTTP.post('requisitions', payload)
    } else {
      return HTTP.put(`requisitions/${payload.id}`, payload)
    }
  },
  deleteRequisition(payload) {
    return HTTP.delete(`requisitions/${payload}`)
  }
}
