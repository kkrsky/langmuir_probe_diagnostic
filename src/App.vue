<template>
  <v-app>
    <loading-container
      :loadingObj="loadingObj"
      :key="loadingObj.isLoading"
    ></loading-container>
    <v-snackbar v-model="isSnackbar" app top :timeout="snackbarObj.timeout">{{
      snackbarObj.message
    }}</v-snackbar>
    <router-view />
  </v-app>
</template>

<script>
import LoadingContainer from "./components/LoadingContainer";
export default {
  name: "App",
  data() {
    return {
      /**
       * //component data
       */
      /**
       * //methods data
       */
    };
  },
  computed: {
    isSnackbar: {
      get() {
        return this.$store.getters["snackbarState/getIsSnackbar"];
      },
      set(bool) {
        this.$store.dispatch("snackbarState/setIsSnackbar", bool);
      },
    },
    snackbarObj: {
      get() {
        return this.$store.getters["snackbarState/getSnackbarObj"];
      },
      // set(val) {
      //   this.$store.dispatch("snackbarState/setMessage", val);
      // },
    },
    loadingObj() {
      return this.$store.getters["main/getLoadingObj"];
    },
  },
  methods: {},
  watch: {},
  beforeCreate() {},
  mounted() {},
  components: {
    LoadingContainer,
  },
};
</script>
<style lang="scss"></style>
