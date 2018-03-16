<template>
  <div class="buttons">
    <b-button type="submit" variant="info">Save</b-button>
    <b-button type="reset" variant="danger" class="to-right">Close</b-button>
  </div>
</template>

<script>
export default {
  name: "Buttons"
};
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
