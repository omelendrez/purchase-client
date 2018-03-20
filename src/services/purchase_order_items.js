import HTTP from '../components/lib/http-common'

export default {
  fetchPurchaseOrderItems(payload) {
    return HTTP.get(`purchase_order_items/${payload}`)
  },
  savePurchaseOrderItem(payload) {
    if (payload.id === 0) {
      return HTTP.post('purchase_order_items', payload)
    } else {
      return HTTP.put(`purchase_order_items/${payload.id}`, payload)
    }
  },
  deletePurchaseOrderItem(payload) {
    return HTTP.delete(`purchase_order_items/${payload}`)
  }
}
