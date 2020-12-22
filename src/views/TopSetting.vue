<template>
  <div>
    <h3>初期条件設定</h3>
    <v-text-field
      v-model="areaOfProbe"
      label="Area of probe [cm^2]"
      outlined
      clearable
    ></v-text-field>
    <v-select
      value="Ar"
      :items="gasType"
      label="Gas Type"
      outlined
      @change="onChangeGasType"
    ></v-select>
    <v-text-field
      v-model="gasTypeMassSelect"
      label="Mass of Atom [kg]"
      outlined
      :readonly="!isOtherGasType"
    ></v-text-field>
  </div>
</template>

<script>
// import TopFooter from "@/components/TopFooter.vue";

export default {
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

<style lang="scss"></style>
