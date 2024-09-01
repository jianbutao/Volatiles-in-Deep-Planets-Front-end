<template>
  <div class="outer-container">
    <!-- main part -->
    <div class="building" :style="{ backgroundImage: `url(${imgUrl})`}">
      <div class="nav-div">
        <div class="total-div">
          <img class="icon3-div" fit="cover" :src="logo3_src">
          <img class="icon2-div" fit="cover" :src="logo2_src">
          <img class="icon-div" fit="cover" :src="logo_src">
        </div>
        <div class="dropdown-div">
          <el-dropdown
            @command="handleCommand"
            placement="bottom"
            v-for="(dropdown, index) in dropdowns"
            :key="index"
            v-if="shouldShowItem(dropdown)"
          >
            <div class="dropdown-link">
              {{ dropdown.title }}
            </div>
            <el-dropdown-menu slot="dropdown" class="dropdown-menu">
              <el-dropdown-item
                :command="item.command"
                v-for="(item, index) in dropdown.items"
                class="dropdown-item"
                :key="index"
                >{{ item.label }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="user-div-all">
          <div class="userName-div" v-if="showUserName">
            <MyPopover :userName="userName"></MyPopover>
          </div>
          <div class="user-div" v-else>
            <el-button class="user-btn" type="text" @click="login('main')"
              >Log in</el-button
            >
          </div>
          <div class="icon-guide-div" @click="toGuide">
            <img class="icon-guide-div" fit="cover" :src="guide_src">
          </div>
        </div>
      </div>

      <div class="main-div">
        <h1 class="text">
          <span style="color: rgba(242, 91, 40, 1);">
            H</span>igh 
          <span style="color: rgba(242, 91, 40, 1);">
            T</span>emperature 
          <span style="color: rgba(242, 91, 40, 1);">
            G</span>eochemistry<br/>
          Benchmark Database
          </h1>
        <div class="bottom-div">
          <el-button class="card-div" @click="toSearchPage('rock')">
            <div class="card-icon">🌍</div>
            <div class="card-text">60000+</div>
            <div class="discription-text">Natural Rock</div>
          </el-button>
          <el-button class="card-div" @click="toSearchPage('mineral')">
            <div class="card-icon">🔎</div>
            <div class="card-text">130000+</div>
            <div class="discription-text">Natural Mineral</div>
          </el-button>
          <el-button class="card-div" @click="toSearchPage('experiment')">
            <div class="card-icon">🔬</div>
            <div class="card-text">1000+</div>
            <div class="discription-text">Experiment Sample</div>
          </el-button>
        </div>
      </div>
    </div>
    <!-- description part -->
    <div class="description-div">
      <div class="description-block">
        <div class="description-title">
          What is this
        </div>
        <br/>
        <br/>
        <div class="description-info">
          This is a benchmark dataset in high temperature geochemistry. Up to now, 200,000 
          rock and mineral data have been checked and corrected manually based on the FAIR 
          principle (findable, accessible, interoperable, and reusable).
        </div>
        <br/>
        <br/>
        <div class="description-info">
          The web portal offers a querying function to search for specific geochemistry 
          data and a matching function to find rock-mineral combinations and mineral-mineral pairs generated under the same formation conditions. In the future, the 
          database will be uploaded to the Deep-time Digital Earth program platform for 
          data integration.
        </div>
      </div>
    </div>

    <!-- image part -->
    <div class="image-div">
      <div class="image-block-empty"></div>
      <div class="image-block">
        <div class="image-description">
          <div class="image-description-block">
            <div class="image-title">
              Key features
            </div>
            <br/>
            <div class="image-detail">
              FAIR principle (Findable, Accessible, Interoperable, Reusable).
              Manual cleaning ~ 200,000 rock and mineral data.
              Raw-clean data pairs to test data filtering algorithms.
              User-friendly Website
            </div>
          </div>
        </div>
        <div class="image-card">
          <img class="image-info" fit="cover" :src="image1_src" />
        </div>
      </div>
      <div class="image-block">
        <div class="image-card">
          <img class="image-info" fit="cover" :src="image2_src" />
        </div>
        <div class="image-description">
          <div class="image-description-block">
            <div class="image-title">
              Chang log
            </div>
            <br/>
            <div style="height: 200px; width: 500px">
              <el-table :data="logList" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
                <el-table-column prop="Phase" label="Phase" width="70"></el-table-column>
                <el-table-column prop="ChangeTime" label="Change Time" width="120"></el-table-column>
                <el-table-column prop="Content" label="Content" width="310"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="image-block-empty"></div>
    </div>

    <div class="custom-divider"></div>

    <!-- ready part -->
    <div class="ready-div">
      <div class="ready-block">
        <div class="ready-title">
          Ready to take a leap into the
          world of GeoResearch? Dive in now!
        </div>
      </div>
      <div class="ready-block">
        <el-button type="primary" style="font-weight: bold;" @click="toSearchPage('rock')">Start Exploring</el-button>
        <el-button type="warning" style="color: black; font-weight: bold;" @click="toGuide">Learn More</el-button>
      </div>
    </div>

    <div class="custom-divider"></div>

    <div class="footer-div">
      High T Geochemistry Benchmark Database, All Rights Reserved &#169; 2023
    </div>
  </div>
</template>
<script>
import icon1 from "@/assets/icon/icon1.png"
import icon2 from "@/assets/icon/icon2.svg"
import icon3 from "@/assets/icon/icon3.svg"
import BG1 from "@/assets/background/BG1.jpg"
import BG2 from "@/assets/background/BG2.jpg"
import BG3 from "@/assets/background/BG3.jpg"
import guide from "@/assets/icon/guide_main.png"
import image1 from '@/assets/background/image1.png'
import image2 from '@/assets/background/image2.png'

import LogoComponent from "@/components/LogoComponent.vue";
import MyPopover from "@/components/PopoverCompont.vue";
import { loginURL }  from "@/store/loginURL"
import axios from "axios";
// import { AutoReport } from 'dde-log-reporter';

export default {
  components: {
    LogoComponent,
    MyPopover,
  },
  data() {
    return {

      imgUrl: BG1,

      logo_src: icon1,
      logo2_src: icon2,
      logo3_src: icon3,

      image1_src: image1,
      image2_src: image2,

      guide_src: guide,

      displayInfo: {
        rock: {
          title: "Natural Rock",
          number: 1,
        },
        mineral: {
          title: "Natural Mineral",
          number: 5,
        },
        expermentSample: {
          title: "Experiment Sample",
          number: 10,
        },
      },

      showUserName: false, //是否展示用户名
      userName: "", //用户名
      isAdmin: false,

      bg: [
        BG1, BG2, BG3
      ],

      currentImageIndex: 0,
      dropdowns: [
        {
          title: "Search & Match",
          items: [
            { label: "Rock Data", command: "rockData" },
            { label: "Mineral Data", command: "mineralData" },
            { label: "Experiment Data", command: "experimentData" },
          ],
        },
        {
          title: "Excel Available",
          items: [
            { label: "Expert Data", command: "expertData" },
            { label: "Raw-Clean Pair", command: "rawCleanPair" },
            { label: "Data Template", command: "dataTemplate" },
          ],
        },
        {
          title: "Upload Data",
          items: [
            { label: "Upload Online", command: "uploadOnline" },
            { label: "Upload Batch", command: "uploadBatch" },
          ],
        },
        {
          title: "About Us",
          items: [
            { label: "Team & Project", command: "teamProject" },
            { label: "Contact Us", command: "contactJoin" },
          ],
        },
      ],

      logList: [{
        Phase: "V1.0",
        ChangeTime: "2023.12",
        Content: 'near 200,000 samples (rock, mineral, inclusion, experiment sample)'
      },{
        Phase: "V2.0",
        ChangeTime: "wait for it",
        Content: 'expected at 2024.03'
      }

      ],
    };
  },
  computed: {},

  async created() {
    this.startImageRotation();


    // // 首先检测是不是cookie里面已经有信息了,如果有的话应当直接显示用户信息以及exit窗口
    // if(this.$cookies.get("token")){
    //   // 检测是否过期
    //   const expired = await this.validateToken(this.$cookies.get("token"))
    //   if(expired){
    //     this.$cookies.remove("token");
    //     this.$store.commit("setUserName", "");
    //     this.$store.commit("setUserAdmin", false);
    //     sessionStorage.removeItem("store");
    //     this.showUserName = false;
    //   }
    //   else{
    //     this.showUserName = true;
    //   }
    //   return;
    // }

    // // 其次检测是否从DDE这边回来,如果是的话则要跳转到对应界面
    // const codeValue = this.$route.query.code;
    // if(codeValue){
    //   // 通过验证
    //   if(await this.getTokenAndValidate(codeValue)){
    //     this.showUserName = true;

    //     // 存储路由信息
    //     const whereToGo = this.$route.query.context;
    //     if(whereToGo){
    //       const decodedContext = atob(whereToGo)

    //       // 使用 Vue Router 跳转到对应路由
    //       if(decodedContext == "main"){
    //         this.$router.go(0);
    //       }
    //       else{
    //         this.$router.push({ path: decodedContext });
    //       }
    //     }
    //     else{
    //       console.error("No Context Returned!")
    //     }
    //   }
    // }

    // // 最后,如果没有codeValue,说明用户尚未登陆,不做处理
  },

  mounted() {
    if(sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      )
    }
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    this.getUserName();
  },

  beforeDestroy() {
    sessionStorage.setItem("store", JSON.stringify(this.$store.state));
  },
  
  methods: {
    startImageRotation() {
      setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.bg.length;
        this.updateBackground();
      }, 5000); // 切换图片间隔时间，单位为毫秒
    },
    updateBackground(){
      this.imgUrl = this.bg[this.currentImageIndex];
    },
    toGuide() {
      window.location.href = 'https://test-for-users-doc.readthedocs.io/en/latest/index.html';
    },
    getUserName() {
      var userName = this.$store.state.userName;
      var isAdmin = this.$store.state.isAdmin;
      this.isAdmin = isAdmin
      if (userName.length > 0) {
        this.showUserName = true;
        this.userName = userName;
      } else {
        this.showUserName = false;
        this.userName = "";
      }
    },
    
    //跳转到DDE登录页
    login(context) {
      this.$store.dispatch('login', context);
    },

    getTokenFromCookie() {
      // 根据实际情况从 cookie 中获取 token
      const storedCookie = this.$cookie.get("token")
      return storedCookie
    },

    async getTokenAndValidate(code) {
      try {

        const tokenUrl = loginURL.tokenChange

        // 构建携带参数的 URL
        const params = {
          appcode: loginURL.appCode,
          code: code,
          secret: loginURL.secretCode,
        };

        const queryString = Object.keys(params)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
          .join('&');

        // 拼接完整的 URL
        const urlWithParams = `${tokenUrl}?${queryString}`;

        // // 发送 GET 请求获取 token
        const tokenResponse = await axios.get(urlWithParams)

        const token = tokenResponse.data.accessToken;
        const expire = tokenResponse.data.expire;

        if(token){
          // 发送验证请求
          const tokenExpired = await this.validateToken(token);
          if (!tokenExpired) {
            // 如果 token 验证成功,使用 vue-cookies 设置 cookie
            this.$cookies.set('token', token, expire); // 设置过期时间,1天
            return true;

          } else {
            // 处理验证失败的情况
            console.error('Token Expired or Error');
          }
        }
        else{
          console.error("Token get failed");
        }
      } catch (error) {
        // 处理请求错误的情况
        console.error('Error fetching or validating token:', error);
      }
      return false;
    },

    async validateToken(token) {
      const validateUrl = loginURL.validate

      // 构建携带参数的 URL
      const params = {
        token: token,
      };

      const queryString = Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

      // 拼接完整的 URL
      const urlWithParams = `${validateUrl}?${queryString}`;

      // 发送 token 验证请求
      const validationResponse = await axios.get(urlWithParams);
      if(validationResponse.data.code === "SUCCESS"){
        if(!validationResponse.data.data){
          this.getUserInfo(token);
        }
        return validationResponse.data.data
      }
      // 代表token失效
      return true
    },

    async getUserInfo(token) {
      const validateUrl = loginURL.infoChange

      // 构建携带参数的 URL
      const params = {
        appcode: loginURL.appCode,
        token: token,
        secret: loginURL.secretCode,
      };

      const queryString = Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

      // 拼接完整的 URL
      const urlWithParams = `${validateUrl}?${queryString}`;

      // 发送 token 验证请求
      const validationResponse = await axios.get(urlWithParams);

      if(validationResponse.data){
        this.$store.commit("setUserName", validationResponse.data.accountName);
        this.$store.commit("setUserAdmin", validationResponse.data.admin === "true");
        this.getUserName();
      }
    },

    //判断是否登录
    hasLogin() {
      let cookies = document.cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split("=");
        if (cookie[0] === "token") {
          return true;
        }
      }
      return false;
    },
    shouldShowItem(item) {
      // 根据用户的角色ID决定是否显示特定的菜单项
      if (item.title === "Upload Data" && !this.isAdmin) {
        return false; // 隐藏 About Us 部分
      }
      return true; // 显示其他部分
    },
    handleCommand(command) {
      let pathUrl = "/";
      pathUrl += command;
      this.$router.push({ path: pathUrl });
    },
    toSearchPage(searchType){
      this.handleCommand(`${searchType}Data`);
    },
    toFeedBackPage(){
      this.handleCommand('contactJoin');
    }
  },
};
</script>

