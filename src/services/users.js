import HTTP from '../components/lib/http-common'

export default {
  fetchUsers(payload) {
    return HTTP.get(`users/${payload}`);
  },
  login(payload) {
    return HTTP.post("login", payload);
  },
  saveUser(payload) {
    if (payload.id === 0) {
      return HTTP.post("users", payload);
    } else {
      return HTTP.put(`users/${payload.id}`, payload);
    }
  },
  changePassword(payload) {
    return HTTP.put(`users/${payload.id}/password`, payload);
  },
  resetPassword(payload) {
    return HTTP.put(`users/${payload.id}/password-reset`, payload);
  },
  deleteUser(payload) {
    return HTTP.delete(`users/${payload}`);
  }
};
