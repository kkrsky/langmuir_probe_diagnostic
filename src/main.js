//内部jsライブラリ読み込み
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

//cssライブラリ読み込み
import "vuetify/dist/vuetify.min.css";

//ライブラリ宣言
Vue.config.productionTip = false;
// Vue.mixin(tes);

//Vue初期化
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
