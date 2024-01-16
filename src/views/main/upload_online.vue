<template>
  <div id="building">
    <el-container>
      <el-header>
        <LogoComponent :page="'rockData'" />
        <div class="title-div">Uploaded Data Template</div>
        <el-button class="back-btn" @click="back">Home</el-button>
      </el-header>
      <el-main>
        <div class="main-div">

          <div class="step-div">
            <el-steps simple  
              :active="active" 
              finish-status="success">
              <el-step title="1.Choose data file"></el-step>
              <el-step title="2.Fill data description"></el-step>
              <el-step title="3.Submit data"></el-step>
            </el-steps>
          </div>

          <div class="upload-div" @click.stop>
            <!-- Step 1 -->

            <el-upload v-if="active === 0"
              action="#"
              drag
              :before-upload="beforeUpload"
              :on-exceed="handleExceed"
              :limit="1"
              :http-request="Upload"
              show-file-list
              >

              <div class="upload-text-div">
                <div style="">
                  <i class="el-icon-upload"></i>
                  <div>drag the file here to upload it or<em> click to upload</em>
                    <br>(xlsx, xls, csv)</div>
                  <br/>
                  <div slot="tip" class="el-upload__tip">
                    Note1: Please ensure that your data format fits the data template of this database.
                  </div>
                  <div slot="tip" class="el-upload__tip">
                    Note2: The uploaded data will be reviewed and imported on HTG database as an open source for all users.
                  </div>
                  <el-link type="primary" @click.stop="toTemplatePage">
                    click here to data template
                  </el-link>
                </div>
              </div>
            </el-upload>

            <!-- Step 2 & 3 -->
            <div class="my-form" v-if="active > 0">
              <el-form
                ref="formInline"
                :model="formInline"
                :rules="rules"
                label-position="right"
                label-width="auto"
                class="form-inline"
              >
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="Collector Name" prop="collectorName">
                      <el-input :disabled="active === 2" v-model="formInline.collectorName" placeholder="Enter Collector Name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Collector Email" prop="collectorEmail">
                      <el-input :disabled="active === 2" v-model="formInline.collectorEmail" placeholder="Enter Collector Email"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="Organization" prop="organization">
                      <el-input :disabled="active === 2" v-model="formInline.organization" placeholder="Enter Organization"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Collect Time" prop="collectTime">
                      <el-date-picker style="width: 190px" :disabled="active === 2" v-model="formInline.collectTime" type="date" placeholder="Select Date"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="Sample Type" prop="sampleType" :rules="rules.sampleType">
                      <el-input :disabled="active === 2" v-model="formInline.sampleType" placeholder="Enter Sample Type"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Sample Name" prop="sampleName" :rules="rules.sampleName">
                      <el-input :disabled="active === 2" v-model="formInline.sampleName" placeholder="Enter Sample Name"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="Collect Location" prop="collectLocation" :rules="rules.collectLocation">
                      <el-input :disabled="active === 2" v-model="formInline.collectLocation" placeholder="Enter Collect Location"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Source Type" prop="sourceType" :rules="rules.sourceType">
                      <el-input :disabled="active === 2" v-model="formInline.sourceType" placeholder="Enter Source Type"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 其他表单项 ... -->
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="Note" prop="note">
                      <el-input :disabled="active === 2" :rows="5" type="textarea" v-model="formInline.note" placeholder="Enter Note"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>

            </div>
          </div>

          <div class="next-div">
            <el-button class="next-btn left-btn" type="primary" @click="back" v-if="active === 0">Cancel</el-button>
            <el-button class="next-btn left-btn" type="primary"  @click="pageUp" v-if="active > 0">Back</el-button>
            <el-button class="next-btn right-btn" type="primary" @click="next" v-if="active < 2">Next</el-button>
            <el-button class="next-btn right-btn" type="primary" @click="postData" v-if="active === 2">Submit</el-button>
          </div>

          <div class="bottom-div"></div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import LogoComponent from "@/components/LogoComponent.vue";
