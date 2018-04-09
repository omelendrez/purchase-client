<template>
  <div class="buttons">
    <b-button type="submit" variant="info" class="save-button">Save</b-button>
    <b-button type="reset" class="to-right" variant="danger">Close</b-button>
  </div>
</template>

<script>
export default {
  name: 'RequestButtons'
}
</script>

<style scoped>
.to-right {
  float: right;
}
.buttons {
  margin: 0 auto;
  margin-bottom: 18px;
}
</style>
