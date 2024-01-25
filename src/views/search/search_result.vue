<template>
  <div id="building">
    <el-container>
      <el-header>
        <LogoComponent :page="'rockData'" />
        <div class="title-div">{{ pageTitle }}</div>
        <el-button class="back-btn" @click="back">Home</el-button>
      </el-header>
      <el-main>
        <div class="main-div">
          <div class="main-left">

            <el-table
              ref="table"
              v-loading="loading"
              :data="tableData" class="table-left"
              element-loading-text="now loading"
              empty-text="No available data"
            >
              <el-table-column  key="No" label="No">
                <template slot-scope="scope">
                  {{size * (page - 1) + (scope.$index + 1)}}
                </template>
              </el-table-column>
              <template v-for="(item, key) in tableData[0]">
                <el-table-column :prop="key" :label="translate(key)" :width="flexColumnWidth(key, null, tableData)">
                  <template v-if="isObject(item)">
                    <template v-for="(subItem, subKey) in item">
                      <el-table-column :key="subKey" :prop="key + '.' + subKey" :label="translate(subKey)" :width="flexColumnWidth(key, subKey, tableData)">
                      </el-table-column>
                    </template>
                  </template>
                </el-table-column>
              </template>
            </el-table>

            <!-- 分页 -->
            <el-pagination
              background
              layout="prev, pager, next"
              :page-count=Math.floor(totalNumber/size)
              :page-size=size
              @current-change="handlePageChange"
              >
            </el-pagination>
          </div>
            
          <div class="main-right">
            <div class="sub-div">
              <el-button type="primary" class="my-btn" @click="backToSearch">Back to Search</el-button>
            </div>
            <div class="sub-div" style="margin-top: 10%;">
              <el-button type="primary" class="my-btn" :disabled="isDownloading" @click="downloadData()">Download Data</el-button>
            </div>
            <div class="sub-div" style="margin-top: 10%;">
              <el-button type="primary" class="my-btn" @click="matchyourData()">Match Your Data</el-button>
            </div>
            <div class="sub-div" style="margin-top: 10%;">
              <el-descriptions
                class="margin-top"
                :column="1"
                size="mini"
                border>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    Sample Num
                  </template>
                  {{totalNumber}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    Column Num
                  </template>
                  {{ getTableColumnNumber() }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-location-outline"></i>
                    Row Num
                  </template>
                  {{ tableData.length }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <div class="sub-div" style="margin-top: 10%;">
              <el-button type="primary" class="my-btn" @click="toMachineLearning">Try Machine Learning</el-button>
            </div>
            <div style="margin:10px 0; width: 100%; background-color: rgba(255, 255, 255, 0.8);">
              <span class="note-one">click to Geochemistry π app.</span>
            </div>

            <span class="note-two">Your Search History</span>
            <el-table :data="searchHistory" class="table-right" height="350" empty-text="You can login to view">
              <el-table-column prop="SearchType" label="Type" width="60">
              </el-table-column>
              <el-table-column prop="SearchNote" label="Filter" width="75">
                <template slot-scope="scope">
                  <el-tag size="mini" :type="tagTypes(searchHistory[scope.$index].SearchType)">{{ searchHistory[scope.$index].SearchNotes }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="SearchTime" label="Date" width="110"> </el-table-column>
            </el-table>
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
      // 搜索类别以及搜索字段
      dataType: "rock",

      searchType: "",
      // 标题
      pageTitle: "Search Result - ",
      // 对应后端url
      searchURL: "",
      // 搜索表单
      searchForm: null,

      // 正在加载与否
      loading: true,
      page: 1,
      size: 10,

      // 总列数
      totalNumber: 0,

      // 展示数据
      tableData: null,

      // 下载清单
      downloadList: [],

      // 搜索历史:
      searchHistory: null,

      // 正在下载
      isDownloading: false,
    };
  },
  computed: {},
  created() {
    if (sessionStorage.getItem("searchInfo")) {
      let searchObj = JSON.parse(sessionStorage.getItem("searchInfo"));
      // search的表单
      this.searchForm = searchObj.form;
      this.searchURL = searchObj.url;

      let historyRawData = JSON.parse(searchObj.searchHistory);
      this.downloadList = searchObj.downloadList;
      // 获取raw data 和 对应的类别
      let tableRawData = searchObj.rows;
      let currentPath = searchObj.object;
      // 生成最终数据
      this.totalNumber = searchObj.total;

      this.pageTitle += currentPath;
      this.dataType = currentPath;
    
      this.generateData(tableRawData);
      this.translateHistory(historyRawData);
      
    }
    else{
      this.$message.error("No available search");
      this.$router.push("/main");
      return;
    }
  },
  mounted() {},
  beforeDestroy() {
    sessionStorage.setItem("store", JSON.stringify(this.$store.state));
  },
  methods: {
    //返回主页
    back() {
      this.$router.push({ path: "/main" });
    },

    backToSearch(){
      this.$router.push({ path: `/${this.dataType}Data` });
    },

    tagTypes(objType){
      let dict = {
        "rock": "",
        "mineral": "success",
        "experiment": "warning",
      }
      return dict[objType];
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

    downloadData(){

      if(!this.hasLogin()){
        this.$message({
          message: "Please log in first!",
          type: "warning",
        });
        this.login("searchResult")
        return;
      }

      const url_final = `/download/${this.dataType}Data`;
      const listForm = new FormData();
      listForm.append("list", this.downloadList);
      this.isDownloading = true;
      this.$service.post(url_final, listForm, { responseType: 'arraybuffer' }).then((response) => {
        if(response){
          let mimeType = 'application/octet-stream'; // 默认 MIME 类型
          mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          // 将二进制数据转换为 Blob 对象
          const blob = new Blob([response.data], { type: mimeType });
          // 创建一个下载链接
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = this.dataType + "_search_result";
          document.body.appendChild(link);
          // 触发下载
          link.click();
          // 释放资源
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
          this.isDownloading = false;
        }
        else{
          this.$message({
            message: "Message Transform Error!",
            type: "warning",
          });
          this.isDownloading = false;
        }
      })
    },

    isObject(item) {
      return item !== null && typeof item === 'object' && !Array.isArray(item);
    },

    generateData(tableRawData){
      this.loading = true;
      // 对照表
      const element_type_unit = {
        "major": "(wt%)",
        "trace": "(ppm)",
        "isotope": "",
      }
      // 初始化结果对象，按照elem_type分类
      const element_header = {
        "major": [],
        "trace": [],
        "isotope": []
      };

      if(!tableRawData){
        return;
      }


      // 第一轮遍历，判断一级字典个数，生成并集
      tableRawData.forEach(item => {
        // 检查字典中是否有elements字段
        if (item["Element"]) {
          const elemType = item["Element"]["element_type"]
          const elemName = item["Element"]["element_name"]
          // 添加二级字典
          elemType.forEach((elem_type, index) => {
            // 检查elem_type的值，将elem_name添加到相应的分类中
            if (elem_type in element_header) {
              let elem_name = elemName[index]
              if (!element_header[elem_type].includes(elem_name)) {
                element_header[elem_type].push(elem_name);
              }
            }
          });
        }
      });

      // 生成额外添加的以及表头
      const first_column_names = []
      Object.entries(element_header).forEach(([elem_type, value]) => {
        if(value.length > 0){
          const key =  `${elem_type} element${element_type_unit[elem_type]}`
          first_column_names.push(key)
        }
      });

      // 遍历tableRawData中的每个字典
      tableRawData.forEach((item) => {
        // 检查字典中是否有elements字段
        if (item["Element"]) {
          // 遍历elements字段中的每个元素
          const elemType = item["Element"]["element_type"]
          const elemName = item["Element"]["element_name"]
          const elemNote = item["Element"]["element_note"]
          const elemValue = item["Element"]["element_value"]

          // 添加一级字典
          first_column_names.forEach((elem_first_header) => {
            item[elem_first_header] = "";
          })

          // 添加二级字典
          elemType.forEach((elem_type, index) => {
            // 检查elem_type的值，将elem_name添加到相应的分类中
            if (elem_type in element_header) {
              let elem_name = elemName[index]

              // 修改tableRawData中的成员，将elem_value 和 elem_note添加到对应的键值对中
              const key =  `${elem_type} element${element_type_unit[elem_type]}`
              if (!item[key]) {
                item[key] = {};
              }
              if (element_header[elem_type].includes(elem_name)) {
                item[key][elem_name] = elemValue[index]
              }
              // 适配后端表单的NULL情况
              if(elemNote[index] != "NULL"){
                item["Note"]= elemNote[index]
              }
            }
          });
          
          // 删除多余表结构
          delete item["Element"];
          
        }

        Object.keys(item).forEach((key) => {
          if (JSON.stringify(item[key]) === '{}') {
            this.$delete(item, key)
          }
        });
        delete item["ID"];

      });

      // 对于tableRawData的第一项，对所有element_header中的元素进行填充
      if (tableRawData[0]) {
        Object.keys(element_header).forEach(elemType => {
          const key = `${elemType} element${element_type_unit[elemType]}`
          element_header[elemType].forEach(elemName => {
            if (!tableRawData[0][key]) {
              tableRawData[0][key] = {};
            }
            if (!tableRawData[0][key][elemName]) {
              tableRawData[0][key][elemName] = "";
            }
          });
        });
      }

      // 生成列数
      this.tableData = tableRawData
      this.loading = false;
    },

    translateHistory(historyRawData){
      if(historyRawData == null) return;
      historyRawData.forEach((item) =>{
        item["SearchTime"] = new Date(item["SearchTime"]).toLocaleString();
      })
      historyRawData.reverse();
      this.searchHistory = historyRawData
    },
    
    handlePageChange(val){
      this.searchForm['page'] = val;
      this.page = val;
      this.loading = true;
      this.$service.post(this.searchURL, this.searchForm).then((res) => {
        if (!res.data.success) {
            this.$message.error(res.data.error.message);
            return false;
        } else {
            // 结果
            const tableRawData = res.data.data.data[0];
            this.generateData(tableRawData);
        }
      })
    },

    translate(key){
      if(key == "samp_age"){
        key = "Sample age(Ma)"
      }
      key = key.replaceAll("_", " ")
      return key.charAt(0).toUpperCase() + key.slice(1);
    },

    getTableColumnNumber(){
      // 在这里访问表格的列信息
      const columns = this.$refs.table ? this.$refs.table.columns : [];
      if(columns.length == 0){
        let column_count = 0;
        let item = this.tableData[0];
        Object.keys(item).forEach((key) => {
          if(this.isObject(item[key])) {
            Object.keys(item[key]).forEach((subkey) => {
              column_count += 1;
            })
          }
          else{
            column_count += 1;
          }
        });
        return column_count;
      }
      return columns.length;
    },

    toMachineLearning(){
      window.location.href = 'http://geochemistrypi.deep-time.org';
    },

    matchyourData(){
      this.$message.error("Please expecting at Version 2.0");
    },

    //跳转到DDE登录页
    login(context) {
      this.$store.dispatch('login', context);
    },

    flexColumnWidth (str, str2, arr1) {
        str = str + ''
        let columnContent = ""
        if (!arr1 || !arr1.length || arr1.length === 0 || arr1 === undefined) {
          return
        }
        if (!str || !str.length || str.length === 0 || str === undefined) {
          return
        }
        // 获取该列中最长的数据(内容)
        let index = 0
        if(str2 == null){
          for (let i = 0; i < arr1.length; i++) {
            if (this.isObject(arr1[i][str])) {
              return
            }
            const now_temp = arr1[i][str] + ''
            const max_temp = arr1[index][str] + ''
            if (now_temp.length > max_temp.length) {
              index = i
            }
          }
          columnContent = JSON.parse(JSON.stringify(arr1[index][str])) + ''
        }
        else{
          for (let i = 0; i < arr1.length; i++) {
            if (arr1[i][str] === undefined || arr1[i][str][str2] === null || arr1[i][str][str2] === undefined) {
              continue
            }
            const now_temp = arr1[i][str][str2] + ''
            const max_temp = arr1[index][str][str2] + ''
            if (now_temp.length > max_temp.length) {
              index = i
            }
          }
          if(arr1[index][str][str2] == undefined){
            columnContent = ""
          }
          else{
            columnContent = JSON.parse(JSON.stringify(arr1[index][str][str2])) + ''
          }
        }
        // 以下分配的单位长度可根据实际需求进行调整
        let flexWidth = 10
        for (const char of columnContent) {
          flexWidth += 8
        }
        if(flexWidth < 100){
          flexWidth = 100
        }
        return flexWidth + 'px'
    },
  },
};
</script>

<style scoped>
.my-search{
  margin-top: 10px;
}
.note-two{
  font-family: 'Arial Negreta cursiva', 'Arial Normal', 'Arial';
  font-weight: 700;
  font-style: italic;
  font-size: 18px;
  color: rgba(128, 225, 255, 0.996);
  text-align: left;
}
.note-one{
  white-space: nowrap;
  font-family: 'Calibri Italic', 'Calibri';
  font-weight: 700;
  font-style: italic;
  font-size: 16px;
  color: rgba(10, 10, 10, 0.996)}
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
.main-div {
  width: 1200px;
  margin: 0 auto;
  height: auto;
  display: flex;
  text-align: center;
  justify-content: space-between;
}

.main-left {
  margin-top: 20px;
  width: 900px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
}

.el-pagination {
  margin: 0 auto;
  width: 100%;
  padding: 10px 0; /* 添加上下 padding 以改善外观 */
}

.table-left{
  width: 100%;
  font-size: 10px;
  margin: auto;
}

.table-right{
  width: 100%;
  font-size: 10px;
  margin: auto;
  margin-top: 10px;
  overflow-y: auto;
}

.sub-div {
  height: auto;
  text-align: left;
}
.main-right {
  width: 250px;
  height: 650px;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  text-align: center;
  /* justify-content: space-between; */
}
.title-div {
  margin: 0 auto;
  font-family: "Comic Sans MS Negreta", "Comic Sans MS Normal", "Comic Sans MS";
  font-weight: 700;
  font-style: normal;
  font-size: 36px;
  color: #ffffff;
}

.el-main {
  height: auto;
}

#building {
  background: url("../../assets/rock_data_bg.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: auto;
  background-size: 100% 100%;
}

</style>