<template>
  <div>
    <b-form-group class="filter-form">
      <b-input-group>
        <b-form-input v-model="filter" placeholder="Type here for a quick search" />
        <b-btn :disabled="!filter" @click="filter = ''" variant="info" class="reset-button">Reset</b-btn>
      </b-input-group>
    </b-form-group>
    <b-table small fixed hover :items="tableItems.rows" :fields="fields" :filter="filter"  outlined :show-empty="true" :per-page="perPage" :current-page="currentPage" head-variant="light">
    </b-table>
    <b-pagination :total-rows="tableItems.count" :per-page="perPage" v-model="currentPage" variant="info" />
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    tableItems: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      filter: null,
      fields: [
        {
          key: "number",
          class: "text-center",
          sortable: true
        },
        {
          key: "date",
          class: "text-center text-nowrap"
        },
        {
          key: "user.full_name",
          label: "Requester",
          sortable: true
        },
        {
          key: "workflow_status_name",
          label: "Status",
          class: "text-center"
        },
        {
          label: "Created",
          key: "created_at",
          class: "text-center text-nowrap"
        },
        {
          label: "Updated",
          key: "updated_at",
          class: "text-center text-nowrap"
        }
      ]
    };
  }
};
</script>

<style scoped>

</style>
