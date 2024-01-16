<template>
  <div id="building">
    <el-container>
      <el-header>
        <LogoComponent :page="'expertData'" />
        <div class="title-div">Raw-Clean Pairs</div>
        <el-button class="back-btn" @click="back">Home</el-button>
      </el-header>
      <el-main>
        <div class="main-div">
          <div class="top-note-div">
            Raw-Clean Pairs of High T Geochemistry Database
          </div>
          <div class="bottom-note-div">
            We provides two comparative data sets before and after manual cleaning, which can be used to test the effect of data cleaning.
            <br>
            <br>
            One comparison of the igneous rock data downloaded for EarthChem with the cleaned dataset of Liu's team cleaned; 
            Another comparison of clinopyroxene mineral data downloaded for Georoc with the cleaned dataset of Qin's team
            <br>
            <br>
            Here are the two files for Clinopyroxene mineral and Igneous rock comparison datasets respectively.
          </div>
          <div class="file-list-div">
            <el-row :gutter="30">
              <el-col :span="12">
                <div class="table-div">
                  <div class="file-header-div">
                    Raw-Clean Pairs for Clinopyroxene mineral
                  </div>
                  <div class="file-main-div" v-if="isDataLoaded">
                    <el-table :data="mineralFileList" class="my-table" height="350"
                    empty-text="No available data"
                      :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
                        <el-table-column prop="file_name">
                          <template slot="header">
                            <div class="table-title">File Name</div>
                          </template>
                        </el-table-column>
                        <el-table-column width="150">
                          <template slot="header">
                            <div class="table-title">Download</div>
                          </template>
                          <template slot-scope="scope">
                            <el-button type="text" @click="handleClick(scope.row.file_name, 'xlsx', 'Mineral')">xlsx</el-button>
                            <el-button type="text" @click="handleClick(scope.row.file_name, 'csv', 'Mineral')">csv</el-button>
                            <el-button type="text" @click="handleClick(scope.row.file_name, 'txt', 'Mineral')">txt</el-button>
                          </template>
                        </el-table-column>
                        <el-table-column prop="downloads" width="100">
                          <template slot="header">
                            <div class="table-title">Counts</div>
                          </template>
                        </el-table-column>
                      </el-table>
                  </div>
                </div>
                <div class="sub-div" style="width: 70%; margin: 10px auto">
                  <el-button type="primary" class="my-btn" @click="handleClick('mineral_pairs', 'zip', 'Mineral')">Download All Mineral Files</el-button>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="table-div">
                    <div class="file-header-div">
                      Raw-Clean Pairs for Igneous rock
                    </div>
                    <div class="file-main-div" v-if="isDataLoaded">
                      <el-table :data="rockFileList" class="my-table" height="350"
                      empty-text="No available data"
                        :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
                          <el-table-column prop="file_name">
                            <template slot="header">
                              <div class="table-title">File Name</div>
                            </template>
                          </el-table-column>
                          <el-table-column width="150">
                            <template slot="header">
                              <div class="table-title">Download</div>
                            </template>
                            <template slot-scope="scope">
                              <el-button type="text" @click="handleClick(scope.row.file_name, 'xlsx', 'Rock')">xlsx</el-button>
                              <el-button type="text" @click="handleClick(scope.row.file_name, 'csv', 'Rock')">csv</el-button>
                              <el-button type="text" @click="handleClick(scope.row.file_name, 'txt', 'Rock')">txt</el-button>
                            </template>
                          </el-table-column>
                          <el-table-column prop="downloads" width="100">
                            <template slot="header">
                              <div class="table-title">Counts</div>
                            </template>
                          </el-table-column>
                        </el-table>
                    </div>
                  </div>
                  <div class="sub-div" style="width: 70%; margin: 10px auto">
                    <el-button type="primary" class="my-btn" @click="handleClick('rock_pairs', 'zip', 'Rock')">Download All Rock Files</el-button>
                  </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import LogoComponent from "@/components/LogoComponent.vue";
import { loginURL } from "@/store/loginURL";
export default {
  components: {
    LogoComponent,
  },
  data() {
    return {
      isDataLoaded: false,
      rockFileNames: null,
      mineralFileNames: null,
      rockFileList: null,
      mineralFileList: null,
    };
  },
  computed: {},
  created() {
    this.getFileList('rock');
    this.getFileList('mineral');
  },
  methods: {
    //返回主页
    back() {
      this.$router.push({ path: "/main" });
    },

    getFileList(objectType) {
      // 获取文件名列表
      this.$service.get(`/rawcleanpairs/${objectType}FileName`)
        .then(response => {
          this[objectType + "FileNames"] = response.data;
          // 对每个文件名获取下载数量
          const promises = this[objectType + "FileNames"].map(fileName => {
            return this.getDownloadCount(fileName.file_name, objectType);
          });
          // 等待所有请求完成
          return Promise.all(promises);
        })
        .then(downloadCounts => {
          // 组装数据
          const tempList = downloadCounts.map((count, index) => {
            return {
              file_name: this[objectType + "FileNames"][index].file_name,
              downloads: count,
            };
          });
          this[objectType + "FileList"] = tempList;
          this.isDataLoaded = true;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },

    getDownloadCount(fileName, objectType) {
      // 获取下载数量
      return this.$service.get(`/rawcleanpairs/${objectType}downloadnum?fileName=${fileName}`)
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

    handleClick(fileName, fileType, objectType){
      if(!this.hasLogin()){
        this.$message({
          message: "Please log in first!",
          type: "warning",
        });
        this.login("rawCleanPair")
        return;
      }

      return this.$service.get(`/rawcleanpairs/download${objectType}/${fileName}/?format=${fileType}`, { responseType: 'arraybuffer' })
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
        } else if (fileType == 'zip'){
          mimeType = 'application/zip';
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
.file-header-div{
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../../assets/row_clean.svg');
  background-size: cover;
  width: 100%;
  height: 60px;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 700;
  font-size: 20px;
  color: #579fe2;
}
.file-main-div{
  width: 100%;
  margin-top: 6%;
  background-color: #ffffff;
}
.table-div{
  height: 100%;
}

.file-list-div {
  width: 90%;
  margin: auto;
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

.my-btn {
  width: 100%;
  color: #ffffff;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-size: 16px;
  background-color: rgba(51, 51, 51, 1);
  border: none;
  border-radius: 9px;
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