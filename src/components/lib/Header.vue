<template>
  <div class="header">

    <b-navbar toggleable="md" type="dark" variant="dark">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand @click.stop="setMainOption('home')" href="#/">
        <i class="fas fa-home"></i>
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse_main">
        <template v-if="isLogged">

          <b-navbar-nav class="admin">
            <b-nav-item class="mx-4" v-bind:active="mainOptionIs('admin')" @click.stop="setMainOption('admin')">
              Admin</b-nav-item>
            <b-nav-item class="mx-4" v-bind:active="mainOptionIs('global')" @click.stop="setMainOption('global')">
              Global tables</b-nav-item>
            <b-nav-item class="mx-4" v-bind:active="mainOptionIs('master')" @click.stop="setMainOption('master')">
              Master tables</b-nav-item>
            <b-nav-item class="mx-4" v-bind:active="mainOptionIs('activities')" @click.stop="setMainOption('activities')">
              Activities</b-nav-item>
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

      <b-collapse is-nav id="nav_collapse_sub">
        <template v-if="isLogged">
          <b-navbar-nav class="admin">
            <b-nav-item class="mx-4" v-if="mainOptionIs('admin')" v-bind:active="menuOptionIs('/organizations')" href="#/organizations">
              <i class="fas fa-building"></i> Companies</b-nav-item>
            <b-nav-item class="mx-4" v-if="mainOptionIs('admin')" v-bind:active="menuOptionIs('/users')" href="#/users">
              <i class="fas fa-user"></i> Users</b-nav-item>
            <b-nav-item class="mx-4" v-if="mainOptionIs('global')" v-bind:active="menuOptionIs('/permissions')" href="#/permissions">
              <i class="fas fa-key"></i> Permissions</b-nav-item>
            <b-nav-item class="mx-4" v-if="mainOptionIs('global')" v-bind:active="menuOptionIs('/units')" href="#/units">
              <i class="fas fa-boxes"></i> Units of measure</b-nav-item>
            <b-nav-item class="mx-4" v-if="mainOptionIs('master')" v-bind:active="menuOptionIs('/departments')" href="#/departments">
              <i class="fas fa-users"></i> Departments</b-nav-item>
            <b-nav-item class="mx-4" v-if="mainOptionIs('master')" v-bind:active="menuOptionIs('/locations')" href="#/locations">
              <i class="fas fa-location-arrow"></i> Locations</b-nav-item>
            <b-nav-item class="mx-4" v-if="mainOptionIs('master')" v-bind:active="menuOptionIs('/projects')" href="#/projects">
              <i class="fas fa-industry"></i> Projects</b-nav-item>
            <b-nav-item class="mx-4" v-if="mainOptionIs('master')" v-bind:active="menuOptionIs('/vendors')" href="#/vendors">
              <i class="fas fa-handshake"></i> Vendors</b-nav-item>
            <b-nav-item class="mx-4" v-if="mainOptionIs('activities')" v-bind:active="menuOptionIs('/requisitions')" href="#/requisitions">
              <i class="fas fa-shopping-cart"></i> Requisitions</b-nav-item>
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
    setMainOption(option) {
      Store.dispatch("SET_MAIN_OPTION", option);
    },
    mainOptionIs(option) {
      return this.mainOption === option;
    },
    menuOptionIs(option) {
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
  border-left: 1px solid #90a4ae;
  border-right: 1px solid #90a4ae;
}

#nav_collapse_sub a.active {
  border-left: 1px solid #90a4ae;
  border-right: 1px solid #90a4ae;
}
</style>
