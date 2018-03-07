import HTTP from "../components/lib/http-common";

export default {
  fetchProjects(payload) {
    return HTTP.get(`projects/${payload}`);
  },
  saveProject(payload) {
    if (payload.id === 0) {
      return HTTP.post("projects", payload);
    } else {
      return HTTP.put(`projects/${payload.id}`, payload);
    }
  },
  deleteProject(payload) {
    return HTTP.delete(`projects/${payload}`);
  }
};
