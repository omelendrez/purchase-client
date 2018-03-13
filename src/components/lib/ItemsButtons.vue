<template>
  <div class="itemsButtons">
    <b-button type="reset" class="to-right" variant="danger">Close</b-button>
  </div>
</template>

<script>
export default {
  name: "ItemsButtons"
};
</script>

<style scoped>
.to-right {
  float: right;
}
.itemsButtons {
  margin: 0 auto;
  margin-bottom: 18px;
}
.itemsButtons button {
  margin-bottom: 18px;
}
</style>
