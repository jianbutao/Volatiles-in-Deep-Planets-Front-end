<template>
  <div id="building">
    <el-header>
      <img class="icon-div" fit="cover" :src="logo_src">

      <div class="dropdown-div">
        <el-dropdown
          @command="handleCommand"
          class="dropdown-span"
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
      </div>

      
    </el-header>
    <el-main>
      <div class="main-div">
        <div class="text">
          High Temperature Geochemistry<br/>
          Benchmark Database
        </div>
        <div class="bottom-div">
          <el-button class="card-div" @click="toSearchPage('rock')">
            <div class="card-icon">🌍</div>
            <div class="card-text">10000+</div>
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
    </el-main>
    <el-footer>
      <div class="footer-div">
        High T Geochemistry Benchmark Database, All Rights Reserved &#169; 2023
      </div>
    </el-footer>
  </div>
</template>
<script>
import LogoComponent from "@/components/myComponent/LogoComponent.vue";
import MyPopover from "@/components/myComponent/PopoverCompont.vue";
import { loginURL }  from "@/store/loginURL"
import axios from "axios";
export default {
  components: {
    LogoComponent,
    MyPopover,
  },
  data() {
    return {

      test_code: "CNe379bb4f37c7b236504703b8a3908e71",

      role_id: 2,

      logo_src: require('../../assets/logo_simple.png'),

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
        }
      },
      showUserName: false, //是否展示用户名
      userName: "", //用户名
      dropdowns: [
        {
          title: "Search & Match",
          items: [
            { label: "Rock Data", command: "rockData" },
            { label: "Mineral Data", command: "mineralData" },
            { label: "Experiment Data", command: "experimentData" },
            // { label: "Match Data", command: "matchData" },
          ],
        },
        {
          title: "Excel Available",
          items: [
            { label: "Expert Data", command: "expertData" },
            { label: "Raw-Clean Pair", command: "rawCleanPair" },
          ],
        },
        {
          title: "Upload Data",
          items: [
            { label: "Upload Online", command: "uploadOnline" },
            { label: "Data Template", command: "dataTemplate" },
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
    };
  },
  computed: {},

  created() {

    // 首先检测是不是cookie里面已经有信息了，如果有的话应当直接显示用户信息以及exit窗口

    // 其次检测是否从DDE这边回来，如果是的话则要跳转到对应界面
    const codeValue = this.test_code
    if(codeValue){
      // 通过验证
      if(this.getTokenAndValidate(codeValue)){
        const whereToGo = this.$route.query.context;
        if(whereToGo){
          // const decodedContext = whereToGo

          const decodedContext = atob(whereToGo)

          // 使用 Vue Router 跳转到对应路由
          this.$router.push({ path: decodedContext });
        }
        else{
          console.error("No Context Returned!")
        }
      }
    }

    // 最后，如果没有codeValue，说明用户尚未登陆，不做处理
  },

  mounted() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    this.getUserName();
  },

  beforeDestroy() {
    sessionStorage.setItem("store", JSON.stringify(this.$store.state));
  },
  
  methods: {
    getUserName() {
      var userName = this.$store.state.userName;
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

        // 发送 GET 请求获取 token
        const tokenResponse = await axios.get(urlWithParams)

        const token = tokenResponse.data.accessToken;
        const expire = tokenResponse.data.expire;
        if(token){
          // 发送验证请求
          const isValid = await this.validateToken(token);

          if (isValid) {
            // 如果 token 验证成功，使用 vue-cookies 设置 cookie
            this.$cookies.set('token', token, expire); // 设置过期时间，1天
            this.$cookies.set('domain', loginURL.domain);
            return true;

          } else {
            // 处理验证失败的情况
            console.error('Token validation failed');
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
      const validationResponse = this.$service.get(urlWithParams);

      if(validationResponse.data.code === "SUCCESS"){
        return validationResponse.data.data
      }

      return false
    },

    //退出登录
    async exitLogin() {
      this.$cookies.remove("token");
      this.$store.commit("setUserName", "");
      sessionStorage.removeItem("store");

      // DDE系统那边的退出
      const exitUrl = loginURL.exit

      // 构建携带参数的 URL
      const params = {
        context: "https://htgdb.deep-time.org/main"
      };

      const queryString = Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

      // 拼接完整的 URL
      const urlWithParams = `${exitUrl}?${queryString}`;

      // 发送 token 验证请求
      await axios.get(urlWithParams);
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
      if (item.title === "Upload Data" && this.role_id === 2) {
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
  width: 90%;
  height: 100%;
}
.bottom-div{
  position: absolute;
  display: flex;
  width: 100%;
  height: 100px;
  left: 100px;
  bottom: 50px;
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
  color: #E9D8A6;
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
.icon-div{
  position: absolute;
  height: 80px;
  width: 80px;
  margin-left: 100px;
  margin-top: 30px;
}

.user-div-all{
  position: absolute;
  height: 80px;
  margin-top: 80px;
  width: 200px;
  right: 20px;
}
.user-btn {
  height: 40px;
  font-size: 17px;
  color: rgba(182, 182, 182, 0.58);
  font-weight: bold;
}
.userName-div {
  position: absolute;
  right: 5%;
  color: #d7d7d7;
  font-size: large;
}
.user-div {
  position: absolute;
  right: 3%;
}

.dropdown-div{
  width: 1000px;
  height: 60px;
  margin-top: 30px;
  position: absolute;
  right: 150px;
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
  top: 87px !important;
}

.text{
  margin-top: 100px;
  margin-left: 150px;
  font-weight: 500;
	font-family: Jost; /* 字体名 */
	font-size: 44px;
	color: #FFFFFF;
  text-align: left;
}

#building {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../../assets/expert_data_simple.jpg");
  background-size: 100% 100%;
}

#building::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 调整这里的透明度，0为完全透明，1为完全不透明 */
  z-index: -1; /* 确保叠加在图片底下 */
}

.footer-div{
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 10px;
}

</style>