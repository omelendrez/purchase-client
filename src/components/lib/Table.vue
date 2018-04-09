<template>
  <div>
    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Type here for a quick search" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>
    <b-table fixed hover striped small :items="tableItems.rows" :fields="fields" :filter="filter" outlined :show-empty="true" :per-page="perPage" :current-page="currentPage" head-variant="light">
      <template slot="number" slot-scope="row">
        <b-link size="sm" @click.stop="info(row.item, row.index, $event.target)">
          {{row.item.number}}
        </b-link>
      </template>
    </b-table>
    <b-form-group label="Per page" label-for="perPage" class="per-page">
      <b-form-select v-model="perPage" :options="perPageOptions" />
    </b-form-group>
    <b-pagination :total-rows="tableItems.rows.length" :per-page="perPage" v-model="currentPage" variant="info" />
  </div>
</template>

<script>
import Store from './../../store/store'
const org = require('./Fields').org

export default {
  name: 'Table',
  props: {
    tableItems: {
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
      perPageOptions: [5, 10, 15, 20, 25],
      currentPage: 1,
      filter: null,
      fields: [
        {
          key: 'number',
          class: 'text-center',
          thStyle: {
            width: '60px'
          }
        },
        {
          key: 'date',
          class: 'text-center text-nowrap',
          thStyle: {
            width: '60px'
          }
        },
        {
          key: 'user.full_name',
          label: 'Requester',
          class: 'text-left',
          thStyle: {
            width: '200px'
          }
        },
        {
          key: 'workflow_status_name',
          label: 'Status',
          class: 'text-center',
          thStyle: {
            width: '90px'
          }
        }
      ]
    }
  },
  methods: {
    info(item) {
      this.$nextTick(() => {
        this.$router.push({ path: `${this.formName}/${item.id}` })
      })
    }
  },
  created() {
    if (Store.state.globalAdmin) {
      this.fields.unshift(org)
    }
    if (this.formName === 'purchase_order_approval') {
      this.fields.push({
        key: 'total_amount',
        label: 'Total order',
        class: 'text-right',
        thStyle: {
          width: '140px'
        }
      })
    }
  }
}
</script>

<style scoped>
.per-page {
  float: right;
}
</style>