<style lang="less" scoped>
.main-div{
  position: absolute;
  width: 100%;
  height: 100%;
}

.bottom-div{
  position: absolute;
  display: flex;
  width: 100%;
  height: 100px;
  left: 100px;
  bottom: 150px;
}

.card-icon{
  text-align: center; 
  color: #E9D8A6; 
  font-size: 24px; 
  font-weight: 400; 
  word-wrap: break-word;
}

.card-div{
  width: 233px;
  height: 100px;
  border: 0;
  margin-left: 65px;
  background-color: #000b1042;
}

.card-text{
  font-family: Limelight;
  font-size: 32px;
  font-weight: 400;
  text-align: center;
  color: rgba(242, 91, 40, 0.8);
}
.discription-text{
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color:#FFFFFF;
}

.el-header{
  background-color: rgba(0, 0, 0, 0);
}

.nav-div{
  width: 95%;
  margin: auto;
  height: 80px;
  display: flex;
}

.total-div{
  min-width: 280px;
  width: 20%;
  display: flex;
}

.icon-div{
  z-index: 1;
  height: 70px;
  width: 70px;
}

.icon2-div{
  z-index: 1;
  height: 80px;
  width: 100px;
}

.icon3-div{
  z-index: 1;
  height: 80px;
  width: 100px;
}

