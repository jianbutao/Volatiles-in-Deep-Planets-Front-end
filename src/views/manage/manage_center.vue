<template>
  <div id="building">
    <div class="menu-div">
      <div class="logo-div">
        <el-image
          class="logo-img"
          :src="url"
          fit="scale-down"></el-image>
      </div>
      <el-menu :default-active="this.$route.path" router
        class="el-menu-vertical-demo">
        <el-menu-item index="/manageCenter/userMessage">
          <i class="el-icon-menu"></i>
          <span slot="title">My Center</span>
        </el-menu-item>
        <el-menu-item index="/manageCenter/uploadManage">
          <i class="el-icon-document"></i>
          <span slot="title">Upload Check</span>
        </el-menu-item>
        <el-menu-item index="/manageCenter/reportManage">
          <i class="el-icon-setting"></i>
          <span slot="title">Manage Report</span>
        </el-menu-item>
        <el-menu-item index="/manageCenter/userManage">
          <i class="el-icon-setting"></i>
          <span slot="title">Manage User</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="router-div">
      <div class="router-top">
        <div class="page-title">
          {{ pageTitle }}
        </div>
        <div class="to-home">
          <el-button class="back-btn" @click="back">Home</el-button>
          <MyPopover class="userName-div" :userName="userName"></MyPopover>
        </div>
      </div>
      <div class="router-show-div">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
import MyPopover from '@/components/PopoverCompont.vue';
export default {
  components: {
    MyPopover
  },
  data() {
    return {
      isCollapse: true,
      url: require("../../assets/logo.png"),
      pageTitle:'Manage Center',
      userName: '',//用户名
    };
  },
  computed: {},
  created() {},
  mounted() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    this.getUserName();
  },
  beforeDestroy () {
    sessionStorage.setItem('store', JSON.stringify(this.$store.state))
  },
  methods: {
    getUserName(){
      var userName = this.$store.state.userName;
      if (userName.length > 0) {
        this.userName = userName;
      } else {
        this.userName = '';
      }
    },
    //返回主页
    back() {
      this.$router.push({ path: "/main" });
    },
  },
};
</script>
<style scoped>
.router-show-div{
  margin: 0 auto;
  width: 90%;
  height: 80%;
}

.to-home{
  width: 15%;
  height: 100%;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-title{
  height: 100%;
  float: left;
  font-family: 'Comic Sans MS Negreta', 'Comic Sans MS Normal', 'Comic Sans MS';
  font-weight: 700;
  font-size: 48px;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo-img{
  height: 100%;
  width: 100%;
}
.logo-div{
  height: 15%;
  padding-top: 5%;
}
.router-top{
  padding-top: 1%;
  height: 10%;
  width: 90%;
  margin: 0 auto;
  border-bottom: 1px solid black;
}
.menu-div{
  flex: 1;
  background-color: black;
}
.router-div{
  flex: 9;
  background-color: rgba(129, 211, 248, 0.184313725490196);
}
.el-menu-item{
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 700;
  font-size: 18px;
  color: #FFFFFF;
}
.el-menu-vertical-demo{
  height: 100%;
  background-color: black;
  margin-top: 30%;
  border: none;
}
#building {
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  display: flex;
}
</style>