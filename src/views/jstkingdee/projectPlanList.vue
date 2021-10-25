<template>
    <basic-container>
        <!--<h3>未完成工单</h3>-->
        <el-row :span="24">
           <el-col :span="5">
                <div class="sqTop">项目名称:</div>
                <avue-input class="input" v-model="inputBh" placeholder="请输入项目名称" ></avue-input>
            </el-col>
            <el-col :span="5">
                <div class="sqTop">客户单位:</div>
                <avue-input v-model="inputMc" placeholder="请输入客户单位" ></avue-input>
            </el-col>
            <el-col :span="10">
                <div class="sqTop">查询日期:</div>
                <avue-date :span="4" v-model="begTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择日期"></avue-date>
                <span style="float: left;line-height: 40px;margin: 0 10px">至</span>
                <avue-date :span="4" v-model="endTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择日期"></avue-date>
            </el-col>
<!-- 			<el-col :span="6">
				<button class="topBtn" @click="lastclick">上一周</button>
				<button class="topBtn" @click="monday">本周</button>
				<button class="topBtn" @click="nextclick">下一周</button>
			</el-col> -->
            <el-col :span="4">
                <div class="btn-right" style="margin-top: 3px;float: right;">
                    <button style="margin-right: 5px;padding: 6px 15px" @click="submitcx">查询</button>
                    <button @click="error" style="padding: 6px 15px">清空</button>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="btn-right">
                    <button @click="subSucc(1)">新增</button>
					<button style="margin-right: 10px" @click="subSucc(4)">修改</button>
				</div>
				<el-col :span="2">
					<div class="userName" @click="userAdd">
					    <i class="iconfont iconbumenguanli"></i>
					</div>
				</el-col>
            </el-col>
        </el-row>
		 <avue-crud ref="crud" :option="option" :page.sync="page" :data="data" :span-method="objectSpanMethod" @on-load="onLoad" @selection-change="handleSelectionChange" @row-del="deleteData" :cell-style="cellStyle"></avue-crud>	
        <!--指定分配人-->
      <div class="popUps" v-if="isZhiding">
            <div class="fuzhi">
                <div class="fuzhi-top">
                    <i class="iconfont iconguanbi" @click="toZd"></i>
                </div>
                <div class="susou">
                    <div class="name">姓名:</div>
                    <input type="text" v-model="name" placeholder="请输入姓名">
                    <button @click="toSs">搜索</button>
                </div>
                <div class="fuzhi-mid">
                    <el-table :data="dicType" height="390" style="width: 100%" @row-dblclick="openDetails">
                        <el-table-column prop="value" label="id" width="180"></el-table-column>
                        <el-table-column prop="label" label="姓名" width="180"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 查询 -->
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

