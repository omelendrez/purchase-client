<template>
  <div class="header">

    <b-navbar toggleable="md" type="dark" variant="dark">

      <b-navbar-toggle target="nav_collapse_main"></b-navbar-toggle>

      <b-navbar-brand @click.stop="setMain('home')" href="#/">
        <i class="fas fa-home text-primary"></i>
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse_main">
        <template v-if="isLogged">

          <b-navbar-nav>
            <b-nav-item class="mx-4" v-if="canSeeHeader('admin','ADM')" v-bind:active="groupIsSelected('admin','ADM')" @click.stop="setMain('admin')">
              Admin tables</b-nav-item>
            <b-nav-item class="mx-4" v-if="canSeeHeader('master','ADM')" v-bind:active="groupIsSelected('master','ADM')" @click.stop="setMain('master')">
              Master tables</b-nav-item>
            <b-nav-item class="mx-4" v-if="canSeeHeader('activities','ADM-PRI-PRA-POI-POA-RRI-RFPI')" v-bind:active="groupIsSelected('activities','PRI-PRA-POI-POA-RRI-RFPI')" @click.stop="setMain('activities')">
              Daily activities</b-nav-item>
            <b-nav-item class="mx-4" v-if="canSeeHeader('reports','ADM')" :disabled="true" v-bind:active="groupIsSelected('reports','ADM')" @click.stop="setMain('reports')">
              Reports</b-nav-item>
          </b-navbar-nav>

          <div class="bell" v-if="alertActive">
            <span class="fa-layers fa-fw fa-2x">
              <i class="fas fa-bell"></i>
              <span class="fa-layers-counter fa-lg" style="background:Tomato">2</span>
            </span>
          </div>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="isLogged">
            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content">
                <i class="fas fa-user text-success"></i>
                {{userFullName}}
              </template>
              <b-dropdown-item href="#/login">
                <i class="fas fa-sign-out-alt text-danger"></i> Close session</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item href="#/change_password">
                <i class="fas fa-unlock-alt text-danger"></i> Change password</b-dropdown-item>
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
            <b-nav-item class="mx-4" v-if="canAccessOption('admin', 'ADM')" v-bind:active="optionIsSelected('Organizations')" href="#/organizations">
              <i class="fas fa-building text-danger"></i> Companies</b-nav-item>
            <b-nav-item class="mx-4" v-if="canAccessOption('admin', 'ADM')" v-bind:active="optionIsSelected('Users')" href="#/users">
              <i class="fas fa-user text-danger"></i> Users</b-nav-item>
            <b-nav-item class="mx-4" v-if="canAccessOption('admin', 'ADM')" v-bind:active="optionIsSelected('Permissions')" href="#/permissions">
              <i class="fas fa-key text-danger"></i> Permissions</b-nav-item>
            <b-nav-item class="mx-4" v-if="canAccessOption('admin', 'ADM')" v-bind:active="optionIsSelected('Workflows')" href="#/workflows">
              <i class="fas fa-thumbs-up text-danger"></i> Workflows</b-nav-item>

            <!-- master -->
            <b-nav-item class="mx-4" v-if="canAccessOption('master','ADM')" v-bind:active="optionIsSelected('Departments')" href="#/departments">
              <i class="fas fa-users text-danger"></i> Departments</b-nav-item>
            <b-nav-item class="mx-4" v-if="canAccessOption('master','ADM')" v-bind:active="optionIsSelected('Locations')" href="#/locations">
              <i class="fas fa-location-arrow text-danger"></i> Locations</b-nav-item>
            <b-nav-item class="mx-4" v-if="canAccessOption('master','ADM')" v-bind:active="optionIsSelected('Projects')" href="#/projects">
              <i class="fas fa-industry text-danger"></i> Projects</b-nav-item>
            <b-nav-item class="mx-4" v-if="canAccessOption('master','ADM')" v-bind:active="optionIsSelected('Vendors')" href="#/vendors">
              <i class="fas fa-handshake text-danger"></i> Vendors</b-nav-item>
            <b-nav-item class="mx-4" v-if="canAccessOption('master','ADM')" v-bind:active="optionIsSelected('Units')" href="#/units">
              <i class="fas fa-boxes text-danger"></i> Units of measure</b-nav-item>

            <!-- activities -->
            <b-nav-item class="mx-4" v-if="canAccessOption('activities','ADM-PRI-PRA')" v-bind:active="optionIsSelected('Requisitions')" href="#/requisitions">
              <i class="fas fa-shopping-cart text-danger"></i> Purchase Requisitions</b-nav-item>

            <b-nav-item class="mx-4" v-if="canAccessOption('activities','ADM-POI-POA')" v-bind:active="optionIsSelected('PurchaseOrders')" href="#/purchase_orders">
              <i class="fas fa-shopping-cart text-danger"></i> Purchase Orders</b-nav-item>

            <b-nav-item class="mx-4" v-if="canAccessOption('activities','ADM-PRI-PRA-POI-POA')" v-bind:active="optionIsSelected('Approvals')" href="#/approvals">
              <i class="fas fa-thumbs-up text-danger"></i> Approvals</b-nav-item>

            <b-nav-item class="mx-4" v-if="canAccessOption('activities','ADM-RRI')" :disabled="true" v-bind:active="optionIsSelected('ReceivingReports')" href="#/receive_reports">
              <i class="fas fa-clipboard-check text-danger"></i> Receiving Reports</b-nav-item>

            <b-nav-item class="mx-4" v-if="canAccessOption('activities','ADM-PFRI')" :disabled="true" v-bind:active="optionIsSelected('PaymentRequests')" href="#/payment_requests">
              <i class="far fa-money-bill-alt text-danger"></i> Payment Requests</b-nav-item>
          </b-navbar-nav>
        </template>

      </b-collapse>

    </b-navbar>

    <div v-if="isLoading" class="fa-3x loading-spinner">
      <i class="fas fa-circle-notch fa-spin"></i>
    </div>

  </div>

</template>

<script>
import Store from '../../store/store'
export default {
  name: 'Header',
  data() {
    return {
      alertActive: false
    }
  },
  computed: {
    isLoading() {
      return Store.state.loading
    },
    user() {
      return Store.state.user
    },
    isLogged() {
      return this.user.id
    },
    isAdmin() {
      return this.user.profile_id === 1
    },
    isGlobalAdmin() {
      return Store.state.globalAdmin
    },
    userFullName() {
      return this.user.full_name
    },
    mainOption() {
      return Store.state.mainOption
    },
    menuOption() {
      return Store.state.option
    }
  },
  methods: {
    setMain(option) {
      Store.dispatch('SET_MAIN_OPTION', option)
      this.$router.push({ name: 'Empty' })
    },
    canSeeHeader(option, permissions) {
      return (
        this.user.permissions.find(perm => {
          return permissions.indexOf(perm) > -1
        }) ||
        (this.isGlobalAdmin && permissions.indexOf('ADM') > -1)
      )
    },
    canAccessOption(option, permissions) {
      return this.user.permissions.find(perm => {
        return permissions.indexOf(perm) > -1 && this.mainOption === option
      })
    },
    groupIsSelected(option, permissions) {
      if (permissions) {
        return this.mainOption === option
      }
    },
    optionIsSelected(option) {
      return this.menuOption === option
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.bell {
  margin: 0 auto;
  cursor: pointer;
}
.bell .fa-bell {
  color: rgb(1, 255, 1);
}
</style>
