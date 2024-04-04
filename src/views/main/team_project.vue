<template>
  <el-container>
    <el-header>
      <LogoComponent :page="'tempProject'" />
    </el-header>
    <el-main>
      <div class="main-div">
        <!-- background -->
        <div class="background-image">
          <div class="text-area">
            <div class="text-main">About Us</div>
            <div class="text-description">Home > About Us</div>
          </div>
        </div>
        <!-- intro 1 -->
        <div class="background-introduction">
          <div class="intro-container">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="intro-grid-content">
                  <div class="intro-text-title">Background</div>
                  <div class="intro-text-context">
                    The fast development of statistical methods and machine learning
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
                    between rocks and minerals.
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <img :src="group1_src" class="intro-img" alt="Group Image">
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- intro 2 -->
        <div class="background-introduction">
          <div class="intro-container">
            <el-row :gutter="20">
              <el-col :span="12">
                <img :src="group2_src" class="intro-img" alt="Group Image">
              </el-col>
              <el-col :span="12">
                <div class="intro-grid-content">
                  <div class="intro-text-title">About Project</div>
                  <div class="intro-text-context">
                    With joint efforts of 20 geochemists, we have constructed a
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
                    conditions.
                  </div>
                  <div class="intro-grid-list">
                    <img :src="bar_src" class="bar-img" alt="Bar Image">
                    <div class="intro-grid-info-content">
                      <div class="intro-simple-text">
                        If you join the HTG team, you will get:
                      </div>
                      <div class="intro-icon-text">
                        Participate in development process and internal testing of
                        the database.
                      </div>
                      <div class="intro-icon-text">
                        Give priority to using data and algorithms in the
                        database.
                      </div>
                      <div class="intro-icon-text">
                        Have access to the latest updates to database. 
                      </div>
                      <div class="intro-simple-text">
                        Please send the email to join us: lyuyang1007@zju.edu.cn
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- member intro -->
        <div class="member-introduction">
          <div class="intro-text-title">
            Meet Our Team Member
          </div>
          <div class="intro-text-context">
            Data Organization: ZJU Earth Data Team
          </div>
          <div class="intro-container">
            <el-row class="card-container" justify="center" align="middle">
              <el-col v-for="card in cards" :key="card.name" :span="6">
                <el-card class="card-info">
                  <img :src="card.photo" class="group-img" alt="Group Image">
                  <div class="text-title">{{ card.name }}</div>
                  <div class="text-career">{{ card.career }}</div>
                  <div class="text-info">{{ card.from }}</div>
                  <el-link v-if="card.name == 'Junbo Wang'" type="warning" href="https://bbo-junbo.github.io/">Persaonl Webpage</el-link>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import LogoComponent from "@/components/LogoComponent.vue";
import group1 from "@/assets/group/group1.png";
import group2 from "@/assets/group/group2.png";
import bar from "@/assets/group/bar.png";
import crt from "@/assets/photos/crt.jpg";
import hsq from "@/assets/photos/hsq.jpg";
import ly from "@/assets/photos/ly.jpg";
import psf from "@/assets/photos/psf.jpg";
import wjb from "@/assets/photos/wjb.jpg";
import zjy from "@/assets/photos/zjy.jpg";
import syt from "@/assets/photos/syt.jpg";
import lsy from "@/assets/photos/lsy.jpg";
import wjn from "@/assets/photos/wjn.jpg";

