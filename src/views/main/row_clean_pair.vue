<template>
  <el-container>
    <el-header>
      <LogoComponent :page="'expertData'" />
    </el-header>
    <el-main>
      <div class="main-div">
        <div class="top-note-div">
          Raw-Clean Pairs of Volatiles in Deep Planets
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
      <div class="bot-div">
        <div class="sub-title">
          Raw-Clean Pairs for Clinopyroxene mineral
        </div>

        <div class="image-block">
          <div class="image-card">
            <img class="image-info" fit="cover" style="margin-top: 15%;":src="image1" />
            <div class="image-main-text">
              (Qin et al. 2022 JGR)
            </div>
          </div>
          <div class="image-description">
            <div class="image-description-block" style="width: 90%">
              <div class="image-text">
                Qin, B., Huang, F., Huang, S., Python, A., Chen, Y., & ZhangZhou, J. (2022). 
                Machine learning investigation of clinopyroxene compositions to evaluate 
                and predict mantle metasomatism worldwide. Journal of Geophysical Research: 
                Solid Earth,127, e2021JB023614.
              </div>
              <a class="image-text" href="https://doi.org/10.1029/2021JB023614">
                https://doi.org/10.1029/2021JB023614
              </a>
              <br/>
              <div class="image-main-text">
                Figure
              </div>
              <div class="image-text">
                The data cleaning process consists of four main steps: 
                (1) Downloading major and trace element data for clinopyroxene samples from GEOROC, yielding 110,000 records; 
                (2) Selecting compositional data for clinopyroxene from 972 global sampling sites, resulting in 31,000 records; 
                (3) Correcting data inconsistencies and decoding errors by referencing original publications; 
                (4) Pruning data for duplicates, input errors, and mismatches between mineral types and elemental contents. 
                The final dataset is organized into two sets: 21,000 records for major elements and 3,000 for trace elements, ready for model training.
              </div>
            </div>
          </div>
        </div>

        <div class="image-block" style="margin-top: 70px">
          <div class="image-description">
            <div class="image-description-block">
              <div class="image-text">
                Secular change in the mean K/La ratios of continental mafic rocks. 
                (a) Recalculated mean K/La values in the refined basaltic dataset used herein. 
                (b) Mean K/La values from C.-T. Liu and He (2021). Error bars show 1 s.e.m. uncertainties. 
                The nearly constant and low mean K/La values since ~3.2 Ga do not signify the emergence of 
                modern proportions of subaerial landmasses but likely due to the incomplete responses of submerged mafic 
                samples' K/La ratios during hydrothermal alteration.
              </div>
            </div>
          </div>
          <div class="image-card" style="width: 60%">
            <img class="image-info" fit="cover" :src="image2" />
            <div class="image-main-text">
              (Qin et al. 2022 JGR)
            </div>
          </div>
        </div>

        <div class="sub-title" style="margin-top: 100px">
          Raw-Clean Pairs for Igneous rock 
        </div>

        <div class="image-block">
          <div class="image-card">
            <img class="image-info" fit="cover" style="margin-top: 5%;":src="image3" />
            <div class="image-main-text">
              (Liu et al. 2024 GRL)
            </div>
          </div>
          <div class="image-description">
            <div class="image-description-block" style="width: 90%">
              <div class="image-text">
                Liu, C.-T., Liu, X.-M., & ZhangZhou, J. (2024). 
                Data-driven investigation reveals subaerial proportion 
                of basalts since the early Archean. Geophysical Research 
                Letters, 51, e2023GL107066.
              </div>
              <a class="image-text" href="https://doi.org/10.1029/2023GL107066">
                https://doi.org/10.1029/2023GL107066
              </a>
              <br/>
              <div class="image-main-text">
                Figure
              </div>
              <div class="image-text">
                  (a) The simplified workflow for refining the geochronological 
                  and geochemical data. To improve the data quality, we manually 
                  checked the data against their original publications and related 
                  references with the help of the ZJU Earth Data Group. We obtained 
                  feedback from experts to double-check the data and avoid artifacts.
              </div>
              <div class="image-text">
                  (b) The simplified XGBoost modeling and prediction workflow. 
                  The parental training dataset was compiled from the GEOROC database. 
                  The original application dataset comprises data from the EarthChem repository 
                  and the dataset of Keller and Schoene (2012). See Materials and Methods for 
                  details on the dataset.
              </div>
            </div>
          </div>
        </div>

        <div class="image-block" style="margin-top: 70px">
          <div class="image-description" style="width: 40%">
            <div class="image-description-block">
              <div class="image-text">
                Refined (blue) and unrefined (orange) age distributions of global 
                basaltic rocks and their associated errors. (a), (c) The refined 
                (n ≈ 5,800) and unrefined (n ≈ 6,700) age distributions (3.8–0.8 Ga), 
                respectively, and (b), (d) their respective 2σ error distributions. 
                Compared to the unrefined data set, the quality of the refined data 
                set is greatly improved. The gray shaded band in panels (b), 
                (d) highlights age errors smaller than 50 Myr: ∼83% of 
                the refined age errors are within this range, much improved 
                over only ∼45% in the unrefined data set. The unrefined data 
                set also includes negative age errors that result from mistakes in the raw data compilation.
              </div>
            </div>
          </div>
          <div class="image-card" style="width: 50%; margin-left: 10%">
            <img class="image-info" fit="cover" :src="image4" />
            <div class="image-main-text">
              (Liu et al. 2024 GRL)
            </div>
          </div>
        </div>
        
        <div class="example-block" style="margin-top: 100px">
          <div class="rect-circle">
            EXAMPLE1
          </div>
          <div class="sub-title">
            CPX Mineral Data with garbage characters
          </div>
        </div>

        <div class="image-block">
          <div class="image-card" style="width: 100%; margin-top: 30px;">
            <img class="image-info" fit="cover" :src="image5" />
            <div class="image-main-text">
              Raw data with garbage characters
            </div>
          </div>
        </div>

        <div class="image-block">
          <div class="image-card" style="width: 100%; margin-top: 30px;">
            <img class="image-info" fit="cover" :src="image6" />
            <div class="image-main-text">
              Clean data with garbage characters corrected
            </div>
          </div>
        </div>

        <div class="example-block" style="margin-top: 100px">
          <div class="rect-circle">
            EXAMPLE2
          </div>
          <div class="sub-title">
            CPX Mineral Data with column dislocation
          </div>
        </div>

        <div class="image-block">
          <div class="image-card" style="width: 100%; margin-top: 30px;">
            <img class="image-info" fit="cover" :src="image7" />
            <div class="image-main-text">
              Raw data with column dislocation from Sample lD C22062 to C23040
            </div>
          </div>
        </div>

        <div class="image-block">
          <div class="image-card" style="width: 100%; margin-top: 30px;">
            <img class="image-info" fit="cover" :src="image8" />
            <div class="image-main-text">
              Clean data with column location corrected from Sample lD C22062 to C23040
            </div>
          </div>
        </div>

      </div>

    </el-main>
  </el-container>
