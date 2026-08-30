<template>
  <el-container>
    <el-header>
      <LogoComponent :page="'expertData'" />
    </el-header>
    <el-main>
      <div class="main-div">
        <div class="top-note-div">
          Expert Data of Volatiles in Deep Planets
        </div>
        <!-- <div class="bottom-note-div">
          Here, we provide three templates for rock, mineral/Inclusion and
          experiment sample respectively.
        </div> -->
        <el-card class="box-card">
          <div class="file-list-div">
            <el-table :data="fileList" 
              class="my-table" 
              height="800"
              v-loading="loading"
              :header-cell-style="cellStyle"
              :cell-style="cellStyle"
              empty-text="No available data"
              element-loading-text="now loading"
            >
            <el-table-column prop="file_name" width="320">
              <template slot="header">
                <div class="table-title">File Name</div>
              </template>
            </el-table-column>
            <el-table-column width="220">
              <template slot="header">
                <div class="table-title">Download</div>
              </template>
              <template slot-scope="scope">
                <el-button type="text" @click="handleClick(scope.row.file_name, 'xlsx')">xlsx</el-button>
                <!-- <el-button type="text" @click="handleClick(scope.row.file_name, 'csv')">csv</el-button>
                <el-button type="text" @click="handleClick(scope.row.file_name, 'txt')">txt</el-button> -->
              </template>
            </el-table-column>
            <el-table-column prop="downloads" width="220">
              <template slot="header">
                <div class="table-title">Count</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import LogoComponent from "@/components/LogoComponent.vue";
import { loginURL } from "@/store/loginURL";
import { downloadArrayBufferResponse } from "@/utils/download";
export default {
  components: {
    LogoComponent,
  },
  data() {
    return {
      isDataLoaded: false,
      fileNames: null,
      fileList: [1],
      loading: true,
    };
  },
  computed: {},

  created() {
    this.getFileList();
  },

  methods: {
    //返回主页
    back() {
      this.$router.push({ path: "/main" });
    },

    cellStyle({ row, column, rowIndex, columnIndex }) {
      // 比如说，你想让第一列居中，其他列靠左
      if (columnIndex === 0) {
        return {
          'text-align': 'left',
        };
      } else {
        return {
          'text-align': 'center',
        };
      }
    },

    getFileList() {
      // 获取文件名列表
      this.$service.get('/excelAvailable/listFileNames')
        .then(response => {
          this.fileNames = response.data;
          // 对每个文件名获取下载数量
          const promises = this.fileNames.map(fileName => {
            return this.getDownloadCount(fileName.file_name);
          });
          // 等待所有请求完成
          return Promise.all(promises);
        })
        .then(downloadCounts => {
          this.loading = false;
          // 组装数据
          this.fileList = downloadCounts.map((count, index) => {
            return {
              file_name: this.fileNames[index].file_name,
              downloads: count,
            };
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    getDownloadCount(fileName) {
      // 获取下载数量
      return this.$service.get(`/excelAvailable/downloadnum?fileName=${fileName}`)
        .then(response => {
          return response.data
        });
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
    handleClick(fileName, fileType){
      if(!this.hasLogin()){
        this.$message({
          message: "Please log in first!",
          type: "warning",
        });
        this.login("expertData")
        return;
      }
      return this.$service.get(`/excelAvailable/download/${fileName}?format=${fileType}`, { responseType: 'arraybuffer' })
      .then(response => {
        return downloadArrayBufferResponse(response, fileName, fileType);
      })
      .catch(error => {
        console.error('Error downloading file:', error);
        this.$message.error(error.message || "Download failed.");
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
.table-title{
  font-weight:bold;
  font-size: 25px;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 40px;
  margin-bottom: 20px;
}
.my-table{
  width: 100%;
  height: 400px;
  font-family: "Arial Normal", "Arial";
}
.file-list-div {
  width: 90%;
  margin: auto;
  overflow-y: auto;
}
.bottom-note-div {
  font-family: "Arial Normal", "Arial";
  font-weight: 200;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.8);
  text-align: left;
  margin-left: 50px;
  margin-bottom: 50px;
}
.top-note-div {
  /* border: 1px solid blue; */
  font-family: Jost;
  font-size: 28px;
  color: rgba(242, 91, 40, 1);
  text-align: left;
  margin-left: 30px;
  margin-bottom: 50px;
}
.main-div {
  border: 1px;
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

.el-container {
  height: 100vh;
}

.box-card {
  margin: auto;
  width: 90%;
}
</style>
