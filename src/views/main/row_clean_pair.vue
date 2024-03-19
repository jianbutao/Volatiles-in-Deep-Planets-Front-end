<template>
  <el-container>
    <el-header>
      <LogoComponent :page="'expertData'" />
    </el-header>
    <el-main>
      <div class="main-div">
        <div class="top-note-div">
          Raw-Clean Pairs of High T Geochemistry Database
        </div>
        <div class="bottom-note-div">
          We provides two comparative data sets before and after manual cleaning, which can be used to test the effect of data cleaning.
          <p></p>
          One comparison of the igneous rock data downloaded for EarthChem with the cleaned dataset of Liu's team cleaned; 
          Another comparison of clinopyroxene mineral data downloaded for Georoc with the cleaned dataset of Qin's team
          <p></p>
          Here are the two files for Clinopyroxene mineral and Igneous rock comparison datasets respectively.
        </div>
        <div class="file-list-div-top">
          <el-row :gutter="30">
            <el-col :span="12">
              <div class="table-div">
                <div class="file-header-div">
                  Raw-Clean Pairs for Clinopyroxene mineral
                </div>
                <div class="file-main-div">
                  <el-card class="box-card">
                    <div class="file-list-div">
                      <el-table 
                        :data="mineralFileList" 
                        class="my-table"
                        height="350"
                        empty-text="No available data"
                        v-loading="mineralLoading"
                        element-loading-text="now loading"
                        :header-cell-style="cellStyle"
                        :cell-style="cellStyle"
                      >
                        <el-table-column prop="file_name">
                          <template slot="header">
                            <div class="table-title">File Name</div>
                          </template>
                        </el-table-column>
                        <el-table-column width="120">
                          <template slot="header">
                            <div class="table-title">Download</div>
                          </template>
                          <template slot-scope="scope">
                            <el-button type="text" @click="handleClick(scope.row.file_name, 'xlsx', 'Mineral')">xlsx</el-button>
                            <el-button type="text" @click="handleClick(scope.row.file_name, 'csv', 'Mineral')">csv</el-button>
                            <el-button type="text" @click="handleClick(scope.row.file_name, 'txt', 'Mineral')">txt</el-button>
                          </template>
                        </el-table-column>
                        <el-table-column prop="downloads" width="80">
                          <template slot="header">
                            <div class="table-title">Count</div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-card>
                </div>
              </div>
              <div class="sub-div" style="width: 70%; margin: 10px auto">
                <el-button type="primary" @click="handleClick('mineral_pairs', 'zip', 'Mineral')">Download All Mineral Files</el-button>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="table-div">
                  <div class="file-header-div">
                    Raw-Clean Pairs for Igneous rock
                  </div>
                  <div class="file-main-div">
                    <el-card class="box-card">
                      <div class="file-list-div">
                        <el-table 
                          :data="rockFileList" 
                          class="my-table"
                          height="350"
                          empty-text="No available data"
                          v-loading="rockLoading"
                          element-loading-text="now loading"
                          :header-cell-style="cellStyle"
                          :cell-style="cellStyle"
                        >
                          <el-table-column prop="file_name">
                            <template slot="header">
                              <div class="table-title">File Name</div>
                            </template>
                          </el-table-column>
                          <el-table-column width="120">
                            <template slot="header">
                              <div class="table-title">Download</div>
                            </template>
                            <template slot-scope="scope">
                              <el-button type="text" @click="handleClick(scope.row.file_name, 'xlsx', 'Rock')">xlsx</el-button>
                              <el-button type="text" @click="handleClick(scope.row.file_name, 'csv', 'Rock')">csv</el-button>
                              <el-button type="text" @click="handleClick(scope.row.file_name, 'txt', 'Rock')">txt</el-button>
                            </template>
                          </el-table-column>
                          <el-table-column prop="downloads" width="80">
                            <template slot="header">
                              <div class="table-title">Count</div>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </el-card>
                  </div>
                </div>
                <div class="sub-div" style="width: 70%; margin: 10px auto">
                  <el-button type="primary" @click="handleClick('rock_pairs', 'zip', 'Rock')">Download All Rock Files</el-button>
                </div>
            </el-col>
          </el-row>
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
      rockLoading: true,
      mineralLoading: true,
      rockFileNames: null,
      mineralFileNames: null,
      rockFileList: [1],
      mineralFileList: [1],
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
          this[objectType + "Loading"] = false;
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

    //跳转到DDE登录页
    login(context) {
      this.$store.dispatch('login', context);
    },
  },
};
</script>
<style scoped>
.my-table{
  width: 100%;
  font-family: "Arial Normal", "Arial";
}
.file-header-div{
  display: flex;
  justify-content: center;
  font-family: Jost;
  font-size: 20px;
  color: rgba(242, 91, 40, 1);
  text-align: left;
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

.file-list-div-top {
  width: 90%;
  margin: auto;
}
.table-title{
  font-weight:bold;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 20px;
}

.bottom-note-div {
  font-family: "Arial Normal", "Arial";
  font-weight: 400;
  font-size: 15px;
  color: rgba(0, 95, 115, 1);
  text-align: left;
  margin-top: 20px;
  margin-left: 50px;
  margin-bottom: 50px;
  line-height: 20px;
}

.top-note-div   {
  font-family: Jost;
  font-size: 28px;
  color: rgba(242, 91, 40, 1);
  text-align: left;
  margin-left: 30px;
  margin-bottom: 20px;
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

.box-card {
  margin: auto;
  width: 100%;
}

.file-list-div {
  width: 100%;
  margin: auto;
  overflow-y: auto;
}

</style>