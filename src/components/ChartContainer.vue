<template>
  <div id="ChartContainer">
    <div id="canvas-wrapper"></div>
  </div>
</template>

<script>
// import TopFooter from "@/components/TopFooter.vue";

export default {
  props: {
    // files: {
    //   type: Array,
    // },
    file: {
      type: Object,
    },
  },
  data() {
    return {
      /**
       * //component data
       */
      fontSize: {
        title: 12,
        axis: 10,
        label: 12,
      },
      axis: {
        y: {
          stepSize: 10,
          maxSize: null,
          minSize: null,
        },
        x: {
          stepSize: 10,
          maxSize: null,
          minSize: null,
        },
      },
      point: {
        size: 1,
        color: "RGBA(225,95,150, 1)",
        hoverSize: 5,
      },
      /**
       * //methods data
       */
    };
  },
  computed: {},
  methods: {
    initChart() {
      //   console.log("in afiles:", this.files);
      console.log("in afiles:", this.file);
      //   this.files.forEach((file) => {
      //   let addChartObj = {
      //     chartName: file.name,
      //     labelName: file.name,
      //     setDataArry: file.scatterData,
      //   };
      let addChartObj = {
        chartName: this.file.name,
        labelName: this.file.name,
        setDataArry: this.file.scatterData,
      };
      this.createCanvasElement(addChartObj);
      this.createChartVI(addChartObj);
      //   });
    },
    //APIs
    createChartVI({ chartName, labelName, setDataArry }) {
      console.log(chartName, labelName);
      let chartVI_ctx = window.document
        .getElementById(chartName)
        .getContext("2d");
      let chartData = new Chart(chartVI_ctx, {
        type: "scatter",
        data: {
          datasets: [
            {
              label: labelName,
              data: setDataArry,
              backgroundColor: this.point.color,
              pointRadius: this.point.size,
              pointHoverRadius: this.point.hoverSize,
            },
            // {
            //   label: "label2",
            //   data: [
            //     { x: 0, y: 1 },
            //     { x: 0, y: 1 },
            //   ],
            //   backgroundColor: "RGBA(225,95,150, 1)",
            // },
          ],
        },
        options: {
          //   title: {
          //     display: true,
          //     text: "V-I characteristics",
          //     fontSize: this.fontSize.title,
          //   },
          legend: {
            labels: {
              fontSize: this.fontSize.label,
            },
          },
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "V [V]",
                  fontSize: this.fontSize.title,
                },
                ticks: {
                  fontSize: this.fontSize.axis,
                  suggestedMin: this.axis.x.maxSize,
                  suggestedMax: this.axis.x.minSize,
                  stepSize: this.axis.x.stepSize,
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
                  labelString: "I [mA]",
                  fontSize: this.fontSize.title,
                },
                ticks: {
                  fontSize: this.fontSize.axis,
                  suggestedMin: this.axis.y.maxSize,
                  suggestedMax: this.axis.y.minSize,
                  stepSize: this.axis.y.stepSize,
                  // callback: function(value, index, values) {
                  //   return value + "点";
                  // },
                },
              },
            ],
          },
          horizontalLine: [
            {
              y: 0,
              style: "rgba(0,0,0,1)",
              text: "tes",
            },
          ],
          maintainAspectRatio: true,
          responsive: true,
        },
      });

      this.$store.dispatch("main/setChartList", { chartName, chartData });
    },

    addChartArryData({ chartName, labelName, setDataArry }) {
      let chartObj = this.chartList[chartName];
      let isChartObj = chartObj !== undefined;
      let isChartLabel = false;
      if (isChartObj) {
        isChartLabel =
          chartObj.data.datasets.find((dataset) => {
            return dataset.label === labelName;
          }) !== undefined;
      }
      console.log(isChartObj, isChartLabel);
      if (isChartObj && isChartLabel) {
        setDataArry.forEach((setData) => {
          chartObj.data.datasets.forEach((dataset) => {
            dataset.data.push(setData);
          });
        });
        chartObj.update();
      }
    },
    createCanvasElement({ chartName }) {
      let insertElm = window.document.getElementById("canvas-wrapper");
      //   console.log(insertElm);
      //   let newElm = window.document.createElement("div");
      let newElm = window.document.createElement("canvas");
      newElm.className = chartName;
      newElm.id = chartName;
      insertElm.appendChild(newElm);
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

<style lang="scss">
#ChartContainer {
  display: block;
  height: 100%;
  #canvas-wrapper {
    * {
      height: $__graph-height !important;
      width: 50vh !important;
      //   height: 50vh !important;
    }
  }
}
</style>
