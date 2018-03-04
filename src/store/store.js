import Vue from "vue";
import Vuex from "vuex";

import Organizations from "./../services/organizations";
import Locations from "./../services/locations";
import Departments from "./../services/departments";
import Positions from "./../services/positions";
import Status from "./../services/status";
import Users from "./../services/users";

import * as types from "../store/mutation-types";

const activeColor = "success"
const inactiveColor = "danger"

Vue.use(Vuex);

const state = {
  option: false,
  organizations: [],
  departments: [],
  locations: [],
  positions: [],
  activeOrganizations: [],
  activeDepartments: [],
  activeLocations: [],
  activePositions: [],
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

    async [types.LOAD_ORGANIZATIONS]({ commit }) {
      const organizations = await Organizations.fetchOrganizations(state.user.organization_id);
      commit(types.SET_ORGANIZATIONS, {
        payload: organizations.data
      });
    },

    async [types.SAVE_ORGANIZATION]({ commit }, item) {
      const organization = await Organizations.saveOrganization(item);
      commit(types.SET_RESULTS, {
        payload: organization.data
      })
    },

    async [types.DELETE_ORGANIZATION]({ commit }, item) {
      const organization = await Organizations.deleteOrganization(item.id);
      commit(types.SET_RESULTS, {
        payload: organization.data
      })
    },

    async [types.LOAD_DEPARTMENTS]({ commit }) {
      const departments = await Departments.fetchDepartments(state.user.organization_id);
      commit(types.SET_DEPARTMENTS, {
        payload: departments.data
      });
    },

    async [types.SAVE_DEPARTMENT]({ commit }, item) {
      const department = await Departments.saveDepartment(item);
      commit(types.SET_RESULTS, {
        payload: department.data
      })
    },

    async [types.DELETE_DEPARTMENT]({ commit }, item) {
      const department = await Departments.deleteDepartment(item.id);
      commit(types.SET_RESULTS, {
        payload: department.data
      })
    },

    async [types.LOAD_POSITIONS]({ commit }) {
      const positions = await Positions.fetchPositions(state.user.organization_id);
      commit(types.SET_POSITIONS, {
        payload: positions.data
      });
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

    async [types.LOAD_LOCATIONS]({ commit }) {
      const locations = await Locations.fetchLocations(state.user.organization_id);
      commit(types.SET_LOCATIONS, {
        payload: locations.data
      });
    },

    async [types.SAVE_LOCATION]({ commit }, item) {
      const location = await Locations.saveLocation(item);
      commit(types.SET_RESULTS, {
        payload: location.data
      })
    },

    async [types.DELETE_LOCATION]({ commit }, item) {
      const location = await Locations.deleteLocation(item.id);
      commit(types.SET_RESULTS, {
        payload: location.data
      })
    },

    async [types.LOAD_USERS]({ commit }) {
      const users = await Users.fetchUsers(state.user.organization_id);
      commit(types.SET_USERS, {
        payload: users.data
      });
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
    },

    async [types.LOAD_STATUS]({ commit }) {
      const status = await Status.fetchStatus();
      commit(types.SET_STATUS, {
        payload: status.data
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

    [types.SET_ORGANIZATIONS]: (state, { payload }) => {
      state.organizations = payload;
      payload.rows.map(item => {
        item._cellVariants = {
          "status.name": item.status_id === 2 ? inactiveColor : activeColor
        }
      })
      state.activeOrganizations = payload.rows.filter(item => {
        return item.status_id === 1
      })
    },

    [types.SET_LOCATIONS]: (state, { payload }) => {
      state.locations = payload;
      payload.rows.map(item => {
        item._cellVariants = {
          "status.name": item.status_id === 2 ? inactiveColor : activeColor
        }
      })
      state.activeLocations = payload.rows.filter(item => {
        return item.status_id === 1
      })
    },

    [types.SET_DEPARTMENTS]: (state, { payload }) => {
      state.departments = payload;
      payload.rows.map(item => {
        item._cellVariants = {
          "status.name": item.status_id === 2 ? inactiveColor : activeColor
        }
      })
      state.activeDepartments = payload.rows.filter(item => {
        return item.status_id === 1
      })
    },

    [types.SET_POSITIONS]: (state, { payload }) => {
      state.positions = payload;
      payload.rows.map(item => {
        item._cellVariants = {
          "status.name": item.status_id === 2 ? inactiveColor : activeColor
        }
      })
      state.activePositions = payload.rows.filter(item => {
        return item.status_id === 1
      })
    },

    [types.SET_STATUS]: (state, { payload }) => {
      state.status = payload;
    },

    [types.SET_USERS]: (state, { payload }) => {
      state.users = payload;
      payload.rows.map(item => {
        item._cellVariants = {
          "status.name": item.status_id === 2 ? inactiveColor : activeColor
        }
        // item._rowVariant = item.status_id === 2 ? inactiveColor : ''
      })
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
