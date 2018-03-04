import HTTP from '../components/lib/http-common';

export default {
  fetchProfiles(payload) {
    return HTTP.get(`profiles/${payload}`);
  },
  saveProfile(payload) {
    if (payload.id === 0) {
      return HTTP.post("profiles", payload);
    } else {
      return HTTP.put(`profiles/${payload.id}`, payload);
    }
  },
  deleteProfile(payload) {
    return HTTP.delete(`profiles/${payload}`);
  }
};
