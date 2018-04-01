<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/lib/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
body {
  background-color: rgb(240, 240, 240) !important;
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
