//内部jsライブラリ読み込み
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ChartJS from "chart.js";

//cssライブラリ読み込み
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

//ライブラリ宣言
Vue.config.productionTip = false;
window.Chart = ChartJS;
// Vue.mixin(tes);

//Vue初期化
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
