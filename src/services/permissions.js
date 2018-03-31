import HTTP from '../components/lib/http-common'

export default {
  fetchPermissions () {
    return HTTP.get('permissions')
  },
  savePermission (payload) {
    if (payload.id === 0) {
      return HTTP.post('permissions', payload)
    } else {
      return HTTP.put(`permissions/${payload.id}`, payload)
    }
  },
  deletePermission (payload) {
    return HTTP.delete(`permissions/${payload}`)
  }
}
