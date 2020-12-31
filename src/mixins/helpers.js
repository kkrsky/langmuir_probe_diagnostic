let helpers = {
  data() {
    return {
      helper: {
        //connector,API呼び出し部分
        //return val
        _cp: this._cp,
        //void
        snackFire: this.snackFire,
        db: {
          store: this.storeItem,
          get: this.getItem,
          delete: this.deleteItem,
          getKeyList: this.getItemKeyList,
          isExist: this.isItemExist,
        },
      },
    };
  },
  computed: {},
  methods: {
    //return val
    _cp(obj) {
      /**
       * @param {Object,Array} obj ディープコピー
       * undefinedの場合もコピーできるように対応
       */
      if (Array.isArray(obj)) {
        let includeFunction = obj.find((item) => {
          return typeof item === "function";
        });
        if (includeFunction) {
          console.error("関数型の配列はコピーできません。");
          return false;
        } else {
          const currentState = window.history.state;
          window.history.replaceState(obj, null);

          const clone = window.history.state;
          window.history.replaceState(currentState, null);
          return clone;
        }
      } else {
        let keys = Object.keys(obj);
        let includeFunction = keys.find((key) => {
          return typeof obj[key] === "function";
        });

        if (includeFunction) {
          console.error("関数型のオブジェクトはコピーできません。");
          return false;
        } else {
          const currentState = window.history.state;
          window.history.replaceState(obj, null);

          const clone = window.history.state;
          window.history.replaceState(currentState, null);
          return clone;
        }
      }
    },
    //void
    snackFire({ message, timeout }) {
      this.$store.dispatch("snackbarState/fire", {
        message: message,
        timeout: timeout ? timeout : null,
      });
    },

    //db
    storeItem(key, item) {
      window.localStorage.setItem(key, JSON.stringify(item));
    },
    getItem(key) {
      return JSON.parse(window.localStorage.getItem(key));
    },
    deleteItem(key) {
      window.localStorage.removeItem(key);
    },
    getItemKeyList() {
      let except = [
        "USER_ID",
        "USESR_ID",
        "loglevel:webpack-dev-server",
        "weblioObjFlg",
      ];
      return Object.keys(window.localStorage).filter((key) => {
        if (except.indexOf(key) !== -1) {
          return false;
        } else {
          return true;
        }
      });
    },
    isItemExist(key) {
      let list = this.getItemKeyList();
      if (list.indexOf(key) === -1) return false;
      else return true;
    },
  },
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {},
  components: {},
};

export default helpers;
