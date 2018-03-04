<template>
  <div id="app">
    <Header />
    <transition mode="out-in" name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Header from "./components/lib/Header";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style>
html {
  font-family: Roboto, "Open Sans", sans-serif;
  font-size: 90%;
}
body {
  background-color: rgb(240, 240, 240);
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
