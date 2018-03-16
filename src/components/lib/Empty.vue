<template>
  <div>
  </div>
</template>

<script>
import Store from "./../../store/store";
export default {
  name: "Empty",
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
    }
  }
};
</script>
