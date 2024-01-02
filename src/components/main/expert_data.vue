<template>
  <div id="building">
    <el-container>
      <el-header>
        <LogoComponent :page="'expertData'" />
        <div class="title-div">Expert Data</div>
        <el-button class="back-btn" @click="back">Home</el-button>
      </el-header>
      <el-main>
        <div class="main-div">
          <div class="top-note-div">
            Expert Data of High T Geochemistry Database
          </div>
          <div class="bottom-note-div">
            Here, we provide three templates for rock, mineral/Inclusion and
            experiment sample respectively.
          </div>
          <div class="file-list-div" v-if="isDataLoaded">
            <el-table :data="fileList" class="my-table" height="400"
            :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
            empty-text="No available data"
            >
              <el-table-column prop="file_name">
                <template slot="header">
                  <div class="table-title">File Name</div>
                </template>
              </el-table-column>
              <el-table-column width="180">
                <template slot="header">
                  <div class="table-title">Download</div>
                </template>
                <template slot-scope="scope">
                  <el-button type="text" @click="handleClick(scope.row.file_name, 'xlsx')">xlsx</el-button>
                  <!-- <el-button type="text" @click="handleClick(scope.row.file_name, 'csv')">csv</el-button>
                  <el-button type="text" @click="handleClick(scope.row.file_name, 'txt')">txt</el-button> -->
                </template>
              </el-table-column>
              <el-table-column prop="downloads" width="150">
                <template slot="header">
                  <div class="table-title">Counts</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import LogoComponent from "@/components/myComponent/LogoComponent.vue";
import { loginURL } from "@/store/loginURL";
export default {
  components: {
    LogoComponent,
  },
  data() {
    return {
      isDataLoaded: false,
      fileNames: null,
      fileList: null
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
          this.isDataLoaded = true;
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
        link.download = fileName;
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
    login(context){
      const loginUrl = loginURL.baseURL + loginURL.login
      // 构建携带参数的 URL
      const params = {
        appCode: loginURL.appCode,
        context: context,
      };
      // BASE64转化
      params.context = btoa(params.context);
      const queryString = Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
      // 拼接完整的 URL
      const urlWithParams = `${loginUrl}?${queryString}`;
      // 使用 window.location.href 进行跳转
      window.location.href = urlWithParams;
    },
  },
};
</script>
<style scoped>
.table-title{
  font-weight:bold;
  font-size: large;
  color: #000000;
}
.my-table{
  width: 100%;
  font-family: "Arial Normal", "Arial";
}
.file-list-div {
  width: 90%;
  margin: auto;
  overflow-y: auto;
}
.bottom-note-div {
  font-family: "Arial Normal", "Arial";
  font-weight: 400;
  font-size: 20px;
  color: #000000;
  text-align: left;
  margin-top: 20px;
  margin-left: 50px;
  margin-bottom: 50px;
}
.top-note-div {
  /* border: 1px solid blue; */
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-size: 28px;
  color: #000000;
  text-align: left;
  margin-left: 50px;
}
.main-div {
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
#building {
  background: url("../../assets/expert_data_simple.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: auto;
  background-size: 100% 100%;
}
</style>