
<template>
  <b-container>
    <h4>Purchase Orders</h4>
    <Table v-bind:table-items="items" form-name="PurchaseOrder"/>
  </b-container>
</template>

<script>
import Table from "./Table";
import Store from "./../../store/store";

export default {
  name: "PurchaseOrders",
  data() {
    return {
      items: {}
    };
  },
  components: {
    Table
  },
  watch: {
    purchaseOrders() {
      if (this.purchaseOrders) {
        this.items = this.purchaseOrders;
      }
    }
  },
  computed: {
    purchaseOrders() {
      return Store.state.purchaseOrders;
    }
  }
};
</script>