</template>
<script>
import image1 from '@/assets/image/imageTopLeft.png'
import image2 from '@/assets/image/imageTopRight.png'
import image3 from '@/assets/image/imageMidLeft.png'
import image4 from '@/assets/image/imageMidRight.png'
import image5 from '@/assets/image/imageBot1.png'
import image6 from '@/assets/image/imageBot2.png'
import image7 from '@/assets/image/imageBot3.png'
import image8 from '@/assets/image/imageBot4.png'
import LogoComponent from "@/components/LogoComponent.vue";
import { downloadArrayBufferResponse } from "@/utils/download";
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
      image1: image1,
      image2: image2,
      image3: image3,
      image4: image4,
      image5: image5,
      image6: image6,
      image7: image7,
      image8: image8,
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
  font-weight: 400;
  text-align: left;
  margin-top: 20px;
  margin-left: 50px;
  margin-bottom: 50px;
  line-height: 20px;
  font-size: 15px;
  letter-spacing: 0.1ch;
  color: rgb(26, 34, 27);
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
  height: auto;
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

.bot-div{
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.8); 
  margin: 20px auto;
  /* 定死 */
  width: 1000px;
}

.sub-title{
  display: flex;
  justify-content: left;
  font-family: Jost;
  font-size: 20px;
  color: rgba(242, 91, 40, 1);
  text-align: left;
  margin-left: 15px;
}

.image-block{
  height: 50%;
  width: 100%;
  display: flex;
  margin: auto;
}

.image-description{
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.image-description-block{
  width: 100%;
  margin: auto;
  text-align: left;
}

.image-card{
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image-info{
  height: 100%;
  width: 100%;
}

.image-text{
  font-weight: 700;
  line-height: 25px;
  word-spacing: 5px;
}

.image-main-text{
  margin-top: 20px;
  font-family: Jost;
  font-weight: 700;
  font-size: large;
}

.example-block{
  display: flex;
  align-items: center;
}

.rect-circle{
  width: 110px;
  height: 30px;
  background-color: rgba(242, 91, 40, 1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Jost;
  font-weight: 550;
  font-size: 18px;
  border-radius: 20px;
}


</style>
