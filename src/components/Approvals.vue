<template>
  <b-container class="approvals" fluid>
    <h3 class="text-center">
      <i class="fas fa-users"></i>
      Approvals
    </h3>
    <div class="w-100 main">
      <div class="text-center">
        <Requisitions />
      </div>
      <div class="text-center">
        <PurchaseOrders />
      </div>
    </div>
  </b-container>
</template>

<script>
import Store from "./../store/store";
import Requisitions from "./lib/Requisitions";
import PurchaseOrders from "./lib/PurchaseOrders";

export default {
  name: "Approvals",
  computed: {
    isLogged() {
      return Store.state.user.id;
    }
  },
  components: {
    Requisitions,
    PurchaseOrders
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return;
    }
    Store.dispatch("SET_MENU_OPTION", this.$route.name);
    Store.dispatch("LOAD_REQUISITIONS");
    Store.dispatch("LOAD_PURCHASE_ORDERS");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.approvals {
  background-color: white;
  padding-bottom: 20px;
  padding-top: 20px;
}
.main {
  display: flex;
  justify-content: space-between;
}
</style>
