<template>
    <basic-container>
        <!--<h3>已完成工单</h3>-->
        <el-row :span="24">
            <el-col :span="5">
                <div class="sqTop">标题:</div>
                <avue-input v-model="inputBh" placeholder="请输入标题" ></avue-input>
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
            <el-col :span="4">
                <div class="btn-right" style="margin-top: 3px;float: right;">
                    <button style="margin-right: 5px;padding: 6px 15px" @click="submitcx">查询</button>
                    <button @click="error" style="padding: 6px 15px">清空</button>
                </div>

            </el-col>
            <el-col :span="24">
                <!--<div class="btn-right" style="float: left;margin-right: 20px;">-->
                    <!--<button @click="add">新增工单</button>-->
                <!--</div>-->
                <div class="btn-right">
                    <button v-if="this.obj.roleid != 3" style="margin-right: 10px" @click="subSucc">处理工单</button>
                    <button @click="subChakan">查看工单</button>
                </div>
                <div class="userName" @click="userAdd">
                    <i class="iconfont iconbumenguanli"></i>
                </div>
            </el-col>
        </el-row>
        <avue-crud ref="crud" :option="option" :page.sync="page" :data="data" @on-load="onLoad" @row-click="handleRowClick" @selection-change="selectionChange" :cell-style="cellStyle"></avue-crud>
        <!--查询-->
        <div class="popUps" v-if="isUser">
            <div class="fuzhi" style="width: 300px;height: 500px">
                <div class="fuzhi-top">
                    <i class="iconfont iconguanbi" @click="toUser"></i>
                </div>
                <div class="fuzhi-mid" style="text-align: left;overflow-y: auto;overflow-x:hidden;width: 285px">
                    <avue-checkbox all v-model="formUser" placeholder="请选择内容" :dic="dicUser"></avue-checkbox>
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
                dicUser:[],
                isUser:false,
                formUser:[],
                inputBh:"",
                inputMc:"",
                begTime:"",
                endTime:"",
                data:[],
                page: {
                    total: 0,
                    pageSize:20
                },
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
                    stripe: true,  //斑马纹
                    labelWidth:170, //弹出表单的label宽度
                    menu:false,  //是否显示操作菜单栏
                    selection: true, //多选
                    column: [
                        {
                            label: "是否处理",
                            prop: "dealName",
                            row: true,
                            width:80,
                            span:16
                        },
                        {
                            sortable:true,
                            label: "工单编号",
                            prop: "billNo",
                            row: true,
                            width:110,
                            overHidden: true,
                            span:16
                        },
                        {
                            sortable:true,
                            label: "标题",
                            prop: "title",
                            row: true,
                            width:250,
                            overHidden: true,
                            span:16
                        },
                        {
                            sortable:true,
                            label: "指定处理人",
                            prop: "zdrmz",
                            row: true,
                            width:110,
                            overHidden: true,
                            span:16
                        },
                        {
                            sortable:true,
                            label: "新增问题时间",
                            prop: "realTime",
                            row: true,
                            overHidden: true,
                            width:150,
                            span:16
                        },
                        {
                            sortable:true,
                            label: "要求完成时间",
                            prop: "finishtime",
                            row: true,
                            width:130,
                            overHidden: true,
                            span:16
                        },
                        {
                            sortable:true,
                            label: "提交完成时间",
                            prop: "realSubmitTime",
                            row: true,
                            width:150,
                            overHidden: true,
                            span:16
                        },
                        {
                            sortable:true,
                            label: "处理次数",
                            prop: "dealCount",
                            row: true,
                            width:100,
                            overHidden: true,
                            span:16
                        },
                        {
                            sortable:true,
                            label: "新增问题人",
                            prop: "name",
                            row: true,
                            width:110,
                            overHidden: true,
                            span:16
                        },
                        {
                            sortable:true,
                            label: "提交完成人",
                            prop: "submitter",
                            row: true,
                            width:110,
                            overHidden: true,
                            span:16
                        },
                        {
                            sortable:true,
                            label: "客户单位",
                            prop: "clientUnit",
                            row: true,
                            width:200,
                            overHidden: true,
                            span:16
                        },
                        {
                            sortable:true,
                            label: "客户姓名",
                            prop: "clientName",
                            row: true,
                            width:150,
                            overHidden: true,
                            minRows: 8,
                            span:16,
                        },
                        {
                            sortable:true,
                            label: "联系方式",
                            prop: "clientPhone",
                            row: true,
                            width:150,
                            span:16
                        },
                        {
                            sortable:true,
                            label: "客户评价",
                            prop: "degree",
                            row: true,
                            overHidden: true,
                            width:180,
                            span:16
                        },
                        {
                            sortable:true,
                            label: "评价说明",
                            prop: "content",
                            row: true,
                            overHidden: true,
                            width:180,
                            span:16
                        },
                        {
                            sortable:true,
                            label: "紧急情况",
                            prop: "sexName",
                            row: true,
                            width:180,
                            minRows: 8,
                            span:16,
                        },
                        {
                            sortable:true,
                            label: "类型",
                            prop: "typename",
                            row: true,
                            width:150,
                            span:16,
                        },
                        {
                            sortable:true,
                            label: "描述",
                            prop: "description",
                            row: true,
                            overHidden: true,
                            width:300,
                            minRows: 8,
                            span:16,
                        },
                        {
                            label: "图片",
                            prop: "picurls",
                            dataType: 'string',
                            type: 'img',
                            row: true,
                            width:150,
                            span:16,
                        }
                    ]
                },
                form:{
                    time:"",
                    title:"",
                    clientUnit:"",
                    clientName:"",
                    clientPhone:"",
                    type:0,
                    description:"",
                    sex:0
                },
                obj:{},
                formTj:{
                    id:0,
                    time:"",
                    deal:1,
                    description:"",
                    picurl:""
                },
                list:[]
            }
        },
        created(){
            this.obj = JSON.parse(this.$cookie.get("token"));
            this.getXlk();
        },
        mounted(){
            //this.$refs.crud.$refs.dialogColumn.columnBox=true;
        },
        methods:{
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
            selectionChange(list){
                this.list = list;
                if(this.list.length>1){
                    this.$message.error("请选择需一条的数据!");
                }else {
                    this.formTj.id = list[0].id;
                    this.form.userId = this.obj.id;
                }
            },
            //点击提交完成
            subSucc(){
                var self = this;
                if(this.list.length>1){
                    this.$message.error("请选择需一条的数据!");
                }else {
                    if(self.formTj.id != 0 || self.formTj.id != ""){
                        this.$router.push({ path: '/workOrdeSystem//addWork',query: { userId: 2,id:self.formTj.id }});
                    }else {
                        this.$message.error("请选择需要提交完成的数据!");
                    }
                }

            },
            //下拉框数据
            getXlk(){
                let dataArr = request({
                    url:url+ '/getType',
                    method:'GET',
                    header: { 'content-Type': 'application/json' },
                })
                dataArr.then(res => {
                    this.dicType = res.data;
                })
                let dataArr1 = request({
                    url:domainUrl+ '/findUsers',
                    method:'GET',
                    header: { 'content-Type': 'application/json' },
                })
                dataArr1.then(res => {
                    this.dicUser = res.data;
                })
            },
            getList(page,pageSize,unit,name,begTime,endTime,userId,userids){
                this.data = [];
                let obj = {
                    pageNum:page,
                    pageSize:pageSize,
                    title:unit,
                    name:name,
                    begTime:begTime,
                    endTime:endTime,
                    userId:userId,
                    userids:userids
                }
                let dataArr = request({
                    url:domainUrl + '/findDeal',
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
            add(){
                //  1表示新增工单，2表示提交工单，3表示查看工单
                this.$router.push({ path: '/addWork',query: { userId: 1 }});
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
                if(this.list.length>1){
                    this.$message.error("请选择需一条的数据!");
                }else {
                    if(this.formTj.id != 0 || this.formTj.id != ""){
                        this.$router.push({ path: '/workOrdeSystem//addWork',query: { userId: 3,id:this.formTj.id }});
                    }else {
                        this.$message.error("请选择需要提交完成的数据!");
                    }
                }
            },
        }
    }
</script>

<style scoped>
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
    .fuzhi-top{
        text-align: right;
        margin: 10px;
        cursor: pointer;
    }
    .fuzhi-mid{
        width: 380px;
        height: 410px;
        margin: 10px 0 0 10px;
    }

    .el-col{
        height: 32px;
    }
    .avue-crud >>> .avue-crud__tip{
        margin: 0 0 8px 0;
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
    .btn-right{
        width: 220px;
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
    .el-row{
        font-size: 14px;
        margin-top: 10px;
    }
    .avue-crud >>> .avue-crud__menu{
        display: none;
    }
</style>
<style>
    .cell{
        font-weight: 400;
    }
    /*.avue-crud__menu{*/
        /*display: none;*/
    /*}*/
    .el-table td, .el-table th{
        padding: 0;
    }
    /*.el-form{*/
        /*height: 370px;*/
        /*overflow: auto;*/
    /*}*/
</style>