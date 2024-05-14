<template>
  <el-container>
    <el-header>
      <LogoComponent :page="'rockData'" />
    </el-header>

    <el-main>
      <div class="main-div">

        <div class="top-note-div">
          Data Templates of High T Geochemistry Database
        </div>
        
        <div class="message-div">
          <!-- 文字部分 -->
          <div class="bottom-note-div">
            <div class="simple-text">
              High T Geochemistry database mainly include natural rocks, natural minerals, natural inclusions and experimental synthetic samples which are formed in high temperature environment.
              <p></p>
              Sample information includes sample age, rock property, mineral property, chemical composition, sampling location, geological environment and data source.
              <p></p>
              Here, we provide three templates for rock, mineral/Inclusion and experiment sample respectively.
            </div>
          </div>

          <!-- 下载部分 -->
          <div class="show-div">
            <el-table :data="fileList" empty-text="No available data"
            :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
              <el-table-column prop="file_name" label="File Name"></el-table-column>
              <el-table-column prop="date" label="Upload Time" width="200"></el-table-column>
              <el-table-column label="Download" width="300">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleClick(scope.row.object_name, 'xlsx')">xlsx</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="bottom-note-div">
            <div class="simple-text">
              If you are submitting data to this database, please place the data correctly in the template provided above. Your uploaded data would be published on the website as the open source.
              <p></p>
              Click here to <router-link to="/uploadOnline" class="route-link">Upload Online</router-link>
              <p></p>
              If the existing template does not fit your data well, please click here to <router-link to="/contactJoin" class="route-link">Contact Us</router-link>
            </div>
          </div>
        </div>

      </div>
    </el-main>
  </el-container>
</template>
<script>
import LogoComponent from "@/components/LogoComponent.vue";
export default {
  components: {
    LogoComponent,
  },
  data() {
    return {
      fileList: [{
        file_name: "Data Template for Rock",
        object_name: "rock",
        date: "20240401",
      },
      {
        file_name: "Data Template for Mineral / Inclusion",
        object_name: "mineral",
        date: "20240401",
      },
      {
        file_name: "Data Template for Experiment Sample",
        object_name: "experiment",
        date: "20240401",
      },
      {
        file_name: "Data Template for Parent Rock of Mineral",
        object_name: "parent_rock",
        date: "20240401",
      },
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
    handleClick(objectType, fileType){
      if(!this.hasLogin()){
        this.$message({
          message: "Please log in first!",
          type: "warning",
        });
        this.login("dataTemplate")
        return;
      }
      return this.$service.get(`/template/download/${objectType}_template?format=${fileType}`, { responseType: 'arraybuffer' })
      .then(response => {
        let mimeType = 'application/octet-stream'; // 默认 MIME 类型

        if (fileType === 'xlsx') {
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        } else if (fileType === 'xls') {
          mimeType = 'application/vnd.ms-excel';
        } else if (fileType === 'csv') {
          mimeType = 'text/csv';
        } else if (fileType === 'txt') {
          mimeType = 'text/plain';
        }
        // 将二进制数据转换为 Blob 对象
        const blob = new Blob([response.data], { type: mimeType });
        // 创建一个下载链接
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = objectType + "_template";
        document.body.appendChild(link);
        // 触发下载
        link.click();
        // 释放资源
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

        return true;
      })
      .catch(error => {
        console.error('Error downloading file:', error);
        return false;
      });
    },
    //跳转到DDE登录页
    login(context) {
      this.$store.dispatch('login', context);
    },
  },
};
</script>
<style scoped>

.route-link{
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 700;
  font-size: 18px;
  color: rgba(242, 91, 40, 1);
  text-decoration: none;
}

.message-bottom-div{
  margin-top: 20px;
}

.show-div{
  width: 100%;
  margin-bottom: 50px;
}
.text-style{
  font-weight: 400;
  text-align: left;
  line-height: 20px;
  font-size: 15px;
  letter-spacing: 0.1ch;
  color: rgb(26, 34, 27);
}
.message-head-div{
  width: 100%;
  margin-bottom: 20px;
}

.top-note-div   {
  font-family: Jost;
  font-size: 28px;
  color: rgba(242, 91, 40, 1);
  text-align: left;
  margin-left: 50px;
  margin-bottom: 20px;
}

.bottom-note-div {
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 50px;
}

.simple-text{
  font-weight: 400;
  text-align: left;
  line-height: 20px;
  font-size: 15px;
  letter-spacing: 0.1ch;
  color: rgb(26, 34, 27);
}

.message-div{
  height: 90%;
  width: 90%;
  margin: auto;
}

::v-deep .el-table  tr{
  font-family: 'Arial Normal', 'Arial';
  font-weight: 400;
  font-size: 20px;
  color:rgb(117, 117, 117);
  background-color: transparent !important;
}
::v-deep .el-table{
  font-family: 'Arial Normal', 'Arial';
  font-weight: 400;
  font-size: 20px;
  background-color: transparent !important;
}

.main-div{
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.8); 
  margin: 20px auto;
  /* 定死 */
  width: 1000px;
}
.title-div {
  margin: 0 auto;
  font-family: "Comic Sans MS Negreta", "Comic Sans MS Normal", "Comic Sans MS";
  font-weight: 700;
  font-style: normal;
  font-size: 36px;
  color: #ffffff;
}
</style>