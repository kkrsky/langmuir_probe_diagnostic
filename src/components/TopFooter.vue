<template>
  <v-footer id="topFooter" app class="footer-tab-wrapper">
    <v-container class="footer-tab-container">
      <v-row no-gutters>
        <v-col
          class="footer-tab"
          v-for="footerTab in footerTabList"
          :key="footerTab.id"
        >
          <icon-btn-transition v-bind="footerTab"></icon-btn-transition>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import IconBtnTransition from "../components/IconBtnTransition.vue";
export default {
  data() {
    return {
      footerTabList: [
        {
          id: 1,
          title: "home",
          icon: "home",
          goto: "TopHome",
          propItems: {},
          addCss: {},
        },
        {
          id: 2,
          title: "setting",
          icon: "settings",
          goto: "TopSettings",
          propItems: {},
          addCss: {},
        },
        // {
        //   id: 3,
        //   title: "setting",
        //   icon: "settings",
        //   goto: "topSetting",
        //   propItems: {},
        //   addCss: {},
        // },
      ],
    };
  },
  components: {
    IconBtnTransition,
  },
};
</script>

<style lang="scss" scoped>
#topFooter {
  height: $footer-tab-height;
  padding: 0px;
  .footer-tab-container {
    height: $footer-tab-height;
    padding: 0px;
  }
  .footer-tab {
    height: $footer-tab-height;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
