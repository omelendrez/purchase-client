<template>
  <b-container class="home">
    <b-container fluid class="p-4 bg-light">
      <b-row>
        <b-col>
          <b-card bg-variant="dark" text-variant="light" header="Welcome to purchase+">
            <p class="card-text">
              <strong>purchase+</strong> is an automated procurement system that will help your organization simplify, organize and control your procurement activities.
            </p>
            <p>
              Most procurement processes leave a lot of room for inefficiencies to arise, as well as the potential for missed savings and cash leakage. An automated purchasing process can help facilitate the procurement of goods and services by speeding up communication, reducing time for approvals and eliminating the unnecessary paperwork.
            </p>
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
