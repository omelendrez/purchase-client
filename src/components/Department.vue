<template>
  <b-container class="department">
    <h3 class="text-center">
      <i class="fas fa-users"></i>
      Department {{ this.form.name}}
    </h3>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">

      <b-form-group horizontal label="Company" label-for="organization_id">
        <b-form-select v-model="form.organization_id" :options="organizations" required v-bind:style="{ fontSize: fontSize + 'px' }" />
      </b-form-group>

      <b-form-group horizontal label="Name" label-for="name">
        <b-form-input id="name" v-model.trim="form.name" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
      </b-form-group>

      <Buttons/>

      <b-alert variant="danger" :show="errorShow">{{ errorMessage }}</b-alert>

    </b-form>
  </b-container>
</template>

<script>
import Store from "../store/store";
import Buttons from "./lib/Buttons";

export default {
  name: "Department",
  data() {
    return {
      show: true,
      form: {
        name: "",
        id: 0,
        organization_id: 0
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
      this.$router.push({ name: "Departments" });
    }
  },
  computed: {
    fontSize() {
      return Store.state.fontSize;
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
    results() {
      return Store.state.results;
    },
    isLogged() {
      return Store.state.user.id;
    },
    item() {
      return Store.state.record;
    },
    organization_id() {
      return Store.state.user.organization_id;
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      Store.dispatch("SAVE_DEPARTMENT", this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Departments" });
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
      this.form.name = this.item.name;
      this.form.organization_id = this.item.organization_id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.department {
  background-color: white;
  padding: 60px;
  margin-top: 18px;
}
#addForm {
  margin: 0 auto;
  max-width: 800px;
  padding-top: 40px;
}
</style>
