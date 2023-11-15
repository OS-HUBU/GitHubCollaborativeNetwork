<template>
  <div class="container">
    <!--顶部盒子-->
    <div class="top">
      <div class="top_center">Github协作网络可视化</div>
      <!-- <ul class="weather">
					<li>2018-05-19<span>&nbsp;</span><span>11:00</span></li>
					<li><span><img src="img/icon_weather/0.png">&nbsp;</span>多云</li>
					<li>27度</li>
					<li>微风三级</li>
					<li>AQI&nbsp;<span>良</span></li>
				</ul> -->
    </div>
    <!--第一页中间部分的盒子-->
    <div class="main_box">
      <div class="main_left">
        <!-- 左侧的盒子 -->
        <div class="left_top">
          <span class="j_1"></span>
          <span class="j_2"></span>
          <span class="j_3"></span>
          <span class="j_4"></span>
          <div class="title">
            <img src="~@/img/page1/icon4.png" style="margin-left: 38px" />
            {{
              status && teamInfo.name
                ? teamInfo.name + "开发者价值分布"
                : "全部团队的开发者价值分布"
            }}
          </div>
          <div
            class="data_sjjm"
            v-show="!status"
            style="height: 10px; padding: 0"
          >
            <div class="data_box2">
              <div class="data_title">S级</div>
              <font
                class="font huangse"
                face="font01"
                style="color: #0af9ff; font-size: 20px"
                >{{ (gradeList[4]?.num / 10000).toFixed(1) + "万" }}</font
              >
              <span>个</span>
            </div>

            <div class="data_box2">
              <div class="data_title">A级</div>
              <font
                class="font qianlan"
                face="font01"
                style="color: #e2a441; font-size: 20px"
                >{{ (gradeList[0]?.num / 10000).toFixed(1) + "万" }}</font
              >
              <span>个</span>
            </div>
            <div class="data_box2">
              <div class="data_title">B级</div>
              <font
                class="font shenlan"
                face="font01"
                style="color: #c82eff; font-size: 20px"
                >{{ (gradeList[1]?.num / 10000).toFixed(1) + "万" }}</font
              >
              <span>个</span>
            </div>
            <div class="data_box2">
              <div class="data_title">C级</div>
              <font
                class="font zise"
                face="font01"
                style="color: #2dff6c; font-size: 20px"
                >{{ (gradeList[2]?.num / 10000).toFixed(1) + "万" }}</font
              >
              <span>个</span>
            </div>
            <div class="data_box2">
              <div class="data_title">D级</div>
              <font
                class="font qianlan"
                face="font01"
                style="color: #7971ff; font-size: 20px"
                >{{ (gradeList[3]?.num / 10000).toFixed(1) + "万" }}</font
              >
              <span>个</span>
            </div>
          </div>
          <Grade
            :teamInfo="teamInfo"
            class="grade"
            @changeStatus="changeStatus"
          ></Grade>
        </div>

        <div class="left_bottom">
          <span class="j_1"></span>
          <span class="j_2"></span>
          <span class="j_3"></span>
          <span class="j_4"></span>
          <div class="title">
            <img src="~@/img/page1/icon6.png" style="margin-left: 38px" />{{
              category ? "活跃度在" + category + "团队协作关系指数" : ""
            }}
          </div>

          <Active
            :teamInfo="teamInfo"
            :teamNameList="teamNameList"
            class="active"
          ></Active>
        </div>
      </div>

      <div class="main_center">
        <div class="center_top">
          <span class="j_1"></span>
          <span class="j_2"></span>
          <span class="j_3"></span>
          <span class="j_4"></span>
          <div class="title">
            <img src="~@/img/page1/icon3.png" />团队协作网络图
          </div>

          <div class="lengend">
            <div @click="lengendClick(1)" class="father">
              <div class="len" style="background-color: #6e35ff"></div>
              <span>团队活跃度在0-300</span>
            </div>
            <div @click="lengendClick(2)" class="father">
              <div
                class="len"
                style="background-color: #00c7ef; margin-bottom: 2px"
              ></div>
              <span>团队活跃度在300-900</span>
            </div>
            <div @click="lengendClick(3)" class="father">
              <div class="len" style="background-color: #ff8e14"></div>
              <span>团队活跃度在900以上</span>
            </div>
          </div>

          <div id="main"></div>
        </div>
      </div>

      <div class="main_right">
        <div class="right_top">
          <span class="j_1"></span>
          <span class="j_2"></span>
          <span class="j_3"></span>
          <span class="j_4"></span>
          <div class="title">
            <i
              class="el-icon-back"
              style="
                float: left;
                cursor: pointer;
                color: #fff;
                line-height: 40px;
              "
              @click="reback(1)"
            ></i
            ><img src="~@/img/page1/icon5.png" />
            {{ tableChange ? teamInfo.name + "成员详情" : "团队top10" }}
          </div>

          <!-- 右侧表格 -->
          <div class="top">
            <el-card class="box-card">
              <el-table
                v-if="tableChange"
                :data="teamInfo?.data"
                style="width: 100%; background-color: transparent; color: #fff"
              >
                <el-table-column
                  prop="loginName"
                  label="成员用户名"
                  width="180px"
                >
                </el-table-column>
                <el-table-column prop="activeNum" label="活跃度" >
                </el-table-column>
                <el-table-column prop="grade" label="评级" > </el-table-column>
                <el-table-column prop="score" label="分数" > </el-table-column>
              </el-table>

              <el-table
                v-else
                :data="dataTop"
                style="width: 100%; background-color: transparent; color: #fff"
              >
                <el-table-column prop="name" label="团队名称" >
                </el-table-column>
                <el-table-column prop="active" label="团队活跃度" >
                </el-table-column>
                <el-table-column prop="data.length" label="团队人数">
                </el-table-column>
              </el-table>
            </el-card>
          </div>
        </div>
        <div class="right_bottom">
          <span class="j_1"></span>
          <span class="j_2"></span>
          <span class="j_3"></span>
          <span class="j_4"></span>
          <div class="title">
            <img src="~@/img/page1/icon1.png" style="margin-left: 38px" />
            {{
              teamChange ? teamInfo.name + "成员合作关系详情图" : "团队分类占比"
            }}
          </div>

          <ul class="home_data" v-show="!teamChange">
            <li class="home_data_one">
              <div class="home_data_num">
                <font class="font1" face="font01" style="color: #6e35ff">{{
                  cate[0]?.value
                }}</font>
                <span>个</span>
              </div>
              <div class="home_data_name">0-300</div>
            </li>
            <li class="home_data_two">
              <div class="home_data_num">
                <font class="font1" face="font01" style="color: #00c7ef">{{
                  cate[1]?.value
                }}</font>
                <span>个</span>
              </div>
              <div class="home_data_name">300-900</div>
            </li>
            <li class="home_data_three">
              <div class="home_data_num">
                <font class="font1" face="font01" style="color: #ff8e14">{{
                  cate[2]?.value
                }}</font>
                <span>个</span>
              </div>
              <div class="home_data_name">900以上</div>
            </li>
          </ul>

          <!-- <div class="data_sjjm" v-show="!teamChange">
							<div class="data_box2">
								<div class="data_title">0-300</div>
								<font class="font qianlan" face="font01">{{ cate[0]?.value }}</font>
								<span>个</span>
							</div>
							<div class="data_box2">
								<div class="data_title">300-900</div>
								<font class="font shenlan" face="font01">{{ cate[1]?.value }}</font>
								<span>个</span>
							</div>
							<div class="data_box2">
								<div class="data_title">900以上</div>
								<font class="font zise" face="font01">{{ cate[2]?.value }}</font>
								<span>个</span>
							</div>
						</div> -->
          <!-- 右侧团队详情图 -->
          <div id="bot">
            <i class="el-icon-back icon" @click="reback(2)"></i>
            <div id="container"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import readFile from "./utils/utils.js";
import Team from "./Team.vue";
import Grade from "./Grade.vue";
import Active from "./Active.vue";