export default {
  components: {
    LogoComponent,
  },
  data() {
    return {
      active: 0,

      formInline: {
        files: '',
        collectorName: '',
        collectorEmail: '',
        organization: '',
        collectTime: '',
        sampleType: '',
        sampleName: '',
        collectLocation: '',
        sourceType: '',
        note: '',
      },

      rules: {
        collectorName: [{ required: true, message: 'Collector Name is required', trigger: 'blur' }],
        collectorEmail: [
          { required: true, message: 'Collector Email is required', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] }
        ],
        organization: [{ required: true, message: 'Organization is required', trigger: 'blur' }],
        collectTime: [{ required: true, message: 'Collect Time is required', trigger: 'blur' }],
        sampleType: [{ required: true, message: 'Sample Type is required', trigger: 'blur' }],
        sampleName: [{ required: true, message: 'Sample Name is required', trigger: 'blur' }],
        collectLocation: [{ required: true, message: 'Collect Location is required', trigger: 'blur' }],
        sourceType: [{ required: true, message: 'Source Type is required', trigger: 'blur' }],
        note: [{ required: true, message: 'Note is required', trigger: 'blur' }],
      },
    };
  },
  computed: {},
  created() {},
  methods: {
    //返回主页
    back() {
      this.$router.push({ path: "/main" });
    },
    next() {
      if(this.formInline.files == ''){
        this.$message.error("please upload file first");
      }
      else if(this.active == 1){
        this.$refs['formInline'].validate((valid) => {
          if (valid) {
            this.active++;
          } else {
            this.$message.error("Error! please check your form");
          }
        });
      }
      else{
        this.active++;
      }
    },
    pageUp(){
      this.active--;
    },
    postData() {
      const formData = new FormData();
      // 日期格式和后端适配
      this.formInline.collectTime = new Date(Date.parse(this.formInline.collectTime)).toISOString();
      // 将 formInline 的内容逐个追加到 FormData 中
      for (const key in this.formInline) {
        formData.append(key, this.formInline[key]);
      }
      this.$service.post("/file/upload", formData).then((res) => {
        if (!res.data.success) {
          this.$message.error(res.data.error.message);
          return false;
        } else {
          this.$message({ message: "upload success", type: "success" });
          this.clearForm();
          this.active = 0;
        }
      });
    },
    Upload(file) {
      this.$message.success('upload success');
      this.formInline.files = file.file;
    },
    clearForm() {
      this.active = 0;
      this.formInline = {
        files: '',
        collectorName: '',
        collectorEmail: '',
        organization: '',
        collectTime: '',
        sampleType: '',
        sampleName: '',
        collectLocation: '',
        sourceType: '',
        note: '',
      };
    },
    beforeUpload(file, filelist) {
      // 获取文件的后缀名
      const extension = file.name.split('.').pop().toLowerCase();
      // 允许上传的文件类型
      const allowedExtensions = ['xls', 'xlsx', 'csv'];

      // 判断文件类型是否在允许的列表中
      if (allowedExtensions.indexOf(extension) === -1) {
        this.$message.error('wrong file type, please upload again');
        return false; // 阻止上传
      }
      
      // 文件类型满足要求，允许上传
      return true;
    },

    handleExceed(file, fileList) {
      this.$message.warning(`you can only upload one file`);
    },

    toTemplatePage(){
      this.$router.push({ path: "/dataTemplate" });
    },
  },
};
</script>
<style scoped>
.el-upload__tip{
  font-family: 'Arial Narrow Bold Italic', 'Arial Narrow', 'Arial';
  font-weight: 700;
  margin: 5px;
  font-style: italic;
  font-size: 16px;
  color: #555555;
}
.el-upload__text{
  font-family: 'Arial Narrow Bold Italic', 'Arial Narrow', 'Arial';
  font-weight: 700;
  font-style: italic;
  font-size: 16px;
  color: rgba(51, 51, 51, 0.901960784313726);
}
.upload-text-div{
  margin: auto;
  margin-top: 100px;
  height: 350px;
}
.path-div{
  padding-top: 1%;
  margin-bottom: 1.5%;
}
.path-input{
  width: 88%;
}
.my-input{
  width: 200px;
}
.my-textarea{
  width: 230%;
}
.my-form{
  padding-top: 1%;
  margin: auto;
  margin-top: 50px;
  width: 800px;
}
::v-deep .el-upload {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
::v-deep .el-upload .el-upload-dragger {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;

}

.my-span{
  margin-left: -7%;
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  color: #333333;
}
::v-deep .form-item .el-form-item__label{
  font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
}

::v-deep .el-upload-list__item .el-upload-list__item-name {
  font-size: 18px;
  color: #ec4a4a;
  font-weight: bold;
}

::v-deep .el-upload-list__item  .el-icon-close {
  padding: 6px;
  border-radius: 4px;
}

.form-inline{
  width: 80%;
  margin: 0 auto;
}
.next-btn{
  font-size: 18px;
  width: 150px;
  height: 45px;
  font-family: 'Arial Normal', 'Arial';
  font-weight: 400;
  border-radius: 5px;
  margin-top: 2%;
}
.right-btn{
  float: right;
  margin-right: 5%;
}
.left-btn{
  float: left;
  margin-left: 5%;
}
.next-div{
  width: 100%;
  margin-top: 1%;
}
.upload-div{
  width: 100%;
  height: 500px;
  margin-top: 1%;
  background-color: rgba(255, 255, 255, 0.698039215686274);
  border-width: 2px;
  border-style: solid;
  border-color: rgba(170, 170, 170, 1);
  border-radius: 11px;
}
/* 步骤部分 */
.step-div{
  margin: auto;
  width: 1000px;
}
/* 整个区域的大小 */
.main-div{
  width: 1000px;
  height: calc(100% - 80px);
  margin: 0 auto;
  margin-top: 2%;
  text-align: center;
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
  padding: 0;
}
.el-footer {
  padding: 0;
  height: 80px !important;
}
.el-container {
  height: 100vh;
}
#building {
  background: url("../../assets/upload_online_simple.jpg");
  width: 100%;
  overflow-y: auto;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
:deep(.el-textarea__inner){
    resize: none;
} 
</style>