<script>
    import request from '@/router/axios';
    import { domainUrl } from '@/config/env';
    import {url} from '@/config/env';
    export default {
        name: "history",
        data(){
            return {
				inputBh:"",
				inputMc:"",
				
				spanArr: [],
				position: 0,

                isUser:false,
                formUser:[],

                begTime:"",
                endTime:"",
                data:[],
                page: {
                    total: 0,
                    pageSize:20,
					page:1
                    //pageSizes:[10,15,20]
                },
				option:{
					highlightCurrentRow:true,
					addBtn:false, //显示新增按钮
					delBtn:true, //行内删除
					editBtn:false, //行内编辑
					viewBtn:false, //行内查看
					columnBtn:true, //显示隐藏按钮
					refreshBtn:false, //显示刷新按钮
					index:false,
					indexLabel:'序号',
					border:true,
					stripe: false,  //斑马纹
					labelWidth:170, //弹出表单的label宽度
					menu:true,  //是否显示操作菜单栏
					menuWidth:100,
					selection: true, //多选
					// filterBtn:true,
					column:[
						// {
						//     sortable:true,
						//     label: "编号",
						//     prop: "code",
						//     row: true,
						//     width:110,
						//     overHidden: true,
						//     span:16
						// },
						// {
						//     sortable:true,
						//     label: "日期",
						//     prop: "mondayTime",
						//     row: true,
						//     overHidden: true,
						//     width:130,
						//     span:16
						// },
						// {
						//     sortable:true,
						//     label: "月份周期",
						//     prop: "month",
						//     row: true,
						//     overHidden: true,
						//     width:130,
						//     span:16
						// },
						{
						    sortable:true,
						    label: "提交人",
						    prop: "username",
						    row: true,
						    overHidden: true,
						    width:100,
						    span:16
						},
						{
						    sortable:true,
						    label: "星期",
						    prop: "week",
						    row: true,
						    overHidden: true,
						    width:100,
						    span:16
						},
						{
						    sortable:true,
						    label: "项目名称",
						    prop: "pname",
						    row: true,
						    overHidden: true,
						    width:150,
						    span:16
						},
						{
						    sortable:true,
						    label: "客户单位",
						    prop: "custname",
						    row: true,
						    overHidden: true,
						    width:150,
						    span:16
						},
						{
						    sortable:true,
						    label: "参与人",
						    prop: "participant",
						    row: true,
						    overHidden: true,
						    width:130,
						    span:16
						},
						{
						    sortable:true,
						    label: "计划穿透",
						    prop: "pierce",
						    row: true,
						    overHidden: true,
						    width:130,
						    span:16
						},
						{
						    sortable:true,
						    label: "工作方式",
						    prop: "mode",
						    row: true,
						    overHidden: true,
						    width:100,
						    span:16
						},
						{
						    sortable:true,
						    label: "工作计划",
						    prop: "content",
						    row: true,
						    overHidden: true,
						    width:130,
						    span:16
						},
						{
						    sortable:true,
						    label: "工作总结",
						    prop: "execute",
						    row: true,
						    overHidden: true,
						    width:130,
						    span:16
						},
						{
						    sortable:true,
						    label: "计划点评",
						    prop: "comment",
						    row: true,
						    overHidden: true,
						    width:130,
						    span:16
						},
						{
						    sortable:true,
						    label: "完成情况",
						    prop: "finish",
						    row: true,
						    overHidden: true,
						    width:130,
						    span:16
						},
						{
						    sortable:true,
						    label: "完成百分比",
						    prop: "percentage",
						    row: true,
						    overHidden: true,
						    width:130,
						    span:16
						},
					]
				},
                obj:{},
                formTj:{
                    id:0,
                    time:"",
                    deal:1,
                    description:"",
                    picurl:""
                },
				idLength:0,//判断选择是一条还是多条
                dicType:[],
                typeArr:[],
                isZhiding:false,
                name:"",
				last:1, //上一周
				next:1, //下一周
				timeCuo:0 //报错时间戳
            }
        },
        created(){
            this.obj = JSON.parse(this.$cookie.get("token"));
            this.monday();
            this.getXlk();
			//this.getList(this.page.page,this.page.pageSize,this.begTime,this.endTime,this.obj.id,this.formUser);
			
        },
        mounted(){
            //this.$refs.crud.$refs.dialogColumn.columnBox=true;
        },
        methods:{
			getTime(num){
				let time = 7*24*60*60*1000;
				let a = num*time;
				return a;
			},

			//上一周 
			lastclick(){
				let date = new Date();
				var nowTime = date.getTime(); 
				var day = date.getDay();
				var oneDayTime = 24*60*60*1000;
				 //显示周一
				 let moday = nowTime - (day-1)*oneDayTime;
				 let a = this.getTime(this.last);
				 
				 this.timeCuo = moday - a;
				 console.log(this.timeCuo)
				let s = new Date(this.timeCuo);	
				const year = s.getFullYear();
				const month = s.getMonth() + 1;
				const dayr = s.getDate();
				this.begTime = year + "-" + month + "-" + dayr;
				//显示周日
				let b1 = this.timeCuo + 6*24*60*60*1000;
				let s1 = new Date(b1);	
				const year1 = s1.getFullYear();
				const month1 = s1.getMonth() + 1;
				const dayr1 = s1.getDate();
				this.endTime = year1 + "-" + month1 + "-" + dayr1;
				this.last += 1;
				this.getList(this.page.page,this.page.pageSize,this.inputBh,this.inputMc,this.begTime,this.endTime,this.obj.id,this.formUser);
			
			},
			//下一周
			nextclick(){
				if(this.last <= 1){
					this.$message.error("还没有下一周的数据!");
				}else{
					this.last -= 1;
					
					let date = new Date();
					var nowTime = date.getTime(); 
					var day = date.getDay();
					var oneDayTime = 24*60*60*1000;
					 //显示周一
					 let moday = nowTime - (day-1)*oneDayTime;
					 let a = this.getTime(this.last);
					 let b = moday + a;
					 let s = new Date(b);	
					 const year = s.getFullYear();
					 const month = s.getMonth() + 1;
					 const dayr = s.getDate();
					 this.begTime = year + "-" + month + "-" + dayr;
					 //显示周日
					 let b1 = b + 6*24*60*60*1000;
					 let s1 = new Date(b1);	
					 const year1 = s1.getFullYear();
					 const month1 = s1.getMonth() + 1;
					 const dayr1 = s1.getDate();
					 this.endTime = year1 + "-" + month1 + "-" + dayr1;
					 this.getList(this.page.page,this.page.pageSize,this.inputBh,this.inputMc,this.begTime,this.endTime,this.obj.id,this.formUser);
				}
			},

			//计算本周 周一和周日的时间
			monday(){
				this.last = 1;
				this.next = 1;
				let date = new Date();
				var nowTime = date.getTime(); 
				var day = date.getDay();
				var oneDayTime = 24*60*60*1000;
				 //显示周一
				 let moday = nowTime - (day-1)*oneDayTime;
				let a = new Date(moday);	
				const year = a.getFullYear();
				const month = a.getMonth() + 1;
				const dayr = a.getDate();
				this.begTime = year + "-" + month + "-" + dayr;
				 //显示周日
				 let sun = nowTime + (7-day)*oneDayTime;
				 let b = new Date(sun);
				 const year1 = b.getFullYear();
				 const month1= b.getMonth() + 1;
				 const dayr1 = b.getDate();
				this.endTime =  year1 + "-" + month1 + "-" + dayr1;
				this.getList(this.page.page,this.page.pageSize,this.inputBh,this.inputMc,this.begTime,this.endTime,this.obj.id,this.formUser);
			},
			checkbox_callback(row,index){//初始化加载数据时，如果数据中包含status属性，并且status为'1'则该行不能被选中
			return true
			},
			handleSelectionChange(row) {//rows为选中行的数据的集合
                //勾选后，需要往后台传递什么数据，从rows中获取即可
				console.log(row)
				if(row.length != 0){
					this.formTj.id = row[0].id;
					this.idLength = row.length;
				}
            },
			rowspan() {
				this.spanArr = [];
				this.position = 0;
			          this.data.forEach((item,index) => {
			            if( index === 0){
			                this.spanArr.push(1);
			                this.position = 0;
			            }else{
			                if(this.data[index].type === this.data[index-1].type ){
			                    this.spanArr[this.position] += 1;
			                    this.spanArr.push(0);
			                }else{
			                    this.spanArr.push(1);
			                    this.position = index;
			                }
			            }
			        })
					
			},
			objectSpanMethod({ row, column, rowIndex, columnIndex }) {  //表格合并行
			        if (columnIndex === 0) {
			            const _row = this.spanArr[rowIndex];
			            const _col = _row>0 ? 1 : 0;
			            return {
			                rowspan: _row,
			                colspan: _col
			            }
			        }
			        if(columnIndex === 1){
			            const _row = this.spanArr[rowIndex];
			            const _col = _row>0 ? 1 : 0;
			            return {
			                rowspan: _row,
			                colspan: _col
			            }
			        }
					// if(columnIndex === 2){
					//     const _row = this.spanArr[rowIndex];
					//     const _col = _row>0 ? 1 : 0;
					//     return {
					//         rowspan: _row,
					//         colspan: _col
					//     }
					// }
					// if(columnIndex === 3){
					//     const _row = this.spanArr[rowIndex];
					//     const _col = _row>0 ? 1 : 0;
					//     return {
					//         rowspan: _row,
					//         colspan: _col
					//     }
					// }
					// if(columnIndex === 4){
					//     const _row = this.spanArr[rowIndex];
					//     const _col = _row>0 ? 1 : 0;
					//     return {
					//         rowspan: _row,
					//         colspan: _col
					//     }
					// }
					// if(columnIndex === 5){
					//     const _row = this.spanArr[rowIndex];
					//     const _col = _row>0 ? 1 : 0;
					//     return {
					//         rowspan: _row,
					//         colspan: _col
					//     }
					// }
			},
			//获取列表
			getList(page,pageSize,unit,name,begTime,endTime,userId,userids){
				var self = this;
			    this.data = [];
			    let obj = {
			        pageNum:page,
			        pageSize:pageSize,
			        pname:unit,
			        custname:name,
			        begTime:begTime,
			        endTime:endTime,
			        userId:userId,
			        userids:userids
			    }
			    let dataArr = request({
			        url:domainUrl + '/queryProjectPlan',
			        data:obj,
			        method:'POST'
			    })
			    dataArr.then(res => {
					let list = res.data.list; //主表
					let sublist = res.data.sublist;
					this.data = [];
					for(var i = 0;i<sublist.length;i++){
						
						for(var j =0;j<list.length;j++){
							if(sublist[i].projectId == list[j].id){
								let obj = {
									id:list[j].id,
									type:list[j].id,
									code:list[j].code,
									mondayTime:list[j].mondayTime + "至" + list[j].sundayTime,
									userid:list[j].userid,
									username:list[j].uname,
									month:list[j].month + "-" +list[j].week,
									week:sublist[j].begTime +"</br>"+ sublist[j].week,
									pname:sublist[i].pname,
									custname:sublist[i].custname,
									custId:sublist[i].custId,
									mode:sublist[i].mode,
									content:sublist[i].content,
									execute:sublist[i].execute,
									finish:sublist[i].finish,
									percentage:sublist[i].percentage,
									pierce:sublist[i].pierce,
									comment:sublist[i].comment,
									participant:sublist[i].participantName
								}
								this.data.push(obj);
							}
						}
						
					}
					console.log(this.data,11111111111111)
					self.rowspan();	
		
				
					this.page.total = res.data.total;
					this.page.pageSize = res.data.pageSize;
					
				
			    })
			},
            //行单元格的样式
            cellStyle({row,column,rowIndex}){
                if(row.status == 1){
                    return {
                        backgroundColor:'yellow',
                        color:'#333'
                    }
                }else if(row.status == 2){
                    return {
                        backgroundColor:'red',
                        color:'#333'
                    }
                }
            },
			//指定分配人搜索
            toSs(){
                if(this.name){
                    let arr = this.fSearch(this.name,this.typeArr);
                    this.dicType = arr;
                }else {
                    this.dicType = this.typeArr;
                }
            },
            //角色查询
            userQd(){
                this.getList(this.page.currentPage,this.page.pageSize,this.inputBh,this.inputMc,this.begTime,this.endTime,this.obj.id,this.formUser)
                this.isUser = false;
            },
            userAdd(){
                this.isUser = true;
                this.formUser = [];
            },
            toUser(){
                this.isUser = false;
            },
            //前端模糊查询
            fSearch(name,list){
                if(name){
                    return list.filter((value)=>{  //过滤数组元素
                        return value.label.includes(name); //如果包含字符返回true
                    });
                }
            },
			//双击选中
            openDetails(row){
                let obj = {
                    zdr:row.value,
                    id:this.formTj.id
                }
                let dataArr = request({
                    url:domainUrl + '/updateZdr',
                    data:obj,
                    method:'POST'
                })
                dataArr.then(res => {
                    if(res.data.success){
                        this.$message.success("分配成功!");
                        this.getList(this.page.currentPage,this.page.pageSize,this.inputBh,this.inputMc,this.begTime,this.endTime,this.obj.id,this.formUser)
                        this.isZhiding = false;
                        this.formTj.id = 0;
                    }
                })
            },
            zhiding(){
                if(this.formTj.id != 0 || this.formTj.id != ""){
                    this.isZhiding = true;
                }else {
                    this.$message.error("请选择需要指定的数据!");
                }

            },
            toZd(){
                this.isZhiding = false;
            },
            //单击行
            handleRowClick(row, event, column){
                this.formTj.id = row.id;
                this.form.userId = this.obj.id;
            },
			//选择
            selectionChange(list){
                if(list.length != 0){
                    if(list.length>1){
                        // this.$message.error("请选择需一条的数据!");
                    }else {
                        this.formTj.id = list[0].id;
                        this.form.userId = this.obj.id;
                    }
                }
            },
            deleteData(row){
				let dataArr1 = request({
				    url:domainUrl+ '/delProjectPlan?id=' + row.id,
				    method:'GET',
				    header: { 'content-Type': 'application/json' },
				})
				dataArr1.then(res => {
				    if(res.data.success){
				        this.$message.success(res.data.msg);
				        this.getList(this.page.currentPage,this.page.pageSize,this.inputBh,this.inputMc,this.begTime,this.endTime,this.obj.id,this.formUser)
				    }else {
				        this.$message.error(res.data.msg);
				    }
				})
            },
            //点击提交完成
            //下拉框数据
            getXlk(){
                let dataArr = request({
                    url:domainUrl+ '/findUsers',
                    method:'GET',
                    header: { 'content-Type': 'application/json' },
                })
                dataArr.then(res => {
                    this.dicType = res.data;
                    this.typeArr = res.data;
                })
            },
            onLoad(page){
                this.getList(page.currentPage,page.pageSize,this.inputBh,this.inputMc,this.begTime,this.endTime,this.obj.id,this.formUser)
            },
            //新增
            subSucc(name){
                if(name == 1){
                    this.formTj.id = 0;
                    this.$router.push({ path: '/weeklyPlanningSystem//addProjectPlan',query: { userId: name,id:this.formTj.id }});
                }else {
					console.log(this.idLength,11111111)
					if(this.idLength > 1){
						this.$message.error("请选择一条修改的数据!");
					}else{
						if(this.formTj.id != 0 || this.formTj.id != ""){
							this.$router.push({ path: '/weeklyPlanningSystem//addProjectPlan',query: { userId: name,id:this.formTj.id }});
						}else {
							this.$message.error("请选择需要修改的数据!");
						}	
					}
                }
                //  1表示新增工单，2表示提交工单，3表示查看工单

            },
            //查询
            submitcx(){
                this.getList(this.page.currentPage,this.page.pageSize,this.inputBh,this.inputMc,this.begTime,this.endTime,this.obj.id,this.formUser)
            },
            error(){
                this.inputBh = "";
                this.inputMc = "";
                this.begTime = "";
                this.endTime = "";
            },
            handleExcel(){
                if(this.data.length == 0){
                    this.$message.success('请选择需要导出的数据');
                }else {
                    let opt = {
                        title: '客户问题记录',
                        column: this.option.column,
                        data: this.data
                    }
                    this.$export.excel({
                        title: opt.title || new Date().getTime(),
                        columns: opt.column,
                        data: opt.data
                    });
                }
            },


        }
    }
