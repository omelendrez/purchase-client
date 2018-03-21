import HTTP from '../components/lib/http-common'

export default {
  fetchWorkflowSteps(payload) {
    return HTTP.get(`workflow_steps/${payload}`)
  },
  saveWorkflowStep(payload) {
    if (payload.id === 0) {
      return HTTP.post('workflow_steps', payload)
    } else {
      return HTTP.put(`workflow_steps/${payload.id}`, payload)
    }
  },
  deleteWorkflowStep(payload) {
    return HTTP.delete(`workflow_steps/${payload}`)
  }
}
