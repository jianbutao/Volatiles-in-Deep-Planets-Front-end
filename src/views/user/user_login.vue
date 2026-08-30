<template>
  <div id="building">
    <el-container>
      <el-header>
        <LogoComponent :page="'user'" />
      </el-header>
      <el-main>
        <div class="container" ref="container">
          <!-- Sign In -->
          <div class="container__form container--signin">
            <el-image class="login-logo" :src="url" fit="cover"></el-image>
            <h2 class="form__title">Sign In</h2>
            <span class="note-text">Don't have an account? <el-button type="text" @click="addActiveClass">Sign Up</el-button></span>
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" id="form1" class="login-form">
              <el-form-item label="Account Name" prop="account">
                <el-input v-model="loginForm.account" @keyup.enter.native="goToLogin" placeholder="Enter account name"></el-input>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input v-model="loginForm.password" show-password @keyup.enter.native="goToLogin" placeholder="Enter password"></el-input>
              </el-form-item>
              
              <!-- Captcha Section -->
              <el-form-item prop="captcha">
                <div style="text-align: left;">
                  Captcha
                </div>
                <div style="display: flex; justify-content: center; align-items: center; height: 50px;">
                  <el-input style="width: 70%;" v-model="loginForm.captcha" placeholder="Enter the captcha" @keyup.enter.native="goToLogin"></el-input>
                  
                  <el-image :src="captchaImage" fit="contain" style="width: 30%; height: 100%; margin-left: 10px; cursor: pointer;" @click="getCaptcha">
                    <div slot="error">
                      Captcha Error
                    </div>
                  </el-image>
                </div>
              </el-form-item>
              
              <br />
              <el-form-item>
                <el-button type="primary" @click="validateLoginForm">Sign In</el-button>
              </el-form-item>
            </el-form>
          </div>

          <!-- Sign Up -->
          <div class="container__form container--signup">
            <el-image class="login-logo" :src="url" fit="cover"></el-image>
            <h2 class="form__title">Sign Up</h2>
            <span class="note-text">Already have an account? <el-button type="text" @click="removeActiveClass">Sign In</el-button></span>
            <el-form ref="signUpForm" :model="signUpForm" :rules="signUpRules" id="form2" class="login-form">
              <el-form-item label="Account Name" prop="account">
                <el-input v-model="signUpForm.account" @keyup.enter.native="goToSignUp"></el-input>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input v-model="signUpForm.password" show-password @keyup.enter.native="goToSignUp"></el-input>
              </el-form-item>
              <el-form-item label="Confirm Password" prop="confirmPassword">
                <el-input 
                  v-model="signUpForm.confirmPassword" 
                  show-password 
                  @keyup.enter.native="goToSignUp">
                </el-input>
              </el-form-item>

              <!-- Captcha Section -->
              <el-form-item prop="captcha">
                <div style="text-align: left;">
                  Captcha
                </div>
                <div style="display: flex; justify-content: center; align-items: center; height: 50px;">
                  <el-input style="width: 70%;" v-model="signUpForm.captcha" placeholder="Enter the captcha" @keyup.enter.native="goToSignUp"></el-input>
                  
                  <el-image :src="captchaImage" fit="contain" style="width: 30%; height: 100%; margin-left: 10px; cursor: pointer;" @click="getCaptcha">
                    <div slot="error">
                      Captcha Error
                    </div>
                  </el-image>
                </div>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="validateSignUpForm">Sign Up</el-button>
              </el-form-item>
              <div style="font-size: 12px;">
                By clicking the "Sign Up" button, you are creating an account, and you agree to the Terms of Use.
              </div>
            </el-form>
          </div>
          <!-- Overlay -->
          <div class="container__overlay">
            <div class="overlay">
              <div class="overlay__panel overlay--left">
                <button class="btn" @click="removeActiveClass">Sign In</button>
              </div>
              <div class="overlay__panel overlay--right">
                <button class="btn" @click="addActiveClass">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        Volatiles in Deep Planets, All Rights Reserved &#169; 2026
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import LogoComponent from "@/components/LogoComponent.vue";
import CryptoJS from "crypto-js";

