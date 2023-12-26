<template>
  <div id="building">
    <el-container>
      <el-header>
        <LogoComponent :page="'user'" />
        <el-button class="back-btn" @click="back">Home</el-button>
      </el-header>
      <el-main>
        <div class="container" ref="container">
          <!-- Sign In -->
          <div class="container__form container--signin">
            <el-image class="login-logo" :src="url" fit="cover"></el-image>
            <h2 class="form__title">Sign In</h2>
            <span class="note-text">Don't have an account? <el-button type="text" @click="addActiveClass">Sign Up</el-button></span>
            <el-form ref="loginForm"
              :model="loginForm" id="form1" class="login-form">
              <el-form-item label="Account Name">
                <el-input v-model="loginForm.account" @keyup.enter.native="goToLogin"></el-input>
              </el-form-item>
              <el-form-item label="Password">
                <el-input v-model="loginForm.password" show-password @keyup.enter.native="goToLogin"></el-input>
              </el-form-item>
              <!-- <el-form-item>
                <el-checkbox style="float: left;" v-model="loginForm.rememberMe">Remember Me</el-checkbox>
                <el-button type="text" @click="addActiveClass" style="float: right;">Forgot your password?</el-button>
              </el-form-item> -->
              <el-form-item>
                <el-button type="primary" @click="goToLogin">Sign In</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- Sign Up -->
          <div class="container__form container--signup">
            <el-image class="login-logo" :src="url" fit="cover"></el-image>
            <h2 class="form__title">Sign Up</h2>
            <span class="note-text">Already have an account? <el-button type="text" @click="removeActiveClass">Sign In</el-button></span>
            <el-form ref="signUpForm"
              :model="signUpForm" id="form2" class="login-form">
              <el-form-item label="Account Name">
                <el-input v-model="signUpForm.account" @keyup.enter.native="goToSinUp"></el-input>
              </el-form-item>
              <el-form-item label="Password">
                <el-input v-model="signUpForm.password" show-password  @keyup.enter.native="goToSinUp"></el-input>
              </el-form-item>
              <!-- <el-form-item label="Email">
                <el-input v-model="signUpForm.email"></el-input>
              </el-form-item>
              <el-form-item label="Confirm Password">
                <el-input v-model="signUpForm.confirm"></el-input>
              </el-form-item> -->
              <el-form-item>
                <el-button type="primary" @click="goToSignUp">Sign Up</el-button>
              </el-form-item>
              By clicking the "Sign Up" button, you are creating an account, and you agree to the Terms of Use.
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
        High T Geochemistry Benchmark Database, All Rights Reserved &#169; 2023
      </el-footer>
    </el-container>
  </div>
</template>
  <script>
import LogoComponent from "@/components/myComponent/LogoComponent.vue";
export default {
  components: {
    LogoComponent,
  },
  data() {
    return {
      loginForm: {
        account:'',
        password:'',
      },
      signUpForm:{
        account:'',
        password:'',
      },
      url: require('../../assets/logo.png')
    };
  },
  mounted() {
    var loginType = this.$store.state.userStatus;
    if (loginType == "register") {
      this.addActiveClass();
    }
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
  },
  beforeDestroy() {
    sessionStorage.setItem("store", JSON.stringify(this.$store.state));
  },
  computed: {
    
  },
  created() {
  },
  methods: {
    //返回主页
    back() {
      this.$router.push({ path: "/main" });
    },
    removeActiveClass() {
      this.$refs.container.classList.remove("right-panel-active");
    },
    addActiveClass() {
      this.$refs.container.classList.add("right-panel-active");
    },
    //注册
    goToSignUp(){
      const form = new FormData();
      form.append("username", this.signUpForm.account);
      form.append("password", this.signUpForm.password);
      this.$service.post("/user/add", form).then((res) => {
        if (!res.data.success) {
          this.$message.error("The user name is already in use");
          return false;
        } else {
          this.$message({ message: "Registered successfully", type: "success" });
          this.removeActiveClass();
          this.loginForm.account = this.signUpForm.account;
        }
      });
      this.signUpForm.password = "";
    },
    //登录
    goToLogin() {
      const form = new FormData();
      form.append("username", this.loginForm.account);
      form.append("password", this.loginForm.password);
      this.$service.post("/auth/login", form).then((res) => {
        if (!res.data.success) {
          this.$message.error("The account or password is incorrect");
          this.loginForm.password = "";
          return false;
        } else {
          this.$message({ message: "Login success", type: "success" });
          this.$store.commit("setUserName", this.loginForm.account);
          this.$router.back('/main');
        }
      });
    },
  },
};
</script>
<style scoped>
.note-text{
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  letter-spacing: 0.4px;
  color: rgba(0, 0, 0, 0.7607843137254902);
}

.el-header {
  display: flex;
  height: 100px !important;
  flex-direction: column;
  justify-content: center;
  background: rgba(23, 21, 21, 1.0);
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
  background: url("../../assets/BJ1_simple.jpg");
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
.el-header {
  display: flex;
  height: 100px !important;
  flex-direction: column;
  justify-content: center;
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
  background: url("../../assets/BJ1_simple.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
</style>