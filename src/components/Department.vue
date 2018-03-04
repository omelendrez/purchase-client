<template>
  <b-container fluid>
    <Header />
    <b-container class="department">
      <h1>Department</h1>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">
        <b-form-group horizontal label="Name" label-for="name">
          <b-form-input id="name" v-model.trim="form.name" required></b-form-input>
        </b-form-group>

        <Buttons/>

        <b-alert variant="danger" :show="errorShow">{{ errorMessage }}</b-alert>

      </b-form>
    </b-container>
  </b-container>
</template>

<script>
import Store from "../store/store";
import Buttons from "./lib/Buttons";
import Header from "./lib/Header";

export default {
  name: "Department",
  data() {
    return {
      show: true,
      form: {
        name: "",
        id: 0
      },
      errorShow: false,
      errorMessage: ""
    };
  },
  components: {
    Buttons,
    Header
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
      this.form.organization_id = this.organization_id;
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
      this.form.name = this.item.name;
      this.form.id = this.item.id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.department {
  background-color: white;
  padding: 60px;
}
#addForm {
  margin: 0 auto;
  max-width: 800px;
  padding-top: 40px;
}
</style>
