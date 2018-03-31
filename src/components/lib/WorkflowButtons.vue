<template>
  <div class="button">
    <b-button size="sm" @click="saveSelected" variant="primary">Save</b-button>
  </div>
</template>

<script>
import Store from '../../store/store'
export default {
  name: 'WorkflowButtons',
  props: ['options', 'userType', 'workflowId'],
  methods: {
    saveSelected(e) {
      e.preventDefault()
      let payload = {
        workflow_id: this.workflowId,
        user_type: this.userType
      }
      Store.dispatch('DELETE_WORKFLOW_USER', payload)
      for (let i = 0; i < this.options.length; i++) {
        const userId = this.options[i]
        if (userId) {
          payload = {
            user_id: userId,
            workflow_id: this.workflowId,
            user_type: this.userType
          }
          Store.dispatch('SAVE_WORKFLOW_USER', payload)
        }
      }
    },
    undoSelected() {}
  }
}
</script>

<style scoped>
.button {
  margin-top: 16px;
}
</style>
