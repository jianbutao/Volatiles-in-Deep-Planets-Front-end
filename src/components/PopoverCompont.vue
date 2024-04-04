<template>
  <el-popover placement="bottom" trigger="hover">
    <div class="popover-div">
      <el-button class="popover-btn exit-btn" type="text" @click="exitLogin"
        >exit</el-button
      >
    </div>
    <el-avatar shape="square" :size="40" slot="reference">{{
      userName
    }}</el-avatar>
  </el-popover>
</template>
  
<script>
import { loginURL } from '@/store/loginURL';
export default {
  name: "PopoverCompont",
  props: ["userName"],
  data() {
    return{

    }
  },
  computed: {},
  created() {},
  methods: {
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
      this.$store.commit("setUserAdmin", false);
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
  