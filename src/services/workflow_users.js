import HTTP from '../components/lib/http-common'

export default {
  fetchWorkflowUsers(payload) {
    return HTTP.get(`workflow_users/${payload}`)
  },
  saveWorkflowUser(payload) {
    return HTTP.post('workflow_users', payload)
  },
  deleteWorkflowUser(payload) {
    return HTTP.delete(`workflow_users/${payload.workflow_id}/type/${payload.user_type}`)
  }
}
