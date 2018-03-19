<template>

  <b-container class="project">
    <h3 class="text-center">
      <i class="fas fa-industry"></i>
      Project {{ this.form.name}}
      </h3>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">

      <b-form-group horizontal label="Company" label-for="organization_id">
        <b-form-select v-model="form.organization_id" :options="organizations" required v-bind:style="{ fontSize: fontSize + 'px' }"/>
      </b-form-group>

      <b-form-group horizontal label="Code" label-for="code">
        <b-form-input id="code" v-model.trim="form.code" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Name" label-for="name">
        <b-form-input id="name" v-model.trim="form.name" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
      </b-form-group>

      <Buttons/>

    </b-form>
  </b-container>

</template>

<script>
import Store from "../store/store";
import Buttons from "./lib/Buttons";

export default {
  name: "Project",
  data() {
    return {
      show: true,
      form: {
        id: 0,
        code: "",
        name: "",
        organization_id: 0
      }
    };
  },
  components: {
    Buttons
  },
  watch: {
    results() {
      const results = Store.state.results;
      if (results.error) {
        return;
      }
      this.$router.push({ name: "Projects" });
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
      Store.dispatch("SAVE_PROJECT", this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Projects" });
      });
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("LOAD_ORGANIZATIONS");
    if (this.item) {
      this.form.id = this.item.id;
      this.form.code = this.item.code;
      this.form.name = this.item.name;
      this.form.organization_id = this.item.organization_id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.project {
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
