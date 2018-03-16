<template>
  <div class="header">

    <b-navbar toggleable="md" type="dark" variant="dark">

      <b-navbar-toggle target="nav_collapse_main"></b-navbar-toggle>

      <b-navbar-brand @click.stop="setMain('home')" href="#/">
        <i class="fas fa-home"></i>
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse_main">
        <template v-if="isLogged">

          <b-navbar-nav>
            <b-nav-item class="mx-4" v-bind:active="groupIs('admin')" @click.stop="setMain('admin')">
              Admin tables</b-nav-item>
            <b-nav-item class="mx-4" v-bind:active="groupIs('master')" @click.stop="setMain('master')">
              Master tables</b-nav-item>
            <b-nav-item class="mx-4" v-bind:active="groupIs('activities')" @click.stop="setMain('activities')">
              Daily activities</b-nav-item>
            <b-nav-item class="mx-4" v-bind:active="groupIs('reports')" @click.stop="setMain('reports')">
              Reports</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="isLogged">
            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content">
                <i class="fas fa-user"></i>
                {{userFullName}}
              </template>
              <b-dropdown-item href="#/login">
                <i class="fas fa-sign-out-alt"></i> Close session</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item href="#/change_password">
                <i class="fas fa-unlock-alt"></i> Change password</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

        </template>

      </b-collapse>

    </b-navbar>

    <b-navbar toggleable="md" type="light" variant="faded">

      <b-navbar-toggle target="nav_collapse_sub"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse_sub">
        <template v-if="isLogged">
          <b-navbar-nav>

            <!-- admin -->
            <b-nav-item class="mx-4" v-if="groupIs('admin')" v-bind:active="optionIs('/organizations')" href="#/organizations">
              <i class="fas fa-building"></i> Companies</b-nav-item>
            <b-nav-item class="mx-4" v-if="groupIs('admin')" v-bind:active="optionIs('/users')" href="#/users">
              <i class="fas fa-user"></i> Users</b-nav-item>
            <b-nav-item class="mx-4" v-if="groupIs('admin')" v-bind:active="optionIs('/workflow')" href="#/workflow">
              <i class="fas fa-thumbs-up"></i> Workflow</b-nav-item>
            <b-nav-item class="mx-4" v-if="groupIs('admin')" v-bind:active="optionIs('/permissions')" href="#/permissions">
              <i class="fas fa-key"></i> Permissions</b-nav-item>

            <!-- master -->
            <b-nav-item class="mx-4" v-if="groupIs('master')" v-bind:active="optionIs('/departments')" href="#/departments">
              <i class="fas fa-users"></i> Departments</b-nav-item>
            <b-nav-item class="mx-4" v-if="groupIs('master')" v-bind:active="optionIs('/locations')" href="#/locations">
              <i class="fas fa-location-arrow"></i> Locations</b-nav-item>
            <b-nav-item class="mx-4" v-if="groupIs('master')" v-bind:active="optionIs('/projects')" href="#/projects">
              <i class="fas fa-industry"></i> Projects</b-nav-item>
            <b-nav-item class="mx-4" v-if="groupIs('master')" v-bind:active="optionIs('/vendors')" href="#/vendors">
              <i class="fas fa-handshake"></i> Vendors</b-nav-item>
            <b-nav-item class="mx-4" v-if="groupIs('master')" v-bind:active="optionIs('/units')" href="#/units">
              <i class="fas fa-boxes"></i> Units of measure</b-nav-item>

            <!-- activities -->
            <b-nav-item class="mx-4" v-if="groupIs('activities')" v-bind:active="optionIs('/requisitions')" href="#/requisitions">
              <i class="fas fa-shopping-cart"></i> Purchase Requisitions</b-nav-item>
            <b-nav-item class="mx-4" v-if="groupIs('activities')" v-bind:active="optionIs('/purchase_orders')" href="#/purchase_orders">
              <i class="fas fa-shopping-cart"></i> Purchase Orders</b-nav-item>
            <b-nav-item class="mx-4" v-if="groupIs('activities')" v-bind:active="optionIs('/approvals')" href="#/approvals">
              <i class="fas fa-thumbs-up"></i> Approvals</b-nav-item>
            <b-nav-item class="mx-4" v-if="groupIs('activities')" v-bind:active="optionIs('/payment_requests')" href="#/payment_requests">
              <i class="fas fa-money-bill-alt"></i> Payment Requests</b-nav-item>

          </b-navbar-nav>
        </template>

      </b-collapse>

    </b-navbar>

    <b-navbar-nav class="font-size">
      <b-nav-form>
        <b-button size="sm" class="my-2 my-sm-0" @click="changeFontSize(-1)">A-</b-button>
        <b-button size="sm" class="my-2 my-sm-0" @click="changeFontSize(+1)">A+</b-button>
      </b-nav-form>
    </b-navbar-nav>

    <div v-if="isLoading" class="fa-3x loading-spinner">
      <i class="fas fa-circle-notch fa-spin"></i>
    </div>
  </div>

</template>

<script>
import Store from "../../store/store";
export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return Store.state.loading;
    },
    isLogged() {
      return Store.state.user.id;
    },
    isAdmin() {
      return Store.state.user.profile_id === 1;
    },
    mainOption() {
      return Store.state.mainOption;
    },
    menuOption() {
      return Store.state.option;
    },
    userFullName() {
      return Store.state.user.full_name;
    }
  },
  methods: {
    changeFontSize(incrDecr) {
      Store.dispatch("CHANGE_FONT_SIZE", incrDecr);
    },
    setMain(option) {
      Store.dispatch("SET_MAIN_OPTION", option);
    },
    groupIs(option) {
      return this.mainOption === option;
    },
    optionIs(option) {
      return this.menuOption === option;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.font-size {
  position: fixed;
  bottom: 2px;
  right: 2px;
}
.loading-spinner {
  position: fixed;
  top: 40%;
  left: 50%;
  z-index: 1;
}

#nav_collapse_main a.active {
  background-color: #90a4ae;
  border-radius: 3px;
  color: black;
}

#nav_collapse_sub a.active {
  background-color: #90a4ae;
  border-radius: 3px;
}
</style>
