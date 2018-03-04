<template>
  <b-container class="profile">
    <h1>Profile</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">

      <b-form-group horizontal id="name" label="Nombre" label-for="name">
        <b-form-input id="name" v-model.trim="form.name" required></b-form-input>
      </b-form-group>

      <Buttons />

      <b-alert variant="danger" :show="errorShow">{{ errorMsg }}</b-alert>

    </b-form>
  </b-container>

</template>

<script>
import Store from "../store/store";
import Buttons from "./lib/Buttons";

export default {
  name: "Profile",
  data() {
    return {
      form: {
        id: 0,
        name: ""
      },
      show: true,
      errorShow: false,
      errorMsg: ""
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
      this.$router.push({ name: "Profiles" });
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
      Store.dispatch("SAVE_PROFILE", this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.name = "";
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Profiles" });
      });
    },
    cleanError() {
      this.errorShow = false;
      this.errorMsg = "";
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile {
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
