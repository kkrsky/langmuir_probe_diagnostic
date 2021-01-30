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
    createChartVI({
      chartName,
      labelName,
      setDataArry,
      addLineObj,
      addLineObj_Isat,
      addLineObj_Te,
      addGraphDataArry,
      addDot,
      chartOptions,
    }) {
      //canvas#"canvas-" + chartNameにグラフを描画
      if (chartOptions) {
        let { axis } = chartOptions;
        this.createChart.axis = axis;
      }

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

      if (addGraphDataArry !== undefined) {
        let addGraphDataArry_detaset = {
          label: "log(Ie)",
          data: addGraphDataArry,
          backgroundColor: "RGBA(0,255,255, 1)",
          borderColor: "rgba(0,255,255,1)",
          pointRadius: 1,
          // pointStyle: "circle",
          // pointBackgroundColor: "RGBA(0,0,0, 1)",
          pointHoverRadius: this.createChart.setting.point.hoverSize,
          pointHitRadius: this.createChart.setting.point.pointHitRadius,
          showLine: false,
          fill: false,
          // borderWidth: 1,
        };
        datasets.unshift(addGraphDataArry_detaset);
      }

      let generateRotArry = (type, a_coord) => {
        let rotArry = [];
        let hideRot = null;
        switch (type) {
          case "Isat": {
            hideRot = 90 - (Math.atan2(1, Math.abs(a_coord)) * 180) / Math.PI;

            break;
          }
          case "Te": {
            hideRot = -(Math.atan2(1, Math.abs(a_coord)) * 180) / Math.PI;

            break;
          }
        }
        // console.log("hideRot", hideRot, a_coord);
        // dataArry.forEach((dot, i) => {
        //   if (i === 0 || i === dataArry.length - 1) rotArry.push(hideRot);
        //   else rotArry.push(null);
        // });
        return [hideRot, null, null, hideRot];
      };
      let generatePointStyleArry = (dataArry) => {
        let pointStyleArry = [];

        // dataArry.forEach((dot, i) => {
        //   if (i === 0 || i === dataArry.length - 1) pointStyleArry.push("line");
        //   else pointStyleArry.push("circle");
        // });
        return ["line", "circle", "circle", "line"];
        // return ["line", "circle", "circle", "line"];
      };

      if (addLineObj !== undefined) {
        let addDatasetLineObj = {
          label: "least square method line",
          data: addLineObj.lineData_scatter,
          backgroundColor: "RGBA(0,0,0,1)",
          borderColor: "rgba(0,0,0, 1)",
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
        datasets.unshift(addDatasetLineObj);
      }

      if (addLineObj_Te !== undefined) {
        let addDatasetLineObj = {
          label: "LSM line(Te)",
          data: addLineObj_Te.lineData_scatter,
          backgroundColor: "RGBA(255,0,255, 1)",
          borderColor: "rgba(255,0,255, 1)",
          pointRadius: 2,
          rotation: generateRotArry("Te", addLineObj_Te.a_coord),
          pointStyle: generatePointStyleArry(),
          // pointBackgroundColor: "RGBA(0,0,0, 1)",
          pointHoverRadius: this.createChart.setting.point.hoverSize,
          pointHitRadius: this.createChart.setting.point.pointHitRadius,
          tension: 0,
          showLine: true,
          fill: false,
          borderWidth: 1,
        };
        // console.log(addLine);
        datasets.unshift(addDatasetLineObj);
      }
      if (addLineObj_Isat !== undefined) {
        let addDatasetLineObj = {
          label: "LSM line(Isat)",
          data: addLineObj_Isat.lineData_scatter,
          backgroundColor: "RGBA(225,95,150,1)",
          borderColor: "rgba(225,95,150,1)",
          pointRadius: 2,
          rotation: generateRotArry("Isat", addLineObj_Isat.a_coord),
          pointStyle: generatePointStyleArry(),
          // pointBackgroundColor: "RGBA(0,0,0, 1)",
          pointHoverRadius: this.createChart.setting.point.hoverSize,
          pointHitRadius: this.createChart.setting.point.pointHitRadius,
          tension: 0,
          showLine: true,
          fill: false,
          borderWidth: 1,
        };
        // console.log(addLine);
        datasets.unshift(addDatasetLineObj);
      }
      if (addDot !== undefined) {
        let addDotObj = {
          label: "Dot",
          data: addDot,
          // backgroundColor: "RGBA(200,0,0, 1)",
          borderColor: "rgba(200,0,0, 1)",
          pointRadius: 4,
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
        datasets.unshift(addDotObj);
      }
      let xAxes_here = null;
      let yAxes_here = null;
      if (false) {
        xAxes_here = {
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
        };

        yAxes_here = {
          scaleLabel: {
            display: true,
            labelString: this.createChart.setting.axis.y.labelName,
            fontSize: this.createChart.setting.fontSize.title,
          },
          ticks: {
            fontSize: this.createChart.setting.fontSize.axis,
            min: 1,
            max: -1,
            stepSize: 0.5,
            // callback: function(value, index, values) {
            //   return value + "点";
            // },
          },
        };
      } else {
        xAxes_here = {
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
        };

        yAxes_here = {
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
        };
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
            xAxes: [xAxes_here],
            yAxes: [yAxes_here],
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
          animation: false,
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
