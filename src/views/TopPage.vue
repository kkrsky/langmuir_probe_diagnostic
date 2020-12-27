<template>
  <div>
    <v-navigation-drawer v-model="isShowDrower" absolute temporary>
      <!-- v-show="isShowDrower"-->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Calculator
          </v-list-item-title>
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
      <p>main</p>
      <table-component></table-component>
      <!-- ---------- -->
      <!-- TopCalc -->
      <!-- ---------- -->

      <div id="TopCalc" v-if="isShowDisplayCalc">
        <h3>グラフ</h3>
        <span>{{ files.length }}ファイル</span>
        <div class="TopCalc-container">
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

      <!-- ---------- -->
      <!-- ScopedGraphViewer -->
      <!-- ---------- -->

      <!-- ---------- -->
      <!-- TopSetting -->
      <!-- ---------- -->
      <div id="TopSetting" v-show="isShowDisplaySetting">
        <div id="files">
          <h3>ファイル操作</h3>
          <div class="mt-5"></div>
          <v-select
            v-model="inputUnitVoltSelected"
            :value="inputUnitVoltSelected"
            :items="inputUnitVoltList"
            label="input unit Volt"
            outlined
          ></v-select>
          <v-select
            v-model="inputUnitAmpereSelected"
            :value="inputUnitAmpereSelected"
            :items="inputUnitAmpereList"
            label="input unit Ampere"
            outlined
          ></v-select>
          <p>※入力ファイルは[V,A]の順</p>
          <p>※出力は[V,mA]</p>
          <input type="file" @change="onInputFiles" multiple />
          <v-btn @click="onOutputFiles">csv出力</v-btn>
        </div>
        <div id="initParameter">
          <h3>初期条件設定</h3>
          <div class="mt-5"></div>
          <v-text-field
            v-model="areaOfProbe"
            label="Area of probe [cm^2]"
            outlined
            clearable
          ></v-text-field>
          <v-select
            value="Ar"
            :items="gasType"
            label="Gas Type"
            outlined
            @change="onChangeGasType"
          ></v-select>
          <v-text-field
            v-model="gasTypeMassSelect"
            label="Mass of Atom [kg]"
            outlined
            :readonly="!isOtherGasType"
          ></v-text-field>
        </div>
      </div>

      <v-container>
        <p>container</p>
      </v-container>
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
      },

      ////////////////////////////
      //Top Setting data
      ////////////////////////////
      isShowDisplaySetting: true,
      isShowDisplayCalc: true,
      // isShowScopedGraphViewer: false,
      areaOfProbe: 0.097075213,
      gasType: ["Ar", "H2", "Other"],
      gasTypeMassSelect: 6.63385357335952 * Math.pow(10, -26),
      gasTypeMassList: [
        6.63385357335952 * Math.pow(10, -26),
        1.67355769346049 * Math.pow(10, -27),
      ],
      isOtherGasType: false,

      ////////////////////////////
      //Top calc data
      ////////////////////////////
      test: {
        // least: null,
      },
    };
  },
  computed: {},
  methods: {
    test2() {
      console.log(this.files);
      let tes = this.$store.state.main.chartList;
      console.log(tes);
      // let tes2 = [
      //   // { x: 200, y: 100 },
      //   // { x: 250, y: 150 },
      //   [200, 100],
      //   [250, 150],
      // ];
      // let tes3 = this.leastSquareMethod(tes2);
      // console.log("ab", tes3);
      let obj = {
        a: 2,
        // b: -1,
        x: 1,
        // y: 0,
      };
      let a = 2;
      let b = -1;
      let tes2 = this.calcLinerPoint({ a, b, y: 0 });
      console.log(tes2);
      // this.calcFloatingPotential();
      let formatTextArry = [
        [-29.99875, -0.1926354],
        [-28.17934, -0.1876809],
        [-21.51288, -0.1747713],
        [-0.2997811, -0.1130338999999],
        [0.3113615, -0.1080423],
        [2.727842, -0.02973658],
        [3.338421, 0.02863798],
      ];

      // this.calcIonSatAct({ floatVolt: 1, formatTextArry });

      let tes3 = this.calcDiff_y(formatTextArry);
      console.log(tes3);
    },
    setChange(target, changeVal, file) {
      switch (target) {
        case "from": {
          //getter
          let leastLineObj_origin = file.isatDataObj.diffData_leastLineObj;
          let dataArry = file.isatDataObj.diffData_arry;
          let to = leastLineObj_origin.to;
          let from = leastLineObj_origin.from;

          //treat
          from = changeVal;
          let leastLineObj_new = this.createLeastSquareMethodLine({
            originArry: dataArry,
            from,
            to,
          });

          //setter
          file.isatDataObj.diffData_leastLineObj = leastLineObj_new;
          // console.log("leastLineObj_origin after", leastLineObj_origin);
          break;
        }
        case "to": {
          //getter
          let leastLineObj_origin = file.isatDataObj.diffData_leastLineObj;
          let dataArry = file.isatDataObj.diffData_arry;
          let to = leastLineObj_origin.to;
          let from = leastLineObj_origin.from;

          //treat
          to = changeVal;
          let leastLineObj_new = this.createLeastSquareMethodLine({
            originArry: dataArry,
            from,
            to,
          });

          //setter
          file.isatDataObj.diffData_leastLineObj = leastLineObj_new;
          break;
        }
        default: {
          console.error("pls set proper target name:", target);
        }
      }
    },
    ////////////////////////////
    //files
    ////////////////////////////
    onInputFiles(event) {
      const files = event.target.files;
      let readerArry = [];

      for (let i = 0; i < files.length; i++) {
        let currentFile = files[i];
        readerArry[i] = new FileReader();
        readerArry[i].onload = (e) => {
          //text format
          let attribute = "normal"; //normal:通常,scoped:拡大表示
          let chartName = "chartVI";
          let fileName = currentFile.name;
          let name = fileName.split(".txt").shift();
          let rawText = e.target.result;
          let formatTextArry = this.rawTextData2Obj(rawText);
          let scatterData = this.data2ScatterData(formatTextArry);
          let floatVolt = this.calcFloatVolt(formatTextArry);
          let isatDataObj = this.calcIonSatAct({
            floatVolt,
            formatTextArry,
          });

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
            let obj = {
              id: id,
              attribute: attribute,
              name: name,
              fileName: fileName,
              rawText: rawText,
              formatText: formatTextArry,
              scatterData: scatterData,

              data: null,
              floatVolt: floatVolt,
              isatDataObj,
            };

            this.files.push(obj);
          } else {
            window.alert(
              "正しいデータフォーマットのファイルを入力してください。:" +
                fileName
            );
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
      if (this.outputFiles.length === 0) {
        window.alert("ファイルを入力してください。");
      } else {
        new CSV(this.outputFiles).save("__Langmuir_probe_diagnostic__.csv");
      }
    },
    // onInputDataTypeType(selectVal) {
    //   this.inputDataTypeSelected = selectVal;
    // },
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

      try {
        rawTextData = rawTextData.map((val) => {
          return val.split("	").map((num, i) => {
            if (i === 0) return Number(num) * unitV;
            else if (i === 1) return Number(num) * unitA;
            else {
              console.log("error: text file is not expected format");
            }
          });
        });

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
      }
    },
    ////////////////////////////
    //Top Setting data
    ////////////////////////////
    onChangeGasType(selectVal) {
      // console.log("selectVal:", selectVal);
      if (selectVal === "Other") {
        this.isOtherGasType = true;
      } else {
        this.isOtherGasType = false;
        switch (selectVal) {
          case "Ar": {
            this.gasTypeMassSelect = this.gasTypeMassList[0];
            break;
          }
          case "H2": {
            this.gasTypeMassSelect = this.gasTypeMassList[1];
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
       */
      let item = arry2D.map((dot, i) => {
        if (i < arry2D.length - 1) {
          let [cx, cy] = dot;
          let [nx, ny] = arry2D[i + 1];

          //単位xあたりのy増加量
          let diff_y = (ny - cy) / (nx - cx);
          return [i, diff_y];
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
          output.push([i, ave]);
          temp = [];
        } else {
          temp.push(cy);
        }
      }
      return output;
    },
    createLeastSquareMethodLine({ originArry, from, to }) {
      let from_i = 0;
      let to_i = 0;
      let originArry_edit = this._cp(originArry);
      if (from !== undefined && to !== undefined) {
        from_i = from - 1; //indexに変換
        to_i = to - 1;
        if (from_i < 0) window.alert("fromの値を自然数で入力してください。");
        originArry_edit = originArry.slice(from_i, to);
      } else {
        from_i = 0;
        to_i = originArry_edit.length - 1;
      }

      let { a, b } = this.leastSquareMethod(originArry_edit);
      let output = [];
      let current;
      console.log("to", to, to_i, originArry.length - 1);
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
      let outputObj = {
        lineData: output,
        lineData_scatter: this.data2ScatterData(output),
        from,
        to,
        a_coord: a,
        b_coord: b,
      };

      return outputObj;
    },
    //action
    calcFloatVolt(formatText) {
      /**
       * @param {Array} formatText [[0,0],...]
       */
      let maxLoop = formatText.length;
      let checkVoltArry = [];

      for (let i = 0; i < maxLoop; i++) {
        let [cx, cy] = formatText[i];
        let isFirstData = true;

        if (cy > 0) {
          if (isFirstData) {
            //最初のデータ
            checkVoltArry.push([cx, cy]);

            //これ以降でy軸が負となるデータを検出
            for (let j = i + 1; j < maxLoop; j++) {
              if (j === maxLoop - 1) break;
              let [nx, ny] = formatText[j];
              let [nx2, ny2] = formatText[j + 1];

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
      console.log("checkVoltArry", checkVoltArry);
      let { a, b } = this.leastSquareMethod(checkVoltArry);
      let meanFloatVolt = this.calcLinerPoint({ a, b, y: 0 });
      return meanFloatVolt;
    },
    calcIonSatAct({ floatVolt, formatTextArry }) {
      let calcRange = formatTextArry.filter((line) => {
        return line[0] < floatVolt;
      });

      //y軸増加分を計算
      let diff_y = this.calcDiff_y(calcRange);

      //エラー部分を除去 (次の点と比較して今の点が10倍以上異なる場合は除去)
      let diff_y_output = diff_y.filter((dot, i) => {
        if (i < diff_y.length - 1) {
          let [cx, cy] = dot;
          let [nx, ny] = diff_y[i + 1];
          let threshold = 10;

          if (cy / ny > threshold) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      });

      //average
      let calcAveArry = diff_y_output.map((val) => {
        return val[1];
      });
      let diffAverage =
        calcAveArry.slice().reduce((acc, val) => {
          return (acc += val);
        }) / diff_y_output.length;
      // console.log("diffAverage", diffAverage);

      //エラー除去②、平均よりも10倍以上高い場合は除去
      diff_y_output = diff_y_output.filter((dot, i) => {
        let [cx, cy] = dot;
        let threshold = 10;
        if (cy / diffAverage > threshold) return false;
        else return true;
      });

      // let diff_y_output_ave = this.calcDotAverage(diff_y_output, 2);
      // // let diff_y_output3 = this.calcDiff_y(diff_y_output2);

      // //エラー部分を除去 (前の点と比較して10倍以上異なる場合は除去)
      // let diff_y_output2 = diff_y_output_ave.filter((dot, i) => {
      //   if (i < diff_y_output_ave.length - 1) {
      //     let [cx, cy] = dot;
      //     let [nx, ny] = diff_y_output_ave[i + 1];
      //     let threshold = 10;

      //     if (cy / ny > threshold) {
      //       return false;
      //     } else {
      //       return true;
      //     }
      //   } else {
      //     return false;
      //   }
      // });

      // let least = this.leastSquareMethod(diff_y_output_ave);
      // console.log("least", least);
      // this.test.least = least.a;

      let outputObj = {
        diffData_arry: diff_y_output,
        diffData_scatter: this.data2ScatterData(diff_y_output),
        diffData_leastLineObj: this.createLeastSquareMethodLine({
          originArry: diff_y_output,
        }),
        isat: null,
      };

      // console.log("diffData_leastLineObj", outputObj.diffData_leastLineObj);
      return outputObj;
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
#TopCalc {
  padding: 10px 0;
  border: solid 1px #bbb;
  border-radius: 2%;
  // height: 100vh;
  .TopCalc-container {
    height: 60vh;
    overflow: scroll;
  }
}
#ScopedGraphViewer {
  // position: absolute;
  // background-color: white;
  padding: 10px 0;
  border: solid 1px #bbb;
  border-radius: 2%;
  // height: 100%;
}
#TopSetting {
  #files {
    padding: 10px 0;
    border: solid 1px #bbb;
    border-radius: 2%;
  }
  #initParameter {
    padding: 10px 0;
    border: solid 1px #bbb;
    border-radius: 2%;
  }
}
</style>
