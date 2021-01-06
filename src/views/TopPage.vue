<template>
  <div>
    <v-navigation-drawer v-model="isShowDrower" absolute temporary>
      <!-- v-show="isShowDrower"-->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Calculator </v-list-item-title>
          <v-list-item-subtitle>
            Langmuir probe diagnostic
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="titleObj in titleList" :key="titleObj.name" link>
          <v-list-item-icon>
            <v-icon>{{ titleObj.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title @click="diplayChanger(titleObj.name)">{{
              titleObj.name
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <top-header :title="title" :left="leftBtn" :right="rightBtn"></top-header>

    <v-main>
      <!-- <p>main</p> -->
      <!-- <table-component></table-component> -->
      <!-- ---------- -->
      <!-- TopCalc -->
      <!-- ---------- -->
      <v-card id="TopCalc" :loading="isLoading" outlined>
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>
        <div v-if="isShowDisplayCalc">
          <v-card-title
            ><h3>グラフ</h3>

            <span> : {{ files.length }}ファイル</span></v-card-title
          >
          <v-divider></v-divider>

          <div
            :class="{
              TopCalcContainer_lg: !isShowDisplaySetting,
              TopCalcContainer_md: isShowDisplaySetting,
            }"
          >
            <!-- <chart-container :files="files"></chart-container> -->

            <div v-for="file in files" :key="file.id">
              <chart-container
                :file="file"
                @changeFrom="setChange('from', $event, file)"
                @changeTo="setChange('to', $event, file)"
              ></chart-container>
            </div>
          </div>
        </div>
      </v-card>
      <!-- ---------- -->
      <!-- ScopedGraphViewer -->
      <!-- ---------- -->

      <!-- ---------- -->
      <!-- TopSetting -->
      <!-- ---------- -->
      <v-card id="TopSetFiles" v-show="isShowDisplaySetting" outlined>
        <div id="files">
          <v-card-title><h3>ファイル操作</h3></v-card-title>

          <!-- <div class="mt-5"></div> -->

          <v-container>
            <v-row>
              <v-col>
                <v-btn for="inputFile">
                  <label class="input-file-label" for="inputFile">
                    ファイルを選択
                    <input
                      id="inputFile"
                      type="file"
                      @change="onInputFiles"
                      multiple
                      accept="text/plain,text/csv"
                      style="display: none"
                    />
                  </label>
                </v-btn>
                <p>※入力ファイルは[V,A]の順</p>
              </v-col>
              <v-col cols="6">
                <v-textarea
                  v-model="outputFileName"
                  clearable
                  outlined
                  rows="1"
                  label="保存するファイル名"
                >
                </v-textarea>
              </v-col>
              <v-col>
                <v-btn @click="onOutputFiles">csv出力</v-btn>
                <p>※出力は[V,mA]</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-model="inputUnitVoltSelected"
                  :value="inputUnitVoltSelected"
                  :items="inputUnitVoltList"
                  label="input unit Volt"
                  outlined
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-model="inputUnitAmpereSelected"
                  :value="inputUnitAmpereSelected"
                  :items="inputUnitAmpereList"
                  label="input unit Ampere"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card>
      <v-card id="TopSetParams" v-show="isShowDisplaySetting" outlined>
        <div id="initParameter">
          <h3>初期条件設定</h3>
          <!-- <div class="mt-5"></div> -->
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="cons.probeArea"
                  label="Area of probe [cm^2]"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-select
                  value="Ar"
                  :items="gasType"
                  label="Gas Type"
                  outlined
                  @change="onChangeGasType"
                ></v-select>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="cons.massAtom"
                  label="Mass of Atom [kg]"
                  outlined
                  :disabled="!isOtherGasType"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card>
    </v-main>
    <!-- <top-footer></top-footer> -->
  </div>
</template>

<script>
import initData from "../init/initData.js";
import TopFooter from "../components/TopFooter";
import TopHeader from "../components/TopHeader";
import ChartContainer from "../components/ChartContainer";
import TableComponent from "../components/TableComponent";

export default {
  data() {
    return {
      /**
       * //component data
       */
      title: "Home",
      leftBtn: {
        id: 1,
        title: "menu",
        icon: "menu",
        goto: () => {
          this.isShowDrower = !this.isShowDrower;
        },
        propItems: {},
        addCss: {},
      },
      rightBtn: {
        // id: 1,
        // title: "setting",
        // icon: "settings",
        // goto: "TopSetting",
        // propItems: {},
        // addCss: {},
      },

      /**
       * //methods data
       */
      ////////////////////////////
      //drowper
      ////////////////////////////
      isShowDrower: false,

      ////////////////////////////
      //files
      ////////////////////////////
      files: [], //file_i
      outputFiles: [], //file_i objのkeyがcolタイトルになる。keyは全てのデータにおいて同一でなければいけない
      outputFileName: "__Langmuir_probe_diagnostic__",
      // inputDataTypeList: ["simple .txt", "without 2 header .txt"],
      // inputDataTypeSelected: "without 2 header .txt",
      inputUnitVoltSelected: "V",
      inputUnitVoltList: ["mV", "V"],
      inputUnitAmpereSelected: "A",
      inputUnitAmpereList: ["mA", "A"],

      ////////////////////////////
      //drower data
      ////////////////////////////
      titleList: {
        calc: { name: "calc", icon: "mdi-calculator" },
        setting: { name: "setting", icon: "mdi-import" },
        test: { name: "test", icon: "mdi-pen" },
        testLoad: { name: "testLoad_start", icon: "mdi-pen" },
      },

      ////////////////////////////
      //Top Setting data
      ////////////////////////////
      isShowDisplaySetting: true,
      isShowDisplayCalc: true,
      // isShowScopedGraphViewer: false,
      gasType: ["Ar", "H2", "Other"],
      gasTypeMassList: [
        Number(6.63385357335952 * 1e-26),
        Number(1.67355769346049 * 1e-27),
      ],
      isOtherGasType: false,

      ////////////////////////////
      //Top calc data
      ////////////////////////////
      isLoading: false,
      test: {
        // least: null,
      },
      cons: {
        //const
        e: Number(1.60217733 * 1e-19), //電荷素量[C]
        kb: Number(1.3806503 * 1e-23), //ボルツマン定数[J/K]
        me: Number(9.1093897 * 1e-31), //電子の質量[kg]
        mp: Number(1.6726231 * 1e-27), //陽子の質量[kg](水素陽子)
        ep0: Number(8.854187817 * 1e-12), //真空の誘電率[F/m]
        //user setting
        massAtom: Number(6.63385357335952 * 1e-26), //ガス原子の質量[kg] ,初期設定はAr
        probeArea: Number(0.097075213), //プローブ表面積[cm^2]
        currentGas: "Ar",
      },
    };
  },
  computed: {},
  methods: {
    test2() {
      console.log(this.files);
      // let tes = this.$store.state.main.chartList;
      // console.log(tes);
      // let tes2 = [
      //   // { x: 200, y: 100 },
      //   // { x: 250, y: 150 },
      //   [200, 100],
      //   [250, 150],
      // ];
      // let tes3 = this.leastSquareMethod(tes2);
      // console.log("ab", tes3);

      // let obj = {
      //   a: 2,
      //   // b: -1,
      //   x: 1,
      //   // y: 0,
      // };
      // let a = 2;
      // let b = -1;
      // let tes2 = this.calcLinerPoint({ a, b, y: 0 });
      // console.log(tes2);
      // // this.calcFloatingPotential();
      // let formatTextArry = [
      //   [-29.99875, -0.1926354],
      //   [-28.17934, -0.1876809],
      //   [-21.51288, -0.1747713],
      //   [-0.2997811, -0.1130338999999],
      //   [0.3113615, -0.1080423],
      //   [2.727842, -0.02973658],
      //   [3.338421, 0.02863798],
      // ];

      // this.calcIonSatAct({ floatVolt: 1, formatTextArry });

      // let tes3 = this.calcDiff_y(formatTextArry);
      // console.log(tes3);
    },
    setChange(target, changeObj, file) {
      let displayLeastGraphChanger_tofrom = (typeVal) => {
        let syncLeastLineObj = ({ originArry: dataArry, from, to }) => {
          return this.createLeastSquareMethodLine({
            originArry: dataArry,
            from,
            to,
            isExtendLine: true,
          });
        };
        //parser
        // console.log("changeObj", changeObj);
        let {
          changeValue,
          displayGraphListObj,
          currentDisplayGraphObj,
        } = changeObj;
        let leastLineObj_origin = null;
        let dataArry = null;
        let to_Isat = file.isatDataObj.isatData_leastLineObj.to;
        let from_Isat = file.isatDataObj.isatData_leastLineObj.from;
        let to_Te = file.TeObj.logIe_leastLineObj.to;
        let from_Te = file.TeObj.logIe_leastLineObj.from;
        // console.log("init-Isat", from_Isat, to_Isat);
        // console.log("init-Te", from_Te, to_Te);
        //swit
        switch (currentDisplayGraphObj.graphType) {
          case displayGraphListObj.V_Ip.graphType: {
            //"V-Ip",
            // leastLineObj_origin = file.TeObj.logIe_leastLineObj;
            // dataArry = file.TeObj.logIe_arry;
            // to_Te
            if (typeVal === "from") from_Te = changeValue;
            if (typeVal === "to") to_Te = changeValue;
            break;
          }
          case displayGraphListObj.V_LogIe.graphType: {
            // "V-Log(Ie)",
            // leastLineObj_origin = file.TeObj.logIe_leastLineObj;
            // dataArry = file.TeObj.logIe_arry;
            if (typeVal === "from") from_Te = changeValue;
            if (typeVal === "to") to_Te = changeValue;
            break;
          }
          case displayGraphListObj.Vp_dIpdVp.graphType: {
            //"Vp-dIp/dVp",
            // leastLineObj_origin = file.isatDataObj.diffData_leastLineObj;
            // dataArry = file.isatDataObj.diffData_arry;
            if (typeVal === "from") from_Isat = changeValue;
            if (typeVal === "to") to_Isat = changeValue;
            break;
          }
          case displayGraphListObj.Vp_ddIp.graphType: {
            //"Vp-dIp/dVp",
            // leastLineObj_origin = file.isatDataObj.diffData_leastLineObj;
            // dataArry = file.isatDataObj.diffData_arry;
            // if (typeVal === "from") from_Isat = changeValue;
            // if (typeVal === "to") to_Isat = changeValue;
            break;
          }
          case displayGraphListObj.Vp_ddIp.graphType: {
            //"Vp-dIp/dVp",
            // leastLineObj_origin = file.isatDataObj.diffData_leastLineObj;
            // dataArry = file.isatDataObj.diffData_arry;
            // if (typeVal === "from") from_Isat = changeValue;
            // if (typeVal === "to") to_Isat = changeValue;
            break;
          }
          case displayGraphListObj.V_Iis.graphType: {
            //"V-Iis",
            // leastLineObj_origin = file.isatDataObj.isatData_leastLineObj;
            // dataArry = file.isatDataObj.isatData_arry;
            if (typeVal === "from") from_Isat = changeValue;
            if (typeVal === "to") to_Isat = changeValue;
            break;
          }
          case displayGraphListObj.test.graphType: {
            //"test"

            break;
          }
        }
        //getter

        //treat

        // let leastLineObj_new = this.createLeastSquareMethodLine({
        //   originArry: dataArry,
        //   from,
        //   to,
        // });

        //setter,ここでGUIで変更したfrom,toの値を再計算している
        switch (currentDisplayGraphObj.graphType) {
          case displayGraphListObj.V_Ip.graphType: {
            //"V-Ip",

            //set Te
            let dataArry_Te = file.TeObj.logIe_arry;
            let leastLineObj_new = syncLeastLineObj({
              originArry: dataArry_Te,
              from: from_Te,
              to: to_Te,
            });
            file.TeObj.func_setLeastLineObj(leastLineObj_new);
            // file.TeObj.logIe_leastLineObj =
            // console.log(
            //   "settted",
            //   file.TeObj.logIe_leastLineObj.from,
            //   file.TeObj.logIe_leastLineObj.to
            // );

            break;
          }
          case displayGraphListObj.V_LogIe.graphType: {
            // "V-Log(Ie)",
            let dataArry_Te = file.TeObj.logIe_arry;
            let leastLineObj_new = syncLeastLineObj({
              originArry: dataArry_Te,
              from: from_Te,
              to: to_Te,
            });
            file.TeObj.func_setLeastLineObj(leastLineObj_new);
            // file.TeObj.logIe_leastLineObj = syncLeastLineObj({
            //   originArry: dataArry_Te,
            //   from: from_Te,
            //   to: to_Te,
            // });
            break;
          }
          case displayGraphListObj.Vp_dIpdVp.graphType: {
            //"Vp-dIp/dVp",

            let dataArry_isat = file.isatDataObj.isatData_arry;
            let dataArry_diff = file.isatDataObj.diffData_arry;

            let leastLineObj_new = syncLeastLineObj({
              originArry: dataArry_isat,
              from: from_Isat,
              to: to_Isat,
            });
            file.isatDataObj.func_setLeastLineObj(leastLineObj_new);

            // file.isatDataObj.diffData_leastLineObj = syncLeastLineObj({
            //   originArry: dataArry_diff,
            //   from: from_Isat,
            //   to: to_Isat,
            // });
            // file.isatDataObj.isatData_leastLineObj =syncLeastLineObj({
            //   originArry: dataArry_isat,
            //   from: from_Isat,
            //   to: to_Isat,
            // });
            //Teデータ更新
            file.TeObj = this.calcTe({
              VfObj: file.VfObj,
              isatDataObj: file.isatDataObj,
              formatTextArry: file.formatText,
            });

            break;
          }
          case displayGraphListObj.Vp_ddIp.graphType: {
            break;
          }
          case displayGraphListObj.V_Iis.graphType: {
            //"V-Iis",
            let dataArry_isat = file.isatDataObj.isatData_arry;
            let dataArry_diff = file.isatDataObj.diffData_arry;
            // console.log("from_Isat", from_Isat, to_Isat);

            let leastLineObj_new = syncLeastLineObj({
              originArry: dataArry_isat,
              from: from_Isat,
              to: to_Isat,
            });
            file.isatDataObj.func_setLeastLineObj(leastLineObj_new);

            // file.isatDataObj.diffData_leastLineObj = syncLeastLineObj({
            //   originArry: dataArry_diff,
            //   from: from_Isat,
            //   to: to_Isat,
            // });
            // file.isatDataObj.isatData_leastLineObj = syncLeastLineObj({
            //   originArry: dataArry_isat,
            //   from: from_Isat,
            //   to: to_Isat,
            // });

            //Teデータ更新
            file.TeObj = this.calcTe({
              VfObj: file.VfObj,
              isatDataObj: file.isatDataObj,
              formatTextArry: file.formatText,
            });
            break;
          }
          case displayGraphListObj.test.graphType: {
            //"test"

            break;
          }
        }
        // console.log("leastLineObj_origin after", leastLineObj_origin);
      };
      switch (target) {
        case "from": {
          displayLeastGraphChanger_tofrom("from");
          break;
        }
        case "to": {
          displayLeastGraphChanger_tofrom("to");
          break;
        }
        default: {
          console.error("pls set proper target name:", target);
        }
      }
    },
    loadingHandler({ type, message }) {
      switch (type) {
        case "start": {
          this.isLoading = true;
          this.$store.dispatch("main/loadingHandler", {
            type: type,
            message: message,
          });

          break;
        }
        case "end": {
          this.isLoading = false;
          this.$store.dispatch("main/loadingHandler", {
            type: type,
          });

          break;
        }
        default: {
          console.error("error:pls input start or end");
        }
      }
    },
    ////////////////////////////
    //files
    ////////////////////////////
    debugStartConsole({ currentFile }) {
      console.log("--------------------");
      console.log(currentFile.name);
    },
    onInputFiles(event) {
      const files = event.target.files;
      let readerArry = [];
      if (files.length !== 0) {
        this.loadingHandler({
          type: "start",
          message: "ファイル読み込み中...",
        });
      }
      let isSameFile = (fileName) => {
        let isSame = this.files.find((file) => {
          return file.fileName === fileName;
        });
        return Boolean(isSame);
      };

      for (let i = 0; i < files.length; i++) {
        let currentFile = files[i];

        readerArry[i] = new FileReader();
        readerArry[i].cnt = i;
        let readFileEnd = readerArry[files.length - 1];
        readerArry[i].onload = (e, i) => {
          //text format
          let isSame = isSameFile(currentFile.name);
          if (isSame) {
            //同じファイルが挿入されているのでスキップ
            let msg =
              "既に同じ名前のファイルが存在するため、保存しません。[" +
              currentFile.name +
              "]";
            // this.snackFire({
            //   message: msg,
            // });
            window.alert(msg);
            if (readFileEnd) {
              //最後のファイルが読み込まれた
              this.loadingHandler({ type: "end" });
            }
          } else {
            this.debugStartConsole({ currentFile });
            let attribute = "normal"; //normal:通常,scoped:拡大表示
            let chartName = "chartVI";
            let fileName = currentFile.name;
            let name = fileName.split(".txt").shift();
            let rawText = e.target.result;
            let formatTextArry = this.rawTextData2Obj(rawText);
            let scatterData = this.data2ScatterData(formatTextArry);
            let VfObj = this.calcVf({ formatTextArry });
            let isatDataObj = this.calcIonSatAct({
              chartName: name,
              VfObj,
              formatTextArry,
            });
            let TeObj = this.calcTe({ VfObj, isatDataObj, formatTextArry });
            VfObj = this.calcVf({ formatTextArry, TeObj });
            let NeObj = this.calcNe({ isatDataObj, TeObj });
            let VsObj = this.calcVs({ formatTextArry, VfObj, TeObj });
            let debyLength = this.calcDebyLength({ NeObj, TeObj });
            // //create chart
            // let addChartObj = {
            //   chartName: chartName,
            //   labelName: name,
            //   setDataArry: scatterData,
            // };

            // this.createChartVI(addChartObj);
            // this.addChartArryData(addChartObj);

            //create file obj
            if (formatTextArry.length !== 0) {
              let id = null;
              if (this.files.length === 0) {
                id = 1;
              } else {
                let maxIdObj = this.files.reduce((acc, val) => {
                  return acc.id > val.id ? acc : val;
                });
                id = maxIdObj.id + 1;
              }
              let file = {
                id: id,
                attribute: attribute,
                name: name,
                fileName: fileName,
                rawText: rawText,
                formatText: formatTextArry,
                scatterData: scatterData,
                VfObj,
                isatDataObj,
                TeObj,
                NeObj,
                VsObj,
                debyLength,
              };

              this.$store.dispatch("main/initChartList", {
                chartName: name,
                file,
              });
              this.files.push(file);

              if (readFileEnd) {
                //最後のファイルが読み込まれた
                this.loadingHandler({ type: "end" });
              }
            } else {
              this.helper.snackFire({
                message:
                  "データフォーマットを調整する必要があります。正しいデータフォーマットのファイルを入力してください。:" +
                  fileName,
              });
              // window.alert();
            }
          }
        };
        readerArry[i].readAsText(currentFile);
      }
      console.log("files:", this.files);
    },
    onOutputFiles() {
      class CSV {
        constructor(data, keys = false) {
          this.ARRAY = Symbol("ARRAY");
          this.OBJECT = Symbol("OBJECT");

          this.data = data;

          if (CSV.isArray(data)) {
            if (0 == data.length) {
              this.dataType = this.ARRAY;
            } else if (CSV.isObject(data[0])) {
              this.dataType = this.OBJECT;
            } else if (CSV.isArray(data[0])) {
              this.dataType = this.ARRAY;
            } else {
              throw Error("Error: 未対応のデータ型です");
            }
          } else {
            throw Error("Error: 未対応のデータ型です");
          }

          this.keys = keys;
        }

        toString() {
          if (this.dataType === this.ARRAY) {
            return this.data
              .map((record) =>
                record.map((field) => CSV.prepare(field)).join(",")
              )
              .join("\n");
          } else if (this.dataType === this.OBJECT) {
            const keys = this.keys || Array.from(this.extractKeys(this.data));

            const arrayData = this.data.map((record) =>
              keys.map((key) => record[key])
            );

            // console.log([].concat([keys], arrayData));

            return []
              .concat([keys], arrayData)
              .map((record) =>
                record.map((field) => CSV.prepare(field)).join(",")
              )
              .join("\n");
          }
        }

        save(filename = "data.csv") {
          if (!filename.match(/\.csv$/i)) {
            filename = filename + ".csv";
          }

          console.info("filename:", filename);
          console.table(this.data);

          const csvStr = this.toString();

          const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
          const blob = new Blob([bom, csvStr], { type: "text/csv" });
          const url = window.URL || window.webkitURL;
          const blobURL = url.createObjectURL(blob);

          let a = document.createElement("a");
          a.download = decodeURI(filename);
          a.href = blobURL;
          a.type = "text/csv";

          a.click();
        }

        extractKeys(data) {
          return new Set(
            [].concat(...this.data.map((record) => Object.keys(record)))
          );
        }

        static prepare(field) {
          return '"' + ("" + field).replace(/"/g, '""') + '"';
        }

        static isObject(obj) {
          return "[object Object]" === Object.prototype.toString.call(obj);
        }

        static isArray(obj) {
          return "[object Array]" === Object.prototype.toString.call(obj);
        }
      }

      // var data = [
      //   { name: "Andrew", age: 26, gender: "male" },
      //   { name2: "Lisa", age2: 21, gender2: "female" },
      //   { name3: "Fred", age3: 41, gender3: "male" },
      // ];
      this.outputFiles = this.files.map((file) => {
        return this.outputFilePresenter(file);
      });
      console.log("outputFiles", this.outputFiles);
      if (this.outputFiles.length === 0) {
        window.alert("入力されているファイルがありません。");
      } else {
        new CSV(this.outputFiles).save(this.outputFileName + ".csv");
      }
    },
    // onInputDataTypeType(selectVal) {
    //   this.inputDataTypeSelected = selectVal;
    // },
    outputFilePresenter(file) {
      let file_cp = this.helper._cp(file);
      let outputFile = {};
      // let file_cp = this.helper._cp(file);

      //不要なキーを削除
      let exceptKeyArry = ["rawText", "chartData", "scatterData"];
      let keys = Object.keys(file_cp);
      exceptKeyArry.forEach((exceptKey) => {
        delete file_cp[exceptKey];
      });

      //重要な情報をピックアップ,保存用オブジェクトに格納
      let pickUp = (pickUpKeyObjArry, findObj) => {
        let result = [];
        // let keyParser = pickUpKey.split(".");
        // pickUpKeyArry.reduce((acc, val) => {});
        let pickUpKeyArry = [];
        let pickUpLabelArry = [];
        let isLabeled = false;

        if (Boolean(pickUpKeyObjArry[0].key)) {
          //obj型

          //labelを補完
          pickUpKeyObjArry = pickUpKeyObjArry.map((obj) => {
            let { key, label } = obj;
            if (label) return obj;
            else return { key, label: key };
          });
          isLabeled = true;
          pickUpKeyArry = pickUpKeyObjArry.map((obj) => {
            return obj.key;
          });
          pickUpLabelArry = pickUpKeyObjArry.map((obj) => {
            return obj.label;
          });
        } else if (Array.isArray(pickUpKeyObjArry)) {
          isLabeled = false;
          pickUpKeyArry = pickUpKeyObjArry;
        } else {
          console.error("error pls correct arg");
          return false;
        }
        pickUpKeyArry.forEach((pickUpKey, pickUp_i) => {
          let keyParser = pickUpKey.split(".");
          keyParser.unshift(findObj);
          let maxIndex = keyParser.length - 1;
          let pickedObj = {
            key: null,
            data: null,
            label: null,
          };
          let target = keyParser.reduce((file, key, i) => {
            if (i === maxIndex) {
              pickedObj.key = key;
              isLabeled
                ? (pickedObj.label = pickUpLabelArry[pickUp_i])
                : (pickedObj.label = key);
            }
            return file[key];
          });
          pickedObj.data = target;
          result.push(pickedObj);
        });
        return result;
      };
      let pickUpKeyObjArry = [
        { key: "id" },
        { key: "fileName" },
        { key: "NeObj.ne_isat", label: "ne_isat[cm^-3]" },
        { key: "TeObj.Te", label: "Te[eV]" },
        { key: "TeObj.logIe_leastLineObj.from", label: "Te_from" },
        { key: "TeObj.logIe_leastLineObj.to", label: "Te_to" },

        { key: "VfObj.Vf_act", label: "Vf_act[V]" },
        { key: "VfObj.Vf_calc", label: "Vf_calc[V]" },
        { key: "VsObj.Vs_calc", label: "Vs_calc[V]" },
        { key: "isatDataObj.isat", label: "isat[mA]" },
        { key: "isatDataObj.Jsat", label: "Jsat[mA/cm^2]" },
        { key: "isatDataObj.isatData_leastLineObj.from", label: "isat_from" },
        { key: "isatDataObj.isatData_leastLineObj.to", label: "isat_to" },
        { key: "debyLength", label: "debyLength[mm]" },
      ];
      let pickedArry = pickUp(pickUpKeyObjArry, file_cp);

      //outputFileにデータを格納
      pickedArry.forEach((pickObj) => {
        let { key, label, data } = pickObj;
        outputFile[label] = data;
      });

      //その他環境情報を保存
      let envArry = [
        { label: "probeArea[cm^2]", data: this.cons.probeArea },
        { label: "gasType", data: this.cons.currentGas },
        { label: "massAtom", data: this.cons.massAtom },
      ];

      envArry.forEach((pickObj) => {
        let { label, data } = pickObj;
        outputFile[label] = data;
      });

      //保存に不要な設定を削除, (文字列が長すぎると正しく保存できない)
      let pickUp_delete = (pickUpKeyArry, findObj) => {
        pickUpKeyArry.forEach((pickUpKey) => {
          let keyParser = pickUpKey.split(".");
          keyParser.unshift(findObj);
          let maxIndex = keyParser.length - 1;

          let target = keyParser.reduce((file, key, i) => {
            if (i === maxIndex) {
              delete file[key];
            }
            return file[key];
          });
        });
        return findObj;
      };
      let deleteKeyArry = [
        "TeObj.logIe_scatter",
        // "VsObj.diffIp_2nd_scatter",
        "isatDataObj.diffData_scatter",
        "isatDataObj.isatData_scatter",
        "isatDataObj.diffData_arry",
      ];
      let file_cp_configs = pickUp_delete(deleteKeyArry, file_cp);
      outputFile.__config_start__ = "<backupSetting>";
      for (let key in file_cp_configs) {
        outputFile[key + "_JSON"] = JSON.stringify(file_cp_configs[key]);
      }
      outputFile.__config_end__ = "</backupSetting>";

      // outputFile.configJSON = JSON.stringify(file_cp_configs);

      // console.log("pickUpedArry", outputFile);
      return outputFile;
    },
    rawTextData2Obj(rawTextData) {
      //init

      //出力をV-mAにする
      let unitV = 1;
      let unitA = 1000;
      switch (this.inputUnitVoltSelected) {
        case "V": {
          unitV = 1;
          break;
        }
        case "mV": {
          unitV = 0.001;
          break;
        }
        default: {
          console.log("error:pls input unit Volt", this.inputUnitVoltSelected);
        }
      }
      switch (this.inputUnitAmpereSelected) {
        case "A": {
          unitA = 1000;
          break;
        }
        case "mA": {
          unitA = 1;
          break;
        }
        default: {
          console.log(
            "error:pls input unit Ampere",
            this.inputUnitAmpereSelected
          );
        }
      }

      //
      // console.log(unitV, unitA);
      rawTextData = rawTextData.trim().split("\n");
      // console.log("rawTextData", rawTextData);
      try {
        rawTextData = rawTextData.map((val) => {
          // console.log("val", val.split(" "));
          // let splited = val.split("	");
          // console.log("1", splited);

          // if (splited.length <= 1) val.split("	");
          // if (splited.length <= 1) val.split("  ");

          // let split_all = val.split("");
          // let numArry = [];
          // console.log(val);
          // split_all.forEach((str, i) => {
          //   let temp = [];
          //   if (isNaN(Number(str))) {
          //     //数値でない
          //     if (i > 2 && temp.length !== 0) {
          //       numArry.push(this.helper._cp(temp.concat()));
          //       temp = [];
          //     }
          //   } else {
          //     //数値
          //     temp.push(str);
          //     console.log("temp", temp);
          //   }
          // });
          // console.log("2", numArry);
          return val.split("	").map((num, i) => {
            if (i === 0) return Number(num) * unitV;
            else if (i === 1) return Number(num) * unitA;
            else {
              console.log("error: text file is not expected format");
            }
          });
        });
        // console.log("rawTextData2", rawTextData);

        rawTextData = rawTextData.filter((val) => {
          let checkNaN = val.find((item) => {
            return isNaN(item);
          });
          // console.log(checkNaN);
          if (checkNaN === undefined) {
            return true;
          } else {
            return false;
          }
        });
      } catch {
        window.alert("file input error: please check text format");
        console.log("file format error:", rawTextData);
        return null;
      }
      return rawTextData;
    },
    data2ScatterData(formatTextArry) {
      let scatterData = formatTextArry.map((val) => {
        let [vx, vy] = val;
        let obj = {
          x: vx,
          y: vy,
        };
        return obj;
      });
      return scatterData;
    },
    showScatterChart() {},

    ////////////////////////////
    //drower data
    ////////////////////////////
    diplayChanger(changeTitle) {
      switch (changeTitle) {
        case this.titleList.setting.name: {
          this.isShowDisplaySetting = !this.isShowDisplaySetting;
          break;
        }
        case this.titleList.calc.name: {
          this.isShowDisplayCalc = !this.isShowDisplayCalc;
          break;
        }
        case this.titleList.test.name: {
          this.test2();
          break;
        }
        case this.titleList.testLoad.name: {
          this.loadingHandler({ type: "start", message: "test..." });
          window.setTimeout(() => {
            this.loadingHandler({ type: "end" });
          }, 1000);
          break;
        }
      }
    },
    ////////////////////////////
    //Top Setting data
    ////////////////////////////
    onChangeGasType(selectVal) {
      // console.log("selectVal:", selectVal);
      this.cons.currentGas = selectVal;
      if (selectVal === "Other") {
        this.isOtherGasType = true;
        this.cons.massAtom = Number(1e-26);
      } else {
        this.isOtherGasType = false;
        switch (selectVal) {
          case "Ar": {
            this.cons.massAtom = this.gasTypeMassList[0];

            break;
          }
          case "H2": {
            this.cons.massAtom = this.gasTypeMassList[1];
            break;
          }
          default: {
            console.log("error:pls enter H2 or Ar");
          }
        }
      }
    },

    ////////////////////////////
    //Top calc data
    ////////////////////////////
    //init
    //utils
    leastSquareMethod(coordinates) {
      /**
       * @param {Object} coordinates [{x:0,y:0},...] or [[0,0],...]
       */

      if (Array.isArray(coordinates[0])) {
        coordinates = coordinates.map((arr) => {
          let [cx, cy] = arr;
          return { x: cx, y: cy };
        });
      }
      const n = coordinates.length;
      const sigX = coordinates.reduce((acc, c) => acc + c.x, 0);
      const sigY = coordinates.reduce((acc, c) => acc + c.y, 0);
      const sigXX = coordinates.reduce((acc, c) => acc + c.x * c.x, 0);
      const sigXY = coordinates.reduce((acc, c) => acc + c.x * c.y, 0);
      // a(傾き)を求める
      const a = (n * sigXY - sigX * sigY) / (n * sigXX - Math.pow(sigX, 2));
      // b(切片)を求める
      const b = (sigXX * sigY - sigXY * sigX) / (n * sigXX - Math.pow(sigX, 2));
      return { a, b };
    },
    calcLinerPoint({ a, b, x, y }) {
      if (a === undefined || b === undefined) {
        console.error("please input a and b", a, b);
      } else {
        if (x === undefined) {
          return (y - b) / a;
        } else if (y === undefined) {
          return a * x + b;
        }
      }
    },
    calcDiff_y(arry2D) {
      /**
       * @param {Array} arry [[x,y],...]
       * @return {Object} [{index:i,data:[cx,diff]},...]
       */
      let item = arry2D.map((dot, i) => {
        if (dot[1] === null) {
          let [cx, cy] = dot;
          return { index: i, data: [cx, cy] };
        } else if (i < arry2D.length - 1) {
          let [cx, cy] = dot;
          let [nx, ny] = arry2D[i + 1];
          //単位xあたりのy増加量
          let diff_y = (ny - cy) / (nx - cx);
          return { index: i, data: [cx, diff_y] };
          // return [i, diff_y];
        }
      });
      item.pop();
      return item;
    },
    calcDotAverage(arry2D, dn) {
      let temp = [];
      let output = [];
      for (let i = 0; i < arry2D.length; i++) {
        let [cx, cy] = arry2D[i];
        if (i % dn === 0 && i !== 0) {
          let ave =
            temp.reduce((acc, val) => {
              return (acc += val);
            }) / dn;
          output.push([cx, ave]);
          temp = [];
        } else {
          temp.push(cy);
        }
      }
      return output;
    },
    createLeastSquareMethodLine({ originArry, from, to, isExtendLine }) {
      let from_i = 0;
      let to_i = 0;
      let originArry_edit = this._cp(originArry);
      if (from !== undefined && to !== undefined) {
        from_i = from - 1; //indexに変換
        to_i = to - 1;
        if (from_i < 0)
          this.helper.snackFire({
            message: "fromの値を自然数で入力してください。",
          });
        originArry_edit = originArry.slice(from_i, to);
      } else {
        from_i = 0;
        to_i = originArry_edit.length - 1;
      }

      let { a, b } = this.leastSquareMethod(originArry_edit);
      let output = [];
      let current;
      // console.log("to", to, to_i, originArry.length - 1);
      for (let i = 0; i < originArry.length; i++) {
        let cx = originArry[i][0];
        let cy = a * cx + b;

        //from,toの2点を送信
        if (i === from_i || i === to_i) {
          output.push([cx, cy]);
        }
      }

      // console.log(output.slice(0, 1), to);
      from = from_i + 1;
      to = to_i + 1;

      //extends

      let createLeastSquareMethodLine = {
        lineData: output,
        lineData_scatter: this.data2ScatterData(output),
        from,
        to,
        a_coord: a,
        b_coord: b,
        error: {
          isSuccess: true,
          message: "エラーはありません。",
        },
      };

      if (isExtendLine === true) {
        createLeastSquareMethodLine = this.strateLine(
          createLeastSquareMethodLine,
          originArry.slice()
        );
      }
      return createLeastSquareMethodLine;
    },
    strateLine(leastLineObj, dataArry) {
      // console.log("dataArry", dataArry);
      let cx = null;
      let cy = null;
      let cx_start = null;
      let cy_start = null;
      let cx_end = null;
      let cy_end = null;
      let adjust = 0.1; //x％線を伸ばす
      let cy_find = (cx_in) => {
        // console.log(leastLineObj.a_coord, leastLineObj.b_coord);

        return leastLineObj.a_coord * cx_in + leastLineObj.b_coord;
      };
      let cx_find = (cy_in) => {
        // console.log(
        //   "x",
        //   leastLineObj.a_coord,
        //   leastLineObj.b_coord,
        //   (cy_in - leastLineObj.b_coord) / leastLineObj.a_coord
        // );

        return (cy - leastLineObj.b_coord) / leastLineObj.a_coord;
      };
      let maxYDot = dataArry.reduce((acc, val) => {
        return acc[1] > val[1] ? acc : val;
      });
      let minYDot = dataArry.reduce((acc, val) => {
        return acc[1] < val[1] ? acc : val;
      });
      // console.log("dataArry", dataArry);
      let limitDot_start = dataArry.find((dot) => {
        return dot[1] !== null;
      });
      let limitDot_end = dataArry.slice(-1)[0];
      // console.log("limit", limitDot_end);
      //計算
      cy = minYDot[1];
      cx_start = cx_find(cy);

      cy = maxYDot[1];
      cx_end = cx_find(cy);
      // console.log("init", cx_start, cy);

      //拡張
      cx_start = Math.floor(cx_start - cx_start * adjust);
      if (limitDot_start[0] < cx_start) cx_start = limitDot_start[0];
      cy_start = cy_find(cx_start);

      if (limitDot_end[0] < cx_end) cx_end = limitDot_end[0];
      cx_end = Math.floor(cx_end + cx_end * adjust);
      // console.log(limitDot_end[0], cx_end);
      if (limitDot_end[0] < cx_end) cx_end = limitDot_end[0];
      cy_end = cy_find(cx_end);
      // console.log("start", cx_start, cy_start);
      // console.log("end", cx_end, cy_end);

      //代入
      // console.log("final", [cx_end, cy_end]);
      leastLineObj.lineData.unshift([cx_start, cy_start]);
      leastLineObj.lineData.push([cx_end, cy_end]);
      leastLineObj.lineData_scatter = this.data2ScatterData(
        leastLineObj.lineData
      );
      return leastLineObj;
    },

    //action
    calcVf({ formatTextArry, TeObj }) {
      /**
       * @param {Array} formatTextArry [[0,0],...]
       */

      //VIから浮遊電位を計算
      let maxLoop = formatTextArry.length;
      let checkVoltArry = [];
      for (let i = 0; i < maxLoop; i++) {
        let [cx, cy] = formatTextArry[i];
        let isFirstData = true;

        if (cy > 0) {
          if (isFirstData) {
            //最初のデータ
            checkVoltArry.push([cx, cy]);

            //これ以降でy軸が負となるデータを検出
            for (let j = i + 1; j < maxLoop; j++) {
              if (j === maxLoop - 1) break;
              let [nx, ny] = formatTextArry[j];
              let [nx2, ny2] = formatTextArry[j + 1];

              if (ny < 0) {
                checkVoltArry.push([nx, ny]);
                if (ny2 > 0) checkVoltArry.push([nx2, ny2]);
              }
            }
            isFirstData = false;
            break;
          }
        }
        //初期データ用
        checkVoltArry[0] = [cx, cy];
      }
      // console.log("checkVoltArry", checkVoltArry);
      let { a, b } = this.leastSquareMethod(checkVoltArry);
      let meanFloatVolt = this.calcLinerPoint({ a, b, y: 0 });

      //理論計算からVfを算出
      let Vf_calc = null;
      if (TeObj) {
        let mi = this.cons.massAtom;
        let me = this.cons.me;
        //単位電子温度[eV]あたりのガス種別浮遊電位
        let Vf_calc2Te = 1 / 2 + (1 / 2) * Math.log(mi / (2 * Math.PI * me));
        Vf_calc = Vf_calc2Te * TeObj.Te;
        console.log("[Result] Vf_act", meanFloatVolt.toPrecision(4));
        console.log("[Result] Vf_calc", Vf_calc.toPrecision(4));
      }

      //create Obj
      let VfObj = {
        Vf_act: meanFloatVolt,
        Vf_calc,
      };
      return VfObj;
    },
    calcIonSatAct({ chartName, VfObj, formatTextArry }) {
      let calcRange = formatTextArry.filter((line) => {
        return line[0] < VfObj.Vf_act;
      });

      //y軸増加分を計算
      let diffObjArry_y = this.calcDiff_y(calcRange);

      //エラー部分を除去 (次の点と比較して今の点が10倍以上異なる場合は除去)
      let diffObjArry_y_output = diffObjArry_y.filter((dotObj, i) => {
        if (i < diffObjArry_y.length - 1) {
          let [cx, cy] = dotObj.data;
          let [nx, ny] = diffObjArry_y[i + 1].data;
          let threshold = 10;

          if (
            Math.abs(cy / ny) > threshold ||
            Math.abs(cy / ny) < 1 / threshold
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      });

      //極端なエラー値を除いたデータの平均算出
      let calcAveArry = diffObjArry_y_output.map((dotObj) => {
        return dotObj.data[1];
      });
      let diffAverage =
        calcAveArry.slice().reduce((acc, val) => {
          return (acc += val);
        }) / diffObjArry_y_output.length;
      // console.log("diffAverage", diffAverage);

      //エラー除去②、平均よりも10倍以上高い場合は除去
      diffObjArry_y_output = diffObjArry_y_output.filter((dotObj, i) => {
        let [cx, cy] = dotObj.data;
        let threshold = 10;
        if (
          Math.abs(cy / diffAverage) > threshold ||
          Math.abs(cy / diffAverage) < 1 / threshold
        )
          return false;
        else return true;
      });
      //エラー除去②、平均よりも10倍以上高い場合は平均値に置換(微分とV-Iisグラフの番号が異なる問題を解決)
      // diff_y_output = diff_y.slice().map((dot) => {
      //   let [ci, cy] = dot;
      //   let threshold = 10;
      //   if (
      //     Math.abs(cy / diffAverage) > threshold ||
      //     Math.abs(cy / diffAverage) < 1 / threshold
      //   ) {
      //     return [-1, null];
      //   } else {
      //     return dot;
      //   }
      // });
      // console.log(diff_y_output, diff_y_output.length, calcRange.length);

      //平均二乗法によって傾き調整 (微分値なので単調増加の場合、傾きが０に近づけば良い、傾きが閾値以下になるまで計算)
      let findGoodIsatPoint_recur = (obj) => {
        if (obj.endLoop) {
          //傾きが閾値以下になった。
          //開始位置の微調整

          return obj.result; //obj.leastLineObj;
        } else {
          //init leastLineObj
          if (obj.leastLineObj === null && obj.from === null) {
            obj.leastLineObj = this.createLeastSquareMethodLine({
              originArry: obj.originArry,
              isExtendLine: true,
            });
          } else if (obj.from !== null && obj.to !== null) {
            obj.leastLineObj = this.createLeastSquareMethodLine({
              originArry: obj.originArry,
              from: obj.from,
              to: obj.to,
              isExtendLine: true,
            });
          }
          //開始位置の微調整
          if (obj.startAverage === null && obj.from === null) {
            //開始付近の平均算出
            let threshold = 0.05; //データ総点数の5%を始点付近とする
            // let maxStartIndex = Math.floor(obj.originArry.length * threshold);
            let maxStartIndex = 5;
            let startDataList = obj.originArry.slice(0, maxStartIndex);
            let sum = startDataList.slice().reduce((acc, val) => {
              acc[1] += val[1];
              return acc;
            })[1];
            let startAverage = sum / maxStartIndex;
            // console.log("startAverage", startAverage);
            // console.log("maxStartIndex", maxStartIndex);
            // console.log("sum", sum);
            // console.log("startDataList", startDataList);
            //スタートポイント算出
            let minVal = 1;
            let minIndex = 0;
            startDataList.forEach((dot, i) => {
              let [cx, cy] = dot;
              let diff = Math.abs(cy - startAverage);
              if (minVal > diff) {
                minVal = diff;
                minIndex = i;
              }
            });
            //setter
            // console.log("min", minArry, "minVal", minVal);
            obj.startAverage = startAverage;
            obj.leastLineObj.from = minIndex + 1; //minArry[0]はindex
          }

          //check a_coord
          if (obj.a_coord_minObj === null) {
            obj.a_coord_minObj = {
              a: obj.leastLineObj.a_coord,
              to: obj.leastLineObj.to,
            };
          } else {
            obj.a_coord_minObj.a < obj.leastLineObj.a_coord
              ? null
              : (obj.a_coord_minObj = {
                  a: obj.leastLineObj.a_coord,
                  to: obj.leastLineObj.to,
                });
          }
          // console.log(obj.leastLineObj.a_coord, obj.a_coord_threshold);
          if (obj.leastLineObj.a_coord < obj.a_coord_threshold) {
            obj.result = obj.leastLineObj;
            obj.leastLineObj.error.message =
              "自動でイオン飽和電流を求めました。";
            // console.log(obj.result, obj.leastLineObj);
            obj.endLoop = true;
          } else if (obj.cnt > obj.originArry.length / 2) {
            console.error("手動でイオン飽和電流を求めてください");
            obj.leastLineObj.error.isSuccess = false;
            obj.leastLineObj.error.message =
              "手動でイオン飽和電流を求めてください";
            obj.leastLineObj.to = obj.a_coord_minObj.to;
            obj.result = obj.leastLineObj;
            obj.endLoop = true;
          } else {
            //toから1を引いて、再度最小二乗法を計算
            let { from, to } = obj.leastLineObj;
            to -= 1;
            obj.leastLineObj = this.createLeastSquareMethodLine({
              originArry: obj.originArry,
              from,
              to,
              isExtendLine: true,
            });
            obj.endLoop = false;
          }
          // console.log("obj.endLoop", obj.endLoop);
          obj.cnt++;
          return findGoodIsatPoint_recur(obj);
        }
      };
      let diffDataArry_y = diffObjArry_y_output.map((dotObj) => {
        return dotObj.data;
      });
      let lsmObj = {
        endLoop: false,
        result: null,
        leastLineObj: null,
        startAverage: null,
        cnt: 0,
        // originArry: diff_y,
        originArry: diffDataArry_y,
        a_coord_threshold: Number(6 * 1e-5),
        a_coord_minObj: null,
        //1回だけ計算してくれる?
        from: null,
        to: null,
      };
      let leastLineObj_diff = findGoodIsatPoint_recur(lsmObj);
      // console.log("leastLineObj_diff", leastLineObj_diff);

      //表示用イオン飽和電流算出
      // lsmObj.originArry = calcRange;
      // lsmObj.from = leastLineObj_diff.from;
      // lsmObj.to = leastLineObj_diff.to;
      // findGoodIsatPoint_recur(lsmObj);
      let leastLineObj_isat = this.createLeastSquareMethodLine({
        originArry: calcRange,
        from: leastLineObj_diff.from,
        to: leastLineObj_diff.to,
        isExtendLine: true,
      });
      if (leastLineObj_diff.error.isSuccess === false) {
        leastLineObj_isat.error = leastLineObj_diff.error;
      }

      //データ保存

      let diffData_fromto_auto = {
        from: leastLineObj_diff.from,
        to: leastLineObj_diff.to,
      };
      // console.log("diffData_fromto_auto", diffData_fromto_auto);
      //出力オブジェクト形成

      let calcIsat_realTime = (leastLineObj_input) => {
        //浮遊電位でのイオン飽和電流
        //プローブ電位がプラズマ電位になると、シースがなくなるので、正しい電子飽和電流とイオン飽和電流が流れるはず
        //現状、正しくプラズマ電位を求めることができていないので、とりあえず浮遊電位で計算
        let isat = this.calcLinerPoint({
          a: leastLineObj_input.a_coord,
          b: leastLineObj_input.b_coord,
          x: VfObj.Vf_act,
        });
        // console.log("floatVolt", floatVolt, isat);
        console.log("[Result] isat_act", Math.abs(isat).toPrecision(4));
        return Math.abs(isat);
      };
      let that = this;
      let func_setLeastLineObj = function(leastLineObj_input) {
        /**
         * //this->TeObj
          // console.log(this);
         * from,toの値をGUIで変更した際に再計算するために呼び出される
         *
         */
        let area = that.cons.probeArea;
        //変更を更新
        this.isatData_leastLineObj = leastLineObj_input;
        this.diffData_leastLineObj = leastLineObj_input;
        this.isat = calcIsat_realTime(leastLineObj_input);
        this.Jsat = this.isat / area;
      };

      //create obj
      let isatDataObj = {
        //diff data Vp-dIp/dVp
        diffData_arry: diffDataArry_y,
        diffData_scatter: this.data2ScatterData(diffDataArry_y),
        diffData_leastLineObj: leastLineObj_diff,
        diffData_fromto_auto: diffData_fromto_auto,
        //diff data Vp-dIp/dVp
        // diffData_arry2: diff_y_output,
        // diffData_scatter2: this.data2ScatterData(diff_y_output),
        // diffData_leastLineObj2: leastLineObj_diff,
        // diffData_fromto_auto2: diffData_fromto_auto,
        //isat data
        isatData_arry: calcRange,
        isatData_scatter: this.data2ScatterData(calcRange),
        isatData_leastLineObj: leastLineObj_isat,
        isatData_fromto_auto: diffData_fromto_auto,
        func_setLeastLineObj: func_setLeastLineObj, //function
        isat: calcIsat_realTime(leastLineObj_isat),
        Jsat: calcIsat_realTime(leastLineObj_isat) / this.cons.probeArea,
      };

      // console.log("diffData_leastLineObj", outputObj.diffData_leastLineObj);
      return isatDataObj;
    },
    calcTe({ VfObj, isatDataObj, formatTextArry }) {
      //Ieを算出
      let Te = null;
      let floatVolt = VfObj.Vf_act;
      // console.log("formatTextArry", formatTextArry);
      let IiObj = isatDataObj.isatData_leastLineObj;
      let Ie = formatTextArry.map((dot) => {
        let [cV, cI] = dot;
        let Ii = IiObj.a_coord * cV + IiObj.b_coord;
        let Ie = cI - Ii;
        return [cV, Ie];
      });
      let logIe_arry = Ie.map((dot) => {
        let [cV, Ie] = dot;
        let threshold = 5; //Vfー5V~最大値の部分のみ有効

        if (Ie > 0 && cV > floatVolt - threshold) {
          return [cV, Math.log(Ie)];
        } else {
          return [cV, null];
        }
        // return [cV, Math.log(Ie)];
      });
      //グラフ表示用に規格化
      let minArry = logIe_arry.reduce((acc, val) => {
        return acc[1] < val[1] ? acc : val;
      });
      minArry = minArry.slice();
      logIe_arry = logIe_arry.map((dot) => {
        if (dot[1] !== null) {
          // console.log(dot[1], Math.abs(minArry[1]));

          dot[1] += Math.abs(minArry[1]);
          return dot;
        } else {
          return dot;
        }
      });
      // console.log("logIe_arry", logIe_arry);
      // console.log("Ie", Ie);

      //傾きが最大となる部分を検出する
      let findGoodTePoint_recur = (obj) => {
        let _cp = (val) => {
          return JSON.parse(JSON.stringify(val));
        };
        if (obj.endLoop) {
          return obj.result; //obj.leastLineObj;
        } else {
          //init leastLineObj

          //開始位置の微調整
          if (obj.from === null && obj.floatVolt !== null) {
            let floatIndex = 0;
            let nearFloatDot = obj.originArry.slice().reduce((acc, val, i) => {
              let nearDot = acc[0] - obj.floatVolt;
              let compDot = val[0] - obj.floatVolt;
              // console.log(nearDot, compDot);
              if (Math.abs(nearDot) < Math.abs(compDot)) {
                return acc;
              } else {
                floatIndex = i;
                return val;
              }
            });

            obj.from = floatIndex + 1;
            obj.to = obj.from + obj.lineLength;
            obj.cnt = obj.to;
          }

          if (obj.leastLineObj === null) {
            obj.leastLineObj = this.createLeastSquareMethodLine({
              originArry: obj.originArry,
              from: obj.from,
              to: obj.to,
              isExtendLine: true,
            });
          }

          //check a_coord
          if (obj.a_coord_maxObj === null) {
            obj.a_coord_maxObj = {
              a: 0,
              from: obj.from,
              to: obj.to,
            };
          } else {
            obj.a_coord_maxObj.a > obj.leastLineObj.a_coord
              ? null
              : (obj.a_coord_maxObj = {
                  a: obj.leastLineObj.a_coord,
                  from: obj.from,
                  to: obj.to,
                });
          }
          // console.log(obj.leastLineObj.a_coord, obj.a_coord_threshold);
          if (obj.cnt === obj.originArry.length) {
            obj.result = this.createLeastSquareMethodLine({
              originArry: obj.originArry,
              from: obj.a_coord_maxObj.from,
              to: obj.a_coord_maxObj.to,
              isExtendLine: true,
            });
            obj.endLoop = true;
          } else {
            //fromとtoに1を足して、再度最小二乗法を計算
            // let { from, to } = obj.leastLineObj;
            obj.from += 1;
            obj.to += 1;
            obj.leastLineObj = this.createLeastSquareMethodLine({
              originArry: obj.originArry,
              from: obj.from,
              to: obj.to,
              isExtendLine: true,
            });
            obj.endLoop = false;
          }
          // console.log("obj.endLoop", obj.endLoop);
          obj.cnt++;
          return findGoodTePoint_recur(obj);
        }
      };
      let lsmObj = {
        endLoop: false,
        result: null,
        leastLineObj: null,
        startAverage: null,
        cnt: 0,
        a_coord_maxObj: null,

        //set
        floatVolt,
        originArry: logIe_arry,
        lineLength: Math.floor(logIe_arry.length * 0.05), //検証するユニットデータ点数
        from: null,
        to: null,
      };
      let leastLineObj_Te = findGoodTePoint_recur(lsmObj);
      // leastLineObj_Te = this.strateLine(leastLineObj_Te, logIe_arry);

      let logIe_fromto_auto = {
        from: leastLineObj_Te.from,
        to: leastLineObj_Te.to,
      };

      let calcTe_realTime = (leastLineObj) => {
        let a_coord = leastLineObj.a_coord;
        let Te_output = 1 / a_coord;
        // console.log("Te_output", a_coord, Te_output);
        console.log("[Result] Te_act", Te_output.toPrecision(4));

        return Te_output;
      };

      Te = calcTe_realTime(leastLineObj_Te);

      let func_setLeastLineObj = function(leastLineObj_input) {
        /**
         * //this->TeObj
          // console.log(this);
         * from,toの値をGUIで変更した際に再計算するために呼び出される
         *
         */

        //変更を更新
        this.logIe_leastLineObj = leastLineObj_input;
        this.Te = calcTe_realTime(leastLineObj_input);
      };
      //create Object
      let TeObj = {
        //te
        logIe_arry,
        logIe_scatter: this.data2ScatterData(logIe_arry),
        logIe_leastLineObj: leastLineObj_Te,
        logIe_fromto_auto: logIe_fromto_auto,
        func_setLeastLineObj: func_setLeastLineObj, //function
        Te,
      };
      return TeObj;
    },
    calcNe({ isatDataObj, TeObj }) {
      //電子密度計算
      let e = this.cons.e;
      let area = this.cons.probeArea; //[cm^2]
      let isat = isatDataObj.isat; //[mA]
      let kb = this.cons.kb;
      let te = TeObj.Te; //[eV]
      let mi = this.cons.massAtom;

      let ne_isat =
        ((isat * 1e-3) /
          (Math.exp(-1 / 2) * e * area * 1e-4 * Math.sqrt((te * e) / mi))) *
        1e-6;
      //NE=(((Io*1E-3)/(PROS))*(1/(0.6*E))*pow((MI/(TE*E)),0.5))*1E-6;
      // let ne_test =
      //   ((isat * 1e-3) / (area * 1e-4)) *
      //   (1 / (0.6 * e)) *
      //   Math.pow(mi / (te * e), 0.5) *
      //   1e-6;

      console.log("[Result] ne_isat", ne_isat.toPrecision(4));
      // console.log("[Result] ne_test", ne_test.toPrecision(4));

      //create obj
      let NeObj = {
        ne_isat,
      };
      return NeObj;
    },
    calcVs({ formatTextArry, VfObj, TeObj }) {
      //プラズマ電位(空間電位)計算
      //二回微分
      let diffIp_1st = this.calcDiff_y(formatTextArry).map((obj) => {
        return obj.data;
      });
      //エラー部分を除去 (次の点と比較して今の点が100倍以上異なる場合は除去)
      let diffIp_1st_output = diffIp_1st.filter((dot, i) => {
        if (i < diffIp_1st.length - 1) {
          let [cx, cy] = dot;
          let [nx, ny] = diffIp_1st[i + 1];
          let threshold = 30;

          if (
            Math.abs(cy / ny) > threshold ||
            Math.abs(cy / ny) < 1 / threshold
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      });

      let diffIp_2nd = this.calcDiff_y(diffIp_1st).map((obj) => {
        return obj.data;
      });
      // diffIp_2nd = this.calcDotAverage(diffIp_2nd, 2);
      let diffIp_2nd_output = diffIp_2nd.filter((dot, i) => {
        if (i < diffIp_1st.length - 1) {
          let [cx, cy] = dot;
          let [nx, ny] = diffIp_1st[i + 1];
          let threshold = 30;

          if (
            Math.abs(cy / ny) > threshold ||
            Math.abs(cy / ny) < 1 / threshold
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      });

      let diffIp_2nd_scatter = this.data2ScatterData(diffIp_2nd_output);
      let diffData_leastLineObj = null;
      //理論値 Vs=浮遊電位＋シース電位差＋プリシース電位差
      //vsi=vf-1/2*log(2*pi*me/(mp*mass))*te+1/2*te;            % 空間電位（浮遊電位＋シース端電位＋プリシース電位）
      let vf = VfObj.Vf_act;
      let me = this.cons.me;
      let mi = this.cons.massAtom;
      let te = TeObj.Te;
      let Vs_calc =
        vf + (1 / 2) * Math.log(mi / (2 * Math.PI * me)) * te + (1 / 2) * te;
      console.log("[Result] Vs_calc", Vs_calc.toPrecision(4));
      //create Obj
      let VsObj = {
        diffIp_2nd_scatter,
        diffData_leastLineObj,
        Vs_calc,
      };
      return VsObj;
    },
    calcDebyLength({ NeObj, TeObj }) {
      //デバイ長計算
      let ep0 = this.cons.ep0;
      let e = this.cons.e;
      let Te = TeObj.Te;
      // let Te = 1;
      let Ne = NeObj.ne_isat * 1e6; //[m^-3]
      // let Ne = 1e16; //[m^-3]
      let debyLength = Math.sqrt((ep0 * Te) / (Ne * e)); //[m]
      debyLength = debyLength * 1000; //[mm]
      console.log(
        "[Result] debyLength[mm]",
        Number(debyLength.toPrecision(4)).toExponential()
      );
      return debyLength;
    },

    ////////////////////////////
    //helper
    ////////////////////////////
    _cp(val) {
      return JSON.parse(JSON.stringify(val));
    },
  },
  watch: {},
  beforeCreate() {},
  mounted() {
    // console.log(initData.gasTypes);
    // this.createChartVI();
  },
  components: {
    TopHeader,
    TopFooter,
    ChartContainer,
    TableComponent,
  },
};
</script>

<style lang="scss">
.input-file-label {
  // color: red;
}
#TopCalc {
  // display: flex;
  // justify-content: center;
  margin: 0 auto;
  // padding: 10px 0;
  width: 80vw;
  min-width: 900px;
  // overflow: scroll;
  // max-width: 1500px;

  // border: solid 1px #bbb;
  // border-radius: 2%;
  // height: 100vh;
  .TopCalcContainer_lg {
    height: 80vh;
    overflow: scroll;
  }

  .TopCalcContainer_md {
    height: 60vh;
    overflow: scroll;
  }
}
#ScopedGraphViewer {
  // position: absolute;
  // background-color: white;
  margin: 0 auto;

  padding: 10px 0;
  border: solid 1px #bbb;
  border-radius: 2%;
  // height: 100%;
}
#TopSetFiles {
  margin: 0 auto;
  width: 80vw;
  min-width: 900px;

  #files {
    padding: 10px 0;
    border: solid 1px #bbb;
    border-radius: 2%;
  }
}

#TopSetParams {
  width: 80vw;
  min-width: 900px;

  margin: 0 auto;

  #initParameter {
    padding: 10px 0;
    border: solid 1px #bbb;
    border-radius: 2%;
  }
}
</style>
