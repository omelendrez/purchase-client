<template>
  <div class="document-status">
    <b-table :items="this.documentStatus" :fields="fields" :show-empty="true" head-variant="light">
    </b-table>
  </div>
</template>

<script>
import Store from '../../store/store'
const fields = require('./Fields').documentStatus

export default {
  name: 'DocumentStatus',
  data() {
    return {
      fields: fields
    }
  },
  computed: {
    documentStatus() {
      return Store.state.documentStatus
    }
  }
}
</script>

<style scoped>
table {
  font-size: small;
}
</style>
