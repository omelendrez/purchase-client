import Vue from "vue";
import Vuex from "vuex";

import Organizations from "./../services/organizations";
import Locations from "./../services/locations";
import Departments from "./../services/departments";
import Profiles from "./../services/profiles";
import Projects from "./../services/projects";
import Permissions from "./../services/permissions";
import Status from "./../services/status";
import Users from "./../services/users";
import Vendors from "./../services/vendors";

import * as types from "../store/mutation-types";

const activeColor = "success";
const inactiveColor = "danger";
const activeStatus = 1;

Vue.use(Vuex);

const state = {
  activeOrganizations: [],
  activeLocations: [],
  activeDepartments: [],
  activeProjects: [],
  activePermissions: [],
  activeVendors: [],
  organizations: [],
  locations: [],
  departments: [],
  projects: [],
  permissions: [],
  profiles: [],
  vendors: [],
  status: [],
  user: [],
  users: [],
  password: [],
  record: [],
  results: [],
  option: false,
  globalAdmin: false,
  admin: false
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

    async [types.RESET_PASSWORD]({ commit }, item) {
      const user = await Users.resetPassword(item);
      commit(types.SET_RESULTS, {
        payload: user.data
      });
    },

    async [types.CHANGE_PASSWORD]({ commit }, item) {
      const user = await Users.changePassword(item);
      commit(types.CHANGE_PASSWORD_ALERT, {
        payload: user.data
      });
    },

    async [types.LOAD_ORGANIZATIONS]({ commit }) {
      const organizations = await Organizations.fetchOrganizations(
        state.user.organization_id
      );
      commit(types.SET_ORGANIZATIONS, {
        payload: organizations.data
      });
    },

    async [types.SAVE_ORGANIZATION]({ commit }, item) {
      const organization = await Organizations.saveOrganization(item);
      commit(types.SET_RESULTS, {
        payload: organization.data
      });
    },

    async [types.DELETE_ORGANIZATION]({ commit }, item) {
      const organization = await Organizations.deleteOrganization(item.id);
      commit(types.SET_RESULTS, {
        payload: organization.data
      });
    },

    async [types.LOAD_DEPARTMENTS]({ commit }) {
      const departments = await Departments.fetchDepartments(
        state.user.organization_id
      );
      commit(types.SET_DEPARTMENTS, {
        payload: departments.data
      });
    },

    async [types.SAVE_DEPARTMENT]({ commit }, item) {
      const department = await Departments.saveDepartment(item);
      commit(types.SET_RESULTS, {
        payload: department.data
      });
    },

    async [types.DELETE_DEPARTMENT]({ commit }, item) {
      const department = await Departments.deleteDepartment(item.id);
      commit(types.SET_RESULTS, {
        payload: department.data
      });
    },

    async [types.LOAD_PROFILES]({ commit }) {
      const profiles = await Profiles.fetchProfiles();
      commit(types.SET_PROFILES, {
        payload: profiles.data
      });
    },

    async [types.LOAD_PROJECTS]({ commit }) {
      const projects = await Projects.fetchProjects(state.user.organization_id);
      commit(types.SET_PROJECTS, {
        payload: projects.data
      });
    },

    async [types.LOAD_PERMISSIONS]({ commit }) {
      const permissions = await Permissions.fetchPermissions();
      commit(types.SET_PERMISSIONS, {
        payload: permissions.data
      });
    },

    async [types.LOAD_VENDORS]({ commit }) {
      const vendors = await Vendors.fetchVendors(state.user.organization_id);
      commit(types.SET_VENDORS, {
        payload: vendors.data
      });
    },

    async [types.LOAD_LOCATIONS]({ commit }) {
      const locations = await Locations.fetchLocations(
        state.user.organization_id
      );
      commit(types.SET_LOCATIONS, {
        payload: locations.data
      });
    },

    async [types.SAVE_LOCATION]({ commit }, item) {
      const location = await Locations.saveLocation(item);
      commit(types.SET_RESULTS, {
        payload: location.data
      });
    },

    async [types.SAVE_VENDOR]({ commit }, item) {
      const vendor = await Vendors.saveVendor(item);
      commit(types.SET_RESULTS, {
        payload: vendor.data
      });
    },

    async [types.DELETE_LOCATION]({ commit }, item) {
      const location = await Locations.deleteLocation(item.id);
      commit(types.SET_RESULTS, {
        payload: location.data
      });
    },

    async [types.SAVE_PROJECT]({ commit }, item) {
      const project = await Projects.saveProject(item);
      commit(types.SET_RESULTS, {
        payload: project.data
      });
    },

    async [types.SAVE_PERMISSION]({ commit }, item) {
      const permission = await Permissions.savePermission(item);
      commit(types.SET_RESULTS, {
        payload: permission.data
      });
    },

    async [types.DELETE_PROJECT]({ commit }, item) {
      const project = await Projects.deleteProject(item.id);
      commit(types.SET_RESULTS, {
        payload: project.data
      });
    },

    async [types.DELETE_PERMISSION]({ commit }, item) {
      const permission = await Permissions.deletePermission(item.id);
      commit(types.SET_RESULTS, {
        payload: permission.data
      });
    },

    async [types.DELETE_VENDOR]({ commit }, item) {
      const vendor = await Vendors.deleteVendor(item.id);
      commit(types.SET_RESULTS, {
        payload: vendor.data
      });
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
      const user = {};
      for (const prop in payload) {
        if (prop !== "password") {
          user[prop] = payload[prop];
        }
      }
      state.user = user;
      state.globalAdmin =
        state.user.organization_id === 1 && state.user.profile_id === 1;
      state.admin = state.user.profile_id === 1;
    },

    [types.SET_ORGANIZATIONS]: (state, { payload }) => {
      state.organizations = payload;
      payload.rows.map(item => {
        item._cellVariants = {
          "status.name":
            item.status_id !== activeStatus ? inactiveColor : activeColor
        };
      });
      state.activeOrganizations = payload.rows.filter(item => {
        return item.status_id === activeStatus;
      });
    },

    [types.SET_LOCATIONS]: (state, { payload }) => {
      state.locations = payload;
      payload.rows.map(item => {
        item._cellVariants = {
          "status.name":
            item.status_id !== activeStatus ? inactiveColor : activeColor
        };
      });
      state.activeLocations = payload.rows.filter(item => {
        return item.status_id === activeStatus;
      });
    },

    [types.SET_DEPARTMENTS]: (state, { payload }) => {
      state.departments = payload;
      payload.rows.map(item => {
        item._cellVariants = {
          "status.name":
            item.status_id !== activeStatus ? inactiveColor : activeColor
        };
      });
      state.activeDepartments = payload.rows.filter(item => {
        return item.status_id === activeStatus;
      });
    },

    [types.SET_PROFILES]: (state, { payload }) => {
      state.profiles = payload;
      payload.rows.map(item => {
        item._cellVariants = {
          "status.name":
            item.status_id !== activeStatus ? inactiveColor : activeColor
        };
      });
    },

    [types.SET_PROJECTS]: (state, { payload }) => {
      state.projects = payload;
      payload.rows.map(item => {
        item._cellVariants = {
          "status.name":
            item.status_id !== activeStatus ? inactiveColor : activeColor
        };
      });
      state.activeProjects = payload.rows.filter(item => {
        return item.status_id === activeStatus;
      });
    },

    [types.SET_PERMISSIONS]: (state, { payload }) => {
      state.permissions = payload;
      payload.rows.map(item => {
        item._cellVariants = {
          "status.name":
            item.status_id !== activeStatus ? inactiveColor : activeColor
        };
      });
      state.activePermissions = payload.rows.filter(item => {
        return item.status_id === activeStatus;
      });
    },

    [types.SET_VENDORS]: (state, { payload }) => {
      state.vendors = payload;
      payload.rows.map(item => {
        item._cellVariants = {
          "status.name":
            item.status_id !== activeStatus ? inactiveColor : activeColor
        };
      });
      state.activeVendors = payload.rows.filter(item => {
        return item.status_id === activeStatus;
      });
    },

    [types.SET_STATUS]: (state, { payload }) => {
      state.status = payload;
    },

    [types.SET_USERS]: (state, { payload }) => {
      state.users = payload;
      payload.rows.map(item => {
        item._cellVariants = {
          "status.name":
            item.status_id !== activeStatus ? inactiveColor : activeColor
        };
        // item._rowVariant = item.status_id === 2 ? inactiveColor : ''
      });
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
