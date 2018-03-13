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

    <b-navbar-nav class="font-size">
      <b-nav-form>
        <b-button size="sm" class="my-2 my-sm-0" @click="changeFontSize(-1)">A-</b-button>
        <b-button size="sm" class="my-2 my-sm-0" @click="changeFontSize(+1)">A+</b-button>
      </b-nav-form>
    </b-navbar-nav>

    <SideMenu />

    <div v-if="isLoading" class="fa-3x loading-spinner">
      <i class="fas fa-circle-notch fa-spin"></i>
    </div>
  </div>

</template>

<script>
import Store from "../../store/store";
import SideMenu from "./SideMenu";
export default {
  name: "Header",
  data() {
    return {};
  },
  components: {
    SideMenu
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
.fa-home {
  margin-left: 40px;
}
.admin {
  font-size: 16px;
  margin: 0 auto;
}
.nav-link.active {
  background-color: #202020;
}
</style>
