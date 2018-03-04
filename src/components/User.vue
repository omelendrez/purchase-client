<template>
  <b-container class="user">
    <h1>Usuario</h1>

    <b-form @submit="onSubmit" @reset="onReset" v-if="form.show" id="addForm">

      <b-form-group horizontal id="position_id" label="Organization" label-for="organization_id">
        <b-form-select v-model="form.organization_id" :options="organizations" class="mb-3" required/>
      </b-form-group>

      <b-form-group horizontal id="user_name" label="User name" label-for="user_name">
        <b-form-input id="user_name" v-model.trim="form.user_name" required></b-form-input>
      </b-form-group>

      <b-form-group horizontal id="full_name" label="Full name" label-for="full_name">
        <b-form-input id="full_name" v-model.trim="form.full_name" required></b-form-input>
      </b-form-group>

      <b-form-group horizontal id="position_id" label="Position" label-for="position_id">
        <b-form-select v-model="form.position_id" :options="positions" class="mb-3" required/>
      </b-form-group>

      <b-form-group horizontal id="location_id" label="Location" label-for="location_id">
        <b-form-select v-model="form.location_id" :options="locations" class="mb-3" required/>
      </b-form-group>

      <Buttons />

      <b-alert variant="danger" :show="errorShow">{{ errorMessage }}</b-alert>

    </b-form>

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
        position_id: 0,
        organization_id: 0,
        location_id: 0,
        show: true
      },
      errorShow: false,
      errorMessage: ""
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
      this.$router.push({ name: "Users" });
    }
  },
  computed: {
    results() {
      return Store.state.results;
    },
    isLogged() {
      return Store.state.user.id;
    },
    positions() {
      const positions = Store.state.positions.rows;
      const options = [];
      for (let i = 0; i < positions.length; i++) {
        options.push({
          value: positions[i].id,
          text: positions[i].name
        });
      }
      return options;
    },
    organizations() {
      const organizations = Store.state.organizations.rows;
      const options = [];
      for (let i = 0; i < organizations.length; i++) {
        options.push({
          value: organizations[i].id,
          text: organizations[i].name
        });
      }
      return options;
    },
    locations() {
      const locations = Store.state.locations.rows;
      const options = [];
      for (let i = 0; i < locations.length; i++) {
        options.push({
          value: locations[i].id,
          text: locations[i].name
        });
      }
      return options;
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
    onSubmit(evt) {
      evt.preventDefault();
      Store.dispatch("SAVE_USER", this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.user_name = "";
      this.form.full_name = "";
      this.form.organization_id = 0;
      this.form.location_id = 0;
      this.form.position_id = 0;
      /* Trick to reset/clear native browser form validation state */
      this.form.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Users" });
      });
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    if (this.item) {
      this.form.id = this.item.id;
      this.form.user_name = this.item.user_name;
      this.form.full_name = this.item.full_name;
      this.form.organization_id = this.item.organization_id;
      this.form.location_id = this.item.location_id;
      this.form.position_id = this.item.position_id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user {
  background-color: white;
  padding: 60px;
}
#addForm {
  margin: 0 auto;
  max-width: 800px;
  padding-top: 40px;
}
</style>
