<template>
	<basic-container class="mid">
		<div class="topList">
			<div :class="isDaiban?'isIndex':''" @click="clickRicheng">日程</div>
			<div :class="isDaiban?'':'isIndex'" @click="clickDaiban">待办</div>
		</div>
		<!-- 日程 -->
		<div v-if="isDaiban" class="richeng" style="margin-top: 5px;">
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
						<div class="check-con">
							<el-tree
							:data="participant"
							:current-node-key="checks"
							:props="{
								label:'label',
								children:'children'
							}"
							node-key="value"
							:default-expand-all="true"
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
									<div v-for="(it,ind) in item.arr" :class="it.isTian?'week-list1':'week-list'" @contextmenu.prevent="contList(index,$event,ind)" @click="clickStyle(index,$event,ind)" @dblclick="dblList(index,$event,ind)">
										<div class="list-text" v-for="(its,indx) in it.arr" @click="clickList(index,$event,ind,indx,it)" @contextmenu.prevent="contList(index,$event,ind)">
											<div :class="its.totalTimes!=null?'claPo1':'claPo'" :style="{ width: 100/its.t-1 +'%',height:its.times.length*45 + its.times.length +'px',left:(100/its.t)*(its.panCoun-1)+'%',background:its.woGong}"
		
												>
												<div style="font-size: 10px;text-align: left;line-height: 22px;">{{its.begDate}} {{its.mode}}</div>
												<div style="font-size: 12px;text-align: left;line-height: 22px;">{{its.telect}}</div>
											</div>
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
				<div v-if="isMouse">
					<div class="biaoti">
						<el-input v-model="form.telect" :disabled="form.woId" placeholder="日程,会议,活动主题"></el-input>
					</div>
					<div class="begTime">
						<div class="begTime-text">
							开始
						</div>
						<el-date-picker type="date" :disabled="form.woId" placeholder="选择日期" v-model="form.begTime" value-format="yyyy-MM-dd"></el-date-picker>		
						<!-- <el-time-select v-model="form.begDate"></el-time-select> -->
						<el-select v-model="form.begDate" class="selectTime" :disabled="form.woId">
							<el-option v-for="item in timeArr" :value="item.value">{{item.label}}</el-option>
						</el-select>
						<div class="begTime-right">
							<input type="checkbox" :disabled="form.woId" :checked="isChecked" @click="blurQt" style="margin-right: 5px;">全天
						</div>
					</div>
					<div class="begTime">
						<div class="begTime-text">
							结束
						</div>
						<el-date-picker type="date" :disabled="form.woId" placeholder="选择日期" v-model="form.endTime" value-format="yyyy-MM-dd"></el-date-picker>		
						<!-- <el-time-select v-model="form.begDate"></el-time-select> -->
						<el-select v-model="form.endDate" class="selectTime" :disabled="form.woId">
							<el-option v-for="item in timeArr" :value="item.value">{{item.label}}</el-option>
						</el-select>
					</div>
					<div class="participant">
						<div class="begTime-text">
							参与人
						</div>
						<avue-select all multiple v-model="form.participant" :disabled="form.woId" placeholder="请选择参与人" type="tree" :dic="dicParticipant"></avue-select>
					</div>
					<div class="btn" v-if="isOptions">
						<el-button class="baocun" @click="addBaocun">保存</el-button>
						<el-button class="gdxx" @click="clickMore">更多选项</el-button>
					</div>
					<div class="btn" v-else>
						<el-button style="margin-left: 5px;" v-if="form.woId == false" class="gdxx" @click="getDel">删除</el-button>
						<el-button style="margin-left: 5px;"  class="gdxx" @click="getZongjie">汇报</el-button>
						<el-button style="margin-left: 5px;" v-if="form.totalTimes==null && form.woId == false" class="gdxx" @click="clickMore">编辑</el-button>
						<el-button style="margin-left: 5px;" v-if="form.totalTimes==null && form.woId == false" @click="clickMore">更多选项</el-button>
					</div>
				</div>
				<div class="zongjie-con" v-else>
					<div class="list" v-if="form.telect != ''"><p>标题：</p><span>{{form.telect}}</span></div>
					<div class="list" v-if="form.begTime != ''"><p>开始时间：</p><span>{{form.begTime}} {{form.begDate}}</span></div>
					<div class="list" v-if="form.endTime != ''"><p>结束时间：</p><span>{{form.endTime}} {{form.endDate}}</span></div>
					<div class="list" v-if="form.participantName != null"><p>参与人：</p><span>{{form.participantName}}</span></div>
					<div class="list" v-if="form.project != ''"><p>项目名称：</p><span>{{form.project}}</span></div>
					<div class="list" v-if="form.custname != ''"><p>单位名称：</p><span>{{form.custname}}</span></div>
					<div class="list"><p>工作方式：</p><span>{{form.mode}}</span></div>
					<div class="list" v-if="form.plan != ''"><p>工作计划：</p><span>{{form.plan}}</span></div>
					<div class="list"><p>提交时间：</p><span>{{tjTime}}</span></div>
					<div class="list" v-if="form.summarize != ''"><p>工作汇报：</p><span>{{form.summarize}}</span></div>
					<div>
						<el-button style="margin-left: 5px;" class="gdxx" @click="getDel">删除</el-button>
						<el-button style="margin-left: 5px;" class="gdxx" @click="clickMore">编辑</el-button>
						<el-button style="margin-left: 5px;" class="gdxx" @click="getZongjie">汇报</el-button>
						<el-button style="margin-left: 5px;" class="gdxx" @click="clickMore">更多选项</el-button>	
					</div>

				</div>
			</div>
			<!-- 右键添加 -->
			<div class="tianjia" v-if="isTian" :style="{ left: popX + 'px',top:popY + 'px' }">
				<el-button style="border-bottom: 1px solid #ddd;" @click="clickAdd">添加日程</el-button>
				<el-button style="margin-left: 0;" @click="clickHuibao">添加汇报</el-button>
			</div>
			<!-- 更多选项 -->
			<div class="more" v-if="isMore">
				<div class="biaoti">
					<el-input v-model="form.telect" :disabled="form.woId" placeholder="日程,会议,活动主题"></el-input>
				</div>
				<div class="begTime">
					<div class="begTime-text">
						开始
					</div>
					<el-date-picker type="date" :disabled="form.woId" placeholder="选择日期" v-model="form.begTime" value-format="yyyy-MM-dd"></el-date-picker>		
					<!-- <el-time-select v-model="form.begDate"></el-time-select> -->
					<el-select v-model="form.begDate" class="selectTime" :disabled="form.woId">
						<el-option v-for="item in timeArr" :value="item.value">{{item.label}}</el-option>
					</el-select>
					<div class="begTime-right">
						<input type="checkbox" :disabled="form.woId" :checked="isChecked" @click="blurQt" style="margin-right: 5px;">全天
					</div>
				</div>
				<div class="begTime">
					<div class="begTime-text">
						结束
					</div>
					<el-date-picker type="date" :disabled="form.woId" placeholder="选择日期" v-model="form.endTime" value-format="yyyy-MM-dd"></el-date-picker>		
					<!-- <el-time-select v-model="form.begDate"></el-time-select> -->
					<el-select v-model="form.endDate" class="selectTime" :disabled="form.woId">
						<el-option v-for="item in timeArr" :value="item.value">{{item.label}}</el-option>
					</el-select>
				</div>
				<div class="participant">
					<div class="begTime-text" style="width: 70px;">
						参与人
					</div>
					<avue-select all multiple v-model="form.participant" :disabled="form.woId" placeholder="请选择参与人" type="tree" :dic="dicParticipant"></avue-select>
				</div>
				<div class="participant">
					<div class="begTime-text" style="width: 70px;">
						项目名称
					</div>
					<avue-select v-model="form.project" placeholder="请选择项目名称" :disabled="form.woId" :dic="projectArr"></avue-select>
				</div>
				<div class="participant">
					<div class="begTime-text" style="width: 70px;">
						单位名称
					</div>
					<avue-input class="list-right" readonly="readonly" v-model="form.custname" placeholder="请输入客户单位"></avue-input>
					<avue-input-table :props="props" :disabled="form.woId" :formatter="formatter" :column="column" :on-load="onLoad" v-model="form.moreform"  placeholder="请选择单位名称" ></avue-input-table>
					<i class="iconfont iconcategory"></i>
				</div>
				<div class="participant">
					<div class="begTime-text" style="width: 70px;">
						工作方式
					</div>
					<avue-select v-model="form.mode" :disabled="form.woId" placeholder="请选择工作方式" :dic="modeArr"></avue-select>
				</div>
				<div class="participant" style="height: 150px;">
					<div class="begTime-text" style="width: 70px;">
						工作计划
					</div>
					<avue-input type="textarea" :disabled="form.woId" v-model="form.plan"></avue-input>
				</div>
				<div class="btn" style="margin-top: 10px;">
					<el-button class="baocun" v-if="!form.woId" @click="popUpsQx">取消</el-button>
					<el-button style="background: #409EFF;color: #fff;margin-right: 10px;" class="baocun" v-if="!form.woId" @click="addBaocun">保存</el-button>
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
						<avue-input :disabled="form.woId" type="textarea" v-model="form.summarize"></avue-input>
					</div>
					<div class="btn" style="margin-top: 5px;">
						<el-button class="baocun" v-if="!form.woId" @click="addBaocun">保存</el-button>
					</div>
				</div>
			</div>

			<!-- 工作汇报 -->
			<div v-drag class="drag popUps" v-if="isHuibao" :style="{ left: popX + 'px',top:popY + 'px' }">
				<div class="biaoti">
					<el-input v-model="form.telect" placeholder="汇报主题"></el-input>
				</div>
				<div class="begTime">
					<div class="begTime-text">
						开始
					</div>
					<el-date-picker type="date" placeholder="选择日期" v-model="form.begTime" value-format="yyyy-MM-dd"></el-date-picker>		
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
				<div class="participant" style="height: 150px;">
					<div class="begTime-text" style="width: 80px;">
						工作汇报：
					</div>
					<avue-input type="textarea" v-model="form.summarize"></avue-input>
				</div>
				<div class="btn">
					<el-button style="margin-left: 5px;" class="gdxx" @click="addBaocun">保存</el-button>
				</div>
			
			</div>

			</el-row>
		</div>
		<!-- 待办 -->
		<div v-else class="daiban">
			<div class="daiban-top" style="width: 100%;height: 40px;border-bottom: 1px solid #ddd;">
