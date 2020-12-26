<template>
  <!-- <div id="ChartContainer"> -->
  <div id="ChartContainer">
    <v-row justify="center">
      <v-dialog
        v-model="isShowDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <!-- ------------- -->
          <!-- normal viewer -->
          <!-- ------------- -->
          <div class="each-chart-grid">
            <div class="id-container">{{ file.id }}</div>
            <div
              :id="'canvas-wrapper-' + file.name"
              class="graph-container"
            ></div>
            <div class="setting-container">
              <h3>file: {{ file.name }}</h3>
              <p>graph: {{ display.currentDisplayGraphName }}</p>
              <div class="setting-router-container">
                <v-btn icon color="gray" @click="showNextGraph()">
                  <v-icon>mdi-arrow-left-bold-circle</v-icon>
                </v-btn>
                <v-btn icon color="gray" @click="showNextGraph()">
                  <v-icon>mdi-arrow-right-bold-circle</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="gray"
                  @click="initDialogGraph()"
                  v-if="file.attribute === 'normal'"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-arrow-top-right-bottom-left-bold</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="gray"
                  @click="destroyGraph()"
                  v-if="file.attribute === 'scoped'"
                >
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="result-container">
              result{{ file.name }}
              <table-component></table-component>
            </div>
          </div>
          <!-- ------------- -->
          <!-- normal viewer -->
          <!-- ------------- -->
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <!-- <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn> -->
            <v-toolbar-title>[scoped] {{ file.name }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="destroyGraph()">
                Done
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <!-- ------------- -->
          <!-- dialog viewer -->
          <!-- ------------- -->
          <div id="DialogView">
            <div class="each-chart-grid">
              <div class="id-container">{{ file.id }}</div>

              <div
                :id="'canvas-wrapper-' + file.name + '-scoped'"
                class="graph-container"
              ></div>
              <div class="setting-container">
                <!-- <h3>file: {{ file.name }}</h3> -->
                <p>graph: {{ display.currentDisplayGraphName }}</p>
                <div class="setting-router-container">
                  <v-btn icon color="gray" @click="showNextGraph()">
                    <v-icon>mdi-arrow-left-bold-circle</v-icon>
                  </v-btn>
                  <v-btn icon color="gray" @click="showNextGraph()">
                    <v-icon>mdi-arrow-right-bold-circle</v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="result-container">
                result{{ file.name }}
                <table-component></table-component>
              </div>
            </div>
          </div>
          <!-- ------------- -->
          <!-- end dialog viewer -->
          <!-- ------------- -->
        </v-card>
      </v-dialog>
    </v-row>
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
      isShowDialog: false,
      currentChart: null,
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
        pointHitRadius: 2,
      },
      display: {
        currentDisplayGraphName: "VI-parameter",
        displayGraphList: ["VI-parameter", "Log-plot"],
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
      // console.log("in afiles:", this.file);
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
    initDialogGraph() {
      // this.destroyGraph();
      window.setTimeout(() => {
        let addChartObj = {
          chartName: this.file.name + "-scoped",
          labelName: this.file.name + "-scoped",
          setDataArry: this.file.scatterData,
        };
        this.createCanvasElement(addChartObj);
        this.createChartVI(addChartObj);
      }, 10);
    },
    //views
    showNextGraph() {
      let { currentDisplayGraphName, displayGraphList } = this.display;
      let currentName_i = displayGraphList.indexOf(currentDisplayGraphName);
      let nextName =
        displayGraphList[(currentName_i + 1) % displayGraphList.length];
      this.display.currentDisplayGraphName = nextName;
    },
    showScopeGraph() {
      let cpFile = JSON.parse(JSON.stringify(this.file));
      // this.$emit("show-scope-graph", cpFile);
    },
    destroyGraph() {
      // this.$emit("destroy");
      this.isShowDialog = false;
      this.currentChart.destroy();
      console.log("canvas-" + this.file.name + "-scoped");
      const element = document.getElementById(
        "canvas-" + this.file.name + "-scoped"
      );
      element.remove();
    },
    //APIs
    //tes
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
              pointHitRadius: this.point.pointHitRadius,
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
          tooltips: {
            mode: "nearest",
            intersect: true,
            caretPadding: 30,
            caretSize: 10,
            callbacks: {
              title: (tooltipItem, chart) => {
                // console.log(
                //   "tooltipItem",
                //   tooltipItem,
                //   chart,
                //   tooltipItem[0].index
                // );

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
      // console.log(isChartObj, isChartLabel);
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
      let isScoped = false;
      // console.log(chartName.split("-scoped").length, chartName);
      if (chartName.split("-scoped").length > 1) {
        isScoped = true;
      }
      // console.log("insertElm", insertElm, chartName);
      //   let newElm = window.document.createElement("div");
      let newElm = window.document.createElement("canvas");
      newElm.className = "canvas-chart";
      newElm.id = "canvas-" + chartName;
      if (isScoped) {
        //
        newElm.style.height = "10%";
        // newElm.style.height = "50vw";
        newElm.style.width = "10%";
        // newElm.style.width = "50vw";
        // newElm.style.overflow = "hidden";
      } else {
        newElm.style.height = "50vh";
        newElm.style.width = "50vh";
      }

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
      // "id router setting" 10%
      "id graph  setting" 50%
      "id graph  result" 50%
      / 2% #{$__graph-height} 1fr;

    // .router-container {
    //   // grid-area: router;
    //   // z-index: 2;
    //   position: absolute;
    //   .router-item {
    //     z-index: 0;
    //     position: absolute;
    //     left: 10%;
    //     // transform: translateX(-50%);
    //   }

    // border-left: solid 1px black;
    // border-right: solid 1px black;
    // border: solid 1px black;
    //   height: 52vh;
    //   width: calc(2% + #{$__graph-height});
    // }
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
      z-index: 5;
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
      width: 100%;

      .setting-router-container {
        width: 100%;
      }
    }
  }
}
#DialogView {
  display: block;
  //   height: 100%;
  height: 90vh;
  width: 100%;
  .each-chart-grid {
    height: 100%;
    display: grid;
    border: solid 1px black;
    grid-template:
      // "id router setting" 10%
      "id graph  setting" 50%
      "id graph  result" 50%
      / 2% 60% 38%;

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
      z-index: 5;
      .canvas-chart {
        display: none !important;
      }
      canvas {
        // background-color: red;
        display: none !important;
      }
    }
    .result-container {
      grid-area: result;
      justify-self: center;
      align-self: center;
      //   font-size: 40px;
      height: 100%;
      width: 100%;
      overflow: scroll;
      border-left: solid 1px black;
    }
    .setting-container {
      grid-area: setting;
      justify-self: flex-start;
      align-self: center;
      height: 100%;
      width: 100%;
      border-left: solid 1px black;

      .setting-router-container {
        width: 100%;
      }
    }
  }
}
</style>
