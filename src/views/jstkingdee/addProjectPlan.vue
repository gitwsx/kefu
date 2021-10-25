<template>
    <basic-container>

        <div class="mid">
            <!--新增-->
            <div v-if="userId == 1 || userId == undefined || userId == 4">
                <div class="tijiao">
                    <el-row :span="24">
						<el-col :span="6" style="float: left;">
							<div class="sqTop">计划名称:</div>
							<avue-input v-model="jhmc" placeholder="请输入计划名称"></avue-input>
						</el-col>
<!-- 						<el-col :span="6" style="float: left;">
							<div class="sqTop">项目名称:</div>
							<avue-select v-model="xmmc" placeholder="请选择内容" type="tree" :dic="dicXmmc"></avue-select>
						</el-col>
						<el-col :span="6" style="float: left;">
							<div class="sqTop">客户名称:</div>
							<avue-select v-model="xmmc" placeholder="请选择内容" type="tree" :dic="dicXmmc"></avue-select>
						</el-col> -->
						<el-col :span="6">
							<div class="sqTop">提交人:</div>
							<avue-input style="width: 120px;" class="list-right" readonly="readonly" v-model="obj.realname" :dic="dicName" placeholder="请选择指定处理人"></avue-input>
						</el-col>
						<el-col :span="12" style="float: left;">
							<div class="sqTop">日期:</div>
							<avue-date v-model="MondayTime" style="width: 140px;float: left;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择日期"></avue-date>
							<span style="float: left;line-height: 40px;margin: 0 10px">至</span>
							<avue-date v-model="SundayTime" :span="8" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择日期"></avue-date>
						</el-col>
						<el-col>
							<avue-form :option="option" v-model="formObj" @submit="submit"></avue-form>
						</el-col>
                    </el-row>
					
                </div>
            </div>
            
			</div>
        </div>

        </div>
    </basic-container>
</template>

