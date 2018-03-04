<template>
  <b-container class="department" fluid>

    <Add />

    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Entre el dato a buscar" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>

    <b-table hover outlined :items="departments.rows" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage" head-variant="light">
      <template slot="actions" slot-scope="cell">
        <b-btn variant="info" @click.stop="editItem(cell.item)">Modify</b-btn>
        <b-btn v-if="cell.item.status_id === 1" variant="danger" @click.stop="deleteItem(cell.item, 1)">Deactivate</b-btn>
        <b-btn v-else variant="success" @click.stop="deleteItem(cell.item, 0)">Re-activate</b-btn>
      </template>
      <template slot="table-caption">
        {{departments.count}} records
      </template>
    </b-table>

    <b-pagination :total-rows="departments.count" :per-page="perPage" v-model="currentPage" variant="info" />

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
  name: "Departments",
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
  methods: {
    editItem(item) {
      Store.dispatch("ADD_ITEM", item);
      this.$router.push({ name: "Department" });
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
      Store.dispatch("DELETE_DEPARTMENT", this.selectedItem);
    }
  },
  watch: {
    results() {
      const results = Store.state.results;
      if (results.error) {
        return;
      }
      Store.dispatch("LOAD_DEPARTMENTS");
    }
  },
  computed: {
    results() {
      return Store.state.results;
    },
    isLogged() {
      return Store.state.user.id;
    },
    departments() {
      return Store.state.departments;
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("SET_MENU_OPTION", this.$route.path);
    Store.dispatch("LOAD_DEPARTMENTS");
  },
  components: {
    Add
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.department {
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
