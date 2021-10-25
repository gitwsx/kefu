<template>
	<el-row :span="24">
	    <el-col>
	        <div class="list-input">
	            <div class="list-left">提交时间:</div>
	            <avue-input class="list-right" readonly="readonly" v-model="form.time" placeholder="系统自动生成"></avue-input>
	        </div>
	    </el-col>
	    <el-col>
	        <div class="list-input">
	            <div class="list-left">指定处理人:</div>
	            <avue-input-tree class="list-right" v-model="form.zdr" :dic="dicName" placeholder="请选择指定处理人"></avue-input-tree>
	        </div>
	    </el-col>
	    <el-col>
	        <div class="list-input">
	            <div class="list-left">标题:</div>
	            <avue-input class="list-right" readonly="readonly" v-model="form.title" type="tree" placeholder="请输入标题"></avue-input>
	        </div>
	    </el-col>
	    <el-col>
	        <div class="list-input">
	            <div class="list-left">要求完成时间:</div>
	            <avue-input class="list-right" disabled v-model="form.finishtime" placeholder="系统自动生成"></avue-input>
	        </div>
	    </el-col>
	    <el-col>
	        <div class="list-input">
	            <div class="list-left">客户单位:</div>
	            <avue-input class="list-right" readonly="readonly" v-model="form.clientUnit" placeholder="请输入客户单位"></avue-input>
	        </div>
	    </el-col>
	    <el-col>
	        <div class="list-input">
	            <div class="list-left">客户姓名:</div>
	            <avue-input class="list-right" readonly="readonly" v-model="form.clientName" placeholder="请输入客户姓名"></avue-input>
	        </div>
	    </el-col>
	    <el-col>
	        <div class="list-input">
	            <div class="list-left">客户电话:</div>
	            <avue-input class="list-right" readonly="readonly" v-model="form.clientPhone" placeholder="请输入客户电话"></avue-input>
	        </div>
	    </el-col>
	    <el-col>
	        <div class="list-input">
	            <div class="list-left">金蝶类型:</div>
	            <avue-input-tree class="list-right" readonly v-model="form.type" :dic="dicType" placeholder="请输入金蝶类型"></avue-input-tree>
	        </div>
	    </el-col>
	    <el-col :span="12">
	        <div class="list-input">
	            <div class="list-left" style="width: 38%"><span style="color: red">*</span>紧急情况:</div>
	            <avue-radio v-model="form.sex" :dic="dic"></avue-radio>
	        </div>
	    </el-col>
	    <el-col :span="12">
	        <div class="list-input" style="text-align: right">
	            <avue-radio v-model="form.xqlx" :dic="demand"></avue-radio>
	        </div>
	    </el-col>
	    <el-col>
	        <div class="list-input" style="height: 130px">
	            <div class="list-left">描述:</div>
	            <avue-input type="textarea" readonly="readonly" class="list-textarea" v-model="form.description" placeholder="请输入描述"></avue-input>
	        </div>
	    </el-col>
	    <el-col>
	        <p class="popP">提交的图片</p>
	        <div class="imgSx" v-if="form.picurls != 'undefined'">
	            <div class="img-list" v-for="item in form.picurls">
	                <viewer style="height: 100%;">
	                    <img :src="item" title="点击放大">
	                </viewer>
	            </div>
	        </div>
	    </el-col>
	</el-row>
</template>

<script>
	import request from '@/router/axios';
	import { domainUrl } from '@/config/env';
	import {url} from '@/config/env';
	
	export default {
	    name: "addWork",
	    data(){
	        return {
	            userId:0, //判断是哪个页面
	            obj:{}, //获取用户信息
	            text:"", //标题
	            form:{
	                time:"",
	                title:"",
	                clientUnit:"",
	                clientName:"",
	                clientPhone:"",
	                type:0,
	                description:"",
	                sex:0,
	                xqlx:0,
	                picurls:[]
	            },
	            dic:[{label:'一般', value:0},{label:'急', value:1},{label:'紧急', value:2}],
	            demand:[{label:'业务场景', value:0},{label:'技术要求', value:1}],
	            dicType:[],
	            dicName:[], //指定处理人
	            isImg:true,
	            isMouImg:false,
	            preview:"",
	            imgArr:[],  //提交图片数组
	            formTj:{
	                time:"",
	                deal:1,
	                description:"",
	                picurls:[]
	            },
	            chakanArr:[], //提交信息数组
	            pingjiaObj:{},
	
	        }
	    },
	    created(){
	        this.obj = JSON.parse(this.$cookie.get("token"));
	        if(this.obj.roleid == 3){
	            this.form.clientName = this.obj.realname;
	            this.form.clientUnit = this.obj.unit;
	            this.form.clientPhone = this.obj.tel;	
	        }
	        let date = new Date();
	        this.form.time = this.formatTime(date,0,0);
	        this.form.finishtime = this.formatTime(date,1,0);
	        this.getXlk();
	        this.userId = this.$route.query.userId;

	        let id = this.$route.query.id;
	        this.formTj.id = id;
	        if(this.userId == 2 || this.userId == 3 || this.userId == 4){
	            let dataArr = request({
	                url:domainUrl + '/view?id=' + id,
	                method:'GET'
	            })
	            dataArr.then(res => {
	                if(res.data.success){
	                    this.form = res.data.wo;
	                    this.formTj.time = this.formatTime(date,0,0);
	                    this.chakanArr = res.data.submitList; //提交数组
	                    this.pingjiaObj = res.data.comment; //客户评价
	                    if(this.chakanArr.length != 0){
	                        for (var i = 0;i<this.chakanArr.length;i++){
	                            this.chakanArr[i].isFag = true;
	                        }
	                    }
	
	                }
	            })
	        }
	    },
	    methods:{
	        //下拉框数据
	        getXlk(){
	            //金蝶类型
	            let dataArr = request({
	                url:url+ '/getType',
	                method:'GET',
	                header: { 'content-Type': 'application/json' },
	            })
	            dataArr.then(res => {
	                this.dicType = res.data;
	            })
	            //指定人
	            let dataArr1 = request({
	                url:domainUrl+ '/findUsers',
	                method:'GET',
	                header: { 'content-Type': 'application/json' },
	            })
	            dataArr1.then(res => {
	                this.dicName = res.data;
	                if(this.obj.roleid == 3){
	                    this.form.zdr = 0;
	                }else {
	                    this.form.zdr = this.obj.id;
	                }
	                //console.log(this.dicName,this.form.zdr)
	            })
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
	    width: 60%;
	    /*margin-left: 30px;*/
	    /*float: left;*/
	    margin-left: 35%;
	}
	.mid1{
	    width: 60%;
	    margin: 0 auto;
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
