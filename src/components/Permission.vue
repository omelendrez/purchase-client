<template>
  <b-container class="permission">
    <h3 class="text-center">
      <i class="fas fa-key"></i>
      Permission {{ this.form.name}}
    </h3>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" id="addForm">

      <b-form-group horizontal label="Code" label-for="code">
        <b-form-input id="code" v-model.trim="form.code" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Name" label-for="name">
        <b-form-input id="name" v-model.trim="form.name" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Description" label-for="description">
        <b-form-textarea id="description" v-model="form.description" placeholder="Enter a short explanation on the use of this code" :rows="3" :max-len="255" required :max-rows="3" v-bind:style="{ fontSize: fontSize + 'px' }">
        </b-form-textarea>
      </b-form-group>

      <b-form-group horizontal label="Order" label-for="order">
        <b-form-input id="order" type="number" v-model.trim="form.order" required v-bind:style="{ fontSize: fontSize + 'px' }"></b-form-input>
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
  name: "Permission",
  data() {
    return {
      show: true,
      form: {
        code: "",
        name: "",
        description: "",
        order: 0,
        id: 0
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
      this.$router.push({ name: "Permissions" });
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
    item() {
      return Store.state.record;
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      Store.dispatch("SAVE_PERMISSION", this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Permissions" });
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
      this.form.code = this.item.code;
      this.form.name = this.item.name;
      this.form.description = this.item.description;
      this.form.order = this.item.order;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.permission {
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
