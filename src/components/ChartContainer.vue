<template>
  <!-- <div id="ChartContainer"> -->
  <div id="ChartContainer">
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
          <!-- <div
              :id="'canvas-wrapper-' + file.name"
              class="graph-container"
            ></div> -->
          <create-chart
            :createChart="createChartObj"
            :key="createChartObj.reload"
          ></create-chart>
          <div class="setting-container">
            <v-container class="setting-start-from-container">
              <v-row>
                <v-col>
                  <p>graph: {{ display.currentDisplayGraphName }}</p>
                  <p>
                    {{ file.isatDataObj.diffData_leastLineObj.error.message }}
                  </p>
                  <p>
                    {{ file.isatDataObj.diffData_leastLineObj.a_coord }}
                  </p>

                  <div class="setting-router-container">
                    <v-btn icon color="gray" @click="showNextGraph(-1)">
                      <v-icon>mdi-arrow-left-bold-circle</v-icon>
                    </v-btn>
                    <v-btn icon color="gray" @click="showNextGraph(1)">
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
                </v-col>
                <v-col>
                  <h3>file: {{ file.name }}</h3>
                  <v-btn @click="testChartContainer()">test</v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-checkbox v-model="isEditManual" label="manual">
                  </v-checkbox>
                </v-col>
                <v-col>
                  <v-textarea
                    class="mx-2"
                    label="from"
                    rows="1"
                    v-model="fromLine"
                    prepend-icon="mdi-ray-start"
                    :disabled="!isEditManual"
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    class="mx-2"
                    label="to"
                    rows="1"
                    v-model="toLine"
                    prepend-icon="mdi-ray-end"
                    :disabled="!isEditManual"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div class="result-container">
            <!-- result{{ file.name }} -->
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

            <!-- <div
                :id="'canvas-wrapper-' + file.name + '-scoped'"
                class="graph-container"
              ></div> -->
            <create-chart
              :createChart="createChartObj"
              :key="createChartObj.reload"
            ></create-chart>

            <div class="setting-container">
              <!-- <h3>file: {{ file.name }}</h3> -->
              <p>graph: {{ display.currentDisplayGraphName }}</p>
              <div class="setting-router-container">
                <v-btn icon color="gray" @click="showNextGraph(-1)">
                  <v-icon>mdi-arrow-left-bold-circle</v-icon>
                </v-btn>
                <v-btn icon color="gray" @click="showNextGraph(1)">
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
  </div>
</template>

