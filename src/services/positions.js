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
  fetchSectorPositions(payload) {
    return HTTP.get(`positions/${payload.sector_id}/sector`, payload)
  },
  fetchPositionSector() {
    return HTTP.get(`positions/sector`)
  },
  deletePosition(payload) {
    return HTTP.delete(`positions/${payload}`);
  }
};
