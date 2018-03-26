<template>
  <div class="approval-buttons">
    <b-card>

      <b-form-group horizontal label="Workflow" label-for="workflow_id">
        <b-form-select :options="workflows" v-model="workflow_id" required v-bind:style="{ fontSize: fontSize + 'px' }" />
      </b-form-group>

      <b-form-group horizontal label="Coments" label-for="comments">
        <b-form-textarea placeholder="You can add here a comment you would like the other actors of this request's approval process be aware of" rows=4 v-bind:style="{ fontSize: fontSize + 'px' }" />
      </b-form-group>

      <b-button variant="primary" :disabled="workflow_id === 0" @click="launch">Launch workflow</b-button>
      <b-button variant="danger" v-if="document.workflow_status===0" @click="cancel">Cancel</b-button>
      <b-button variant="info" v-if="document.workflow_status===0" @click="putOnHold">Put onhold</b-button>
      <b-button variant="info" v-if="document.workflow_status===1" @click="reassign">Re-assign</b-button>
      <b-button variant="warning" v-if="document.workflow_status===1" @click="requestChanges">Request changes</b-button>
      <b-button variant="success" v-if="document.workflow_status===1" @click="approve">Approve</b-button>

    </b-card>
  </div>
</template>

<script>
import Store from "./../../store/store";

export default {
  name: "ApprovalButtons",
  data() {
    return {
      workflow_id: 0
    };
  },
  props: ["docType", "docId"],
  computed: {
    userId() {
      return Store.state.user.id;
    },
    fontSize() {
      return Store.state.fontSize;
    },
    document() {
      return Store.state.record;
    },
    workflows() {
      const workflows = Store.state.activeWorkflows;
      if (!workflows) {
        return;
      }
      const options = [];
      for (let i = 0; i < workflows.length; i++) {
        if (
          workflows[i].organization_id === Store.state.user.organization_id ||
          Store.state.globalAdmin
        ) {
          options.push({
            value: workflows[i].id,
            text: workflows[i].name
          });
        }
      }
      return options;
    }
  },
  methods: {
    launch(e) {
      e.preventDefault();
      const data = {
        document_id: this.document.id,
        user_id: this.userId,
        document_type: this.docType === "PR" ? 1 : 2,
        document_status: 1
      };
      Store.dispatch("SAVE_DOCUMENT_STATUS", data);
    },
    cancel(e) {
      e.preventDefault();
      const data = {
        document_id: this.document.id,
        user_id: this.userId,
        document_type: this.docType === "PR" ? 1 : 2,
        document_status: 2
      };
      Store.dispatch("SAVE_DOCUMENT_STATUS", data);
    },
    putOnHold(e) {
      e.preventDefault();
      const data = {
        document_id: this.document.id,
        user_id: this.userId,
        document_type: this.docType === "PR" ? 1 : 2,
        document_status: 3
      };
      Store.dispatch("SAVE_DOCUMENT_STATUS", data);
    },
    requestChanges(e) {
      e.preventDefault();
      const data = {
        document_id: this.document.id,
        user_id: this.userId,
        document_type: this.docType === "PR" ? 1 : 2,
        document_status: 4
      };
      Store.dispatch("SAVE_DOCUMENT_STATUS", data);
    },
    reassign(e) {
      e.preventDefault();
      const data = {
        document_id: this.document.id,
        user_id: this.userId,
        document_type: this.docType === "PR" ? 1 : 2,
        document_status: 5
      };
      Store.dispatch("SAVE_DOCUMENT_STATUS", data);
    },
    approve(e) {
      e.preventDefault();
      const data = {
        document_id: this.document.id,
        user_id: this.userId,
        document_type: this.docType === "PR" ? 1 : 2,
        document_status: 6
      };
      Store.dispatch("SAVE_DOCUMENT_STATUS", data);
    }
  }
};
</script>

<style scoped>
.approval-buttons {
  margin-bottom: 18px;
}
.approval-buttons button {
  width: 153px;
}
</style>
