<template>
  <div class="approval-buttons">
    <b-form-group horizontal label="Workflow" label-for="workflow_id">
      <b-form-select :options="workflows" :disabled="!canEdit" v-model="workflow_id" />
    </b-form-group>
    <b-form-group horizontal label="Remarks" label-for="remarks" v-if="status!==6">
      <b-form-textarea id="remarks" placeholder="Remarks are mandatory when changing document status" v-model="remarks" rows=4 />
    </b-form-group>
    <div class="buttons" v-if="userIs([1, 3])">
      <b-button variant="primary" v-if="status===0 && workflow_id !== 0" @click="launch">Launch workflow</b-button>
      <b-button variant="primary" v-if="(status===3 || status===4) && workflow_id !== 0" @click="launch">Re-submit</b-button>
      <b-button variant="danger" v-if="status===0  || status===4" @click="cancel">Cancel</b-button>
      <b-button variant="info" v-if="status===0 || status===4" @click="putOnHold">Put onhold</b-button>
    </div>
    <div class="buttons" v-if="userIs([2, 4])">
      <b-button variant="success" v-if="status===1  || status===5" @click="approve">Approve</b-button>
      <b-button variant="warning" v-if="status===1  || status===5" @click="requestChanges">Request changes</b-button>
      <b-button variant="info" v-if="status===1  || status===5" @click="reassign">Re-assign</b-button>
    </div>
    <b-alert variant="danger" :show="errorShow">{{ errorMessage }}</b-alert>
  </div>
</template>

<script>
import Store from './../../store/store'

export default {
  name: 'ApprovalButtons',
  data() {
    return {
      workflow_id: 0,
      remarks: '',
      errorShow: false,
      errorMessage: ''
    }
  },
  props: ['docType'],
  computed: {
    userWorkflows() {
      return Store.state.userWorkflows
    },
    userPermissions() {
      return Store.state.user.permissions
    },
    canEdit() {
      return this.status === 0 || this.status === 3 || this.status === 4
    },
    userId() {
      return Store.state.user.id
    },
    document() {
      return Store.state.document
    },
    status() {
      return Store.state.document.workflow_status
    },
    workflows() {
      const workflows = Store.state.activeWorkflows
      if (!workflows) {
        return
      }
      const options = []
      for (let i = 0; i < workflows.length; i++) {
        if (
          workflows[i].organization_id === this.document.organization_id
        ) {
          options.push({
            value: workflows[i].id,
            text: workflows[i].name
          })
        }
      }
      return options
    }
  },
  methods: {
    userIs(perms) {
      const uwfs = this.userWorkflows.rows
      if (!uwfs) {
        return
      }
      const userPermissions = uwfs.filter(item => {
        return (
          item.workflow_id === this.document.workflow_id ||
          this.document.workflow_id === 0
        )
      })
      return perms.find(reqPerm => {
        return userPermissions.find(userPerm => {
          return userPerm.user_type === reqPerm
        })
      })
    },
    clearRemarks() {
      this.remarks = ''
    },
    textOk() {
      if (!this.remarks.length) {
        this.errorMessage = 'You must enter a remark'
        this.errorShow = true
        return false
      } else {
        this.errorShow = false
        this.errorMessage = ''
        return true
      }
    },
    launch(e) {
      e.preventDefault()
      if (!this.textOk()) {
        return
      }
      const data = {
        workflow_id: this.workflow_id,
        document_id: this.document.id,
        user_id: this.userId,
        document_type: this.docType === 'PR' ? 1 : 2,
        remarks: this.remarks,
        document_status: 1
      }
      Store.dispatch('SAVE_DOCUMENT_STATUS', data)
      this.clearRemarks()
    },
    cancel(e) {
      e.preventDefault()
      if (!this.textOk()) {
        return
      }
      const data = {
        document_id: this.document.id,
        user_id: this.userId,
        document_type: this.docType === 'PR' ? 1 : 2,
        remarks: this.remarks,
        document_status: 2
      }
      Store.dispatch('SAVE_DOCUMENT_STATUS', data)
      this.clearRemarks()
    },
    putOnHold(e) {
      e.preventDefault()
      if (!this.textOk()) {
        return
      }
      const data = {
        document_id: this.document.id,
        user_id: this.userId,
        document_type: this.docType === 'PR' ? 1 : 2,
        remarks: this.remarks,
        document_status: 3
      }
      Store.dispatch('SAVE_DOCUMENT_STATUS', data)
      this.clearRemarks()
    },
    requestChanges(e) {
      e.preventDefault()
      if (!this.textOk()) {
        return
      }
      const data = {
        document_id: this.document.id,
        user_id: this.userId,
        document_type: this.docType === 'PR' ? 1 : 2,
        remarks: this.remarks,
        document_status: 4
      }
      Store.dispatch('SAVE_DOCUMENT_STATUS', data)
      this.clearRemarks()
    },
    reassign(e) {
      e.preventDefault()
      if (!this.textOk()) {
        return
      }
      const data = {
        document_id: this.document.id,
        user_id: this.userId,
        document_type: this.docType === 'PR' ? 1 : 2,
        remarks: this.remarks,
        document_status: 5
      }
      Store.dispatch('SAVE_DOCUMENT_STATUS', data)
      this.clearRemarks()
    },
    approve(e) {
      e.preventDefault()
      if (!this.textOk()) {
        return
      }
      const data = {
        document_id: this.document.id,
        user_id: this.userId,
        document_type: this.docType === 'PR' ? 1 : 2,
        remarks: this.remarks,
        document_status: 6
      }
      Store.dispatch('SAVE_DOCUMENT_STATUS', data)
      this.clearRemarks()
    }
  },
  created() {
    this.workflow_id = this.document.workflow_id
  }
}
</script>

<style scoped>
.approval-buttons {
  margin-bottom: 18px;
}
.approval-buttons button {
  width: 153px;
  margin-bottom: 4px;
}

.alert {
  margin-top: 16px;
}
</style>