<!-- 				<input type="text" class="daiInput" placeholder="写下你的待办事项...">
				<i class="el-icon-bell"></i>
				<i class="el-icon-user"></i> -->
				<div class="daiban-list-left" style="margin-left: 5px;">
					<input class="daiban-input1" type="checkbox" @click="clickQinput">
				</div>
				<el-button @click="inputDelete">删除</el-button>
				<div class="daibanTime">
					<div class="sqTop">查询日期:</div>
					<avue-date :span="4" v-model="begTimeD" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择日期"></avue-date>
					<span style="float: left;line-height: 30px;margin: 0 10px">至</span>
					<avue-date :span="4" v-model="endTimeD" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择日期"></avue-date>
				</div>
				<div class="daibanType">
					<div class="begTime-text">
						状态：
					</div>
					<avue-select v-model="daibanType" placeholder="请选择状态" :dic="dicType"></avue-select>
				</div>
				<div class="dianbanBtn">
					<button @click="clickCx">查询</button>
				</div>
			</div>
			<div class="daiban-mid">
				<div class="daiban-list" :class="item.isFag?'daiIndex':''" v-for="(item,index) in daibanList" @contextmenu.prevent="conDaiban(index,$event)" @click="clickDai">
					<div class="daiban-list-left">
						<input class="daiban-input" type="checkbox">
					</div>
					<div class="daiban-list-right">
						<div class="daiban-list-top">{{item.content}}</div>
						<div class="daiban-list-bom">
							<div class="daiban-list-bom-time">{{item.time}}</div>
							<div class="daiban-list-bom-laiyuan">数据来源：
								<span v-if="item.roomid != ''">{{item.roomid}}</span>
								<span v-else>{{item.names[1]}}</span>
							</div>
							<div class="daiban-list-bom-time" v-if="item.finish == 0" style="width: 60px;margin-left: 20px;">未完成</div>
							<div class="daiban-list-bom-time" v-if="item.finish == 1" style="width: 60px;margin-left: 20px;color: #409EFF;">已完成</div>
							<div class="daiban-list-bom-text">参与人：<span v-for="it in item.names">{{it}} 、</span></div>
						</div>
					</div>
					<div class="right-but">
						<div class="right-but-succ" v-if="item.finish == 0" @click="clickSucc(item.id)">点击完成</div>
					</div>
				</div>
			</div>
			<!-- 弹窗 -->
			<div class="daibanTc" v-if="daibanIs" :style="{ left: popX + 'px',top:popY + 'px' }">
				<el-button style="border-bottom: 1px solid #ddd;" @click="clickDaiAdd">打开</el-button>
				<el-button style="margin-left: 0;" @click="clickDelete">删除</el-button>
			</div>
			
			<div v-drag class="drag popUps" v-if="daibanFag" :style="{ left: popX + 'px',top:popY + 'px' }">
				<div>
					<div class="biaoti">
						<el-input v-model="daiForm.content" placeholder="日程,会议,活动主题"></el-input>
					</div>
					<div class="begTimes">
						<div class="begTime-text">
							时间
						</div>
						<el-date-picker type="datetime" placeholder="选择日期" v-model="daiForm.time" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>		
					</div>
					<div class="participant">
						<div class="begTime-text">
							参与人
						</div>
						<avue-select all multiple v-model="daiForm.cyrs" placeholder="请选择参与人" type="tree" :dic="dicParticipant"></avue-select>
					</div>
					<div class="btn">
						<el-button class="baocun" @click="addDaiban">保存</el-button>
						<el-button class="gdxx" @click="clickDbqx">取消</el-button>
					</div>
				</div>
			</div>
			
		</div>

	</basic-container>
