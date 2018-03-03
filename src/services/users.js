import HTTP from "../components/http-common";

export default {
  fetchUsers() {
    return HTTP.get("users");
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
  deleteUser(payload) {
    return HTTP.delete(`users/${payload}`);
  }
};
