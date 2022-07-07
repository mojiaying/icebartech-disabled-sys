<style lang="scss">
@import "@/assets/style/project/config.scss";
.CenterAccountId {
}
</style>
<template>
  <section class="CenterAccountId o-ptb-l">
    <div class="block-n">
      <div class="o-p-l">
        <el-page-header
          @back="Rd($route.meta.rollback)"
          :content="Title"
        ></el-page-header>
      </div>
    </div>
    <div class="block o-mt" v-loading="Main.loading">
      <el-form
        class="o-pt"
        ref="form"
        :rules="Rules"
        :model="Params"
        label-width="100px"
        style="width: 100%; max-width: 650px"
      >
        <el-form-item label="姓名" prop="userName">
          <el-input
            v-model="Params.userName"
            placeholder="请输入姓名"
            maxlength="24"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            v-model="Params.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择出生日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="绑定手机号" prop="mobile">
          <el-input
            v-model="Params.mobile"
            placeholder="请输入绑定手机号"
            maxlength="11"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input
            v-model="Params.idCard"
            placeholder="请输入身份证号"
            maxlength="18"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="Params.sex" label="1" border>男</el-radio>
          <el-radio v-model="Params.sex" label="0" border>女</el-radio>
          <el-radio v-model="Params.sex" label="2" border>保密</el-radio>
          <!-- <el-input v-model="Params.idCard" placeholder="请输入身份证号" maxlength="18" clearable></el-input> -->
        </el-form-item>
        <el-form-item
          label="残疾类型"
          style="display: inline-block; width: 300px"
        >
          <el-select v-model="disabilityType">
            <el-option
              v-for="(item, index) in disTypeList"
              :label="item.content"
              :value="item.content"
              :key="'type' + index"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="Params.disabilityType" placeholder="请输入残疾类型" maxlength="24" clearable></el-input> -->
        </el-form-item>
        <el-form-item
          label="残疾等级"
          style="display: inline-block; width: 300px"
        >
          <el-select v-model="disabilityGrade" placeholder="请选择残疾等级">
            <el-option value="一级">一级</el-option>
            <el-option value="二级">二级</el-option>
            <el-option value="三级">三级</el-option>
            <el-option value="四级">四级</el-option>
            <el-option value="未评级">未评级</el-option>
          </el-select>
          <!-- <el-input v-model="Params.disabilityGrade" placeholder="请输入残疾等级" maxlength="24" clearable></el-input> -->
        </el-form-item>
        <div style="display: inline-block; width: 30px">
          <el-button icon="el-icon-plus" @click="changeDisType"></el-button>
        </div>
        <div style="margin-left: 102px; line-height: 50px">
          <div v-for="(item, index) in showList" :key="'show' + index">
            <span>残疾类型：</span>{{ item.name }}
            <span style="margin-left: 30px">残疾等级：</span>{{ item.grade }}
            <el-button
              style="margin-left: 30px"
              @click="minusType(index)"
              icon="el-icon-delete-solid"
            ></el-button>
          </div>
        </div>
        <el-form-item label="户籍" prop="province">
          <el-cascader
            v-model="district"
            :options="District"
            :props="{ expandTrigger: 'hover' }"
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="街道" prop="street">
          <el-input
            v-model="Params.street"
            placeholder="请输入街道"
            maxlength="1024"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="社区名称" prop="communityName">
          <el-input
            v-model="Params.communityName"
            placeholder="请输入社区名称"
            maxlength="1024"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="额度" prop="amount">
          <el-input
            maxlength="8"
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="Params.amount"
            placeholder="请输入额度"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <div class="l-flex-c">
            <!-- <el-input maxlength="250" v-model="ParamsSave.remarks" type="textarea" :rows="2" placeholder="请输入备注" ></el-input> -->
            <el-input
              v-model="Params.remarks"
              type="textarea"
              :rows="3"
              placeholder="请输入备注"
              maxlength="250"
              clearable
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item>
          <Button @click="formConfirm()" :loading="Main.editing" long
            >提交</Button
          >
          <Button @click="Rd($route.meta.rollback)" plain>取消</Button>
        </el-form-item>
      </el-form>
    </div>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
    >
        <span>该用户名已存在，是否覆盖用户信息?</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="coverUser">覆盖</el-button>
        <el-button type="primary" @click="addNewUser">新建</el-button>
        <el-button @click="dialogVisible = false">不保存</el-button>
        </span>
    </el-dialog>
  </section>


