<template>
  <b-container class="permissions" fluid>

    <Add />

    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Type here for a quick search" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>

    <b-table small hover striped outlined :items="permissions.rows" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage" :show-empty="true" head-variant="light">
      <template slot="actions" slot-scope="cell">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Modify</b-btn>
        <b-btn size="sm" v-if="cell.item.status_id === 1" variant="danger" @click.stop="deleteItem(cell.item, 1)">Inactivate</b-btn>
        <b-btn size="sm" v-else variant="success" @click.stop="deleteItem(cell.item, 0)">Re-activate</b-btn>
      </template>
      <template slot="table-caption">
        {{permissions.count}} records
      </template>
    </b-table>

    <b-pagination :total-rows="permissions.count" :per-page="perPage" v-model="currentPage" variant="info" />

    <b-modal id="modal-center" title="Inactivate" v-model="deleteShow" @ok="handleOk" ok-title="Yes. Inactivate" cancel-title="No. Leave it Active" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Are you sure you want to inactivate
        <strong>{{ selectedItem.name }} </strong>?</p>
    </b-modal>

  </b-container>
</template>

<script>
import Store from '../store/store'
import Add from './lib/Add'
const fields = require('./lib/Fields').permissions
const commonFields = require('./lib/Fields').commonFields
const actions = require('./lib/Fields').actions

export default {
  name: 'Permissions',
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      deleteShow: false,
      selectedItem: {
        code: '',
        name: '',
        description: ''
      },
      fields: fields
    }
  },
  methods: {
    editItem(item) {
      Store.dispatch('ADD_ITEM', item)
      this.$router.push({ name: 'Permission' })
    },
    deleteItem(item, type) {
      this.selectedItem = item
      if (type === 1) {
        this.deleteShow = true
      } else {
        this.handleOk()
      }
    },
    handleOk() {
      Store.dispatch('DELETE_PERMISSION', this.selectedItem)
    }
  },
  watch: {
    results() {
      const results = Store.state.results
      if (results.error) {
        return
      }
      Store.dispatch('LOAD_PERMISSIONS')
    }
  },
  computed: {
    results() {
      return Store.state.results
    },
    isLogged() {
      return Store.state.user.id
    },
    permissions() {
      return Store.state.permissions
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    Store.dispatch('SET_MENU_OPTION', this.$route.name)
    Store.dispatch('LOAD_PERMISSIONS')

    this.fields.push(...commonFields)
    if (Store.state.admin) {
      this.fields.push(...actions)
    }
  },
  components: {
    Add
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.permissions {
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
