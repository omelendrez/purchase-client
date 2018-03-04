<template>
  <b-container class="home">
    <b-container fluid class="p-4 bg-light">
      <b-row>
        <b-col>
          <b-img thumbnail fluid class="p-4" alt="purchase+" src="../static/img/purchase+.png" />
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

</style>
