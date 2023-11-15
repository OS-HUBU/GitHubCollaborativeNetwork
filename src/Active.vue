<template>
  <div class="Active">
    <div id="con"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "APP",
  props: {
    teamInfo: {
      type: Object,
      default: '',
    },
    teamNameList:[]
  },
  watch: {
    teamInfo: {
      handler: function (news, old) {
         this.currentTeam = news.name.slice(2,news.name.length);
         console.log(this.currentTeam);
         let index=-1;
         for(let i=0;i<this.lastData.length;i++)
         {
          if(this.lastData[i][0]==this.currentTeam)
          {
            index =i;
            break;
          }
         }
         if(index >=0)
         {
          this.myChart.dispatchAction({
            type: 'showTip',
            seriesIndex:0,  // 显示第几个series
            dataIndex:index,
            //name: '6' // 显示第几个数据
            // x:10,
            // y:1
          });
          }
          else{
            this.myChart.dispatchAction({
            type: 'hideTip',
          });
          this.myChart.dispatchAction({
            type: 'updateAxisPointer',
            currTrigger: 'leave'
          })
          }
        // let arr = JSON.parse(sessionStorage.getItem('links'));
        // this.relationList = arr.filter(item => item.source === this.currentTeam)
        // console.log(this.relationList);
        // const arr1 = this.relationList;
        // console.log(arr1);
        // this.teamList = arr1.map(item=>item.target);
        // this.teamValue = arr1.map(item=>item.value);
        // console.log(this.teamList);
        //this.updateChart();
      },
    },
    teamNameList:{
      handler: function (news, old) {
         this.lastData=[];
         let data1=[];
         let data2=[]
        console.log(news);
        // 深拷贝
        this.listName = news.slice(0);
        for(let i=0;i<this.listName.length;i++){
          this.listName[i]=parseInt(this.listName[i].slice(2,this.listName[i].length));
      }
      this.listName.sort((a,b)=>a-b);
      console.log(this.listName);
      this.category = JSON.parse(sessionStorage.getItem('category'));
      console.log(this.category);
      // 将所有的links数据进行处理
      let arr = JSON.parse(sessionStorage.getItem('links'));
        console.log(arr);
        for(let i=0;i<arr.length;i++)
        {
          arr[i].source=parseInt(arr[i].source.slice(2,arr[i].source.length));
          arr[i].target=parseInt(arr[i].target.slice(2,arr[i].source.length));
          data1.push([arr[i].source+'',arr[i].target+'',arr[i].value])
        }
        for (let i = 0; i < this.listName.length; i++) {
          for (let j = 0; j < data1.length; j++) {
            if(this.listName[i]==data1[j][0]){
              data2.push(data1[j])
            }
          }
        }
        // 筛选出该分类所有的links
        console.log(data2);
        let arr5=[]
        for(let i=0;i<data2.length;i++){
          for(let j=0;j<this.listName.length;j++){
            if(data2[i][1]==this.listName[j]){
              this.lastData.push(data2[i])
              arr5.push(this.listName[j]);
            }
          }
        }
        let newList = Array.from(new Set(arr5));
        newList.sort((a,b)=>a-b);
        this.listName = newList;
        console.log(newList);
        console.log(arr5);
        console.log(this.lastData);


      //   this.endData=this.endData.map(function (item) {
      //     return [item[1], item[0], item[2] || '-'];
      // })
        console.log(this.lastData);
        this.updateChart();
        this.myChart.dispatchAction({
            type: 'hideTip',
          });
          this.myChart.dispatchAction({
            type: 'updateAxisPointer',
            currTrigger: 'leave'
          })
      }
    }
  },
  data() {
    return {
      currentTeam: '',
      category:'',
      relationList: [],
      teamList:[],
      teamValue:[],
      listName:[],
      myChart: null,
      lastData:[],
    };
  },
  methods: {
    updateChart() {
      var chartDom = document.getElementById("con");
      this.myChart = echarts.init(chartDom,null, {
          renderer: "svg", // 设置渲染方式为 SVG
      });
      var option = {
       
        tooltip: {
          show:true,
          trigger:'axis',
          
          axisPointer:{
            type : 'shadow'
          },
          formatter:function(params){
            var xName = params[0].data[0];
            var str = '团队'+xName+ '与其他团队协作关系指数<br/>'
            //var str = '团队'+xName+'与下列团队'+ '<br/>'+'的协作关系指数：' + '<br/>'
            params.forEach((item,idx)=>{
              str+='<div style="display:inline-block"><div style="display:inline-block;width:10px;height:10px;border-radius: 50%;margin:6px 4px 0 0;background:#0af3ff"></div>团队'+item.data[1]+':'+item.data[2]+'</div>&emsp;';
              if((idx+1)%3==0){
                str+='<br/>'
              }
            })
            return str;
          },
        },
        grid: {
          bottom:'20%',
          left:'3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: this.listName,
          splitArea: {
            show: true
          },
          axisLabel: {
            textStyle: {
                //改变xy轴上文字的颜色
                color: "#FFF",
            },
          }
        },
        yAxis: {
          type: 'category',
          data: this.listName,
          splitArea: {
            show: true
          },
          axisLabel: {
            textStyle: {
                //改变xy轴上文字的颜色
                color: "#FFF",
                
            },
          }
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '1%',
          textStyle:{
            color:'#fff'
          },
        },
        series: [
          {
            name: 'Punch Card',
            type: 'heatmap',
            data: this.lastData,
            label: {
              show: true
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.myChart.setOption(option);
    },
  },
  created() {
  },
  mounted() {
    this.updateChart();
  },
};
</script>
<style lang="less" scoped>

#con {
  height: 100%;
}
</style>
