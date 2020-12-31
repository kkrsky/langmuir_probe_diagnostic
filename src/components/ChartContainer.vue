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
            :createChart="display.currentDisplayGraphObj"
            :key="display.currentDisplayGraphObj.reload"
          ></create-chart>
          <div class="setting-container">
            <v-container class="setting-start-from-container">
              <v-row>
                <v-col>
                  <p>graph: {{ display.currentDisplayGraphObj.graphType }}</p>
                  <p v-if="currentData.addLineObj">
                    <!-- {{ file.isatDataObj.diffData_leastLineObj.error.message }} -->
                    <!-- {{ currentData.addLineObj }} -->
                    <!-- {{ currentData.addLineObj.error.message }} -->
                  </p>
                  <p v-if="currentData.addLineObj">
                    <!-- {{ file.isatDataObj.diffData_leastLineObj.a_coord }} -->
                    {{ currentData.addLineObj.a_coord }}
                  </p>

                  <div class="setting-router-container">
                    <v-btn icon color="gray" @click="showNextGraph(-1)">
                      <v-icon>mdi-arrow-left-bold-circle</v-icon>
                    </v-btn>
                    <v-btn icon color="gray" @click="showNextGraph(1)">
                      <v-icon>mdi-arrow-right-bold-circle</v-icon>
                    </v-btn>
                    <!-- <v-btn
                      icon
                      color="gray"
                      @click="initDialogGraph({ graphType: 'V-Ip [scoped]' })"
                      v-if="file.attribute === 'normal'"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-arrow-top-right-bottom-left-bold</v-icon>
                    </v-btn> -->
                  </div>
                </v-col>
                <v-col>
                  <h3>file: {{ file.name }}</h3>
                  <v-btn @click="testChartContainer()">test</v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-checkbox
                    @click="onAutoLine"
                    v-model="isAutoLine"
                    label="Auto"
                  >
                  </v-checkbox>
                </v-col>
                <v-col>
                  <v-textarea
                    class="mx-2"
                    label="from"
                    rows="1"
                    v-model.lazy="fromLine"
                    prepend-icon="mdi-ray-start"
                    :disabled="isAutoLine"
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    class="mx-2"
                    label="to"
                    rows="1"
                    v-model.lazy="toLine"
                    prepend-icon="mdi-ray-end"
                    :disabled="isAutoLine"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div class="result-container">
            <!-- result{{ file.name }} -->
            <!-- <table-component></table-component> -->
            <result-table :result="resultObj"></result-table>
          </div>
        </div>
        <!-- ------------- -->
        <!-- /normal viewer -->
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
            <v-btn
              dark
              text
              @click="
                destroyGraph({
                  chartName: display.scopedDisplayGraphObj.data.chartName,
                })
              "
            >
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
              :createChart="display.scopedDisplayGraphObj"
              :key="display.scopedDisplayGraphObj.reload"
            ></create-chart>

            <div class="setting-container">
              <!-- <h3>file: {{ file.name }}</h3> -->
              <p>graph: {{ display.scopedDisplayGraphObj.graphType }}</p>
              <div class="setting-router-container">
                <v-btn icon color="gray" @click="showNextGraph(-1)">
                  <v-icon>mdi-arrow-left-bold-circle</v-icon>
                </v-btn>
                <v-btn icon color="gray" @click="showNextGraph(1)">
                  <v-icon>mdi-arrow-right-bold-circle</v-icon>
                </v-btn>
                <v-btn @click="testChartContainer()">test</v-btn>
              </div>
            </div>
            <div class="result-container">
              <!-- result{{ file.name }} -->
              <result-table :result="resultObj"></result-table>

              <!-- <table-component></table-component> -->
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
import ResultTable from "./ResultTable";
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
        _templateObj: {
          graphType: "template",
          data: {
            file: {
              id: null,
              attribute: null,
              name: null,
              fileName: null,
              rawText: null,
              formatText: null,
              scatterData: null,
              floatVolt: null,
              isatDataObj: {
                //diff data
                diffData_arry: null,
                diffData_scatter: null,
                diffData_leastLineObj: null,
                //isat data
                isatData_arry: null,
                isatData_scatter: null,
                isatData_leastLineObj: null,
                isat: null,
              },
            },
            chartName: null,
            labelName: null,
            setDataArry: null,
          },
          setting: {
            fontSize: null,
            axis: null,
            point: null,
            chartType: null,
          },
          reload: 0, //再描画用,再描画する際にインクリメントする
        },
        scopedDisplayGraphObj: { graphType: "scoped" },
        currentDisplayGraphObj: {
          graphType: "V-Ip",
          data: {},
        },
        displayGraphListObj: {
          V_Ip: { graphType: "V-Ip" },
          V_LogIe: { graphType: "V-Log(Ie)" },
          n_dIisdVp: { graphType: "n-dIis/dVp" },
          V_Iis: { graphType: "V-Iis" },
          test: { graphType: "test" },
        },

        // displayGraphListObj: ["V-Ip", "V-Log(Ie)", "n-dIis/dVp", "V-Iis", "test"],
      },
      isAutoLine: true,

      resultObj: {
        Iis_fit: 1,
        Ies_calc: 0.03343,
        Te: 20,
        Ne_Iis: 0.03343,
        Ne_Ies: 0.03343,
        Vf: 0.03343,
        Vs_calc: 0.03343,
      },
      /**
       * //methods data
       */
      createChartObj: {
        graphType: null,
        data: {
          file: null,
          chartName: null,
          labelName: null,
          setDataArry: null,
        },
        setting: {
          fontSize: null,
          axis: null,
          point: null,
          chartType: null,
        },
        reload: 0, //再描画用,再描画する際にインクリメントする
      },
    };
  },
  computed: {
    currentData() {
      // console.log(this.display.currentDisplayGraphObj.data);
      return this.display.currentDisplayGraphObj.data;
    },
    fromLine: {
      get() {
        switch (this.display.currentDisplayGraphObj.graphType) {
          case this.display.displayGraphListObj.V_Ip.graphType: {
            //"V-Ip",
            break;
          }
          case this.display.displayGraphListObj.V_LogIe.graphType: {
            // "V-Log(Ie)",
            break;
          }
          case this.display.displayGraphListObj.n_dIisdVp.graphType: {
            return this.$props.file.isatDataObj.diffData_leastLineObj.from;
            //"n-dIis/dVp",
            break;
          }
          case this.display.displayGraphListObj.V_Iis.graphType: {
            return this.$props.file.isatDataObj.isatData_leastLineObj.from;
            //"V-Iis",
            // return this.$props.file.isatDataObj.isatData_leastLineObj.from;
            break;
          }
          case this.display.displayGraphListObj.test.graphType: {
            //"test"
            // return this.$props.file.isatDataObj.diffData_leastLineObj.from;
            break;
          }
        }
      },
      set(fromVal) {
        let fromOld = this.$props.file.isatDataObj.diffData_leastLineObj.from;
        let toOld = this.$props.file.isatDataObj.diffData_leastLineObj.to;
        if (isNaN(Number(fromVal))) {
          window.alert("数値を入力してください。");
          fromVal = fromOld;
        } else {
          fromVal = Number(fromVal);
        }
        if (fromVal > toOld) {
          window.alert("fromはtoよりも小さい値を入力して下さい。");
          fromVal = fromOld;
        }

        //create object
        let setObj = {
          changeValue: fromVal,
          displayGraphListObj: this.display.displayGraphListObj,
          currentDisplayGraphObj: this.display.currentDisplayGraphObj,
        };
        this.$emit("changeFrom", setObj);
        this.updateChart("hard");
      },
    },
    toLine: {
      get() {
        switch (this.display.currentDisplayGraphObj.graphType) {
          case this.display.displayGraphListObj.V_Ip.graphType: {
            //"V-Ip",
            break;
          }
          case this.display.displayGraphListObj.V_LogIe.graphType: {
            // "V-Log(Ie)",
            break;
          }
          case this.display.displayGraphListObj.n_dIisdVp.graphType: {
            //"n-dIis/dVp",
            return this.$props.file.isatDataObj.diffData_leastLineObj.to;

            break;
          }
          case this.display.displayGraphListObj.V_Iis.graphType: {
            //"V-Iis",
            return this.$props.file.isatDataObj.isatData_leastLineObj.to;

            // return this.$props.file.isatDataObj.isatData_leastLineObj.to;
            break;
          }
          case this.display.displayGraphListObj.test.graphType: {
            //"test"
            // return this.$props.file.isatDataObj.diffData_leastLineObj.to;

            break;
          }
        }
      },
      set(toVal) {
        let fromOld = this.$props.file.isatDataObj.diffData_leastLineObj.from;
        let toOld = this.$props.file.isatDataObj.diffData_leastLineObj.to;
        let dataLength = this.$props.file.isatDataObj.diffData_arry.length;

        if (isNaN(Number(toVal))) {
          window.alert("数値を入力してください。");
          toVal = toOld;
        } else {
          toVal = Number(toVal);
        }
        if (fromOld > toVal) {
          window.alert("toはfromよりも小さい値を入力して下さい。");
          toVal = toOld;
        } else if (toVal > dataLength) {
          window.alert(
            "最大データ数(" + dataLength + ") 以下の値を入力して下さい。"
          );
          toVal = toOld;
        }
        let setObj = {
          changeValue: toVal,
          displayGraphListObj: this.display.displayGraphListObj,
          currentDisplayGraphObj: this.display.currentDisplayGraphObj,
        };
        this.$emit("changeTo", setObj);
        this.updateChart("hard");
      },
    },
  },
  methods: {
    testChartContainer() {
      // console.log(this.file.isatDataObj);
      // console.log(this.display);
      // console.log("chartList", this.$store.state.main.chartList);
      // this.updateChart();
      // this.updateChart();
      // this.showNextGraph(0);
      // this.helper.snackFire({ message: "hello" });
      // console.log(this.helper);
      // console.log(this.$store.state.snackbarState);
      // this.helper.db.store("test", { tes: "testObj" });
      let res = this.helper.db.getKeyList();
      console.log(this.helper.db);
      console.log(res);
    },
    initDialogGraph({ graphType }) {
      // this.destroyGraph();
      let createChartObj = {
        graphType,
        data: {
          file: this.file,
          chartName: this.file.name + "-scoped",
          labelName: this.file.name + "-scoped",
          setDataArry: this.file.scatterData,
        },
        setting: {
          fontSize: this.fontSize,
          axis: this.axis,
          point: this.point,
          chartType: this.chartType,
        },
        reload: 0, //再描画用,再描画する際にインクリメントする
      };

      // this.createChartObj = createChartObj;
      this.display.scopedDisplayGraphObj = createChartObj;
      // this.display.currentDisplayGraphObj = createChartObj;
      // this.updateChart();
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
    initGraph_V_Ip({ graphType }) {
      let createChartObj = {
        graphType,
        data: {
          file: this.file,
          chartName: this.file.name,
          labelName: this.file.name,
          setDataArry: this.file.scatterData,
        },
        setting: {
          fontSize: this.fontSize,
          axis: this.axis,
          point: this.point,
          chartType: this.chartType,
        },
        reload: 0, //再描画用,再描画する際にインクリメントする
      };

      // this.createChartObj = createChartObj;
      this.display.currentDisplayGraphObj = createChartObj;
      this.display.displayGraphListObj.V_Ip = createChartObj;
      // console.log("createChartObj", createChartObj);
      this.updateChart();
      return createChartObj;
    },
    initGraph_V_LogIe({ graphType }) {
      let createChartObj = {
        graphType,
        // data: {
        //   file: this.file,
        //   chartName: this.file.name,
        //   labelName: this.file.name,
        //   setDataArry: this.file.isatDataObj.diffData_scatter,
        //   addLineObj: this.file.isatDataObj.diffData_leastLineObj,
        // },
        // setting: {
        //   fontSize: this.fontSize,
        //   axis: this.axis,
        //   point: this.point,
        //   chartType: this.chartType,
        // },
        reload: 0,
      };
      this.display.currentDisplayGraphObj = createChartObj;
      this.updateChart();
    },
    initGraph_n_dIisdVp({ graphType }) {
      let createChartObj = {
        graphType,
        data: {
          file: this.file,
          chartName: "n_dIisdVp-graph-" + this.file.name,
          labelName: "n_dIisdVp-graph-" + this.file.name,
          setDataArry: this.file.isatDataObj.diffData_scatter,
          addLineObj: this.file.isatDataObj.diffData_leastLineObj,
        },
        setting: {
          fontSize: this.fontSize,
          axis: this.axis,
          point: this.point,
          chartType: this.chartType,
        },
        reload: 0,
      };
      // this.createChartObj = createChartObj;
      this.display.currentDisplayGraphObj = createChartObj;
      this.display.displayGraphListObj.test = createChartObj;
      this.updateChart();
    },
    initGraph_V_Iis({ graphType }) {
      let createChartObj = {
        graphType,
        data: {
          file: this.file,
          chartName: "V_Iis-graph" + this.file.name,
          labelName: "V_Iis-graph" + this.file.name,
          setDataArry: this.file.isatDataObj.isatData_scatter,
          addLineObj: this.file.isatDataObj.isatData_leastLineObj,
        },
        setting: {
          fontSize: this.fontSize,
          axis: this.axis,
          point: this.point,
          chartType: this.chartType,
        },
        reload: 0,
      };
      this.display.currentDisplayGraphObj = createChartObj;
      this.updateChart();
    },
    initTestGraph({ graphType }) {
      //setting
      let createChartObj = {
        graphType,
        // data: {
        //   file: this.file,
        //   chartName: this.file.name,
        //   labelName: this.file.name,
        //   setDataArry: this.file.isatDataObj.diffData_scatter,
        //   addLineObj: this.file.isatDataObj.diffData_leastLineObj,
        // },
        // setting: {
        //   fontSize: this.fontSize,
        //   axis: this.axis,
        //   point: this.point,
        //   chartType: this.chartType,
        // },
        reload: 0,
      };
      // this.createChartObj = createChartObj;
      this.display.currentDisplayGraphObj = createChartObj;
      this.display.displayGraphListObj.test = createChartObj;
      this.updateChart();
      return createChartObj;
    },

    //views
    showNextGraph(num) {
      //init
      let { currentDisplayGraphObj, displayGraphListObj } = this.display;
      console.log("current", currentDisplayGraphObj.graphType);
      //current index
      let graphKeyArry = Object.keys(displayGraphListObj);
      let currentName_i = 1;
      for (const [index, graphKey] of graphKeyArry.entries()) {
        if (
          displayGraphListObj[graphKey].graphType ===
          currentDisplayGraphObj.graphType
        ) {
          currentName_i = index;
          break;
        }
      }

      //next index
      if (currentName_i + num < 0) currentName_i = graphKeyArry.length;
      let nextGraphObjKey =
        graphKeyArry[(currentName_i + num) % graphKeyArry.length];
      let nextGraphObj = displayGraphListObj[nextGraphObjKey];
      // this.display.currentDisplayGraphObj = nextGraphObj;

      //insert data
      let graphType_next = nextGraphObj.graphType;
      console.log("next", graphType_next);
      switch (graphType_next) {
        case displayGraphListObj.V_Ip.graphType: {
          this.initGraph_V_Ip({ graphType: graphType_next });
          // console.log("updated", this.display.currentDisplayGraphObj);
          break;
        }
        case this.display.displayGraphListObj.V_LogIe.graphType: {
          // "V-Log(Ie)",
          this.initGraph_V_LogIe({ graphType: graphType_next });
          break;
        }
        case this.display.displayGraphListObj.n_dIisdVp.graphType: {
          //"n-dIis/dVp",
          this.initGraph_n_dIisdVp({ graphType: graphType_next });

          break;
        }
        case this.display.displayGraphListObj.V_Iis.graphType: {
          //"V-Iis",
          this.initGraph_V_Iis({ graphType: graphType_next });

          break;
        }
        case displayGraphListObj.test.graphType: {
          this.initTestGraph({ graphType: graphType_next });

          break;
        }
      }
    },
    showScopeGraph() {
      let cpFile = JSON.parse(JSON.stringify(this.file));
      // this.$emit("show-scope-graph", cpFile);
    },
    destroyGraph({ chartName }) {
      // this.$emit("destroy");
      this.isShowDialog = false;
      let currentChart = this.$store.getters["main/getChartObj2"][chartName];
      currentChart.destroy();
      // this.currentChart.destroy();
      // this.display.scopedDisplayGraphObj.destroy();

      const element = document.getElementById("canvas-" + chartName);
      // console.log("element", element);
      element.remove();
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
          this.display.currentDisplayGraphObj.reload++;
          // this.createChartObj.reload++;
        }, 1);
      }
    },

    //button actions
    onChangeFromToVal(val) {
      console.log(val);
    },
    onAutoLine() {
      if (!this.isAutoLine) {
        //ON->OFF
      } else {
        //OFF->ON
        console.log(this.isAutoLine);
        switch (this.display.currentDisplayGraphObj.graphType) {
          case this.display.displayGraphListObj.V_Ip.graphType: {
            //"V-Ip",
            break;
          }
          case this.display.displayGraphListObj.V_LogIe.graphType: {
            // "V-Log(Ie)",
            break;
          }
          case this.display.displayGraphListObj.n_dIisdVp.graphType: {
            //"n-dIis/dVp",
            let lineObj = this.$props.file.isatDataObj.diffData_leastLineObj;
            lineObj.from = lineObj.from_auto;
            lineObj.to = lineObj.to_auto;
            break;
          }
          case this.display.displayGraphListObj.V_Iis.graphType: {
            //"V-Iis",
            let lineObj = this.$props.file.isatDataObj.isatData_leastLineObj;
            console.log(lineObj.from, lineObj.from_auto);
            console.log(lineObj.to, lineObj.to_auto);

            lineObj.from = lineObj.from_auto;
            lineObj.to = lineObj.to_auto;
            // return this.$props.file.isatDataObj.isatData_leastLineObj.from;
            break;
          }
          case this.display.displayGraphListObj.test.graphType: {
            //"test"
            // return this.$props.file.isatDataObj.diffData_leastLineObj.from;
            break;
          }
        }
        this.updateChart();
      }
    },
    //APIs
    //tes2334567
    // createChartVI({ chartName, labelName, setDataArry }) {
    //   //   console.log(chartName, labelName)
    //   let chartVI_ctx = window.document
    //     .getElementById("canvas-" + chartName)
    //     .getContext("2d");
    //   let chartData = new Chart(chartVI_ctx, {
    //     type: this.chartType,
    //     data: {
    //       datasets: [
    //         {
    //           label: labelName,
    //           data: setDataArry,
    //           backgroundColor: this.point.color,
    //           pointRadius: this.point.size,
    //           pointHoverRadius: this.point.hoverSize,
    //           pointHitRadius: this.point.pointHitRadius,
    //         },
    //         // {
    //         //   label: "label2",
    //         //   data: [
    //         //     { x: 0, y: 1 },
    //         //     { x: 0, y: 1 },
    //         //   ],
    //         //   backgroundColor: "RGBA(225,95,150, 1)",
    //         // },
    //       ],
    //     },
    //     options: {
    //       //   title: {
    //       //     display: true,
    //       //     text: "V-I characteristics",
    //       //     fontSize: this.fontSize.title,
    //       //   },
    //       legend: {
    //         labels: {
    //           fontSize: this.fontSize.label,
    //         },
    //       },
    //       scales: {
    //         xAxes: [
    //           {
    //             scaleLabel: {
    //               display: true,
    //               labelString: this.axis.x.labelName,
    //               fontSize: this.fontSize.title,
    //             },
    //             ticks: {
    //               fontSize: this.fontSize.axis,
    //               suggestedMin: this.axis.x.maxSize,
    //               suggestedMax: this.axis.x.minSize,
    //               stepSize: this.axis.x.stepSize,
    //               // callback: function(value, index, values) {
    //               //   return value + "点";
    //               // },
    //             },
    //           },
    //         ],
    //         yAxes: [
    //           {
    //             scaleLabel: {
    //               display: true,
    //               labelString: this.axis.y.labelName,
    //               fontSize: this.fontSize.title,
    //             },
    //             ticks: {
    //               fontSize: this.fontSize.axis,
    //               suggestedMin: this.axis.y.maxSize,
    //               suggestedMax: this.axis.y.minSize,
    //               stepSize: this.axis.y.stepSize,
    //               // callback: function(value, index, values) {
    //               //   return value + "点";
    //               // },
    //             },
    //           },
    //         ],
    //       },
    //       horizontalLine: [
    //         {
    //           y: 0,
    //           style: "rgba(0,0,0,1)",
    //           text: "tes",
    //         },
    //       ],
    //       tooltips: {
    //         mode: "nearest",
    //         intersect: true,
    //         caretPadding: 30,
    //         caretSize: 10,
    //         callbacks: {
    //           title: (tooltipItem, chart) => {
    //             // console.log(
    //             //   "tooltipItem",
    //             //   tooltipItem,
    //             //   chart,
    //             //   tooltipItem[0].index
    //             // );

    //             return tooltipItem[0].index + 1;
    //           },
    //         },
    //       },
    //       maintainAspectRatio: true,
    //       responsive: true,
    //     },
    //   });
    //   this.currentChart = chartData;
    //   this.$store.dispatch("main/setChartList", { chartName, chartData });
    // },

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

    // createCanvasElement({ chartName }) {
    //   let insertElm = window.document.getElementById(
    //     "canvas-wrapper-" + chartName
    //   );
    //   let isScoped = false;
    //   // console.log(chartName.split("-scoped").length, chartName);
    //   if (chartName.split("-scoped").length > 1) {
    //     isScoped = true;
    //   }
    //   // console.log("insertElm", insertElm, chartName);
    //   //   let newElm = window.document.createElement("div");
    //   let newElm = window.document.createElement("canvas");
    //   newElm.className = "canvas-chart";
    //   newElm.id = "canvas-" + chartName;
    //   if (isScoped) {
    //     //
    //     newElm.style.height = "10%";
    //     // newElm.style.height = "50vw";
    //     newElm.style.width = "10%";
    //     // newElm.style.width = "50vw";
    //     // newElm.style.overflow = "hidden";
    //   } else {
    //     newElm.style.height = "50vh";
    //     newElm.style.width = "50vh";
    //   }

    //   insertElm.appendChild(newElm);
    // },
  },
  watch: {},
  created() {
    this.initGraph_V_Ip({
      graphType: this.display.currentDisplayGraphObj.graphType,
    });
  },
  mounted() {
    // this.initGraph_V_Ip();
  },
  components: {
    TableComponent,
    CreateChart,
    ResultTable,
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
