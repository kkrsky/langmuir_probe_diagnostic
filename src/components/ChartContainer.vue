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
                  <h3>{{ file.name }}</h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="2">
                  <v-btn
                    icon
                    color="gray"
                    @click="showNextGraph(-1)"
                    class="btn-next-graph"
                  >
                    <v-icon class="btn-next-graph"
                      >mdi-arrow-left-bold-circle</v-icon
                    >
                  </v-btn></v-col
                >
                <v-col cols="2">
                  <v-btn
                    icon
                    color="gray"
                    @click="showNextGraph(1)"
                    class="btn-next-graph"
                  >
                    <v-icon class="btn-next-graph"
                      >mdi-arrow-right-bold-circle</v-icon
                    >
                  </v-btn>
                </v-col>
                <v-col>
                  <v-select
                    :items="display.displayGraphList"
                    :value="display.currentDisplayGraphObj.graphType"
                    label="表示中のグラフ"
                    @change="showGraphController($event)"
                  ></v-select>
                </v-col>
                <!-- <v-col>
                  <v-btn @click="testChartContainer()">test</v-btn>
                </v-col> -->
                <v-col>
                  <p>
                    <!-- {{ currentData.addLineObj.error.message }} -->
                    {{ file.isatDataObj.isatData_leastLineObj.error.message }}
                    <br />
                    <span v-if="display.state.isShowFromTo_Isat">
                      Isat 傾き:{{
                        Number(
                          currentData.addLineObj_Isat.a_coord.toPrecision(4)
                        ).toExponential()
                      }}
                    </span>
                    <span v-if="display.state.isShowFromTo_Te">
                      Te 傾き:{{
                        Number(
                          currentData.addLineObj_Te.a_coord.toPrecision(4)
                        ).toExponential()
                      }}
                    </span>
                  </p>
                </v-col>
              </v-row>
              <!--
              <v-row>
                 <v-col>
                  <div class="setting-router-container">
                    <v-btn
                      icon
                      color="gray"
                      @click="initDialogGraph({ graphType: 'V-Ip [scoped]' })"
                      v-if="file.attribute === 'normal'"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-arrow-top-right-bottom-left-bold</v-icon>
                    </v-btn>
                  </div>
                </v-col> 
              </v-row>
              -->
              <v-row v-if="display.state.isShowFromTo_Isat">
                <v-col cols="4">
                  <v-checkbox
                    @click="onAutoLine('Isat')"
                    v-model="isAutoLine_Isat"
                    label="Auto Isat"
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
                    :disabled="isAutoLine_Isat"
                  >
                    <template v-slot:append-outer>
                      <v-btn icon color="primary"
                        ><v-icon @click="fromLine += 1">mdi-plus</v-icon>
                      </v-btn>
                      <v-btn icon color="primary"
                        ><v-icon @click="fromLine -= 1">mdi-minus</v-icon>
                      </v-btn>
                    </template>
                  </v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    class="mx-2"
                    label="to"
                    rows="1"
                    v-model.lazy="toLine"
                    prepend-icon="mdi-ray-end"
                    :disabled="isAutoLine_Isat"
                  >
                    <template v-slot:append-outer>
                      <v-btn icon color="primary"
                        ><v-icon @click="toLine += 1">mdi-plus</v-icon>
                      </v-btn>
                      <v-btn icon color="primary"
                        ><v-icon @click="toLine -= 1">mdi-minus</v-icon>
                      </v-btn>
                    </template>
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row v-if="display.state.isShowFromTo_Te">
                <v-col cols="4">
                  <v-checkbox
                    @click="onAutoLine('Te')"
                    v-model="isAutoLine_Te"
                    label="Auto Te"
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
                    :disabled="isAutoLine_Te"
                  >
                    <template v-slot:append-outer>
                      <v-btn icon color="primary"
                        ><v-icon @click="fromLine += 1">mdi-plus</v-icon>
                      </v-btn>
                      <v-btn icon color="primary"
                        ><v-icon @click="fromLine -= 1">mdi-minus</v-icon>
                      </v-btn>
                    </template>
                  </v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    class="mx-2"
                    label="to"
                    rows="1"
                    v-model.lazy="toLine"
                    prepend-icon="mdi-ray-end"
                    :disabled="isAutoLine_Te"
                  >
                    <template v-slot:append-outer>
                      <v-btn icon color="primary"
                        ><v-icon @click="toLine += 1">mdi-plus</v-icon>
                      </v-btn>
                      <v-btn icon color="primary"
                        ><v-icon @click="toLine -= 1">mdi-minus</v-icon>
                      </v-btn>
                    </template>
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row v-if="display.state.isShowVf">
                <v-col cols="4">
                  <v-checkbox
                    @click="onAutoLine('Vf')"
                    v-model="isAutoLine_Vf"
                    label="Auto Vf"
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
                    :disabled="isAutoLine_Vf"
                  >
                    <template v-slot:append-outer>
                      <v-btn icon color="primary"
                        ><v-icon @click="fromLine += 0.1">mdi-plus</v-icon>
                      </v-btn>
                      <v-btn icon color="primary"
                        ><v-icon @click="fromLine -= 0.1">mdi-minus</v-icon>
                      </v-btn>
                    </template>
                  </v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div class="result-container">
            <!-- result{{ file.name }} -->
            <!-- <table-component></table-component> -->
            <result-table
              :result="resultObj"
              :key="resultObj.env.reload"
            ></result-table>
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
              <result-table
                :result="resultObj"
                :key="resultObj.env.reload"
              ></result-table>

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
import _template from "../views/_template.vue";

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
        color: "RGBA(0,0,255, 1)",
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
              VfObj: {
                Vf_act: null,
                Vf_calc: null,
                VfDot: null,
                Vf_scatter: null,
              },
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
                Jsat: null,
              },
              TeObj: {
                logIe_arry: null,
                logIe_scatter: null,
                logIe_leastLineObj: null,
                logIe_fromto_auto: null,
                func_setLeastLineObj: null, //function
                Te: null,
              },
              NeObj: {
                ne_isat: null,
              },
              VsObj: {
                diffIp_2nd_scatter: null,
                diffData_leastLineObj: null,
                Vs_calc: null,
              },
              reload: 0,
            },
            chartName: null,
            labelName: null,
            setDataArry: null,
            addLineObj: null,
            addLineObj_Isat: null,
            addLineObj_Te: null,
            addGraphDataArry: null,
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
        displayGraphList: ["V-Ip"], //initDisplayGraphListで自動生成
        displayGraphListObj: {
          V_Ip: { graphType: "V-Ip" },
          Vf_Ip: { graphType: "Vf-Ip" },
          V_Iis: { graphType: "V-Iis" },
          V_LogIe: { graphType: "V-Log(Ie)" },
          Vp_dIpdVp: { graphType: "Vp-dIp/dVp" },
          Vp_ddIp: { graphType: "Vp-ddIp" },
          test: { graphType: "test" },
        },
        state: {
          isShowFromTo_Isat: false,
          isShowFromTo_Te: true,
          isShowVf: false,
        },

        // displayGraphListObj: ["V-Ip", "V-Log(Ie)", "Vp-dIp/dVp", "V-Iis", "test"],
      },
      isAutoLine_Isat: true,
      isAutoLine_Te: true,
      isAutoLine_Vf: true,

      resultObj: {
        env: {
          isInit: false,
          label: "this is env",
          data: 0,
          reload: 0,
        },
        Iis_fit: {
          label: "Iis_fit [mA]",
          data: 0,
        },
        // Ies_calc: null,
        Te: {
          label: "Te [eV]",
          data: 0,
        },
        Ne_Iis: {
          label: "Ne_Iis [cm^-3]",
          data: 0,
        },
        // Ne_Ies: null,
        Vs_calc: {
          label: "Vs_calc [V]",
          data: 0,
        },
        Vf_fit: {
          label: "Vf_fit [V]",
          data: 0,
        },
        // Vf_calc: {
        //   label: "Vf_calc [V]",
        //   data: 0,
        // },
        λde: {
          label: "Deby Leng [mm]",
          data: 0,
        },
        Jis: {
          label: "Jis [mA/cm^2]",
          data: 0,
        },
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
            return this.$props.file.TeObj.logIe_leastLineObj.from;

            break;
          }
          case this.display.displayGraphListObj.Vf_Ip.graphType: {
            //"Vf-Ip",
            //浮遊電位を更新する用
            return Number(this.$props.file.VfObj.Vf_act.toPrecision(4));
            break;
          }
          case this.display.displayGraphListObj.V_LogIe.graphType: {
            // "V-Log(Ie)",
            return this.$props.file.TeObj.logIe_leastLineObj.from;

            break;
          }
          case this.display.displayGraphListObj.Vp_dIpdVp.graphType: {
            return this.$props.file.isatDataObj.diffData_leastLineObj.from;
            //"Vp-dIp/dVp",
            break;
          }
          case this.display.displayGraphListObj.Vp_ddIp.graphType: {
            // return this.$props.file.VsObj.diffData_leastLineObj.from;
            //"Vp-dIp/dVp",
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
        //short
        let dgl = this.display.displayGraphListObj;
        //init
        let fromOld = null;
        let toOld = null;
        let dataLength = null;
        let passCheckError = false;

        switch (this.display.currentDisplayGraphObj.graphType) {
          case dgl.V_Ip.graphType: {
            //"V-Ip",
            let scope = this.$props.file.TeObj;
            fromOld = scope.logIe_leastLineObj.from;
            toOld = scope.logIe_leastLineObj.to;
            dataLength = scope.logIe_arry.length;
            break;
          }
          case dgl.Vf_Ip.graphType: {
            //"V-Ip",
            let scope = this.$props.file.VfObj;
            fromOld = scope.Vf_act;
            // toOld = scope.logIe_leastLineObj.to;
            dataLength = 1;
            passCheckError = true;
            break;
          }
          case dgl.V_LogIe.graphType: {
            // "V-Log(Ie)",
            let scope = this.$props.file.TeObj;
            fromOld = scope.logIe_leastLineObj.from;
            toOld = scope.logIe_leastLineObj.to;
            dataLength = scope.logIe_arry.length;
            break;
          }
          case dgl.Vp_dIpdVp.graphType: {
            //"Vp-dIp/dVp",
            fromOld = this.$props.file.isatDataObj.diffData_leastLineObj.from;
            toOld = this.$props.file.isatDataObj.diffData_leastLineObj.to;
            dataLength = this.$props.file.isatDataObj.diffData_arry.length;
            break;
          }
          case this.display.displayGraphListObj.Vp_ddIp.graphType: {
            // return this.$props.file.VsObj.diffData_leastLineObj.from;
            //"Vp-dIp/dVp",
            break;
          }
          case dgl.V_Iis.graphType: {
            //"V-Iis",
            fromOld = this.$props.file.isatDataObj.diffData_leastLineObj.from;
            toOld = this.$props.file.isatDataObj.diffData_leastLineObj.to;
            dataLength = this.$props.file.isatDataObj.diffData_arry.length;

            break;
          }
          case dgl.test.graphType: {
            //"test"

            break;
          }
        }
        if (isNaN(Number(fromVal))) {
          this.helper.snackFire({ message: "数値を入力してください。" });
          // this.helper.snackFire({ message: "" });
          fromVal = fromOld;
        } else {
          fromVal = Number(fromVal);
        }
        if (fromVal > toOld && !passCheckError) {
          this.helper.snackFire({
            message: "fromはtoよりも小さい値を入力して下さい。",
          });
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
            return this.$props.file.TeObj.logIe_leastLineObj.to;

            break;
          }
          case this.display.displayGraphListObj.Vf_Ip.graphType: {
            //"V-Ip",
            // return this.$props.file.TeObj.logIe_leastLineObj.to;

            break;
          }
          case this.display.displayGraphListObj.V_LogIe.graphType: {
            // "V-Log(Ie)",
            return this.$props.file.TeObj.logIe_leastLineObj.to;

            break;
          }
          case this.display.displayGraphListObj.Vp_dIpdVp.graphType: {
            //"Vp-dIp/dVp",
            return this.$props.file.isatDataObj.diffData_leastLineObj.to;

            break;
          }
          case this.display.displayGraphListObj.Vp_ddIp.graphType: {
            // return this.$props.file.VsObj.diffData_leastLineObj.from;
            //"Vp-dIp/dVp",
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
        //short
        let dgl = this.display.displayGraphListObj;
        //init
        let fromOld = null;
        let toOld = null;
        let dataLength = null;

        switch (this.display.currentDisplayGraphObj.graphType) {
          case dgl.V_Ip.graphType: {
            //"V-Ip",
            let scope = this.$props.file.TeObj;
            fromOld = scope.logIe_leastLineObj.from;
            toOld = scope.logIe_leastLineObj.to;
            dataLength = scope.logIe_arry.length;
            break;
          }
          case dgl.Vf_Ip.graphType: {
            //"Vf-Ip",
            // let scope = this.$props.file.TeObj;
            // fromOld = scope.logIe_leastLineObj.from;
            // toOld = scope.logIe_leastLineObj.to;
            // dataLength = scope.logIe_arry.length;
            // break;
          }
          case dgl.V_LogIe.graphType: {
            // "V-Log(Ie)",
            let scope = this.$props.file.TeObj;
            fromOld = scope.logIe_leastLineObj.from;
            toOld = scope.logIe_leastLineObj.to;
            dataLength = scope.logIe_arry.length;
            break;
          }
          case dgl.Vp_dIpdVp.graphType: {
            //"Vp-dIp/dVp",
            fromOld = this.$props.file.isatDataObj.diffData_leastLineObj.from;
            toOld = this.$props.file.isatDataObj.diffData_leastLineObj.to;
            dataLength = this.$props.file.isatDataObj.diffData_arry.length;
            break;
          }
          case this.display.displayGraphListObj.Vp_ddIp.graphType: {
            // return this.$props.file.VsObj.diffData_leastLineObj.from;
            //"Vp-dIp/dVp",
            break;
          }
          case dgl.V_Iis.graphType: {
            //"V-Iis",
            fromOld = this.$props.file.isatDataObj.diffData_leastLineObj.from;
            toOld = this.$props.file.isatDataObj.diffData_leastLineObj.to;
            dataLength = this.$props.file.isatDataObj.diffData_arry.length;

            break;
          }
          case dgl.test.graphType: {
            //"test"

            break;
          }
        }

        //check error
        if (isNaN(Number(toVal))) {
          this.helper.snackFire({ message: "数値を入力してください。" });
          toVal = toOld;
        } else {
          toVal = Number(toVal);
        }
        if (fromOld > toVal) {
          this.helper.snackFire({
            message: "toはfromよりも小さい値を入力して下さい。",
          });
          toVal = toOld;
        } else if (toVal > dataLength) {
          this.helper.snackFire({
            message:
              "最大データ数(" + dataLength + ") 以下の値を入力して下さい。",
          });
          toVal = toOld;
        }

        //set new val
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
      this.updateChart("hard");
      this.updateResult();
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
      let chartName =
        this.file.name + "_" + this.file.id + "_" + this.file.reload;
      let createChartObj = {
        graphType,
        data: {
          file: this.file,
          chartName: chartName,
          labelName: chartName,
          setDataArry: this.file.scatterData,
          addLineObj_Isat: this.file.isatDataObj.isatData_leastLineObj,
          addLineObj_Te: this.file.TeObj.logIe_leastLineObj,
          addGraphDataArry: this.file.TeObj.logIe_scatter,
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
    initGraph_Vf_Ip({ graphType }) {
      // axis: {
      //         y: {
      //           labelName: "I [mA]",
      //           stepSize: 10,
      //           maxSize: null,
      //           minSize: null,
      //         },
      //         x: {
      //           labelName: "V [V]",
      //           stepSize: 10,
      //           maxSize: null,
      //           minSize: null,
      //         },
      let axis_here = this.helper._cp(this.axis);
      let minDot = this.file.VfObj.Vf_scatter[0];
      let maxDot = this.file.VfObj.Vf_scatter.slice(-1)[0];

      // axis_here.y.labelName = "log(Ie) [mA]";
      axis_here.y.stepSize = 1;
      // axis_here.y.maxSize = 1;
      // axis_here.y.minSize = minDot.y;
      axis_here.x.stepSize = 1;
      axis_here.x.maxSize = maxDot.x;
      axis_here.x.minSize = minDot.x;

      let createChartObj = {
        graphType,
        data: {
          file: this.file,
          chartName: "Vf_Ip-graph" + this.file.name,
          labelName: "Vf_Ip-graph" + this.file.name,
          setDataArry: this.file.VfObj.Vf_scatter,
          addDot: this.file.VfObj.VfDot,
        },
        setting: {
          fontSize: this.fontSize,
          axis: axis_here,
          point: this.point,
          chartType: this.chartType,
        },
        reload: 0,
      };
      this.display.currentDisplayGraphObj = createChartObj;
      this.updateChart();
    },
    initGraph_V_LogIe({ graphType }) {
      let axis_here = this.helper._cp(this.axis);
      let minDot = this.file.TeObj.logIe_scatter.find((dot) => {
        return dot.y !== null;
      });
      let maxDot = this.file.TeObj.logIe_scatter.slice(-1)[0];
      axis_here.y.labelName = "log(Ie) [mA]";
      axis_here.y.stepSize = 1;
      // axis_here.y.maxSize = maxDot.y + 2;
      // axis_here.y.minSize = minDot.y - 2;
      axis_here.x.stepSize = 1;
      // axis_here.x.maxSize = maxDot.x + 2;
      // axis_here.x.minSize = minDot.x - 2;
      // console.log(axis_here, minDot, maxDot);
      let createChartObj = {
        graphType,
        data: {
          file: this.file,
          chartName: "V_LogIe-graph-" + this.file.name,
          labelName: "V_LogIe-graph-" + this.file.name,
          setDataArry: this.file.TeObj.logIe_scatter,
          // addLineObj: this.file.TeObj.logIe_leastLineObj,
          addLineObj_Te: this.file.TeObj.logIe_leastLineObj,
          addGraphDataArry: this.file.TeObj.diffData_scatter,

          // addLineObj: this.file.isatDataObj.diffData_leastLineObj,
        },
        setting: {
          fontSize: this.fontSize,
          axis: axis_here,
          point: this.point,
          chartType: this.chartType,
        },
        reload: 0,
      };
      this.display.currentDisplayGraphObj = createChartObj;
      this.updateChart();
    },
    initGraph_Vp_dIpdVp({ graphType }) {
      let createChartObj = {
        graphType,
        data: {
          file: this.file,
          chartName: "Vp_dIpdVp-graph-" + this.file.name,
          labelName: "Vp_dIpdVp-graph-" + this.file.name,
          setDataArry: this.file.isatDataObj.diffData_scatter,
          addLineObj_Isat: this.file.isatDataObj.diffData_leastLineObj,
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
      // this.display.displayGraphListObj.test = createChartObj;
      this.updateChart();
    },
    initGraph_Vp_ddIp({ graphType }) {
      let createChartObj = {
        graphType,
        data: {
          file: this.file,
          chartName: "Vp_ddIp-graph-" + this.file.name,
          labelName: "Vp_ddIp-graph-" + this.file.name,
          setDataArry: this.file.VsObj.diffIp_2nd_scatter,
          // addLineObj: this.file.VsObj.diffData_leastLineObj,
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
      // this.display.displayGraphListObj.test = createChartObj;
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
          addLineObj_Isat: this.file.isatDataObj.isatData_leastLineObj,
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
        data: {
          file: this.file,
          chartName: "test-" + this.file.name,
          labelName: "test-" + this.file.name,
          setDataArry: this.file.VsObj.diffIp_2nd_scatter,
          // addLineObj: this.file.isatDataObj.diffData_leastLineObj,
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

      return createChartObj;
    },

    //views
    initDisplayGraphList() {
      let graphKeyArry = Object.keys(this.display.displayGraphListObj);
      this.display.displayGraphList = graphKeyArry.map((key) => {
        return this.display.displayGraphListObj[key].graphType;
      });
    },
    resetAllDisplayState() {
      let stateObj = this.display.state;
      for (let stateKey in stateObj) {
        stateObj[stateKey] = false;
      }
    },
    showGraphController(graphType_next) {
      let {
        currentDisplayGraphObj,
        displayGraphListObj,
        displayGraphList,
      } = this.display;
      switch (graphType_next) {
        case displayGraphListObj.V_Ip.graphType: {
          this.initGraph_V_Ip({ graphType: graphType_next });
          // console.log("updated", this.display.currentDisplayGraphObj);
          this.resetAllDisplayState();
          this.display.state.isShowFromTo_Te = true;

          break;
        }
        case displayGraphListObj.Vf_Ip.graphType: {
          this.initGraph_Vf_Ip({ graphType: graphType_next });
          // console.log("updated", this.display.currentDisplayGraphObj);
          this.resetAllDisplayState();
          this.display.state.isShowVf = true;

          break;
        }
        case this.display.displayGraphListObj.V_LogIe.graphType: {
          // "V-Log(Ie)",
          this.initGraph_V_LogIe({ graphType: graphType_next });
          this.resetAllDisplayState();
          this.display.state.isShowFromTo_Te = true;

          break;
        }
        case this.display.displayGraphListObj.Vp_dIpdVp.graphType: {
          //"Vp-dIp/dVp",
          this.initGraph_Vp_dIpdVp({ graphType: graphType_next });
          this.resetAllDisplayState();
          this.display.state.isShowFromTo_Isat = true;
          break;
        }
        case this.display.displayGraphListObj.Vp_ddIp.graphType: {
          // return this.$props.file.VsObj.diffData_leastLineObj.from;
          //"Vp-ddIp",
          this.initGraph_Vp_ddIp({ graphType: graphType_next });
          this.resetAllDisplayState();
          break;
        }
        case this.display.displayGraphListObj.V_Iis.graphType: {
          //"V-Iis",
          this.initGraph_V_Iis({ graphType: graphType_next });
          this.resetAllDisplayState();
          this.display.state.isShowFromTo_Isat = true;
          break;
        }
        case displayGraphListObj.test.graphType: {
          this.initTestGraph({ graphType: graphType_next });
          this.resetAllDisplayState();

          break;
        }
      }
    },
    showNextGraph(num) {
      //init
      let {
        currentDisplayGraphObj,
        displayGraphListObj,
        displayGraphList,
      } = this.display;
      // console.log("current", currentDisplayGraphObj.graphType);

      //current index
      let currentGraphType = currentDisplayGraphObj.graphType;
      let currentGraph_i = displayGraphList.indexOf(currentGraphType);
      if (currentGraph_i === -1) currentGraph_i = 0;
      if (currentGraph_i + num < 0) currentGraph_i = displayGraphList.length;
      let nextGraph_i = (currentGraph_i + num) % displayGraphList.length;
      let nextGraphType = displayGraphList[nextGraph_i];

      let displayGraphListObjKeyArry = Object.keys(displayGraphListObj);
      let nextGraphObjKey = displayGraphListObjKeyArry.find((graphKey) => {
        return displayGraphListObj[graphKey].graphType === nextGraphType;
      });
      let nextGraphObj = displayGraphListObj[nextGraphObjKey];

      //初期データ保存

      //insert data
      let graphType_next = nextGraphObj.graphType;

      this.showGraphController(graphType_next);
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
      this.updateResult();
    },
    updateResult() {
      let presenter = (obj) => {
        for (let key in obj) {
          try {
            obj[key].data = obj[key].data.toPrecision(4);
          } catch {
            //none
          }
        }
        // console.log(obj);
        return obj;
      };
      let file = this.currentData.file;
      // console.log(file.isatDataObj.isat, file.isatDataObj.isat.toPrecision(4));
      let resultObj = {
        env: {
          label: "this is env",
          data: 0,
          reload: this.resultObj.env.isInit ? this.resultObj.env.reload : 0,
        },
        Iis_fit: {
          label: "Iis_fit [mA]",
          data: file.isatDataObj.isat,
        },
        // Ies_calc: null,
        Te: {
          label: "Te [eV]",
          data: file.TeObj.Te,
        },
        Ne_Iis: {
          label: "Ne_Iis [cm^-3]",
          data: file.NeObj.ne_isat,
        },
        // Ne_Ies: null,
        Vs_calc: {
          label: "Vs_calc [V]",
          data: file.VsObj.Vs_calc,
        },
        Vf_fit: {
          label: "Vf_fit [V]",
          data: file.VfObj.Vf_act,
        },
        // Vf_calc: {
        //   label: "Vf_calc [V]",
        //   data: file.VfObj.Vf_calc,
        // },
        λde: {
          label: "Deby Leng [mm]",
          data: file.debyLength,
        },
        Jis: {
          label: "Jis [mA/cm^2]",
          data: file.isatDataObj.Jsat,
        },
        // reload: 0,
      };
      this.resultObj.env.isInit = true;
      this.resultObj = presenter(resultObj);
      this.resultObj.env.reload += 1;
    },

    //button actions

    onAutoLine(target) {
      switch (target) {
        case "Isat": {
          if (!this.isAutoLine_Isat) {
            //ON->OFF
          } else {
            //OFF->ON
            let toVal = 0;
            let fromVal = 0;
            switch (this.display.currentDisplayGraphObj.graphType) {
              case this.display.displayGraphListObj.V_Ip.graphType: {
                //"V-Ip",
                let lineObj = this.display.currentDisplayGraphObj.data
                  .addLineObj_Isat;

                let autoObj = this.$props.file.TeObj.logIe_fromto_auto;

                lineObj.from = autoObj.from;
                lineObj.to = autoObj.to;
                fromVal = autoObj.from;
                toVal = autoObj.to;

                break;
              }
              case this.display.displayGraphListObj.V_LogIe.graphType: {
                // "V-Log(Ie)",
                let lineObj = this.display.currentDisplayGraphObj.data._Isat;

                let autoObj = this.$props.file.TeObj.logIe_fromto_auto;

                lineObj.from = autoObj.from;
                lineObj.to = autoObj.to;
                fromVal = autoObj.from;
                toVal = autoObj.to;

                break;
              }
              case this.display.displayGraphListObj.Vp_dIpdVp.graphType: {
                //"Vp-dIp/dVp",

                let lineObj = this.display.currentDisplayGraphObj.data
                  .addLineObj_Isat;

                // let lineObj = this.$props.file.isatDataObj.diffData_leastLineObj;
                let autoObj = this.$props.file.isatDataObj.isatData_fromto_auto;
                lineObj.from = autoObj.from;
                lineObj.to = autoObj.to;
                fromVal = autoObj.from;
                toVal = autoObj.to;
                break;
              }
              case this.display.displayGraphListObj.Vp_ddIp.graphType: {
                //"Vp-dIp/dVp",

                // let lineObj = this.display.currentDisplayGraphObj.data
                //   .addLineObj_Isat;

                // // let lineObj = this.$props.file.isatDataObj.diffData_leastLineObj;
                // let autoObj = this.$props.file.isatDataObj.isatData_fromto_auto;
                // lineObj.from = autoObj.from;
                // lineObj.to = autoObj.to;
                // fromVal = autoObj.from;
                // toVal = autoObj.to;
                break;
              }
              case this.display.displayGraphListObj.V_Iis.graphType: {
                //"V-Iis",
                // console.log(this.display.currentDisplayGraphObj);
                let lineObj = this.display.currentDisplayGraphObj.data
                  .addLineObj_Isat;

                // let lineObj = this.$props.file.isatDataObj.isatData_leastLineObj;
                let autoObj = this.$props.file.isatDataObj.isatData_fromto_auto;

                lineObj.from = autoObj.from;
                lineObj.to = autoObj.to;
                fromVal = autoObj.from;
                toVal = autoObj.to;

                // return this.$props.file.isatDataObj.isatData_leastLineObj.from;
                break;
              }
              case this.display.displayGraphListObj.test.graphType: {
                //"test"
                // return this.$props.file.isatDataObj.diffData_leastLineObj.from;
                break;
              }
            }
            let setFromObj = {
              changeValue: fromVal,
              displayGraphListObj: this.display.displayGraphListObj,
              currentDisplayGraphObj: this.display.currentDisplayGraphObj,
            };
            let setToObj = {
              changeValue: toVal,
              displayGraphListObj: this.display.displayGraphListObj,
              currentDisplayGraphObj: this.display.currentDisplayGraphObj,
            };
            // console.log("before", fromVal, toVal);
            this.$emit("changeTo", setToObj);
            this.$emit("changeFrom", setFromObj);
            this.updateChart("hard");
          }
          break;
        }
        case "Te": {
          if (!this.isAutoLine_Te) {
            //ON->OFF
          } else {
            //OFF->ON
            let toVal = 0;
            let fromVal = 0;
            switch (this.display.currentDisplayGraphObj.graphType) {
              case this.display.displayGraphListObj.V_Ip.graphType: {
                //"V-Ip",
                let lineObj = this.display.currentDisplayGraphObj.data
                  .addLineObj_Te;

                let autoObj = this.$props.file.TeObj.logIe_fromto_auto;

                lineObj.from = autoObj.from;
                lineObj.to = autoObj.to;
                fromVal = autoObj.from;
                toVal = autoObj.to;

                break;
              }
              case this.display.displayGraphListObj.V_LogIe.graphType: {
                // "V-Log(Ie)",
                let lineObj = this.display.currentDisplayGraphObj.data
                  .addLineObj_Te;

                let autoObj = this.$props.file.TeObj.logIe_fromto_auto;
                lineObj.from = autoObj.from;
                lineObj.to = autoObj.to;
                fromVal = autoObj.from;
                toVal = autoObj.to;

                break;
              }
              case this.display.displayGraphListObj.Vp_dIpdVp.graphType: {
                //"Vp-dIp/dVp",

                break;
              }
              case this.display.displayGraphListObj.Vp_ddIp.graphType: {
                //"Vp_ddIp",

                break;
              }
              case this.display.displayGraphListObj.V_Iis.graphType: {
                //"V-Iis",

                break;
              }
              case this.display.displayGraphListObj.test.graphType: {
                //"test"
                // return this.$props.file.isatDataObj.diffData_leastLineObj.from;
                break;
              }
            }
            let setFromObj = {
              changeValue: fromVal,
              displayGraphListObj: this.display.displayGraphListObj,
              currentDisplayGraphObj: this.display.currentDisplayGraphObj,
            };
            let setToObj = {
              changeValue: toVal,
              displayGraphListObj: this.display.displayGraphListObj,
              currentDisplayGraphObj: this.display.currentDisplayGraphObj,
            };
            // console.log("before", fromVal, toVal);
            this.$emit("changeTo", setToObj);
            this.$emit("changeFrom", setFromObj);
            this.updateChart("hard");
          }
          break;
        }
        case "Vf": {
          if (!this.isAutoLine_Vf) {
            //ON->OFF
          } else {
            //OFF->ON
            let toVal = 0;
            let fromVal = 0;
            switch (this.display.currentDisplayGraphObj.graphType) {
              case this.display.displayGraphListObj.Vf_Ip.graphType: {
                //"V-Ip",
                // let lineObj = this.display.currentDisplayGraphObj.data.addDot;
                // console.log(lineObj);
                let autoVf = this.$props.file.VfObj.Vf_auto;

                // lineObj.to = autoObj.to;
                fromVal = autoVf;
                // toVal = autoObj.to;

                break;
              }
            }
            let setFromObj = {
              changeValue: fromVal,
              displayGraphListObj: this.display.displayGraphListObj,
              currentDisplayGraphObj: this.display.currentDisplayGraphObj,
            };

            this.$emit("changeFrom", setFromObj);
            this.updateChart("hard");
          }
          break;
        }
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
    this.initDisplayGraphList();
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
    // overflow: scroll;
  }
  .btn-next-graph {
    height: 100%;
    width: 100%;
    font-size: 32px;
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

      .setting-start-from-container {
        width: 100%;
        height: 100%;
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
