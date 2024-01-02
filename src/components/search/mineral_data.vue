<template>
  <div id="building">
    <el-container>
      <el-header>
        <LogoComponent :page="'mineralData'" />
        <div class="title-div">Search Data - Mineral</div>
        <el-button class="back-btn" @click="back">Home</el-button>
      </el-header>
      <el-main>
        <div style="max-width: 800px; margin: auto;">
          <h2>Let's customize your mineral data filter!</h2>
          <el-form style="text-align: left;" label-position="left" label-width="200px" size="mini" 
            :model="form" 
            :rules="rules" 
            ref="form">
            
            <!-- type 段落 -->
            <p>
              <el-button :type="showMineralTypeForm ? 'danger' : ''" round @click="showMineralTypeForm = !showMineralTypeForm">Filter By Mineral Type</el-button>
            </p>
            <el-card shadow="never" v-if="showMineralTypeForm">
              <el-form-item label="mineral name" >
                <el-select
                  filterable 
                  placeholder="Please Select"
                  v-model="form.type.mineralName"
                  multiple
                  clearable
                  collapse-tags
                  >
                  <el-option
                    v-for="(item, index) in mineralName"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <br />
              <!-- 多选框 -->
              <el-form-item label="spot location">
                <el-checkbox-group v-model="form.type.spotLocation">
                  <el-checkbox v-for="item in spotLocation" :label="item" :key="item">
                    {{item}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <br />
              <p>
                <el-button size="mini" type="info" @click="clearByType('type')">Clear</el-button>
                <el-button size="mini" type="primary" @click="submitAll('type')" :disabled="!submitReady">Submit Filter</el-button>
              </p>
            </el-card>

            <!-- age 段落 -->
            <p>
              <el-button :type="showAgeForm ? 'danger' : ''" round @click="showAgeForm = !showAgeForm">Filter By Age</el-button>
            </p>
            <el-card class="filter-card" shadow="never" v-if="showAgeForm">
              <el-form-item label="chronology" >
                <!-- 纪元选择 -->
                <el-select
                  filterable 
                  placeholder="Please Select"
                  v-model="selectGeologicalPeriods"
                  multiple
                  clearable
                  collapse-tags
                  >
                  <el-option
                    v-for="(item, index) in geologicalPeriods"
                    :key="item"
                    :label="`${item}  ${geologicalAges[index]} - ${geologicalAges[index+1]}`"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <br />

              <el-form-item label="age(Ma)" prop="age.global_age">
                <el-input style="width: 40%; margin-right: 2%" v-model="global_age_min" placeholder="Enter Lower Bound"></el-input>
                <span>—</span>
                <el-input style="width: 40%; margin-left: 2%" v-model="global_age_max" placeholder="Enter Upper Bound"></el-input>
              </el-form-item>
              <br />
              
              <p>
                <el-button size="mini" type="info" @click="clearByType('age')">Clear</el-button>
                <el-button size="mini" type="primary" @click="submitAll('age')" :disabled="!submitReady">Submit Filter</el-button>
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


            <!-- Location 段落 -->
            <p>
              <el-button :type="showLocationForm ? 'danger' : ''" round @click="showLocationForm = !showLocationForm">Filter By Location</el-button>
            </p>
            <el-card class="filter-card" shadow="never" v-if="showLocationForm">
              <!-- Continent/Ocean选择 -->
              <el-form-item label="continent/ocean" >
                <el-select
                  filterable 
                  placeholder="Please Select"
                  v-model="form.location.continent"
                  multiple
                  clearable
                  collapse-tags
                  >
                  <el-option
                    v-for="(item, index) in continent"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <br />
              <!-- Country选择 -->
              <el-form-item label="country" >
                <el-select
                  filterable 
                  placeholder="Please Select"
                  v-model="form.location.country"
                  multiple
                  clearable
                  collapse-tags
                  >
                  <el-option
                    v-for="(item, index) in country"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <br />
              <el-form-item label="latitude" prop="location.latitude">
                <el-input style="width: 40%; margin-right: 2%" v-model="form.location.latitudeLowerBound" placeholder="Enter Lower Bound"></el-input>
                <span>—</span>
                <el-input style="width: 40%; margin-left: 2%" v-model="form.location.latitudeUpperBound" placeholder="Enter Upper Bound"></el-input>
              </el-form-item>
              <br />
              <el-form-item label="longitude" prop="location.longitude">
                <el-input style="width: 40%; margin-right: 2%" v-model="form.location.longitudeLowerBound" placeholder="Enter Lower Bound"></el-input>
                <span>—</span>
                <el-input style="width: 40%; margin-left: 2%" v-model="form.location.longitudeUpperBound" placeholder="Enter Upper Bound"></el-input>
              </el-form-item>
              <br />

              <p>
                <el-button size="mini" type="info" @click="clearByType('location')">Clear</el-button>
                <el-button size="mini" type="primary" @click="submitAll('location')" :disabled="!submitReady">Submit Filter</el-button>
              </p>
            </el-card>


            <!-- Environment 段落 -->
            <p>
              <el-button :type="showGeologicalForm ? 'danger' : ''" round @click="showGeologicalForm = !showGeologicalForm">Filter By Geological Setting</el-button>
            </p>
            <el-card class="filter-card" shadow="never" v-if="showGeologicalForm">

              <el-form-item label="plate" >
                <el-select
                  filterable 
                  placeholder="Please Select"
                  v-model="form.environment.plate"
                  multiple
                  clearable
                  collapse-tags
                  >
                  <el-option
                    v-for="(item, index) in plate"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <br />

              <!-- <el-form-item label="terrain" >
                <el-select
                  filterable 
                  placeholder="Please Select"
                  v-model="form.environment.terrane"
                  multiple
                  clearable
                  collapse-tags
                  >
                  <el-option
                    v-for="(item, index) in terrane"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <br /> -->

              <el-form-item label="P (GPa)" prop="environment.press">
                <el-input style="width: 40%; margin-right: 2%" v-model="form.environment.pressLowerBound" placeholder="Enter Lower Bound"></el-input>
                <span>—</span>
                <el-input style="width: 40%; margin-left: 2%" v-model="form.environment.pressUpperBound" placeholder="Enter Upper Bound"></el-input>
              </el-form-item>
              <br />
              <el-form-item label="T (℃)" prop="environment.temperature">
                <el-input style="width: 40%; margin-right: 2%" v-model="form.environment.temperatureLowerBound" placeholder="Enter Lower Bound"></el-input>
                <span>—</span>
                <el-input style="width: 40%; margin-left: 2%" v-model="form.environment.temperatureUpperBound" placeholder="Enter Upper Bound"></el-input>
              </el-form-item>
              <br />
              <el-form-item label="depth (km)" prop="environment.depth">
                <el-input style="width: 40%; margin-right: 2%" v-model="form.environment.depthLowerBound" placeholder="Enter Lower Bound"></el-input>
                <span>—</span>
                <el-input style="width: 40%; margin-left: 2%" v-model="form.environment.depthUpperBound" placeholder="Enter Upper Bound"></el-input>
              </el-form-item>
              <br />

              <p>
                <el-button size="mini" type="info" @click="clearByType('environment')">Clear</el-button>
                <el-button size="mini" type="primary" @click="submitAll('environment')" :disabled="!submitReady">Submit Filter</el-button>
              </p>
            </el-card>


            <!-- DataSource 段落 -->
            <p>
              <el-button :type="showDataSourceForm ? 'danger' : ''" round @click="showDataSourceForm = !showDataSourceForm">Filter By Data Source</el-button>
            </p>
            <el-card class="filter-card" shadow="never" v-if="showDataSourceForm">

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
  import LogoComponent from "@/components/myComponent/LogoComponent.vue";
  import { searchPageData }  from "@/store/searchPageData"

 // 恢复到最初形态的数据
  const initialData = {
    // 全局设定 分页相关信息
    page: 1,
    size: 10,

    // 这个有啥用?
    dataType: [],

    // 根据age 进行检索
    age: {
      minAge: [],
      maxAge: [],
      testMethod: [],
    },
    // 根据type 进行检索
    type: {
      mineralName: [],
      spotLocation: [],
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
    // 根据location 进行检索
    location: {
      continent: [],
      country: [],
      longitudeLowerBound: null,
      longitudeUpperBound: null,
      latitudeLowerBound: null,
      latitudeUpperBound: null,
    },
    // 根据environment 进行检索
    environment: {
      plate: [],
      terrane: [],
      pressLowerBound: null,
      pressUpperBound: null,
      temperatureLowerBound: null,
      temperatureUpperBound: null,
      depthLowerBound: null,
      depthUpperBound: null,
    },
    // 根据DataSource 进行检索
    source: {
      collectSource: [],
      minYear: null,
      maxYear: null,
      journal: [],
      author: [],
    }
  };

  // url对照表
  const url_range_data = {
    age: "/mainSample/search/mineral",
    element: "/element/search/mineral",
    type: "/mineralProperty/search",
    location: "/geoLocation/search/mineral",
    source: "/dataSource/search/mineral",
    environment: "/geoEnviron/search/mineral",
    all: "/filter/all/mineral",
  };

  export default {
    components: {
      LogoComponent,
    },
    data() {
      return {
        object: 'mineral',

        // 多选框所有可能答案
        // 写死部分
        spotLocation: searchPageData.mineralSpotLocation,
        continent: searchPageData.continent,
        country: searchPageData.countries,
        
        // 动态获取部分
        mineralName: searchPageData.mineralNames,
        plate: searchPageData.plate,
        terrane: searchPageData.terrane,
        elementName: searchPageData.elementNamesForMineral,
        journal: searchPageData.journalForMineral,
        firstAuthor: searchPageData.firstAuthorForMineral,

        // age相关辅助字段
        geologicalPeriods: searchPageData.geologicalPeriods,
        geologicalAges: searchPageData.geologicalAges,
        selectGeologicalPeriods: "",
        global_age_min: null,
        global_age_max: null,

        // 表单是否展开
        showMineralTypeForm: false, //是否显示mineral type搜索表单
        showAgeForm: false,
        showElementsForm: false, 
        showLocationForm: false,
        showGeologicalForm: false,
        showDataSourceForm: false,

        // 最终的表单数据
        form: {

          // 全局设定 分页相关信息
          page: 1,
          size: 10,

          // 这个有啥用?
          dataType: [],

          // 根据age 进行检索
          age: {
            minAge: [],
            maxAge: [],
            testMethod: [],
          },
          // 根据type 进行检索
          type: {
            mineralName: [],
            spotLocation: [],
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
          // 根据location 进行检索
          location: {
            continent: [],
            country: [],
            longitudeLowerBound: null,
            longitudeUpperBound: null,
            latitudeLowerBound: null,
            latitudeUpperBound: null,
          },
          // 根据environment 进行检索
          environment: {
            plate: [],
            terrane: [],
            pressLowerBound: null,
            pressUpperBound: null,
            temperatureLowerBound: null,
            temperatureUpperBound: null,
            depthLowerBound: null,
            depthUpperBound: null,
          },
          // 根据DataSource 进行检索
          source: {
            collectSource: [],
            minYear: null,
            maxYear: null,
            journal: [],
            author: [],
          },
        },

        // 表单验证
        rules: {
          type: {},
          age: {
            global_age: [
              { validator: this.validateNumberRange("age", "age", 0, 4600), trigger: 'blur' },
            ]
          },
          element: [
            {
              value: [
                { validator: this.validateNumberRange("element", "element value", 0, 100, 0), trigger: 'blur' },
              ],
            },
          ],
          location: {
            latitude: [
              { validator: this.validateNumberRange("location", "latitude", "-90.00", "90.00"), trigger: 'blur' },
            ],
            longitude: [
              { validator: this.validateNumberRange("location", "longitude", "-180.00", "180.00"), trigger: 'blur' },
            ]
          },
          environment: {
            depth: [
              { validator: this.validateNumberRange("environment", "depth", 0, 3500), trigger: 'blur' },
            ],
            temperature: [
              { validator: this.validateNumberRange("environment", "temperature", 0, 9999), trigger: 'blur' },
            ],
            press: [
              { validator: this.validateNumberRange("environment", "press", 0, 9999), trigger: 'blur' },
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
      // age的提交，需要提前转换，因此单独列出
      ageTranslation(){
        const all_decades = this.selectGeologicalPeriods

        let range_age_min = this.global_age_min ? this.global_age_min : 0;
        let range_age_max = this.global_age_max ? this.global_age_max : 4600;

        if(all_decades.length == 0){
          this.form.age.minAge = [range_age_min];
          this.form.age.maxAge = [range_age_max];
          return;
        }
        // 临时查询列表
        let age_min_list = [];
        let age_max_list = [];

        let temp_min = -1;
        let temp_max = -1;
        // 使用map方法，返回一个新数组，每个元素是对应的索引编号
        const indexes = all_decades.map(item => this.geologicalPeriods.findIndex(obj => obj === item))
        // 使用forEach方法，遍历索引数组，根据索引从this.selectGeologicalAges中获取minAge和maxAge，然后存入temp_age_list中

        let temp_list = [];
        indexes.forEach(index => {
          // 内部方法
          if(temp_min == -1){
            temp_min = this.geologicalAges[index]
            temp_max = this.geologicalAges[index + 1]
          }
          else{
            // 重叠时间段
            if(temp_max == this.geologicalAges[index]){
              temp_max = this.geologicalAges[index + 1]
            }
            // 重叠结束
            else{
              temp_list.push([temp_min, temp_max]);
              // 存放新的
              temp_min = this.geologicalAges[index];
              temp_max = this.geologicalAges[index + 1];
            }
          }
        })
        if(temp_min != -1){
          temp_list.push([temp_min, temp_max])
        }

        // 区间求交
        const temp_result = [];

        temp_list.forEach((interval) => {
          const [startA, endA] = interval;

          // 找到与 B 相交的部分
          const startB = Math.max(startA, range_age_min);
          const endB = Math.min(endA, range_age_max);

          // 如果相交部分的起始点小于等于结束点，说明存在交集
          if (startB <= endB) {
            temp_result.push([startB, endB]);
          }
        })

        temp_result.forEach((interval) =>{
          age_min_list.push(interval[0]);
          age_max_list.push(interval[1]);
        })
        this.form.age.minAge = age_min_list;
        this.form.age.maxAge = age_max_list;
      },

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

      // 表单验证部分
      // (仅上下限相关页面使用) 表单验证自适应
      validateNumberRange(type, name, min_number, max_number, index=0) {
        return (rule, value, callback) => {
          let numberLower, numberUpper;
          let lowerName, upperName;
          let lowerInfo, upperInfo;

          if(type == 'age'){
            lowerInfo = this.global_age_min;
            upperInfo = this.global_age_max;
          }

          else if(type == 'element'){
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
            else if(unit =="major(wt%)"){
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
              lowerName = name + "LowerBound";
              upperName = name + "UpperBound";
            }
            lowerInfo = this.form[type][lowerName];
            upperInfo = this.form[type][upperName];
          }

          // 如果全空，允许用户通过，返回所有结果
          if(lowerInfo == null && upperInfo == null || lowerInfo == "" && upperInfo == ""){
            return;
          }

          // 如果用户输了一半，提醒它输另一半
          if(lowerInfo == null !== upperInfo == null){
            callback(new Error("Please fill with lower and upper bound"))
            return;
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

          if(type == 'age'){
            this.global_age_min = numberLower;
            this.global_age_max = numberUpper;
          }
          else{
            // 保证传输是转化后结果: 例如12ab3会自动解析为12 
            this.form[type][lowerName] = numberLower;
            this.form[type][upperName] = numberUpper;
          }
        };
      },

      // 小数位数核验
      validateDecimalPlaces(value, maxDecimalPlaces) {
        const regex = new RegExp(`^-?[0-9]+(?:\\.[0-9]{1,${maxDecimalPlaces}})?$`);
        return regex.test(value);
      },

      // 根据当前的type清除所有的数据
      clearByType(search_type){
        if(search_type == "age"){
          this.selectGeologicalPeriods = "";
          this.global_age_min = 0;
          this.global_age_max = 4600;
        }
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
        // 最终提交
        let result = {};
        let search_types = [];

        // 如果查询为all
        if(search_type == 'all'){
          search_types = ['element', 'age', 'location', 'source', 'environment', 'type'];
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

        // 如果查询为all
        if(search_type == 'element'){
          search_types = ['element', 'age', 'location', 'source', 'environment', 'type'];
        }
        
        // 添加键值对信息
        search_types.forEach((type_info) => {
          if(type_info == "element"){
            result = this.elementTransform();
          }
          else{
            if(type_info == 'age'){
              this.ageTranslation();
            }
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
        let search_types = ['element', 'age', 'location', 'source', 'environment', 'type'];
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
  position: fixed;
  overflow-y: auto;
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