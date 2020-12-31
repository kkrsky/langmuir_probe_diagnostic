<template>
  <div
    :id="'canvas-wrapper-' + createChart.data.chartName"
    class="graph-container"
  ></div>
</template>

<script>
// import TopFooter from "@/components/TopFooter.vue";

export default {
  props: {
    // files: {
    //   type: Array,
    // },
    createChart: {
      type: Object,
    },
  },
  data() {
    return {
      /**
       * //component data
       */
      /**
       * //methods data
       */
      currentChart: null,
    };
  },
  computed: {},
  methods: {
    initChart() {
      this.createCanvasElement(this.createChart.data);
      this.createChartVI(this.createChart.data);
    },
    createCanvasElement({ chartName }) {
      //div#"canvas-wrapper-" + chartNameに<canvas>を作成

      let insertElm = window.document.getElementById(
        "canvas-wrapper-" + chartName
      );
      let isScoped = false;
      if (chartName.split("-scoped").length > 1) {
        isScoped = true;
      }
      let newElm = window.document.createElement("canvas");
      newElm.className = "canvas-chart";
      newElm.id = "canvas-" + chartName;
      if (isScoped) {
        newElm.style.height = "10%";
        newElm.style.width = "10%";
      } else {
        newElm.style.height = "50vh";
        newElm.style.width = "50vh";
      }
      // console.log("insertElm", insertElm, chartName, newElm);
      // console.log(JSON.parse(JSON.stringify(this.createChart)));
      insertElm.appendChild(newElm);
    },
    createChartVI({ chartName, labelName, setDataArry, addLineObj }) {
      //canvas#"canvas-" + chartNameにグラフを描画
      let datasets = [
        {
          label: labelName,
          data: setDataArry,
          backgroundColor: this.createChart.setting.point.color,
          pointRadius: this.createChart.setting.point.size,
          pointHoverRadius: this.createChart.setting.point.hoverSize,
          pointHitRadius: this.createChart.setting.point.pointHitRadius,
        },
      ];

      if (addLineObj !== undefined) {
        let addDatasetLineObj = {
          label: "least square method line",
          data: addLineObj.lineData_scatter,
          backgroundColor: "RGBA(255,255,255, 0)",
          borderColor: "rgba(0,0,0,1)",
          pointRadius: 2,
          pointStyle: "circle",
          // pointBackgroundColor: "RGBA(0,0,0, 1)",
          pointHoverRadius: this.createChart.setting.point.hoverSize,
          pointHitRadius: this.createChart.setting.point.pointHitRadius,
          tension: 0,
          showLine: true,
          fill: false,
          borderWidth: 1,
        };
        // console.log(addLine);
        datasets.push(addDatasetLineObj);
      }
      //   console.log(chartName, labelName)
      let chartVI_ctx = window.document
        .getElementById("canvas-" + chartName)
        .getContext("2d");
      let chartData = new Chart(chartVI_ctx, {
        type: this.createChart.setting.chartType,
        data: {
          datasets: datasets,
        },
        options: {
          legend: {
            labels: {
              fontSize: this.createChart.setting.fontSize.label,
            },
          },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: this.createChart.setting.axis.x.labelName,
                  fontSize: this.createChart.setting.fontSize.title,
                },
                ticks: {
                  fontSize: this.createChart.setting.fontSize.axis,
                  suggestedMin: this.createChart.setting.axis.x.maxSize,
                  suggestedMax: this.createChart.setting.axis.x.minSize,
                  stepSize: this.createChart.setting.axis.x.stepSize,
                  // callback: function(value, index, values) {
                  //   return value + "点";
                  // },
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: this.createChart.setting.axis.y.labelName,
                  fontSize: this.createChart.setting.fontSize.title,
                },
                ticks: {
                  fontSize: this.createChart.setting.fontSize.axis,
                  suggestedMin: this.createChart.setting.axis.y.maxSize,
                  suggestedMax: this.createChart.setting.axis.y.minSize,
                  stepSize: this.createChart.setting.axis.y.stepSize,
                  // callback: function(value, index, values) {
                  //   return value + "点";
                  // },
                },
              },
            ],
          },

          tooltips: {
            mode: "nearest",
            intersect: true,
            caretPadding: 30,
            caretSize: 10,
            callbacks: {
              title: (tooltipItem, chart) => {
                return tooltipItem[0].index + 1;
              },
            },
          },
          maintainAspectRatio: true,
          responsive: true,
        },
      });
      this.currentChart = chartData;
      this.$store.dispatch("main/setChartList", { chartName, chartData });
    },
  },
  watch: {},
  beforeCreate() {},
  mounted() {
    this.initChart();
  },
  components: {},
};
</script>

<style lang="scss"></style>