<script>
// import TopFooter from "@/components/TopFooter.vue";
import TableComponent from "./TableComponent";
import CreateChart from "./CreateChart";

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
      chartType: "scatter",
      fontSize: {
        title: 12,
        axis: 10,
        label: 12,
      },
      axis: {
        y: {
          labelName: "I [mA]",
          stepSize: 10,
          maxSize: null,
          minSize: null,
        },
        x: {
          labelName: "V [V]",
          stepSize: 10,
          maxSize: null,
          minSize: null,
        },
      },
      point: {
        size: 1,
        color: "RGBA(225,95,150, 1)",
        hoverSize: 3,
        pointHitRadius: 2,
      },

      //uppper
      display: {
        currentDisplayGraphName: "VI-parameter",
        displayGraphList: ["VI-parameter", "Log-plot", "test"],
      },
      isEditManual: false,
      emit: {
        from: 0,
        to: 0,
      },
      /**
       * //methods data
       */
      createChartObj: {},
    };
  },
  computed: {
    fromLine: {
      get() {
        return this.$props.file.isatDataObj.diffData_leastLineObj.from;
      },
      set(fromVal) {
        if (isNaN(Number(fromVal))) window.alert("数値を入力してください。");
        else {
          this.$emit("changeFrom", Number(fromVal));
          this.updateChart("hard");
        }
      },
    },
    toLine: {
      get() {
        return this.$props.file.isatDataObj.diffData_leastLineObj.to;
      },
      set(toVal) {
        if (isNaN(Number(toVal))) window.alert("数値を入力してください。");
        else {
          this.$emit("changeTo", Number(toVal));
          this.updateChart("hard");
        }
      },
    },
  },
  methods: {
    testChartContainer() {
      console.log(this.file.isatDataObj);
      // this.updateChart();
      this.showNextGraph(0);
    },
    initChart() {
      let fontSize = this.fontSize;
      let axis = this.axis;
      let point = this.point;
      let chartType = this.chartType;
      let file = this.file;
      let chartName = this.file.name;
      let labelName = this.file.name;
      let setDataArry = this.file.scatterData;
      let createChartObj = {
        data: { file, chartName, labelName, setDataArry },
        setting: {
          fontSize,
          axis,
          point,
          chartType,
        },
        reload: 0, //再描画用,再描画する際にインクリメントする
      };
      // let addChartObj = {
      //   chartName: this.file.name,
      //   labelName: this.file.name,
      //   setDataArry: this.file.scatterData,
      // };
      // this.createCanvasElement(addChartObj);
      // this.createChartVI(addChartObj);
      //   });
      this.createChartObj = createChartObj;
      this.updateChart();
    },
    initDialogGraph() {
      // this.destroyGraph();

      //setting
      let fontSize = this.fontSize;
      let axis = this.axis;
      let point = this.point;
      let chartType = this.chartType;

      //data
      let file = this.file;
      let chartName = this.file.name + "-scoped";
      let labelName = this.file.name + "-scoped";
      let setDataArry = this.file.scatterData;
      let createChartObj = {
        data: { file, chartName, labelName, setDataArry },
        setting: {
          fontSize,
          axis,
          point,
          chartType,
        },
        reload: 0,
      };
      this.createChartObj = createChartObj;
      this.updateChart();
      // window.setTimeout(() => {
      //   let addChartObj = {
      //     chartName: this.file.name + "-scoped",
      //     labelName: this.file.name + "-scoped",
      //     setDataArry: this.file.scatterData,
      //   };
      //   this.createCanvasElement(addChartObj);
      //   this.createChartVI(addChartObj);

      // }, 10);
    },
    initTestGraph() {
      //setting
      let fontSize = this.fontSize;
      let axis = this.axis;
      let point = this.point;
      let chartType = this.chartType;

      //data
      // let file = this.file;
      // let chartName = "test-graph-" + this.file.name;
      // let labelName = "test-graph-" + this.file.name;
      // let setDataArry = this.file.isatDataObj.diffData_scatter;
      // let addLineObj = this.file.isatDataObj.diffData_leastLineObj;
      //create
      let createChartObj = {
        data: {
          file: this.file,
          chartName: "test-graph-" + this.file.name,
          labelName: "test-graph-" + this.file.name,
          setDataArry: this.file.isatDataObj.diffData_scatter,
          addLineObj: this.file.isatDataObj.diffData_leastLineObj,
        },
        setting: {
          fontSize,
          axis,
          point,
          chartType,
        },
        reload: 0,
      };
      this.createChartObj = createChartObj;
      this.updateChart();

      //init
      // this.emit.from = this.file.isatDataObj.diffData_leastLineObj.from;
      // this.emit.to = this.file.isatDataObj.diffData_leastLineObj.to;
      // console.log("init", this.emit.from, this.emit.to, addLineObj);
    },
    updateChart(type) {
      //データを更新した後、グラフを再描画する。
      // console.log("update", this.createChartObj);
      // this.destroyGraph()
      if (type === "hard") {
        //強制アップデート(全て再描画する)
        this.showNextGraph(0);
      } else {
        //簡易アップデート(propで受け取った値をコピーしたものは更新されない)
        window.setTimeout(() => {
          this.createChartObj.reload++;
        }, 1);
      }
    },

    //views
    showNextGraph(num) {
      let { currentDisplayGraphName, displayGraphList } = this.display;
      let currentName_i = displayGraphList.indexOf(currentDisplayGraphName);
      if (currentName_i + num < 0) currentName_i = displayGraphList.length;
      let nextName =
        displayGraphList[(currentName_i + num) % displayGraphList.length];
      this.display.currentDisplayGraphName = nextName;

      if (nextName === "VI-parameter") {
        // this.destroyGraph();
        this.initChart();
      } else if (nextName === "test") {
        // this.destroyGraph();
        this.initTestGraph();
      }
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

    //button actions
    onChangeFromToVal(val) {
      console.log(val);
    },
    //APIs
    //tes2334567
    createChartVI({ chartName, labelName, setDataArry }) {
      //   console.log(chartName, labelName)
      let chartVI_ctx = window.document
        .getElementById("canvas-" + chartName)
        .getContext("2d");
      let chartData = new Chart(chartVI_ctx, {
        type: this.chartType,
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
                  labelString: this.axis.x.labelName,
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
                  labelString: this.axis.y.labelName,
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
  created() {
    this.initChart();
  },
  mounted() {
    // this.initChart();
  },
  components: {
    TableComponent,
    CreateChart,
  },
};
</script>

<style lang="scss" scoped>
#ChartContainer {
  display: block;
  //   height: 100%;
  height: 52vh;
  width: 100%;
  .col {
    margin: 0;
    padding: 0 !important;
    overflow: scroll;
  }
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