export default {
  name: "",
  components: {
    Team,
    Grade,
    Active,
  },
  watch: {
    teamList: {
      handler: function (news, old) {
        function getData(team, userList) {
          console.log(team);
          var arr = [];
          var arr1 = [];
          var arr2 = [];
          var arr3 = [];

          let cate = [
            {
              value: 0,
              name: "0-300",
              itemStyle: {
                color: "#6E35FF",
              },
              label: {
                fontStyle: "normal",
              },
            },
            {
              value: 0,
              name: "300-900",
              itemStyle: {
                color: "#00c7ef",
              },
              label: {
                fontStyle: "normal",
              },
            },
            {
              value: 0,
              name: "900以上",
              itemStyle: {
                color: "#FF8E14",
              },
              label: {
                fontStyle: "normal",
              },
            },
          ];
          for (let i = 1; i <= team.length; i++) {
            let obj = {
              name: "团队" + i,
              value: i,
              data: [],
              label: {
                position: "inside",
                rotate: 0,
              },
            };
            let teamActive = 0;
            // 设置节点大小
            let symbolSize;
            let color;
            for (let index = 0; index < team[i - 1].length; index++) {
              const element = team[i - 1][index];
              let current = userList.filter(
                (user) => user.loginName === element
              )[0];

              //错误处理找不到用户
              if (!current) {
                current = {
                  activeNum: 0,
                  grade: "D",
                  loginName: element,
                  score: 0,
                };
              }
              // console.log(current,element)
              teamActive += current.activeNum;
              obj.data.push(current);
            }
            if (team[i - 1].length > 15) {
              symbolSize = 30;
            } else {
              symbolSize = team[i - 1].length * 2;
            }
            if (teamActive < 300) {
              obj.category = 0;
              // symbolSize = Math.floor((teamActive / 10));
              // if(symbolSize>30)symbolSize=30;
              cate[0].value++;
              color = {
                c1: "#6E35FF",
                c2: "#6E67FF",
              };
            } else if (teamActive < 900) {
              obj.category = 1;
              // symbolSize = Math.floor((teamActive / 100) *2);
              // if(symbolSize>30)symbolSize=30;
              cate[1].value++;
              color = {
                c1: "#00c7ef",
                c2: "#0AF3FF",
              };
            } else {
              obj.category = 2;
              // symbolSize = Math.floor(teamActive / 100);
              // if (symbolSize > 300) symbolSize = 30;
              cate[2].value++;
              color = {
                c1: "#FF8E14",
                c2: "#FFA12F",
              };
            }

            obj.active = teamActive;

            // switch (idx) {
            //   case 0:
            //     symbolSize = 70;
            //     break;
            //   case 1:
            //     symbolSize = 15;
            //     break;
            //   default:
            //     symbolSize = 10;
            //     break;
            // }

            // 每个节点所对应的文本标签的样式。

            // let color = colors.find((itemm, eq) => eq == (i + 1) % 10);
            // legend.push(item.category);

            // 设置线条颜色;
            let lineStyle = null;

            // 设置节点样式
            let bgcolor = {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0,
                  color: color.c1, // 0% 处的颜色
                },
                {
                  offset: 0.4,
                  color: color.c1, // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: color.c2, // 100% 处的颜色
                },
              ],
              global: false,
            };

            let itemStyle = null;

            //非子
            itemStyle = {
              borderColor: color.c2,
              color: bgcolor,
            };

            //可以改变来实现节点发光效果，但体验不好
            itemStyle = Object.assign(itemStyle, {
              shadowColor: "rgba(255, 255, 255, 0.5)",
              shadowBlur: 10,
            });

            obj = Object.assign(obj, {
              symbolSize: symbolSize,
              color: bgcolor,
              itemStyle,
              lineStyle,
            });

            if (obj.category == 0) arr1.push(obj);
            if (obj.category == 1) arr2.push(obj);
            if (obj.category == 2) arr3.push(obj);
            arr.push(obj);
          }
          arr.sort((a, b) => b.active - a.active);
          window.localStorage.setItem("cate", JSON.stringify(cate));
          return [arr, arr1, arr2, arr3];
        }

        var [arr, arr1, arr2, arr3] = getData(news, this.userList);
        this.listData = arr;
        this.dataTop = this.listData.slice(0, 11);
        // var legendColor = colors.map((item) => item.c2);
        this.arr1 = arr1;
        this.arr2 = arr2;
        this.arr3 = arr3;
        console.log("原始数据", this.listData);
        this.lengendClick(1);
      },
    },
    //右侧监听
    teamInfo: {
      handler: function (news, old) {
        console.log(news);
        this.tableChange = true;
        this.teamChange = true;
        this.source = news.data.map((i) => i.loginName);
        this.active = news.data.map((i) => i.activeNum);
        this.links1 = [];
        let obj = {};
        let map = new Map();
        let res = readFile("./links.txt");
        res.split(/\r?\n/).forEach((line, index) => {
          obj = {};
          let vertices = line.split(" ");
          let login1Name = vertices[0].trim();
          let login2Name = vertices[1].trim();
          let link = vertices[2].trim();

          obj["source"] = this.source.findIndex((e) => e === login1Name);
          obj["target"] = this.source.findIndex((e) => e === login2Name);

          // console.log(obj["source"],obj["target"])
          obj["value"] = link;
          // obj["label"] = { show: true,formatter: "{@value}",color:"#ff9620" };
          obj["label"] = {
            show: true,
            formatter: "{@value}",
            color: "#fff",
          };
          if (obj.source !== -1 && obj.target !== -1) {
            if (
              !map.has(obj.source + obj.target) ||
              !map.has(obj.target + obj.source)
            ) {
              this.links1.push(obj);
              map.set(obj.source + obj.target, 1);
              map.set(obj.target + obj.source, 1);
            }
          }
        });
        this.draw();
      },
    },
  },
  data() {
    return {
      userList: [],
      teamList: [],
      teamInfo: {},
      myChart: null,
      obj1: {},
      links: [],
      arr1: [],
      arr2: [],
      arr3: [],
      dataTop: [],
      listData: {},
      lastName: "",
      lastItemStyle: null,
      teamNameList: [],
      category: "",
      gradeList: [],
      status: true,
      //右侧数据
      source: [],
      myChart1: null,
      links1: [],
      active: [],
      tableChange: false,
      teamChange: false,
      cate: [],
    };
  },
  async created() {
    let obj = {};
    let res = readFile("./user.txt");
    let gradeList = [
      { grade: "A", num: 0 },
      { grade: "B", num: 0 },
      { grade: "C", num: 0 },
      { grade: "D", num: 0 },
      { grade: "S", num: 0 },
    ];
    res.split(/\r?\n/).forEach((line, index) => {
      obj = {};
      let vertices = line.split("|");
      let loginName = vertices[1].trim();
      let activeNum = Number(vertices[2].replace(" ", ""));
      let grade = vertices[3].trim();
      let score = Number(vertices[4].replace(" ", ""));

      obj["loginName"] = loginName;
      obj["activeNum"] = activeNum;
      obj["score"] = score;
      obj["grade"] = grade;
      gradeList.forEach((i) => {
        if (i.grade === grade) i.num++;
      });
      this.userList.push(obj);
    });
    this.gradeList = gradeList;
    window.localStorage.setItem("gradeList", JSON.stringify(gradeList));
    let res1 = readFile("./links1.txt");
    var colors = [
      {
        c1: "#00c7ef",
        c2: "#0AF3FF",
      },
      {
        c1: "#FF8E14",
        c2: "#FFA12F",
      },
      {
        c1: "#AF5AFF",
        c2: "#B62AFF",
      },
      {
        c1: "#25dd59",
        c2: "#29f463",
      },
      {
        c1: "#6E35FF",
        c2: "#6E67FF",
      },
      {
        c1: "#002AFF",
        c2: "#0048FF",
      },
      {
        c1: "#8CD282",
        c2: "#95F300",
      },
      {
        c1: "#3B0EFF",
        c2: "#604BFF",
      },
      {
        c1: "#00BE74",
        c2: "#04FDB8",
      },
      {
        c1: "#4a3ac6",
        c2: "#604BFF",
      },
    ];
    let links = [];
    res1.split(/\r?\n/).forEach((line, index) => {
      let vertices = line.split(" ");
      let team1Name = vertices[0].trim();
      let team2Name = vertices[2].trim();
      let linkNum = parseInt(vertices[4].trim());
      let lineStyle = {
        color: colors.find((itemm, eq1) => eq1 == (index + 1) % 10).c2,
        width: linkNum > 5 ? 5 : linkNum,
      };

      let obj = {
        source: team1Name,
        target: team2Name,
        value: linkNum,
        lineStyle,
        label: {
          show: false,
          formatter: "{@value}",
        },
      };
      // if (linkNum > 2) this.links.push(obj);
      this.links.push(obj);
      links.push(obj);
    });

    console.log("处理后最终links", this.links);
    window.sessionStorage.setItem("links", JSON.stringify(links));

    this.teamList = [
      [
        "g2vinay",
        "vhvb1989",
        "KarishmaGhiya",
        "heaths",
        "yiliuTo",
        "benbp",
        "praveenkuttappan",
        "jiasli",
        "rickle-msft",
        "qiaozha",
        "yunhaoling",
        "kushagraThapar",
        "mssfang",
        "christothes",
        "v-alje",
        "azure-sdk",
        "catalinaperalta",
        "chenrujun",
        "YalinLi0312",
        "CodeBlanch",
        "saragluna",
        "jhendrixMSFT",
        "JoshLove-msft",
        "FabianMeiswinkel",
        "scbedd",
        "alzimmermsft",
        "srnagar",
        "jeremymeng",
        "changlong-liu",
        "sima-zhu",
        "richardpark-msft",
        "joheredi",
        "chlowell",
        "kairu-ms",
        "seanmcc-msft",
        "TimothyMothra",
        "deyaaeldeen",
        "fengzhou-msft",
        "kristapratico",
        "AlexanderSher",
        "kasobol-msft",
        "weidongxu-microsoft",
        "vcolin7",
        "isra-fel",
        "HarshaNalluru",
        "seankane-msft",
        "xinlian12",
        "rajkumar-rangaraj",
        "pakrym",
        "samvaity",
        "jsquire",
        "qwordy",
        "rakshith91",
        "chunyu3",
        "iscai-msft",
        "cijothomas",
        "conniey",
        "backwind1233",
        "sadasant",
        "annelo-msft",
        "ArcturusZhang",
        "VeryEarly",
      ],
      [
        "MichaelSimons",
        "jander-msft",
        "joperezr",
        "ManickaP",
        "MichalStrehovsky",
        "tannergooding",
        "jkoritzinsky",
        "richlander",
        "kouvel",
        "wfurt",
        "akoeplinger",
        "ViktorHofer",
        "trylek",
        "vitek-karas",
        "directhex",
        "naricc",
        "carlossanlop",
        "steveisok",
        "elinor-fung",
        "janvorli",
        "eiriktsarpalis",
        "AndyAyersMS",
        "kunalspathak",
        "sbomer",
        "Maoni0",
        "radical",
        "rolfbjarne",
        "kjpou1",
        "jkotas",
        "mdh1418",
        "BruceForstall",
        "jeffhandley",
        "mikem8361",
        "AaronRobinsonMSFT",
        "vargaz",
        "mthalman",
        "EgorBo",
        "mandel-macaque",
        "ericstj",
        "VSadov",
        "premun",
        "josalem",
        "davmason",
        "thaystg",
        "adamsitnik",
        "lambdageek",
        "maryamariyan",
        "stephentoub",
        "GrabYourPitchforks",
      ],
      [
        "jasontedor",
        "lockewritesdocs",
        "breskeby",
        "romseygeek",
        "jkakavas",
        "tvernum",
        "mocobeta",
        "gwbrown",
        "matriv",
        "przemekwitek",
        "jrodewig",
        "pgomulka",
        "jtibshirani",
        "albertzaharovits",
        "iverase",
        "bpintea",
        "benwtrent",
        "lcawl",
        "dakrone",
        "cbuescher",
        "fcofdez",
        "pugnascotia",
        "jbaiera",
        "martijnvg",
        "ywelsch",
        "ywangd",
        "mark-vieira",
        "nik9000",
        "dnhatn",
        "hendrikmuhs",
        "janhoy",
        "danhermann",
        "rjernst",
        "szabosteve",
        "original-brownbear",
        "stu-elastic",
        "davidkyle",
        "csoulios",
        "DaveCTurner",
        "tlrx",
      ],
      [
        "crazycs520",
        "AndreMouche",
        "liuzix",
        "ran-huang",
        "JmPotato",
        "overvenus",
        "jackysp",
        "cofyc",
        "coocood",
        "winoros",
        "Yisaer",
        "g1eny0ung",
        "YiniXu9506",
        "lance6716",
        "amyangfei",
        "sticnarf",
        "disksing",
        "hunterlxt",
        "BusyJay",
        "nrc",
        "3pointer",
        "wshwsh12",
        "zimulala",
        "qw4990",
        "tangenta",
        "ti-srebot",
        "lonng",
        "AilinKid",
        "GMHDBJD",
        "YuJuncen",
        "tiancaiamao",
        "lichunzhu",
        "wjhuang2016",
        "TomShawn",
        "hicqu",
        "SunRunAway",
        "zz-jason",
      ],
      [
        "jcrist",
        "scopatz",
        "ooeygui",
        "marcelotrevisani",
        "jsignell",
        "hmaarrfk",
        "xylar",
        "ocefpaf",
        "isuruf",
        "gforsyth",
        "TomAugspurger",
        "duncanmmacleod",
        "wolfv",
        "jni",
        "mrocklin",
        "beckermr",
        "jschueller",
        "sbillinge",
        "tschoonj",
        "dbast",
        "kevinyamauchi",
        "bollwyvl",
        "jan-janssen",
        "MarcoGorelli",
        "simonjayhawkins",
        "mroeschke",
        "grlee77",
        "jakirkham",
        "jorisvandenbossche",
        "esheldon",
        "jbrockmendel",
        "regro-cf-autotick-bot",
        "seanyen",
        "tlambert03",
        "jrbourbeau",
      ],
      [
        "BenTheElder",
        "ncdc",
        "AnirudhDagar",
        "terrytangyuan",
        "justaugustus",
        "devinbinnie",
        "mkraft",
        "VineethReddy02",
        "fabriziopandini",
        "yuzisun",
        "thockin",
        "pohly",
        "wiggin77",
        "jespino",
        "detiber",
        "larkox",
        "andyzhangx",
        "saschagrunert",
        "andrewsykim",
        "feiskyer",
        "serathius",
        "neolit123",
        "metanerd",
        "sbishel",
        "Bobgy",
        "dims",
        "jimangel",
        "justinsb",
        "mli",
        "cpanato",
        "k8s-ci-robot",
        "liggitt",
      ],
      [
        "Piinks",
        "jmagman",
        "justinmc",
        "stuartmorgan",
        "bparrishMines",
        "cbracken",
        "chunhtai",
        "clocksmith",
        "dkwingsmt",
        "AlexV525",
        "jonahwilliams",
        "dnfield",
        "christopherfujino",
        "blasten",
        "darrenaustin",
        "guidezpl",
        "domesticmouse",
        "gspencergoog",
        "GaryQian",
        "zanderso",
        "robert-ancell",
        "Renzo-Olivares",
        "johnpryan",
        "gaaclarke",
        "ditman",
        "godofredoc",
        "keyonghan",
        "rami-a",
        "goderbauer",
        "engine-flutter-autoroll",
        "CaseyHillers",
      ],
      [
        "Quentame",
        "keesschollaart81",
        "frenck",
        "Adminiuga",
        "ludeeus",
        "elupus",
        "emontnemery",
        "cgtobi",
        "balloob",
        "springstan",
        "dmulcahey",
        "ctalkington",
        "bdraco",
        "rytilahti",
        "hunterjm",
        "MartinHjelmare",
        "cgarwood",
        "fabaff",
        "bramkragten",
        "scop",
        "Kane610",
        "agners",
        "zxdavb",
        "bachya",
        "pvizeli",
        "oncleben31",
      ],
      [
        "zhaoyang-star",
        "FrostML",
        "phlrain",
        "wangxicoding",
        "Yancey1989",
        "heavengate",
        "sneaxiy",
        "DannyIsFunny",
        "juncaipeng",
        "chenwhql",
        "zhupengyang",
        "jerrywgz",
        "jiweibo",
        "Xreki",
        "Aurelius84",
        "zhiqiu",
        "sandyhouse",
        "zhouwei25",
        "xjqbest",
        "wzzju",
        "Shixiaowei02",
        "zhangting2020",
        "hong19860320",
        "TCChenlong",
        "chenjiaoAngel",
      ],
      [
        "clebs",
        "tobiscr",
        "kwiatekus",
        "dekiel",
        "suleymanakbas91",
        "shorim",
        "adamwalach",
        "akgalwas",
        "dbadura",
        "marcobebway",
        "klaudiagrz",
        "radufa",
        "pPrecel",
        "rakesh-garimella",
        "piotrmiskiewicz",
        "k15r",
        "akucharska",
        "Ressetkk",
        "kazydek",
        "strekm",
        "dariadomagala",
        "Wawrzyn321",
        "franpog859",
        "pkosiec",
      ],
      [
        "dawidd6",
        "Rylan12",
        "bayandin",
        "samford",
        "barrucadu",
        "issyl0",
        "Bo98",
        "chenrui333",
        "iMichka",
        "reitermarkus",
        "injms",
        "miccal",
        "sjackman",
        "MikeMcQuaid",
        "benjamineskola",
        "fxcoudert",
        "SMillerDev",
        "vitorgalvao",
        "jonchang",
        "SeekingMeaning",
        "benthorner",
        "BrewTestBot",
      ],
      [
        "kuisathaverat",
        "bmorelli25",
        "axw",
        "trentm",
        "mtojek",
        "ruflin",
        "v1v",
        "mdelapenya",
        "SylvainJuge",
        "adriansr",
        "SergeyKleyman",
        "eyalkoren",
        "marc-gr",
        "dedemorton",
        "kaiyan-sheng",
        "ChrsMark",
        "cachedout",
        "fearful-symmetry",
        "andrewkroh",
        "jsoriano",
        "kvch",
      ],
      [
        "brettcannon",
        "jakebailey",
        "miss-islington",
        "vstinner",
        "karthiknadig",
        "isidentical",
        "serhiy-storchaka",
        "corona10",
        "DonJayamanne",
        "kimadeline",
        "rhettinger",
        "gvanrossum",
        "zooba",
        "terryjreedy",
        "karrtikr",
        "techwithtim",
        "ned-deily",
        "ericsnowcurrently",
        "methane",
        "pablogsal",
      ],
      [
        "CyrusNajmabadi",
        "mavasani",
        "333fred",
        "akhera99",
        "jcouv",
        "genlu",
        "dibarbet",
        "lukehoban",
        "AlekseyTs",
        "jmarolf",
        "agocke",
        "jasonmalinowski",
        "jaxxstorm",
        "RikkiGibson",
        "cston",
        "sharwell",
        "ryzngard",
        "davidwengier",
        "tmat",
        "allisonchou",
      ],
      [
        "flokli",
        "Ma27",
        "samueldr",
        "jonringer",
        "romildo",
        "alyssais",
        "marsam",
        "jtojnar",
        "doronbehar",
        "matthewbauer",
        "veprbl",
        "Ericson2314",
        "Mic92",
        "edolstra",
        "grahamc",
      ],
      [
        "rintaro",
        "nate-chandler",
        "DougGregor",
        "slavapestov",
        "xedin",
        "hborla",
        "lorentey",
        "compnerd",
        "eeckstein",
        "adrian-prantl",
        "atrick",
        "hamishknight",
        "artemcm",
        "CodaFi",
        "BradLarson",
      ],
      [
        "davidwendt",
        "benfred",
        "shwina",
        "devavret",
        "vuule",
        "alecgunny",
        "jperez999",
        "mythrocks",
        "karthikeyann",
        "rjzamora",
        "galipremsagar",
        "codereport",
        "brandon-b-miller",
      ],
      [
        "eps1lon",
        "micahgodbolt",
        "ecraig12345",
        "assuncaocharles",
        "mnajdova",
        "adamsamec",
        "oliviertassinari",
        "layershifter",
        "DanailH",
        "YuanboXue-Amber",
        "behowell",
        "tomi-msft",
        "chrisdholt",
      ],
      [
        "davidfowl",
        "sfoslund",
        "dagood",
        "JamesNK",
        "nguerrera",
        "SteveSandersonMS",
        "sebastienros",
        "wtgodbe",
        "pranavkm",
        "dougbu",
        "captainsafia",
        "mmitche",
        "rynowak",
      ],
      [
        "Thraka",
        "tdykstra",
        "dsyme",
        "BillWagner",
        "nishanil",
        "TIHan",
        "natke",
        "mairaw",
        "IEvangelist",
        "gewarren",
        "luisquintanilla",
        "cartermp",
        "KevinRansom",
      ],
      [
        "radtriste",
        "cristianonicolai",
        "mariofusco",
        "triceo",
        "evacchi",
        "ricardozanini",
        "manstis",
        "mbiarnes",
        "Ginxo",
        "spolti",
        "tiagobento",
        "yurloc",
      ],
      [
        "charris",
        "mattip",
        "GuillaumeFavelier",
        "tylerjereddy",
        "seberg",
        "sappelhoff",
        "mdhaber",
        "rgommers",
        "ilayn",
        "larsoner",
        "hoechenberger",
      ],
      [
        "dwelle",
        "lipis",
        "Yserz",
        "ffflorian",
        "kbariotis",
        "j-f1",
        "bennycode",
        "MaxDesiatov",
        "kateinoigakukun",
        "ad1992",
      ],
      [
        "sphuber",
        "yuvipanda",
        "choldgraf",
        "CasperWA",
        "shyamd",
        "chrisjsewell",
        "minrk",
        "ltalirz",
        "ml-evs",
        "consideRatio",
      ],
      [
        "joncinque",
        "garious",
        "aeyakovenko",
        "jstarry",
        "CriesofCarrots",
        "t-nelson",
        "jackcmay",
        "ryoqun",
        "carllin",
        "mvines",
      ],
      [
        "ericl",
        "stephanie-wang",
        "sven1977",
        "jovany-wang",
        "edoakes",
        "rkooo567",
        "pcmoritz",
        "simon-mo",
        "suquark",
        "kfstorm",
      ],
      [
        "andrew-zaytsev",
        "postrational",
        "ilyachur",
        "vladimir-paramuzov",
        "myshevts",
        "ilya-lavrenov",
        "GlebKazantaev",
        "adstraw",
        "jane-intel",
        "azhogov",
      ],
      [
        "robinrendle",
        "Swatinem",
        "flub",
        "wedamija",
        "billyvg",
        "scttcper",
        "untitaker",
        "NisanthanNanthakumar",
        "mitsuhiko",
      ],
      [
        "yoff",
        "RasmusWL",
        "erik-krogh",
        "adityasharad",
        "geoffw0",
        "shati-patel",
        "asgerf",
        "MathiasVP",
        "hvitved",
      ],
      [
        "thomasjpfan",
        "ogrisel",
        "lesteve",
        "jeremiedbb",
        "NicolasHug",
        "adrinjalali",
        "jnothman",
        "glemaitre",
        "lorentzenchr",
      ],
      [
        "yoyo837",
        "07akioni",
        "ycjcl868",
        "kuitos",
        "xrkffgg",
        "sorrycc",
        "chenshuai2144",
        "zombieJ",
        "afc163",
      ],
      [
        "BridgeAR",
        "targos",
        "alexandrtovmach",
        "nschonni",
        "benhalverson",
        "MylesBorins",
        "danielleadams",
        "maddhruv",
        "Trott",
      ],
      [
        "morozov",
        "VincentLanglet",
        "greg0ire",
        "phansys",
        "core23",
        "wbloszyk",
        "jordisala1991",
        "franmomu",
        "OskarStark",
      ],
      [
        "planetf1",
        "lcpopa",
        "lpalashevski",
        "cmgrote",
        "bogdan-sava",
        "danielaotelea",
        "grahamwallis",
        "davidradl",
        "mandy-chessell",
      ],
      [
        "soltysh",
        "deads2k",
        "wking",
        "danwinship",
        "p0lyn0mial",
        "sttts",
        "smarterclayton",
        "marun",
        "tnozicka",
      ],
      [
        "Ferroin",
        "thiagoftsm",
        "mfundul",
        "stelfrag",
        "underhood",
        "vlvkobal",
        "ilyam8",
        "prologic",
      ],
      [
        "kenfinnigan",
        "geoand",
        "ia3andy",
        "cescoffier",
        "gsmet",
        "mkouba",
        "Sanne",
        "maxandersen",
      ],
      [
        "johnnychen94",
        "KristofferC",
        "staticfloat",
        "fredrikekre",
        "stevengj",
        "tkf",
        "giordano",
        "timholy",
      ],
      [
        "stuartcampbell",
        "QuLogic",
        "dmgav",
        "tacaswell",
        "klauer",
        "jklymak",
        "timhoffm",
        "danielballan",
      ],
      [
        "MathieuAA",
        "mraible",
        "atomfrede",
        "DanielFran",
        "murdos",
        "mshima",
        "pascalgrimaud",
        "avdev4j",
      ],
      [
        "bgruening",
        "beatrizserrano",
        "dannon",
        "guerler",
        "simonbray",
        "bernt-matthias",
        "jmchilton",
        "mvdbeek",
      ],
      [
        "timbeiko",
        "shemnon",
        "abdelhamidbakhta",
        "macfarla",
        "CjHare",
        "rolfyone",
        "ajsutton",
        "matkt",
      ],
      [
        "mattclay",
        "sivel",
        "felixfontein",
        "bcoca",
        "gundalow",
        "s-hertel",
        "abadger",
        "samccann",
      ],
      [
        "anupama-pathirage",
        "ldclakmal",
        "praneesha",
        "manuranga",
        "nadundesilva",
        "MaryamZi",
        "Bhashinee",
        "chamil321",
      ],
      [
        "thornbill",
        "crobibero",
        "Bond-009",
        "Artiume",
        "nielsvanvelzen",
        "dkanada",
        "joshuaboniface",
        "barronpm",
      ],
      [
        "ablack12",
        "khelif96",
        "tychoish",
        "SupaJoon",
        "Kimchelly",
        "malikchaya2",
        "ybrill",
        "julianedwards",
      ],
      [
        "cl8n",
        "nanaya",
        "peppy",
        "notbakaneko",
        "smoogipoo",
        "Ephemeralis",
        "TicClick",
        "bdach",
      ],
      [
        "nickytonline",
        "maestromac",
        "Zhao-Andy",
        "msarit",
        "lisasy",
        "ludwiczakpawel",
        "Ridhwana",
        "jacobherrington",
      ],
      [
        "vasslitvinov",
        "bradcray",
        "gbtitus",
        "daviditen",
        "mppf",
        "lydia-duncan",
        "dlongnecke-cray",
        "e-kayrakli",
      ],
      [
        "lluiscampos",
        "mchalski",
        "kacf",
        "oleorhagen",
        "merlin-northern",
        "alfrunes",
        "tranchitella",
        "mzedel",
      ],
      [
        "jkfran",
        "bethcollins92",
        "carkod",
        "sowasred2012",
        "solazio",
        "barrymcgee",
        "steverydz",
      ],
      [
        "tconkling",
        "tvst",
        "randyzwitch",
        "arraydude",
        "akrolsmir",
        "kantuni",
        "kmcgrady",
      ],
      [
        "mx-psi",
        "albertvaka",
        "L3n41c",
        "clamoriniere",
        "gbbr",
        "KSerrania",
        "florimondmanca",
      ],
      [
        "leandrolanzieri",
        "fjmolinas",
        "benpicco",
        "gschorcht",
        "maribu",
        "aabadie",
        "kaspar030",
      ],
      [
        "JustinBeckwith",
        "bcoe",
        "codyoss",
        "renovate-bot",
        "elharo",
        "stephaniewang526",
        "chingor13",
      ],
      [
        "Turbo87",
        "rwjblue",
        "ijlee2",
        "scalvert",
        "chancancode",
        "MelSumner",
        "mansona",
      ],
      [
        "alanorozco",
        "jridgewell",
        "estherkim",
        "samouri",
        "danielrozenberg",
        "mszylkowski",
        "processprocess",
      ],
      [
        "ChaosExAnima",
        "sirbrillig",
        "ockham",
        "ntsekouras",
        "scinos",
        "diegohaz",
        "fditrapani",
      ],
      [
        "aanm",
        "gandro",
        "jrajahalme",
        "qmonnet",
        "christarazi",
        "tklauser",
        "joestringer",
      ],
      [
        "sergiocazzolato",
        "mvo5",
        "pedronis",
        "bboozzoo",
        "anonymouse64",
        "cmatsuoka",
        "stolowski",
      ],
      [
        "usha-mandya",
        "AkihiroSuda",
        "estesp",
        "fuweid",
        "thaJeztah",
        "dmcgowan",
      ],
      [
        "bnjbvr",
        "peterhuene",
        "abrown",
        "alexcrichton",
        "fitzgen",
        "sunfishcode",
      ],
      ["ladyada", "dhalbert", "makermelissa", "brentru", "tannewt", "jepler"],
      [
        "rbuckton",
        "orta",
        "typescript-bot",
        "sandersn",
        "andrewbranch",
        "weswigham",
      ],
      [
        "acoates-ms",
        "dannyvv",
        "asklar",
        "ZihanChen-MSFT",
        "jonthysell",
        "aeulitz",
      ],
      [
        "metalmatze",
        "squat",
        "simonpasquier",
        "paulfantom",
        "kakkoyun",
        "brancz",
      ],
      [
        "aschmahmann",
        "hacdias",
        "hsanjuan",
        "Stebalien",
        "raulk",
        "yusefnapora",
      ],
      ["kulmann", "micbar", "C0rby", "butonic", "refs", "IljaN"],
      [
        "dwsutherland",
        "MetRonnie",
        "oliver-sanders",
        "wxtim",
        "hjoliver",
        "kinow",
      ],
      [
        "abellina",
        "razajafri",
        "jlowe",
        "firestarman",
        "tgravescs",
        "andygrove",
      ],
      ["kleimkuhler", "ihcsim", "adleong", "hawkw", "olix0r", "Pothulapati"],
      [
        "topepo",
        "romainfrancois",
        "jennybc",
        "juliasilge",
        "hadley",
        "DavisVaughan",
      ],
      ["fauxpark", "zvecr", "noroadsleft", "mtei", "drashna", "tzarc"],
      ["mernst", "kelloggm", "rjust", "msridhar", "smillst", "t-rasmud"],
      [
        "bflad",
        "anGie44",
        "YakDriver",
        "lorengordon",
        "eemperor",
        "breathingdust",
      ],
      [
        "SkySkimmer",
        "cpitclaudel",
        "gares",
        "ejgallego",
        "herbelin",
        "ppedrot",
      ],
      ["jalkire", "waabid", "JGibson2019", "lisli1", "DaveTryon", "pownkel"],
      [
        "EZoni",
        "MaxThevenet",
        "ax3l",
        "WeiqunZhang",
        "RemiLehe",
        "lucafedeli88",
      ],
      [
        "tigrannajaryan",
        "anuraaga",
        "pjanotti",
        "bogdandrutu",
        "carlosalberto",
        "trask",
      ],
      [
        "pecigonzalo",
        "unknwon",
        "nicksnyder",
        "tsenart",
        "bobheadxi",
        "tjkandala",
      ],
      ["nyalldawson", "3nids", "wonder-sk", "rouault", "elpaso", "nirvn"],
      [
        "dfarrell07",
        "aswinsuryan",
        "skitt",
        "tpantelis",
        "mkolesnik",
        "mangelajo",
      ],
      ["agrare", "jrafanie", "skateman", "chessbyte", "djberg96", "himdel"],
      [
        "mtreinish",
        "manoelmarques",
        "adekusar-drl",
        "Cryoris",
        "1ucian0",
        "chriseclectic",
      ],
      [
        "wjwwood",
        "nuclearsandwich",
        "cottsay",
        "jacobperron",
        "audrow",
        "clalancette",
      ],
      ["4tXJ7f", "HanielB", "aniemetz", "mpreiner", "ajreynol", "nafur"],
      [
        "ksercs",
        "alexanderPolosatov",
        "EugeniyKiyashko",
        "AntonSermyazhko",
        "NickMitrokhin",
        "Krijovnick",
      ],
      ["timneutkens", "TooTallNate", "styfle", "ijjk", "lfades"],
      ["adityapatwardhan", "daxian-dbw", "iSazonov", "TravisEz13", "rjmholt"],
      ["bembelimen", "tecpromotion", "zero-24", "richard67", "HLeithner"],
      ["potiuk", "XD-DENG", "feluelle", "ashb", "mik-laj"],
      ["jgsogo", "memsharded", "uilianries", "SSE4", "czoido"],
      ["GitHK", "odeimaiz", "sanderegg", "ignapas", "pcrespov"],
      ["alexanderzobnin", "AgnesToulet", "tskarhed", "papagian", "aknuds1"],
      ["timja", "jglick", "oleg-nenashev", "MarkEWaite", "olblak"],
      ["alyssawilk", "zuercher", "jmarantz", "dio", "asraa"],
      ["nathan-contino-mongo", "ccho-mongodb", "nlarew", "mongomoe", "cbush"],
      ["Holzhaus", "ronso0", "uklotzde", "daschuer", "Be-ing"],
      ["yuumasato", "jan-cerny", "ggbecker", "redhatrises", "matejak"],
      ["rhatdan", "giuseppe", "mtrmac", "TomSweeneyRedHat", "vrothberg"],
      ["jotak", "lucasponce", "jshaughn", "jmazzitelli", "israel-hdez"],
      ["Progi1984", "atomiix", "jolelievre", "PierreRambaud", "NeOMakinG"],
      ["lidizheng", "jtattermusch", "gnossen", "yashykt", "markdroth"],
      ["themr0c", "mshaposhnik", "vinokurig", "sparkoo", "skabashnyuk"],
      ["samuelfreiberg", "PPatBoyd", "Saadnajmi", "ksiler", "FalseLobster"],
      ["fthaler", "havogt", "tehrengruber", "DropD", "egparedes"],
      ["ChumpChief", "anthony-murphy", "jatgarg", "markfields", "heliocliu"],
      ["rsuderman", "antiagainst", "hanhanW", "GMNGeoffrey", "ScottTodd"],
      ["nopara73", "lontivero", "molnard", "jmacato", "danwalmsley"],
      ["Le-Zheng", "hkvision", "Litchilitchy", "dding3", "yushan111"],
      ["Destiner", "mikemcdonald", "gokaiorg", "bonustrack", "johngrantuk"],
      ["Nayef211", "cpuhrsch", "seemethere", "mthrok", "malfet"],
      ["ifooth", "ielgnaw", "wklken", "jamesgetx", "dellkeji"],
      ["rolsonquadras", "fqutishat", "DRK3", "sandrask", "bstasyszyn"],
      ["pcanal", "lmoneta", "linev", "oshadura", "jblomer"],
      ["Arhell", "niden", "sergeyklay", "Jeckerson"],
      ["ruchirK", "umanwizard", "frankmcsherry", "quodlibetor"],
      ["zmalik", "nfnt", "kensipe", "porridge"],
      ["mxinden", "tomaka", "tomusdrw", "andresilva"],
      ["StephanTLavavej", "strega-nil", "CaseyCarter", "BillyONeal"],
      ["terrymanu", "SteNicholas", "menghaoranss", "dongzl"],
      ["joshmoore", "sbesson", "jburel", "manics"],
      ["joejulian", "shaneutt", "hectorj2f", "gracedo"],
      ["camilamacedo86", "joelanford", "jmccormick2001", "jmrodri"],
      ["mjbvz", "aeschli", "meganrogge", "joaomoreno"],
      ["lovincyrus", "cmwaters", "erikgrinaker", "marbar3778"],
      ["sindresorhus", "fisker", "thorn0", "sosukesuzuki"],
      ["larsrh", "djspiewak", "rintcius", "travisbrown"],
      ["Eric-Arellano", "benjyw", "jsirois", "stuhood"],
      ["sharifelgamal", "priyawadhwa", "medyagh", "tstromberg"],
      ["StudyingFather", "Enter-tainer", "AngelKitty", "abc1763613206"],
      ["pebrc", "sebgl", "thbkrkr", "barkbay"],
      ["Nikhil-Ladha", "kushthedude", "Tanuj22", "leecalcote"],
      ["suneet-s", "maytasm", "clintropolis", "jihoonson"],
      ["ghoneycutt", "evgeni", "bastelfreak", "ekohl"],
      ["barchetta", "spericas", "romain-grecourt", "batsatt"],
      ["martinpitt", "KKoukiou", "marusak", "mvollmer"],
      ["ds300", "MounirDhahri", "ashfurrow", "dzucconi"],
      ["cfromknecht", "Roasbeef", "carlaKC", "guggero"],
      ["tjdevries", "justinmk", "teto", "bfredl"],
      ["escattone", "schalkneethling", "chrisdavidmills", "peterbe"],
      ["kamilkisiela", "yaacovCR", "dotansimha", "ardatan"],
      ["edgarcosta", "JohnCremona", "roed314", "AndrewVSutherland"],
      ["skinny85", "MrArnoldPalmer", "eladb", "RomainMuller"],
      ["reuvenlax", "pabloem", "robertwb", "TheNeuralBit"],
      ["ocket8888", "mattjackson220", "rawlinp", "zrhoffman"],
      ["dahlia", "moreal", "limebell", "riemannulus"],
      ["bgilbert", "jlebon", "dustymabe", "cgwalters"],
      ["ahmadabdolsaheb", "ojeytonwilliams", "raisedadead", "moT01"],
      ["konst8", "wodenx", "dewen", "hvanyo"],
      ["devjgm", "devbww", "scotthart", "coryan"],
      ["srijanreddy98", "vojtechjelinek", "kevjumba", "ankita240796"],
      ["mcollina", "jsumners", "Eomm", "delvedor"],
      ["iguessthislldo", "ClaytonCalabrese", "sonndinh", "mitza-oci"],
      ["WadeBarnes", "andrewwhitehead", "marzmehr", "ianco"],
      ["bzbarsky-apple", "woody-apple", "mspang", "andy31415"],
      ["david-poindexter", "mitchelsellers", "valadas", "donker"],
      ["guilhermelMoraes", "annawen1", "jeffchew", "kennylam"],
      ["akuzm", "CurtizJ", "tavplubix", "vitlibar"],
      ["tw15egan", "emyarod", "dakahn", "joshblack"],
      ["xschildw", "thomasyu888", "tschaffter", "zaro0508"],
      ["kuujo", "adibrastegarnia", "ray-milkey", "tomikazi"],
      ["BarclayII", "VoVAllen", "yzh119", "mufeili"],
      ["kmaehashi", "emcastillo", "takagi", "asi1024"],
      ["pnkraemer", "JonathanWenger", "marvinpfoertner", "nathanaelbosch"],
      ["edwardhartnett", "climbfuji", "aerorahul", "kgerheiser"],
      ["annando", "nupplaphil", "MrPetovan", "tobiasd"],
      ["profjsb", "dmitryduev", "kmshin1397", "acrellin"],
      [
        "jinmeiliao",
        "jdeppe-pivotal",
        "onichols-pivotal",
        "dschneider-pivotal",
      ],
      [
        "severinbeauvais",
        "lekshmimallika-aot",
        "kialj876",
        "cameron-freshworks",
      ],
      ["nizhikov", "ptupitsyn", "Mmuzaf", "anton-vinogradov"],
      ["Zandario", "silicons", "Putnam3145", "Ghommie"],
      ["ruchamahabal", "deepeshgarg007", "marination", "nextchamp-saqib"],
      ["sk4zuzu", "seriva", "plirglo", "atsikham"],
      ["hgryoo", "shparkcubrid", "kisoo-han", "byungwook-kim"],
      ["linr211", "jessiejuachon", "tigershi", "Xiaochao8"],
      ["y00jin", "ktsung94", "jskim6301", "Gwanwoo-Park"],
      ["AlekSi", "adivinho", "BupycHuk"],
      ["GuillaumeGomez", "sdroege", "bilelmoussaoui"],
      ["jackh726", "nikomatsakis", "Mark-Simulacrum"],
      ["Shaptic", "2opremio", "leighmcculloch"],
      ["J-N-K", "martinvw", "wborn"],
      ["psiinon", "kingthorin", "thc202"],
      ["JamieMagee", "viceice", "rarkins"],
      ["cereallarceny", "iamtrask", "madhavajay"],
      ["devmotion", "mohamed82008", "cpfiffer"],
      ["szuecs", "arjunrn", "linki"],
      ["leahneukirchen", "the-maldridge", "ahesford"],
      ["mauroservienti", "danielmarbach", "adamralph"],
      ["lhein", "apupier", "bfitzpat"],
      ["dennisameling", "RCheesley", "escopecz"],
      ["dcherian", "max-sixty", "mathause"],
      ["lachlanjc", "MatthewStanciu", "sampoder"],
      ["christianalfoni", "SaraVieira", "siddharthkp"],
      ["tfussell", "xh3b4sd", "anvddriesch"],
      ["eddyashton", "jumaffre", "achamayou"],
      ["nickofthyme", "rshen91", "markov00"],
      ["cclauss", "poyea", "dhruvmanila"],
      ["saisankargochhayat", "fridex", "harshad16"],
      ["nabobalis", "Cadair", "dstansby"],
      ["vlebourl", "iMicknl", "tetienne"],
      ["damonbarry", "and-rewsmith", "yophilav"],
      ["keszybz", "yuwata", "poettering"],
      ["SeanNaren", "SkafteNicki", "Borda"],
      ["astrofrog", "mhvk", "pllim"],
      ["jas88", "tznind", "rkm"],
      ["jsiirola", "andrewlee94", "michaelbynum"],
      ["mcalmer", "moio", "cbosdo"],
      ["cgsunkel", "reupen", "alixedi"],
      ["e00E", "nlordell", "bh2smith"],
      ["sgrowe", "rjkerrison", "pataruco"],
      ["emlys", "davemfish", "phargogh"],
      ["Ocramius", "weierophinney", "boesing"],
      ["rieske", "wolfs", "bmuskalla"],
      ["t3chguy", "poljar", "turt2live"],
      ["skjnldsv", "juliushaertl", "ChristophWurst"],
      ["SethTisue", "dwijnand", "scala-steward"],
      ["I-Al-Istannen", "Garmelon", "Kha"],
      ["swissspidy", "spacedmonkey", "westonruter"],
      ["htynkn", "mercyblitz", "chickenlj"],
      ["jpkrohling", "pavolloffay", "objectiser"],
      ["adoroszlai", "smengcl", "elek"],
      ["thompsongl", "cchaos", "miukimiu"],
      ["MGatner", "paulbalandan", "lonnieezell"],
      ["matchai", "andytom", "chipbuster"],
      ["bardliao", "ranj063", "plbossart"],
      ["darkushin", "agamm", "Itay4"],
      ["byCedric", "EvanBacon", "IjzerenHein"],
      ["bartlomieju", "lucacasonato", "kitsonk"],
      ["andrewpbrett", "mkllnk", "Matt-Yorkley"],
      ["patrickhulce", "paulirish", "connorjclark"],
      ["zeripath", "techknowlogick", "lunny"],
      ["Christewart", "nkohen", "benthecarman"],
      ["yu-ogi", "ShinobuTakahashi", "kamakiri01"],
      ["julien-c", "patrickvonplaten", "LysandreJik"],
      ["vpicone", "jnm2377", "alisonjoseph"],
      ["ktf", "davidrohr", "shahor02"],
      ["wbamberg", "Elchi3", "ddbeck"],
      ["lgalis", "Hyperkid123", "rvsia"],
      ["rafmudaf", "andrew-platt", "bayc"],
      ["I-am-Erk", "ifreund", "kevingranade"],
      ["juj", "kripken", "dcodeIO"],
      ["peterschwarz", "agunde406", "rbuysse"],
      ["frant-hartm", "ufukyilmaz", "viliam-durina"],
      ["anmyachev", "amyskov", "devin-petersohn"],
      ["ewels", "saramonzon", "drpatelh"],
      ["majorgreys", "Kyle-Verhoog", "jd"],
      ["hjmjohnson", "thewtex", "dzenanz"],
      ["ines", "svlandeg", "adrianeboyd"],
      ["jmartin-r7", "gwillcox-r7", "adfoster-r7"],
      ["achingbrain", "hugomrdias", "alanshaw"],
      ["qwertyquerty", "ike709", "PowerfulBacon"],
      ["ssciolla", "lsloan", "pushyamig"],
      ["astafan8", "Akshita07", "jenshnielsen"],
      ["owen-d", "slim-bean", "cyriltovena"],
      ["duncanspumpkin", "IntelOrca", "Gymnasiast"],
      ["hawkinsp", "mattjj", "froystig"],
      ["lis2", "markvanlan", "CvX"],
      ["briandowns", "erikwilson", "brandond"],
      ["AndrzejKurek", "gilles-peskine-arm", "mpg"],
      ["ErikSchierboom", "BethanyG", "TheLostLambda"],
      ["hishamhm", "dndx", "hutchic"],
      ["dvaldivia", "Alevsk", "harshavardhana"],
      ["jzhou77", "sfc-gh-anoyes", "sfc-gh-tclinkenbeard"],
      ["MrAlias", "jmacd", "Aneurysm9"],
      ["codeboten", "toumorokoshi", "ocelotl"],
      ["stevenengler", "sporksmith", "robgjansen"],
      ["anitaa1990", "cameronvoell", "oguzkocer"],
      ["carlobeltrame", "usu", "pmattmann"],
      ["tmeasday", "shilman", "gaetanmaisse"],
      ["segunadebayo", "with-heart", "ljosberinn"],
      ["jlovejo2", "JShields30", "DopamineDriven"],
      ["carlosthe19916", "jonathanvila", "mrizzi"],
      ["citrus-it", "oetiker", "hadfl"],
      ["fendor", "isovector", "jneira"],
      ["crcrpar", "sile", "himkt"],
      ["minggo", "PPpro", "pandamicro"],
      ["GermanBluefox", "AlCalzone", "Apollon77"],
      ["stoksc", "hamidzr", "hkang1"],
      ["ymmt2005", "dulltz", "zoetrope"],
      ["JoelSpeed", "elmiko", "enxebre"],
      ["MatousJobanek", "xcoulon", "rajivnathan"],
      ["sosiouxme", "jupierce", "thiagoalessio"],
      ["Lineflyer", "moving-bits", "bekuno"],
      ["CAM-Gerlach", "ccordoba12", "dalthviz"],
      ["aggre", "hhatto", "abyssparanoia"],
      ["tridge", "rmackay9", "peterbarker"],
      ["merrymercy", "anijain2305", "masahi"],
      ["squirrelsc", "ultmaster", "liuzhe-lz"],
      ["sxjscience", "zhanghang1989", "jwmueller"],
      ["smichr", "oscarbenjamin", "czgdp1807"],
      ["dpgaspar", "betodealmeida", "suddjian"],
      ["rwcarlsen", "dschwen", "lindsayad"],
      ["amazingalek", "Raicuparta", "misternebula"],
      ["bochaco", "Yoga07", "joshuef"],
      ["olenagerasimova", "g4s8", "yegor256"],
      ["swirtSJW", "acrollet", "ndouglas"],
      ["sungik-choi", "ksundong", "beginin15"],
      ["aclevername", "cPu1", "michaelbeaumont"],
      ["cbodley", "tchaikov", "ajarr"],
      ["gunnarmorling", "jpechane", "Naros"],
      ["brockfanning", "SavvasStephanides", "LucyGwilliamAdmin"],
      ["yorikvanhavre", "abdullahtahiriyo", "sliptonic"],
      ["doru1004", "AlexandreEichenberger", "chentong319"],
      ["mfaulk", "eranrund", "jcape"],
      ["morningman", "kangkaisen", "yangzhg"],
      ["lolski", "jmsfltchr", "flyingsilverfin"],
      ["ma44", "Hekzder", "Koshenko"],
      ["pavanbalaji", "hzhou", "raffenet"],
      ["terry-xiaoyu", "HJianBo", "zmstone"],
      ["jonathanlew", "akhilveeraghanta", "kelvinkoon"],
      ["arjkesh", "tejaschumbalkar", "saimidu"],
      ["DavidFair", "gemmaguest", "rosswhitfield"],
      ["corp-0", "Bod9001", "NoooneyDude"],
      ["Gandalf2k15", "Azarak", "jjpark-kb"],
      ["rachel-fenichel", "moniika", "alschmiedt"],
      ["surajshetty3416", "gavindsouza", "hrwX"],
      ["cyjseagull", "kyonRay", "ywy2090"],
      ["mcgear", "ttrichar", "powhound4"],
      ["lenny-intel", "cloudxxx8", "jim-wang-intel"],
      ["acn-sbuad", "SandGrainOne", "jeevananthank"],
      ["binli2337", "DeniseWorthen", "DusanJovic-NOAA"],
      ["epernod", "fredroy", "jnbrunet"],
      ["charkour", "Jonri2", "tonysulfaro"],
      ["UlianaMunich", "JohannesDoberer", "hardl"],
      ["WANZARGEN", "siyeons", "whdalsrnt"],
      ["kimfriendship", "keemtj", "Leehaeun0"],
      ["ronaldfw", "dpallotti", "pierricgimmig"],
      ["jay-hodgson", "conundrumgirl", "nickgros"],
      ["Anirudh9794", "ltimothy7", "sahithi"],
      ["kekey1", "andlar", "tmy1313"],
      ["kin911014", "d2d2d2d", "sh951118"],
      ["rpdelaney", "jsclarridge"],
      ["bencgreenberg", "mheap"],
      ["remyleone", "loicbourgois"],
      ["clauswilke", "yutannihilation"],
      ["Ralith", "djc"],
      ["chrisduerr", "kchibisov"],
      ["DarthHater", "bhamail"],
      ["aeneasr", "zepatrik"],
      ["nicolo-ribaudo", "JLHwung"],
      ["fanatid", "MOZGIII"],
      ["jvanstraten", "mbrobbel"],
      ["tkaitchuck", "RaulGracia"],
      ["yaahc", "teor2345"],
      ["badboy", "brizental"],
      ["ericcornelissen", "mondeja"],
      ["alexec", "whynowy"],
      ["staabm", "gharlan"],
      ["valentijnscholten", "madchap"],
      ["yykamei", "ybiquitous"],
      ["SlySven", "vadi2"],
      ["jasonwilliams", "Razican"],
      ["robjtede", "JohnTitor"],
      ["fbiville", "scothis"],
      ["gballet", "holiman"],
      ["petertrr", "akuleshov7"],
      ["howardjohn", "istio-testing"],
      ["p1ass", "sanposhiho"],
      ["bmw", "adferrand"],
      ["julienw", "canova"],
      ["oowekyala", "adangel"],
      ["JelleZijlstra", "hauntsaninja"],
      ["brisvag", "alisterburt"],
      ["billimek", "onedr0p"],
      ["diemol", "AutomatedTester"],
      ["dunglas", "soyuka"],
      ["pmalek-sumo", "sumo-drosiek"],
      ["keshavprasadms", "rjshrjndrn"],
      ["Hedingber", "yaronha"],
      ["rainest", "hbagdi"],
      ["louischan-oursky", "carmenlau"],
      ["douglasduteil", "revolunet"],
      ["juan131", "joancafom"],
      ["riginoommen", "sayak-sarkar"],
      ["dbczumar", "harupy"],
      ["drahnr", "ordian"],
      ["lulf", "ctron"],
      ["Shazwazza", "warrenbuckley"],
      ["antfu", "LingDong-"],
      ["rgrinberg", "voodoos"],
      ["KalobTaulien", "Pomax"],
      ["yanganto", "AurevoirXavier"],
      ["darzu", "pelikhan"],
      ["jonsequitur", "colombod"],
      ["mdo", "XhmikosR"],
      ["ItsDrike", "janaSunrise"],
      ["RheingoldRiver", "TsubakiBotPad"],
      ["JaredTan95", "kezhenxu94"],
      ["hbldh", "dlech"],
      ["fig02", "ethteck"],
      ["david-driscoll", "filipw"],
      ["jamesgeorge007", "alexander-akait"],
      ["massongit", "Goryudyuma"],
      ["martinthomson", "MikeBishop"],
      ["stgraber", "tomponline"],
      ["twm", "graingert"],
      ["assignUser", "kgoldfeld"],
      ["cheran-senthil", "chaitanyapotti"],
      ["koizuka", "berlysia"],
      ["dkliban", "bmbouter"],
      ["ckipp01", "tgodzik"],
      ["koba04", "zaki-yama"],
      ["SamVanhoutte", "tomkerkhove"],
      ["Kukks", "NicolasDorier"],
      ["pycaret", "Yard1"],
      ["RealOrangeOne", "PeterJCLaw"],
      ["jack1142", "Drapersniper"],
      ["baruchiro", "brafdlog"],
      ["jtpio", "blink1073"],
      ["lexming", "boegel"],
      ["armenzg", "klahnakoski"],
      ["loic-sharma", "joelverhagen"],
      ["GiriB", "milind009"],
      ["AJIXuMuK", "estruyf"],
      ["henriquegemignani", "dyceron"],
      ["vxgmichel", "touilleMan"],
      ["clokep", "anoadragon453"],
      ["TayGov", "alexjoybc"],
      ["kratsg", "matthewfeickert"],
      ["peterjc", "mdehoon"],
      ["bluetech", "nicoddemus"],
      ["sdispater", "abn"],
      ["nikolas", "nbuonin"],
      ["leouieda", "santisoler"],
      ["alalazo", "adamjstewart"],
      ["stbenjam", "dhellmann"],
      ["tomlinton", "mikeshultz"],
      ["turicas", "berinhard"],
      ["gnprice", "chrisbobbe"],
      ["SamKG", "jvesely"],
      ["ipetr0v", "daviddrysdale"],
      ["gasman", "kaedroho"],
      ["mr-tz", "williballenthin"],
      ["someone235", "svarogg"],
      ["yufeih", "AngryBerryMS"],
      ["Porges", "matthchr"],
      ["omarsmak", "gnodet"],
      ["jsartisan", "mohanarpit"],
      ["cloudhead", "FintanH"],
      ["jakearchibald", "surma"],
      ["sylvestre", "rivy"],
      ["str4d", "daira"],
      ["frigus02", "alsuren"],
      ["koushiro", "liuchengxu"],
      ["simoncozens", "alerque"],
      ["shamil-gadelshin", "mnaamani"],
      ["paulfd", "jpcima"],
      ["ngeiswei", "vsbogd"],
      ["rudeboybert", "ismayc"],
      ["wch", "cpsievert"],
      ["cderv", "yihui"],
      ["DominiqueMakowski", "strengejacke"],
      ["ddsjoberg", "karissawhiting"],
      ["tig", "migueldeicaza"],
      ["mvermeulen", "pfultz2"],
      ["xadupre", "thiagocrepaldi"],
      ["nunomaduro", "owenvoke"],
      ["navin-moorthy", "anuraghazra"],
      ["Atinux", "debs-obrien"],
      ["AntoineAugusti", "timarney"],
      ["Jellyfrog", "murrant"],
      ["Shane32", "sungam3r"],
      ["abextm", "Adam-"],
      ["pivovarit", "leszko"],
      ["Strum355", "ericm"],
      ["yJunS", "LinuxSuRen"],
      ["steve-todorov", "carlspring"],
      ["chenqi0805", "kowshikn"],
      ["scholzj", "ppatierno"],
      ["jrudolph", "raboof"],
      ["Wolf2323", "SaltyAimbOtter"],
      ["dynamic11", "BenJeau"],
      ["kelsos", "LefterisJP"],
      ["dscho", "derrickstolee"],
      ["monperrus", "Jacarte"],
      ["YuriSilenok", "Svyat935"],
      ["olamy", "joakime"],
      ["ctubbsii", "milleruntime"],
      ["akrherz", "guusdk"],
      ["seisman", "weiji14"],
      ["findepi", "electrum"],
      ["dapengzhang0", "ejona86"],
      ["mcverter", "s0"],
      ["sdruskat", "thomaskrause"],
      ["vcrfxia", "JimGalasyn"],
      ["p-mongo", "Neilshweky"],
      ["xKylee", "Owain94"],
      ["Pandrex247", "jbee"],
      ["zouyx", "flycash"],
      ["bobsilverberg", "willdurand"],
      ["ahmedwaleedmalik", "rasheedamir"],
      ["Technoboy-", "CalvinKirs"],
      ["d4rken", "jakobmoellersap"],
      ["fax4ever", "yrodiere"],
      ["tveasey", "droberts195"],
      ["sjrd", "WojciechMazur"],
      ["SukkaW", "curbengh"],
      ["BOLT04", "eddiejaoude"],
      ["Algo-ryth-mix", "GlynLeine"],
      ["HarshCasper", "iamrajiv"],
      ["spytheman", "Delta456"],
      ["rlepigre", "fblanqui"],
      ["return42", "asciimoo"],
      ["sgpthomas", "sampsyo"],
      ["Incognito", "dereuromark"],
      ["tas50", "damacus"],
      ["pablopunk", "MarkLark86"],
      ["tomayac", "samdutton"],
      ["koddr", "Fenny"],
      ["liyasthomas", "AndrewBastin"],
      ["FredKSchott", "drwpow"],
      ["bsord", "jonfairbanks"],
      ["erezrokah", "ehmicky"],
      ["thewilsonator", "Geod24"],
      ["nornagon", "MarshallOfSound"],
      ["djaiss", "asbiin"],
      ["rowanmanning", "JakeChampion"],
      ["3nvi", "vorillaz"],
      ["MeditationDuck", "suzuryo"],
      ["hrsano645", "hiroyuki-ichikawa"],
      ["TakaShinoda", "korosuke613"],
      ["kaizumaki", "osoken"],
      ["jquense", "taion"],
      ["lijiarui", "huan"],
      ["RaananW", "sebavan"],
      ["BenoitZugmeyer", "bcaudan"],
      ["uetchy", "Naturalclar"],
      ["NicholasBoll", "mannycarrera4"],
      ["saltastroops", "hettlage"],
      ["bvaughn", "gaearon"],
      ["jeanregisser", "nambrot"],
      ["web-padawan", "Haprog"],
      ["afeld", "JJediny"],
      ["htdvisser", "rvolosatovs"],
      ["shahzebsiddiqui", "vsoch"],
      ["BenjaminPelletier", "steeling"],
      ["regadas", "nevillelyh"],
      ["mattmoor", "vaikas"],
      ["bghgary", "CedricGuillemet"],
      ["cdata", "elalish"],
      ["jeffposnick", "philipwalton"],
      ["devongovett", "LFDanLu"],
      ["nellyk", "JamesSingleton"],
      ["jhockett", "yuth"],
      ["nhooyr", "code-asher"],
      ["gdams", "sxa"],
      ["stuartcarnie", "alexpaxton"],
      ["yahavi", "eyalbe4"],
      ["Xeeynamo", "Vladabdf"],
      ["asbjornu", "NullableInt"],
      ["gsquared94", "tejal29"],
      ["Begasus", "waddlesplash"],
      ["rabbah", "dgrove-oss"],
      ["pmrowla", "efiop"],
      ["kotarella1110", "bluebill1049"],
      ["Segelzwerg", "iTitus"],
      ["Shnupbups", "shedaniel"],
      ["kindlich", "jaredlll08"],
      ["Goldorion", "Max094Reikeb"],
      ["t1m0thyj", "dkelosky"],
      ["allouis", "rishabhgrg"],
      ["JohnNiang", "ruibaby"],
      ["s0undt3ch", "dwoz"],
      ["jserv", "HowJMay"],
      ["loriab", "dgasmith"],
      ["archibate", "k-ye"],
      ["maxpkatz", "zingale"],
      ["ndevenish", "Anthchirp"],
      ["vyasr", "bdice"],
      ["patrickmineault", "mwaskom"],
      ["glemieux", "billsacks"],
      ["djhoese", "mraspaud"],
      ["Hardcode84", "densmirn"],
      ["m-novikov", "k-dominik"],
      ["trivialfis", "hcho3"],
      ["tinosulzer", "tlestang"],
      ["leebaird", "L1ghtn1ng"],
      ["menghanl", "dfawley"],
      ["wangfakang", "cch123"],
      ["shifucun", "beets"],
      ["roji", "bricelam"],
      ["marcelstoer", "nwf"],
      ["pieh", "LekoArts"],
      ["izaera", "wincent"],
      ["alexforsyth", "trivikr"],
      ["Noordfrees", "gunchleoc"],
      ["Kilo59", "ExpDev07"],
      ["amanda-tarafa", "jskeet"],
      ["erdembayar", "rrelyea"],
      ["gdkchan", "Thog"],
      ["ppekrol", "arekpalinski"],
      ["chriswmackey", "mostaphaRoudsari"],
      ["jankeromnes", "svenefftinge"],
      ["c-po", "dmbaturin"],
      ["hdonnay", "ldelossa"],
      ["hamilton", "openjck"],
      ["aabounegm", "illright"],
      ["jagerman", "majestrate"],
      ["aliok", "matzew"],
      ["Garderoben", "henon"],
      ["dreammaster", "mgerhardy"],
      ["bdistin", "kyranet"],
      ["jonsterling", "favonia"],
      ["bergwolf", "egernst"],
      ["ialidzhikov", "rfranzke"],
      ["axsaucedo", "cliveseldon"],
      ["rbradford", "sboeuf"],
      ["cirocosta", "vito"],
      ["rnewson", "wohali"],
      ["dazuma", "quartzmo"],
      ["haszari", "Aljullu"],
      ["HenryQW", "DIYgod"],
      ["mt-xing", "SamChou19815"],
      ["lucatume", "sc0ttkclark"],
      ["jeherve", "anomiex"],
      ["glitsj16", "rusty-snake"],
      ["kevee", "jeremiak"],
      ["jdalsem", "jeabakker"],
      ["reschke", "mnot"],
      ["lucis", "tlgimenes"],
      ["MaxLeiter", "abigger87"],
      ["machi1990", "craicoverflow"],
      ["gsanchietti", "stephdl"],
      ["BinaryMuse", "colebemis"],
      ["farmio", "marvin-w"],
      ["bblommers", "spulec"],
      ["bahmutov", "dmtrKovalenko"],
      ["capnkenny", "RubyNova"],
      ["ddonahue007", "dlabrecq"],
      ["ibolton336", "mturley"],
      ["mattnolting", "mcoker"],
      ["igchor", "lukaszstolarczuk"],
      ["tdeekens", "emmenko"],
      ["andrewpmartinez", "michaelquigley"],
      ["geaaru", "mudler"],
      ["necouchman", "mike-jumper"],
      ["shazron", "purplecabbage"],
      ["rwe", "L-TChen"],
      ["MacFan4000", "RhinosF1"],
      ["tmbo", "melindaloubser1"],
      ["caisq", "Sparkier"],
      ["rpiaggio", "cquiroz"],
      ["OttoWinter", "glmnet"],
      ["Scy-D2L", "dlockhart"],
      ["paulpach", "vis2k"],
      ["W3stside", "anxolin"],
      ["renukamanavalan", "sujinmkang"],
      ["paulrobertlloyd", "fofr"],
      ["Cypher1", "jasonwyatt"],
      ["kianzarrin", "kvakvs"],
      ["Mirsario", "JavidPack"],
      ["kurkle", "etimberg"],
      ["smoia", "vinferrer"],
      ["Mottie", "timwright12"],
      ["johnwatson484", "st3v3nhunt"],
      ["thekp", "HarveyPeachey"],
      ["dgarcia360", "fboucquez"],
      ["younho9", "anaclumos"],
      ["pozil", "msrivastav13"],
      ["mikesol", "ksaaskil"],
      ["sean-m-sullivan", "kedark3"],
      ["whoamikyo", "LmeSzinc"],
      ["joerchan", "tejlmand"],
      ["jcfranco", "driskull"],
      ["tay1orjones", "bjornalm"],
      ["Skylion007", "jturner65"],
      ["Gustry", "rldhont"],
      ["mahesh-krishnakumar", "bodhish"],
      ["riedgar-ms", "romanlutz"],
      ["wenzeslaus", "neteler"],
      ["sgiehl", "sanchezzzhak"],
      ["bastihav", "theovier"],
      ["camdencheek", "djaglowski"],
      ["wyTrivail", "mxiamxia"],
      ["GriffinRichards", "PikalaxALT"],
      ["GrahamSH-LLK", "apple502j"],
      ["tlienart", "ablaom"],
      ["nathanshammah", "Ericgig"],
      ["daltondhcp", "uday31in"],
      ["tsorya", "eranco74"],
      ["lmm", "caseydavenport"],
      ["LudwigVonChesterfield", "SpaiR"],
      ["shinnar", "hirzel"],
      ["travisn", "leseb"],
      ["amisevsk", "davidfestal"],
      ["cdecker", "rustyrussell"],
      ["random-zebra", "furszy"],
      ["PastaPastaPasta", "UdjinM6"],
      ["joerlane", "tatarize"],
      ["nguigs", "ninamiolane"],
      ["blacktwin", "Hellowlol"],
      ["jkrumbiegel", "SimonDanisch"],
      ["realshuting", "JimBugwadia"],
      ["thomashoneyman", "JordanMartinez"],
      ["tgrospic", "nzpr"],
      ["moralmunky", "firstof9"],
      ["pissang", "Ovilia"],
      ["bobjacobsen", "danielb987"],
      ["ericglau", "turkeylurkey"],
      ["iquidus", "meowsbits"],
      ["paulhauner", "michaelsproul"],
      ["vhirtham", "CagtayFabry"],
      ["levy5307", "acelyc111"],
      ["aprokop", "dalg24"],
      ["llorracc", "sbenthall"],
      ["omonimus1", "McPenquen"],
      ["eaidova", "vladimir-dudnik"],
      ["JanuszL", "klecki"],
      ["martinburchell", "RudolfCardinal"],
      ["scmacdon", "Laren-AWS"],
      ["geohot", "pd0wm"],
      ["PAhelper", "DirtyRacer1337"],
      ["robin-aws", "RustanLeino"],
      ["compulim", "corinagum"],
      ["RadekVana", "espr14"],
      ["mndeveci", "CoshUS"],
      ["th0ma7", "hgy59"],
      ["KronicDeth", "bitwalker"],
      ["fbertsch", "scholtzan"],
      ["ImRodry", "QkeleQ10"],
      ["shtukas", "mxdvl"],
      ["Amazinite", "tehhowch"],
      ["peilun-conflux", "Thegaram"],
      ["jkonecny12", "poncovka"],
      ["MihaiTabara", "escapewindow"],
      ["Nic-Ma", "wyli"],
      ["hellkite500", "robertbartel"],
      ["csarofeen", "jjsjann123"],
      ["stopfstedt", "jrjohnson"],
      ["pli01", "jclaudan"],
      ["thanethomson", "romac"],
      ["lukeseawalker", "tilne"],
      ["jamesmkrieger", "SHZ66"],
      ["gileswells", "TS000"],
      ["eileenmcnaughton", "colemanw"],
      ["wonderflow", "hongchaodeng"],
      ["roi-codefresh", "olegsu"],
      ["lukecologne", "Benjozork"],
      ["agarny", "hsorby"],
      ["mih", "adswa"],
      ["ssanadhya", "koolzz"],
      ["algonautshant", "winder"],
      ["satijalab", "mojaveazure"],
      ["jsnmrs", "katydecorah"],
      ["marshallward", "Hallberg-NOAA"],
      ["mike-ionut-mihai-sandu-tao", "jsconan"],
      ["adokter", "peterdesmet"],
      ["MelvinTo", "jasonlyc"],
      ["adborden", "rebeccawilliams"],
      ["kubevirt-bot", "phoracek"],
      ["pkanher617", "tnorling"],
      ["weitzman", "arthurbaghdas"],
      ["Tatskaari", "peterebden"],
      ["yycptt", "yux0"],
      ["klihub", "marquiz"],
      ["bstansberry", "jamezp"],
      ["thibault-martinez", "Alex6323"],
      ["Didainius", "vbauzysvmware"],
      ["jjcarstens", "fhunleth"],
      ["pattonw", "funkey"],
      ["kevinrue", "LTLA"],
      ["davish", "dlike230"],
      ["thdwlsgus0", "jch422"],
      ["buger", "jensneuse"],
      ["SteveBronder", "bbbales2"],
      ["alisman", "inodb"],
      ["iakov", "IKhonakhbeeva"],
      ["sanfrancrisko", "michaeltlombardi"],
      ["namurphy", "rocco8773"],
      ["yixinglu", "CPWstatic"],
      ["Daniele-Tentoni", "lucagiorgettismp"],
      ["vu3rdd", "meejah"],
      ["shahidhk", "scriptonist"],
      ["rsyracuse", "leslitagordita"],
      ["NiLuJe", "poire-z"],
      ["brianhlin", "matyasselmeci"],
      ["frenchy64", "ereteog"],
      ["keithc-ca", "pshipton"],
      ["modular-magician", "emilymye"],
      ["bsinou", "pydio-i18n"],
      ["donaldsharp", "mjstapp"],
      ["jjcherry56", "eder-matheus"],
      ["abstractj", "stianst"],
      ["ueshin", "HyukjinKwon"],
      ["bnmajor", "psavery"],
      ["VaiTon", "aleene"],
      ["rhayes777", "Jammy2211"],
      ["peterzhuamazon", "gaiksaya"],
      ["jwpeterson", "roystgnr"],
      ["t-sommer", "andreas-junghanns"],
      ["FelipeVieira86", "cduessel"],
      ["rahulmalik87", "altmannmarcelo"],
      ["JulianWielga", "mproch"],
      ["sushi2k", "commjoen"],
      ["patacongo", "xiaoxiang781216"],
      ["wallyworld", "ycliuhw"],
      ["sleberknight", "chrisrohr"],
      ["katahiromz", "HBelusca"],
      ["nwmac", "richard-cox"],
      ["joakim-hove", "bska"],
      ["VahidooX", "titu1994"],
      ["luizeboli", "lcnogueira"],
      ["gmriggs", "LtRipley36706"],
      ["dyakhnov", "manishkumr"],
      ["clumens", "kgaillot"],
      ["uckelman", "BrentEaston"],
      ["DLWoodruff", "bknueven"],
      ["sumesh-aot", "pwei1018"],
      ["tiffwong", "DevDW"],
      ["Vasily2013", "francinum"],
      ["dabacon", "dstrain115"],
      ["sownak", "suvajit-sarkar"],
      ["codebyravi", "Sterling463"],
      ["bradymiller", "sjpadgett"],
      ["achilleas-k", "mpsonntag"],
      ["Ben987", "Ayesha-678"],
      ["cglewis", "anarkiwi"],
      ["grzesiek2010", "seadowg"],
      ["sriumcp", "kalantar"],
      ["david-yz-liu", "mishaschwartz"],
      ["xchang1", "jeizenga"],
      ["kevinclark19a", "narrieta"],
      ["daineAMD", "zaliu"],
      ["sensuikan1973", "TomoyukiSugiyama"],
      ["Marxneves", "Rods27"],
      ["paulromano", "pshriwise"],
      ["mbutrovich", "lmwnshn"],
      ["JessicaMeixner-NOAA", "KateFriedman-NOAA"],
      ["stsoe", "chvamshi-xilinx"],
      ["zexi", "yunion-ci-robot"],
      ["aignatov-bio", "okriuchykhin"],
      ["deeptailor", "akhenry"],
      ["davidslater", "lcadalzo"],
      ["NMDSdevopsServiceAdm", "claresudbery"],
      ["Hark0nnen", "Raza5"],
      ["christianpaquin", "xvzcf"],
      ["antonplagemann", "tjarbo"],
      ["hsik0225", "sally4405"],
      ["suhyunsim", "blossun"],
      ["alexvanin", "cthulhu-rider"],
      ["rhysstever", "aidan-brown"],
      ["titom73", "ClausHolbechArista"],
      ["Zemurin", "Idhrendur"],
      ["felddy", "mcdonnnj"],
      ["kevincharles", "dqnykamp"],
      ["corowne", "itinerare"],
      ["michihdeu", "si404"],
      ["hkiyomaru", "honai"],
      ["muzee99", "asd147asd147"],
      ["jsmall-nvidia", "csyonghe"],
      ["sondreso", "ManInFez"],
      ["benson31", "bvanessen"],
      ["LoganathanSekar7627", "manojsp12"],
      ["hidekishibashi", "ryuya-matsunawa"],
      ["tonyjhillman", "simon-dew"],
      ["NULL-header", "kotarou1192"],
      ["zucchett", "PhysicsOfData"],
      ["forestik", "ViktoriyaRyazhska"],
      ["wiliansilvazup", "nathanmartinszup"],
      ["maxevg", "not-Whale"],
      ["cgalibern", "cvaroqui"],
      ["bgeltz", "cmcantalupo"],
      ["weltenwort"],
      ["spalger"],
      ["Dosant"],
      ["mistic"],
      ["MadameSheema"],
      ["ThomThomson"],
      ["TinaHeiligers"],
      ["alexwizp"],
      ["YulNaumenko"],
      ["wylieconlon"],
      ["alisonelizabeth"],
      ["walterra"],
      ["mikecote"],
      ["angorayc"],
      ["XavierM"],
      ["mbondyra"],
      ["justinkambic"],
      ["afharo"],
      ["brianseeders"],
      ["chrisronline"],
      ["jloleysens"],
      ["scottybollinger"],
      ["cqliu1"],
      ["darnautov"],
      ["cauemarcondes"],
      ["nchaulet"],
      ["flash1293"],
      ["KOTungseth"],
      ["spong"],
      ["kevinlog"],
      ["yctercero"],
      ["madirey"],
      ["patrykkopycinski"],
      ["stratoula"],
      ["Zacqary"],
      ["VladLasitsa"],
      ["kertal"],
      ["yuliacech"],
      ["jgowdyelastic"],
      ["lizozom"],
      ["lukasolson"],
      ["mattkime"],
      ["nreese"],
      ["majagrubic"],
      ["jportner"],
      ["stephmilovic"],
      ["oatkiller"],
      ["streamich"],
      ["pgayvallet"],
      ["qn895"],
      ["tsullivan"],
      ["cnasikas"],
      ["paul-tavares"],
      ["neptunian"],
      ["parkiino"],
      ["ymao1"],
      ["FrankHassanabad"],
      ["constancecchen"],
      ["cuff-links"],
      ["sqren"],
      ["clintandrewhall"],
      ["dmlemeshko"],
      ["joshdover"],
      ["simianhacker"],
      ["LeeDr"],
      ["gchaps"],
      ["marshallmain"],
      ["dej611"],
      ["jbudz"],
      ["tylersmalley"],
      ["DziyanaDzeraviankina"],
      ["alvarezmelissa87"],
      ["kqualters-elastic"],
      ["dplumlee"],
      ["shahzad31"],
      ["jonathan-buttner"],
    ];
    console.log("社区数据", this.teamList);
  },
  mounted() {
    var chartDom = document.getElementById("main");
    this.myChart = echarts.init(chartDom);
    this.myChart.on("click", (params) => {
      //恢复上次item样式
      if (this.lastItemStyle != null) {
        for (let k = 0; k < this.arr1.length; k++) {
          if (this.arr1[k].name === this.lastName)
            this.arr1[k].itemStyle = this.lastItemStyle;
        }
        for (let k = 0; k < this.arr2.length; k++) {
          if (this.arr2[k].name === this.lastName)
            this.arr2[k].itemStyle = this.lastItemStyle;
        }
        for (let k = 0; k < this.arr3.length; k++) {
          if (this.arr3[k].name === this.lastName)
            this.arr3[k].itemStyle = this.lastItemStyle;
        }
      }

      //高亮显示选中
      let handleIndex = this.listData.findIndex((i) => params.name === i.name);
      this.lastName = this.listData[handleIndex].name;
      this.lastItemStyle = JSON.parse(
        JSON.stringify(this.listData[handleIndex].itemStyle)
      );
      this.listData[handleIndex].itemStyle.color = "red";
      this.updateChart();
      this.teamInfo = params.data;
      console.log(this.teamInfo.data);
      console.log(params);
    });
    //右侧代码初始化
    var chartDom = document.getElementById("container");
    this.myChart1 = echarts.init(chartDom);
    this.draw();
  },
  methods: {
    lengendClick(category) {
      this.listData = null;
      if (category == 1) {
        this.category = "0-300";
        this.listData = this.arr1;
        window.sessionStorage.setItem("category", JSON.stringify("0-300"));
      }
      if (category == 2) {
        this.category = "300-900";
        this.listData = this.arr2;
        window.sessionStorage.setItem("category", JSON.stringify("300-900"));
      }
      if (category == 3) {
        this.category = "900以上";
        this.listData = this.arr3;
        window.sessionStorage.setItem("category", JSON.stringify("900以上"));
      }
      console.log(this.listData);
      this.teamNameList = [];
      console.log(this.teamNameList);
      this.teamNameList = this.listData.map((item) => item.name);
      //不需要恢复
      this.updateChart();
    },
    updateChart() {
      var option = {
        gird: {
          left: "middle",
          top: "middle",

          width: "50%",
        },
        selectedMode: true,
        series: [
          {
            name: "知识图谱",
            type: "graph",
            layout: "circular",
            zoom: 1,
            circular: {
              rotateLabel: true,
            },
            nodeScaleRatio: 0.6,
            draggable: true,
            roam: true,
            symbol: "circle",
            data: this.listData,
            links: this.links,
            focusNodeAdjacency: true,
            label: {
              show: true,
              position: "right",
              color: "#fff",
              distance: 5,
              fontSize: 10,
            },
            lineStyle: {
              width: 1.5,
              curveness: 0.3,
              type: "solid",
            },
          },
        ],
      };
      this.myChart.setOption(option);
    },
    changeStatus(status) {
      this.status = status;
      console.log(1111, status);
    },
    //右侧团队函数
    draw() {
      var option;
      let listdata = [];
      if (this.teamChange) {
        var colors = [
          {
            c1: "#00c7ef",
            c2: "#0AF3FF",
          },
          {
            c1: "#FF8E14",
            c2: "#FFA12F",
          },
          {
            c1: "#AF5AFF",
            c2: "#B62AFF",
          },
          {
            c1: "#25dd59",
            c2: "#29f463",
          },
          {
            c1: "#6E35FF",
            c2: "#6E67FF",
          },
          {
            c1: "#002AFF",
            c2: "#0048FF",
          },
          {
            c1: "#8CD282",
            c2: "#95F300",
          },
          {
            c1: "#3B0EFF",
            c2: "#604BFF",
          },
          {
            c1: "#00BE74",
            c2: "#04FDB8",
          },
          {
            c1: "#4a3ac6",
            c2: "#604BFF",
          },
        ];

        this.source.map((v, k) => {
          var color = colors.find((itemm, eq) => eq == (k + 1) % 10);

          // 设置节点样式
          let bgcolor = null;

          bgcolor = {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: color.c1, // 0% 处的颜色
              },
              {
                offset: 0.4,
                color: color.c1, // 0% 处的颜色
              },
              {
                offset: 1,
                color: color.c2, // 100% 处的颜色
              },
            ],
          };

          let itemStyle = null;

          //非子节点
          itemStyle = {
            borderColor: color.c2,
            color: bgcolor,
          };

          //可以改变来实现节点发光效果，但体验不好
          itemStyle = Object.assign(itemStyle, {
            shadowColor: "rgba(255, 255, 255, 0.5)",
            shadowBlur: 10,
          });

          listdata.push({
            name: v,
            label: {
              formatter: "{b}",
              fontSize: 12,
              color: "#FFF",
            },
            symbolSize: 50,
            draggable: true,
            itemStyle,
          });

          // listdata.push({
          //   name: v,
          //   category: 0,
          //   symbolSize: 50,
          //   draggable: true,
          // });
        });

        option = {
          tooltip: { show: false },
          toolbox: {
            show: false,
            feature: {
              dataView: {
                show: true,
                readOnly: true,
              },
              restore: {
                show: true,
              },
              saveAsImage: {
                show: true,
              },
            },
          },
          animationDuration: 1500,
          animationEasingUpdate: "quinticInOut",

          width: 200,
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 12,
              },
            },
          },
          series: [
            {
              type: "graph",
              layout: "force", // circular | force | none
              force: {
                //元素之间的间距
                repulsion: 150,
                edgeLength: 180,
              },
              symbol: "circle", // 节点标记类型
              symbolSize: 40,
              focusNodeAdjacency: true, // 鼠标经过节点是否突出显示
              edgeSymbol: ["circle", "none"],
              edgeSymbolSize: [0, 0],
              edgeLabel: {
                show: false,
              },
              roam: true, // 是否开启鼠标平移
              draggable: true, // 节点是否可拖拽
              //标签
              label: {
                normal: {
                  show: true,
                  //定位上方
                  position: "inside",
                  //字体设置
                  textStyle: {
                    color: "#fff",
                    // fontWeight: "bold"
                  },
                },
              },
              //连接线的配置
              lineStyle: {
                normal: {
                  color: "#e43961",
                  curveness: 0,
                  width: 3,
                  type: "solid",
                },
              },

              categories: [
                {
                  label: {
                    formatter: "{b}",
                    fontSize: 13,
                    color: "#54f7ff",
                  },
                  itemStyle: {
                    color: {
                      type: "radial",
                      r: 0.9,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#0c1746",
                        },
                        {
                          offset: 1,
                          color: "#54f7ff",
                        },
                      ],
                    },
                    borderColor: "#54f7ff",
                    borderWidth: 1,
                  },
                },
              ],
              data: listdata, // 数据
              links: this.links1,
            },
          ],
        };
      } else {
        let cate = JSON.parse(window.localStorage.getItem("cate"));
        this.cate = cate;
        listdata = cate;
        option = null;
        option = {
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
            top: "25px",
            textStyle: {
              color: "#fff",
            },

            data: [
              {
                name: "0-5000",
                itemStyle: {
                  color: "#6E35FF",
                },
              },
              {
                name: "5000-18000",
                itemStyle: {
                  color: "#00c7ef",
                },
              },
              {
                name: "18000以上",
                itemStyle: {
                  color: "#FF8E14",
                },
              },
            ],
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: [80, 140],
              data: listdata,
              label: {
                color: "#FFF",
                show: true, // show属性很关键 show为true时 初始化时即会展示默认文本；show为false时，只有在鼠标悬浮在块上时 才会展示相应文本
                position: "center", // 文本展示位置
                formatter: () => {
                  // 格式化要展示的文本
                  return `团队总数\n${this.cate.reduce(
                    (pre, now) => pre + now.value,
                    0
                  )}`; // totalCount为自定义需要展示的属性 默认文本
                },
                fontSize: 18,
              },
              roseType: "radius",
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
      }

      this.$nextTick(() => {
        this.myChart1.setOption(option, true);
        this.myChart1.resize();
      });
    },
    reback(clickId) {
      //首先检查teaminfo是否为空
      if (!this.teamInfo.data) {
        if (clickId == 1) this.tableChange = false;
        if (clickId == 2) {
          this.teamChange = false;
          this.draw();
        }
      } else {
        if (clickId == 1) this.tableChange = !this.tableChange;
        if (clickId == 2) {
          this.teamChange = !this.teamChange;
          this.draw();
        }
      }
    },
  },
};
</script>
<style scoped>
#main {
  height: 100%;
}

