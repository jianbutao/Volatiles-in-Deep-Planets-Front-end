<template>
  <div class="total-div">
    <div class="logo-div" @click="toHome">
      <img :src='logo3_src' class="logo3-img" fit="cover" >
      <img :src='logo2_src' class="logo2-img" fit="cover" >
      <img :src='logo_src' class="logo-img" fit="cover" >
    </div>
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
            >{{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="icon-div">
      <div class="icon-btn" @click="toSearch">
        <img :src='search_src' class="icon-img" fit="cover" >
      </div>
      <div class="icon-btn" @click="toHome">
        <img :src='face_src' class="icon-img" fit="cover" >
      </div>
      <div class="icon-btn" @click="toGuide">
        <img :src='guide_src' class="icon-img" fit="cover" >
      </div>
    </div>
  </div>
</template>

<script>
import icon1 from "@/assets/icon/icon1.png"
import icon2 from "@/assets/icon/icon2.svg"
import icon3 from "@/assets/icon/icon3.svg"

export default {
  name: 'LogoComponent',
  props: ['page'],
  data() {
    return {
      logo_src: icon1,
      logo2_src: icon2,
      logo3_src: icon3,
      isAdmin: false,

      search_src:require('../assets/icon/search.png'),
      face_src:require('../assets/icon/face.png'),
      guide_src:require('../assets/icon/guide.png'),

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
    };
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
    toHome() {
      if(this.page == 'home'){
        location.reload();
      }else{
        this.$router.push({path: "/main"});
      }
    },
    toSearch() {
      this.$router.push({path: "/rockData"});
    },
    toGuide() {
      window.location.href = 'https://test-for-users-doc.readthedocs.io/en/latest/index.html';
    },

    shouldShowItem(item) {
      // 根据用户的角色ID决定是否显示特定的菜单项
      if (item.title === "Upload Data" && !this.isAdmin) {
        return false;
      }
      return true; // 显示其他部分
    },
    handleCommand(command) {
      let pathUrl = "/";
      pathUrl += command;
      this.$router.push({ path: pathUrl });
    },

    getUserName() {
      var isAdmin = this.$store.state.isAdmin;
      this.isAdmin = isAdmin
    },
  }
};
</script>
  
<style scoped>
.logo-title{
  color: rgb(128, 255, 255);
  /* width: 70%; */
}
.title-top{
  font-size: 18px;
  font-family: Arial, sans-serif;
  margin-top: 10px;
  font-weight: bold;
}
.title-bottom{
  font-family: "Arial Narrow", Arial, sans-serif;
  font-weight: bold;
  margin-top: 10px;
  font-size: 17px;
}

.logo-img{
  margin: auto;
  height: 60px;
  width: 60px;
}
.logo2-img{
  margin: auto;
  height: 60px;
  width: 100px;
}
.logo3-img{
  margin: auto;
  height: 60px;
  width: 100px;
}

.total-div{
  display: flex;
  height: 60px;
}


.logo-div{
  cursor: pointer;
  display: flex;
  text-align: center;
  margin-left: 20px;
}


.dropdown-div{
  margin-left: 100px;
  width: 1000px;
  height: 60px;
  right: 150px;
}
.dropdown-link {
  line-height: 60px;
  font-family: Kailasa; /* 字体名 */
  font-size: 16px;
  padding: 0 40px;
  cursor: pointer;
  color: rgba(255, 255, 255, 1.0);
}
.dropdown-item {
  color: #ffffff;
  margin: left;
}
.dropdown-menu {
  border: 0px solid transparent;
  font-family: Kailasa;
  background-color: rgb(0, 0, 0, 1);
  top: 40px !important;
}

.icon-div {
  display: flex;
  text-align: center;
}
.icon-btn {
  display: flex;
  text-align: center;
  margin-right: 30px;
}
.icon-img {
  height: 30px;
  width: 30px;
  cursor: pointer;
  margin: auto;
}
  </style>
  