</template>

<script>
	import {
	    listUser, //获取员工
		listProject, //获取项目
		listPending, //获取待办
		listCustomer, //获取客户
		delSchedule, //删除待办
		delTask,//单个删除待办
		writeSchedule,//新增日程
		uptSchedule,//修改日程
		deleteByBatch, //批量删除待办
		doFinish,//点击完成
		
	} from "@/api/serve/schedule.js";
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
				
				dataList:[],
				
				begTime:"",//一周的礼拜一
				endTime:"",//一周的礼拜天
				
				day1:"",
				day2:"",
				day3:"",
				day4:"",
				day5:"",
				day6:"",
				day7:"",
				mond1:"",
				mond2:"",
				mond3:"",
				mond4:"",
				mond5:"",
				mond6:"",
				mond7:"",
				year1:"",
				year2:"",
				year3:"",
				year4:"",
				year5:"",
				year6:"",
				year7:"",
				isDay:"", //判断今天是几号
				
				isFag:false, //弹窗
				isPop:false,
				popX:0, 
				popY:0,
				
				isTian:false,
				isMore:false, //更多选项
				isZongjie:false,//总结
				
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
				modeArr:[{value:"现场",label:"现场"},{value:"文档",label:"文档"},{value:"远程",label:"远程"},{value:"公司",label:"公司"},{value:"培训",label:"培训"}],
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

				 tjTime:"",
				 isHuibao:false,
				 
				 youIndex:-1,
				 youInd:-1,
				 
				 isMouse:false,
				 
				 isDaiban:true, //日程和待办
				 daibanList:[],
				 daibanIs:false,//待办弹窗
				 daibanFag:false,//更改
				 daiForm:{},
				 
				 begTimeD:"",
				 endTimeD:"",
				 daibanType:"0",//状态
				 dicType:[{label:"未完成",value:"0"},{label:"已完成",value:"1"}]

				 //currentId:0, 
				 
            }
        },
        created(){
		  this.obj = JSON.parse(this.$cookie.get("token"));
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
		   //this.watermark({text:this.obj.realname})
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
			//jump.scrollTop  = (h-3)*45;
			jump.scrollTop = 320;
        },
        methods:{
			//右键待办
			conDaiban(index,e){
				e.preventDefault();
				for(var i = 0;i<this.daibanList.length;i++){
					this.daibanList[i].isFag = false;
				}
				this.daibanList[index].isFag = true;
			
				this.daibanIs = true;
				this.popX = e.x;
				this.popY = e.y;
				this.daiForm.content = this.daibanList[index].content;
				this.daiForm.time = this.daibanList[index].time;
				this.daiForm.cyrs = this.daibanList[index].cyrs;
				this.daiForm.id = this.daibanList[index].id;
			},
			//待办左键
			clickDai(){
				this.daibanIs = false;
				this.daibanFag = false;
				this.daiForm = {};
			},
			//待办打开
			clickDaiAdd(){
				this.daibanIs = false;
				this.daibanFag = true;
				
			},
			//待办保存
			addDaiban(){
				let dataArr = request({
				    url:domainUrl + '/taskUpt',
				    data:this.daiForm,
				    method:'POST'
				})
				dataArr.then(res => {
					this.daibanIs = false;
					this.daibanFag = false;
					this.daiForm = {};
					this.clickCx();
				})	
			},
			//取消
			clickDbqx(){
				this.daibanIs = false;
				this.daibanFag = false;
				this.daiForm = {};
				for(var i = 0;i<this.daibanList.length;i++){
					this.daibanList[i].isFag = false;
				}
			},
			//删除
			clickDelete(){
				var self = this;
				self.$confirm("确认要删除吗？", "警告", {
				    confirmButtonText: "确定",
				    cancelButtonText: "取消",
				    type: "warning",
				  })
				  .then(function() {
					  delTask(self.daiForm.id).then(
					    (res) => {
							if(res.data.success){
								self.$message.success("删除成功!");
								self.daibanIs = false;
								self.daibanFag = false;
								self.daiForm = {};
								self.clickCx();
							}
					  	}
					  );		  
				  })
			},
			//点击待办
			getDaiban(){
				let t = new Date().getTime() + 24*60*60*1000;
				let d = new Date(t).getDate();
				let m = new Date(t).getMonth()+1;
				let y = new Date(t).getFullYear();
				let time = new Date().getTime() - 3*24*60*60*1000;
				let begD = new Date(time).getDate();
				let begM = new Date(time).getMonth()+1;
				let begY = new Date(time).getFullYear();
				this.endTimeD = y +"-"+(m < 10 ? ('0' + m) : m)+"-"+(d < 10 ? ('0' + d) : d);
				this.begTimeD = begY +"-"+(begM < 10 ? ('0' + begM) : begM)+"-"+(begD < 10 ? ('0' + begD) : begD);
				let obj = {
					id:this.obj.id,
					finish:this.daibanType,
					begTime:this.begTimeD,
					endTime:this.endTimeD
				}
				listPending(obj).then(
				  (res) => {
					this.daibanList = res.data;
					for(var i = 0;i<this.daibanList.length;i++){
						this.daibanList[i].isFag = false;
					}
				  }
				);
			},
			clickCx(){
				let obj = {
					id:this.obj.id,
					finish:this.daibanType,
					begTime:this.begTimeD,
					endTime:this.endTimeD
				}
				listPending(obj).then(
				  (res) => {
					this.daibanList = res.data;
					for(var i = 0;i<this.daibanList.length;i++){
						this.daibanList[i].isFag = false;
					}
				  }
				);
			},
			//全选
			clickQinput(){
				let qInput = document.getElementsByClassName("daiban-input1");
				let input = document.getElementsByClassName("daiban-input");
				if(qInput[0].checked){
					for(var i = 0;i<input.length;i++){
						input[i].checked = true;
					}
				}else{
					for(var i = 0;i<input.length;i++){
						input[i].checked = false;
					}
				}

			},
			//批量删除
			inputDelete(){
				var self = this;
				let input = document.getElementsByClassName("daiban-input");
				let arr = [];
				for(var i = 0;i<input.length;i++){
					if(input[i].checked){
						arr.push(self.daibanList[i].id)
					}
				}
				let obj = {
					fids:arr
				}
				if(arr.length == 0){
					self.$message.success("请选择需要批量删除的数据!");
				}else{
					self.$confirm("确认要删除这些数据吗？", "警告", {
					    confirmButtonText: "确定",
					    cancelButtonText: "取消",
					    type: "warning",
					  })
					  .then(function() {
						  deleteByBatch(obj).then(
						    (res) => {
								if(res.data.success){
									self.$message.success(res.data.msg);
									self.clickCx();
									arr = [];
								}
						  	}
						  );		  
					  })
				}
			},
			//点击完成
			clickSucc(id){
				doFinish(id).then(
				  (res) => {
						if(res.data.success){
							this.$message.success(res.data.msg);
							this.clickCx();
						}
					}
				);
			},
			//点击日程
			clickRicheng(){
				this.isDaiban = true;
				setTimeout(function(){
					//计算滚动的高度
					let time = new Date();
					let h = time.getHours();
					var jump = document.querySelector('#postion');
					jump.scrollTop = 320;
				},100)

			},
			//点击待办
			clickDaiban(){
				this.isDaiban = false;
				this.getDaiban();
			},
			formatter(row){
				this.form.custname = row.unitName;
			},
			onLoad({ page, value,data }, callback){
				var self = this;
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
					listCustomer(obj).then(
					  (res) => {
							//分页查询信息
							setTimeout(function(){
								callback({
									total:res.data.total,
									data: res.data.list
								})		
							},500)
						}
					);
				}
			},
			//选择查看员工
			handleNodeClick(node,resolve){
				if(node.value != undefined){
					this.checks = node.value;
					this.getQuery(this.checks);
				}				
			},
			//更新
			getQuery(id){
				this.getArr = [];
				this.dataList = [];
				this.youIndex = -1;
				this.youInd = -1;
				let dayArr = [
					{day:this.day1,mon:this.mond1,year:this.year1},
					{day:this.day2,mon:this.mond2,year:this.year2},
					{day:this.day3,mon:this.mond3,year:this.year3},
					{day:this.day4,mon:this.mond4,year:this.year4},
					{day:this.day5,mon:this.mond5,year:this.year5},
					{day:this.day6,mon:this.mond6,year:this.year6},
					{day:this.day7,mon:this.mond7,year:this.year7}];
				let xinqi = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
				for(var i = 1;i<24;i++){
					let obj = {
						time:i+":00",
						id:i,
						arr:[]
					}
					this.dataList.push(obj)
				}
				for(var i = 0;i<this.dataList.length;i++){
					for(var j = 0;j<7;j++){
						let obj = {
							isTian:false,
							isGongdan:false,
							id:dayArr[j].day,
							monId:dayArr[j].mon,
							xingqi:xinqi[j],
							arr:[]
						}
						this.dataList[i].arr.push(obj)
					}
				}
				let beg = "";
				let end = "";
				let isY = true;
				let yes = 0;
				for(var i = 0;i<dayArr.length;i++){
					if(this.year != dayArr[i].year){
						isY = false;
						yes = i;
						break;
					}
				}
				if(isY){
					if(this.month != this.mond7){
						beg = this.year + "-" + (this.month<10?('0'+this.month):this.month) + "-"+"01";
						end = this.year + "-" + (this.mond7<10?('0'+this.mond7):this.mond7) + "-"+(this.day7 < 10 ? ('0' + this.day7) : this.day7);
					}else{
						if(this.month != this.mond1){
							beg = this.year + "-" + (this.mond1<10?('0'+this.mond1):this.mond1) + "-"+this.day1;
							end = this.year + "-" + (this.month<10?('0'+this.month):this.mond) + "-"+"31";
						}else{
							beg = this.year + "-" + (this.month<10?('0'+this.month):this.month) + "-"+"01";
							end = this.year + "-" + (this.month<10?('0'+this.month):this.month) + "-"+"31";	
						}
					}
				}else{
					beg = this.year + "-" + (this.month<10?('0'+this.month):this.month) + "-"+"01";
					end = dayArr[yes].year + "-" + (dayArr[yes].mon < 10 ? ('0' + dayArr[yes].mon) : dayArr[yes].mon) + "-"+(dayArr[6].day < 10 ? ('0' + dayArr[6].day) : dayArr[6].day);	
				}

				let dataArr = request({
					url:domainUrl + '/querySchedule?id=' + id +'&begDate=' + beg + '&endDate='+end,
					method:'GET'
				})
				dataArr.then(res => {
					let arr = res.data;
					let objArr = [];
					let list = [];
					for(var i = 0;i<arr.length;i++){
						for(var j = 0;j<this.dataList.length;j++){
							if(arr[i].timeId == this.dataList[j].id){
								for(var a = 0;a<this.dataList[j].arr.length;a++){
									if(arr[i].dayId == this.dataList[j].arr[a].id && arr[i].month == this.dataList[j].arr[a].monId){
										if(arr[i].t == null){
											arr[i].t = 1;
										}
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
											custname:arr[i].custname,
											summarize:arr[i].execute,
											woId:arr[i].woId,
											t:arr[i].t,
											times:arr[i].times,
											totalTimes:arr[i].totalTimes,
											length:arr[i].length,
											woDeal:arr[i].woDeal,
											month:arr[i].month
											
										}
										if(arr[i].t != 1){
											list.push(arr[i].t)
										}
										let obj1 = {
											id:arr[i].dayId,
											arr:arr[i].times,
											zongArr:arr[i].totalTimes,
											obj:obj
										}
										objArr.push(obj1);
										this.dataList[j].arr[a].arr.push(obj);
									}
								}
							}
						}
					}
					//显示每月哪一天有日程
					let sunArr = [];
					for(var j = 0;j<arr.length;j++){
						let sun = parseInt(arr[j].dayId)
						sunArr.push(sun)
					}
					let a1 = [];
					a1 = [...new Set(sunArr)]; //数组去重
					let sun = 0;
					sun = new Date(this.year, this.month - 1, 1).getDay();
					for(var i = 1;i<43;i++){
						let obj = {
							id:i-sun,
							isFag:false
						}
						this.getArr.push(obj)
					}
					//console.log(this.getArr,a1)
					for(var i = 0;i<this.getArr.length;i++){
						for(var j = 0;j<a1.length;j++){
							if(this.getArr[i].id == a1[j]){
								this.getArr[i].isFag = true;
							}
						}
					}

					//处理每天的时间重复
					let listArr = [];
					//计算重复的个数
					let num=[];
					let arrSum=Array.from(new Set(list));//去重
						arrSum.forEach(value=>{
						num.push(list.join('').split(value).length-1)
					})
					for(var i = 0;i<arrSum.length;i++){
						let objqc = {
							sing:arrSum[i],
							count:num[i]
						}
						listArr.push(objqc);
					}
					let panCoun = 0;
					for(var i = 0;i<listArr.length;i++){
						panCoun = 0
						for(var j = 0;j<this.dataList.length;j++){
							for(var a = 0;a<this.dataList[j].arr.length;a++){
								for(var b = 0;b<this.dataList[j].arr[a].arr.length;b++){
									if(listArr[i].sing == this.dataList[j].arr[a].arr[b].t){
										panCoun += 1;
										this.dataList[j].arr[a].arr[b].t = listArr[i].count;
										this.dataList[j].arr[a].arr[b].panCoun = panCoun;
									}
								}
							}
							
						}
					}
					//区分是否工单
					for(var j = 0;j<this.dataList.length;j++){
						for(var a = 0;a<this.dataList[j].arr.length;a++){
							for(var b = 0;b<this.dataList[j].arr[a].arr.length;b++){
								if(this.dataList[j].arr[a].arr[b].woId != null && this.dataList[j].arr[a].arr[b].woDeal == 0){
									this.dataList[j].arr[a].arr[b].woGong = "#d4e3f3";
								}
								if(this.dataList[j].arr[a].arr[b].woDeal == 1){
									this.dataList[j].arr[a].arr[b].woGong = "#409EFF";
								}
								if(this.dataList[j].arr[a].arr[b].length != null){
									this.dataList[j].arr[a].arr[b].woGong = "red";
								}
							}
						}
						
					}
				})
			},
	
			//删除
			getDel(){
				var self = this;
				self.$confirm("确认要删除吗？", "警告", {
				    confirmButtonText: "确定",
				    cancelButtonText: "取消",
				    type: "warning",
				  })
				  .then(function() {
					  delSchedule(self.rId).then(
					    (res) => {
							if(res.data.success){
								self.$message.success("删除成功!");
								self.popUpsQx();
								self.getQuery(self.checks);
								self.dataList[self.index].arr[self.ind].arr.splice(self.indx,1);
								self.index = -1;
								self.ind = -1;
								self.indx = -1;
								self.rId = 0;//每一条的id
							}
					  	}
					  );			  
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
				  }else{
					  this.isZongjie = true;
					  this.isPop = true;
					  this.isFag = false;
				  }
			  },
		 
			//新增和修改保存
			addBaocun(){
				var self = this;
				let day = this.form.begTime.split("-")[2];
				let hour = this.form.begDate.split(":")[0];
				let xinqi = "";
				
				if(this.form.telect == "" || this.form.telect == null){
					this.$message.warning('标题不能为空！');
				}else{
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
						writeSchedule(obj).then(
						  (res) => {
								this.popUpsQx();
								this.getQuery(this.checks);
							}
						);
					}else{
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
						uptSchedule(obj).then(
							(res) => {
								this.popUpsQx();
								this.getQuery(this.checks);
							}
						)					
					}
				}
			
			},
			//点击更多选项
			clickMore(){
				this.isFag = false;
				this.isMore = true;
			},
			//鼠标左键样式
			clickStyle(index,e,ind){
				var self = this;
				for(var i = 0;i<this.dataList.length;i++){
					for(var j = 0;j<this.dataList[i].arr.length;j++){
						this.dataList[i].arr[j].isTian = false;
					}
				}
				setTimeout(function(){
					self.dataList[index].arr[ind].isTian = true;	
				},50)
			},
			//鼠标右键事件
			contList(index,e,ind){
				e.preventDefault();
				var self = this;
				for(var i = 0;i<this.dataList.length;i++){
					for(var j = 0;j<this.dataList[i].arr.length;j++){
						this.dataList[i].arr[j].isTian = false;
					}
					
				}
				this.isTian = true;
				this.popX = e.x;
				this.popY = e.y;
				setTimeout(function(){
					self.dataList[index].arr[ind].isTian = true;	
				},50)
				self.toDay = self.dataList[index].arr[ind].id;
				self.toTime = self.dataList[index].id;
				this.isOptions = true;
				this.youIndex = index;
				this.youInd = ind;
			},
			//鼠标双击
			dblList(index,e,ind){
				this.toDay = this.dataList[index].arr[ind].id;
				this.toTime = this.dataList[index].id;
				this.isOptions = true;
				this.youIndex = index;
				this.youInd = ind;
				this.clickAdd(e);
			},
			//鼠标选择有日程的
			clickList(index,e,ind,indx,form){
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
				this.form.summarize = form.arr[indx].summarize;
				this.form.woId = form.arr[indx].woId;
				this.rId = form.arr[indx].rid;//每一条的ID
				this.form.totalTimes = form.arr[indx].totalTimes;
				
				if(this.form.participant == null){
					this.form.participant = [];
				}
				if(this.form.woId != null){
					this.form.woId = true;
				}else{
					this.form.woId = false;
				}
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
				
				this.youIndex = -1;
				this.youInd = -1;
				
				this.isHuibao = false;
				this.isTian = false;
				
				this.daibanIs = false;
			},
			tianQx(){
				this.isTian = false;
			},

			//新增日程事件
			clickAdd(e){
				this.isMouse = true;
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

				if(this.toDay != 0){
					let mon = this.dataList[this.youIndex].arr[this.youInd].monId;
					this.form.begTime = y + "-"+(mon < 10 ? ('0' + mon) : mon)+"-"+(this.toDay < 10 ? ('0' + this.toDay) : this.toDay);
					this.form.endTime = y + "-"+(mon < 10 ? ('0' + mon) : mon)+"-"+(this.toDay < 10 ? ('0' + this.toDay) : this.toDay);
					this.form.begDate = this.toTime+":"+"00";	
					this.form.endDate = (this.toTime+1)+":"+"00";
				}else{
					this.form.begTime = y + "-"+(m < 10 ? ('0' + m) : m)+"-"+(d < 10 ? ('0' + d) : d);
					this.form.endTime = y + "-"+(m < 10 ? ('0' + m) : m)+"-"+(d < 10 ? ('0' + d) : d);
					this.form.begDate = h+":"+"00";
					this.form.endDate = (h+1)+":"+"00";
				}

				this.form.telect = "";
				this.form.duration = "1小时";
				this.form.participant = [this.obj.id];
				this.form.project = "";//项目名称
				this.form.moreform = "";//单位名称
				this.form.mode = "现场";//工作方式
				this.form.plan = "";//工作计划
				this.form.summarize = "";
				this.form.participantName = "";
				this.form.custname = "";
				this.rId = "";
				
			},
			//新增工作汇报
			clickHuibao(){
				this.isPop = true;
				this.isHuibao = true;
				let time = new Date();
				let y = time.getFullYear();
				let m = time.getMonth()+1;
				let d = time.getDate();
				let h = time.getHours();
				let miu = time.getMinutes();
				this.youIndex = -1;
				this.youInd = -1;
				if(this.toDay != 0){
					this.form.begTime = y + "-"+(m < 10 ? ('0' + m) : m)+"-"+(this.toDay < 10 ? ('0' + this.toDay) : this.toDay);
					this.form.endTime = y + "-"+(m < 10 ? ('0' + m) : m)+"-"+(this.toDay < 10 ? ('0' + this.toDay) : this.toDay);
					this.form.begDate = this.toTime+":"+"00";	
					this.form.endDate = (this.toTime+1)+":"+"00";
				}else{
					this.form.begTime = y + "-"+(m < 10 ? ('0' + m) : m)+"-"+(d < 10 ? ('0' + d) : d);
					this.form.endTime = y + "-"+(m < 10 ? ('0' + m) : m)+"-"+(d < 10 ? ('0' + d) : d);
					this.form.begDate = h+":"+"00";
					this.form.endDate = (h+1)+":"+"00";
				}

				this.form.telect = "";
				this.form.duration = "1小时";
				this.form.participant = [this.obj.id];
				this.form.project = "";//项目名称
				this.form.moreform = "";//单位名称
				this.form.mode = "现场";//工作方式
				this.form.plan = "";//工作计划
				this.form.summarize = "";
				this.form.participantName = "";
				this.form.custname = "";
				this.rId = "";
			},
			//是否全天
			blurQt(){
				this.isChecked =! this.isChecked;
				if(this.isChecked){
					this.form.begDate = "1:00"
					this.form.endTime = this.form.begTime;
					this.form.endDate = "23:00";
				}else{
					let time = new Date();
					let h = time.getHours();
					
					this.form.begDate = h +":"+ "00";
					this.form.endDate = (parseInt(h) + 1) +":"+ "00";
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
				//员工列表
				listUser().then(
				  (res) => {
                    this.dicParticipant = res.data;
					let arr = res.data;
					this.participant = [{label:"成员",
						children:[{label:"总经理",children:[]},{label:"实施部",children:[]},{label:"客服部",children:[]},{label:"开发部",children:[]},{label:"行政部",children:[]}]}];
					for(var i = 0;i<arr.length;i++){
						if(arr[i].deptId == 1){
							this.participant[0].children[0].children.push(arr[i]);
						}else if(arr[i].deptId == 2){
							this.participant[0].children[1].children.push(arr[i]);
						}else if(arr[i].deptId == 3){
							this.participant[0].children[2].children.push(arr[i]);
						}else if(arr[i].deptId == 4){
							this.participant[0].children[3].children.push(arr[i]);
						}else if(arr[i].deptId == 5){
							this.participant[0].children[4].children.push(arr[i]);
						}
					}
				  }
				);
				//项目列表
				listProject().then(
				  (res) => {
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
				  }
				);
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
				this.mond1 = date.getMonth()+1;
				this.year1 = date.getFullYear();
				this.begTime = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (this.day1 < 10 ? ('0' + this.day1) : this.day1);
				let beg1 = date1.getTime() - (currentWeek-2)*24*60*60*1000; //星期二
				this.day2 = new Date(beg1).getDate();
				this.mond2 = new Date(beg1).getMonth()+1;
				this.year2 = new Date(beg1).getFullYear();
				let beg2 = date1.getTime() - (currentWeek-3)*24*60*60*1000; //星期三
				this.day3 = new Date(beg2).getDate();
				this.mond3 = new Date(beg2).getMonth()+1;
				this.year3 = new Date(beg2).getFullYear();
				let beg3 = date1.getTime() - (currentWeek-4)*24*60*60*1000; //星期四
				this.day4 = new Date(beg3).getDate();
				this.mond4 = new Date(beg3).getMonth()+1;
				this.year4 = new Date(beg3).getFullYear();
				let beg4 = date1.getTime() - (currentWeek-5)*24*60*60*1000; //星期五
				this.day5 = new Date(beg4).getDate();
				this.mond5 = new Date(beg4).getMonth()+1;
				this.year5 = new Date(beg4).getFullYear();
				let beg5 = date1.getTime() - (currentWeek-6)*24*60*60*1000; //星期六
				this.day6 = new Date(beg5).getDate();
				this.mond6 = new Date(beg5).getMonth()+1;
				this.year6 = new Date(beg5).getFullYear();
				let end = date1.getTime() + (7-currentWeek)*24*60*60*1000;
				let date2 = new Date(end);
				this.mond7 = new Date(end).getMonth()+1;
				this.year7 = new Date(end).getFullYear();
				var year1 = date2.getFullYear();
				var month1 = date2.getMonth()+1;
				this.day7 = date2.getDate(); 
				this.endTime = year1 + "-" + (month1 < 10 ? ('0' + month1) : month1) + "-" + (this.day7 < 10 ? ('0' + this.day7) : this.day7);
			
				let dayArr = [
					{day:this.day1,mon:this.mond1,year:this.year1},
					{day:this.day2,mon:this.mond2,year:this.year2},
					{day:this.day3,mon:this.mond3,year:this.year3},
					{day:this.day4,mon:this.mond4,year:this.year4},
					{day:this.day5,mon:this.mond5,year:this.year5},
					{day:this.day6,mon:this.mond6,year:this.year6},
					{day:this.day7,mon:this.mond7,year:this.year7}];
				let xinqi = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
				this.dataList = [];
				for(var i = 1;i<24;i++){
					let obj = {
						time:i+":00",
						id:i,
						arr:[]
					}
					this.dataList.push(obj)
				}
				for(var i = 0;i<this.dataList.length;i++){
					for(var j = 0;j<7;j++){
						let obj = {
							isTian:false,
							isGongdan:false,
							id:dayArr[j].day,
							monId:dayArr[j].mon,
							xingqi:xinqi[j],
							arr:[]
						}
						this.dataList[i].arr.push(obj)
					}
				}
			},
		  handleClickDay(day){ //点击这一天，绑定点击事件
			this.day = day;
			if(this.day > this.currentYearMonthTimes){
			  this.$message.warning('不能选择超出本月的日期');
			}else{
				//console.log(day)
				let d = this.year + "-" + this.month + "-"+day
				this.getCommon(d);
				this.getQuery(this.checks);
			}

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
	@import "../css/schedule.css";
	.daibanTime{
		width: 400px;
		float: left;
		margin-left: 20px;
		margin-top: 5px;
	}
	.avue-date{
	    float: left;
	    height: 32px;
	}
	.avue-date >>> .el-date-editor--date{
	    width: 140px;
	    height: 32px;
	}
	.avue-date >>> .el-date-editor--date .el-input__inner{
	    height: 32px;
	}
	.avue-date >>>.el-input__icon{
	    line-height: 35px;
	}
	.sqTop{
        float: left;
        width: 70px;
        line-height: 32px;
    }
	.el-button{
		float: left;
	}
	.daibanType{
		width: 200px;
		float: left;
	}
	.daibanType .begTime-text{
		width: 50px;
		float: left;
		line-height: 35px;
	}
	.daibanType >>> .el-select{
		width: 140px;
		height: 35px;
	}
	.daibanType >>> input{
		height: 35px;
		margin-top: 2px;
	}
	.dianbanBtn button{
	    padding: 6px 20px;
	    background: #fff;
	    border: 1px solid #409EFF;
	    border-radius: 3px;
	    color: #409EFF;
		margin-top: 2px;
	}
	
	.daiban-list-bom{
		margin-top: 5px;
	}
	.daiban-mid{
		height: 500px;
		overflow: auto;
	}
	.daiban-list-left{
		width: 30px;
		float: left;
	}
	.daiban-list-right{
		width: 80%;
		float: left;
	}
	.right-but{
		width: 150px;
		float: right;
	}
	.right-but-succ{
		line-height: 45px;
		cursor: pointer;
		font-size: 14px;
	}
	.daiban-input{
		margin-top: 15px;
		cursor: pointer;
	}
	.daiban-input1{
		margin-top: 10px;
		cursor: pointer;
	}
	.begTimes{
		margin-top: 10px;
	}
	.begTimes >>> .el-input{
		width: 300px;
	}
	.begTimes .begTime-text{
		width: 50px;
		line-height: 35px;
		float: left;
	}
	.daiban-list{
		border-bottom: 1px solid #ddd;
		padding: 5px;
	}
	.daiIndex{
		background: #ddd;
	}
	.daiInput{
		width: 99%;
		border: 1px solid #ddd;
		border-radius: 5px;
		height: 35px;
		margin: 5px 0;
	}
	
	.weekRight{
		width: 13.2%;
		float: left;
		height: 35px;
		border-left: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		text-align: left;
	}
	.top-week-list1{
		    width: 100%;
		    /* height: 35px; */
		    line-height: 35px;
		    text-align: center;
	}
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
		/* height: 230px; */
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
		padding: 12px 25px;
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
		height: 80px;
		border: 1px solid #ddd;
		background-color: #fff;
		z-index: 9999;
	}
	
	.top-week-list .list-text{
		height: 45px;
		line-height: 45px;
		float: left;
		border-left: 1px solid #fff;
/* 		background: #d4e3f3; */
		cursor: pointer;
		overflow: hidden;
	}
	.top-week-list .list-text1{
		height: 45px;
		line-height: 45px;
		float: left;
		border-left: 1px solid #fff;
		border-bottom: 1px solid #b3b3b3;
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
		height: 600px;
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
		height: 500px;
		overflow: auto;
	  }
	  .top-week-list{
		width: 100%;
		height: 45px;
		line-height: 45px;
		text-align: center;
	  }
	  .top-week-list .week-left{
		  height: 45px;
		  border-bottom: 1px solid #ddd;
	  }
	  .top-week-list  .week-list{
		  height: 45px;
	  }
	  .rightCon .week-list{
		  background-color: #fff;
		  border-left: 1px solid #ddd;
		  border-bottom: 1px solid #eaeaea;
		  position: relative;
	  }
	  .rightCon .week-list1{
		  background-color: #e8f3ff;
		  border-left: 1px solid #ddd;
/* 		  border-bottom: 1px solid #b3b3b3; */
		  width: 13.2%;
		  height: 45px;
		  float: left;
		  position: relative;
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
		  height: 30px;
		  overflow: hidden; 
		  text-overflow:ellipsis; 
		  white-space: nowrap;
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
/* 	  .more >>> .participant .avue-input-table .el-input{
	  	width: 2800px;
	  } */
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
		  position: relative;
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
		  height: 330px;
		  overflow: auto;
	  }
	  .checksIndex{
		  background: #d4e3f3;
	  }
	  
	  .week-list .gongdan{
		  background: #409EFF;
	  }
	  
	  .participant >>> .el-textarea{
		  height: 110px;
		  overflow: auto;
	  }
	  .participant >>> .avue-input-table{
		  width: 280px;
		  height: 40px;
		  position: absolute;
		  top: 0;
		  right: 8px;
		  z-index: 999;
		  opacity: 0;
	  }
	  .iconcategory{
	  	position: absolute;
	  	top: 3px;
	  	right: 15px;
		font-size: 10px;
	  }
	  .avue-input-table{
	  	width: 20px;
	  	height: 20px;
	  	position: absolute;
	  	top: 0;
	  	right: 25px;
	  }
	  .claPo{
		  position: absolute;
		  top: 0;
		  z-index: 999;
		  background: #d4e3f3;
		  overflow: hidden;
	  }
	  .claPo1{
		  position: absolute;
		  top: 0;
		  z-index: 999;
		  background: #ababab;
		  overflow: hidden;
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
