<template>
  <div id="app">
    <Header />
    <!-- Transition will not be used for this site
    <transition mode="out-in" name="fade">
      <router-view/>
    </transition>
    -->
    <router-view/>
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
}
body {
  background-color: rgb(240, 240, 240);
}
/*  To be used with fade transition
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
*/
</style>
