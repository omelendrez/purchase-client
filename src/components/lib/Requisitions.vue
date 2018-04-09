
<template>
  <b-container>
    <h4>Requisitions</h4>
    <Table v-bind:table-items="requisitions" form-name="requisition_approval" />
  </b-container>
</template>

<script>
import Table from './Table'
import Store from '../../store/store'

export default {
  name: 'Requisitions',
  data() {
    return {}
  },
  components: {
    Table
  },
  computed: {
    requisitions() {
      return Store.state.requisitions
    }
  }
}
</script>
