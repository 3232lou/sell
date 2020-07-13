<template>
  <div class="addAdderss">
    <Header :isLeft="true" :title="title"></Header>
    <!--添加地址-->
    <div class="viewbody">
      <div class="content">
        <form-block
          label="联系人"
          placeholder="姓名"
          @checkSex="checkSex"
          :sex="addressInfo.sex"
          v-model="addressInfo.name"
          :tags="sexes"
        >
        </form-block>
        <form-block
          label="电话"
          v-model="addressInfo.phone"
          placeholder="手机号码"
        ></form-block>
        <form-block
          v-model="addressInfo.address"
          @click="showSearch = true"
          label="地址"
          placeholder="小区/写字楼/学校等"
          icon="angle-right"
        ></form-block>
        <form-block
          label="门牌号"
          v-model="addressInfo.bottom"
          placeholder="10号楼5单元404"
          icon="edit"
          textarea="textarea"
        ></form-block>
        <div class="formblock">
          <div class="label-wrap">标签</div>
          <TabTag
            :tags="tags"
            @checkTag="checkTag"
            :selectTag="addressInfo.tag"
          ></TabTag>
        </div>
      </div>
      <!--确定按钮-->
      <div class="form-button-wrap">
        <button @click="handleSave" class="form-button">确定</button>
      </div>
    </div>
    <!--搜索地址-->

    <address-search
      :addressInfo="addressInfo"
      @close="showSearch = false"
      :showSearch="showSearch"
    ></address-search>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import AddressSearch from "@/components/Orders/AddressSearch";
import Header from "@/components/Header";
import FormBlock from "@/components/Orders/FormBlock";
import TabTag from "../../components/Orders/TabTag";
export default {
  name: "myaddress",
  data() {
    return {
      showSearch: false,
      title: "",
      tags: ["家", "学校", "公司"],
      addressInfo: {
        // tag: "",
        // sex: "",
        // address: "",
        // name: "",
        // phone: "",
        // bottom: ""
      },
      sexes: ["先生", "女士"]
    };
  },
  components: {
    Header,
    FormBlock,
    TabTag,
    AddressSearch
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.addressInfo = to.params.addressInfo;
      vm.title = to.params.title;
    });
  },
  methods: {
    showMessage(msg) {
      Toast({
        message: msg,
        position: "bottom",
        duration: 5000
      });
    },
    checkTag(item) {
      this.addressInfo.tag = item;
    },
    checkSex(item) {
      this.addressInfo.sex = item;
    },
    handleSave() {
      console.log(this.addressInfo);
      if(!this.addressInfo.name){
        this.showMessage('请输入联系人');
        return;
      }
       if(!this.addressInfo.phone){
        this.showMessage('请输入电话');
        return;
      }
       if(!this.addressInfo.address){
        this.showMessage('请输入收货地址');
        return;
      }
      // 存储数据
      if (this.title == "添加地址") {
        this.addAddress();
      } else {
        this.editAddress();
      }
    },
    addAddress(){
      this.axios.post(`/api/user/add_address/${localStorage.love_login}`,this.addressInfo)
        .then(res => {
          if (!this.$store.getters.userInfo) {
            this.$store.dispatch("setUserInfo", this.addressInfo);
          }
          this.$router.push("myAddress");
        })
        .catch(err => console.log(err));
    
      
    },
     editAddress() {
      this.axios
        .post(
          `/api/user/edit_address/${localStorage.love_login}/${
            this.addressInfo._id
          }`,
          this.addressInfo
        )
        .then(res => {
          this.$router.push("/myaddress");
        });
    }
  }
};
</script>

<style scoped>
.addAdderss {
  width: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}
.viewbody {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: absolute;
  top: 105px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.content {
  padding-left: 4vw;
  background: #fff;
  font-size: 24px;
}
.formblock {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
}
.formblock .label-wrap {
  flex-basis: 17.333333vw;
  padding: 3.733333vw 0;
  line-height: 4.8vw;
  color: #333;
  font-weight: 700;
}
/* 确定按钮 */
.form-button-wrap {
  padding: 5.333333vw 4vw;
  display: flex;
}
.form-button-wrap .form-button {
  background: #00d762;
  text-align: center;
  border-radius: 0.533333vw;
  flex: 1;
  font-size: 30px;
  line-height: 5.066667vw;
  color: #fff;
  padding: 3.333333vw 0;
  border: none;
  font-weight: 500;
}
button {
  outline: none;
}
</style>
