<template>
  <v-app class="gp-full-height">
    <Header />
    <router-view />
    <Footer />
  </v-app>
</template>

<script>
import Header from "./pages/Header.vue";
import Footer from "./pages/Footer.vue";

export default {
  name: "App",

  components: {
    Header,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped lang="scss">
.gp-full-height ::v-deep .v-application--wrap {
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
}
</style>