export default {
  components: {
    LogoComponent,
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
      if (!value) {
        callback(new Error("Please enter your username"));
      } else if (!usernameRegex.test(value)) {
        callback(new Error("Username must be 4-20 characters long, consisting of letters, numbers, or underscores"));
      } else {
        callback();
      }
    };

    const validatePassword = (rule, value, callback) => {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
      
      if (!value) {
        callback(new Error("Please enter your password"));
      } else if (!passwordRegex.test(value)) {
        callback(new Error("Password must be 6-20 characters long and contain both letters and numbers"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        account: '',
        password: '',
        captcha: '',
      },
      signUpForm: {
        account: '',
        password: '',
        captcha: '',
      },
      loginRules: {
        account: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      },
      signUpRules: {
        account: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        confirmPassword: [
          { required: true, message: 'Please confirm the password', trigger: 'blur' },
          { validator: this.validateConfirmPassword, trigger: 'blur' }
        ]
      },
      captchaImage: "",
      url: require('../../assets/icon/vdp-logo-web.png')
    };
  },
  async created() {
    this.getCaptcha();
  },
  methods: {
    validateLoginForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.goToLogin();
        } else {
          this.$message.error("Please correct the errors in the form.");
          return false;
        }
      });
    },
    validateSignUpForm() {
      this.$refs.signUpForm.validate((valid) => {
        if (valid) {
          this.goToSignUp();
        } else {
          this.$message.error("Please correct the errors in the form.");
          return false;
        }
      });
    },
    validateConfirmPassword(rule, value, callback) {
      if (value === '') {
        callback(new Error('Please confirm the password'));
      } else if (value !== this.signUpForm.password) {
        callback(new Error('Passwords do not match'));
      } else {
        callback();
      }
    },
    removeActiveClass() {
      this.$refs.container.classList.remove("right-panel-active");
    },
    addActiveClass() {
      this.$refs.container.classList.add("right-panel-active");
    },

    async getCaptcha() {
      this.$service.get("/auth/captcha").then((res) => {
        let uuid = res.data.uuid;
        let image =  res.data.captcha;
        this.captchaImage = image;
        localStorage.setItem('uuid', uuid);
      })
    },

    async goToSignUp() {
      // 使用 MD5 对密码进行加密
      const encryptedPassword = CryptoJS.MD5(this.signUpForm.password).toString();

      const form = new FormData();
      form.append("username", this.signUpForm.account);
      form.append("password", encryptedPassword); // 传输加密后的密码
      form.append("uuid", localStorage.getItem("uuid")); // 将 IP 地址传递给后端
      form.append("captcha", this.signUpForm.captcha); // 将 IP 地址传递给后端

      this.$service.post("/user/add", form).then((res) => {
        if (!res.data.success) {
          if(res.data.msg === "The user name already exists！"){
            this.$message.error("User name already in use!");
            // reload page
            // let currentPath = this.$router.currentRoute.path;
            // if (currentPath != '/main') {
            //   this.$router.push("/main");
            // } else {
            //   location.reload();
            // }
            this.signUpForm.account = "";
            this.signUpForm.captcha = "";
          }
          else{
            this.$message.error("captcha code is incorrect");
            this.signUpForm.captcha = "";
            this.getCaptcha()
          }
          return false;
        } else {
          this.$message({ message: "Registered successfully", type: "success" });
          this.removeActiveClass();
          this.loginForm.account = this.signUpForm.account;
        }
      });

      // this.signUpForm.password = "";
      // this.signUpForm.confirmPassword = "";
    },

    async goToLogin() {
      const encryptedPassword = CryptoJS.MD5(this.loginForm.password).toString();
      const form = new FormData();
      form.append("username", this.loginForm.account);
      form.append("password", encryptedPassword);
      form.append("uuid", localStorage.getItem("uuid")); // 将 IP 地址传递给后端
      form.append("captcha", this.loginForm.captcha); // 将 IP 地址传递给后端

      this.$service.post("/auth/login", form).then((res) => {
        if (!res.data.success) {
          if(res.data.msg === "Wrong username or password"){
            this.$message.error("The account or password is incorrect");
            // this.loginForm.password = "";
            this.loginForm.captcha = "";
            // reload page
            // let currentPath = this.$router.currentRoute.path;
            // if (currentPath != '/main') {
            //   this.$router.push("/main");
            // } else {
            //   location.reload();
            // }
          }
          else{
            this.$message.error("captcha code is incorrect");
            this.getCaptcha()
            // this.loginForm.password = "";
            this.loginForm.captcha = "";
          }
          return false;
        } else {
          this.$message({ message: "Login success", type: "success" });
          this.$store.commit("setUserName", this.loginForm.account);
          let currentPath = this.$router.currentRoute.path;
          if (currentPath != '/main') {
            this.$router.push("/main");
          } else {
            location.reload();
          }
        }
      });
    }
  }
};
</script>
  <style scoped>
  .note-text{
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    letter-spacing: 0.4px;
    color: rgba(0, 0, 0, 0.7607843137254902);
  }
  
  .login-form{
    margin:  0 auto;
    width: 70%;
    /* border: 1px solid red; */
  }
  
  .login-logo{
    width: 10%;
    height: 10%;
  }
  
  
  :root {
    /* COLORS */
    --white: #e9e9e9;
    --gray: #333;
    --blue: #0367a6;
    --lightblue: #008997;
  
    /* RADII */
    --button-radius: 0.7rem;
  
    /* SIZES */
    --max-width: 758px;
    --max-height: 420px;
  
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  
  .form__title {
    margin: 0;
    font-family: "Roboto Bold", "Roboto", sans-serif;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 1.25rem;
  }
  
  
  .container {
    /* background-color: var(--white); */
    /* border-radius: var(--button-radius); */
    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
      0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    height: var(--max-height);
    max-width: var(--max-width);
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 60%;
    margin: 0 auto;
  }
  
  .container__form {
    background-color: rgba(255, 255, 255, 0.7686274509803922);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: absolute;
    top: 0;
    transition: all 0.6s ease-in-out;
  }
  
  .container--signin {
    left: 0;
    width: 50%;
    z-index: 2;
  }
  
  .container--signup {
    left: 0;
    opacity: 0;
    width: 50%;
    z-index: 1;
  }
  
  .container.right-panel-active .container--signup {
    animation: show 0.6s;
    opacity: 1;
    transform: translateX(100%);
    z-index: 5;
  }
  
  .container__overlay {
    height: 100%;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: transform 0.6s ease-in-out;
    width: 50%;
    z-index: 100;
  }
  
  .container.right-panel-active .container__overlay {
    transform: translateX(-100%);
  }
  
  .overlay {
    background-color: white;
    /* background-color: var(--lightblue); */
    background: url("../../assets/background/BG1.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    left: -100%;
    position: relative;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 200%;
  }
  
  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }
  
  .overlay__panel {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      position: absolute;
      text-align: center;
      top: 0;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
      width: 50%;
  }
  
  .overlay--left {
    transform: translateX(-20%);
  }
  
  .container.right-panel-active .overlay--left {
    transform: translateX(0);
  }
  
  .overlay--right {
    right: 0;
    transform: translateX(0);
  }
  
  .container.right-panel-active .overlay--right {
    transform: translateX(20%);
  }
  
  .btn {
    border-radius: 20px;
    border: 1px solid var(--blue);
    color: var(--white);
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    padding: 0.9rem 4rem;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }
  
  .form > .btn {
    margin-top: 1.5rem;
  }
  
  .btn:active {
    transform: scale(0.95);
  }
  
  .btn:focus {
    outline: none;
  }
  
  .form {
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 3rem;
    height: 100%;
    text-align: center;
  }
  
  .input {
    background-color: #fff;
    border: none;
    padding: 0.9rem 0.9rem;
    margin: 0.5rem 0;
    width: 100%;
  }
  
  @keyframes show {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }
    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }
  .el-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .el-footer {
    display: flex;
    height: 60px !important;
    flex-direction: column;
    justify-content: center;
    color: rgba(215, 215, 215, 0.745098039215686);
    background: rgba(51, 51, 51, 0.27843137254902);
  }
  .el-container {
    height: 100vh;
  }
  #building {
    background: url("../../assets/background/BG1.jpg");
    width: 100%;
    height: 100%;
    position: fixed;
    background-size: 100% 100%;
  }
  .wrong-icon{
    width: 100px;
    height: 100px;
  }
  </style>