<script>
    import request from '@/router/axios';
    import { domainUrl } from '@/config/env';
    import {url} from '@/config/env';
	
	import First from './child/client.vue'
	
    export default {
        name: "addWork",
		components: { First },
        data(){
            return {
				MondayTime:"",//周一时间
				SundayTime:"",//周日时间
				addArr:[],//星期数组

				jhmc:"", //计划名称
				
				dicXmmc:[],//项目名称
				page: {
				    total: 0,
				    pageSize:10,
					page:1,
				    //pageSizes:[10,15,20]
				},
                userId:0, //判断是哪个页面
                obj:{}, //获取用户信息
 
                dicName:[], //指定处理人
				formObj: {
				  dynamic: []
				},
				option:{
					labelWidth:1,
					column:[
						{
							label: '',
							prop: 'dynamic',
							type: 'dynamic',
							span:24,
							children:{
								align: 'center',
								headerAlign: 'center',
								rowAdd:(done)=>{
									let obj = {
										week:"", //星期
										pid:"",  //项目
										custId:"",  //客户单位
										mode:"",  //工作方式
										content:"",  //工作计划
										execute:"",  //工作总结
										finish:"", // 完成情况
										percentage:"",  //完成百分比
										participants:[],  //参与人
										pierce:"",  //计划穿透
										comment:"",  //计划点评
									}
									
									this.formObj.dynamic.push(obj);
								},
								rowDel:(row,done)=>{
								  //this.$message.success('删除回调'+JSON.stringify(row));
								  done();
								},
								column:[
									{
									  width: 105,
									  label: '星期',
									  prop: "week",
									  type: 'select',
									  sortable:true,
									  placeholder:" ",
									  dicData: [{value:"星期一",label:"星期一"},{value:"星期二",label:"星期二"},{value:"星期三",label:"星期三"},{value:"星期四",label:"星期四"},{value:"星期五",label:"星期五"},{value:"星期六",label:"星期六"},{value:"星期日",label:"星期日"}]
									}, 
									{
									  width: 150,
									  label: '标题',
									  prop: "title",
									  // type:"textarea",
									  sortable:true,
									  placeholder:" ",
									  formslot: true,
									},
									{
									  width: 100,
									  label: '工作方式',
									  prop: "mode",
									  type: 'select',
									  sortable:true,
									  placeholder:" ",
									  dicData: [{value:"现场",label:"现场"},{value:"文档",label:"文档"},{value:"远程",label:"远程"}]
									}, 
									{
									  width: 200,
									  label: '工作计划',
									  prop: "content",
									  // type:"textarea",
									  sortable:true,
									  placeholder:" ",
									  formslot: true,
									},
									{
									  width: 200,
									  label: '参与人',
									  prop: "participants",
									  type:"tree",
									  sortable:true,
									  placeholder:" ",
									  dicData: [],
									  formslot: true,
									  multiple:true
									},
									{
									  width: 200,
									  label: '计划穿透',
									  prop: "pierce",
									  // type:"textarea",
									  sortable:true,
									  placeholder:" ",
									  formslot: true,
									},
									{
									  width: 200,
									  label: '工作总结',
									  prop: "execute",
									  // type:"textarea",
									  sortable:true,
									  placeholder:" ",
									  formslot: true,
									},
									{
									  width: 110,
									  label: '完成情况',
									  prop: "finish",
									  type: 'select',
									  sortable:true,
									  placeholder:" ",
									  dicData: [{value:"完成",label:"完成"},{value:"未完成",label:"未完成"}]
									}, 
									{
									  width: 80,
									  label: '完成%',
									  prop: "percentage",
									  sortable:true,
									  placeholder:" ",
									  formslot: true,
									},
									{
									  width: 200,
									  label: '计划点评',
									  prop: "comment",
									  // type:"textarea",
									  sortable:true,
									  placeholder:" ",
									  formslot: true,
									},
									{
									  width: 200,
									  label: '项目名称',
									  prop: "pid",
									  type: 'select',
									  sortable:true,
									  placeholder:" ",
									  dicData: [],
									}, 
									{
									  width: 200,
									  label: '客户单位',
									  prop: "custId",
									  type:"table",
									  sortable:true,
									  placeholder:" ",
									  children: {
									  	border: true,
									  	column: [{
									  		label: '单位名称',
									  		width: 200,
									  		search:true,
									  		prop: 'unitName'
									  	}, {
									  		label: '姓名',
									  		search:true,
									  		prop: 'custName'
									  	}],
									  },
									  onLoad: ({ page, value,data }, callback) => {
									  	var self = this;
									  	//首次加载去查询对应的值
									  	if(data){
									  		this.unitName = data.unitName;
									  		this.custName = data.custName;
									  		this.tel = data.tel;
									  	}
									  	if(page){
									  		this.unitList(page.currentPage,page.pageSize,this.unitName,this.custName,this.tel);
									  		setTimeout(function(){
									  			//分页查询信息
									  			callback({
									  				total:self.page.total,
									  				data: self.kehuArr
									  			})		
									  		},100)
									  	}
									  },
									  props: {
									  	label: 'unitName',
									  	value: 'id'
									  },
									}, 
								]
							}
						}
					]
				},
				

                isKg:true,
				
				kehuArr:[], //获取客户单位的数组
				unitName:'',
				custName:'',
				tel:'',
				
            }
        },
        created(){
            this.obj = JSON.parse(this.$cookie.get("token"));
            this.userId = this.$route.query.userId;
		
            if(this.userId == undefined){
                this.userId = 1;
            }
			this.unitList(); //获取客户单位数组
			this.monday(); //计算本周 周一和周日的时间
			//this.xiugai();
			this.gitXm();
        },
        methods:{
			//下载项目列表
			gitXm(){
				//项目名称
				let dataArr = request({
				    url:domainUrl + '/queryAllPro',
				    method:'GET'
				})
				dataArr.then(res => {
					let arr = [];
					for(var i = 0;i<res.data.list.length;i++){
						let obj = {
							label:res.data.list[i].proName,
							value:res.data.list[i].id,
							custId:res.data.list[i].custId,
							custUnit:res.data.list[i].custUnit
						}
						arr.push(obj)
					}
					this.option.column[0].children.column[9].dicData = arr;
				})
				//参与人
				let dataArr1 = request({
				    url:domainUrl+ '/findUsers',
				    method:'GET',
				    header: { 'content-Type': 'application/json' },
				})
				dataArr1.then(res => {
					this.option.column[0].children.column[3].dicData = res.data;
				})
				
			},
			//获取数据
			xiugai(){
				let id = this.$route.query.id; 
				console.log(id,2222222222)
				if(id != 0){
					let dataArr = request({
					    url:domainUrl + '/viewProjectPlan?id=' + id,
					    method:'GET'
					})
					dataArr.then(res => {
						this.MondayTime = res.data.mondayTime; //周一时间
						this.SundayTime = res.data.sundayTime; //周日时间
						this.jhmc = res.data.name;
						
						this.formObj.dynamic = res.data.list;
						
					})
				}
			},
			//计算本周 周一和周日的时间
			monday(){
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
				this.MondayTime = year + "-" + month + "-" + dayr;
				 //显示周日
				 let sun = nowTime + (7-day)*oneDayTime;
				 let b = new Date(sun);
				 const year1 = b.getFullYear();
				 const month1= b.getMonth() + 1;
				 const dayr1 = b.getDate();
				this.SundayTime =  year1 + "-" + month1 + "-" + dayr1;
				this.formObj.dynamic = [];

				// for(var i = 0;i<5;i++){
				// 	let obj = {
				// 		week:"", //星期
				// 		pid:"",  //项目
				// 		custId:"",  //客户单位
				// 		mode:"",  //工作方式
				// 		content:"",  //工作计划
				// 		execute:"",  //工作总结
				// 		finish:"", // 完成情况
				// 		percentage:"",  //完成百分比
				// 		participants:[],  //参与人
				// 		pierce:"",  //计划穿透
				// 		comment:"",  //计划点评
				// 	}
				// 	this.formObj.dynamic.push(obj);	
				// }	
			},

			//下来客户单位名称列表
			unitList(page,pageSize,unitName,custName,tel){
				//客户信息
				//this.kehuArr = [];
				let obj = {
					pageNum:page,
					pageSize:pageSize,
					unitName:unitName,
					custName:custName,
					tel:tel		
				}
				let kehu = request({
					url:domainUrl+ '/custList',
					data:obj,
					method:'POST'
				})
				kehu.then(res => {
					this.kehuArr = res.data.list;
					this.page.total = res.data.total;
					this.xiugai();
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
				let day1 =year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()); 
				
				let beg1 = date1.getTime() - (currentWeek-2)*24*60*60*1000; //星期二
				let day2 =year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (new Date(beg1).getDate() < 10 ? ('0' + new Date(beg1).getDate()) : new Date(beg1).getDate());
				let beg2 = date1.getTime() - (currentWeek-3)*24*60*60*1000; //星期三
				let day3 =year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (new Date(beg2).getDate() < 10 ? ('0' + new Date(beg2).getDate()) : new Date(beg2).getDate());
				let beg3 = date1.getTime() - (currentWeek-4)*24*60*60*1000; //星期四
				let day4 =year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (new Date(beg3).getDate() < 10 ? ('0' + new Date(beg3).getDate()) : new Date(beg3).getDate());
				let beg4 = date1.getTime() - (currentWeek-5)*24*60*60*1000; //星期五
				let day5 =year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (new Date(beg4).getDate() < 10 ? ('0' + new Date(beg4).getDate()) : new Date(beg4).getDate());
				let beg5 = date1.getTime() - (currentWeek-6)*24*60*60*1000; //星期六
				let day6 =year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (new Date(beg5).getDate() < 10 ? ('0' + new Date(beg5).getDate()) : new Date(beg5).getDate());
				let end = date1.getTime() + (7-currentWeek)*24*60*60*1000;
				let date2 = new Date(end);
				let day7 =year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date2.getDate() < 10 ? ('0' + date2.getDate()) : date2.getDate()); 
										
				let dayArr = [day1,day2,day3,day4,day5,day6,day7];
				let xinqi = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
				let objArr = [];
				for(var i = 0;i<dayArr.length;i++){
					let obj = {
						dayArr:dayArr[i],
						xinqi:xinqi[i]
					}
					objArr.push(obj)
				}
				return objArr;
			},		
				
            //新增和修改提交
            submit(form,done){
				done();	
				for(var i = 0;i<form.dynamic.length;i++){
					if(form.dynamic[i].pid == "" || form.dynamic[i].pid == 0){
						this.$message.success("请选择项目名称!");
						this.isKg = false;
						break;
					}
				}
				let objArr = this.getCommon(this.MondayTime);
				
				for(var i = 0;i<form.dynamic.length;i++){
					for(var j = 0;j<objArr.length;j++){
						if(form.dynamic[i].week == objArr[j].xinqi){
							form.dynamic[i].begTime = objArr[j].dayArr;
						}
					}
				}
                if(this.isKg){
                    this.isKg = false;
                    if(this.userId == 1 || this.userId == undefined){
						//console.log(2222222)
						let obj = {
							name:this.jhmc,
							mondayTime:this.MondayTime, //周一时间
							sundayTime:this.SundayTime, //周日时间
							uid:this.obj.id,//提交人id
							list:form.dynamic
						}
                        let dataArr = request({
                            url:domainUrl + '/addProjectPlan',
                            data:obj,
                            method:'POST'
                        })
                        dataArr.then(res => {
                            if(res.data.success){
								done();
                                this.isKg = true;
                                this.qingkong();
                                this.$message.success("提交成功!");
                            }else{
								this.$message.error()(res.data.message);
							}
                        })
                    }else {
                        //this.form.id = this.formTj.id;
						let obj = {
							name:this.jhmc,
							mondayTime:this.MondayTime, //周一时间
							sundayTime:this.SundayTime, //周日时间
							uid:this.obj.id,//提交人id
							list:form.dynamic,
							// mondayTime:this.MondayTime, //周一时间
							// sundayTime:this.SundayTime, //周日时间
							// userid:this.obj.id,//提交人id
							// list:this.addArr,
							id:this.$route.query.id
						}
                        let dataArr = request({
                            url:domainUrl + '/uptProjectPlan',
                            data:obj,
                            method:'POST'
                        })
                        dataArr.then(res => {
                            if(res.data.success){
                                this.isKg = true;
                                this.qingkong();
								this.monday();
                                this.$message.success("修改成功!");
                            }
                        })
                    }
                }


            },

            //清空
            qingkong(){
                //新增清空
               this.addArr = [];
			   this.monday();
			 
            },
            //时间格式方法
            formatTime (date,da,hou) {
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate() + da
                const hour = date.getHours() + hou
                const minute = date.getMinutes()
                const second = date.getSeconds()
                return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
            },
        }
    }
