<template>
  <div id="app">
    <Header />
    <router-view v-bind:style="{ fontSize: fontSize + 'px' }" />
  </div>
</template>

<script>
import Header from "./components/lib/Header";
import Store from "./store/store";

export default {
  name: "App",
  computed: {
    fontSize() {
      return Store.state.fontSize;
    }
  },
  components: {
    Header
  }
};
</script>

<style>
body {
  background-color: rgb(240, 240, 240) !important;
  font-family: "Roboto", sans-serif !important;
}
.table-inactive {
  color: red;
}
.table-selected {
  background-color: #f5f3ee;
}
table.b-table.b-table-stacked > tbody > tr > [data-label] {
  grid-template-columns: 10% auto !important;
}

div.custom-checkbox {
  display: block;
  margin-bottom: 6px;
}
</style>
