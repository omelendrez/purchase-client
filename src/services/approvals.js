import HTTP from '../components/lib/http-common'

export default {
  fetchDocumentById(payload) {
    return HTTP.get(`approvals/${payload.document_type}/${payload.document_id}`)
  }
}
