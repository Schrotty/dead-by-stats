<template>
  <div id="app">
    <Topbar />
    <Statistics />
  </div>
</template>
<script>

import Topbar from "@/components/Topbar";
import Statistics from "@/components/Statistics";
export default {
  name: 'App',
  components: {
    Statistics,
    Topbar
  }
}
</script>

<style lang="scss">
@import "assets/variables";
@import "assets/utils";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
