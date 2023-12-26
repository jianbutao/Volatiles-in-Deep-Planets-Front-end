<template>
  <div id="building">
    <el-container>
      <el-header>
        <LogoComponent :page="'expertData'" />
        <div class="title-div">HTG Team & Project</div>
        <el-button class="back-btn" @click="back">Home</el-button>
      </el-header>
      <el-main>
        <div class="main-div">
          <div class="main-top">
            <span class="text-title">Project Introduction<br /></span>
            <span class="long-text-info"
              >The fast development of statistical methods and machine learning
              algorithms applied to data from cyberinfrastructures offers
              genuine opportunities to reveal solid Earth's secular evolution
              and chemistry. However, in their present state,
              cyberinfrastructures are composed of raw high temperature
              geochemical data with missing categories, a non-negligible
              proportion of errors, including age information, and misplaced
              chemical compositions that may be inconsistent with publications.
              These unintended errors are mainly caused by (1) errors in manual
              data entry; (2) the lack of standards to publish high temperature
              geochemistry data, and the limitations of the optical character
              recognition techniques used to convert tabular data into readable
              documents. Furthermore, there is a lack of inherent relationships
              between rocks and minerals.<br
            /></span>
            <br />
            <br />
            <span class="long-text-info"
              >With joint efforts of 20 geochemists, we have constructed a
              benchmark dataset in high temperature geochemistry. Up to now,
              200,000 rock and mineral data have been checked and corrected
              manually based on the FAIR principle (findable, accessible,
              interoperable, and reusable). Furthermore, the database provides
              raw data downloaded from cyberinfrastructures and their
              corresponding data after data cleaning, which can be used to check
              the effectiveness of data filtering algorithms. Therefore, the
              200,000 samples include (1) raw-clean data pairs; (2)
              mineral-mineral and mineral-rock relations. The web portal offers
              a querying function to search for specific geochemistry data and a
              matching function to find rock-mineral combinations and
              mineral-mineral pairs generated under the same formation
              conditions.<br
            /></span>
            <br />
            <br />
            <span class="long-text-info"
              >If you join the HTG team, you will get:<br
            /></span>
            <span class="long-text-info"
              >(1) Participate in development process and internal testing of
              the database.<br
            /></span>
            <span class="long-text-info"
              >(2) Give priority to using data and algorithms in the
              database.<br
            /></span>
            <span class="long-text-info"
              >(3) Have access to the latest updates to database. <br
            /></span>
            <span class="long-text-info"
              >Please send the email to join us: <span class="email-text">lyuyang1007@zju.edu.cn</span><br
            /></span>
          </div>

          <div class="main-bottom">
            <div class="static-block">
              <div class="text-title">Team Info <br /></div>
              <div class="text-head">Team Leader</div>

              <el-row>
                <el-col :span="8"><div class="text-name">Yang Lyu</div></el-col>
                <el-col :span="16">
                  <div class="text-info">Zhejiang University, Hangzhou</div>
                  <div class="text-info">(Email:lyuyang1007@zju.edu.cn)</div>
                </el-col>
              </el-row>

              <div class="text-head">Technical Guidance</div>
              <el-row>
                <el-col :span="8"><div class="text-name">Shengfeng Pan</div></el-col>
                <el-col :span="16"><div class="text-info">Java Full Stack Engineer, Shenzhen</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="text-name">Jinyuan Zhang</div></el-col>
                <el-col :span="16"><div class="text-info">Web Front-end Developer, Shenzhen</div></el-col>
              </el-row>

              <div class="text-head">Data Arrangement</div>
              <el-row>
                <el-col :span="8"><div class="text-name">Siqi Huang</div></el-col>
                <el-col :span="16"><div class="text-info">Central China Normal University, Wuhan</div></el-col>
              </el-row>

              <div class="text-head">UI Design</div>
              <el-row>
                <el-col :span="8"><div class="text-name">Shuyi Li</div></el-col>
                <el-col :span="16"><div class="text-info">Communication University of China, Beijing</div></el-col>
              </el-row>

              <div class="text-head">Front-end Develop</div>
              <el-row>
                <el-col :span="8"><div class="text-name">Yutong Sun</div></el-col>
                <el-col :span="16"><div class="text-info">Zhejiang University, Hangzhou</div></el-col>
              </el-row>

              <div class="text-head">Back-end Develop</div>
              <el-row>
                <el-col :span="8"><div class="text-name">Junbo Wang</div></el-col>
                <el-col :span="16"><div class="text-info">China University of Geosciences, Beijing</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="text-name">Jianing Wang</div></el-col>
                <el-col :span="16"><div class="text-info">National University of Singapore, Singapore</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="text-name">Ruitao Chang</div></el-col>
                <el-col :span="16"><div class="text-info">China University of Geosciences, Beijing</div></el-col>
              </el-row>

              <div class="text-head">Data Organization</div>
              <div class="text-last">ZJU Earth Data Team</div>
            </div>
          </div>


          <div class="main-bottom">
            <div class="static-block">
              <div class="text-title">Change Log</div>
              <br/>
              <el-table 
                :header-cell-style="{'text-align':'center'}" 
                :cell-style="{'text-align':'center'}"
                :data="logData" 
                class="my-table" fit>
                <el-table-column prop="fhase" width="180">
                  <template slot="header">
                    <div class="table-title">Fhase</div>
                  </template>
                </el-table-column>
                <el-table-column prop="time" width="300">
                  <template slot="header">
                    <div class="table-title">Change Time</div>
                  </template>
                </el-table-column>
                <el-table-column prop="content">
                  <template slot="header">
                    <div class="table-title">Content</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 留白 -->
          <div class="bottom-div"></div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import LogoComponent from "@/components/myComponent/LogoComponent.vue";
