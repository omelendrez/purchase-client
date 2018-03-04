import HTTP from '../components/http-common'

export default {
  fetchDepartments() {
    return HTTP.get('departments')
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
