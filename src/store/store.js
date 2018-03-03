import Vue from "vue";
import Vuex from "vuex";

import Locations from "./../services/locations";
import Positions from "./../services/positions";
import Profiles from "./../services/profiles";
import Status from "./../services/status";
import Users from "./../services/users";

import * as types from "../store/mutation-types";

Vue.use(Vuex);

const state = {
  option: false,
  locations: [],
  positions: [{ rows: [] }],
  profiles: [],
  status: [],
  users: [],
  user: [],
  password: [],
  record: [],
  results: []
};

export default new Vuex.Store({
  state,
  actions: {
    [types.SET_MENU_OPTION]({ commit }, option) {
      commit(types.ASSIGN_MENU_OPTION, {
        payload: option
      });
    },

    [types.ADD_ITEM]({ commit }, item) {
      commit(types.SET_RECORD, {
        payload: item
      });
    },

    async [types.LOGIN]({ commit }, payload) {
      const user = await Users.login(payload);
      commit(types.SET_USER, {
        payload: user.data
      });
    },

    [types.LOGOUT_USER]({ commit }) {
      commit(types.SET_USER, {
        payload: { id: null }
      });
    },

    async [types.CHANGE_PASSWORD]({ commit }, item) {
      const user = await Users.changePassword(item);
      commit(types.CHANGE_PASSWORD_ALERT, {
        payload: user.data
      });
    },

    async [types.LOAD_LOCATIONS]({ commit }) {
      const locations = await Locations.fetchBranches();
      commit(types.SET_LOCATIONS, {
        payload: locations.data
      });
    },

    async [types.LOAD_POSITIONS]({ commit }) {
      const positions = await Positions.fetchPositions();
      commit(types.SET_POSITIONS, {
        payload: positions.data
      });
    },

    async [types.LOAD_PROFILES]({ commit }) {
      const profiles = await Profiles.fetchProfiles();
      commit(types.SET_PROFILES, {
        payload: profiles.data
      });
    },

    async [types.LOAD_STATUS]({ commit }) {
      const status = await Status.fetchStatus();
      commit(types.SET_STATUS, {
        payload: status.data
      });
    },

    async [types.LOAD_USERS]({ commit }) {
      const users = await Users.fetchUsers();
      commit(types.SET_USERS, {
        payload: users.data
      });
    },

    async [types.SAVE_LOCATION]({ commit }, item) {
      const branch = await Locations.saveBranch(item);
      commit(types.SET_RESULTS, {
        payload: branch.data
      })
    },

    async [types.DELETE_LOCATION]({ commit }, item) {
      const branch = await Locations.deleteBranch(item.id);
      commit(types.SET_RESULTS, {
        payload: branch.data
      })
    },

    async [types.SAVE_POSITION]({ commit }, item) {
      const position = await Positions.savePosition(item);
      commit(types.SET_RESULTS, {
        payload: position.data
      });
    },

    async [types.DELETE_POSITION]({ commit }, item) {
      const position = await Positions.deletePosition(item.id);
      commit(types.SET_RESULTS, {
        payload: position.data
      })
    },

    async [types.SAVE_USER]({ commit }, item) {
      const user = await Users.saveUser(item);
      commit(types.SET_RESULTS, {
        payload: user.data
      });
    },

    async [types.DELETE_USER]({ commit }, item) {
      const user = await Users.deleteUser(item.id);
      commit(types.SET_RESULTS, {
        payload: user.data
      });
    }

  },

  mutations: {
    [types.ASSIGN_MENU_OPTION]: (state, { payload }) => {
      state.option = payload;
    },

    [types.SET_USER]: (state, { payload }) => {
      state.user = payload;
    },

    [types.SET_LOCATIONS]: (state, { payload }) => {
      state.locations = payload;
    },

    [types.SET_POSITIONS]: (state, { payload }) => {
      const positions = payload.rows;
      const records = []
      let record = {}
      for (let i = 0; i < positions.length; i++) {
        record = {
          id: positions[i].id,
          created_at: positions[i].created_at,
          name: positions[i].name,
          color: positions[i].color,
          div: `<div style="background-color:${positions[i].color};width:90px;border-radius:4px;" class="mx-auto">&nbsp;</div>`,
          sector_id: positions[i].sector_id,
          updated_at: positions[i].updated_at,
          "sector.name": positions[i]["sector.name"]
        }
        records.push(record)
      }
      state.positions = {
        rows: records,
        count: payload.count
      }
    },

    [types.SET_PROFILES]: (state, { payload }) => {
      state.profiles = payload;
    },

    [types.SET_STATUS]: (state, { payload }) => {
      state.status = payload;
    },

    [types.SET_USERS]: (state, { payload }) => {
      state.users = payload;
    },

    [types.SET_RECORD]: (state, { payload }) => {
      state.record = payload;
    },

    [types.SET_RESULTS]: (state, { payload }) => {
      state.results = payload;
    },

    [types.CHANGE_PASSWORD_ALERT]: (state, { payload }) => {
      state.password = payload;
    }

  }
});
