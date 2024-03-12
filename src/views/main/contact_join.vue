<template>
  <div id="building">
    <el-container>
      <el-header>
        <LogoComponent :page="'expertData'" />
      </el-header>
      <el-main>
        <div class="main-div">
          <span class="text-title">Feedback Report<br /></span>
          <span class="text-info"
            >If you find that the data does not fit original literature, data
            missing from the sample, data template does not match and other
            problems during the use of this website, please fill in the
            following form and feedback to us.<br/></span>
            <br/>
            <br/>
            <span class="text-info">Please fill the table:<br/></span>
          <div class="report-form">
            <el-form ref="form" label-position="top" :model="form" label-width="80px" :rules="rules">
              <el-form-item label="Your Name" prop="reporter_name">
                <el-input v-model="form.reporter_name"></el-input>
              </el-form-item>
              <el-form-item label="Please select a subject" prop="subject">
                <el-select v-model="form.subject" style="width: 100%;" placeholder="Please select">
                  <el-option label="Suggestion" value="suggestion"></el-option>
                  <el-option label="Compliment" value="compliment"></el-option>
                  <el-option label="Something's error" value="error"></el-option>
                  <el-option label="I have a question" value="question"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="What would you like to share with us?" prop="problems">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="Please enter content"
                  v-model="form.problems">
                </el-input>
              </el-form-item>
              <el-form-item label="Relative files (if applicable)" prop="file">
                <el-upload
                  action="#"
                  style="height: 100%; width: 100%"
                  drag
                  :before-upload="beforeUpload"
                  :on-exceed="handleExceed"
                  :limit="1"
                  :http-request="Upload"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">Drag the file here, or <em> click Upload </em></div>
                </el-upload>
              </el-form-item>

              <el-form-item label="Email Address" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="How likely are you to recommend us to your friends and colleagues?"  prop="rank">
                <el-rate
                    v-model="form.rank"
                    :max="10"
                    show-text
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                    void-color="rgba(0, 0, 0, 0.5)"
                    :texts="['1 Very unlikely', '2', '3', '4', '5', '6', '7', '8', '9', '10 Extremely likely']"
                  >
                </el-rate>
              </el-form-item>
              <br/>
              <el-form-item style="text-align: center;">
                <el-button  type="primary" @click="onSubmit">SUBMIT</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="bottom-div"></div>
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
      form: {
        file: "",
        subject: "",
        reporter_name: "",
        email: "",
        problems: "",
        rank: 0,
      },

      rules: {
        reporter_name: [
          { required: true, message: 'Please enter your name', trigger: 'blur' },
        ],
        subject: [
          { required: true, message: 'Please select a subject', trigger: 'change' },
        ],
        problems: [
          { required: true, message: 'Please enter your feedback', trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Please enter your email', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: ['blur', 'change'] }
        ],
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
    Upload(file) {
      this.$message.success('upload success');
      this.form.file = file.file;
    },
    beforeUpload(file, filelist) {
      // 获取文件的后缀名
      const extension = file.name.split('.').pop().toLowerCase();
      // 允许上传的文件类型
      const allowedExtensions = ['xlsx', 'xls', 'csv', 'txt',  'png', 'jpg', 'jpeg'];

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
    
    onSubmit(){
      if(!this.hasLogin()){
        this.$message({
          message: "Please log in first!",
          type: "warning",
        });
        this.login("contactJoin")
        return;
      }
      const userName = this.$store.state.userName
      if(userName != null){
        this.$refs.form.validate(valid => {
          if (valid) {
            const formData = new FormData();

            // 将 formInline 的内容逐个追加到 FormData 中
            for (const key in this.form) {
              formData.append(key, this.form[key]);
            }
            this.$service.post("/reports/insert", formData).then((res) => {
              if (!res.data.success) {
                this.$message.error(res.data.error.message);
                return false;
              } else {
                this.$message({ message: "upload report success", type: "success" });
                this.$refs.form.resetFields();
              }
            });
          } else {
            this.$message.error("please check your form");
          }
        });
      }
      else{
        this.$message.error("please login first");
      }
    },
    
    //跳转到DDE登录页
    login(context) {
      this.$store.dispatch('login', context);
    },
  },
};
</script>
<style scoped>
::v-deep .el-rate__icon{
  font-size: 30px; /* 调整这个值来改变星星的大小 */
}
.text-info {
  font-family: "Arial Normal", "Arial", sans-serif;
  font-weight: 200;
  font-size: 18px;
  color: #464646;
  line-height: 1.5;
}
.text-title {
  font-size: 28px;
  font-family: "Arial Normal", "Arial";
  margin: 20px;
  font-weight: 400;
  color: #333333;
  text-align: center;
  display: block;
  line-height: 1.5;
}
.main-div {
  text-align: left;
  margin: 0 auto;
  margin-top: 1.5%;
  padding: 1% 5%;
  box-sizing: border-box;
  width: 60%;
  /* height: 95%; */
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 12cap;
  background-repeat: no-repeat;
  background-size: cover;
}
.title-div {
  margin: 0 auto;
  font-family: "Comic Sans MS Negreta", "Comic Sans MS Normal", "Comic Sans MS";
  font-weight: 700;
  font-style: normal;
  font-size: 36px;
  color: #ffffff;
}

#building {
  background: url("../../assets/expert_data_simple.jpg");
  width: 100%;
  overflow-y: auto;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
.upload-text-div{
  margin: 0 auto;
  position: relative;
  margin-top: 10%;
  height: 50%;
}
.bottom-div{
  height: 100px;
}
</style>