
<template>
  <b-container>
    <h4>Purchase Orders</h4>
    <Table v-bind:table-items="purchaseOrders" form-name="purchase_order_approval" />
  </b-container>
</template>

<script>
import Table from './Table'
import Store from './../../store/store'

export default {
  name: 'PurchaseOrders',
  data() {
    return {}
  },
  components: {
    Table
  },
  computed: {
    purchaseOrders() {
      return Store.state.purchaseOrders
    }
  }
}
</script>