#title {
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 45px;
  color: #72c6e6;
  letter-spacing: 10px;
}
.lengend {
  position: absolute;
  right: 5%;
  width: 175px;
  height: 200px;
  z-index: 999999;
  font-size: 13px;
}
.lengend .len {
  width: 33px;
  height: 10px;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.lengend span {
  color: #fff;
  margin-left: 45px;
}
.father {
  position: relative;
}
.right_top .top {
  height: calc(100% - 40px);
  padding: 0 !important;
}

#bot {
  height: calc(100% - 40px);
}
#bot #container {
  height: 100%;
}
.grade {
  height: calc(100% - 55px);
}
.active {
  height: calc(100% - 40px);
}
.box-card {
  height: 100%;
  background-color: transparent;
  border: none;
  overflow-y: auto;
}
.box-card::-webkit-scrollbar {
  /* width: 8px; */
  display: none;
}
.box-card::-webkit-scrollbar-thumb {
  border-radius: 4px;
  box-shadow: inset 0 0 5px transparent;
  background-color: #888;
}
.box-card::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px transparent;
  border-radius: 0;
  background: #ccc;
}
.top >>> .el-card__header {
  border: none !important;
}
.top >>> .el-table tr {
  background-color: transparent;
}
.top >>> .el-table th.el-table__cell {
  background-color: transparent;
}
.top >>> table {
  color: #fff !important;
}
.top >>> el-table--enable-row-hover {
  color: transparent !important;
}
/* css  鼠标悬浮时 */
::v-deep .el-table tbody tr:hover > td {
  background-color: rgb(65, 111, 180) !important;
  color: #ffffff;
}
.icon {
  position: absolute;
  top: 12px;
  left: 20px;
  z-index: 99999;
  color: #fff;
  cursor: pointer;
  font-size: 1.1rem;
}
</style>
