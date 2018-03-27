import Vue from "vue";
import Vuex from "vuex";

import Organizations from "./../services/organizations";
import Locations from "./../services/locations";
import Departments from "./../services/departments";
import DocumentStatus from "./../services/document_status";
import Profiles from "./../services/profiles";
import Projects from "./../services/projects";
import Permissions from "./../services/permissions";
import Requisitions from "./../services/requisitions";
import RequisitionItems from "./../services/requisition_items";
import PurchaseOrders from "./../services/purchase_orders";
import PurchaseOrderItems from "./../services/purchase_order_items";
import Status from "./../services/status";
import Units from "./../services/units";
import Users from "./../services/users";
import UserPermissions from "./../services/users_permissions";
import Vendors from "./../services/vendors";
import Workflows from "./../services/workflows";
import WorkflowUsers from "./../services/workflow_users";

import * as types from "../store/mutation-types";
import * as constants from "./constants";

Vue.use(Vuex);

const state = {
  activeOrganizations: [],
  activeLocations: [],
  activeDepartments: [],
  activeProjects: [],
  activePermissions: [],
  activeUnits: [],
  activeUsers: [],
  activeVendors: [],
  activeWorkflows: [],
  documentStatus: [],
  organizations: [],
  locations: [],
  departments: [],
  messages: false,
  projects: [],
  permissions: [],
  profiles: [],
  requisitions: [],
  requisitionItems: [],
  purchaseOrders: [],
  purchaseOrderItems: [],
  vendors: [],
  workflows: [],
  workflowUsers: [],
  status: [],
  units: [],
  user: [],
  userPermissions: [],
  notUserPermissions: [],
  users: [],
  userWorkflows: [],
  password: [],
  record: [],
  results: [],
  option: false,
  mainOption: "",
  mainOptionChanged: false,
  globalAdmin: false,
  admin: false,
  fontSize: constants.defaultFontSize,
  loading: false
};

