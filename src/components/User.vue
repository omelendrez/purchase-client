<template>

  <b-container class="user">
    <h3 class="text-center">
      <i class="fas fa-user"></i>
      User
    </h3>
    <b-card no-body>
      <b-tabs card v-model="tabIndex">
        <b-tab title="Profile">

          <b-form @submit="onSubmit" @reset="onReset" v-if="showForm" id="addForm">

            <b-form-group horizontal label="Company" label-for="organization_id">
              <b-form-select v-model="form.organization_id" :options="organizations" @change="updateChildrenTables" required v-bind:style="{ fontSize: fontSize + 'px' }" />
            </b-form-group>

            <b-form-group horizontal label="User name" label-for="user_name">
              <b-form-input id="user_name" v-model.trim="form.user_name" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
            </b-form-group>

            <b-form-group horizontal label="Full name" label-for="full_name">
              <b-form-input id="full_name" v-model.trim="form.full_name" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
            </b-form-group>

            <b-form-group horizontal label="Email address" label-for="email">
              <b-form-input id="email" type="email" v-model.trim="form.email" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
            </b-form-group>

            <b-form-group horizontal label="Profile" label-for="profile_id">
              <b-form-select v-model="form.profile_id" :options="profiles" required v-bind:style="{ fontSize: fontSize + 'px' }" />
            </b-form-group>

            <b-form-group horizontal label="Department" label-for="department_id">
              <b-form-select v-model="form.department_id" :options="departmentOptions" required v-bind:style="{ fontSize: fontSize + 'px' }" />
            </b-form-group>

            <b-form-group horizontal label="Location" label-for="location_id">
              <b-form-select v-model="form.location_id" :options="locationOptions" required v-bind:style="{ fontSize: fontSize + 'px' }" />
            </b-form-group>

            <Buttons />

            <b-alert variant="danger" :show="errorShow">{{ errorMessage }}</b-alert>

          </b-form>
        </b-tab>
        <b-tab title="Permisions">
          <b-table stacked outlined :items="userPermissions" :show-empty="true" :fields="fields" caption-top>
            <template slot="table-caption">
              <h3 class="p-2">
                Currently assigned permissions
              </h3>
            </template>
            <template slot="actions" slot-scope="row">
              <b-btn size="sm" variant="danger" @click.stop="removePermission(row.item)">Remove permission</b-btn>
            </template>
          </b-table>
          <b-table stacked outlined :items="notUserPermissions" :show-empty="true" :fields="fields" caption-top>
            <template slot="table-caption">
              <h3 class="p-2">
                Available permissions
              </h3>
            </template>

            <template slot="actions" slot-scope="row">
              <b-btn size="sm" variant="success" @click.stop="assignPermission(row.item)">Assign permission</b-btn>
            </template>

          </b-table>
        </b-tab>
      </b-tabs>
    </b-card>

  </b-container>

</template>

<script>
import Store from "../store/store";
import Buttons from "./lib/Buttons";

