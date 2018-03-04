import HTTP from "../components/http-common";

export default {
  fetchPositions() {
    return HTTP.get("positions");
  },
  savePosition(payload) {
    if (payload.id === 0) {
      return HTTP.post("positions", payload);
    } else {
      return HTTP.put(`positions/${payload.id}`, payload);
    }
  },
  deletePosition(payload) {
    return HTTP.delete(`positions/${payload}`);
  }
};
