<template>
  <div>
	  <template>
	  	<basic-container>
	  		<el-row :span="24">
	  		    <el-col :span="10">
	  		        <div class="sqTop">查询日期:</div>
	  		        <avue-date :span="4" v-model="begTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择日期"></avue-date>
	  		        <span style="float: left;line-height: 40px;margin: 0 10px">至</span>
	  		        <avue-date :span="4" v-model="endTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择日期"></avue-date>
	  		    </el-col>
	  			<el-col :span="4" v-if="obj.roleid == 1">
	  				<div class="userName" @click="userAdd">
	  				    <i class="iconfont iconbumenguanli"></i>
	  				</div>
	  			</el-col>
	  		    <el-col :span="4">
	  		        <div class="btn-right" style="margin-top: 3px;float: right;">
	  		            <button style="margin-right: 5px;padding: 6px 15px" @click="submitcx">查询</button>
	  		            <button @click="error" style="padding: 6px 15px">清空</button>
	  		        </div>
	  		    </el-col>
	  		</el-row>
	  		<div class="indexList">
	 		    <avue-crud ref="crud" :option="option" :page.sync="page" :data="data" @on-load="onLoad" :cell-style="cellStyle"></avue-crud>
				
				 
				 <!-- :scroll-y="{enabled: false}" 自动换行 -->
			<!-- 	<vxe-table
				  border
				  height="400"
				  show-footer
				  :scroll-y="{enabled: false}"
				  :column-config="{resizable: true}"
				  :row-config="{isHover: true}"
				  :data="data"

				  >
				  <vxe-column field="last_name" title="姓名"></vxe-column>
				  <vxe-column field="createdtime" title="签到"></vxe-column>
				  <vxe-column field="leavedtime" title="签退"></vxe-column>
				  <vxe-column field="customerTime" title="客户拜访签到时间和客户名称" show-overflow></vxe-column>
					<vxe-column field="distince" title="距离" show-overflow></vxe-column>
					<vxe-column field="zdrmz" title="现场实施记录单" show-overflow></vxe-column>
					<vxe-column field="plan" title="计划" show-overflow></vxe-column>
					<vxe-column field="customerTime" title="汇报" show-overflow></vxe-column>
				</vxe-table> -->
			</div>
	  		<!--查询-->
	  		<div class="popUps" v-if="isUser">
	  		    <div class="fuzhi" style="width: 300px;">
	  		        <div class="fuzhi-top">
	  		            <i class="iconfont iconguanbi" @click="toUser"></i>
	  		        </div>
	  		        <div class="fuzhi-mid" style="text-align: left;overflow-y: auto;overflow-x:hidden;width: 285px">
	  		            <avue-checkbox all v-model="formUser" placeholder="请选择内容" :dic="dicType"></avue-checkbox>
	  		        </div>
	  		        <div class="popBtn">
	  		            <button @click="userQd">确定</button>
	  		        </div>
	  		    </div>
	  		</div>
	  	</basic-container>
	  </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import request from '@/router/axios';
import { domainUrl } from '@/config/env';
import {url} from '@/config/env';