export default {
  name: "User",
  data() {
    return {
      form: {
        id: 0,
        user_name: "",
        full_name: "",
        email: "",
        profile_id: 0,
        department_id: 0,
        organization_id: 0,
        location_id: 0
      },
      tabIndex: 0,
      showForm: true,
      errorShow: false,
      errorMessage: "",
      locationOptions: [],
      departmentOptions: [],
      fields: [
        {
          key: "code"
        },
        {
          key: "name"
        },
        {
          key: "description"
        },
        {
          key: "actions",
          label: " "
        }
      ],
      onPermissions: false
    };
  },
  components: {
    Buttons
  },
  watch: {
    results() {
      const results = Store.state.results;
      if (results.error) {
        this.errorMessage = results.message;
        this.errorShow = results.error;
        return;
      }
      if (this.onPermissions) {
        this.onPermissions = false;
        Store.dispatch("LOAD_USER_PERMISSIONS", this.item);
      } else {
        this.$router.push({ name: "Users" });
      }
    }
  },
  computed: {
    fontSize() {
      return Store.state.fontSize;
    },
    results() {
      return Store.state.results;
    },
    isLogged() {
      return Store.state.user.id;
    },
    profiles() {
      const profiles = Store.state.profiles.rows;
      if (!profiles) {
        return;
      }
      const options = [];
      for (let i = 0; i < profiles.length; i++) {
        options.push({
          value: profiles[i].id,
          text: profiles[i].name
        });
      }
      return options;
    },
    organizations() {
      const organizations = Store.state.activeOrganizations;
      if (!organizations) {
        return;
      }
      const options = [];
      for (let i = 0; i < organizations.length; i++) {
        if (
          organizations[i].id === Store.state.user.organization_id ||
          Store.state.globalAdmin
        ) {
          options.push({
            value: organizations[i].id,
            text: organizations[i].name
          });
        }
      }
      return options;
    },
    locations() {
      const locations = Store.state.activeLocations;
      if (!locations) {
        return;
      }
      const options = [];
      for (let i = 0; i < locations.length; i++) {
        if (locations[i].organization_id === Store.state.user.organization_id) {
          options.push({
            value: locations[i].id,
            text: locations[i].name
          });
        }
      }
      return options;
    },
    departments() {
      const departments = Store.state.activeDepartments;
      if (!departments) {
        return;
      }
      const options = [];
      for (let i = 0; i < departments.length; i++) {
        if (
          departments[i].organization_id === Store.state.user.organization_id
        ) {
          options.push({
            value: departments[i].id,
            text: departments[i].name
          });
        }
      }
      return options;
    },
    userPermissions() {
      return Store.state.userPermissions;
    },
    notUserPermissions() {
      return Store.state.notUserPermissions;
    },
    item() {
      return Store.state.record;
    },
    state() {
      return this.form.user_name.length >= 6;
    },
    invalidFeedback() {
      if (this.form.user_name.length > 6) {
        return "";
      }
      if (this.form.user_name.length > 0) {
        return "Enter at least 6 characters";
      }
    },
    validFeedback() {
      return this.state ? "Valid" : "";
    }
  },
  methods: {
    assignPermission(item) {
      this.onPermissions = true;
      const payload = {
        user_id: this.item.id,
        permission_id: item.id
      };
      Store.dispatch("SAVE_USER_PERMISSION", payload);
    },
    removePermission(item) {
      this.onPermissions = true;
      Store.dispatch("DELETE_USER_PERMISSION", item);
    },
    onSubmit(evt) {
      evt.preventDefault();
      Store.dispatch("SAVE_USER", this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.user_name = "";
      this.form.full_name = "";
      this.form.email = "";
      this.form.organization_id = 0;
      this.form.location_id = 0;
      this.form.profile_id = 0;
      this.form.department_id = 0;
      /* Trick to reset/clear native browser form validation state */
      this.showForm = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Users" });
      });
    },
    updateChildrenTables(organizationId) {
      this.$nextTick(() => {
        this.refreshData(
          Store.state.activeLocations,
          this.locationOptions,
          organizationId
        );
        this.refreshData(
          Store.state.activeDepartments,
          this.departmentOptions,
          organizationId
        );
      });
    },
    refreshData(table, options, organizationId) {
      if (!table) {
        return;
      }
      for (let i = 0; i < table.length; i++) {
        if (table[i].organization_id === organizationId) {
          options.push({
            value: table[i].id,
            text: table[i].name
          });
        }
      }
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("LOAD_ORGANIZATIONS");
    Store.dispatch("LOAD_LOCATIONS");
    Store.dispatch("LOAD_DEPARTMENTS");
    Store.dispatch("LOAD_PROFILES");
    Store.dispatch("LOAD_PERMISSIONS");
    this.$nextTick(() => {
      if (this.item) {
        Store.dispatch("LOAD_USER_PERMISSIONS", this.item);
        this.form.id = this.item.id;
        this.form.user_name = this.item.user_name;
        this.form.full_name = this.item.full_name;
        this.form.email = this.item.email;
        this.form.organization_id = this.item.organization_id;
        this.form.location_id = this.item.location_id;
        this.form.department_id = this.item.department_id;
        this.form.profile_id = this.item.profile_id;
        this.refreshData(
          Store.state.activeLocations,
          this.locationOptions,
          this.form.organization_id
        );
        this.refreshData(
          Store.state.activeDepartments,
          this.departmentOptions,
          this.form.organization_id
        );
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user {
  background-color: white;
  padding: 60px;
  padding-top: 20px;
  margin-top: 18px;
}
#addForm {
  margin: 0 auto;
  max-width: 800px;
  padding-top: 40px;
}
</style>