export default {
  components: {
    LogoComponent,
  },
  data() {
    return {
      group1_src: group1, 
      group2_src: group2, 
      bar_src: bar,
      cards: [
      {
          name: "Yang Lyu",
          career: "Team Leader",
          from: "Zhejiang University, Hangzhou",
          photo: ly,
        },
        {
          name: "Shengfeng Pan",
          career: "Technical Guidance",
          from: "Java Full Stack Engineer, Shenzhen",
          photo: psf,
        },
        {
          name: "Jinyuan Zhang",
          career: "Technical Guidance",
          from: "Web Front-end Developer, Shenzhen",
          photo: zjy,
        },
        {
          name: "Siqi Huang",
          career: "Data Arrangement",
          from: "Central China Normal University, Wuhan",
          photo: hsq,
        },
        {
          name: "Shuyi Li",
          career: "UI Design",
          from: "Communication University of China, Beijing",
          photo: lsy,
        },
        {
          name: "Yutong Sun",
          career: "Front-end Develop",
          from: "Zhejiang University, Hangzhou",
          photo: syt,
        },
        {
          name: "Junbo Wang",
          career: "Back-end Develop",
          from: "China University of Geosciences, Beijing",
          photo: wjb,
        },
        {
          name: "Jianing Wang",
          career: "Back-end Develop",
          from: "National University of Singapore, Singapore",
          photo: wjn,
        },
        {
          name: "Ruitao Chang",
          career: "Back-end Develop",
          from: "China University of Geosciences, Beijing",
          photo: crt,
        },
      ],
    };
  },
};
</script>

<style scoped>
.el-main {
  padding: 0;
}

.main-div {
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.background-image {
  width: 100vw;
  height: 100vh;
  position: relative;
  top: 0;
  left: 0;
  background: url('../../assets/background/aboutUs.png') center/cover no-repeat;
  z-index: -1;
}

.text-area {
  position: absolute;
  bottom: 24% !important;
  left: 9%;
  z-index: 1;
}

.text-main {
  font-family: Jost2;
  font-weight: 600;
  font-size: 60px;
  letter-spacing: 0.15ch;
  color: #FFFFFF;
  text-align: left;
  margin-bottom: 10px;
}

.text-description {
  font-family: Jost2;
  font-weight: 100;
  font-size: 20px;
  letter-spacing: 0.1ch;
  color: #FFFFFF;
  text-align: left;
  margin-bottom: 20px;
}

.background-introduction {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.member-introduction {
  margin-top: 50px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.intro-container {
  width: 90%;
  max-width: 1200px;
  padding: 20px;
  text-align: center;
  margin: auto;
}

.intro-grid-content {
  text-align: left;
  margin-left: 10%;
  margin-top: 12%;
}

.intro-img {
  width: 100%;
  max-width: 500px;
  height: auto;
}

.group-img {
  height: 200px;
  width: auto;
}

.bar-img {
  margin-top: 5%;
  max-height: 240px;
  width: auto;
}

.intro-text-title {
  font-family: Jost;
  font-weight: 500;
  font-size: 40px;
  color: #000000;
  margin-bottom: 10px;
}

.intro-text-context {
  font-family: Roboto;
  font-size: 15px;
  line-height: 26px;
  letter-spacing: 0.1ch;
  color: rgba(174, 180, 175, 1);
}

.intro-grid-list{
  display: flex;
}

.intro-grid-info-content{
  margin-top: 5%;
  display: flex;
  flex-direction: column;
}

.intro-simple-text {
    position: relative;
    display: inline-block;
    font-size: 18px;
    font-family: Roboto;
    color: rgba(242, 91, 40, 0.8);
    padding-left: 30px; /* 控制图标和文字之间的间距 */
}

.intro-icon-text {
    margin: 3%;
    position: relative;
    display: inline-block;
    font-size: 18px;
    font-family: Roboto;
    color: rgba(14, 20, 15, 1);
    padding-left: 30px; /* 控制图标和文字之间的间距 */
}

.intro-icon-text::before {
  content: '';
  background-image: url('../../assets/group/checkbox.png');
  background-size: cover;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card-info {
  text-align: center;
  margin: 20px;
  width: 90%;
  height: 400px;
  max-width: 272px;
  max-height: 446px;
}

.text-title {
  font-family: Jost;
  font-weight: 400;
  font-size: 30px;
  color: #000000;
}

.text-career {
  font-family: Roboto;
  margin-top: 10px;
  font-size: 15px;
  line-height: 26px;
  letter-spacing: 0.1ch;
  color: rgba(242, 91, 40, 0.8);
}

.text-info {
  font-family: Roboto;
  font-size: 15px;
  line-height: 26px;
  letter-spacing: 0.1ch;
  color: rgba(174, 180, 175, 1);
}

</style>
