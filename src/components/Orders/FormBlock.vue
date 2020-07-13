<template>
  <div class="formblock">
    <div class="label-wrap">{{ label }}</div>
    <div class="input-group-wrap" @click="$emit('click')">
      <div class="input-wrap">
        <input :type="type" 
                v-if="!textarea"
               :value="value" 
               :placeholder="placeholder"
               @input="$emit('input',$event.target.value)"
                />
         <textarea :type="type" 
                v-else
               :value="value" 
               :placeholder="placeholder"
               @input="$emit('input',$event.target.value)"
               rows="2"
               maxlength="100"
                >
                <i v-if="icon" :class="'fa fa-' + icon"></i>
          </textarea>
      </div>
      <TabTag v-if="tags" :selectTag = "sex" :tags="tags" @checkTag = "checkTag"/>
    </div>
    
  </div>
  
</template>

<script>
import TabTag from './TabTag'
export default {
  name: "formblock",
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: String,
    value: String,
    label:String,
    icon:String,
    textarea:String,
    tags:Array,
    sex:String
  },
  components:{
    TabTag
  },
  methods:{
    checkTag(item){
      this.$emit('checkSex',item);
    }
  }
};
</script>

<style scoped>
.formblock{
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
.input-group-wrap {
  flex: 1;
}
.input-wrap {
  flex: 1 1 0;
  padding: 3.733333vw 0;
  display: flex;
  align-items: center;
}
.input-wrap input {
  outline: none;
  line-height: 4.8vw;
  color: #333;
  border: none;
  flex: 1;
  padding-right: 4vw;
  padding-left: 0;
  font-size: 24px;
}
.input-wrap textarea {
  outline: none;
  font-size: 24px;
  line-height: 4.8vw;
  color: #333;
  border: none;
  flex: 1;
  padding-right: 4vw;
  padding-left: 0;
}
</style>>
</style>
