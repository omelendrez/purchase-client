<template>
  <div class="header">

    <b-navbar toggleable="md" type="dark" variant="dark">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#/">Home</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <template v-if="isLogged">

          <b-navbar-nav class="admin">
            <b-nav-item v-bind:active="menuOption === '/organizations'" href="#/organizations">ORGANIZATIONS</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/departments'" href="#/departments">DEPARTMENTS</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/locations'" href="#/locations">LOCATIONS</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/positions'" href="#/positions">POSITIONS</b-nav-item>
            <b-nav-item v-bind:active="menuOption === '/users'" href="#/users">USERS</b-nav-item>
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
