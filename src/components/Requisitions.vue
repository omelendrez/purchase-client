<template>
  <b-container class="requisitions" fluid>

    <Add />

    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Type here for a quick search" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>

    <b-table small hover striped outlined :items="requisitions.rows" :fields="fields" :filter="filter" :per-page="perPage" :current-page="currentPage" :show-empty="true" head-variant="light">
      <template slot="actions" slot-scope="row">
        <b-btn size="sm" variant="outline-dark" @click.stop="row.toggleDetails">{{ row.detailsShowing ? 'Hide' : 'Show'}}</b-btn>
        <b-btn size="sm" variant="info" @click.stop="editItem(row.item)">Modify</b-btn>
        <b-btn size="sm" v-if="row.item.status_id === 1" variant="danger" @click.stop="deleteItem(row.item, 1)">Inactivate</b-btn>
        <b-btn size="sm" v-else variant="success" @click.stop="deleteItem(row.item, 0)">Re-activate</b-btn>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-row>
          <b-col>
            <b-card class="card-data">
              <b-row>
                <b-col colspan="2">
                  <b-button size="sm" variant="outline-dark" class="float-right" @click="row.toggleDetails">Hide Details</b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="text-sm-right">
                  <b>Number:</b>
                </b-col>
                <b-col cols="8">
                  {{ row.item.number }}
                </b-col>
              </b-row>
              <b-row>
                <b-col class="text-sm-right">
                  <b>Requester:</b>
                </b-col>
                <b-col cols="8">
                  {{ row.item.user.full_name }}
                </b-col>
              </b-row>
              <b-row>
                <b-col class="text-sm-right">
                  <b>Date:</b>
                </b-col>
                <b-col cols="8">
                  {{ row.item.date }}
                </b-col>
              </b-row>
              <b-row>
                <b-col class="text-sm-right">
                  <b>Department:</b>
                </b-col>
                <b-col cols="8">
                  {{ row.item.department.name }}
                </b-col>
              </b-row>
              <b-row>
                <b-col class="text-sm-right">
                  <b>Project:</b>
                </b-col>
                <b-col cols="8">
                  {{ row.item.project.name }}
                </b-col>
              </b-row>
              <b-row>
                <b-col class="text-sm-right">
                  <b>Delivery location:</b>
                </b-col>
                <b-col cols="8">
                  {{ row.item.location.name }}
                </b-col>
              </b-row>
              <b-row>
                <b-col class="text-sm-right">
                  <b>Expected delivery date:</b>
                </b-col>
                <b-col cols="8">
                  {{ row.item.expected_delivery }}
                </b-col>
              </b-row>
              <b-row>
                <b-col class="text-sm-right">
                  <b>Remarks/purpose:</b>
                </b-col>
                <b-col cols="8">
                  {{ row.item.remarks }}
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col>
            <b-card>
              <b-row class="header">
                <b-col>
                  Description
                </b-col>
                <b-col>
                  UoM
                </b-col>
                <b-col>
                  Quantity
                </b-col>
              </b-row>
              <b-row v-for="(itm, index) in row.item['requisition_items']" :key="index">
                <b-col>
                  {{ itm.description }}
                </b-col>
                <b-col>
                  {{ itm.unit.name }}
                </b-col>
                <b-col>
                  {{ itm.quantity }}
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </template>

      <template slot="table-caption">
        {{count}} registros
      </template>
    </b-table>

    <b-form-group label="Per page" label-for="perPage" class="per-page">
      <b-form-select v-model="perPage" :options="perPageOptions" />
    </b-form-group>

    <b-pagination :total-rows="count" :per-page="perPage" v-model="currentPage" variant="info" />

    <b-modal id="modal-center" title="Inactivate" v-model="deleteShow" @ok="handleOk" ok-title="Yes. Inactivate" cancel-title="No. Leave it Active" ok-variant="danger" cancel-variant="success">
      <p class="my-4">Are you sure you want to inactivate
        <strong>{{ selectedItem.number }} </strong>?</p>
    </b-modal>
  </b-container>
</template>

<script>
import Store from '../store/store'
import Add from './lib/Add'
const fields = require('./lib/Fields').requisitions
const commonFields = require('./lib/Fields').commonFields
const actions = require('./lib/Fields').actions
const org = require('./lib/Fields').org

export default {
  name: 'Requisitions',
  data() {
    return {
      perPage: 10,
      perPageOptions: [5, 10, 15, 20, 25],
      currentPage: 1,
      filter: null,
      count: 0,
      deleteShow: false,
      selectedItem: {
        name: ''
      },
      fields: fields
    }
  },
  methods: {
    editItem(item) {
      Store.dispatch('ADD_ITEM', item)
      this.$router.push({ name: 'Requisition' })
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
      Store.dispatch('DELETE_REQUISITION', this.selectedItem)
    }
  },
  watch: {
    requisitions() {
      this.count = this.requisitions.rows.length
    },
    results() {
      const results = Store.state.results
      if (results.error) {
        return
      }
      Store.dispatch('LOAD_REQUISITIONS')
    }
  },
  computed: {
    results() {
      return Store.state.results
    },
    isLogged() {
      return Store.state.user.id
    },
    requisitions() {
      return Store.state.requisitions
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: 'Login' })
      return
    }
    Store.dispatch('SET_MENU_OPTION', this.$route.name)
    Store.dispatch('LOAD_PROJECTS')
    Store.dispatch('LOAD_LOCATIONS')
    Store.dispatch('LOAD_DEPARTMENTS')
    Store.dispatch('LOAD_REQUISITIONS')
    if (Store.state.globalAdmin) {
      this.fields.unshift(org)
    }
    this.fields.push(...commonFields)
    this.fields.push(...actions)
  },
  components: {
    Add
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.requisitions {
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
.header {
  font-weight: bold;
  background-color: #e9ecef;
  padding: 6px;
}
.per-page {
  float: right;
}
</style>
