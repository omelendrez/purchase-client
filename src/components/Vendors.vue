<template>
  <b-container class="vendors" fluid>

    <Add />

    <!--
    <b-btn variant="warning" @click.stop="impData" class="add-button">Import</b-btn>
    -->

    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Type here for a quick search" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>

    <b-table small hover striped outlined :items="vendors.rows" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage" :show-empty="true" head-variant="light">
      <template slot="actions" slot-scope="cell">
        <b-btn size="sm" variant="info" @click.stop="editItem(cell.item)">Modify</b-btn>
        <b-btn size="sm" v-if="cell.item.status_id === 1" variant="danger" @click.stop="deleteItem(cell.item, 1)">Inactivate</b-btn>
        <b-btn size="sm" v-else variant="success" @click.stop="deleteItem(cell.item, 0)">Re-activate</b-btn>
      </template>
      <template slot="table-caption">
        {{vendors.count}} registros
      </template>
    </b-table>

    <b-form-group label="Per page" label-for="perPage" class="per-page">
      <b-form-select v-model="perPage" :options="perPageOptions" />
    </b-form-group>

    <b-pagination :total-rows="vendors.count" :per-page="perPage" v-model="currentPage" />

    <b-modal id="modal-center" title="Inactivate" v-model="deleteShow" @ok="handleOk" ok-title="Yes. Inactivate" cancel-title="No. Leave it Active" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Are you sure you want to inactivate
        <strong>{{ selectedItem.user_name }} </strong>?</p>
    </b-modal>

  </b-container>
</template>

<script>
import Store from '../store/store'
import Add from './lib/Add'
const fields = require('./lib/Fields').vendors
const commonFields = require('./lib/Fields').commonFields
const actions = require('./lib/Fields').actions
const org = require('./lib/Fields').org
// import importData from './lib/import'

export default {
  name: 'Vendors',
  data() {
    return {
      pwd: '',
      perPage: 10,
      perPageOptions: [5, 10, 15, 20, 25],
      currentPage: 1,
      filter: null,
      deleteShow: false,
      resetShow: false,
      selectedItem: {
        id: 0,
        code: '',
        name: '',
        address: '',
        phone: '',
        email: '',
        contact: '',
        organization_id: 0
      },
      fields: fields
    }
  },
  components: {
    Add
  },
  methods: {
    addItem() {
      Store.dispatch('ADD_ITEM', {
        id: 0,
        code: '',
        name: '',
        address: '',
        phone: '',
        email: '',
        contact: '',
        organization_id: 0
      })
      this.$router.push({ name: 'Vendor' })
    },
    editItem(item) {
      Store.dispatch('ADD_ITEM', item)
      this.$router.push({ name: 'Vendor' })
    },
    handleOk() {
      Store.dispatch('DELETE_VENDOR', this.selectedItem)
    },
    deleteItem(item, type) {
      this.selectedItem = item
      if (type === 1) {
        this.deleteShow = true
      } else {
        this.handleOk()
      }
    },
    handleOkReset() {
      this.selectedItem.password = this.pwd
      Store.dispatch('RESET_PASSWORD', this.selectedItem)
    },
    handleSubmit() {
      this.$refs.modal.hide()
      /*    },
    impData() {
      importData()
    */
    }
  },
  watch: {
    results() {
      Store.dispatch('LOAD_VENDORS')
    },
    vendors() {
      return Store.dispatch.vendors
    }
  },
  computed: {
    isLogged() {
      return Store.state.user.id
    },
    user() {
      return Store.state.user
    },
    vendors() {
      return Store.state.vendors
    },
    results() {
      return Store.state.results
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    Store.dispatch('SET_MENU_OPTION', this.$route.name)
    Store.dispatch('LOAD_VENDORS')

    if (Store.state.globalAdmin) {
      this.fields.unshift(org)
    }
    this.fields.push(...commonFields)
    if (Store.state.admin) {
      this.fields.push(...actions)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vendors {
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
.per-page {
  float: right;
}
</style>
