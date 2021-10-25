<template>
	<basic-container>
		<div class="mid">
			<avue-form v-model="objData" :option="option" @submit="submit" @reset-change="emptytChange"></avue-form>
		</div>
	</basic-container>
</template>

<script>
	import request from '@/router/axios';
	import { domainUrl } from '@/config/env';
	import {url} from '@/config/env';
	export default{
		name: "demand",
		data(){
			return {
				obj:{},
				objData:{},
				option:{
					submitBtn:true, //提交
					emptyBtn:true, //清空
					column:[
						{
							label: "提交时间",
							prop: "timeStr",
							span: 12,
							type: "date",
							format:'yyyy-MM-dd',
							readonly:true,
							valueFormat:'yyyy-MM-dd',
						},
						{
							label: "指定人",
							prop: "uid",
							span: 12,
							type: "select",
							dicData:[],
						},
						{
							label: "所属项目",
							prop: "pid",
							span: 12,
							type: "select",
							dicData:[],
						},
						{
							label: "需求来源",
							prop: "src",
							span: 12,
						},
						{
							label: "计划",
							prop: "plan",
							span: 12,
						},
						{
							label: "优先级",
							prop: "level",
							span: 6,
							type: "select",
							dicData:[{label:"一级",value:"一级"},{label:"二级",value:"二级"},{label:"三级",value:"三级"},],
						},
						{
							label: "工时",
							prop: "hour",
							span: 6,
						},
						{
							label: "需求名称",
							prop: "name",
							span: 24,
						},
						{
							label: "需求描述",
							prop: "describ",
							span: 24,
							type:"textarea"
						},
					]
				},
				// imgArr:["11111"],
				// isImg:true,
				// preview:"",
				// isMouImg:false,
				
			}
		},
		created(){
			this.obj = JSON.parse(this.$cookie.get("token"));
			let date = new Date();
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const dayr = date.getDate();
			this.objData.timeStr = year + "-" + month + "-" + dayr;
			this.gitXm();
		},
		methods:{
			//清空
			emptytChange(){
			  this.$message.success('清空方法回调');
			},
			//提交
			submit () {
				console.log(this.obj,111111111)
				this.objData.userid = this.obj.id

				let addData = request({
                    url:domainUrl + '/addDeamnd',
                    data:this.objData,
                    method:'POST'
                })
				addData.then(res => {
                    if(res.data.success){
						
                        this.$message.success("提交成功!");
						this.qingkong();
                    }else{
						this.$message.error()(res.data.message);
					}
                })
			  //this.$message.success('当前数据'+JSON.stringify(this.obj));
			},
			gitXm(){
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
					this.option.column[2].dicData = arr;
				})
				//指定人
				let dataArr1 = request({
				    url:domainUrl+ '/findUsers',
				    method:'GET',
				    header: { 'content-Type': 'application/json' },
				})
				dataArr1.then(res => {
					this.option.column[1].dicData = res.data;
				})
			},
			//清空
			qingkong(){
				this.objData = {};
				let date = new Date();
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const dayr = date.getDate();
				this.objData.timeStr = year + "-" + month + "-" + dayr;
			},
			// 监听粘贴操作
			// handlePaste(event) {
			//     const items = (event.clipboardData || window.clipboardData).items;
			//     let file = null;
			//     if (!items || items.length === 0) {
			//         this.$message.error("当前浏览器不支持本地");
			//         return;
			//     }
			//     // 搜索剪切板items
			//     for (let i = 0; i < items.length; i++) {
			//         if (items[i].type.indexOf("image") !== -1) {
			//             file = items[i].getAsFile();
			//             break;
			//         }
			//     }
			//     if (!file) {
			//         this.$message.error("粘贴内容非图片");
			//         return;
			//     }
			//     // 此时file就是我们的剪切板中的图片对象
			//     // 如果需要预览，可以执行下面代码
			//     const reader = new FileReader();
			//     reader.onload = event => {
			//         //console.log(this.isImg,11111111111111111)
			//         this.isImg = false;
			//         this.preview = event.target.result;
			//         //this.formTj.picurl = event.target.result;
			//     };
			//     reader.readAsDataURL(file);
			//     this.file = file;
			// },
			// //鼠标移入
			// mouseover(){
			//     if(this.preview != ""){
			//         this.isMouImg = true;
			//     }
			// },
			// //鼠标移出
			// mouseLeave(){
			//     this.isMouImg = false;
			// },
			// //点击上传图片
			// toImg(){
			//     this.imgArr.push(this.preview);
			//     this.isImg = true;
			//     this.preview = "";
			// },
		},
		
	}
</script>

<style scoped="scoped">
	.imgMid{
		padding: 0 20px;
		height: 360px;
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
	.preview{
	    width: 50%;
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
	.btnBom{
		width: 30%;
		margin: 0 auto;
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
</style>
