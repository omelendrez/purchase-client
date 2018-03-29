<template>

  <b-container class="vendor">
    <h3 class="text-center">
      <i class="fas fa-handshake"></i>
      Vendor {{ this.form.name}}
    </h3>

    <b-form @submit="onSubmit" @reset="onReset" v-if="form.show" id="addForm">

      <b-form-group horizontal label="Company" label-for="organization_id">
        <b-form-select v-model="form.organization_id" :options="organizations" required/>
      </b-form-group>

      <b-form-group horizontal label="Vendor code" label-for="code">
        <b-form-input id="code" v-model.trim="form.code" required></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Vendor name" label-for="name">
        <b-form-input id="name" v-model.trim="form.name" required></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Address" label-for="address">
        <b-form-textarea id="address" v-model="form.address" placeholder="Enter the address of the vendor" :rows="3" required :max-rows="6">
        </b-form-textarea>
      </b-form-group>

      <b-form-group horizontal label="Phone number" label-for="phone">
        <b-form-input id="phone" v-model.trim="form.phone" required></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Email address" label-for="email">
        <b-form-input id="email" type="email" v-model.trim="form.email" required></b-form-input>
      </b-form-group>

      <b-form-group horizontal label="Contact person" label-for="contact">
        <b-form-input id="contact" v-model.trim="form.contact" required></b-form-input>
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
  name: "Vendor",
  data() {
    return {
      form: {
        id: 0,
        code: "",
        name: "",
        address: "",
        phone: "",
        email: "",
        contact: "",
        organization_id: 0,
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
      this.$router.push({ name: "Vendors" });
    }
  },
  computed: {
    results() {
      return Store.state.results;
    },
    isLogged() {
      return Store.state.user.id;
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
    item() {
      return Store.state.record;
    },
    state() {
      return this.form.vendor_name.length >= 6;
    },
    invalidFeedback() {
      if (this.form.vendor_name.length > 6) {
        return "";
      }
      if (this.form.vendor_name.length > 0) {
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
      Store.dispatch("SAVE_VENDOR", this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.id = 0;
      this.form.code = "";
      this.form.name = "";
      this.form.address = "";
      this.form.phone = "";
      this.form.email = "";
      this.form.contact = "";
      this.form.organization_id = 0;
      /* Trick to reset/clear native browser form validation state */
      this.form.show = false;
      this.$nextTick(() => {
        this.$router.push({ name: "Vendors" });
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
    this.$nextTick(() => {
      if (this.item) {
        this.form.id = this.item.id;
        this.form.code = this.item.code;
        this.form.name = this.item.name;
        this.form.address = this.item.address;
        this.form.phone = this.item.phone;
        this.form.email = this.item.email;
        this.form.contact = this.item.contact;
        this.form.organization_id = this.item.organization_id;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vendor {
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
