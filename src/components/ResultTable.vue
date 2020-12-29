<template>
  <div id="ResultTable">
    <v-container>
      <v-row>
        <v-col v-for="key in Object.keys(result)" :key="key" cols="3">
          <span>{{ key }}: </span><span>{{ result[key] }}</span>
        </v-col>
      </v-row>
      <v-btn @click="test()">test</v-btn>
    </v-container>
  </div>
</template>

<script>
// import TopFooter from "@/components/TopFooter.vue";

export default {
  props: {
    result: {
      type: Object,
      default: {
        Iis_fit: 0,
        Ies_calc: 0,
        Te: 0,
        Ne_Iis: 0,
        Ne_Ies: 0,
        Vf: 0,
        Vs_calc: 0,
      },
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
  methods: {
    test() {
      console.log(this.result);
      console.log(this.result.Iis_fit.toString());
    },
  },
  watch: {},
  beforeCreate() {},
  mounted() {},
  components: {},
};
</script>

<style lang="scss">
#ResultTable {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    padding: 0;
  }
}
</style>