export default {
  components: {
    LogoComponent,
  },
  data() {
    return {
      logData:[
        {
          fhase:'V1.0',
          time:'2023.12',
          content:'near 200,000 samples (rock, mineral, inclusion, experiment sample)'
        },
        {
          fhase:'V2.0',
          time:'wait for it',
          content:'expected at 2024.03'
        },
        {
          fhase:'V3.0',
          time:'wait for it',
          content:''
        },
        {
          fhase:'V4.0',
          time:'wait for it',
          content:''
        }
      ],
    };
  },
  computed: {},
  created() {},
  methods: {
    //返回主页
    back() {
      this.$router.push({ path: "/main" });
    },
  },
};
</script>
<style scoped>
.email-text{
  color: #169BD5;
  font-size: 20px;
}
.table-title{
  font-family: "Arial Normal", "Arial", sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #000000;
}
.my-table{
  width: 100%;
  font-size: 16px;
  margin-bottom: 30px;
  font-family: "Arial Normal", "Arial";
}
span {
  line-height: 1.5;
}
.long-text-info {
  font-family: "Arial Normal", "Arial";
  font-weight: 400;
  font-size: 18px;
  color: #000000;
}
.white-space {
  white-space: pre;
}
.text-info {
  font-family: "Arial Normal", "Arial";
  font-weight: 400;
  font-size: 18px;
  text-align: left;
  margin: 7px;
  color: #000000;
  text-indent: 3em; /* 根据需要调整 */
  display: block;
}

.text-name {
  font-family: "Arial Normal", "Arial";
  font-weight: 400;
  font-size: 20px;
  margin: 7px;
  text-align: right;
  color: #000000;
  text-indent: 3em; /* 根据需要调整 */
  display: block;
  font-weight: bold;
}

.text-last {
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 400;
  margin: 10px;
  font-size: 18px;
  color: #000000;
}

.text-head {
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-size: 20px;
  margin: 10px;
  color: #000000;
}

.text-title {
  font-family: "Arial Negreta", "Arial Normal", "Arial", sans-serif;
  font-weight: 700;
  font-size: 28px;
  margin: 20px;
  font-family: "Arial Normal", "Arial";
  color: #333333;
  text-align: center;
  display: block;
}

.static-block{
  text-align: center;
  margin: auto;
  width: 1000px;
}

.main-top {
  width: 100%;
  margin-top: 1%;
  padding: 2% 5%;
  box-sizing: border-box;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.8);
  background-repeat: no-repeat;
  background-size: cover;
}
.main-bottom {
  width: 100%;
  /* height: 50%; */
  margin-top: 1%;
  padding: 2% 5%;
  box-sizing: border-box;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  background-repeat: no-repeat;
  background-size: cover;
}
.main-div {
  margin: 0 auto;
  box-sizing: border-box;
  width: 1200px;
  height: 100%;
  position: relative;
}
.title-div {
  margin: 0 auto;
  font-family: "Comic Sans MS Negreta", "Comic Sans MS Normal", "Comic Sans MS";
  font-weight: 700;
  font-style: normal;
  font-size: 36px;
  color: rgba(255, 255, 255, 0.8);
}
.el-main {
  padding: 0;
}

#building {
  background: url("../../assets/expert_data_simple.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: auto;
  background-size: 100% 100%;
}
.bottom-div{
  height: 100px;
}
</style>