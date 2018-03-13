<template>
  <b-container class="home">
    <b-container fluid class="p-4 bg-light">
      <b-row>
        <b-col>
          <b-card bg-variant="dark" text-variant="light" header="Welcome to purchase+">
            <p class="card-text">
              <span class="fa-layers fa-fw fa-3x">
                <i class="fas fa-bookmark"></i>
                <i class="fa-inverse fas fa-heart" data-fa-transform="shrink-10 up-2" style="color:Tomato"></i>
              </span>
              <strong>purchase+</strong> is an automated procurement system that will help your organization simplify, organize and control your procurement activities.
            </p>
            <p>
              Businesses handle creating and monitoring purchase requisitions and purchase orders in many ways, but the most efficient is having an electronic system that integrates easily with other financial systems. Businesses that use sophisticated electronic systems instead of relying on Excel and email to create, share, and track these documents enjoy a significant reduction in costs, greater control over company spend, and more streamlined processes, and more. Regardless of the process used, purchase requisitions and purchase orders are a critical part of spend management. Not only do they help with managing costs and inventory, they help businesses avoid duplicate or missing orders, clarify important details, stay protected against financial audits, and protect both purchasers and vendors. </p>
          </b-card>
        </b-col>
        <b-col>
          <b-img class="p-4" center alt="purchase+" src="../static/img/purchase+.png" />
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import Store from "../store/store";

export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    isLogged() {
      return Store.state.user.id;
    }
  },
  created() {
    if (!this.isLogged) {
      this.$router.push({ name: "Login" });
      return false;
    }
    Store.dispatch("SET_MENU_OPTION", this.$route.path);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  margin-top: 18px;
}
</style>
