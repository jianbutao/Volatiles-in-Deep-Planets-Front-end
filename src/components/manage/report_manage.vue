<template>
  <div class="user-message-main">
    <div class="show-message">
      <div class="show-div div-1">
        <div class="title-text">Month Report Number</div>
        <div class="middle-text">Compared last month<span class="active-num">{{acceptedFileNum}}</span></div>
        <div class="bottom-text">{{ uploadNum }}</div>
      </div>
      <div class="show-div div-1">
        <div class="title-text">Waiting to Answer</div>
        <div class="middle-text">Answered num today<span class="active-num">{{checkNum}}</span></div>
        <div class="bottom-text">{{waitingCheckNum}}</div>
      </div>
      <div class="show-div div-2">Div 3</div>
      <div class="show-div div-2">Div 4</div>
    </div>
    <div class="upload-table">
        <div class="table-head">
            <el-button size="medium" type="danger" class="delete-btn" v-if="multipleSelection.length > 0">Batch Delete</el-button>
            <el-input
                class="search-input"
                placeholder="Search upload file"
                prefix-icon="el-icon-search"
                v-model="input">
                <el-button slot="append" icon="el-icon-search"></el-button></el-input>
            <el-button size="medium" type="primary" class="add-btn"><i class="el-icon-plus el-icon--left"></i>Add Upload</el-button>
        </div>
      <el-table
        ref="multipleTable"
        height="500"
        :data="uploadList" style="width: 100%"
        :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50" label="No"></el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="email" label="Email"></el-table-column>
        <el-table-column prop="uploadData" label="Report Content" sortable></el-table-column>
        <el-table-column prop="description" label="Files"></el-table-column>
        <el-table-column prop="dataFiles" label="Report Time">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Download</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="status" label="Status"></el-table-column>
        <el-table-column  label="Operation">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" >Delete</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
        </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        uploadList:[
            {
                name:"test",
                email:"xxxxxx@xxx.com",
                uploadData:"mineral data",
                description:"xxxxx",
                uploadTime:"2022-05-21",
                status:0
            },
            {
                name:"test",
                email:"xxxxxx@xxx.com",
                uploadData:"mineral data",
                description:"xxxxx",
                uploadTime:"2022-05-21",
                status:0
            },
            {
                name:"test",
                email:"xxxxxx@xxx.com",
                uploadData:"mineral data",
                description:"xxxxx",
                uploadTime:"2022-05-21",
                status:0
            },
            {
                name:"test",
                email:"xxxxxx@xxx.com",
                uploadData:"mineral data",
                description:"xxxxx",
                uploadTime:"2022-05-21",
                status:0
            },
            {
                name:"test",
                email:"xxxxxx@xxx.com",
                uploadData:"mineral data",
                description:"xxxxx",
                uploadTime:"2022-05-21",
                status:0
            },
            {
                name:"test",
                email:"xxxxxx@xxx.com",
                uploadData:"mineral data",
                description:"xxxxx",
                uploadTime:"2022-05-21",
                status:0
            },
            {
                name:"test",
                email:"xxxxxx@xxx.com",
                uploadData:"mineral data",
                description:"xxxxx",
                uploadTime:"2022-05-21",
                status:0
            },
            {
                name:"test",
                email:"xxxxxx@xxx.com",
                uploadData:"mineral data",
                description:"xxxxx",
                uploadTime:"2022-05-21",
                status:0
            },
            {
                name:"test",
                email:"xxxxxx@xxx.com",
                uploadData:"mineral data",
                description:"xxxxx",
                uploadTime:"2022-05-21",
                status:0
            },
            {
                name:"test",
                email:"xxxxxx@xxx.com",
                uploadData:"mineral data",
                description:"xxxxx",
                uploadTime:"2022-05-21",
                status:0
            }
        ],//用户上传数据列表
        search: '',
        multipleSelection:[],
        currentPage4: 4,
        input:'',//查询输入内容
        acceptedFileNum:13,
        uploadNum:23,
        checkNum:3,
        waitingCheckNum:12
    };
  },
  computed: {},
  created() {},
  mounted() {
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
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    //编辑操作
    handleEdit(index, row) {
        console.log(index, row);
    },
    //删除操作
    handleDelete(index, row) {
        console.log(index, row);
    },
    //多选操作
    handleSelectionChange(val) {
        this.multipleSelection = val;
    }
  },
};
</script>
<style scoped>
.active-num{
    color: #02A7F0;
}
.title-text{
    height: 40%;
    width: 100%;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
    font-weight: 700;
    color: #333333;
    font-size: 24px;
    text-align: left;
}
.middle-text{
    height: 30%;
    width: 100%;
    color: #333333;
    font-size: 16px;
    text-align: right;
}
.bottom-text{
    height: 30%;
    width: 100%;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
    font-weight: 700;
    color: #333333;
    font-size: 28px;
    text-align: left;
}
.div-1{
    padding: 1.5%;
    border-radius: 23px;
    background-color: white;
}
.delete-btn{
    margin-right: 3%;
}
.search-input{
    width: 20%;
}
.add-btn{
    margin-left: 3%;
}
.table-head{
    display: flex; 
    align-items: center;
    margin-bottom: 1%;
}
.show-div {
  width: 20%;
}
.show-message {
  height: 20%;
  width: 100%;
  display: flex;
  margin-top: 1%;
  justify-content: space-between;
}
.upload-table {
    margin-top: 1%;
    overflow-y: auto;
    width: 100%;
}

.user-message-main {
  height: 100%;
  margin: 0 auto;
}
</style>