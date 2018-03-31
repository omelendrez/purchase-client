import HTTP from '../components/lib/http-common'

export default {
  setDocumentStatus (payload) {
    return HTTP.post('document_status', payload)
  },
  fetchDocumentStatus (payload) {
    return HTTP.get(`document_status/${payload.document_type}/${payload.document_id}`)
  },
  fetchDocument (payload) {
    return HTTP.get(`document_status/document/${payload.document_type}/${payload.document_id}`)
  }
}
