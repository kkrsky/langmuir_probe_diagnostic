<template>
  <!-- <div id="ChartContainer"> -->
  <div id="ChartContainer">
    <div class="each-chart-grid">
      <div class="id-container">{{ file.id }}</div>
      <div :id="'canvas-wrapper-' + file.name" class="graph-container"></div>
      <div class="setting-container">setting{{ file.name }}</div>
      <div class="result-container">
        result{{ file.name }}
        <table-component></table-component>
      </div>
    </div>
  </div>
</template>

<script>
// import TopFooter from "@/components/TopFooter.vue";
import TableComponent from "./TableComponent";

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
      //   console.log(chartName, labelName)
      let chartVI_ctx = window.document
        .getElementById("canvas-" + chartName)
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
      let insertElm = window.document.getElementById(
        "canvas-wrapper-" + chartName
      );
      console.log("insertElm", insertElm);
      //   let newElm = window.document.createElement("div");
      let newElm = window.document.createElement("canvas");
      newElm.className = "canvas-chart";
      newElm.id = "canvas-" + chartName;
      newElm.style.height = "50vh";
      newElm.style.width = "50vh";
      insertElm.appendChild(newElm);
    },
  },
  watch: {},
  beforeCreate() {},
  mounted() {
    this.initChart();
  },
  components: {
    TableComponent,
  },
};
</script>

<style lang="scss" scoped>
#ChartContainer {
  display: block;
  //   height: 100%;
  height: 52vh;
  width: 100%;
  .each-chart-grid {
    height: 100%;
    display: grid;
    border: solid 1px black;
    grid-template:
      "id graph  setting" 50%
      "id graph  result" 50%
      / 2% #{$__graph-height} 1fr;

    .id-container {
      grid-area: id;
      justify-self: center;
      align-self: center;
      // border: solid 1px black;
      // height: 100%;
      // width: 100%;
    }
    .graph-container {
      grid-area: graph;
      justify-self: center;
      align-self: center;
      border: solid 1px black;
      height: 100%;
      width: 100%;
    }
    .result-container {
      grid-area: result;
      justify-self: center;
      align-self: center;
      //   font-size: 40px;
      height: 100%;
      overflow: scroll;
    }
    .setting-container {
      grid-area: setting;
      justify-self: flex-start;
      align-self: center;
      height: 100%;
    }
  }
}
</style>