</script>

<style scoped>
	.tijiao >>> .avue-select{
		width: 140px;
	}
	.avue-date >>> .el-input{
		width: 140px;
	}
	.tijiao >>> .el-form-item{
		width: 100%;
	}
	.btnIcon{
		width: 100%;
		height: 35px;
		background:#1f94f4;
		color: #fff;
	}
	.conTable{
		width: 1140px;
		border: 1px solid #ddd;
	}
	.conTable tr{
		height: 42px;
		/* border-bottom: 1px solid #ddd; */
	}
	.conTable tr td{
		border: 1px solid #ddd;
		height: 35px;
		text-align: center;
		line-height: 35px;
		color: #666;
	}
	.sqTop{
	    float: left;
	    width: 70px;
	    line-height: 32px;
	}
	.topInput{
		width: 38px;
		height: 38px;
		border: 1px solid #ddd;
		border-radius: 5px;
		float: left;
		margin-right: 10px;
	}
	.avue-input{
	    width: 140px;
	    float: left;
	    height: 40px;
	}
	.avue-input >>> .el-input__inner{
	    width: 100%;
	    float: left;
	    height: 40px;
	}
	
	.addList{
		width: 1140px;
		height: 100%;
/* 		border: 1px solid #ddd; */
		overflow: auto;
	}
	.addList .list-con{
/* 		height: 125px; */
		width: 125%;
		overflow: auto;
		border-bottom: 1px solid #ddd;
		margin-bottom: 10px;
	}
	.list-li{
		width: 150px;
		float: left;
/* 		margin-right: 10px; */
	}
	.list-li >>> .el-input__inner{
		border: none;
	}

	
	.iconcategory{
		position: absolute;
		top: 3px;
		right: 15px;
	}

    .conLeft{
        width: 20%;
        position: absolute;
        top: 130px;
        left: 50px;
    }
    .table ul{
        padding: 0;
        margin: 0;
    }
    .table ul li{
        width: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        list-style: none;
        font-size: 16px;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        padding-left: 10px;
    }
    .h3{
        color: #666;
    }
    .list-input{
        line-height: 35px;
		position: relative;
    }
    .list-input .list-left{
        width: 19%;
        float: left;
        color: #999;
    }
    .list-input .list-right{
        width: 81%;
    }
    .list-input .list-textarea{
        width: 80.5%;
        height: 110px;
        overflow: auto;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .list-input .list-textarea >>> .el-textarea__inner{
        border: none;
    }

    .popP{
        color: #999;
    }
    .preview{
        width: 100%;
        height: 200px;
        border: 1px solid #ddd;
        border-radius: 5px;
        float: left;
        position: relative;
    }
    .preview img{
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
    .imgSx .img-list{
        width: 100%;
        height: 380px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .imgSx .img-list img{
        width: 100%;
        height: 100%;
    }
    .imgSx1{
        width: 100%;
        height: 120px;
        overflow: auto;
    }
    .imgSx1 .img-list1{
        width: 100px;
        height: 100px;
        float: left;
        margin-right: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .imgSx1 .img-list1 img{
        width: 100%;
        height: 100%;
    }

    .btn{
        width: 130px;
        height: 40px;
        line-height: 40px;
        background: #fff;
        color: #1f94f4;
        text-align: center;
        border: none;
        margin-top: 30px;
        padding: 0;
        border-radius: 5px;
        border: 1px solid #1f94f4;
    }

    /*提交工单*/
    .mid{
        width: 100%;
        /*margin-left: 30px;*/
        /*float: left;*/
        margin: 0 auto;
    }
    .mid1{
        width: 100%;
    
    }
    .topText{
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
        padding-bottom: 10px;
        font-weight: bold;
    }

    .icondown{
        float: right;
        cursor: pointer;
    }
    .iconup2{
        float: right;
        cursor: pointer;
    }
    .listSucc{
        width: 100%;
        height: 180px;
        margin-top: 10px;
    }
    .popUps{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.2);
        z-index: 9;
    }
    .fuzhi{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 100px;
        background: #fff;
        text-align: center;
        border-radius: 5px;
    }
    .fuBtn{
        padding: 8px 30px;
        background: #409EFF;
        color: #fff;
    }

</style>