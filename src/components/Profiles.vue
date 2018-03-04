<template>
  <b-container class="profiles" fluid>

    <Add />

    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Type here for a quick search" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>

    <b-table hover outlined :items="profiles.rows" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage" head-variant="light">
      <template slot="actions" slot-scope="cell">
        <b-btn variant="info" @click.stop="editItem(cell.item)">Modify</b-btn>
        <b-btn v-if="cell.item.status_id === 1" variant="danger" @click.stop="deleteItem(cell.item, 1)">Deactivate</b-btn>
        <b-btn v-else variant="success" @click.stop="deleteItem(cell.item, 0)">Re-activate</b-btn>
      </template>
      <template slot="table-caption">
        {{profiles.count}} registros
      </template>
    </b-table>

    <b-pagination :total-rows="profiles.count" :per-page="perPage" v-model="currentPage" />

    <b-modal id="modal-center" title="Deactivate" v-model="show" @ok="handleOk" ok-title="Yes. Deactivate" cancel-title="No. Leave it Active" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Are you sure you want to deactivate
        <strong>{{ selectedItem.name }} </strong>?</p>
    </b-modal>
  </b-container>

</template>

<script>
import Store from "../store/store";
import Add from "./lib/Add";

export default {
  name: "Profiles",
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      show: false,
      selectedItem: {
        name: ""
      },
      fields: [
        {
          key: "organization.name",
          sortable: true
        },
        {
          key: "name",
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
    editItem(item) {
      Store.dispatch("ADD_ITEM", item);
      this.$router.push({ name: "Profile" });
    },
    deleteItem(item, type) {
      this.selectedItem = item;
      if (type === 1) {
        this.show = true;
      } else {
        this.handleOk();
      }
    },
    handleOk() {
      Store.dispatch("DELETE_PROFILE", this.selectedItem);
    }
  },
  watch: {
    results() {
      const results = Store.state.results;
      if (results.error) {
        return;
      }
      Store.dispatch("LOAD_PROFILES");
    }
  },
  computed: {
    results() {
      return Store.state.results;
    },
    isLogged() {
      return Store.state.user.id;
    },
    profiles() {
      return Store.state.profiles;
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("SET_MENU_OPTION", this.$route.path);
    Store.dispatch("LOAD_PROFILES");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profiles {
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
