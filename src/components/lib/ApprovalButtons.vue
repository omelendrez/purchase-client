<template>
  <div class="approval-buttons">
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
  </div>
</template>

<script>
export default {
  name: "ApprovalButtons",
  props: ["docType"],
  computed: {
    isPR() {
      return this.docType === "PR";
    },
    isPO() {
      return this.docType === "PO";
    }
  }
};
</script>

<style scoped>
.approval-buttons {
  margin: 0 auto;
  margin: 18px;
}
.approval-buttons button {
  margin: 6px;
  width: 200px;
}
</style>
