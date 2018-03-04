import HTTP from '../components/lib/http-common'

export default {
  fetchDepartments(payload) {
    return HTTP.get(`departments/${payload}`)
  },
  saveDepartment(payload) {
    if (payload.id === 0) {
      return HTTP.post('departments', payload)
    } else {
      return HTTP.put(`departments/${payload.id}`, payload)
    }
  },
  deleteDepartment(payload) {
    return HTTP.delete(`departments/${payload}`)
  }
}
