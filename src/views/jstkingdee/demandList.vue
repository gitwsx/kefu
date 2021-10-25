<template>
    <basic-container>
        <el-row :span="24">
            <el-col :span="5">
                <div class="sqTop">需求名称:</div>
                <avue-input class="input" v-model="inputBh" placeholder="请输入需求名称" ></avue-input>
            </el-col>
            <el-col :span="5">
                <div class="sqTop">所属项目:</div>
                <avue-input v-model="inputMc" placeholder="请输入所属项目" ></avue-input>
            </el-col>
            <el-col :span="10">
                <div class="sqTop">查询日期:</div>
                <avue-date :span="4" v-model="begTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择日期"></avue-date>
                <span style="float: left;line-height: 40px;margin: 0 10px">至</span>
                <avue-date :span="4" v-model="endTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择日期"></avue-date>
            </el-col>
            <el-col :span="4">
                <div class="btn-right" style="margin-top: 3px;float: right;">
                    <button style="margin-right: 5px;padding: 6px 15px" @click="submitcx">查询</button>
                    <button @click="error" style="padding: 6px 15px">清空</button>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="btn-right">
                    <button @click="subSucc(1)">新增</button>
                    <button style="margin-right: 10px" @click="subSucc(4)">完成</button>
				</div>
            </el-col>
        </el-row>
        <div>
            <avue-crud ref="crud" :option="option" :page.sync="page" :data="data" @on-load="onLoad" @row-update="upDemand" @row-del="delDemand" @row-click="handleRowClick" @selection-change="selectionChange" :cell-style="cellStyle">
			  <template slot-scope="scope" slot="namesForm">
				<div>
				  <span>{{objDemand.names}}</span>
				  <avue-input :disabled="scope.disabled" :label="scope.column.label" v-model="objDemand.names"></avue-input>
				</div>
			  </template>
			</avue-crud>
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
				objDemand:{},
                formUser:[],
                inputBh:"",
                inputMc:"",
                begTime:"",
                endTime:"",
                data:[],
                page: {
                    total: 0,
                    pageSize:20,
                    //pageSizes:[10,15,20]
                },
                option: {
                    highlightCurrentRow:true,
                    addBtn:false, //显示新增按钮
                    delBtn:true, //行内删除
                    editBtn:true, //行内编辑
					editTitle:"修改",
                    viewBtn:true, //行内查看
                    columnBtn:false, //显示隐藏按钮
                    refreshBtn:false, //显示刷新按钮
                    index:true,
                    indexLabel:'序号',
                    border:true,
                    stripe: false,  //斑马纹
                    labelWidth:170, //弹出表单的label宽度
                    menu:true,  //是否显示操作菜单栏
                    selection: true, //多选
                    column: [
                        {
                            label: "是否完成",
                            prop: "finish",
                            row: true,
                            width:80,
                            span:16,
							display:false,
                        },
                        {
                            sortable:true,
                            label: "编号",
                            prop: "code",
                            row: true,
                            width:110,
                            overHidden: true,
                            span:16,
							display:false,
                        },
                        {
                            sortable:true,
                            label: "需求名称",
                            prop: "name",
                            row: true,
                            width:200,
                            overHidden: true,
                            span:16,
							display:false,
                        },
                        {
                            sortable:true,
                            label: "所属项目",
                            prop: "pname",
                            row: true,
                            overHidden: true,
                            width:110,
                            span:16,
							display:false,
                        },
                        {
                            sortable:true,
                            label: "提交时间",
                            prop: "timeStr",
                            row: true,
                            overHidden: true,
                            width:130,
                            span:16,
							display:false,
                        },
                        {
                            sortable:true,
                            label: "指定人",
                            prop: "uname",
                            row: true,
                            overHidden: true,
                            width:110,
                            span:16,
							display:false,
                        },
                        {
                            sortable:true,
                            label: "需求来源",
                            prop: "src",
                            row: true,
                            width:200,
                            overHidden: true,
                            span:16,
							display:false,
                        },
                        {
                            sortable:true,
                            label: "计划",
                            prop: "plan",
                            row: true,
                            width:110,
                            minRows: 8,
                            overHidden: true,
                            span:16,
							display:false,
                        },
                        {
                            sortable:true,
                            label: "优先级",
                            prop: "level",
                            row: true,
                            overHidden: true,
                            width:110,
                            span:16,
							display:false,
                        },
                        {
                            sortable:true,
                            label: "工时",
                            prop: "hour",
                            row: true,
                            width:100,
                            minRows: 8,
                            span:16,
							display:false,
                        },
                        {
                            sortable:true,
                            label: "需求描述",
                            prop: "describ",
                            row: true,
                            width:300,
                            overHidden: true,
                            minRows: 8,
                            span:16,
							display:false,
                        },
 
                    ],
					group:[
						{
						  label: '需求信息',
						  prop: 'jbxx',
						  icon: 'el-icon-edit-outline',
						  column: [
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
								span: 12,
								type: "select",
								dicData:[{label:"一级",value:"一级"},{label:"二级",value:"二级"},{label:"三级",value:"三级"},],
							},
							{
								label: "工时",
								prop: "hour",
								span: 12,
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
					]
                },
				obj:{},
               
                name:""
            }
        },
        created(){
            this.obj = JSON.parse(this.$cookie.get("token"));
        },
        mounted(){
            //this.$refs.crud.$refs.dialogColumn.columnBox=true;
        },
        methods:{
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

            //单击行
            handleRowClick(row, event, column){
                this.formTj.id = row.id;
                this.form.userId = this.obj.id;
            },
			//选择
            selectionChange(list){
                if(list.length != 0){
                    if(list.length>1){
                    }else {
                        this.formTj.id = list[0].id;
                        this.form.userId = this.obj.id;
                    }
                }
            },
            toDelete(){
                if(this.formTj.id != 0 || this.formTj.id != ""){
                    let dataArr = request({
                        url:domainUrl + '/del?id=' + this.formTj.id,
                        method:'GET'
                    })
                    dataArr.then(res => {
                        if(res.data.success){
                            this.$message.success("删除成功!");
                            this.getList(this.page.currentPage,this.page.pageSize,this.inputBh,this.inputMc,this.begTime,this.endTime,this.obj.id,this.formUser)
                        }
                    })
                    //this.$router.push({ path: '/addWork',query: { userId: 2,id:self.formTj.id }});
                }else {
                    this.$message.error("请选择需要删除的数据!");
                }
            },
            getList(page,pageSize,unit,name,begTime,endTime,userId,userids){
                this.data = [];
                let obj = {
                    pageNum:page,
                    pageSize:pageSize,
                    pname:unit,
                    name:name,
                    begTime:begTime,
                    endTime:endTime,
                    userId:userId,
                    userids:userids
                }
                let dataArr = request({
                    url:domainUrl + '/queryDemand',
                    data:obj,
                    method:'POST'
                })
                dataArr.then(res => {
                    this.page.total = res.data.total;
                    this.page.pageSize = res.data.pageSize;
                    this.data = res.data.list;
                })
            },
            onLoad(page){
                this.getList(page.currentPage,page.pageSize,this.inputBh,this.inputMc,this.begTime,this.endTime,this.obj.id,this.formUser)
            },
            //新增
            subSucc(name){
				console.log(111111)
                // if(name == 1){
                //     this.formTj.id = 0;
                //     this.$router.push({ path: '/demandSystem//demand',query: { userId: name,id:this.formTj.id }});
                // }else {
                //     if(this.formTj.id != 0 || this.formTj.id != ""){
                //         this.$router.push({ path: '/demandSystem//demand',query: { userId: name,id:this.formTj.id }});
                //     }else {
                //         this.$message.error("请选择需要提交完成的数据!");
                //     }
                // }
                //  1表示新增工单，2表示提交工单，3表示查看工单

            },
			//修改保存
			upDemand(row){
				let addData = request({
				    url:domainUrl + '/uptDemand',
				    data:row,
				    method:'POST'
				})
				addData.then(res => {
				    if(res.data.success){
				        this.$message.success(res.data.msg);	
				    }else{
						this.$message.error(res.data.message);
					}
				})
			},
			//删除
			delDemand(row){
				let dataArr1 = request({
				    url:domainUrl+ '/delDemand?id=' + row.id,
				    method:'GET',
				    header: { 'content-Type': 'application/json' },
				})
				dataArr1.then(res => {
				    if(res.data.success){
				        this.$message.success(res.data.msg);
				        this.getList(this.page.currentPage,this.page.pageSize)
				    }else {
						this.submitcx();
				    }
				})
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
            //点击查看
            subChakan(){
                let obj = {
                    id:this.formTj.id
                }
                if(this.formTj.id != 0 || this.formTj.id != ""){
                    this.chakan = true;
                    this.$router.push({ path: '/addWork',query: { userId: 3,id:this.formTj.id }});
                }else {
                    this.$message.error("请选择需要提交完成的数据!");
                }

            },

        }
    }
</script>

<style scoped>
	.avue-crud >>> .el-table__body-wrapper{
		height: 380px;
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