.icon-guide-div{
  z-index: 1;
  height: 30px;
  width: 30px;
  margin-left: 10px;
  cursor: pointer;
}

.user-div-all{
  z-index: 1;
  height: 80px;
  min-width: 100px;
  width: 10%;
  margin: right;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-btn {
  height: 40px;
  font-size: 17px;
  color: rgba(182, 182, 182, 0.58);
  font-weight: bold;
}
.userName-div {
  color: #d7d7d7;
  font-size: large;
}

.dropdown-div{
  min-width: 800px;
  width: 70%;
  height: 80px;
}
.dropdown-link {
  line-height: 80px;
  margin: auto;
  font-family: Kailasa; /* 字体名 */
  font-size: 18px;
  padding: 0 30px;
  cursor: pointer;
  color: rgba(00, 00, 00, 0.58);
}
.dropdown-item {
  color: #ffffff;
  font-size: medium;
  font-weight: bold;
  font-family: Kailasa;
}
.dropdown-menu {
  text-align: center;
  border: 1px solid transparent;
  font-family: Kailasa;
  background-color: rgb(85, 85, 85, 0.23);
  top: 54px !important;
}

.text{
  margin-top: 100px;
  margin-left: 165px !important;
  font-weight: 500;
	font-family: Jost; /* 字体名 */
	font-size: 44px;
	color: #FFFFFF;
  text-align: left;
  z-index: 1;
}

.building {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  transition: background-image 1s ease;
  z-index: 0;
}

.building::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明叠加层 */
  z-index: 0;
  pointer-events: none; /* 避免伪元素拦截鼠标事件 */
}

