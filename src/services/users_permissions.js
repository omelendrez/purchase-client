import HTTP from "../components/lib/http-common";

export default {
  fetchUserPermissions(payload) {
    return HTTP.get(`users_permissions/${payload}`);
  },
  saveUserPermission(payload) {
    return HTTP.post("users_permissions", payload);
  },
  deleteUserPermission(payload) {
    return HTTP.delete(`users_permissions/${payload}`);
  }
};
