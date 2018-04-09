
<template>
  <b-container>
    <h4>Purchase Orders</h4>
    <Table v-bind:table-items="purchaseOrders" form-name="purchase_order_approval" />
  </b-container>
</template>

<script>
import Table from './Table'
import Store from '../../store/store'
const utils = require('./utils')

export default {
  name: 'PurchaseOrders',
  data() {
    return {}
  },
  components: {
    Table
  },
  watch: {
    purchaseOrders() {
      return Store.state.purchaseOrders.rows.map(item => {
        return (item.total_amount = this.formatAmount(item.total_amount))
      })
    }
  },
  computed: {
    purchaseOrders() {
      return Store.state.purchaseOrders
    }
  },
  methods: {
    formatAmount(amount) {
      return utils.formatAmount(amount)
    }
  }
}
</script>
