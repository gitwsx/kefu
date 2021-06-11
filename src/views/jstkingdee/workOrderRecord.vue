<template>
    <basic-container>
        <h3>服务单</h3>
        <el-row :span="24">
            <el-col :span="6">
                <div class="sqTop">标题:</div>
                <avue-input v-model="inputBt" placeholder="请输入标题" ></avue-input>
            </el-col>
            <el-col :span="14">
                <div class="sqTop">查询日期:</div>
                <avue-date  v-model="begTime" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" placeholder="请选择日期"></avue-date>
                <span style="float: left;line-height: 40px;margin: 0 10px">至</span>
                <avue-date  v-model="endTime" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" placeholder="请选择日期"></avue-date>
            </el-col>
            <el-col :span="4">
                <div class="btn-right">
                    <button style="margin-right: 10px" @click="submitCx">查询</button>
                    <button @click="error">清空</button>
                </div>
            </el-col>
        </el-row>
        <el-row :span="24">
            <avue-crud :option="option" :page.sync="page" :data="data" @on-load="onLoad"></avue-crud>
        </el-row>
    </basic-container>
</template>

<script>

    import request from '@/router/axios';
    import { domainUrl } from '@/config/env';

    export default {
        name: "workOrder",
        data(){
            return {
                preview:"",
                isImg:true,
                inputBt:"",
                begTime:"",
                endTime:"",
                page: {
                    total: 0,
                    pageSize:20
                },
                isFag:false,
                data:[],
                option:{
                    addBtn:false, //显示新增按钮
                    delBtn:false, //行内删除
                    editBtn:false, //行内编辑
                    viewBtn:false, //行内查看
                    columnBtn:false, //显示隐藏按钮
                    refreshBtn:false, //显示刷新按钮
                    menu:false,
                    index:true,
                    indexLabel:'序号',
                    border:true,
                    stripe: true,  //斑马纹
                    column:[
                        {
                            label: "提交时间",
                            prop: "realTime",
                            row: true,
                            width:150,
                            span:16,
                        },
                        {
                            label: "提交人姓名",
                            prop: "name",
                            row: true,
                            width:150,
                            span:16,
                        },
                        {
                            label: "标题",
                            prop: "title",
                            row: true,
                            width:150,
                            span:16,
                        },
                        {
                            label: "客户单位名称",
                            prop: "clientUnit",
                            row: true,
                            width:150,
                            span:16,
                        },
                        {
                            label: "客户姓名",
                            prop: "clientName",
                            row: true,
                            width:150,
                            span:16,
                        },
                        {
                            label: "客户电话",
                            prop: "clientPhone",
                            row: true,
                            width:150,
                            span:16,
                        },
                        {
                            label: "紧急情况",
                            prop: "urgent",
                            row: true,
                            width:150,
                            span:16,
                        },
                        {
                            label: "描述",
                            prop: "description",
                            row: true,
                            width:150,
                            span:16,
                        },
                        {
                            label: "图片",
                            prop: "picurl",
                            listType: 'picture-img',
                            type: 'upload',
                            row: true,
                            width:150,
                            span:16,
                        }
                    ]
                },
                obj:{},

            }
        },
        created(){
            this.obj = JSON.parse(this.$cookie.get("token"));
            console.log(this.obj,33333333333333333333333)
            // var self = this;
            // setTimeout(function () {
            //     let date = new Date();
            //     console.log(self.form)
            //     self.form.time = self.formatTime(date);
            // },0)

        },
        methods:{
            onLoad(page){
                this.getList(page.currentPage,page.pageSize,this.inputBt,this.begTime,this.endTime,this.obj.id)
            },
            //获取数据
            getList(page,pageSize,title,begTime,endTime,userId){
                this.data = [];
                let obj = {
                    pageNum:page,
                    pageSize:pageSize,
                    title:title,
                    begTime:begTime,
                    endTime:endTime,
                    userId:userId
                }
                let dataArr = request({
                    url:domainUrl + '/find',
                    data:obj,
                    method:'POST'
                })
                dataArr.then(res => {
                    this.page.total = res.data.total;
                    this.page.pageSize = res.data.pageSize;
                    this.data = res.data.list;
                })
            },
            //时间格式方法
            formatTime (date) {
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate()
                const hour = date.getHours()
                const minute = date.getMinutes()
                const second = date.getSeconds()
                return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
            },
            //查询
            submitCx(){
                this.getList(this.page.currentPage,this.page.pageSize,this.inputBt,this.begTime,this.endTime,this.obj.id)
            },
            //清空
            error(){
                this.inputBt = "";
                this.begTime = "";
                this.endTime = "";
            },
        }
    }
</script>

<style>
    .el-form-item__label{
        text-align: left;
    }

</style>
<style scoped>
    .btn-right button{
        padding: 6px 25px;
        background: #409EFF;
        border: 1px solid #ddd;
        border-radius: 3px;
        color: #fff;
    }
    .btn-right button:first-child{
        /*margin-right: 10px;*/
    }
    .sqTop{
        float: left;
        width: 80px;
        line-height: 35px;
    }
    .avue-input{
        width: 180px;
        float: left;
        height: 35px;
    }
    .avue-input >>> .el-input__inner{
        width: 180px;
        float: left;
        height: 35px;
    }
    .avue-date{
        float: left;
    }


    .topBtn{
        padding: 8px 30px;
        background: #1f94f4;
        color: #fff;
        text-align: center;
        border: none;
        border-radius: 5px;
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
    .popUps-con{
        width: 40%;
        height: 600px;
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


    .preview{
        width: 94.5%;
        height: 200px;
        border: 1px solid #ddd;
        border-radius: 5px;
        float: left;
        margin-left: 3%;
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
        margin: 20px 40%;
    }
</style>