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
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoComponent',
  props: ['page'],
  data() {
    return {
      logo_src: require('../assets/icon/icon1.png'),
      logo2_src: require('../assets/icon/icon2.svg'),
      logo3_src: require('../assets/icon/icon3.svg'),

      search_src:require('../assets/icon/search.png'),
      face_src:require('../assets/icon/face.png'),
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

    shouldShowItem(item) {
      // 根据用户的角色ID决定是否显示特定的菜单项
      if (item.title === "Upload Data" && !this.$store.state.isAdmin) {
        return false; // 隐藏 About Us 部分
      }
      return true; // 显示其他部分
    },
    handleCommand(command) {
      let pathUrl = "/";
      pathUrl += command;
      this.$router.push({ path: pathUrl });
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
  height: 50px;
  width: 50px;
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
  height: 80px;
}

.logo-div{
  cursor: pointer;
  display: flex;
  text-align: center;
  width: 80px;
  margin-left: 20px;
}

.logo-div{
  cursor: pointer;
  display: flex;
  text-align: center;
  width: 80px;
  margin-left: 20px;
}

.logo-div{
  cursor: pointer;
  display: flex;
  text-align: center;
  width: 80px;
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
  