<template>
  <div>
    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Type here for a quick search" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>
    <b-table fixed hover small :items="tableItems.rows" :fields="fields" :filter="filter" outlined :show-empty="true" :per-page="perPage" :current-page="currentPage" head-variant="light">
      <template slot="number" slot-scope="row">
        <b-link size="sm" @click.stop="info(row.item, row.index, $event.target)">
          {{row.item.number}}
        </b-link>
      </template>
    </b-table>
    <b-pagination :total-rows="tableItems.count" :per-page="perPage" v-model="currentPage" variant="info" />
  </div>
</template>

<script>
import Store from './../../store/store'
const org = require('./Fields').org

export default {
  name: 'Table',
  props: {
    tableItems: {
      type: Object,
      required: true
    },
    formName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      fields: [
        {
          key: 'number',
          class: 'text-center'
        },
        {
          key: 'date',
          class: 'text-center text-nowrap'
        },
        {
          key: 'user.full_name',
          label: 'Requester',
          sortable: true,
          class: 'text-left'
        },
        {
          key: 'workflow_status_name',
          label: 'Status',
          class: 'text-center'
        }
      ]
    }
  },
  methods: {
    info(item) {
      Store.dispatch('ADD_ITEM', item)
      this.$nextTick(() => {
        this.$router.push({ name: this.formName })
      })
    }
  },
  created() {
    if (Store.state.globalAdmin) {
      this.fields.unshift(org)
    }
  }
}
</script>

<style scoped>

</style>
