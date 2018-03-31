import HTTP from '../components/lib/http-common'

export default {
  fetchRequisitionItems (payload) {
    return HTTP.get(`requisition_items/${payload}`)
  },
  saveRequisitionItem (payload) {
    if (payload.id === 0) {
      return HTTP.post('requisition_items', payload)
    } else {
      return HTTP.put(`requisition_items/${payload.id}`, payload)
    }
  },
  deleteRequisitionItem (payload) {
    return HTTP.delete(`requisition_items/${payload}`)
  }
}
