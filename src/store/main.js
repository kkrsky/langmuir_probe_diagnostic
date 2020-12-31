let main = {
  namespaced: true,
  state: () => ({
    chartList: {},
  }),
  getters: {
    getChartObj: (state) => (chartName) => {
      console.log("chartName", chartName);
      return state.chartList[chartName];
    },
    getChartObj2: (state) => {
      return state.chartList;
    },
  },
  mutations: {},
  actions: {
    setChartList({ state }, { chartName, chartData }) {
      state.chartList[chartName] = chartData;
    },
  },
};

export default main;
