<template>
  <div id="app">
    <Header />
    <!-- Transition will not be used for this site
    <transition mode="out-in" name="fade">
      <router-view/>
    </transition>
    -->
    <router-view v-bind:style="{ fontSize: fontSize + 'px' }" />
  </div>
</template>

<script>
import Header from "./components/lib/Header";
import Store from "./store/store";

export default {
  name: "App",
  computed: {
    fontSize() {
      return Store.state.fontSize;
    }
  },
  components: {
    Header
  }
};
</script>

<style>
body {
  background-color: rgb(240, 240, 240) !important;
  font-family: "Roboto", sans-serif !important;
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
