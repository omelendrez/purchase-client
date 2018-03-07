
<template>
  <div class="add-button">
    <b-button @click="addItem" variant="primary" title="Add">Add new record</b-button>
  </div>
</template>

<script>
import Store from "../../store/store";

export default {
  name: "Add",
  methods: {
    addItem() {
      Store.dispatch("ADD_ITEM", { id: 0, name: "" });
      this.$router.push({ name: this.option });
    }
  },
  computed: {
    option() {
      let option = Store.state.option.substring(1).slice(0, -1);
      option = `${option.charAt(0).toUpperCase()}${option
        .slice(1)
        .toLowerCase()}`;
      return option;
    }
  }
};
</script>
