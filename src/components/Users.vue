<template>
  <b-container class="users" fluid>

    <Add />

    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Type here for a quick search" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>

    <b-table hover outlined :items="users.rows" :fields="fields" head-variant="light">
      <template slot="actions" slot-scope="cell" v-if="cell.item.id !== user.id">
        <b-btn variant="info" @click.stop="editItem(cell.item)">Modify</b-btn>
        <b-btn v-if="cell.item.status_id === 1" variant="danger" @click.stop="deleteItem(cell.item, 1)">Deactivate</b-btn>
        <b-btn v-else variant="success" @click.stop="deleteItem(cell.item, 0)">Re-activate</b-btn>
      </template>
      <template slot="table-caption">
        {{users.count}} registros
      </template>
    </b-table>

    <b-pagination :total-rows="users.count" :per-page="perPage" v-model="currentPage" />

    <b-modal id="modal-center" title="Deactivate" v-model="show" @ok="handleOk" ok-title="Yes. Deactivate" cancel-title="No. Leave it Active" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Are you sure you want to deactivate
        <strong>{{ selectedItem.user_name }} </strong>?</p>
    </b-modal>

  </b-container>
</template>

<script>
import Store from "../store/store";
import Add from "./lib/Add";

export default {
  name: "Users",
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      show: false,
      selectedItem: {
        user_name: "",
        full_name: ""
      },
      fields: [
        {
          key: "organization.name",
          sortable: true
        },
        {
          key: "user_name",
          sortable: true
        },
        {
          key: "full_name",
          sortable: true
        },
        {
          key: "position.name",
          sortable: true
        },
        {
          key: "created_at",
          class: "text-center",
          thStyle: {
            width: "160px"
          }
        },
        {
          key: "updated_at",
          class: "text-center",
          thStyle: {
            width: "160px"
          }
        },
        {
          key: "status.name",
          class: "text-center",
          thStyle: {
            width: "160px"
          }
        },
        {
          key: "actions",
          class: "text-center",
          thStyle: {
            width: "200px"
          }
        }
      ]
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
        position_id: 0,
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
        this.show = true;
      } else {
        this.handleOk();
      }
    }
  },
  watch: {
    results() {
      Store.dispatch("LOAD_USERS");
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
    Store.dispatch("SET_MENU_OPTION", this.$route.path);
    Store.dispatch("LOAD_ORGANIZATIONS");
    Store.dispatch("LOAD_LOCATIONS");
    Store.dispatch("LOAD_DEPARTMENTS");
    Store.dispatch("LOAD_POSITIONS");
    Store.dispatch("LOAD_STATUS");
    Store.dispatch("LOAD_USERS");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.users {
  background-color: white;
  padding-bottom: 10px;
  padding-top: 10px;
}
.add-button {
  float: right;
}
.filter-form {
  max-width: 30%;
}
.reset-button {
  margin-left: 10px;
}
</style>