export default new Vuex.Store({
  state,
  actions: {
    [types.LOADING]({ commit }) {
      commit(types.SET_LOADING, true);
    },
    [types.LOADED]({ commit }) {
      commit(types.SET_LOADING, false);
    },
    [types.CHANGE_FONT_SIZE]({ commit }, incrDecr) {
      if (state.fontSize > constants.maxFontSize && incrDecr > 0) {
        incrDecr = 0;
      } else {
        if (state.fontSize < constants.minFontSize && incrDecr < 0) {
          incrDecr = 0;
        }
      }
      commit(types.SET_FONT_SIZE, {
        payload: incrDecr
      });
    },

    [types.SET_MENU_OPTION]({ commit }, option) {
      if (option !== state.option) {
        commit(types.ASSIGN_MENU_OPTION, {
          payload: option
        });
        commit(types.SET_RECORD, {
          payload: []
        });
      }
    },

    [types.SET_MAIN_OPTION]({ commit }, option) {
      commit(types.ASSIGN_MAIN_OPTION, {
        payload: option
      });
      if (option !== state.mainOption) {
        commit(types.SET_RECORD, {
          payload: []
        });
      }
    },

    [types.ADD_ITEM]({ commit }, item) {
      commit(types.SET_RECORD, {
        payload: item
      });
    },

    [types.HIDE_MESSAGES]({ commit }) {
      commit(types.OFF_MESSAGES, {
        status: !state.messages
      });
    },

    async [types.LOAD_STATUS]({ commit }) {
      this.dispatch("LOADING");
      const status = await Status.fetchStatus();
      commit(types.SET_STATUS, {
        payload: status.data
      });
    },

    async [types.LOAD_PROFILES]({ commit }) {
      this.dispatch("LOADING");
      const profiles = await Profiles.fetchProfiles();
      commit(types.SET_PROFILES, {
        payload: profiles.data
      });
    },

    async [types.LOAD_PERMISSIONS]({ commit }) {
      this.dispatch("LOADING");
      const permissions = await Permissions.fetchPermissions();
      commit(types.SET_PERMISSIONS, {
        payload: permissions.data
      });
    },

    async [types.LOAD_USER_PERMISSIONS]({ commit }, item) {
      this.dispatch("LOADING");
      const userPermissions = await UserPermissions.fetchUserPermissions(
        item.id
      );
      commit(types.SET_USER_PERMISSIONS, {
        payload: userPermissions.data
      });
    },

    async [types.SAVE_PERMISSION]({ commit }, item) {
      this.dispatch("LOADING");
      const permission = await Permissions.savePermission(item);
      commit(types.SET_RESULTS, {
        payload: permission.data
      });
    },

    async [types.SAVE_USER_PERMISSION]({ commit }, item) {
      this.dispatch("LOADING");
      const userPermission = await UserPermissions.saveUserPermission(item);
      commit(types.SET_RESULTS, {
        payload: userPermission.data
      });
    },

    async [types.DELETE_PERMISSION]({ commit }, item) {
      this.dispatch("LOADING");
      const permission = await Permissions.deletePermission(item.id);
      commit(types.SET_RESULTS, {
        payload: permission.data
      });
    },

    async [types.DELETE_USER_PERMISSION]({ commit }, item) {
      this.dispatch("LOADING");
      const userPermission = await UserPermissions.deleteUserPermission(
        item.id
      );
      commit(types.SET_RESULTS, {
        payload: userPermission.data
      });
    },

    async [types.LOAD_USERS]({ commit }) {
      this.dispatch("LOADING");
      const users = await Users.fetchUsers(state.user.organization_id);
      commit(types.SET_USERS, {
        payload: users.data
      });
    },

    async [types.SAVE_USER]({ commit }, item) {
      this.dispatch("LOADING");
      const user = await Users.saveUser(item);
      commit(types.SET_RESULTS, {
        payload: user.data
      });
    },

    async [types.DELETE_USER]({ commit }, item) {
      this.dispatch("LOADING");
      const user = await Users.deleteUser(item.id);
      commit(types.SET_RESULTS, {
        payload: user.data
      });
    },

    async [types.RESET_PASSWORD]({ commit }, item) {
      this.dispatch("LOADING");
      const user = await Users.resetPassword(item);
      commit(types.SET_RESULTS, {
        payload: user.data
      });
    },

    async [types.CHANGE_PASSWORD]({ commit }, item) {
      this.dispatch("LOADING");
      const user = await Users.changePassword(item);
      commit(types.CHANGE_PASSWORD_ALERT, {
        payload: user.data
      });
    },

    async [types.LOGIN]({ commit }, payload) {
      this.dispatch("LOADING");
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

    async [types.LOAD_ORGANIZATIONS]({ commit }) {
      this.dispatch("LOADING");
      const organizations = await Organizations.fetchOrganizations(
        state.user.organization_id
      );
      commit(types.SET_ORGANIZATIONS, {
        payload: organizations.data
      });
    },

    async [types.SAVE_ORGANIZATION]({ commit }, item) {
      this.dispatch("LOADING");
      const organization = await Organizations.saveOrganization(item);
      commit(types.SET_RESULTS, {
        payload: organization.data
      });
    },

    async [types.DELETE_ORGANIZATION]({ commit }, item) {
      this.dispatch("LOADING");
      const organization = await Organizations.deleteOrganization(item.id);
      commit(types.SET_RESULTS, {
        payload: organization.data
      });
    },

    async [types.LOAD_DEPARTMENTS]({ commit }) {
      this.dispatch("LOADING");
      const departments = await Departments.fetchDepartments(
        state.user.organization_id
      );
      commit(types.SET_DEPARTMENTS, {
        payload: departments.data
      });
    },

    async [types.SAVE_DEPARTMENT]({ commit }, item) {
      this.dispatch("LOADING");
      const department = await Departments.saveDepartment(item);
      commit(types.SET_RESULTS, {
        payload: department.data
      });
    },

    async [types.DELETE_DEPARTMENT]({ commit }, item) {
      this.dispatch("LOADING");
      const department = await Departments.deleteDepartment(item.id);
      commit(types.SET_RESULTS, {
        payload: department.data
      });
    },

    async [types.LOAD_PROJECTS]({ commit }) {
      this.dispatch("LOADING");
      const projects = await Projects.fetchProjects(state.user.organization_id);
      commit(types.SET_PROJECTS, {
        payload: projects.data
      });
    },

    async [types.SAVE_PROJECT]({ commit }, item) {
      this.dispatch("LOADING");
      const project = await Projects.saveProject(item);
      commit(types.SET_RESULTS, {
        payload: project.data
      });
    },

    async [types.DELETE_PROJECT]({ commit }, item) {
      this.dispatch("LOADING");
      const project = await Projects.deleteProject(item.id);
      commit(types.SET_RESULTS, {
        payload: project.data
      });
    },

    async [types.LOAD_UNITS]({ commit }) {
      this.dispatch("LOADING");
      const units = await Units.fetchUnits();
      commit(types.SET_UNITS, {
        payload: units.data
      });
    },

    async [types.LOAD_VENDORS]({ commit }) {
      this.dispatch("LOADING");
      const vendors = await Vendors.fetchVendors(state.user.organization_id);
      commit(types.SET_VENDORS, {
        payload: vendors.data
      });
    },

    async [types.LOAD_LOCATIONS]({ commit }) {
      this.dispatch("LOADING");
      const locations = await Locations.fetchLocations(
        state.user.organization_id
      );
      commit(types.SET_LOCATIONS, {
        payload: locations.data
      });
    },

    async [types.SAVE_LOCATION]({ commit }, item) {
      this.dispatch("LOADING");
      const location = await Locations.saveLocation(item);
      commit(types.SET_RESULTS, {
        payload: location.data
      });
    },

    // REQUISITIONS
    async [types.LOAD_REQUISITIONS]({ commit }) {
      this.dispatch("LOADING");
      const requisitions = await Requisitions.fetchRequisitions(
        state.user.organization_id
      );
      commit(types.SET_REQUISITIONS, {
        payload: requisitions.data
      });
    },

    async [types.LOAD_REQUISITION_ITEMS]({ commit }, item) {
      this.dispatch("LOADING");
      const requisitioItems = await RequisitionItems.fetchRequisitionItems(
        item
      );
      commit(types.SET_REQUISITION_ITEMS, {
        payload: requisitioItems.data
      });
    },

    async [types.SAVE_REQUISITION]({ commit }, item) {
      this.dispatch("LOADING");
      const requisition = await Requisitions.saveRequisition(item);
      commit(types.SET_RESULTS, {
        payload: requisition.data
      });
    },

    async [types.DELETE_REQUISITION]({ commit }, item) {
      this.dispatch("LOADING");
      const requisition = await Requisitions.deleteRequisition(item.id);
      commit(types.SET_RESULTS, {
        payload: requisition.data
      });
    },

    async [types.SAVE_REQUISITION_ITEM]({ commit }, item) {
      this.dispatch("LOADING");
      const requisitionItem = await RequisitionItems.saveRequisitionItem(item);
      commit(types.SET_RESULTS, {
        payload: requisitionItem.data
      });
    },

    async [types.DELETE_REQUISITION_ITEM]({ commit }, item) {
      this.dispatch("LOADING");
      const requisitionItem = await RequisitionItems.deleteRequisitionItem(
        item.id
      );
      commit(types.SET_RESULTS, {
        payload: requisitionItem.data
      });
    },

    // PURCHASE ORDERS

    async [types.LOAD_PURCHASE_ORDERS]({ commit }) {
      this.dispatch("LOADING");
      const purchaseOrders = await PurchaseOrders.fetchPurchaseOrders(
        state.user.organization_id
      );
      commit(types.SET_PURCHASE_ORDERS, {
        payload: purchaseOrders.data
      });
    },

    async [types.LOAD_PURCHASE_ORDER_ITEMS]({ commit }, item) {
      this.dispatch("LOADING");
      const purchaseOrderItems = await PurchaseOrderItems.fetchPurchaseOrderItems(
        item
      );
      commit(types.SET_PURCHASE_ORDER_ITEMS, {
        payload: purchaseOrderItems.data
      });
    },

    async [types.SAVE_PURCHASE_ORDER]({ commit }, item) {
      this.dispatch("LOADING");
      const purchaseOrder = await PurchaseOrders.savePurchaseOrder(item);
      commit(types.SET_RESULTS, {
        payload: purchaseOrder.data
      });
    },

    async [types.DELETE_PURCHASE_ORDER]({ commit }, item) {
      this.dispatch("LOADING");
      const purchaseOrder = await PurchaseOrders.deletePurchaseOrder(item.id);
      commit(types.SET_RESULTS, {
        payload: purchaseOrder.data
      });
    },

    async [types.SAVE_PURCHASE_ORDER_ITEM]({ commit }, item) {
      this.dispatch("LOADING");
      const purchaseOrderItem = await PurchaseOrderItems.savePurchaseOrderItem(
        item
      );
      commit(types.SET_RESULTS, {
        payload: purchaseOrderItem.data
      });
    },

    async [types.DELETE_PURCHASE_ORDER_ITEM]({ commit }, item) {
      this.dispatch("LOADING");
      const purchaseOrderItem = await PurchaseOrderItems.deletePurchaseOrderItem(
        item.id
      );
      commit(types.SET_RESULTS, {
        payload: purchaseOrderItem.data
      });
    },

    // WORKFLOWS

    async [types.LOAD_WORKFLOWS]({ commit }) {
      this.dispatch("LOADING");
      const workflows = await Workflows.fetchWorkflows(
        state.user.organization_id
      );
      commit(types.SET_WORKFLOWS, {
        payload: workflows.data
      });
    },

    async [types.LOAD_WORKFLOW_USERS]({ commit }, item) {
      this.dispatch("LOADING");
      const workflowUsers = await WorkflowUsers.fetchWorkflowUsers(
        item
      );
      commit(types.SET_WORKFLOW_USERS, {
        payload: workflowUsers.data
      });
    },

    async [types.LOAD_USER_WORKFLOWS]({ commit }, item) {
      this.dispatch("LOADING");
      const workflowUsers = await WorkflowUsers.fetchWorkflowsByUser(
        item
      );
      commit(types.SET_USER_WORKFLOWS, {
        payload: workflowUsers.data
      });
    },

    async [types.SAVE_WORKFLOW]({ commit }, item) {
      this.dispatch("LOADING");
      const workflow = await Workflows.saveWorkflow(item);
      commit(types.SET_RESULTS, {
        payload: workflow.data
      });
    },

    async [types.DELETE_WORKFLOW]({ commit }, item) {
      this.dispatch("LOADING");
      const workflow = await Workflows.deleteWorkflow(item.id);
      commit(types.SET_RESULTS, {
        payload: workflow.data
      });
    },

    async [types.SAVE_WORKFLOW_USER]({ commit }, item) {
      this.dispatch("LOADING");
      const workflowUser = await WorkflowUsers.saveWorkflowUser(
        item
      );
      commit(types.SET_RESULTS, {
        payload: workflowUser.data
      });
    },

    async [types.DELETE_WORKFLOW_USER]({ commit }, payload) {
      this.dispatch("LOADING");
      const workflowUser = await WorkflowUsers.deleteWorkflowUser(payload);
      commit(types.SET_RESULTS, {
        payload: workflowUser.data
      });
    },

    async [types.SAVE_VENDOR]({ commit }, item) {
      this.dispatch("LOADING");
      const vendor = await Vendors.saveVendor(item);
      commit(types.SET_RESULTS, {
        payload: vendor.data
      });
    },

    async [types.DELETE_LOCATION]({ commit }, item) {
      this.dispatch("LOADING");
      const location = await Locations.deleteLocation(item.id);
      commit(types.SET_RESULTS, {
        payload: location.data
      });
    },

    async [types.SAVE_UNIT]({ commit }, item) {
      this.dispatch("LOADING");
      const unit = await Units.saveUnit(item);
      commit(types.SET_RESULTS, {
        payload: unit.data
      });
    },

    async [types.DELETE_UNIT]({ commit }, item) {
      this.dispatch("LOADING");
      const unit = await Units.deleteUnit(item.id);
      commit(types.SET_RESULTS, {
        payload: unit.data
      });
    },

    async [types.DELETE_VENDOR]({ commit }, item) {
      this.dispatch("LOADING");
      const vendor = await Vendors.deleteVendor(item.id);
      commit(types.SET_RESULTS, {
        payload: vendor.data
      });
    },

    async [types.SAVE_DOCUMENT_STATUS]({ commit }, item) {
      this.dispatch("LOADING");
      await DocumentStatus.setDocumentStatus(item);
      const documentStatusList = await DocumentStatus.fetchDocumentStatus(item);
      commit(types.SET_DOCUMENT_STATUS, {
        payload: documentStatusList.data
      });
      const document = await DocumentStatus.fetchDocument(item);
      commit(types.SET_RECORD, {
        payload: document.data
      });
    },

    async [types.LOAD_DOCUMENT_STATUS]({ commit }, item) {
      this.dispatch("LOADING");
      const documentStatus = await DocumentStatus.fetchDocumentStatus(item);
      commit(types.SET_DOCUMENT_STATUS, {
        payload: documentStatus.data
      });
    }

  },

  mutations: {
    [types.ASSIGN_MENU_OPTION]: (state, { payload }) => {
      state.option = payload;
    },

    [types.ASSIGN_MAIN_OPTION]: (state, { payload }) => {
      state.mainOption = payload;
      state.mainOptionChanged = !state.mainOptionChanged;
    },

    [types.SET_USER]: (state, { payload }) => {
      const perm = payload.users_permissions;
      const permissions = [];
      if (perm) {
        for (let i = 0; i < perm.length; i++) {
          const item = perm[i];
          permissions.push(item.permission.code);
        }
      }
      const user = {};
      for (const prop in payload) {
        if (prop !== "password" && prop !== "users_permissions") {
          user[prop] = payload[prop];
        }
      }
      user.permissions = permissions;
      state.user = user;
      state.globalAdmin =
        state.user.organization_id === 1 && state.user.profile_id === 1;
      state.admin = state.user.profile_id === 1;
      if (state.globalAdmin) {
        permissions.push("ADM");
      }
      if (!state.user.id) {
        for (const key in state) {
          if (key !== "user") {
            if (Array.isArray(state[key])) {
              state[key] = [];
            }
            if (typeof state[key] === "object" && state[key] !== null) {
              state[key] = [];
            }
          }
        }
      }
    },

    [types.SET_ORGANIZATIONS]: (state, { payload }) => {
      state.organizations = payload;
      payload.rows.map(item => {
        item._rowVariant =
          item.status_id !== constants.activeStatus
            ? constants.inactiveColor
            : "";
        if (item.id === state.record.id) {
          item._rowVariant = constants.selectedRecordColor;
        }
      });
      state.activeOrganizations = payload.rows.filter(item => {
        return item.status_id === constants.activeStatus;
      });
    },

    [types.SET_LOCATIONS]: (state, { payload }) => {
      state.locations = payload;
      payload.rows.map(item => {
        item._rowVariant =
          item.status_id !== constants.activeStatus
            ? constants.inactiveColor
            : "";
        if (item.id === state.record.id) {
          item._rowVariant = constants.selectedRecordColor;
        }
      });
      state.activeLocations = payload.rows.filter(item => {
        return item.status_id === constants.activeStatus;
      });
    },

    [types.SET_DEPARTMENTS]: (state, { payload }) => {
      state.departments = payload;
      payload.rows.map(item => {
        item._rowVariant =
          item.status_id !== constants.activeStatus
            ? constants.inactiveColor
            : "";
        if (item.id === state.record.id) {
          item._rowVariant = constants.selectedRecordColor;
        }
      });
      state.activeDepartments = payload.rows.filter(item => {
        return item.status_id === constants.activeStatus;
      });
    },

    [types.SET_PROFILES]: (state, { payload }) => {
      state.profiles = payload;
      payload.rows.map(item => {
        item._rowVariant =
          item.status_id !== constants.activeStatus
            ? constants.inactiveColor
            : "";
        if (item.id === state.record.id) {
          item._rowVariant = constants.selectedRecordColor;
        }
      });
    },
    [types.SET_REQUISITIONS]: (state, { payload }) => {
      state.requisitions = payload;
      payload.rows.map(item => {
        item._rowVariant =
          item.status_id !== constants.activeStatus
            ? constants.inactiveColor
            : "";
        if (item.id === state.record.id) {
          item._rowVariant = constants.selectedRecordColor;
        }
        item.workflow_status_name = constants.documentStatusNames.filter(name => item.workflow_status === name.key)
        /*
        item._cellVariants = {
          "status.name":
            item.status_id !== constants.activeStatus ? constants.inactiveColor : activeColor
        };
        */
      });
    },
    [types.SET_REQUISITION_ITEMS]: (state, { payload }) => {
      state.requisitionItems = payload;
    },

    [types.SET_PURCHASE_ORDERS]: (state, { payload }) => {
      state.purchaseOrders = payload;
      payload.rows.map(item => {
        item._rowVariant =
          item.status_id !== constants.activeStatus
            ? constants.inactiveColor
            : "";
        if (item.id === state.record.id) {
          item._rowVariant = constants.selectedRecordColor;
        }
        item.workflow_status_name = constants.documentStatusNames.filter(name => item.workflow_status === name.key)

        /*
        item._cellVariants = {
          "status.name":
            item.status_id !== constants.activeStatus ? constants.inactiveColor : activeColor
        };
        */
      });
    },
    [types.SET_PURCHASE_ORDER_ITEMS]: (state, { payload }) => {
      state.purchaseOrderItems = payload;
    },

    [types.SET_PROJECTS]: (state, { payload }) => {
      state.projects = payload;
      payload.rows.map(item => {
        item._rowVariant =
          item.status_id !== constants.activeStatus
            ? constants.inactiveColor
            : "";
        if (item.id === state.record.id) {
          item._rowVariant = constants.selectedRecordColor;
        }
      });
      state.activeProjects = payload.rows.filter(item => {
        return item.status_id === constants.activeStatus;
      });
    },

    [types.SET_PERMISSIONS]: (state, { payload }) => {
      state.permissions = payload;
      payload.rows.map(item => {
        item._rowVariant =
          item.status_id !== constants.activeStatus
            ? constants.inactiveColor
            : "";
        if (item.id === state.record.id) {
          item._rowVariant = constants.selectedRecordColor;
        }
      });
      state.activePermissions = payload.rows.filter(item => {
        return item.status_id === constants.activeStatus;
      });
    },

    [types.SET_USER_PERMISSIONS]: (state, { payload }) => {
      const userPermissions = [];
      const notUserPermissions = [];
      const act = state.activePermissions;
      const ass = payload.rows;
      for (let i = 0; i < act.length; i++) {
        const actItem = act[i];
        const assItem = ass.find(curItem => {
          return curItem.permission_id === actItem.id;
        });
        const newItem = {
          id: actItem.id,
          code: actItem.code,
          name: actItem.name,
          description: actItem.description
        };
        if (assItem) {
          newItem.id = assItem.id;
          userPermissions.push(newItem);
        } else {
          notUserPermissions.push(newItem);
        }
      }
      state.userPermissions = userPermissions;
      state.notUserPermissions = notUserPermissions;
    },

    [types.SET_UNITS]: (state, { payload }) => {
      state.units = payload;
      payload.rows.map(item => {
        item._rowVariant =
          item.status_id !== constants.activeStatus
            ? constants.inactiveColor
            : "";
        if (item.id === state.record.id) {
          item._rowVariant = constants.selectedRecordColor;
        }
      });
      state.activeUnits = payload.rows.filter(item => {
        return item.status_id === constants.activeStatus;
      });
    },

    [types.SET_WORKFLOWS]: (state, { payload }) => {
      state.workflows = payload;
      payload.rows.map(item => {
        item._rowVariant =
          item.status_id !== constants.activeStatus
            ? constants.inactiveColor
            : "";
        if (item.id === state.record.id) {
          item._rowVariant = constants.selectedRecordColor;
        }
      });
      state.activeWorkflows = payload.rows.filter(item => {
        return item.status_id === constants.activeStatus;
      });
    },

    [types.SET_WORKFLOW_USERS]: (state, { payload }) => {
      state.workflowUsers = payload;
    },

    [types.SET_USER_WORKFLOWS]: (state, { payload }) => {
      state.userWorkflows = payload;
    },

    [types.SET_VENDORS]: (state, { payload }) => {
      state.vendors = payload;
      payload.rows.map(item => {
        item._rowVariant =
          item.status_id !== constants.activeStatus
            ? constants.inactiveColor
            : "";
        if (item.id === state.record.id) {
          item._rowVariant = constants.selectedRecordColor;
        }
      });
      state.activeVendors = payload.rows.filter(item => {
        return item.status_id === constants.activeStatus;
      });
    },

    [types.SET_STATUS]: (state, { payload }) => {
      state.status = payload;
    },

    [types.SET_FONT_SIZE]: (state, { payload }) => {
      state.fontSize += payload;
    },

    [types.SET_USERS]: (state, { payload }) => {
      state.activeUsers = [];
      state.users = payload;
      state.users.count = payload.rows.length
      payload.rows.map(item => {
        item._rowVariant =
          item.status_id !== constants.activeStatus
            ? constants.inactiveColor
            : "";
        // item._rowVariant = item.status_id === 2 ? constants.inactiveColor : ''
        if (item.id === state.record.id) {
          item._rowVariant = constants.selectedRecordColor;
        }
        if (item.status_id === constants.activeStatus) {
          state.activeUsers.push(item)
        }
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
    },

    [types.SET_LOADING]: (state, status) => {
      state.loading = status;
    },

    [types.OFF_MESSAGES]: (state, status) => {
      state.messages = status
    },

    [types.SET_DOCUMENT_STATUS]: (state, { payload }) => {
      payload.map(item => {
        item.document_status_name = constants.documentStatusNames.filter(name => item.document_status === name.key)
      })
      state.documentStatus = payload;
    }
  }
});
