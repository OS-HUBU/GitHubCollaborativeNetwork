<template>
  <div class="Grade">
      <i class="el-icon-back icon" @click="reback()"></i>
      <div id="content"></div> 
  </div>
</template>
<script>
import * as echarts from "echarts";
import readFile from "./utils/utils.js";
export default {
  name: "APP",
  props: {
    teamInfo: {
      type: Object,
      default: {},
    },
  },
  watch: {
    teamInfo: {
      handler: function (news, old) {
        this.currentStatus=true;
         
      this.$emit("changeStatus",this.currentStatus)
        this.source = news.data.map((i) => i.loginName);
        this.grade = news.data.map((i) => i.grade + "级");
        
        // let obj = {};
        // let res = readFile("./links.txt");
        // res.split(/\r?\n/).forEach((line, index) => {
        //   obj = {};
        //   let vertices = line.split("|");
        //   let login1Name = vertices[1].trim();
        //   let login2Name = vertices[2].trim();
        //   let link = vertices[3].trim();

        //   obj["source"] = this.source.findIndex((e) => e === login1Name);
        //   obj["target"] = this.source.findIndex((e) => e === login2Name);

        //   obj["value"] = link;
        //   obj["label"] = { show: true, formatter: "{@value}" };
        //   if (obj.source !== -1 && obj.target !== -1) {
        //     this.links.push(obj);
        //   }
        // });
        this.updateChart2();
        //this.draw();
      },
    },
  },
  data() {
    return {
      allGrade:[],
      currentStatus:false,
      source: [],
      grade: [],
      myChart: null,
    };
  },
  methods: {
    updateChart1(){
    
      var chartDom = document.getElementById("content");
      this.myChart = echarts.init(chartDom);
      const gradeList = JSON.parse(localStorage.getItem('gradeList'));
      this.allGrade = gradeList.map(item=>item.num);
      const endGrade = this.allGrade.pop();
      this.allGrade.unshift(endGrade);
      var option = {
        grid: {
          bottom: "1%",
          left: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [ "S级", "A级", "B级", "C级", "D级"],
          axisTick: { show: false },
          axisLabel: {
            interval: 0,
            rotate: 0,
            textStyle: {
              //改变xy轴上文字的颜色
              color: "#FFF",
            },
          },
        },
        yAxis: {
          type: "value",
          name:'人数(个)',
          splitLine: { show: false },
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              //改变xy轴上文字的颜色
              color: "#FFF",
            },
          },
        },
        tooltip: {
          show: true,
          trigger: "item",
         
        },
        series: [
          {
            barMaxWidth: 60,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "transparent",
            },
            data: this.allGrade,
            itemStyle: {
              //borderRadius:[50,50,0,0],
              color: function (params) { 
                var colorList = ['#0af3ff','#ffa12f','#b62aff','#29f463','#6e67ff'];
                return colorList[params.dataIndex]
              },
            },
          },
        ],
      };
      this.myChart.setOption(option);
    },
    updateChart2() {
      var option = {
       
        
        grid: {
          bottom: "1%",
          left: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisTick: { show: false },
          axisLabel: {
            interval: 0,
            rotate: 40,
            textStyle: {
              //改变xy轴上文字的颜色
              color: "#FFF",
            },
          },
          data: this.source,
        },
        yAxis: {
          type: "category",
          data: ["", "D级", "C级", "B级", "A级", "S级"],
          splitLine: { show: false },
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              //改变xy轴上文字的颜色
              color: "#FFF",
            },
          },
        },
        tooltip: {
          show: true,
          trigger: "item",
        },
        series: [
          {
            barMaxWidth: 60,
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "transparent",
            },
            data: this.grade,
            itemStyle: {
              color: function (params) {
                console.log(params.value);
                if (params.value == "S级") {
                  return "#0af3ff";
                } else if (params.value == "A级") {
                  return "#ffa12f";
                } else if (params.value == "B级") {
                  return "#b62aff";
                } else if (params.value == "C级") {
                  return "#29f463";
                } else {
                  return "#6e67ff";
                }
              },
            },
          },
        ],
      };
      this.myChart.setOption(option);
    },
    reback() {
      //首先检查teaminfo是否为空
      if (!this.teamInfo.data) {
        this.currentStatus=false;
        this.updateChart1();
      }else{
        if(this.currentStatus){
          this.currentStatus = false;
          this.updateChart1();
        } else {
          this.currentStatus = !this.currentStatus;
          this.updateChart2();
        }
      }
     
      this.$emit("changeStatus",this.currentStatus)
    },
  },
  created() {

  },
  mounted() {
    this.updateChart1();
     
    this.$emit("changeStatus",this.currentStatus)
  },
};
</script>
<style lang="less" scoped>
.icon {
  position: absolute;
  top: 12px;
  left: 20px;
  z-index: 99999;
  color: #fff;
  cursor: pointer;
  font-size: 1.1rem;
}
#content {
  height: 100%;
}
</style>
