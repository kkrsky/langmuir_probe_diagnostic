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
      <!-- Provides the application the proper gutter -->
      <!-- <p>this is tes dev</p> -->
      <!-- file input -->
      <div id="TopCalc" v-if="isShowDisplayCalc">
        <h3>グラフ</h3>
        <span>{{ files.length }}ファイル</span>
        <div class="TopCalc-container">
          <div class="graph-container">
            <!-- <chart-container :files="files"></chart-container> -->

            <div class="each-chart" v-for="file in files" :key="file.fileName">
              <chart-container :file="file"></chart-container>
            </div>
            <v-divider></v-divider>
          </div>
          <div class="result-container">bb</div>
          <div class="setting-container">aa</div>
        </div>
      </div>
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
      isShowDrower: false,
      /**
       * //methods data
       */
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
    };
  },
  computed: {},
  methods: {
    test() {
      console.log(this.files);
      let tes = this.$store.state.main.chartList;
      console.log(tes);
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
          let chartName = "chartVI";
          let fileName = currentFile.name;
          let name = fileName.split(".txt").shift();
          let rawText = e.target.result;
          let formatTextArry = this.rawTextData2Obj(rawText);
          let scatterData = this.data2ScatterData(formatTextArry);

          // //create chart
          // let addChartObj = {
          //   chartName: chartName,
          //   labelName: name,
          //   setDataArry: scatterData,
          // };

          // this.createChartVI(addChartObj);
          // this.addChartArryData(addChartObj);

          //create file obj
          let obj = {
            name: name,
            fileName: fileName,
            rawText: rawText,
            formatText: formatTextArry,
            scatterData: scatterData,
            data: null,
          };

          this.files.push(obj);
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
          this.test();
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

    //action
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
    height: 52vh;
    overflow: scroll;

    display: grid;
    grid-template:
      "graph  result" 50%
      "graph  setting" 50%
      / #{$__graph-height} 1fr;

    .title-container {
      grid-area: title;
      justify-self: flex-start;
      align-self: center;
      font-size: 1rem;
    }
    .graph-container {
      grid-area: graph;
      justify-self: flex-start;
      align-self: center;
      height: 100%;
    }
    .result-container {
      grid-area: result;
      justify-self: flex-start;
      align-self: center;
      font-size: 40px;
      height: 100%;
    }
    .setting-container {
      grid-area: setting;
      justify-self: flex-start;
      align-self: center;
      height: 100%;
    }
  }
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
