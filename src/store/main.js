let main = {
  namespaced: true,
  state: () => ({
    chartList: {},
    loadingObj: {
      isLoading: false,
      message: null,
    },
  }),
  getters: {
    getChartObj: (state) => (chartName) => {
      // console.log("chartName", chartName);
      return state.chartList[chartName];
    },
    getChartObj2: (state) => {
      return state.chartList;
    },
    getLoadingObj: (state) => {
      console.log(state.loadingObj);
      return state.loadingObj;
    },
  },
  mutations: {},
  actions: {
    initChartList({ state }, { chartName, file }) {
      // file = {
      //   id: null,
      //   attribute: null,
      //   name: null,
      //   fileName: null,
      //   rawText: null,
      //   formatText: null,
      //   scatterData: null,
      //   floatVolt: null,
      //   isatDataObj: {
      //     //diff data
      //     diffData_arry: null,
      //     diffData_scatter: null,
      //     diffData_leastLineObj: null,
      //     //isat data
      //     isatData_arry: null,
      //     isatData_scatter: null,
      //     isatData_leastLineObj: null,
      //     isat: null,
      //   },
      //   chartData: null, //chart obj
      // };
      file.chartData = null; //chart obj
      state.chartList[chartName] = {};
      // state.chartList[chartName] = file; //fileオブジェクトにChartオブジェクトが挿入されてしまう
    },
    setChartList({ state }, { chartName, chartData }) {
      if (state.chartList[chartName])
        state.chartList[chartName]["chartData"] = chartData;
      else {
        state.chartList[chartName] = {};
        state.chartList[chartName]["chartData"] = chartData;
      }
    },
    setFromToAuto({ state }, { chartName, from_auto, to_auto }) {
      state.chartList[chartName]["chartData"];
    },
    loadingHandler({ state }, { type, message }) {
      console.log("set", type, message);
      switch (type) {
        case "start": {
          state.loadingObj.isLoading = true;
          state.loadingObj.message = message;
          break;
        }
        case "end": {
          state.loadingObj.isLoading = false;
          break;
        }
      }
    },
  },
};

export default main;
