<template>
  <v-container id="LoadingContainer" v-show="loadingObj.isLoading">
    <!-- <v-container id="LoadingContainer"> -->
    <v-row class="circular">
      <v-col>
        <v-progress-circular indeterminate />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="message" v-show="loadingObj.message">
          {{ loadingObj.message }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import TopFooter from "@/components/TopFooter.vue";

export default {
  props: {
    loadingObj: {
      type: Object,
    },
  },
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
  computed: {},
  methods: {},
  watch: {},
  beforeCreate() {},
  mounted() {},
  components: {},
};
</script>

<style lang="scss" scoped>
#LoadingContainer {
  // display: flex;

  width: 100%;
  height: 100vh;
  z-index: 9999;
  position: fixed;
  background-color: rgba(#000, 0.5);
  .circular {
    padding-top: 30vh;
  }
  .col {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .v-progress-circular {
    height: 20vw !important;
    width: 20vw !important;
  }
  .message {
    font-size: 3rem;
  }
}
</style>
