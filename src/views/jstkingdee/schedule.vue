<template>
	<basic-container class="mid">
		<el-row :span="24">
			<div class="left" @click="tianQx">
				<!-- 日期 -->
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
				<!-- 选择人 -->
				<div class="check" v-if="obj.roleid == 1">
				<!-- 	<div style="border-bottom: 1px solid #409EFF;padding-bottom: 10px;">成员:</div> -->
					<div class="check-con">
<!-- 						<ul>
							<li v-for="(item,index) in dicParticipant" :class="checks == item.value?'checksIndex':''" @click="chengCheck(item.value)">
								{{item.label}} 的日历
							</li>
						</ul> -->
						<el-tree
						:data="participant"
						:current-node-key="checks"
						:props="{
							label:'label',
							children:'children'
						}"
						node-key="value"
						@node-click="handleNodeClick"
						highlight-current
						
						></el-tree>
					</div>
				</div>
			</div>
			<div class="right1" style="width: 80%;float: left;font-size: 14px;" @click="tianQx">
				<el-col :span="24">
					<div class="right">
						<!-- 头部 -->
						<div class="weekTop">
							<div class="right-top">
								<el-col :span="8">
									<div class="right-top-left">
										<el-button>周</el-button>
										<el-button>月</el-button>
										<el-button>今天</el-button>
									</div>
								</el-col>
								<el-col :span="12">
									<div class="right-top-mid">
										<div class="time-left"><el-button type="primary" @click="lastclick"><i class="el-icon-arrow-left"></i></el-button></div>
										<div class="riqi">{{begTime}} 至 {{endTime}}</div>
										<div class="time-right"><el-button type="primary" @click="nextclick"><i class="el-icon-arrow-right"></i></el-button></div>
									</div>	
								</el-col>
								<el-col :span="4">
									<div class="right-top-right">
										<div class="addRight" @click="clickAdd">新增日程</div>
									</div>
								</el-col>
							</div>

							<div class="top-week">
								<div class="week-left"></div>
								<div class="week-list">
									<div class="list-xq" style="border-left: 1px solid #ddd;">星期一</div>
									<div :class="isDay== day1?'list-text1':'list-text'">{{day1}}</div>
								</div>
								<div class="week-list">
									<div class="list-xq">星期二</div>
									<div :class="isDay== day2?'list-text1':'list-text'">{{day2}}</div>
								</div>
								<div class="week-list">
									<div class="list-xq">星期三</div>
									<div :class="isDay== day3?'list-text1':'list-text'">{{day3}}</div>
								</div>
								<div class="week-list">
									<div class="list-xq">星期四</div>
									<div :class="isDay== day4?'list-text1':'list-text'">{{day4}}</div>
								</div>
								<div class="week-list">
									<div class="list-xq">星期五</div>
									<div :class="isDay== day5?'list-text1':'list-text'">{{day5}}</div>
								</div>
								<div class="week-list">
									<div class="list-xq">星期六</div>
									<div :class="isDay== day6?'list-text1':'list-text'">{{day6}}</div>
								</div>
								<div class="week-list">
									<div class="list-xq" style="border-left:1px solid #ddd;">星期日</div>
									<div :class="isDay== day7?'list-text1':'list-text'">{{day7}}</div>
								</div>
							</div> 
					
						</div>
						<!-- 内容 -->
						<div class="rightCon" id="postion">
							<div class="top-week-list" v-for="(item,index) in dataList">
								<div class="week-left">{{item.time}}</div>
								<div v-for="(it,ind) in item.arr" class="week-list" @contextmenu.prevent="contList(index,$event,ind)" @click="clickStyle(index,$event,ind)" @dblclick="dblList(index,$event,ind)">
									<div :class="it.isTian?'list-text1':'list-text'" :style="{ width: 100/it.arr.length-1 +'%'}" v-for="(its,indx) in it.arr" @click="clickList(index,$event,ind,indx,it)" @contextmenu.prevent="contList(index,$event,ind)">
									<div style="font-size: 10px;height: 17px;text-align: left;line-height: 17px;">{{its.begDate}}</div>
									<div style="font-size: 12px;height: 17px;text-align: left;line-height: 17px;">{{its.telect}}</div>
									</div>
								</div>

							</div>
						</div>
					
					</div>
				</el-col>
			</div>
		
		<!-- 弹窗 -->
		<div class="popUpsQx" v-if="isPop" @click="popUpsQx"></div>
		<div v-drag class="drag popUps" v-if="isFag" :style="{ left: popX + 'px',top:popY + 'px' }">
			<div class="biaoti">
				<el-input v-model="form.telect" placeholder="日程,会议,活动主题"></el-input>
			</div>
			<div class="begTime">
				<div class="begTime-text">
					开始
				</div>
				<el-date-picker type="date" placeholder="选择日期" v-model="form.begTime" value-format="yyyy-MM-dd"></el-date-picker>		
				<!-- <el-time-select v-model="form.begDate"></el-time-select> -->
				<el-select v-model="form.begDate" class="selectTime">
					<el-option v-for="item in timeArr" :value="item.value">{{item.label}}</el-option>
				</el-select>
				<div class="begTime-right">
					<input type="checkbox" :checked="isChecked" @click="blurQt" style="margin-right: 5px;">全天
				</div>
			</div>
			<div class="begTime">
				<div class="begTime-text">
					结束
				</div>
				<el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" value-format="yyyy-MM-dd"></el-date-picker>		
				<!-- <el-time-select v-model="form.begDate"></el-time-select> -->
				<el-select v-model="form.endDate" class="selectTime">
					<el-option v-for="item in timeArr" :value="item.value">{{item.label}}</el-option>
				</el-select>
			</div>
			<div class="participant">
				<div class="begTime-text">
					参与人
				</div>
				<avue-select all multiple v-model="form.participant" placeholder="请选择参与人" type="tree" :dic="dicParticipant"></avue-select>
			</div>
			<div class="btn" v-if="isOptions">
				<el-button class="baocun" @click="addBaocun">保存</el-button>
				<el-button class="gdxx" @click="clickMore">更多选项</el-button>
			</div>
			<div class="btn" v-else>
				<el-button style="margin-left: 5px;" class="gdxx" @click="getDel">删除</el-button>
				<el-button style="margin-left: 5px;" class="gdxx" @click="getZongjie">总结</el-button>
				<el-button style="margin-left: 5px;" class="gdxx" @click="getRevise">修改</el-button>
				<el-button style="margin-left: 5px;" @click="clickMore">更多选项</el-button>
			</div>
		
		</div>
		
		<div class="tianjia" v-if="isTian" :style="{ left: popX + 'px',top:popY + 'px' }">
			<el-button @click="clickAdd">添加日程</el-button>
		</div>
		<!-- 更多选项 -->
		<div class="more" v-if="isMore">
			<div class="biaoti">
				<el-input v-model="form.telect" placeholder="日程,会议,活动主题"></el-input>
			</div>
			<div class="begTime">
				<div class="begTime-text">
					开始
				</div>
				<el-date-picker type="date" placeholder="选择日期" v-model="form.begTime" value-format="yyyy-MM-dd"></el-date-picker>		
				<!-- <el-time-select v-model="form.begDate"></el-time-select> -->
				<el-select v-model="form.begDate" class="selectTime">
					<el-option v-for="item in timeArr" :value="item.value">{{item.label}}</el-option>
				</el-select>
				<div class="begTime-right">
					<input type="checkbox" :checked="isChecked" @click="blurQt" style="margin-right: 5px;">全天
				</div>
			</div>
			<div class="begTime">
				<div class="begTime-text">
					结束
				</div>
				<el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" value-format="yyyy-MM-dd"></el-date-picker>		
				<!-- <el-time-select v-model="form.begDate"></el-time-select> -->
				<el-select v-model="form.endDate" class="selectTime">
					<el-option v-for="item in timeArr" :value="item.value">{{item.label}}</el-option>
				</el-select>
			</div>
			<div class="participant">
				<div class="begTime-text" style="width: 70px;">
					参与人
				</div>
				<avue-select all multiple v-model="form.participant" placeholder="请选择参与人" type="tree" :dic="dicParticipant"></avue-select>
			</div>
			<div class="participant">
				<div class="begTime-text" style="width: 70px;">
					项目名称
				</div>
				<avue-select v-model="form.project" placeholder="请选择项目名称" :dic="projectArr"></avue-select>
			</div>
			<div class="participant">
				<div class="begTime-text" style="width: 70px;">
					单位名称
				</div>
				<avue-input-table :props="props"  :column="column" :on-load="onLoad" v-model="form.moreform"  placeholder="请选择单位名称" ></avue-input-table>
			</div>
			<div class="participant">
				<div class="begTime-text" style="width: 70px;">
					工作方式
				</div>
				<avue-select v-model="form.mode" placeholder="请选择工作方式" :dic="modeArr"></avue-select>
			</div>
			<div class="participant" style="height: 150px;">
				<div class="begTime-text" style="width: 70px;">
					工作计划
				</div>
				<avue-input type="textarea" v-model="form.plan"></avue-input>
			</div>
			<div class="btn" style="margin-top: 10px;">
				<el-button class="baocun" @click="addBaocun">保存</el-button>
			</div>
		</div>
		
		<!-- 计划总结 -->
		<div class="zongjie" v-if="isZongjie">
			<div class="zongjie-con">
				<div class="list" v-if="form.telect != ''"><p>标题：</p><span>{{form.telect}}</span></div>
				<div class="list" v-if="form.begTime != ''"><p>开始时间：</p><span>{{form.begTime}} {{form.begDate}}</span></div>
				<div class="list" v-if="form.endTime != ''"><p>结束时间：</p><span>{{form.endTime}} {{form.endDate}}</span></div>
				<div class="list" v-if="form.participantName != null"><p>参与人：</p><span>{{form.participantName}}</span></div>
				<div class="list" v-if="form.project != ''"><p>项目名称：</p><span>{{form.project}}</span></div>
				<div class="list" v-if="form.custname != ''"><p>单位名称：</p><span>{{form.custname}}</span></div>
				<div class="list"><p>工作方式：</p><span>{{form.mode}}</span></div>
				<div class="list" v-if="form.plan != ''"><p>工作计划：</p><span>{{form.plan}}</span></div>
				<div class="list"><p>提交时间：</p><span>{{tjTime}}</span></div>
				<div class="participant" style="height: 150px;">
					<div class="begTime-text" style="width: 80px;">
						工作总结：
					</div>
					<avue-input type="textarea" v-model="form.summarize"></avue-input>
				</div>
				<div class="btn" style="margin-top: 185px;">
					<el-button class="baocun" @click="addBaocun">保存</el-button>
				</div>
			</div>
		</div>

		</el-row>
	</basic-container>