export default {
  name: "wel",
  data () {
    return {
    
	  page: {
	      total: 0,
	      pageSize:100,
	      //pageSizes:[10,15,20]
	  },
	  data:[],
	  option: {
	      highlightCurrentRow:true,
	      addBtn:false, //显示新增按钮
	      delBtn:false, //行内删除
	      editBtn:false, //行内编辑
	      viewBtn:false, //行内查看
	      columnBtn:false, //显示隐藏按钮
	      refreshBtn:false, //显示刷新按钮
	      index:true,
	      indexLabel:'序号',
	      border:true,
	      stripe: false,  //斑马纹
	      labelWidth:170, //弹出表单的label宽度
	      menu:false,  //是否显示操作菜单栏
	      //selection: true, //多选
	      column: [{
	              label: "姓名",
	              prop: "last_name",
	              row: true,
	              width:80,
	              span:16
	          },{
	              sortable:true,
	              label: "签到",
	              prop: "createdtime",
	              row: true,
	              width:130,
	              overHidden: true,
	              span:16
	          },
	  		{
	  		    sortable:true,
	  		    label: "签退",
	  		    prop: "leavedtime",
	  		    row: true,
	  		    width:130,
	  		    overHidden: true,
	  		    span:16
	  		},
	          {
	              sortable:true,
	              label: "客户拜访签到时间和客户名称",
	              prop: "customerTime",
	              row: true,
	              width:250,
	              overHidden: true,
	              span:16
	          },
			  {
			      sortable:true,
			      label: "距离",
			      prop: "distince",
			      row: true,
			      overHidden: true,
			      width:80,
			      span:16
			  },
	          {
	              sortable:true,
	              label: "现场实施记录单",
	              prop: "zdrmz",
	              row: true,
	              overHidden: true,
	              width:150,
	              span:16
	          },
	          {
	              sortable:true,
	              label: "计划",
	              prop: "plan",
	              row: true,
	              overHidden: true,
	              // width:130,
	              span:16
	          },
	          {
	              sortable:true,
	              label: "汇报",
	              prop: "report",
	              row: true,
	              overHidden: true,
	              // width:130,
	              span:16
	          },
	          
	      ]
	  },
	  obj:{},//获取用户名信息
	  begTime:"",
	  endTime:"",
	  formUser:[],
	  isUser:false, //弹窗
	  dicType:[],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),

  },
  created () {
	  this.obj = JSON.parse(this.$cookie.get("token"));
	  //console.log(this.obj,111111111111)
	var now = new Date();
	let y = now.getFullYear();
	let m = now.getMonth()+1;
	let d = now.getDate();
	let beg = now.getTime() + 1*24*60*60*1000; //后一天
	let date = new Date(beg);
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate(); 
	this.begTime = y + "-" + (m < 10 ? ('0' + m) : m) + "-" + (d < 10 ? ('0' + d) : d);
	this.endTime = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (day < 10 ? ('0' + day) : day);
	
	this.getXlk();
	this.getList(this.page.currentPage,this.page.pageSize,this.begTime,this.endTime,this.obj.id,this.formUser);
  },
  methods: {
	  onLoad(page){
	      this.getList(this.page.currentPage,this.page.pageSize,this.begTime,this.endTime,this.obj.id,this.formUser)
	  },
	  getList(page,pageSize,begTime,endTime,userId,userids ){
	  		  let obj = {
	  			  pageNum:page,
	  			  pageSize:pageSize,
	  			  begTime:begTime,
	  			  endTime:endTime,
	  			  userId:userId,
	  			  userids:userids
	  		  }
	  		  let dataArr = request({
	  		      url:domainUrl + '/getSignins',
	  		      data:obj,
	  		      method:'POST'
	  		  })
	  		  dataArr.then(res => {
	  		      this.page.total = res.data.total;
	  		      //this.page.pageSize = res.data.pageSize;
	  		      this.data = res.data.list
				  //this.data = ;
	  			  for(var i = 0;i<this.data.length;i++){
					  //客户现场
	  				  if(this.data[i].type == "customer"){
	  				  	  this.data[i].customerTime =  this.data[i].createdtime+"</br>"+this.data[i].entityname;
	  					  
						  this.data[i].createdtime = "";
	  				    } 
	  				 //  if(this.data[i].signinType == "签退"){
						  // this.data[i].outTime =  this.data[i].createdtime;
	  					//  if(this.data[i].type == "company"){
	  				 //  	 this.data[i].outTime =  this.data[i].createdtime+"</br>"+this.data[i].entityname;
	  					// } 
	  				 //  }
	  			  }
				  console.log(this.data)
	  		  })
	  },
	  //行单元格的样式
	  cellStyle({row,column,rowIndex}){
	      if(row.flag == 1){
	          return {
	              backgroundColor:'yellow',
	              color:'#333'
	          }
	      }else if(row.flag == 2){
	          return {
	              backgroundColor:'red',
	              color:'#333'
	          }
	      }
	  },
	  toUser(){
	      this.isUser = false;
	  },
	  //角色查询
	  userQd(){
	      this.getList(this.page.currentPage,this.page.pageSize,this.begTime,this.endTime,this.obj.id,this.formUser)
	      this.isUser = false;
	  },
	  userAdd(){
	      this.isUser = true;
	      this.formUser = [];
	  },
	  //查询
	  submitcx(){
	      this.getList(this.page.currentPage,this.page.pageSize,this.begTime,this.endTime,this.obj.id,this.formUser)
	  },
	  error(){
	      this.begTime = "";
	      this.endTime = "";
	  		  this.formUser = [];
	  },
	  //获取下拉框的数据
	  getXlk(){
	  		  let dataArr = request({
	  		      url:domainUrl+ '/findUsers',
	  		      method:'GET',
	  		      header: { 'content-Type': 'application/json' },
	  		  })
	  		  dataArr.then(res => {
	  		      this.dicParticipant = res.data;
	  			  this.dicType = res.data;
	  		  })
	  		  
	  		  let dataArr1 = request({
	  		      url:domainUrl + '/queryAllPro',
	  		      method:'GET'
	  		  })
	  		  dataArr1.then(res => {
	  		  	this.projectArr = [];
	  		  	for(var i = 0;i<res.data.list.length;i++){
	  		  		let obj = {
	  		  			label:res.data.list[i].proName,
	  		  			value:res.data.list[i].id,
	  		  			custId:res.data.list[i].custId,
	  		  			custUnit:res.data.list[i].custUnit
	  		  		}
	  		  		this.projectArr.push(obj)
	  		  	}
	  		  
	  		  })
	  },
  }
};
</script>

