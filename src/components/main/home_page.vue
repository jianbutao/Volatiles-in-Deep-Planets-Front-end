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
          <el-button class="user-btn" type="text" @click="login('login')"
            >Log in</el-button
          >
          <span class="user-btn"> | </span>
          <el-button class="user-btn" type="text" @click="login('register')"
            >Sign up</el-button
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
export default {
  components: {
    LogoComponent,
    MyPopover,
  },
  data() {
    return {
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
  created() {},
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
    //跳转到登录页
    login(type) {
      this.$store.commit("setUserStatus", type);
      this.$router.push({ path: "/login" });
    },
    //退出登录
    exitLogin() {
      this.$cookies.remove("token");
      this.$store.commit("setUserName", "");
      sessionStorage.removeItem("store");
      location.reload();
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