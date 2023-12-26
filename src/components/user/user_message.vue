<template>
    <div class="user-message-main">
        <el-descriptions :column="1" border :contentStyle="rowCenter" :labelStyle="rowCenter">
            <el-descriptions-item label="User Name">{{this.userMessageForm.user_name}}</el-descriptions-item>
            <el-descriptions-item label="Email">
                <el-tag>{{this.userMessageForm.email}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Role">
                <el-tag type="warning">{{this.userMessageForm.role_name}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Create Time">
                <el-tag effect="plain">{{this.userMessageForm.create_time}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Last Login Time">
                <el-tag effect="plain">{{this.userMessageForm.ts}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="Status">
                <el-tag type="success">{{this.userMessageForm.status}}</el-tag>
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>
<script>
export default {
  data() {
    return {
        rowCenter: {
            "text-align": "center",
            "font-size": "20px",
            "color": "#000000",
            "background-color": "none"
        },
        userMessageForm:{
            user_name:'test',
            email:'test',
            role_name:'test',
            create_time:'test',
            ts:'test',
            status:'test'
        },//读取的用户信息
        
    };
  },
  computed: {},
  created() {},
  mounted() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
  },
  beforeDestroy () {
    sessionStorage.setItem('store', JSON.stringify(this.$store.state));
  },
  methods: {
  },
};
</script>
<style scoped>
.el-descriptions {
  width: 50% !important; 
  margin: 0 auto;
}
::v-deep .el-descriptions__body{
    background-color: transparent !important;
}
::v-deep .el-descriptions-item__label.is-bordered-label {
    background-color: transparent !important;
}

.user-message-main{
    width: 90%;
    margin: 0 auto;
    background-color: rgba(215, 215, 215, 0.317647058823529);
    margin-top: 5%;
}
</style>