</script>

<style scoped>
	.avue-crud >>> .el-form{
			height: 380px;
			overflow: auto;
		}
	.topBtn{
		width: 70px;
		height: 35px;
		text-align: center;
		line-height: 30px;
		border: 1px solid #0073EB;
		background: #fff;
		float: left;
		border-radius: 3px;
		margin-right: 10px;
	}
	.topTr >>> .is-leaf{
		height: 40px;
		text-align: center;
	}
	.el-select {
	  margin-right: 15px;
	}
	.el-input {
	  margin-right: 15px;
	  width: 200px;
	}
	.tableArea {
	  margin-top: 20px;
	  border: 1px solid #ddd;
	  border-radius: 3px;

	}
	i[class^="el-icon"] {
	  margin-right: 5px;
	  font-size: 16px;
	  cursor: pointer;
	}
	.modify_table{
	    td{
	        padding: 10px ;
	    }
	}
	.item_title{
	    text-align: right;
	}
	
	.tdInput{
		width: 15px;
		height: 15px;
		border: 1px solid #ddd;
		border-radius: 3px;
		cursor: pointer;
	}
	.tdInputT{
		width: 15px;
		height: 15px;
		border: 1px solid #ddd;
		border-radius: 3px;
		cursor: pointer;
	}
	.topTr td{
		color: #999;
	}
	.conTable{
		width: 100%;
		height: 100%;
		overflow: auto;
		border: 1px solid #ddd;
	}
