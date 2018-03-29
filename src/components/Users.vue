<template>
  <b-container class="users" fluid>

    <Add />

    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Type here for a quick search" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>

    <b-table small hover outlined :items="users.rows" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage" :show-empty="true" head-variant="light">
      <template slot="actions" slot-scope="cell">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Modify</b-btn>
        <b-btn size="sm" v-if="cell.item.status_id === 1" variant="danger" @click.stop="deleteItem(cell.item, 1)">Inactivate</b-btn>
        <b-btn size="sm" v-else variant="success" @click.stop="deleteItem(cell.item, 0)">Re-activate</b-btn>
        <b-btn size="sm" variant="outline-dark" @click.stop="resetPassword(cell.item)">Reset Pwd</b-btn>
      </template>
      <template slot="table-caption">
        {{users.count}} registros
      </template>
    </b-table>

    <b-pagination :total-rows="users.count" :per-page="perPage" v-model="currentPage" />

    <b-modal id="modal-center" title="Inactivate" v-model="deleteShow" @ok="handleOk" ok-title="Yes. Inactivate" cancel-title="No. Leave it Active" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Are you sure you want to inactivate
        <strong>{{ selectedItem.user_name }} </strong>?</p>
    </b-modal>

    <b-modal id="modal-center" title="Password reset" v-model="resetShow" @ok="handleOkReset" ok-title="Yes. Reset" cancel-title="No. Leave it" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Are you sure you want to reset the password for user
        <strong>{{ selectedItem.user_name }} </strong>?</p>
      <p>You can enter below the password you want to set for the user or you can set the default password by leaving the field empty then click on Yes, Re</p>
      <form @submit.stop.prevent="handleOkReset">
        <b-form-group horizontal label="Password" label-for="pwd">
          <b-form-input type="text" id="pwd" placeholder="Enter a new password or leave it blank" v-model="pwd"></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

  </b-container>
</template>

<script>
import Store from "../store/store";
import Add from "./lib/Add";
const fields = require("./lib/Fields").users;
const commonFields = require("./lib/Fields").commonFields;
const actions = require("./lib/Fields").actions;
const org = require("./lib/Fields").org;

export default {
  name: "Users",
  data() {
    return {
      pwd: "",
      perPage: 10,
      currentPage: 1,
      filter: null,
      deleteShow: false,
      resetShow: false,
      selectedItem: {
        user_name: "",
        full_name: ""
      },
      fields: fields
    };
  },
  components: {
    Add
  },
  methods: {
    addItem() {
      Store.dispatch("ADD_ITEM", {
        id: 0,
        user_name: "",
        full_name: "",
        organization_id: 0,
        department_id: 0,
        profile_id: 0,
        location_id: 0
      });
      this.$router.push({ name: "User" });
    },
    editItem(item) {
      Store.dispatch("ADD_ITEM", item);
      this.$router.push({ name: "User" });
    },
    handleOk() {
      Store.dispatch("DELETE_USER", this.selectedItem);
    },
    deleteItem(item, type) {
      this.selectedItem = item;
      if (type === 1) {
        this.deleteShow = true;
      } else {
        this.handleOk();
      }
    },
    handleOkReset() {
      this.selectedItem.password = this.pwd;
      Store.dispatch("RESET_PASSWORD", this.selectedItem);
    },
    handleSubmit() {
      this.$refs.modal.hide();
    },
    resetPassword(item, type) {
      this.selectedItem = item;
      this.resetShow = true;
    }
  },
  watch: {
    results() {
      Store.dispatch("LOAD_USERS");
    },
    users() {
      return Store.dispatch.users;
    }
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    },
    user() {
      return Store.state.user;
    },
    users() {
      return Store.state.users;
    },
    results() {
      return Store.state.results;
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("SET_MENU_OPTION", this.$route.name);
    Store.dispatch("LOAD_USERS");
    Store.dispatch("LOAD_ORGANIZATIONS");
    Store.dispatch("LOAD_LOCATIONS");
    Store.dispatch("LOAD_DEPARTMENTS");
    Store.dispatch("LOAD_PROFILES");
    Store.dispatch("LOAD_PERMISSIONS");

    if (Store.state.globalAdmin) {
      this.fields.unshift(org);
    }
    this.fields.push(...commonFields);
    if (Store.state.admin) {
      this.fields.push(...actions);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.users {
  background-color: white;
  padding-bottom: 20px;
  padding-top: 20px;
}
.add-button {
  float: right;
}
.filter-form {
  max-width: 30%;
  margin-bottom: 20px;
}
.reset-button {
  margin-left: 10px;
}
</style>
