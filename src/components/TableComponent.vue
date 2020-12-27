<template>
  <div id="TableComponent">
    <vue-good-table :columns="columns" :rows="rows" />
  </div>
</template>

<script>
// import TopFooter from "@/components/TopFooter.vue";
// import { VueGoodTable } from "vue-good-table";
export default {
  data() {
    return {
      /**
       * //component data
       */
      columns: [
        {
          label: "Iis(fit) [mA]",
          field: "Iis_fit",
          type: "number",
          html: true,
        },
        {
          label: "Ies(calc) [mA]",
          field: "Ies_calc",
        },
        {
          label: "Te [eV]",
          field: "Te",
          type: "number",
        },
        {
          label: " Ne(Iis)[cm-3]",
          field: "Ne_Iis",
          type: "number",
        },
        {
          label: "Ne(Ies)[cm-3]",
          field: "Ne_Ies",
          type: "number",
        },

        {
          label: "Vf [V]",
          field: "Vf",
          type: "number",
        },
        {
          label: "Vf [V]",
          field: "Vs_calc",
          type: "number",
        },
      ],
      rows: [
        {
          Iis_fit: 1,
          Ies_calc: 0.03343,
          Te: 20,
          Ne_Iis: 0.03343,
          Ne_Ies: 0.03343,
          Vf: 0.03343,
          Vs_calc: 0.03343,
        },
      ],

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

<style lang="scss">
#TableComponent {
  width: 100%;
}
</style>