<style scoped="scoped">
	/*弹窗*/
	.popUps{
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    background: rgba(0,0,0,0.3);
	    z-index: 9;
	}
	.fuzhi{
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
	    width: 400px;
	    height: 500px;
	    background: #fff;
	    text-align: center;
	    border-radius: 5px;
	}
	.fuBtn{
	    padding: 8px 30px;
	    background: #409EFF;
	    color: #fff;
	}
	.popUps-con{
	    width: 500px;
	    height: 620px;
	    background: #fff;
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%, -50%);
	}
	.popUps-top{
	    width: 100%;
	    height: 30px;
	    text-align: right;
	    background: #1f94f4;
	    color: #fff;
	    margin-bottom: 10px;
	    line-height: 30px;
	}
	.popUps-top span{
	    font-size: 16px;
	    margin-right: 10px;
	    cursor: pointer;
	}
	.popUps-mid{
	    width: 100%;
	    height: 570px;
	    overflow-y: auto;
	    overflow-x: hidden;
	}
	.btn-right{
	    float: left;
	}
	.btn-right button{
	    padding: 6px 20px;
	    background: #fff;
	    border: 1px solid #409EFF;
	    border-radius: 3px;
	    color: #409EFF;
	}
	.btn-right button:first-child{
	    margin-right: 10px;
	}
	.sqTop{
	    float: left;
	    width: 70px;
	    line-height: 32px;
	}
	.avue-date >>> .el-input{
		  width: 150px;
		  height: 32px;
		  float: left;
	}
	.userName{
	    width: 32px;
	    height: 32px;
	    float: left;
	}
	.iconbumenguanli{
	    font-size: 28px;
	    color: #1f94f4;
	    cursor: pointer;
	    margin-left: 10px;
			  margin-top: 5px;
	}
	.indexList >>> .avue-crud__menu{
			  display: none;
	}
	.fuzhi-top{
	    text-align: right;
	    margin: 10px;
	    cursor: pointer;
	}
	.susou{
	    width: 380px;
	    margin-left: 10px;
	    height: 35px;
	    line-height: 35px;
	    font-size: 14px;
	}
	.name{
	    width: 80px;
	    float: left;
	}
	.susou input{
	    width: 180px;
	    height: 33px;
	    border: 1px solid #1f94f4;
	    border-radius: 5px;
	    padding-left: 10px;
	    float: left;
	}
	.susou button{
	    width: 80px;
	    height: 34px;
	    border: 1px solid #1f94f4;
	    color: #1f94f4;
	    border-radius: 5px;
	    background: #fff;
	    text-align: center;
	
	}
	.fuzhi-mid{
	    width: 380px;
	    height: 410px;
	    margin: 10px 0 0 10px;
	}
	.fuzhi-mid >>> .el-table__row{
	    height: 35px;
	}
	.fuzhi-mid >>> .has-gutter{
	    color: #1f94f4;
	}
	.fuzhi-mid >>> tr{
	    height: 35px;
	}
	.fuzhi-mid >>> .el-checkbox{
	    width: 100%;
	    height: 32px;
	    line-height: 32px;
	    border-bottom: 1px solid #ddd;
	}
	.popBtn{
	    text-align: right;
	}
	.popBtn button{
	    width: 100px;
	    height: 33px;
	    border: 1px solid #1f94f4;
	    border-radius: 5px;
	    color: #1f94f4;
	    background: #fff;
	    margin: 5px 10px 0 0;
	}
</style>
<style scoped="scoped" lang="scss">
.wel {
  &__header {
    padding: 25px 40px;
    border-bottom: 1px solid #e8e8e8;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__info {
    display: flex;
    align-items: center;
    &-img {
      border-radius: 72px;
      display: block;
      width: 72px;
      height: 72px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    &-content {
      position: relative;
      margin-left: 24px;
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
    }
    &-title {
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 12px;
    }
    &-subtitle {
      position: relative;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
    }
  }
  &__extra {
    &-item {
      position: relative;
      padding: 0 32px;
      display: inline-block;
      &:last-child {
        &::after {
          display: none;
        }
      }
      &:after {
        background-color: #e8e8e8;
        position: absolute;
        top: 30px;
        right: 0;
        width: 1px;
        height: 40px;
        content: "";
      }
    }
    &-title {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 4px;
    }
    &-subtitle {
      color: rgba(0, 0, 0, 0.85);
      font-size: 30px;
      line-height: 38px;
      margin: 0;
      span {
        color: rgba(0, 0, 0, 0.45);
        font-size: 20px;
      }
    }
  }
}
</style>
