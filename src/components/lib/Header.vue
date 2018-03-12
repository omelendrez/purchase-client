<template>
  <div class="header">

    <b-navbar toggleable="md" type="dark" variant="dark">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#/">
        <i class="fas fa-home"></i>
        Home
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <template v-if="isLogged">

          <b-navbar-nav class="admin">
            <b-nav-item class="mx-4" v-bind:active="menuOption === '/organizations'" href="#/organizations"><i class="fas fa-building"></i> Organizations</b-nav-item>
            <b-nav-item class="mx-4" v-bind:active="menuOption === '/users'" href="#/users"><i class="fas fa-user"></i> Users</b-nav-item>
            <b-nav-item class="mx-4" v-bind:active="menuOption === '/permissions'" href="#/permissions"><i class="fas fa-key"></i> Permissions</b-nav-item>
            <b-nav-item class="mx-4" v-bind:active="menuOption === '/units'" href="#/units"><i class="fas fa-boxes"></i> Units of measure</b-nav-item>
            <b-nav-item class="mx-4" v-bind:active="menuOption === '/departments'" href="#/departments"><i class="fas fa-users"></i> Departments</b-nav-item>
            <b-nav-item class="mx-4" v-bind:active="menuOption === '/locations'" href="#/locations"><i class="fas fa-location-arrow"></i> Locations</b-nav-item>
            <b-nav-item class="mx-4" v-bind:active="menuOption === '/projects'" href="#/projects"><i class="fas fa-industry"></i> Projects</b-nav-item>
            <b-nav-item class="mx-4" v-bind:active="menuOption === '/vendors'" href="#/vendors"><i class="fas fa-handshake"></i> Vendors</b-nav-item>

            <b-nav-item class="mx-4" v-bind:active="menuOption === '/requisitions'" href="#/requisitions"><i class="fas fa-shopping-cart"></i> Requisitions</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="isLogged">
            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content">
                <i class="fas fa-user"></i>
                {{userFullName}}
              </template>
              <b-dropdown-item href="#/login"><i class="fas fa-sign-out-alt"></i> Close session</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item href="#/change_password"><i class="fas fa-unlock-alt"></i> Change password</b-dropdown-item>
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
.font-size {
  position: fixed;
  bottom: 2px;
  right: 2px;
}
.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1;
}
</style>
