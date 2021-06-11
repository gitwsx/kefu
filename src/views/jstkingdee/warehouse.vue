<template>
    <basic-container>
        <h3>客户账号管理</h3>
        <el-row>
            <el-col :span="10">
                <div class="sqTop">客户单位:</div>
                <avue-input class="input" v-model="inputBh" placeholder="请输入客户单位" ></avue-input>
            </el-col>
            <el-col :span="10">
                <div class="sqTop">客户姓名:</div>
                <avue-input v-model="inputMc" placeholder="请输入客户姓名" ></avue-input>
            </el-col>
            <el-col :span="4">
                <div class="btn-right" style="margin-top: 3px;float: right;">
                    <button style="margin-right: 5px;padding: 6px 15px" @click="submitcx">查询</button>
                    <button @click="error" style="padding: 6px 15px">清空</button>
                </div>
            </el-col>
            <avue-crud :option="option" :page.sync="page" :data="data" @on-load="onLoad" @row-save="handleRowSave" @row-update="handleRowUpdate" @row-del="deleteTd">
                <template slot-scope="{type,size,row}" slot="menu">
                    <el-button icon="el-icon-edit" :size="size" :type="type" @click="handle(row)">初始化密码</el-button>
                </template>
            </avue-crud>
        </el-row>
    </basic-container>
</template>

<script>
    import request from '@/router/axios';
    import { domainUrl } from '@/config/env';
    export default {
        name: "account",
        data(){
            return {
                inputBh:"",
                inputMc:"",
                data:[],
                page: {
                    total: 0,
                    pageSize:20
                },
                option:{
                    menuWidth:220,
                    addBtn:true, //显示新增按钮
                    delBtn:true, //行内删除
                    delBtnText:'禁用',
                    editBtnText:"修改",
                    editBtn:true, //行内编辑
                    viewBtn:false, //行内查看
                    columnBtn:false, //显示隐藏按钮
                    refreshBtn:false, //显示刷新按钮
                    //menu:false,
                    index:true,
                    indexLabel:'序号',
                    border:true,
                    stripe: true,  //斑马纹
                    column:[
                        {
                            sortable:true,
                            label: "账号名称",
                            prop: "userid",
                            row: true,
                            width:100,
                            span:16,
                            //editDisabled:true,
                            rules: [{
                                required: true,
                                message: "请输入账号名称",
                                trigger: "blur"
                            }]
                        },
                        {
                            sortable:true,
                            label: "姓名",
                            prop: "userName",
                            row: true,
                            //editDisabled:true,
                            span:16,
                            rules: [{
                                required: true,
                                message: "请输入姓名",
                                trigger: "blur"
                            }]
                        },
                        {
                            sortable:true,
                            label: "单位名称",
                            prop: "unit",
                            row: true,
                            //editDisabled:true,
                            span:16,
                            width:250,
                            rules: [{
                                required: true,
                                message: "请输入单位名称",
                                trigger: "blur"
                            }]
                        },
                        {
                            sortable:true,
                            label: "联系方式",
                            prop: "tel",
                            row: true,
                            //editDisabled:true,
                            span:16,
                            width:150,
                            rules: [{
                                required: true,
                                message: "请输入联系方式",
                                trigger: "blur"
                            }]
                        },
                        {
                            sortable:true,
                            label: "状态",
                            prop: "delName",
                            row: true,
                            editDisabled:true,
                            span:16,
                            width:70,
                            type:'select',
                            dicData:[{label:'正常',value:0},{label:'禁用',value:1}]
                        },
                    ]
                },

            }
        },
        created(){

        },
        methods:{
            getList(page,pageSize,unit,name){
                let obj = {
                    pageNum:page,
                    pageSize:pageSize,
                    unit:unit,
                    userName:name
                }
                let dataArr = request({
                    url:domainUrl + '/findAllCust',
                    data:obj,
                    method:'POST'
                })
                dataArr.then(res => {
                    this.page.total = res.data.total;
                    this.page.pageSize = res.data.pageSize;
                    this.data = res.data.list;
                    for (var i = 0;i<this.data.length;i++){
                        if(this.data[i].del == 1){
                            this.data[i].delName = "禁用";
                        }else {
                            this.data[i].delName = "正常";
                        }
                    }
                })
            },
            onLoad(page){
                this.getList(page.currentPage,page.pageSize,this.inputBh,this.inputMc)
            },
            //新增
            handleRowSave(row,done,loading){
                let obj = {
                    userid:row.userid,
                    userName:row.userName,
                    unit:row.unit,
                    tel:row.tel,
                    roleid:3  //客户
                }
                let dataArr = request({
                    url:domainUrl + '/addUser',
                    data:obj,
                    method:'POST'
                })
                dataArr.then(res => {
                    if(res.data.success){
                        done();
                        this.$message.success("提交成功!");
                        this.getList(this.page.currentPage,this.page.pageSize,this.inputBh,this.inputMc)
                    }
                })
            },
            //编辑
            handleRowUpdate(row,index,done,loading){
                let obj = {
                    fid:row.fid,
                    userName:row.userName,
                    unit:row.unit,
                    tel:row.tel,
                    userid:row.userid
                }
                let dataArr = request({
                    url:domainUrl + '/updateUser',
                    data:obj,
                    method:'POST'
                })
                dataArr.then(res => {
                    if(res.data.success){
                        this.$message.success("修改成功!");
                        done();
                        this.getList(this.page.currentPage,this.page.pageSize,this.inputBh,this.inputMc)
                    }
                })
            },
            //初始化密码
            handle(row){
                let dataArr1 = request({
                    url:domainUrl+ '/resetPassword?id=' + row.fid,
                    method:'GET',
                    header: { 'content-Type': 'application/json' },
                })
                dataArr1.then(res => {
                    if(res.data.success){
                        this.$message.success(res.data.msg);
                        this.getList(this.page.currentPage,this.page.pageSize,this.inputBh,this.inputMc)
                    }else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            //删除
            deleteTd(row,done){
                let dataArr1 = request({
                    url:domainUrl+ '/delUser?id=' + row.fid,
                    method:'GET',
                    header: { 'content-Type': 'application/json' },
                })
                dataArr1.then(res => {
                    if(res.data.success){
                        this.$message.success(res.data.msg);
                        this.getList(this.page.currentPage,this.page.pageSize,this.inputBh,this.inputMc)
                    }else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            submitcx(){
                this.getList(this.page.currentPage,this.page.pageSize,this.inputBh,this.inputMc);
            },
            error(){
                this.inputBh = ""
                this.inputMc = ""
            },

        }
    }
</script>

<style scoped>
    .el-row{
        font-size: 14px;
    }
    .sqTop{
        float: left;
        width: 70px;
        line-height: 32px;
    }
    .avue-input{
        width: 220px;
        float: left;
        height: 32px;
    }
    .avue-input >>> .el-input__inner{
        width: 220px;
        float: left;
        height: 32px;
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
</style>
<style>
    .avue-crud__menu, .avue-form__menu--center{
        display: block;
    }
    .cell{
        font-weight: 400;
    }
    .el-table td, .el-table th{
        padding: 0;
    }
    .el-card__body{
        padding-top: 0;
    }
</style>