
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
      Store.dispatch("ADD_ITEM", { id: 0 });
      this.$router.push({ name: Store.state.option.slice(0, -1) });
    }
  }
};
</script>
