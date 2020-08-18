<!--<template>-->
  <!--<div class="user-info">-->
    <!--<el-row :span="24">-->
      <!--<el-col :span="8">-->
        <!--<basic-container>-->
          <!--<div class="user-info__content">-->
            <!--<img class="user-info__img"-->
                 <!--:src="form.img"-->
                 <!--alt="" />-->
            <!--<p class="user-info__name">{{form.name}}</p>-->
            <!--<router-link class="user-info__setting"-->
                         <!--:to="{path:'/info/setting'}">个人设置</router-link>-->
            <!--<p class="user-info__desc">{{form.ms}}</p>-->
            <!--<div class="user-info__detail-desc">-->
              <!--<p><i class="el-icon-message"></i><span>{{form.yx}}</span></p>-->
              <!--<p><i class="el-icon-postcard"></i><span>{{form.gs}} · {{form.bm}} · {{form.zw}}</span></p>-->
              <!--<p><i class="el-icon-location-information"></i><span>{{form.dz}}</span></p>-->
            <!--</div>-->
            <!--<div class="user-info__divider"></div>-->
            <!--<h4>标签</h4>-->
            <!--<div class="user-info__tags">-->
              <!--<el-tag effect="plain"-->
                      <!--v-for="(tag,index) in tags"-->
                      <!--:key="index">-->
                <!--{{tag}}-->
              <!--</el-tag>-->
            <!--</div>-->
          <!--</div>-->
        <!--</basic-container>-->
      <!--</el-col>-->
      <!--<el-col :span="16">-->
        <!--<basic-container>-->
          <!--<avue-tabs :option="option"-->
                     <!--v-model="form"-->
                     <!--@reset-change="handleChange"-->
                     <!--@submit="handleSubmit"></avue-tabs>-->
        <!--</basic-container>-->
      <!--</el-col>-->
    <!--</el-row>-->

  <!--</div>-->
<!--</template>-->

<template>
  <basic-container>
    <avue-form :option="option" v-model="obj" @submit="submit" @error="error"></avue-form>
  </basic-container>
</template>

<script>
// import option from "@/const/user/info";
import request from '@/router/axios';
import { domainUrl } from '@/config/env';

export default {
  data () {
    return {
      obj:{},
      option:{
          menuPosition:"left",
          column:[
              {
                  label:'原密码',
                  prop:'yPassWord',
                  type:"password",
                  span:13,
                  rules: [{
                      required: true,
                      message: "请输入原密码",
                      trigger: "blur"
                  }]
              },{
                  label:'新密码',
                  prop:'xPassWord',
                  type:'password',
                  span:13,
                  rules:[
                      {
                          required: true,
                          message: "请输入新密码",
                          trigger: "blur"
                      }
                  ]
              },{
                  label:'确认密码',
                  prop:'quePassWord',
                  type:'password',
                  span:13,
                  rules:[
                      {
                          required: true,
                          message: "请输入确认密码",
                          trigger: "blur"
                      }
                  ]
              }
          ]
      }
    }
  },
  created () {

  },
  methods: {
      submit(form,done){
          //console.log(LoginByUsername,4444444444444)
          if(form.xPassWord != form.quePassWord){
              this.$message.success('您输入的确认密码与新密码不对 ！');
          }else {
              let subForm = request({
                  url:domainUrl + '/updateUser',
                  method:'post',
                  data:{
                      userid:"admin",
                      password:form.xPassWord
                  }
              })
              subForm.then(res =>{
                  if (res.data){
                      this.$message.success("修改密码成功!")
                      this.error();
                  }
              })
          }
          done();
      },
      error(form){

      }
  }
};
</script>

<style scoped>
.avue-form{
  padding-top: 30px;
}
  .avue-form >>> .avue-form__row{
    margin-bottom: 10px;
  }
</style>

<style lang="scss">
.user-info {
  .avue-tabs {
    padding: 0 10px;
  }
  .el-tabs__content {
    padding: 20px 0;
  }
  &__img {
    display: block;
    margin: 0 auto;
    border-radius: 100%;
    width: 100px;
    height: 100px;
  }
  &__name {
    text-align: center;
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 0;
    margin-top: 10px;
  }
  &__setting {
    margin-bottom: 12px;
    display: block;
    font-size: 12px;
    color: #409eff;
    text-align: center;
  }
  &__desc {
    text-align: center;
    width: 200px;
    margin: 0 auto;
  }
  &__detail-desc {
    margin-top: 50px;
    font-size: 14px;
    p {
      margin-bottom: 10px;
    }
    span {
      margin-left: 10px;
    }
  }
  &__divider {
    border-top: 1px dashed #e8e8e8;
    display: block;
    height: 0;
    width: 100%;
    margin: 24px 0;
    clear: both;
  }
  &__tags {
    .el-tag {
      margin: 0 5px 5px 0;
    }
  }
}
</style>
