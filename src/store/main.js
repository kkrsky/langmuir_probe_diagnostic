let main = {
  namespaced: true,
  state: () => ({
    chartList: {},
  }),
  getters: {},
  mutations: {},
  actions: {
    setChartList({ state }, { chartName, chartData }) {
      state.chartList[chartName] = chartData;
    },
  },
};

export default main;