.footer-div{
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #E9D8A6;
  background-color: black;
  font-size: 20px;
}

.outer-container {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 100vw;
}

.description-div{
  height: 500px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
}

.description-block{
  margin-left: 10%;
  width: 50%;
  height: 60%;
  text-align: left;
}

.description-title{
  font-weight: 700;
	font-family: HelveticaBold; /* 字体名 */
	font-size: 24px;
	color: #BB3E03;
}

.description-info {
  font-weight: 400;
  font-family: Helvetica; /* 字体名 */
  font-size: 20px;
  color: #005F73;
  word-spacing: 0.2em; /* 增加词间距 */
  line-height: 25px;
}

.image-div{
  height: 80vw;
  background-color: black;
  width: 100%;
  text-align: center;
}

.image-block-empty{
  height: 10%;
  width: 100%;
}
.image-block{
  height: 40%;
  width: 80%;
  display: flex;
  margin: auto;
}

.image-description{
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.image-description-block{
  width: 90%;
  margin: auto;
  text-align: left;
}

.image-card{
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}


.image-info{
  height: 90%;
  width: 90%;
}

.image-title{
  font-weight: 700;
	font-family: HelveticaBold; /* 字体名 */
	font-size: 24px;
	color: white;
}

.image-detail{
  font-weight: 400;
  font-family: Helvetica; /* 字体名 */
  font-size: 16px;
  color: white;
  word-spacing: 0.1em; /* 增加词间距 */
  line-height: 25px;
}

.ready-div{
  position: relative;
  background-color: black;
  height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.ready-block{
  margin-top: 100px;
  margin-left: 10%;
  width: 30%;
  height: 60%;
  text-align: left;
}

.ready-button{
  margin-left: 10%;
  width: 30%;
  text-align: left;
}

.ready-title{
  font-weight: 700;
	font-family: HelveticaBold; /* 字体名 */
	font-size: 24px;
	color: #E9D8A6;
}

.custom-divider {
  width: 100%;
  height: 2px;
  background-color: #E9D8A6;
}



</style>