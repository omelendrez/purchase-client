<template>
  <div class="header">

    <b-navbar toggleable="md" type="dark" variant="dark">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#/">Home</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <template v-if="isLogged">

          <b-navbar-nav class="admin">
            <b-nav-item v-bind:active="menuOption === '/organizations'" href="#/organizations">Organizations</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/users'" href="#/users">Users</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/permissions'" href="#/permissions">Permissions</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/units'" href="#/units">Units of measure</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/departments'" href="#/departments">Departments</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/locations'" href="#/locations">Locations</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/projects'" href="#/projects">Projects</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/vendors'" href="#/vendors">Vendors</b-nav-item>

            <b-nav-item v-bind:active="menuOption === '/requisitions'" href="#/requisitions">Requisitions</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="isLogged">
            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content">
                {{userFullName}}
              </template>
              <b-dropdown-item href="#/login">Close session</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item href="#/change_password">Change password</b-dropdown-item>
            </b-nav-item-dropdown>
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

    <div v-if="isLoading" class="loading-spinner">
      <i class="fa fa-spinner fa-spin"></i>
    </div>
  </div>

</template>

<script>
import Store from "../../store/store";

export default {
  name: "Header",
  data() {
    return {
      tab: 0
    };
  },
  computed: {
    isLoading() {
      return Store.state.loading;
    },
    menuOption() {
      return Store.state.option;
    },
    isLogged() {
      return Store.state.user.id;
    },
    isAdmin() {
      return Store.state.user.profile_id === 1;
    },
    userFullName() {
      return Store.state.user.full_name;
    }
  },
  methods: {
    changeFontSize(incrDecr) {
      Store.dispatch("CHANGE_FONT_SIZE", incrDecr);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-item a {
  margin-left: 60px;
}
.font-size {
  position: fixed;
  bottom: 2px;
  right: 2px;
}
.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  font-size: 40px;
  z-index: 1;
}
</style>
