<template>
  <div class="approval-buttons">
    <b-card>
      <b-form-group horizontal label="Workflow" label-for="workflow_id">
        <b-form-select :options="workflows" required v-bind:style="{ fontSize: fontSize + 'px' }" />
      </b-form-group>
      <b-form-group horizontal label="Coments" label-for="comments">
        <b-form-textarea placeholder="You can add here a comment you would like the other actors of this request's approval process be aware of" rows=4 v-bind:style="{ fontSize: fontSize + 'px' }" />
      </b-form-group>
      <b-button variant="success" v-if="isPR">Launch PR workflow</b-button>
      <b-button variant="success" v-if="isPR">Approve PR</b-button>
      <b-button variant="warning" v-if="isPR">Reject PR</b-button>
      <b-button variant="danger" v-if="isPR">Cancel PR</b-button>
      <b-button variant="info" v-if="isPR">Put PR onhold</b-button>

      <b-button variant="success" v-if="isPO">Launch PO workflow</b-button>
      <b-button variant="success" v-if="isPO">Approve PO</b-button>
      <b-button variant="warning" v-if="isPO">Reject PO</b-button>
      <b-button variant="danger" v-if="isPO">Cancel PO</b-button>
      <b-button variant="info" v-if="isPO">Put PO onhold</b-button>

    </b-card>
  </div>
</template>

<script>
import Store from "./../../store/store";

export default {
  name: "ApprovalButtons",
  props: ["docType"],
  computed: {
    isPR() {
      return this.docType === "PR";
    },
    isPO() {
      return this.docType === "PO";
    },
    fontSize() {
      return Store.state.fontSize;
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
  }
};
</script>

<style scoped>
.approval-buttons {
  margin-bottom: 18px;
}
.approval-buttons button {
  width: 180px;
}
</style>
