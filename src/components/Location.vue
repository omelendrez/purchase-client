<template>

  <b-container class="branch">
    <h3 class="text-center">Location</h3>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">
      <b-form-group horizontal label="Name" label-for="name">
        <b-form-input id="name" v-model.trim="form.name" required></b-form-input>
      </b-form-group>
      <b-form-group horizontal label="Address" label-for="address">
        <b-form-textarea id="address" v-model="form.address" placeholder="Enter the address of this location" :rows="3" required :max-rows="6">
        </b-form-textarea>
      </b-form-group>
      <b-form-group horizontal label="Phone" label-for="phone">
        <b-form-input id="phone" v-model.trim="form.phone" required></b-form-input>
      </b-form-group>

      <Buttons/>

    </b-form>
  </b-container>

</template>

<script>
import Store from "../store/store";
import Buttons from "./lib/Buttons";

export default {
  name: "Location",
  data() {
    return {
      show: true,
      form: {
        name: "",
        address: "",
        phone: "",
        id: 0
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
      this.$router.push({ name: "Locations" });
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
      Store.dispatch("SAVE_LOCATION", this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Locations" });
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
      this.form.address = this.item.address;
      this.form.phone = this.item.phone;
      this.form.id = this.item.id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.branch {
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
