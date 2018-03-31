
<template>
  <b-container>
    <h4>Requisitions</h4>
    <Table v-bind:table-items="items" form-name="Requisition" />
  </b-container>
</template>

<script>
import Table from './Table'
import Store from './../../store/store'

export default {
  name: 'Requisitions',
  data() {
    return {
      items: {}
    }
  },
  components: {
    Table
  },
  watch: {
    requisitions() {
      if (this.requisitions) {
        this.items = this.requisitions
      }
    }
  },
  computed: {
    requisitions() {
      return Store.state.requisitions
    }
  }
}
</script>
