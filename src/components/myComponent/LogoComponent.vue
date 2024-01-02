<template>
    <div class="logo-div" @click="toHome">
      <img :src='logo_src' class="logo-img" fit="cover" >
      <div class="logo-title">
        <div class="title-top">High Temperature Geochemistry</div>
        <div class="title-bottom">BENCHMARK DATABASE</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LogoComponent',
    props: ['page'],
    data() {
      return {
        logo_src:require('../../assets/logo_simple.png'),
      };
    },
    methods: {
      toHome() {
        if(this.page == 'home'){
          location.reload();
        }else{
          this.$router.push({path: "/main"});
        }
        
      }
    }
  };
  </script>
  
<style scoped>
.logo-title{
  color: rgb(128, 255, 255);
  /* width: 70%; */
}
.title-top{
  font-size: 18px;
  font-family: Arial, sans-serif;
  margin-top: 10px;
  font-weight: bold;
}
.title-bottom{
  font-family: "Arial Narrow", Arial, sans-serif;
  font-weight: bold;
  margin-top: 10px;
  font-size: 17px;
}
.logo-img{
  width: 80px;
  height: 80px;
}
.logo-div{
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  max-width: 25%;
  height: 80px;
}
  </style>
  