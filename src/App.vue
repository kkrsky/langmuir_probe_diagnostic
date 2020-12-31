<template>
  <v-app>
    <v-snackbar v-model="isSnackbar" app top :timeout="snackbarObj.timeout">{{
      snackbarObj.message
    }}</v-snackbar>
    <router-view />
  </v-app>
</template>

<script>
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
  },
  methods: {},
  watch: {},
  beforeCreate() {},
  mounted() {},
  components: {},
};
</script>
<style lang="scss"></style>
