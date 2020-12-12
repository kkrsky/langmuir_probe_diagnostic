<template>
  <div>
    <v-navigation-drawer app :right="true">
      <!-- -->
      <p>drawer</p>
    </v-navigation-drawer>

    <v-main>
      <p>main</p>
      <!-- Provides the application the proper gutter -->
      <p>this is tes dev</p>

      <v-container>
        <p>container</p>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "App",

  components: {},
  mounted() {},

  data: () => ({
    //
    left: {
      id: 1,
      title: "tes",
      icon: "settings",
      goto: "topHome",
      propItems: "",
      addCss: {},
    },
  }),
};
</script>
<style lang="scss"></style>