/* 	.conTable tr{
		border-bottom: 1px solid #ddd;
	} */
	.conTable tr td{
		border: 1px solid #ddd;
		height: 35px;
		text-align: center;
		line-height: 35px;
		color: #666;
	}
    /*.avue-crud >>> .el-form{*/
        /*height: 450px;*/
        /*overflow: auto;*/
    /*}*/
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
    /*.inputTop{*/
        /*text-align: left;*/
        /*margin-left: 10px;*/
        /*height: 32px;*/
        /*line-height: 32px;*/
        /*border-bottom: 1px solid #ddd;*/
    /*}*/
    /*.inputTop input{*/
        /*width: 15px;*/
        /*height: 15px;*/
        /*margin-right: 10px*/
    /*}*/
    /*.fuzhi-mid ul{*/
        /*padding: 0;*/
        /*margin: 0;*/
    /*}*/
    /*.fuzhi-mid ul li{*/
        /*list-style: none;*/
        /*height: 32px;*/
        /*line-height: 32px;*/
        /*border-bottom: 1px solid #ddd;*/
        /*padding-left: 25px;*/
    /*}*/
    /*.fuzhi-mid ul li input{*/
        /*width: 15px;*/
        /*height: 15px;*/
        /*margin-right: 10px;*/
    /*}*/


    .el-col{
        height: 32px;
    }
    .avue-crud >>> .avue-crud__tip{
        margin: 0 0 8px 0;
    }


    .avue-crud >>> .avue-crud__menu{
        /* display: none; */
		    width: 50px;
		    float: right;
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
    .el-row{
        font-size: 14px;
        margin-top: 10px;
    }

    .avue-date{
        width: 150px;
    }
    .avue-date >>> .el-date-editor--date{
        width: 150px;
        height: 32px;
    }
    .avue-date >>> .el-date-editor--date .el-input__inner{
        height: 32px;
    }
    .avue-date >>>.el-input__icon{
        line-height: 35px;
    }
    .icondown{
        float: right;
        margin-right: 20px;
        cursor: pointer;
    }
    .iconup2{
        float: right;
        margin-right: 20px;
        cursor: pointer;
    }
    .chakan-img{
        width: 230px;
        height: 80px;
        /*border: 1px solid #ddd;*/
        float: left;
        overflow-y: hidden;
        overflow-x: auto;
    }
    .chakan-wImg{
        width: 1000px;
        height: 80px;
    }
    .chakan-img img{
        width: 80px;
        height: 80px;
        margin-right: 10px;
        float: left;
    }
    .mid-list .list-left{
        color: #999;
    }
    .listSucc{
        width: 99%;
        height: 180px;
        margin-top: 10px;
    }

    .imgSx{
        width: 98%;
        height: 80px;
        margin-left: 15px;
        overflow: auto;
    }
    .imgSx .img-list{
        width: 80px;
        height: 80px;
        float: left;
        margin: 0 14px 5px 0;
        border: 1px solid #ddd;

    }
    .imgSx .img-list img{
        width: 100%;
        height: 100%;
    }
    .scImg{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0,0,0,0.3);
        text-align: center;
        line-height: 200px;
    }
    .scImg button{
        text-align: center;
        padding: 5px 40px;
        background: #fff;
        border-radius: 5px;
        color: #1f94f4;
        border: none;
    }
    .list-input{
        width: 100%;
        height: 36px;
        line-height: 36px;
        margin: 0 0 5px 10px;
    }
    .list-left{
        width: 100px;
        float: left;
    }
    .btn-zhiding{
        width: 200px;
        float: left;
        position: relative;
    }
    .btn-zhiding button{
        padding: 6px 30px;
        background: #409EFF;
        border: 1px solid #ddd;
        border-radius: 3px;
        color: #fff;
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
    .avue-input{
        width: 160px;
        float: left;
        height: 32px;
    }
    .avue-input >>> .el-input__inner{
        width: 160px;
        float: left;
        height: 32px;
    }
    .avue-date{
        float: left;
        height: 32px;
    }
    .mid-list .avue-input >>> .el-input__inner{
        width: 230px;
    }
    .mid-list .avue-input >>> .el-textarea__inner{
        width: 230px;
    }
    .list-input .avue-input{
        width: 370px;
    }
    .list-input .avue-input >>> .el-input__inner{
        width: 370px;
    }
    .list-input .avue-input-tree{
        width: 370px;
    }
    .list-input .avue-input-tree >>> .el-input__inner{
        width: 370px;
    }
    .list-textarea{
        width: 363px;
        height: 100px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .chakan{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.3);
        z-index: 9;
    }
    .chakan-con{
        width: 700px;
        height: 620px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .chakan-mid{
        width: 100%;
        height: 570px;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0 10px;
    }
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
    .popP{
        margin: -10px 0 10px 10px;
    }
    .preview1{
        width: 94.5%;
        margin-left: 3%;
    }
    .preview1 img{
        width: 100%;
        height: 100%;
    }
    .preview{
        width: 94.5%;
        height: 200px;
        border: 1px solid #ddd;
        border-radius: 5px;
        float: left;
        margin-left: 3%;
        position: relative;
    }
    .preview img{
        width: 100%;
        height: 100%;
    }
    .btn{
        width: 150px;
        height: 40px;
        line-height: 40px;
        background: #1f94f4;
        color: #fff;
        text-align: center;
        border: none;
        margin: 0 40%;
        padding: 0;
        border-radius: 5px;
    }

    @media screen and (max-width: 1400px) {
        .el-input{
            width: 110px;
        }
        .avue-input >>> .el-input__inner{
            width: 110px;
        }
    }
    @media screen and (max-width: 1275px) {
        .avue-date{
            width: 110px;
        }
        .avue-date >>> .el-date-editor--date{
            width: 110px;
        }
    }
</style>
<style>
    /*.avue-crud__menu{*/
        /*display: none;*/
    /*}*/
    .cell{
        font-weight: 400;
    }
    .el-table td, .el-table th{
        padding: 0;
    }
    .el-card__body{
        padding-top: 0;
    }
    /*.el-form{*/
        /*height: 370px;*/
        /*overflow: auto;*/
    /*}*/
</style>