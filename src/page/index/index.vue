<template>
  <div class="avue-contail" v-if="isFag"
       :class="{'avue--collapse':isCollapse}">
    <screenshot></screenshot>
    <div class="avue-header">
      <!-- 顶部导航栏 -->
      <top ref="top" />
    </div>

    <div class="avue-layout">
      <div class="avue-left">
        <!-- 左侧导航栏 -->
        <sidebar />
      </div>
      <div class="avue-main"
           :class="{'avue-main--fullscreen':!isMenu}">
        <!-- 顶部标签卡 -->
        <tags />
        <transition name="fade-scale">
          <search class="avue-view"
                  v-show="isSearch"></search>
        </transition>
        <!-- 主体视图层 -->
        <div style="height:100%;overflow-y:auto;overflow-x:hidden;"
             id="avue-view"
             v-show="!isSearch">
			 
        <keep-alive>
            <router-view class="avue-view"
                         v-if="$route.meta.$keepAlive" />
          </keep-alive>
          <router-view class="avue-view"
                       v-if="!$route.meta.$keepAlive" />
				   
        </div>
      </div>
    </div>
    <div class="avue-shade"
         @click="showCollapse"></div>
  </div>
  <div v-else>
	  <div class="topRq">
		<div class="calender2">
		  <div class="date-headers">
		  <div class="date-header">
			<div><el-button type="primary" @click="handlePrev"><i class="el-icon-arrow-left"></i></el-button></div>
			<div>{{ year }}年{{ month }}月</div>
			<div><el-button type="primary" @click="handleNext"><i class="el-icon-arrow-right"></i></el-button></div>
			
		  </div>
		  </div>
		  <div class="date-content">
			<div class="week-header">
			  <div
			   v-for="item in ['日','一','二','三','四','五','六']"
			   :key=item
			  >{{ item }}
			  </div>
			</div>
			<div class="week-day">
			  <div
			   class="every-day"
			   v-for="item in getArr"
			   :key="item.id"
			   @click="handleClickDay(item.id)" >
				<div v-if="item.id > 0 && item.id <= curDays"   :class="`${year}-${month}-${item.id}` === `${year}-${month}-${day}` ? 'nowDay':''"
				>
				<div :class="item.isFag ? 'index':''">
					{{ item.id}}
				</div>
				</div>
				<div class="other-day" v-else-if="item.id <= 0">{{ item.id + prevDays }}</div>
				<div class="other-day" v-else>{{ item.id -curDays }}</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	  <!-- 内容 -->
	  <div class="rqCon">
		  <div class="rqCon-top">今天 · {{curDate}} {{curXingqi}}</div>
		  <div class="rqList" @click="clickAdd">新增日程...</div>
	  </div>
	  
	  <el-dialog title="" :visible.sync="statusOpen" width="100%" height="100%" append-to-body>
	    <div>
			<el-input v-model="form.telect" placeholder="日程,会议,活动主题"></el-input>
			<div class="begTime">
				<div class="begTime-text">
					开始
				</div>
				<el-date-picker type="date" placeholder="选择日期" v-model="form.begTime" value-format="yyyy-MM-dd"></el-date-picker>		
				<el-select v-model="form.begDate" class="selectTime">
					<el-option v-for="item in timeArr" :value="item.value">{{item.label}}</el-option>
				</el-select>
			</div>
			<div class="begTime">
				<div class="begTime-text">
					结束
				</div>
				<el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" value-format="yyyy-MM-dd"></el-date-picker>		
				<el-select v-model="form.endDate" class="selectTime">
					<el-option v-for="item in timeArr" :value="item.value">{{item.label}}</el-option>
				</el-select>
			</div>
			<div class="participant">
				<div class="begTime-text" style="width: 60px;">
					参与人
				</div>
				<avue-select all multiple v-model="form.participant" placeholder="请选择参与人" :dic="dicParticipant"></avue-select>
			</div>
			<div class="participant">
				<div class="begTime-text" style="width: 60px;">
					项目名称
				</div>
				<div id="trigger">
				
				</div>
				<!-- <avue-select v-model="form.project" placeholder="请选择项目名称" :dic="projectArr"></avue-select> -->
			</div>
			<div class="participant">
				<div class="begTime-text" style="width: 60px;">
					单位名称
				</div>
				<el-input v-model="form.moreform" placeholder="请输入单位名称"></el-input>
			</div>
			<div class="participant">
				<div class="begTime-text" style="width: 60px;">
					工作方式
				</div>
				<avue-select v-model="form.mode" placeholder="请选择工作方式" :dic="modeArr"></avue-select>
			</div>
			<div class="participant" style="height: 100px;">
				<div class="begTime-text" style="width: 70px;">
					工作计划
				</div>
				<el-input type="textarea" v-model="form.plan"></el-input>
			</div>
			<div class="btn">
				<el-button class="baocun">确 定</el-button>
			</div>
		</div>
	  </el-dialog>
	  
  </div>
  
  
