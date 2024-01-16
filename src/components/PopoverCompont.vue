<template>
  <el-popover placement="bottom" trigger="hover">
    <div class="popover-div">
      <!-- <el-button class="popover-btn" type="text" @click="handleCommand()"
        >My center</el-button> -->
      <el-button
        class="popover-btn"
        @click="dialogFormVisible = true"
        type="text"
        >Change password</el-button
      >
      <el-button class="popover-btn exit-btn" type="text" @click="exitLogin"
        >exit</el-button
      >
    </div>
    <el-avatar shape="square" :size="40" slot="reference">{{
      userName
    }}</el-avatar>
    <el-dialog
      center
      width="30%"
      :modal-append-to-body="false"
      title="Change Password Form"
      :visible.sync="dialogFormVisible"
      @close="handleClose"
    >
      <el-form
        :model="modPasswordForm"
        status-icon
        :rules="rules"
        ref="modPasswordForm"
      >
        <el-form-item label="Old Password" prop="old_password">
          <el-input v-model="modPasswordForm.old_password" show-password></el-input>
        </el-form-item>
        <el-form-item label="New Password" prop="new_password">
          <el-input v-model="modPasswordForm.new_password" show-password></el-input>
        </el-form-item>
        <el-form-item label="Check Password" prop="check_pass">
          <el-input v-model="modPasswordForm.check_pass" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('modPasswordForm')">Reset</el-button>
        <el-button type="primary" @click="submitForm('modPasswordForm')"
          >Submit</el-button
        >
      </div>
    </el-dialog>
  </el-popover>
</template>
  
<script>
import { loginURL } from '@/store/loginURL';
export default {
  name: "PopoverCompont",
  props: ["userName"],
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter the old password"));
      } else {
        callback();
      }
    };
    var validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your new password"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Type your new password again. "));
      } else if (value !== this.modPasswordForm.new_pass) {
        callback(new Error("The two passwords you typed do not match."));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      modPasswordForm: {
        old_password: "",
        new_password: "",
        check_pass: "",
      },
      rules: {
        old_password: [{ validator: validateOldPass, trigger: "blur" }],
        new_password: [{ validator: validateNewPass, trigger: "blur" }],
        check_pass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  computed: {},
  created() {},
  methods: {
    handleClose() {
      this.$refs.modPasswordForm.resetFields();
    },
    handleCommand() {
      let currentPath = this.$router.currentRoute.path;
      let command = "manageCenter/userMessage";
      if (
        currentPath != "/userCenter/userMessage" ||
        currentPath != "/manageCenter/userMessage"
      ) {
        let login_flag = this.hasLogin();
        let pathUrl = "/";
        if (login_flag) {
          pathUrl += command;
        } else {
          pathUrl += "login";
        }
        this.$router.push({ path: pathUrl });
      } else {
        location.reload();
      }
    },
    //判断是否登录
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
    //退出登录
    exitLogin() {
      this.$cookies.remove("token");
      this.$store.commit("setUserName", "");
      sessionStorage.removeItem("store");

      // DDE系统那边的退出
      const exitUrl = loginURL.baseURL + loginURL.exit

      // 构建携带参数的 URL
      const params = {
        context: "https://htgdb.deep-time.org/main"
      };

      const queryString = Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

      // 拼接完整的 URL
      const urlWithParams = `${exitUrl}?${queryString}`;

      // 发送 token 验证请求
      window.location.href = urlWithParams;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
  
<style scoped>
.exit-btn {
  color: tomato;
}
.popover-btn {
  display: block;
  margin: 0 auto;
}
.popover-div {
  height:10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
  