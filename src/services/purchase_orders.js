import HTTP from '../components/lib/http-common'

export default {
  fetchPurchaseOrders(payload) {
    return HTTP.get(`purchase_orders/${payload}`)
  },
  savePurchaseOrder(payload) {
    if (payload.id === 0) {
      return HTTP.post('purchase_orders', payload)
    } else {
      return HTTP.put(`purchase_orders/${payload.id}`, payload)
    }
  },
  deletePurchaseOrder(payload) {
    return HTTP.delete(`purchase_orders/${payload}`)
  }
}