</template>
<script>
import StoreMix from "@/plugins/mixin/store.page.js";
export default {
  name: "CenterAccountId",
  mixins: [StoreMix],
  data() {
    // 设置手机号的验证规则
    const phoneRules = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入联系方式"));
      } else {
        const reg =
          /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的电话"));
        }
      }
    };
    return {
      store: "main/account",
      Filter: {},
      Params: {},
      dialogVisible:false,
      repeatId:null,
      firstFlag: true,
      disList: [],
      showList: [],
      disabilityType: "",
      disabilityGrade: "",
      disTypeList: [],
      Rules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        birthday: [
          { required: true, message: "请输入出生日期", trigger: "blur" },
        ],
        mobile: [
          {
            required: true,
            validator: phoneRules,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        idCard: [
          {
            required: true,
            pattern:
              /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
            message: "请输入正确的证件号",
            trigger: "blur",
          },
          {
            min: 15,
            max: 18,
            message: "长度在 15 到 18 个字符",
            trigger: "blur",
          },
        ],
        street: [{ required: true, message: "请输入街道", trigger: "blur" }],
        communityName: [
          { required: true, message: "请输入社区名称", trigger: "blur" },
        ],
        amount: [{ required: true, message: "请输入额度", trigger: "blur" }],
        province: [{ required: true, message: "请输入户籍", trigger: "blur" }],
      },
    };
  },
  computed: {
    District() {
      return this.Block.district.selector ? this.Block.district.selector : [];
    },
    district: {
      get: function () {
        let arr = [];

        if (this.Params.disabilityType && this.firstFlag) {
          let dispList = this.Params.disabilityType.split(",");
          let gradepList = [];
          if (this.Params.disabilityGrade) {
            gradepList = this.Params.disabilityGrade.split(",");
          } else {
            this.Params.disabilityGrade = "未评级";
          }
          dispList.forEach((element, i) => {
            this.showList.push({
              name: element,
              grade: gradepList[i] ? gradepList[i] : "未评级",
            });
          });
          this.firstFlag = false;
        }
        for (let key of ["province", "city", "district"]) {
          if (this.Params[key]) {
            arr.push(this.Params[key]);
          }
        }
        return arr;
      },
      set: function (val) {
        for (let i = 0; i < 3; i++) {
          this.$set(
            this.Params,
            ["province", "city", "district"][i],
            val[i] ? val[i] : ""
          );
        }
      },
    },
  },
  methods: {
    changeDisType() {
      if (this.Params.disabilityType) {
        let disabilityList = this.Params.disabilityType.split(",");
        console.log(disabilityList.indexOf(this.disabilityType));
        if (disabilityList.indexOf(this.disabilityType) == -1) {
          this.Params.disabilityType =
            this.Params.disabilityType + "," + this.disabilityType;
          this.Params.disabilityGrade =
            this.Params.disabilityGrade + "," + this.disabilityGrade;
        } else {
          this.$message.error("此项残疾类型已选");
          this.disabilityType = "";
          this.disabilityGrade = "";
          return false;
        }
      } else {
        this.Params.disabilityType = this.disabilityType;
        this.Params.disabilityGrade = this.disabilityGrade;
      }
      this.showList.push({
        name: this.disabilityType,
        grade: this.disabilityGrade,
      });
      this.disabilityType = "";
      this.disabilityGrade = "";
    },
    minusType(item) {
      this.showList = this.showList.filter((obj, index) => {
        return index !== item;
      });
      if (this.showList.length) {
        this.Params.disabilityType = this.showList
          .map((res) => {
            return res.name;
          })
          .join();
        this.Params.disabilityGrade = this.showList
          .map((res) => {
            return res.grade;
          })
          .join();
      } else {
        this.Params.disabilityType = "";
        this.Params.disabilityGrade = "";
      }
    },
    addNewUser(){
        this.FormSubmit()
    },
    coverUser(){
        this.Params.id = this.repeatId
        this.FormSubmit()
    },
    formConfirm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (!this.Params.id) {
            this.Dp("main/GET_BY_ID_CARD_OR_NAME", {
            //   userName: this.Params.userName,
              idCard: this.Params.idCard,
            }).then((res) => {
              if (res.code == 200 && res.data.bussData) {
                  this.repeatId = res.data.bussData[0].id
                  this.dialogVisible=true
                // this.$confirm('该用户名已存在，是否覆盖用户信息?', '提示', {
                //         confirmButtonText: '确定',
                //         cancelButtonText: '取消',
                //         type: 'warning'
                //     }).then(() => {
                //         this.Params.id = res.data.bussData
                //         this.FormSubmit()
                //     }).catch(() => {
                //         this.Params.id = ''
                //         this.FormSubmit()
                //     });
              } else {
                this.FormSubmit();
              }
            });
          } else {
            this.FormSubmit();
          }
        }
      });
    },
  },
  created() {
    this.Dp("base/INIT_DISTRICT"); // 加载地区选择器
    this.Dp("base/DISABLED_TYPE").then((res) => {
      this.disTypeList = res.data.bussData;
    });
  },
  Updated() {
    // console.log(this.Params)
  },
};
</script>