</template>

<script>
import { mapGetters } from "vuex";
import tags from "./tags";
import screenshot from './screenshot';
import search from "./search";
import top from "./top/";
import sidebar from "./sidebar/";
import admin from "@/util/admin";
import { validatenull } from "@/util/validate";
import { calcDate } from "@/util/date.js";
import { getStore } from "@/util/store.js";

import request from '@/router/axios';
import { domainUrl } from '@/config/env';
import {url} from '@/config/env';



export default {
  components: {
    top,
    tags,
    search,
    sidebar,
    screenshot

  },
  name: "index",
  provide () {
    return {
      index: this
    };
  },
  data () {
    return {
      //搜索控制
      isSearch: false,
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: "",
	  isFag:true, //判断是否移动端
	  year: null,
	  month: null,
	  //day: null,
	  currentDay: null,
	  currentYearMonthTimes: null,//当前年的月的天数
	  monthOneDay: null,//一个月中的某一天
	  curDate: null, //当天的日期
	  curXingqi:null,
	  prevDays: null,//上一月天数
	  getArr:[], //日期
	  timeArr:[], //时间
	  statusOpen:false, //弹窗
	  form:{
		  
	  },
	  dicParticipant:[], //参与人
	  projectArr:[], //项目
	  modeArr:[{value:"现场",label:"现场"},{value:"文档",label:"文档"},{value:"远程",label:"远程"},{value:"公司",label:"公司"},{value:"培训",label:"培训"}],
	  
		page: {
		    total: 0,
		    pageSize:20,
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
		    column: [
		        {
		            label: "姓名",
		            prop: "last_name",
		            row: true,
		            width:80,
		            span:16
		        },
		        {
		            sortable:true,
		            label: "签到",
		            prop: "companyTime",
		            row: true,
		            width:130,
		            overHidden: true,
		            span:16
		        },
				{
				    sortable:true,
				    label: "签退",
				    prop: "outTime",
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
  created () {
	  
	  this.obj = JSON.parse(this.$cookie.get("token"));
	  //console.log(meta.$keepAlive,11111111111111111)
	  this.watermark({text:this.obj.realname});
    //实时检测刷新token
    this.refreshToken();
	let width = document.body.clientWidth;
	
	if(width < 800){
		this.isFag = false;
	}else{
		this.isFag = true;
	}
	this.getInitDate();
	this.currentYearMonthTimes = this.mGetDate(this.year, this.month); //本月天数
	this.prevDays = this.mGetDate(this.year, this.month - 1);
	this.curDate = `${this.month}月${this.day}日`;
	let curXingqi = new Date().getDay()
	//console.log(this.curDate,curXingqi)
	if(curXingqi == 1){
		this.curXingqi = "周一";
	}else if(curXingqi == 2){
		this.curXingqi = "周二";
	}else if(curXingqi == 3){
		this.curXingqi = "周三";
	}else if(curXingqi == 4){
		this.curXingqi = "周四";
	}else if(curXingqi == 5){
		this.curXingqi = "周五";
	}else if(curXingqi == 6){
		this.curXingqi = "周六";
	}else if(curXingqi == 7){
		this.curXingqi = "周日";
	}
	let sun = 0;
	sun = new Date(this.year, this.month - 1, 1).getDay();
	for(var i = 1;i<43;i++){
		let obj = {
			id:i-sun,
			isFag:false
		}
		this.getArr.push(obj)
	}
	for(var i = 1;i<24;i++){
	  let obj = {
		  label:i +":00",
		  value:i +":00"
	  }
	  this.timeArr.push(obj);
	}
	// var now = new Date();
	// let y = now.getFullYear();
	// let m = now.getMonth()+1;
	// let d = now.getDate();
	// let beg = now.getTime() + 1*24*60*60*1000; //后一天
	// let date = new Date(beg);
	// var year = date.getFullYear();
	// var month = date.getMonth()+1;
	// var day = date.getDate(); 
	// this.begTime = y + "-" + (m < 10 ? ('0' + m) : m) + "-" + (d < 10 ? ('0' + d) : d);
	// this.endTime = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (day < 10 ? ('0' + day) : day);
	
	this.getXlk();
	//this.getList();
  },
  computed:{
	  ...mapGetters(["isMenu", "isLock", "isCollapse", "website", "menu"]),
    curDays() {
  	return new Date(this.year, this.month, 0).getDate();
    },
    // 设置该月日期起始值（找到一号是在哪里）
    beginDay() {
  	return new Date(this.year, this.month - 1, 1).getDay();
    }
  
  },
  mounted () {
    this.init();
	
  },
  //computed: mapGetters(["isMenu", "isLock", "isCollapse", "website", "menu"]),
  props: [],
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
		      this.page.pageSize = res.data.pageSize;
		      this.data = res.data.list;
			  for(var i = 0;i<this.data.length;i++){
				  if(this.data[i].type == "company"){
				  	 this.data[i].companyTime =  this.data[i].createdtime;
				    }
				  if(this.data[i].type == "customer"){
				  	  this.data[i].customerTime =  this.data[i].createdtime+"</br>"+this.data[i].entityname;
					  this.data[i].flag = 0;
				    } 
				  if(this.data[i].signinType == "签退"){
					 if(this.data[i].type == "company"){
				  	 this.data[i].outTime =  this.data[i].createdtime;
					}
				    // if(this.data[i].type == "customer"){
				  	 //  this.data[i].customerTime =  this.data[i].createdtime+"</br>"+this.data[i].entityname;
				    // }   
				  }


			  }
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
	      close() {
	        this.show = false
	      },
	      confirmFn(val) {
	        this.show = false
	        this.defaultData = [val.select1]
	      },
	      toShow() {
	        this.show = true
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
	  //点击新增日程
	  clickAdd(){
		  this.statusOpen = true;
	  },
    showCollapse () {
      this.$store.commit("SET_COLLAPSE");
    },
    // 屏幕检测
    init () {
      this.$store.commit("SET_SCREEN", admin.getScreen());
      window.onresize = () => {
        setTimeout(() => {
          this.$store.commit("SET_SCREEN", admin.getScreen());
        }, 0);
      };
    },
    //打开菜单
    openMenu (item = {}) {
      this.$store.dispatch("GetMenu", item.parentId).then(data => {
        if (data.length !== 0) {
          this.$router.$avueRouter.formatRoutes(data, true);
        }
        //当点击顶部菜单做的事件
        if (!this.validatenull(item)) {
          let itemActive = {},
            childItemActive = 0;
          //vue-router路由
          if (item.path) {
            itemActive = item;
          } else {
            if (this.menu[childItemActive].length == 0) {
              itemActive = this.menu[childItemActive];
            } else {
              itemActive = this.menu[childItemActive].children[childItemActive];
            }
          }
          this.$store.commit('SET_MENUID', item);
          this.$router.push({
            path: this.$router.$avueRouter.getPath({
              name: itemActive.label,
              src: itemActive.path
            }, itemActive.meta)
          });
        }

      });
    },
    // 10分钟检测一次token
    refreshToken () {
      this.refreshTime = setInterval(() => {
        const token = getStore({
          name: "token",
          debug: true
        }) || {};
        const date = calcDate(token.datetime, new Date().getTime());
        if (validatenull(date)) return;
        if (date.seconds >= this.website.tokenTime && !this.refreshLock) {
          this.refreshLock = true;
          this.$store
            .dispatch("RefeshToken")
            .then(() => {
              this.refreshLock = false;
            })
            .catch(() => {
              this.refreshLock = false;
            });
        }
      }, 1000);
    },
	//点击这一天，绑定点击事件
	handleClickDay(day){ 
		if(day > this.currentYearMonthTimes){
		  this.$message.warning('不能选择超出本月的日期');
		}
		let d = this.year + "-" + this.month + "-"+day;
		let date = new Date(d).getDay();
		this.curDate = this.month + "月"+day+"日";
		if(date == 1){
			this.curXingqi = "周一";
		}else if(date == 2){
			this.curXingqi = "周二";
		}else if(date == 3){
			this.curXingqi = "周三";
		}else if(date == 4){
			this.curXingqi = "周四";
		}else if(date == 5){
			this.curXingqi = "周五";
		}else if(date == 6){
			this.curXingqi = "周六";
		}else if(date == 7){
			this.curXingqi = "周日";
		}
		// this.getCommon(d);
		// this.getQuery(this.checks);
	},
	computedDay() {
		const allDay = new Date(this.year, this.month, 0).getDate();
		if (this.day > allDay) {
		  this.day = allDay;
		}
	},
	//设置页头显示的年月日
	getInitDate() {
		const date = new Date();
		this.year = date.getFullYear();
		this.month = date.getUTCMonth() + 1;
		this.day = date.getDate();
	},
	// 如果要获取当前月份天数:
	mGetDate() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var d = new Date(year, month, 0);
		return d.getDate();
	},
	handlePrev() {
		if (this.month == 1) {
		  this.month = 12
		  this.year--
		} else {
		  this.month--
		}
		this.computedDay()
		let d = this.year + "-" + this.month + "-"+"01"
		//this.getCommon(d);
		//this.getQuery(this.checks);
	},
	handleNext() {
		if (this.month == 12) {
		  this.month = 1
		  this.year++
		} else {
		  this.month++
		}
		this.computedDay()
		let d = this.year + "-" + this.month + "-"+"01"
		//this.getCommon(d);
		//this.getQuery(this.checks);
	},
  }
};
</script>
<style>
  #avue-view{
    margin-top: -10px;
  }
</style>
<style scoped="scoped">
	#trigger{
		width: 258px;
		height: 38px;
		border: 1px solid #ddd;
		border-radius: 5px;
		float: left;
	}
	.rqCon{
		padding: 15px;
	}
	.rqCon-top{
		height: 35px;
		line-height: 35px;
		border-bottom: 1px solid #ddd;
	}
	.rqList{
		height: 35px;
		line-height: 35px;
		border-bottom: 1px solid #ddd;
		color: #999;
	}
	.begTime, .participant{
		margin-top: 10px;
		height: 35px;
	}
	.begTime-text{
		width: 50px;
		float: left;
		line-height: 35px;
	}
	.begTime >>> .el-date-editor.el-input, .el-date-editor.el-input__inner{
		width: 160px;
		float: left;
	}
	.begTime >>> .selectTime{
		width: 100px;
		float: right;
	}
	.participant >>> .van-cell{
		width: 260px;
	}
	.participant >>> .el-input{
		width: 260px;
	}
	  .date-header {
	    height: 30px;
		width: 100%;
	    display: flex;
	    align-items: center;
	    justify-content: space-around;
	  }
	  .date-header >>> .el-button{
		  background-color: #fff;
	  }
	  .el-icon-arrow-left{
		  color: #333;
	  }
	  .el-icon-arrow-right{
		  color: #333;
	  }
	  .date-headers {
	    height: 40px;
	    /* width: 422px; */
	    display: flex;
	  }
	  .pre-month {
	    position: absolute;
	    display: inline-block;
	    height: 0px;
	    width: 0px;
	    border: 15px solid;
	    border-color: transparent rgb(35, 137, 206) transparent transparent;
	  }
	  	
	  .next-month {
	    position: absolute;
	    display: inline-block;
	    height: 0px;
	    width: 0px;
	    border: 15px solid;
	    border-color: transparent transparent transparent rgb(35, 137, 206);
	  }
	  	
	  .show-date {
	    margin-left: 40px;
	    margin-top: 0px;
	    display: inline-block;
	    line-height: 30px;
	    text-align: center;
	    width: 310px;
	    color: rgb(35, 137, 206);
	  }
	  	
	  .week-header {
	    color: #000000;
	    font-size: 14px;
	    text-align: center;
	    line-height: 30px;
	  }
	  	
	  .week-header div {
	    margin: 0;
	    padding: 0;
	    display: inline-block;
	    height: 28px;
	    width: 14%;
	  	text-align: center;
	  }
	  	
	  .every-day {
	    display: inline-block;
	    height: 35px;
	    width: 14%;
	    text-align: center;
	    line-height: 35px;
	  }
	  	
	  .other-day {
	    color: #ccc;
	  }
	  	
	  .nowDay {
	    background: #409EFF;
	    border: 1px solid #87c66d;
	  		cursor: pointer;
	  }
	  	
	  .active-day {
	    /* padding: 2px */
	    /* border-sizing:content-box; */
	    border: 2px solid rgb(35, 137, 206);
	  }
	  .date-header >>> .el-button--primary{
		  border: none;
	  }
	  

</style>