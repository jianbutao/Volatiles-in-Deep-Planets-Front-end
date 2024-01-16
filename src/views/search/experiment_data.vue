<template>
  <div id="building">
    <el-container>
      <el-header>
        <LogoComponent :page="'rockData'" />
        <div class="title-div">Search Data - Experiment</div>
        <el-button class="back-btn" @click="back">Home</el-button>
      </el-header>
      <el-main>
        <div style="max-width: 800px; margin: auto;">
          <h2>Let's customize your experiment data filter!</h2>
          <el-form style="text-align: left;" label-position="left" label-width="200px" size="mini" 
            :model="form" 
            :rules="rules" 
            ref="form">
            
            <!-- sample 段落 -->
            <p>
              <el-button :type="showSampleForm ? 'danger' : ''" round @click="showSampleForm = !showSampleForm">Filter By Experiment Sample</el-button>
            </p>
            <el-card shadow="never" v-if="showSampleForm">
              <el-form-item label="sample name" >
                <el-select
                  filterable 
                  placeholder="Please Select"
                  v-model="form.sample.sampleName"
                  multiple
                  clearable
                  collapse-tags
                  >
                  <el-option
                    v-for="(item, index) in sampleName"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <br />

              <!-- 多选框 -->
              <el-form-item label="sample type">
                <el-checkbox-group v-model="form.sample.dataType">
                  <el-checkbox v-for="item in sampleType" :label="item" :key="item">
                    {{item}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <br />
              <p>
                <el-button size="mini" type="info" @click="clearByType('sample')">Clear</el-button>
                <el-button size="mini" type="primary" @click="submitAll('sample')" :disabled="!submitReady">Submit Filter</el-button>
              </p>
            </el-card>

            <!-- Element 段落 -->
            <p>
              <el-button :type="showElementsForm ? 'danger' : ''" round @click="showElementsForm = !showElementsForm">Filter By Elements & Isotopes</el-button>
            </p>
            <el-card class="filter-card" shadow="never" v-if="showElementsForm">
              <!-- 动态表单 -->
              <el-card class="element-card" shadow="never" 
                v-for="(single_element, element_index) in form.element" 
                v-if = "single_element.disabled == false"
                :key="element_index"
              >
                <div class="card-content">
                  <br/>
                  <el-form-item label="select element" >
                    <el-select
                      placeholder="Please Select"
                      v-model= single_element.elem_name
                      clearable
                      >
                      <el-option
                        v-for="(item, index) in elementName"
                        :key="item"
                        :label="item"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <br />
                  <el-form-item label="unit">
                    <el-select v-model="single_element.elem_unit" placeholder="Please Select">
                      <el-option
                        v-for="item in ['major(wt%)', 'trace(ppm)', 'isotope']"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <br />
                  <el-form-item label="value" 
                    :prop="'element.' + element_index + '.value'"
                    >
                    <el-input style="width: 40%; margin-right: 2%" v-model="single_element.elem_lower_bound" placeholder="Enter Lower Bound"></el-input>
                    <span>—</span>
                    <el-input style="width: 40%; margin-left: 2%" v-model="single_element.elem_upper_bound" placeholder="Enter Upper Bound"></el-input>
                  </el-form-item>
                  <el-button class="remove-button" size="mini" type="danger" @click.prevent="removeElement(single_element)">Delete</el-button>
                </div>
              </el-card>
              <p>
                <el-button size="mini" type="success" @click="addElement">Add Element</el-button>
                <el-button size="mini" type="info" @click="clearByType('element')">Clear</el-button>
                <el-button size="mini" type="primary" @click="submitAll('element')" :disabled="!submitReady">Submit Filter</el-button>
              </p>
            </el-card>

            <!-- Condition 段落 -->
            <p>
              <el-button :type="showConditionForm ? 'danger' : ''" round @click="showConditionForm = !showConditionForm">Filter By Condition Setting</el-button>
            </p>
            <el-card shadow="never" v-if="showConditionForm">

              <el-form-item label="T (℃)" prop="condition.exper_temperature">
                <el-input style="width: 40%; margin-right: 2%" v-model="form.condition.exper_temperatureLower" placeholder="Enter Lower Bound"></el-input>
                <span>—</span>
                <el-input style="width: 40%; margin-left: 2%" v-model="form.condition.exper_temperatureUpper" placeholder="Enter Upper Bound"></el-input>
              </el-form-item>
              <br />
              <el-form-item label="Press (GPa)" prop="condition.exper_press">
                <el-input style="width: 40%; margin-right: 2%" v-model="form.condition.exper_pressLower" placeholder="Enter Lower Bound"></el-input>
                <span>—</span>
                <el-input style="width: 40%; margin-left: 2%" v-model="form.condition.exper_pressUpper" placeholder="Enter Upper Bound"></el-input>
              </el-form-item>
              <br />
              <el-form-item label="Time (min)" prop="condition.exper_time">
                <el-input style="width: 40%; margin-right: 2%" v-model="form.condition.exper_timeLower" placeholder="Enter Lower Bound"></el-input>
                <span>—</span>
                <el-input style="width: 40%; margin-left: 2%" v-model="form.condition.exper_timeUpper" placeholder="Enter Upper Bound"></el-input>
              </el-form-item>
              <br />
              <el-form-item label="Log(fO2)" prop="condition.logf_o2">
                <el-input style="width: 40%; margin-right: 2%" v-model="form.condition.logf_o2Lower" placeholder="Enter Lower Bound"></el-input>
                <span>—</span>
                <el-input style="width: 40%; margin-left: 2%" v-model="form.condition.logf_o2Upper" placeholder="Enter Upper Bound"></el-input>
              </el-form-item>
              <br />

              <p>
                <el-button size="mini" type="info" @click="clearByType('condition')">Clear</el-button>
                <el-button size="mini" type="primary" @click="submitAll('condition')" :disabled="!submitReady">Submit Filter</el-button>
              </p>
            </el-card>

            <!-- DataSource 段落 -->
            <p>
              <el-button :type="showDataSourceForm ? 'danger' : ''" round @click="showDataSourceForm = !showDataSourceForm">Filter By Data Source</el-button>
            </p>
            <el-card shadow="never" v-if="showDataSourceForm">

              <el-form-item label="source type">
                <el-select v-model="form.source.collectSource" placeholder="Please Select">
                  <el-option
                    v-for="item in ['paper', 'test', 'database']"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <br />
              
              <!-- <el-form-item label="journal" >
                <el-select
                  filterable 
                  placeholder="Please Select"
                  v-model="form.source.journal"
                  multiple
                  clearable
                  collapse-tags
                  >
                  <el-option
                    v-for="(item, index) in journal"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                    <el-tooltip
                      placement="top"
                      :disabled="item.length<50"
                    >
                      <div slot="content">
                          <span>{{item}}</span>
                      </div>
                      <div class="iclass-text-ellipsis">{{ item.length < 50 ? item:item.substring(0, 50) + "..." }}</div>
                    </el-tooltip>
                  </el-option>
                </el-select>
              </el-form-item>
              <br />

              <el-form-item label="first author" >
                <el-select
                  filterable 
                  placeholder="Please Select"
                  v-model="form.source.firstAuthor"
                  multiple
                  clearable
                  collapse-tags
                  >
                  <el-option
                    v-for="(item, index) in firstAuthor"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <br /> -->

              <el-form-item label="publish year" prop="source.year">
                <el-input style="width: 40%; margin-right: 2%" v-model.number="form.source.minYear" placeholder="Enter Lower Bound"></el-input>
                <span>—</span>
                <el-input style="width: 40%; margin-left: 2%" v-model.number="form.source.maxYear" placeholder="Enter Upper Bound"></el-input>
              </el-form-item>
              <br />

              <p>
                <el-button size="mini" type="info" @click="clearByType('source')">Clear</el-button>
                <el-button size="mini" type="primary" @click="submitAll('source')" :disabled="!submitReady">Submit Filter</el-button>
              </p>
            </el-card>
          </el-form>


          <!-- 统一提交 -->
          <p>
            <el-button type="info" @click="clearAll">Clear All</el-button>
            <el-button type="primary" @click="submitAll('all')" :disabled="!submitReady">Submit Filter All</el-button>
          </p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import LogoComponent from "@/components/LogoComponent.vue";
  import { searchPageData }  from "@/store/searchPageData"

  // 恢复到最初形态的数据
  const initialData = {
      // 全局设定 分页相关信息
      page: 1,
      size: 10,

      // sample 相关
      sample: {
        sampleName: [],
        dataType: [],
      },

      // condition 相关
      condition: {
        exper_temperatureLower: null,
        exper_temperatureUpper: null,
        exper_pressLower: null,
        exper_pressUpper: null,
        exper_timeLower: null,
        exper_timeUpper: null,
        logf_o2Lower: null,
        logf_o2Upper: null,
      },

      // source 相关
      source: {
        collectSource: [],
        minYear: null,
        maxYear: null,
        journal: [],
        author: [],
      },

      // 根据element 进行检索, 注意结果要转置
      element: [
        {
          // 用来构造伪删除，避免删除出错
          disabled: false,
          elem_name: "",
          elem_unit: "",
          elem_lower_bound: "",
          elem_upper_bound: "",
        },
      ],
  };

  // url对照表
  const url_range_data = {
    element: "/element/search/experiment",
    sample: "/experimentProperty/search/sampleType",
    source: "/dataSource/search/experiment",
    condition: "/experimentProperty/search/condition",
    all: "/filter/all/experiment",
  };

  export default {
    components: {
      LogoComponent,
    },
    data() {
      return {
        object: 'experiment',

        // 动态获取部分
        sampleName: searchPageData.sampleNames,
        elementName: searchPageData.elementNamesForExperiment,
        journal: searchPageData.journalForExperiment,
        firstAuthor: searchPageData.firstAuthorForExperiment,

        // type相关辅助字段
        sampleType: searchPageData.experimentSampleType,

        // 表单是否展开
        showSampleForm: false,
        showElementsForm: false, 
        showConditionForm: false,
        showDataSourceForm: false,

        // 最终的表单数据
        form: {

          // 全局设定 分页相关信息
          page: 1,
          size: 10,

          // sample 相关
          sample: {
            sampleName: [],
            dataType: [],
          },

          // condition 相关
          condition: {
            exper_temperatureLower: null,
            exper_temperatureUpper: null,
            exper_pressLower: null,
            exper_pressUpper: null,
            exper_timeLower: null,
            exper_timeUpper: null,
            logf_o2Lower: null,
            logf_o2Upper: null,
          },

          // source 相关
          source: {
            collectSource: [],
            minYear: null,
            maxYear: null,
            journal: [],
            author: [],
          },

          // 根据element 进行检索, 注意结果要转置
          element: [
            {
              // 用来构造伪删除，避免删除出错
              disabled: false,
              elem_name: "",
              elem_unit: "",
              elem_lower_bound: "",
              elem_upper_bound: "",
            },
          ],
        },

        // 表单验证
        rules: {
          sample: {},
          element: [
            {
              value: [
                { validator: this.validateNumberRange("element", "element value", 0, 100, 0), trigger: 'blur' },
              ],
            },
          ],
          condition: {
            exper_temperature: [
              { validator: this.validateNumberRange("condition", "exper_temperature", 0, 9999), trigger: 'blur' },
            ],
            exper_press: [
              { validator: this.validateNumberRange("condition", "exper_press", 0, 9999), trigger: 'blur' },
            ],
            exper_time: [
              { validator: this.validateNumberRange("condition", "exper_time", 0, 99999), trigger: 'blur' },
            ],
            logf_o2: [
              { validator: this.validateNumberRange("condition", "logf_o2", "-100.00", "100.00"), trigger: 'blur' },
            ],
          },
          source: {
            year: [
              { validator: this.validateNumberRange("source", "year", 1900, 2023), trigger: 'blur' },
            ]
          }
        },

        // 查询按钮拦截，一旦发起请求，设置为false并且组织用户的一切提交
        submitReady: true,
      };
    },
    computed: {},
    created() {},
    methods: {
      // element的提交需要转置
      elementTransform(){
        const transform = {
          "major(wt%)": "wt%",
          "trace(ppm)": "ppm",
          "isotope": "‰",
        }
        let elementResult = {
          elem_name: [],
          elem_unit: [],
          elem_lower_bound: [],
          elem_upper_bound: [],
        }
        this.form.element.forEach((item) => {
          if(!item.disabled){
            // 避免用户疏漏
            if(item.elem_unit == ""){
              elementResult.elem_unit.push("wt%");
            }
            else{
              elementResult.elem_unit.push(transform[item.elem_unit]);
            }

            elementResult.elem_name.push(item.elem_name);
            elementResult.elem_lower_bound.push(parseFloat(item.elem_lower_bound));
            elementResult.elem_upper_bound.push(parseFloat(item.elem_upper_bound));
          }
        })

        return elementResult;
      },

      // 删除与增加元素
      removeElement(item) {
        var index = this.form.element.indexOf(item)
        if (index !== -1) {
          // 伪删除
          this.form.element[index].disabled = true;
          // 删除对应的表单验证
          this.rules.element.splice(index, 1)
        }
      },

      addElement() {
        this.form.element.push({
          elem_name: "",
          elem_unit: "",
          elem_lower_bound: "",
          elem_upper_bound: "",
          disabled: false,
        });
        let element_rule_number = this.rules.element.length
        this.rules.element.push(
          {
            value: [
              { validator: this.validateNumberRange("element", "element value", 0, 100, element_rule_number), trigger: 'blur' },
            ],
          },
        )
      },
      // (仅上下限相关页面使用) 表单验证自适应
      validateNumberRange(type, name, min_number, max_number, index=0) {
        return (rule, value, callback) => {
          let numberLower, numberUpper;
          let lowerName, upperName;
          let lowerInfo, upperInfo;

          if(type == 'element'){
            // 注意提取单位
            lowerInfo = this.form[type][index]["elem_lower_bound"]
            upperInfo = this.form[type][index]["elem_upper_bound"]
            let unit = this.form[type][index]["elem_unit"]
            let name = this.form[type][index]["elem_name"]
            if(name == ""){
              callback(new Error("Please choose element name"))
              return;
            }
            if(unit == ""){
              callback(new Error("Please choose element unit"))
              return;
            }
            else if(unit == "major(wt%)"){
              max_number = 100;
            }
            else if(unit == "trace(ppm)"){
              max_number = 100000;
            }
            else{
              min_number = -100;
              max_number = 100;
            }
          }
          else{
             if(type == 'source'){
              lowerName = "minYear";
              upperName = "maxYear";
            }
            else{
              lowerName = name + "Lower";
              upperName = name + "Upper";
            }
            lowerInfo = this.form[type][lowerName];
            upperInfo = this.form[type][upperName];
          }

          numberLower = parseFloat(lowerInfo);
          numberUpper = parseFloat(upperInfo);

          // 异常检测，非数字输入
          if (isNaN(numberLower) || isNaN(numberUpper)){
            callback(new Error("Please enter valid number"))
            return;
          }
          // 超过界限
          if(numberLower < min_number || numberUpper > max_number){
            if(name == "logf_o2"){
              name = "Log(fO2)"
            }
            callback(new Error(`${name} range should be between ${min_number} and ${max_number}`))
            return;
          }
          // 下限高于上限
          if (numberLower > numberUpper) {
            callback(new Error("Please ensure lower bound is less than upper bound"))
            return;
          }
          // 小数位数超过10位
          if (!this.validateDecimalPlaces(numberLower, 10) || !this.validateDecimalPlaces(numberUpper, 10)){
            callback(new Error(`${name} should have at most 10 decimal places`));
            return;
          }

          // 恢复
          // 保证传输是转化后结果: 例如12ab3会自动解析为12 
          this.form[type][lowerName] = numberLower;
          this.form[type][upperName] = numberUpper;
        };
      },

      // 小数位数核验
      validateDecimalPlaces(value, maxDecimalPlaces) {
        const regex = new RegExp(`^-?[0-9]+(?:\\.[0-9]{1,${maxDecimalPlaces}})?$`);
        return regex.test(value);
      },

      // 根据当前的type清除所有的数据
      clearByType(search_type){
        if(search_type == "element"){
          this["form"][search_type] = [{ ...initialData[search_type][0] }];
        }
        else{
          // 清除数据
          this["form"][search_type] = { ...initialData[search_type] };
        }
      },

      //返回主页
      back() {
        this.$router.push({ path: "/main" });
      },

      // 提交表单
      submitAll(search_type){
        let result = {};
        let search_types = [];

        // 如果查询为all
        if(search_type == 'all'){
          search_types = ['source', 'element', 'sample', 'condition'];
        }
        else{
          search_types = [search_type];
        }

        // 表单验证
        let validation_number = 0;
        search_types.forEach((search_type) => {
          // element区别对待
          const validation_items = Object.keys(this.rules[search_type]);
          let validate_str = ""
          if(search_type == "element"){
            validate_str += ".value"
          }
          validation_items.forEach(item => {
            this.$refs["form"].validateField(`${search_type}.${item}` + validate_str, (formError) => {
              if(formError){
                validation_number += 1;
                return;
              }
            });
          })
        })

        if(validation_number > 0){
          this.$message.error("Form Error, Please check your input!");
          return;
        }

        // 如果查询为element, 用all暂时代替
        if(search_type == 'element'){
          search_types = ['source', 'element', 'sample', 'condition'];
        }

        // 添加键值对信息
        search_types.forEach((type_info) => {
          if(type_info == "element"){
            result = this.elementTransform();
          }
          else{
            for (const key in this.form[type_info]) {
              result[key] = this.form[type_info][key];
            }
          }
        });

        result['page'] = this.form.page;
        result['size'] = this.form.size;

        // 将 URL 参数附加到请求 URL 中
        const url_final = url_range_data[search_type];
        this.submitReady = false;

        // 发起 POST 请求
        this.$service.post(url_final, result).then((res) => {
          this.submitReady = true;
          if (!res.data.success) {
              this.$message.error(res.data.error.message);
              return false;
          } else {
              // 结果
              if(res.data.data.total == 0 || res.data.data.message == "All value is null"){
                this.$message.error("No Available Result");
                return false;
              }
              
              // 封装包裹
              const hisform = new FormData();
              hisform.append("search_type", this.object);
              hisform.append("search_notes", search_type);

              // 发送查询历史记录
              this.$service.post("/search-history/details", hisform).then((historyRes) => {
                let searchHistoryInfo = null;
                if(historyRes.data.success){
                  searchHistoryInfo = JSON.stringify(historyRes.data.data.data)
                }
                // 存储信息
                sessionStorage.setItem('searchInfo',  JSON.stringify({
                  object: this.object,
                  form: result,
                  url: url_final,
                  rows: res.data.data.data[0],
                  total: res.data.data.total,
                  searchHistory: searchHistoryInfo,
                  downloadList: res.data.data.samp_id,
                }));

                this.$router.push({ path: "/searchResult" });
              })
          }
        })
      },
      
      clearAll() {
        let search_types = ['source', 'element', 'sample', 'condition'];
        search_types.forEach((item) => {
          this.clearByType(item)
        })
      },
    },
  };
</script>


<style scoped>
.element-card{
  background-color: #ffffff;
  margin-bottom: 20px
}

.filter-card{
  background-color: rgba(230, 230, 230, 0.3)
}
.my-form{
  font-family: "Arial Negreta", "Arial Normal", "Arial", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #000000;
}
.text-one{
  color: #FFFF80;
}
.text-two{
  color: #555555;
}
.title-text{
  font-family: "Arial Negreta", "Arial Normal", "Arial", sans-serif;
  font-weight: 700;
}
.my-btn:hover {
  background-color: rgb(167, 196, 209);
  color: rgb(25, 154, 252);
  font-family: "Arial Negreta", "Arial Normal", "Arial", sans-serif;
  font-weight: 700;
  font-size: 24px;
  border: none;
  border-radius: 18px;
}
.btn-one{
  color: #FFFF80;
  background-color: rgb(129, 128, 129);
  font-family: "Arial Negreta", "Arial Normal", "Arial", sans-serif;
  font-weight: 700;
  font-size: 24px;
  border: none;
  border-radius: 18px;
}
.div-two{
  background-color: rgba(255, 255, 128, 0.4980392156862745);
}
.div-one{
  background-color: rgba(127, 127, 127, 0.5607843137254902);
}
::v-deep .el-form-item{
  margin-top: -10px;
}
.grid-content{
  border-radius: 18px;
  height: 300px;
  width: 100%;
  display: flex; 
  align-items: center; 
  justify-content: center;
}
.search-div{
  height: 100%;
  width: 100%;
}
.main-div {
  margin: 0 auto;
  width: 90%;
  height: 90%;
}
.filter-all-btn {
  text-align: center;
  border-width: 0px;
  float: right;
  width: 10%;
  color: #333333;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  background-color: rgb(120, 190, 220);
  font-style: normal;
  font-size: 20px;
}
.clear-all-btn {
  border-width: 0px;
  color: #333333;
  background-color: rgb(196, 195, 193);
  margin-right: 3%;
  width: 10%;
  float: right;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
}
.top-note-div {
  font-family: "Arial Narrow Bold Oblique", "Arial Narrow Bold", "Arial Narrow",
    "Arial";
  font-weight: 700;
  font-style: oblique;
  font-size: 20px;
  text-align: left;
}
.bottom-note-div {
  text-align: left;
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  color: #ffffff;
}
.footer-div {
  margin: 0 auto;
  width: 90%;
  height: 100%;
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
  width: 100%;
  height: 100%;
}

#building {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: fixed;
  background-size: 100% 100%;
}

.card-content {
  display: flex;
  flex-direction: column;
}
.remove-button {
  align-self: flex-end;
  margin-top: 10px; /* 调整按钮与其他表单项的间距 */
}

.el-select {
  width: 300px;
}
.el-select ::v-deep .popper-class {
  width: 300px;
}
.iclass-text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>