</template>

<script>
    import request from '@/router/axios';
    import { domainUrl } from '@/config/env';
    import {url} from '@/config/env';
    export default {
        name: "history",
		directives:{
			drag(el,bindings){
				el.onmousedown = function(e){
					if(e.target.className != "more" && e.target.className != "el-input__inner" && e.target.className != "el-textarea__inner" && e.target.className != "" && e.target.className != "more1"){
						var disx = e.pageX - el.offsetLeft;
						var disy = e.pageY - el.offsetTop;
						document.onmousemove = function (e){	
							el.style.left = e.pageX - disx+'px';
							el.style.top = e.pageY - disy+'px';	
						}
						document.onmouseup = function(){
							document.onmousemove = document.onmouseup = null;
						}
					}

				}
			}
		},
        data(){
            return {
				 year: null,
				 month: null,
				 day: null,
				 currentDay: null,
				 currentYearMonthTimes: null,//当前年的月的天数
				 monthOneDay: null,//一个月中的某一天
				 curDate: null,
				 prevDays: null,//上一月天数
				
				dataList:[
				{time:"1:00",id:1,arr:[]},{time:"2:00",id:2,arr:[]},{time:"3:00",id:3,arr:[]},{time:"4:00",id:4,arr:[]},
				{time:"5:00",id:5,arr:[]},{time:"6:00",id:6,arr:[]},{time:"7:00",id:7,arr:[]},{time:"8:00",id:8,arr:[]},
				{time:"9:00",id:9,arr:[]},{time:"10:00",id:10,arr:[]},{time:"11:00",id:11,arr:[]},{time:"12:00",id:12,arr:[]},
				{time:"13:00",id:13,arr:[]},{time:"14:00",id:14,arr:[]},{time:"15:00",id:15,arr:[]},{time:"16:00",id:16,arr:[]},
				{time:"17:00",id:17,arr:[]},{time:"18:00",id:18,arr:[]},{time:"19:00",id:19,arr:[]},{time:"20:00",id:20,arr:[]},
				{time:"21:00",id:21,arr:[]},{time:"22:00",id:22,arr:[]},{time:"23:00",id:23,arr:[]}],
				
				begTime:"",//一周的礼拜一
				endTime:"",//一周的礼拜天
				
				day1:"",
				day2:"",
				day3:"",
				day4:"",
				day5:"",
				day6:"",
				day7:"",
				isDay:"", //判断今天是几号
				
				isFag:false, //弹窗
				isPop:false,
				popX:0, 
				popY:0,
				
				isTian:false,
				isMore:false, //更多选项
				isZongjie:false,//总结
				
				//时长数组
				duration:[{id:1,text:"30分钟"},
				{id:2,text:"1小时"},
				{id:3,text:"2小时"},
				{id:4,text:"3小时"},
				{id:5,text:"自定义结束时间"}
				],
				timeArr:[],
				dicParticipant:[],//参与人数组
				participant:[],
				form:{
					telect:"", //标题
					begTime:"",//开始日期
					begDate:"",//开始时间
					endTime:"",
					endDate:"",
					duration:"1小时",//时长
					participant:[],//参与人
					project:"",//项目名称
					moreform:"",//单位名称
					mode:"现场",//工作方式
					plan:"", //工作计划
					summarize:"",//工作总结
					participantName:"",
					custname:""
				},
				projectArr:[],//项目名称
				modeArr:[{value:"现场",label:"现场"},{value:"文档",label:"文档"},{value:"远程",label:"远程"}],
				isChecked:false,//是否全天
				
				 column:{
				  children:{
					border: true,
					column: [{
					  label: '单位名称',
					  search:true,
					  prop: 'unitName'
					}, {
					  label: '姓名',
					  search:true,
					  prop: 'custName'
					}],
				  },
				},
				props: {
				  label: 'unitName',
				  value: 'id'
				 },
				 
				 toDay:0,
				 toTime:0,
				 
				 isOptions:true,//新增和修改
				 rId:0, //每一条的ID
				 index:-1,
				 ind:-1,
				 indx:-1,
				 
				 getArr:[],
				 
				 obj:{},//获取角色信息
				 checks:0,//默认选中的菜单值
				 shichangArr:[],// 计算时长
				 tjTime:"",
				 //currentId:0, 
				 
            }
        },
        created(){
		  this.obj = JSON.parse(this.$cookie.get("token"));
		  console.log(this.obj,11111111)
		  this.checks = this.obj.id; 
		  this.getInitDate();
		  this.currentYearMonthTimes = this.mGetDate(this.year, this.month); //本月天数
		  this.prevDays = this.mGetDate(this.year, this.month - 1);
		  this.curDate = `${this.year}-${this.month}-${this.day}`;
		  
		  this.monday();
		  this.getXlk();
		  
		  this.getQuery(this.checks);
		  for(var i = 1;i<24;i++){
			  let obj = {
				  label:i +":00",
				  value:i +":00"
			  }
			  this.timeArr.push(obj);
		  }
        },
		computed:{
		  curDays() {
			return new Date(this.year, this.month, 0).getDate();
		  },
		  // 设置该月日期起始值（找到一号是在哪里）
		  beginDay() {
			return new Date(this.year, this.month - 1, 1).getDay();
		  }

		},
        mounted(){
			//计算滚动的高度
			let time = new Date();
			let h = time.getHours();
			var jump = document.querySelector('#postion');
			jump.scrollTop  = (h-3)*35;

        },
        methods:{
			handleNodeClick(node,resolve){
				console.log(node.value,resolve);
				if(node.value != undefined){
					this.checks = node.value;
					this.getQuery(this.checks);
				}				

			},
			//更新
			getQuery(id){
				this.getArr = [];
				let dayArr = [this.day1,this.day2,this.day3,this.day4,this.day5,this.day6,this.day7];
				let xinqi = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
				this.dataList = [
				{time:"1:00",id:1,arr:[]},{time:"2:00",id:2,arr:[]},{time:"3:00",id:3,arr:[]},{time:"4:00",id:4,arr:[]},
				{time:"5:00",id:5,arr:[]},{time:"6:00",id:6,arr:[]},{time:"7:00",id:7,arr:[]},{time:"8:00",id:8,arr:[]},
				{time:"9:00",id:9,arr:[]},{time:"10:00",id:10,arr:[]},{time:"11:00",id:11,arr:[]},{time:"12:00",id:12,arr:[]},
				{time:"13:00",id:13,arr:[]},{time:"14:00",id:14,arr:[]},{time:"15:00",id:15,arr:[]},{time:"16:00",id:16,arr:[]},
				{time:"17:00",id:17,arr:[]},{time:"18:00",id:18,arr:[]},{time:"19:00",id:19,arr:[]},{time:"20:00",id:20,arr:[]},
				{time:"21:00",id:21,arr:[]},{time:"22:00",id:22,arr:[]},{time:"23:00",id:23,arr:[]}];
				
				for(var i = 0;i<this.dataList.length;i++){
					for(var j = 0;j<7;j++){
						let obj = {
							isTian:false,
							id:dayArr[j],
							xingqi:xinqi[j],
							arr:[]
						}
						this.dataList[i].arr.push(obj)
					}
				}
				this.shichangArr = [];
				let beg = this.year + "-" + this.month + "-"+"01";
				let end = this.year + "-" + this.month + "-"+"31"
				let dataArr = request({
					url:domainUrl + '/querySchedule?id=' + id +'&begDate=' + beg + '&endDate='+end,
					method:'GET'
				})
				dataArr.then(res => {
					let arr = res.data;
					let sunArr = [];
					let objArr = [];
					for(var i = 0;i<arr.length;i++){
						for(var j = 0;j<this.dataList.length;j++){
							if(arr[i].timeId == this.dataList[j].id){
								for(var a = 0;a<this.dataList[j].arr.length;a++){
									if(arr[i].dayId == this.dataList[j].arr[a].id){
										let obj = {
											telect:arr[i].title,
											begTime:arr[i].begTime,
											begDate:arr[i].begDate,
											endTime:arr[i].endTime,
											endDate:arr[i].endDate,
											duration:arr[i].duration,
											participant:arr[i].participants,
											project:arr[i].pid,
											mode:arr[i].mode,
											moreform:arr[i].custId,
											plan:arr[i].content,
											rid:arr[i].id,
											participantName:arr[i].participantName,
											custname:arr[i].custname
										}
										let obj1 = {
											id:arr[i].dayId,
											arr:arr[i].times,
											zongArr:arr[i].totalTimes
										}
										objArr.push(obj1);
										//console.log(this.shichangArr,1111111111)
										this.dataList[j].arr[a].arr.push(obj);
									}
								}
							}
						}
					}
					console.log(objArr)
					for(var j = 0;j<arr.length;j++){
						let sun = parseInt(arr[j].dayId)
						sunArr.push(sun)
					}
					let a1 = [];
					a1 = [...new Set(sunArr)]; //数组去重
					let sun = 0;
					sun = new Date(this.year, this.month - 1, 1).getDay();;
					for(var i = 1;i<43;i++){
						let obj = {
							id:i-sun,
							isFag:false
						}
						this.getArr.push(obj)
					}
					for(var i = 0;i<this.getArr.length;i++){
						for(var j = 0;j<a1.length;j++){
							if(this.getArr[i].id == a1[j]){
								this.getArr[i].isFag = true;
							}
						}
					}
					//判断时长
					for(var i = 0;i<objArr.length;i++){
						for(var b = 1;b<objArr[i].arr.length;b++){
							for(var j = 0;j<this.dataList.length;j++){
								if(objArr[i].arr[b] == this.dataList[j].id){
									for(var a = 0;a<this.dataList[j].arr.length;a++){
										if(objArr[i].id == this.dataList[j].arr[a].id){
											let obj = {}
											this.dataList[j].arr[a].arr.push(obj)
											//this.dataList[j].arr[a].isTian = true;
										}
									}
								}
							}
						}
					}
					//判断总结时长
					for(var i = 0;i<objArr.length;i++){
						console.log(objArr[i].zongArr)
						if(objArr[i].zongArr != null){
							for(var b = 1;b<objArr[i].zongArr.length;b++){
								for(var j = 0;j<this.dataList.length;j++){
									if(objArr[i].zongArr[b] == this.dataList[j].id){
										for(var a = 0;a<this.dataList[j].arr.length;a++){
											if(objArr[i].id == this.dataList[j].arr[a].id){
												this.dataList[j].arr[a].isTian = true;
											}
										}
									}
								}
							}
						}
					}
					//console.log(this.dataList)
				})
			},
			
			//删除
			getDel(){
				let dataArr = request({
				    url:domainUrl + '/delSchedule?id=' + this.rId,
				    method:'GET'
				})
				dataArr.then(res => {
				    if(res.data.success){
				        this.$message.success("删除成功!");
						this.popUpsQx();
						//this.monday();
				        this.getQuery(this.checks);
						this.dataList[this.index].arr[this.ind].arr.splice(this.indx,1);
						this.index = -1;
						this.ind = -1;
						this.indx = -1;
						this.rId = 0;//每一条的id
				    }
				})
			},
			//修改
			getRevise(){
				//console.log(this.form,111111111111)
				if(this.form.moreform == undefined){
					this.form.moreform = 0;
				}
				let obj = {
					begDate:this.form.begDate, //日期
					begTime:this.form.begTime, //时间
					endDate:this.form.endDate, //日期
					endTime:this.form.endTime, //时间
					duration:this.form.duration, //时长
					telect:this.form.telect, //标题
					participant:this.form.participant, //参与人
					project:this.form.project,//项目名称
					moreform:this.form.moreform,//单位名称
					mode:this.form.mode,//工作方式
					plan:this.form.plan,//工作计划
					execute:this.form.summarize,
					rid:this.rId
				}
				let dataArr = request({
				    url:domainUrl + '/uptSchedule',
				    data:obj,
				    method:'POST'
				})
				dataArr.then(res => {
					this.popUpsQx();
					this.getQuery(this.checks);
				})	
			},
		  //总结
		  getZongjie(){
			  if(this.rId != 0||this.rId != ""){
					this.isPop = true;
				    this.isZongjie = true;  
					this.isFag = false;
					let time = new Date();
					let y = time.getFullYear();
					let m = time.getMonth()+1;
					let d = time.getDate();
					let h = time.getHours();
					let miu = time.getMinutes();
					this.tjTime = y + "-"+(m < 10 ? ('0' + m) : m)+"-"+(d < 10 ? ('0' + d) : d)+ " "+(h < 10 ? ('0' + h) : h)+":"+(miu < 10 ? ('0' + miu) : miu);
			  }

		  },
		  onLoad({ page, value,data }, callback){
			  var self = this;
			  var arr = [];
			  var total = 0;
			if(data){
				this.unitName = data.unitName;
				this.custName = data.custName;
				this.tel = data.tel;
			}
			if(page){
				let obj = {
					pageNum:page.currentPage,
					pageSize:page.pageSize,
					unitName:this.unitName,
					custName:this.custName,
					tel:this.tel		
				}
				let kehu = request({
					url:domainUrl+ '/custList',
					data:obj,
					method:'POST'
				})
				kehu.then(res => {
					//分页查询信息
					setTimeout(function(){
						callback({
							total:res.data.total,
							data: res.data.list
						})		
					},500)	
				})
			}
		  },
			//新增保存
			addBaocun(){
				var self = this;
				let day = this.form.begTime.split("-")[2];
				let hour = this.form.begDate.split(":")[0];
				let xinqi = "";
				for(var i =  0;i<this.dataList.length;i++){
					for(var j = 0;j<this.dataList[i].arr.length;j++){
						if(day == this.dataList[i].arr[j].id){
							xinqi = this.dataList[i].arr[j].xingqi;
							break;
						}
					}
				}
				if(this.rId == 0 || this.rId == ""){
					let obj = {
						obj:this.form,
						userId:this.obj.id, //角色Id
						begTime:this.begTime, //每周周一
						endTime:this.endTime, //每周周日
						xingqi:xinqi
					}
					let dataArr = request({
					    url:domainUrl + '/writeSchedule',
					    data:obj,
					    method:'POST'
					})
					dataArr.then(res => {
						this.popUpsQx();
						this.getQuery(this.checks);
					})	
				}else{
					this.getRevise();
				}
			
			},
			//点击更多选项
			clickMore(){
				this.isFag = false;
				this.isMore = true;
			},
			//鼠标左键
			clickStyle(index,e,ind){
				var self = this;
				//this.isOptions = true;
				// for(var i = 0;i<this.dataList.length;i++){
				// 	for(var j = 0;j<this.dataList[i].arr.length;j++){
				// 		this.dataList[i].arr[j].isTian = false;
				// 	}
					
				// }
				// setTimeout(function(){
				// 	self.dataList[index].arr[ind].isTian = true;	
				// },50)
			},
			//鼠标右键
			contList(index,e,ind){
				e.preventDefault();
				var self = this;
				for(var i = 0;i<this.dataList.length;i++){
					for(var j = 0;j<this.dataList[i].arr.length;j++){
						this.dataList[i].arr[j].isTian = false;
					}
					
				}
				this.isTian = true;
				//console.log(e.x,e.y,2222222222222)
				this.popX = e.x;
				this.popY = e.y;
				setTimeout(function(){
					self.dataList[index].arr[ind].isTian = true;	
				},50)
				self.toDay = self.dataList[index].arr[ind].id;
				self.toTime = self.dataList[index].id;
				this.isOptions = true;
			},
			//鼠标双击
			dblList(index,e,ind){
				this.toDay = this.dataList[index].arr[ind].id;
				this.toTime = this.dataList[index].id;
				this.isOptions = true;
				this.clickAdd(e);
			},
			//鼠标选择有日程的
			clickList(index,e,ind,indx,form){
				console.log(index,e,ind,indx,form)
				this.index = index;
				this.ind = ind;
				this.indx = indx;
				if(e.x > 1150){
					this.popX = e.x - 380;
				}else{
					this.popX = e.x;
				}
				if(e.y > 450){
					this.popY = e.y-300;
				}else{
					this.popY = e.y+20;		
				}
				this.isPop = true;
				this.isFag = true;
				
				this.isOptions = false;
				
				this.form.begDate = form.arr[indx].begDate;//日期
				this.form.begTime = form.arr[indx].begTime; //时间
				this.form.endDate = form.arr[indx].endDate;//日期
				this.form.endTime = form.arr[indx].endTime; //时间
				this.form.duration = form.arr[indx].duration; //时长
				this.form.telect = form.arr[indx].telect; //标题
				this.form.participant = form.arr[indx].participant; //参与人
				this.form.participantName = form.arr[indx].participantName
				this.form.project = form.arr[indx].project;//项目名称
				this.form.moreform = form.arr[indx].company;//单位名称
				this.form.custname = form.arr[indx].custname;
				this.form.mode = form.arr[indx].mode;//工作方式
				this.form.plan = form.arr[indx].plan;//工作计划
				
				this.rId = form.arr[indx].rid;//每一条的ID
				//console.log(form,index,this.rId)
				console.log(this.form.moreform,this.form.custname)
				
			},
			//弹窗取消
			popUpsQx(){
				this.isPop = false;
				this.isFag = false;
					
				this.isMore = false;
				this.isZongjie = false;
					
				this.toDay = 0;
				this.toTime = 0;
				this.rId = 0;
			},
			tianQx(){
				this.isTian = false;
				// for(var i = 0;i<this.dataList.length;i++){
				// 	for(var j = 0;j<this.dataList[i].arr.length;j++){
				// 		this.dataList[i].arr[j].isTian = false;
				// 	}	
				// }
			},

			//新增日程
			clickAdd(e){
				this.isPop = true;
				this.isFag = true;
				
				let time = new Date();
				let y = time.getFullYear();
				let m = time.getMonth()+1;
				let d = time.getDate();
				let h = time.getHours();
				let miu = time.getMinutes();

				if(e.x > 1150){
					this.popX = e.x - 380;
				}else{
					this.popX = e.x - 330;
				}
				if(e.y > 450){
					this.popY = e.y-300;
				}else{
					this.popY = e.y+20;		
				}

				if(this.isTian){
					this.isTian = false;
					for(var i = 0;i<this.dataList.length;i++){
						this.dataList[i].isTian = false;
					}
					
				}else{
					this.popX = e.x - 330;
					this.popY = e.y+20;	
	
				}
				//console.log(this.toDay,this.toTime)
				if(this.toDay != 0){
					this.form.begTime = y + "-"+(m < 10 ? ('0' + m) : m)+"-"+(this.toDay < 10 ? ('0' + this.toDay) : this.toDay);
					this.form.endTime = y + "-"+(m < 10 ? ('0' + m) : m)+"-"+(this.toDay < 10 ? ('0' + this.toDay) : this.toDay);
					this.form.begDate = this.toTime+":"+(miu < 10 ? ('0' + miu) : miu);	
					this.form.endDate = (this.toTime+1)+":"+(miu < 10 ? ('0' + miu) : miu);
				}else{
					this.form.begTime = y + "-"+(m < 10 ? ('0' + m) : m)+"-"+(d < 10 ? ('0' + d) : d);
					this.form.endTime = y + "-"+(m < 10 ? ('0' + m) : m)+"-"+(d < 10 ? ('0' + d) : d);
					this.form.begDate = h+":"+(miu < 10 ? ('0' + miu) : miu);
					this.form.endDate = (h+1)+":"+(miu < 10 ? ('0' + miu) : miu);
				}

				this.form.telect = "";
				this.form.duration = "1小时";
				this.form.participant = [];
				this.form.project = "";//项目名称
				this.form.moreform = "";//单位名称
				this.form.mode = "现场";//工作方式
				this.form.plan = "";//工作计划
				//this.qingkong();
			},
			qingkong(){
				let time = new Date();
				let y = time.getFullYear();
				let m = time.getMonth()+1;
				let d = time.getDate();
				let h = time.getHours();
				let miu = time.getMinutes();
				
				
				this.form.begTime = y + "-"+(m < 10 ? ('0' + m) : m)+"-"+(d < 10 ? ('0' + d) : d);
				this.form.begDate = h+":"+(miu < 10 ? ('0' + miu) : miu);
				this.form.endTime = y + "-"+(m < 10 ? ('0' + m) : m)+"-"+(d < 10 ? ('0' + d) : d);
				this.form.endDate = (h+1)+":"+(miu < 10 ? ('0' + miu) : miu);
				this.form.telect = "";
				this.form.duration = "1小时";
				this.form.participant = [];
				this.tjTime = "";

			},
			//是否全天
			blurQt(){
				this.isChecked =! this.isChecked;
				if(this.isChecked){
					this.form.endTime = this.form.begTime;
					this.form.endDate = "23:59";
				}else{
					let hour = this.form.begDate.split(":")[0]
					let min = this.form.begDate.split(":")[1]
					this.form.endDate = (parseInt(hour) + 1) +":"+ min;
				}
			},
			//本周
			monday(){
				var now = new Date();
				var week=new Array();
				this.getCommon(now);

			},
			//点击上一周
			lastclick(){
				
			},
			//点击下一周
			nextclick(){
				
			},
			
            //下拉框数据
            getXlk(){
                let dataArr = request({
                    url:domainUrl+ '/findUsers',
                    method:'GET',
                    header: { 'content-Type': 'application/json' },
                })
                dataArr.then(res => {
                    this.dicParticipant = res.data;
					this.participant = [{
						label:"成员",
						children:[
							{
								label:"总经理",
								children:[{label:"tjs",value:13},]
							},
							{
								label:"实施部",
								children:[{label:"kjq",value:26},{label:"徐明辉",value:11},{label:"米彩云",value:9},{label:"张军",value:12},{label:"何满意",value:22}]
							},
							{
								label:"客服部",
								children:[{label:"席林杰",value:5},{label:"张衡",value:6},{label:"王鹏",value:7},{label:"方忠根",value:27}]
							},
							{
								label:"开发部",
								children:[{label:"wsx",value:2},{label:"xtm",value:3},]
							},
							{
								label:"行政部",
								children:[{label:"吴礼超",value:10},{label:"李金凤",value:28},]
							}
						]
					}]
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
			getCommon(day){
				let date1 = new Date(day);
				var currentWeek = date1.getDay();
				if ( currentWeek == 0 ){
					currentWeek = 7;
				} 
				this.isDay = date1.getDate();
				
				let beg = date1.getTime() - (currentWeek-1)*24*60*60*1000; //星期一
				let date = new Date(beg);
				var year = date.getFullYear();
				var month = date.getMonth()+1;
				this.day1 = date.getDate(); 
				this.begTime = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (this.day1 < 10 ? ('0' + this.day1) : this.day1);
				let beg1 = date1.getTime() - (currentWeek-2)*24*60*60*1000; //星期二
				this.day2 = new Date(beg1).getDate();
				let beg2 = date1.getTime() - (currentWeek-3)*24*60*60*1000; //星期三
				this.day3 = new Date(beg2).getDate();
				let beg3 = date1.getTime() - (currentWeek-4)*24*60*60*1000; //星期四
				this.day4 = new Date(beg3).getDate();
				let beg4 = date1.getTime() - (currentWeek-5)*24*60*60*1000; //星期五
				this.day5 = new Date(beg4).getDate();
				let beg5 = date1.getTime() - (currentWeek-6)*24*60*60*1000; //星期六
				this.day6 = new Date(beg5).getDate();
				let end = date1.getTime() + (7-currentWeek)*24*60*60*1000;
				let date2 = new Date(end);
				var year1 = date2.getFullYear();
				var month1 = date2.getMonth()+1;
				this.day7 = date2.getDate(); 
				this.endTime = year1 + "-" + (month1 < 10 ? ('0' + month1) : month1) + "-" + (this.day7 < 10 ? ('0' + this.day7) : this.day7);
			
				let dayArr = [this.day1,this.day2,this.day3,this.day4,this.day5,this.day6,this.day7];
				let xinqi = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
				//console.log(dayArr)
				this.dataList = [
				{time:"1:00",id:1,arr:[]},{time:"2:00",id:2,arr:[]},{time:"3:00",id:3,arr:[]},{time:"4:00",id:4,arr:[]},
				{time:"5:00",id:5,arr:[]},{time:"6:00",id:6,arr:[]},{time:"7:00",id:7,arr:[]},{time:"8:00",id:8,arr:[]},
				{time:"9:00",id:9,arr:[]},{time:"10:00",id:10,arr:[]},{time:"11:00",id:11,arr:[]},{time:"12:00",id:12,arr:[]},
				{time:"13:00",id:13,arr:[]},{time:"14:00",id:14,arr:[]},{time:"15:00",id:15,arr:[]},{time:"16:00",id:16,arr:[]},
				{time:"17:00",id:17,arr:[]},{time:"18:00",id:18,arr:[]},{time:"19:00",id:19,arr:[]},{time:"20:00",id:20,arr:[]},
				{time:"21:00",id:21,arr:[]},{time:"22:00",id:22,arr:[]},{time:"23:00",id:23,arr:[]}];
				
				for(var i = 0;i<this.dataList.length;i++){
					for(var j = 0;j<7;j++){
						let obj = {
							isTian:false,
							id:dayArr[j],
							xingqi:xinqi[j],
							arr:[]
						}
						this.dataList[i].arr.push(obj)
					}
				}
			},
		  handleClickDay(day){ //点击这一天，绑定点击事件
			// console.log( '形参传进来的',day)
			// console.log( 'data里面的this.day',this.day)
			// console.log( 'data里面的currentYearMonthTimes',this.currentYearMonthTimes)
			this.day = day
			if(this.day > this.currentYearMonthTimes){
			  this.$message.warning('不能选择超出本月的日期');
			}
			console.log(day)
			let d = this.year + "-" + this.month + "-"+day
			this.getCommon(d);
			this.getQuery(this.checks);
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
			this.getCommon(d);
			this.getQuery(this.checks);
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
			this.getCommon(d);
			this.getQuery(this.checks);
		  },
				  
        }
    }
</script>

<style scoped="scoped">
	/* 弹窗 */
	.popUpsQx{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
	}
	.popUps{
		position: fixed;
/* 		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); */
		width: 350px;
		height: 230px;
		border: 1px solid #ddd;
		background-color: #fff;
		padding: 20px;
		z-index: 9999;
	}
	.begTime, .endTime, .participant{
		height: 35px;
		line-height: 35px;
		margin-top: 10px;
	}
	.begTime .begTime-text, .endTime .begTime-text, .participant .begTime-text{
		width: 50px;
		float: left;
	}
	.begTime-right{
		width: 70px;
		float: right;
	}
	.begTime >>> .el-input{
		width: 130px;
		float: left;
	}
	.begTime >>> .el-date-editor--time-select{
		width: 80px;
		margin-left: 5px;
	}
	.endTime >>> .el-select{
		width: 215px;
	}
	.participant >>> .el-input{
		width: 300px;
	}
/* 	.participant >>> .van-cell{
		width: 280px;
		float: right;
		border: 1px solid #ddd;
		height: 35px;
		line-height: 35px;
		padding-left: 10px;
		border-radius: 5px;
	} */
	.btn{
		height: 35px;
		line-height: 35px;
		margin-top: 20px;
	}
	.gdxx{
		float: right;
	}
	.baocun{
		float: right;
/* 		background-color: #409EFF; */
		color: #409EFF;
	}
	
	.addRight{
		text-align: center;
		cursor: pointer;
		background: #ececec;
		border-radius: 5px;
	}
	
	.tianjia{
		position: fixed;
		width: 100px;
		height: 40px;
		border: 1px solid #ddd;
		background-color: #fff;
		z-index: 9999;
	}
	
	.top-week-list .list-text{
		height: 35px;
		line-height: 35px;
		float: left;
		border-left: 1px solid #fff;
		background: #d4e3f3;
		cursor: pointer;
		overflow: hidden;
	}
	.top-week-list .list-text1{
		height: 35px;
		line-height: 35px;
		float: left;
		border-left: 1px solid #fff;
		background: rgba(0,0,0,0.3);
		cursor: pointer;
		overflow: hidden;
	}

	
	.mid >>> .el-card__body{
		padding: 20px 0px;
	}

	* {
	    margin: 0px;
	    border: 0px;
	    list-style: none;
	  }
	
	  .left {
		  width: 200px;
		  float: left;
		border-right: 1px solid #ddd;
		height: 500px;
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
	    width: 28px;
		text-align: center;
	  }
	
	  .every-day {
	    display: inline-block;
	    height: 28px;
	    width: 28px;
	    text-align: center;
	    line-height: 28px;
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
	  
	  .right-top{
		  height: 40px;
		  line-height: 40px;
		  padding-bottom: 10px;
		  border-bottom: 1px solid #ddd;
	  }
	  .right-top-left{
		  text-align: center;
	  }
	  .right-top-mid{
		  text-align: center;
	  }
	  .right-top-right button{
		  float: right;
	  }
	  .time-left button{
		  width: 50px;
		  float: left;
		  background: #fff;
	  }
	  .time-right button{
		  width: 50px;
		  float: right;
		  background: #fff;
/* 		  margin-top: -40px; */
	  }
	  .top-week{
		  width: 100%;
		  height: 67px;
		  border-bottom: 1px solid #ddd;
			text-align: center;
	  }
	  .week-left{
		  width: 60px;
		  height: 67px;
		  float: left;
	  }
	  .week-list{
		  width: 13.2%;
		  height: 67px;
		  float: left;
		 /* border-left: 1px solid #ddd; */
	  }
	  .list-text{
		height: 35px;
		line-height: 35px;
		border-left: 1px solid #ddd;
	  }
	  .list-text1{
		height: 35px;
		line-height: 35px;
		border-left: 1px solid #409EFF;
		  background: #409EFF;
		  color: #fff;
	  }
	  .list-xq{
		height: 30px;
		line-height: 30px;
		border-left: 1px solid #fff;
		border-bottom: 1px solid #ddd;
	  }
	  .weekTop{
		  width: 81%;
		  height: 130px;
		  position: absolute;
		  top: 0;
		  left: 200px;
	  }
	  .rightCon{
		width: 81%;
		height: 130px;
		position: absolute;
		top: 120px;
		left: 200px;
		height: 360px;
		overflow: auto;
	  }
	  .top-week-list{
		width: 100%;
		height: 35px;
		line-height: 35px;
		text-align: center;
	  }
	  .top-week-list .week-left{
		  height: 35px;
	  }
	  .top-week-list  .week-list{
		  height: 35px;
	  }
	  .rightCon .week-list{
		  background-color: #fff;
		  border-left: 1px solid #ddd;
	  }
	  .rightCon .week-list1{
		  background-color: #d4e3f3;
		  border-left: 1px solid #ddd;
		  width: 13.2%;
		  height: 35px;
		  float: left;
	  }
	  
	  .begTime >>> .el-input--prefix .el-input__inner{
		  padding-left: 15px;
	  }
	  .begTime >>> .el-input__prefix{
		  display: none;
	  }
	  
	  /* 更多选择 */
	  .more{
	  	position: fixed;
	  	top: 50%;
	  	left: 50%;
	  	transform: translate(-50%, -50%);
	  	width: 350px;
/* 	  	height: 480px; */
	  	border: 1px solid #ddd;
	  	background-color: #fff;
	  	padding:5px 20px;
	  	z-index: 9999;
	  }
	  .zongjie{
		  position: fixed;
		  top: 50%;
		  left: 50%;
		  transform: translate(-50%, -50%);
		  width: 350px;
	/* 	  height: 430px; */
		  border: 1px solid #ddd;
		  background-color: #fff;
		  padding:20px;
		  z-index: 9999;
	  }
	  .zongjie-con .list{
		  line-height: 30px;
		  color: #666;
	  }
	  .zongjie-con .list p{
		  width: 80px;
		  display: block;
		  float: left;
	  }
	  .zongjie-con .list span{
		  width: 220px;
		  display: -webkit-box;
		  -webkit-line-clamp: 2;
		  -webkit-box-orient: vertical;
		  float: left;
		  overflow: hidden;
		  text-overflow: ellipsis;		
	  }

	  .more >>> .participant .el-input{
	  	width: 280px;
	  }

	  .index{
		  width: 20px;
		  margin: 0 auto;
		  border-bottom: 1px solid #333;
	  }
	  .riqi{
		  width: 320px;
		  float: left;
	  }
	  .selectTime{
		  width: 80px;
	  }
	  .selectTime >>> .el-input{
		  width: 80px;
	  }
	  
	  .more >>> .el-input__inner{
		  height: 35px;
	  }
	  .more >>> .begTime{
		  margin-top: 5px;
		  height: 35px;
		  line-height: 35px;
	  }
	  .more >>> .participant{
		  margin-top: 5px;
		  height: 35px;
		  line-height: 35px;
	  }
	  
	  .check{
		  margin-top: 10px;
	  }
	  .more >>> .endTime{
	  		  margin-top: 5px;
	  		  height: 35px;
	  		  line-height: 35px;
	  }
	  .check-con input{
		  margin-right: 5px;
	  }
	  .check-con ul{
		  margin: 0;
		  padding-left: 20px;
	  }
	  .check-con ul li{
		  height: 35px;
		  line-height: 35px;
		  cursor: pointer;
	  }
	  .check-con{
		  height: 200px;
		  overflow: auto;
	  }
	  .checksIndex{
		  background: #d4e3f3;
	  }

	  @media screen and (max-width: 1350px) {
	      .week-list{
			  width: 13%;
		  }
	  }
	  @media screen and (max-width: 1298px) {
		  .riqi{
			  width: 300px;
		  }
	  }
	  @media screen and (max-width: 1248px) {
	  		  .riqi{
	  			  width: 280px;
	  		  }
	  }
	  @media screen and (max-width: 1200px) {
	  		  .riqi{
	  			  width: 250px;
	  		  }
	  }
	  @media screen and (max-width: 1125px) {
	  		  .riqi{
	  			  width: 230px;
	  		  }
	  }
	  @media screen and (max-width: 1190px) {
	      .week-list{
				width: 12.5%;
	  		}
	  }
</style>
