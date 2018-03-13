<template>

  <div>
    <span class="side-menu" @click.stop="openNav()">
      <i class="fas fa-bars"></i>
    </span>
    <template v-if="isLogged">
      <b-navbar type="dark" variant="dark" vertical>
        <b-navbar-nav id="mySidenav" class="sidenav">
          <a href="javascript:void(0)" class="closebtn" @click.stop="closeNav()">
            <i class="fas fa-times"></i>
          </a>
          <b-nav-item class="mx-4" v-if="mainOptionIs('admin')" @click="closeNav" v-bind:active="menuOption === '/organizations'" href="#/organizations">
            <i class="fas fa-building"></i> Organizations</b-nav-item>
          <b-nav-item class="mx-4" v-if="mainOptionIs('admin')" @click="closeNav" v-bind:active="menuOption === '/users'" href="#/users">
            <i class="fas fa-user"></i> Users</b-nav-item>
          <b-nav-item class="mx-4" v-if="mainOptionIs('global')" @click="closeNav" v-bind:active="menuOption === '/permissions'" href="#/permissions">
            <i class="fas fa-key"></i> Permissions</b-nav-item>
          <b-nav-item class="mx-4" v-if="mainOptionIs('global')" @click="closeNav" v-bind:active="menuOption === '/units'" href="#/units">
            <i class="fas fa-boxes"></i> Units of measure</b-nav-item>
          <b-nav-item class="mx-4" v-if="mainOptionIs('master')" @click="closeNav" v-bind:active="menuOption === '/departments'" href="#/departments">
            <i class="fas fa-users"></i> Departments</b-nav-item>
          <b-nav-item class="mx-4" v-if="mainOptionIs('master')" @click="closeNav" v-bind:active="menuOption === '/locations'" href="#/locations">
            <i class="fas fa-location-arrow"></i> Locations</b-nav-item>
          <b-nav-item class="mx-4" v-if="mainOptionIs('master')" @click="closeNav" v-bind:active="menuOption === '/projects'" href="#/projects">
            <i class="fas fa-industry"></i> Projects</b-nav-item>
          <b-nav-item class="mx-4" v-if="mainOptionIs('master')" @click="closeNav" v-bind:active="menuOption === '/vendors'" href="#/vendors">
            <i class="fas fa-handshake"></i> Vendors</b-nav-item>
          <b-nav-item class="mx-4" v-if="mainOptionIs('activities')" @click="closeNav" v-bind:active="menuOption === '/requisitions'" href="#/requisitions">
            <i class="fas fa-shopping-cart"></i> Requisitions</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </template>
  </div>
</template>

<script>
import Store from "../../store/store";

export default {
  name: "SideMenu",
  data() {
    return {};
  },
  watch: {
    mainOption() {
      this.openNav();
    }
  },
  computed: {
    mainOption() {
      return Store.state.mainOption;
    },
    fontSize() {
      return Store.state.fontSize;
    },
    menuOption() {
      return Store.state.option;
    },
    isLogged() {
      return Store.state.user.id;
    },
    isAdmin() {
      return Store.state.user.profile_id === 1;
    }
  },
  methods: {
    openNav() {
      document.getElementById("mySidenav").style.width = "220px";
    },
    closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    },
    mainOptionIs(option) {
      return this.mainOption === option;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.side-menu {
  font-size: 20px;
  color: #9a9da0;
  cursor: pointer;
  position: absolute;
  padding: 14px;
  top: 0;
  left: 0;
  z-index: 1;
}
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  background-color: #343a40;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 80px;
}

.sidenav a {
  padding-left: 10px;
  text-decoration: none;
  font-size: 16px;
  display: block;
  transition: 0.3s;
  white-space: nowrap;
}

.sidenav a:hover {
  color: #d1d1d1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
  color: #9a9da0;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}

.nav-link.active {
  background-color: #202020;
}
</style>
