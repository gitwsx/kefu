<template>
    <basic-container>
        <h3>电商平台</h3>
        <el-row :span="24">
            <el-col :span="6">
                <div class="sqTop">店铺编号:</div>
                <avue-input v-model="inputBh" placeholder="请输入店铺编号" ></avue-input>
            </el-col>
            <el-col :span="6">
                <div class="sqTop">店铺名称:</div>
                <avue-input v-model="inputMc" placeholder="请输入店铺名称" ></avue-input>
            </el-col>
            <el-col :span="10">
                <div class="btn-right">
                    <button @click="handleExcel">导出excel</button>
                    <button style="margin-right: 10px" @click="submit">查询</button>
                    <button @click="error">清空</button>
                </div>
            </el-col>
        </el-row>

        <avue-crud
                :option="option"
                :page.sync="page"
                :data="data"
                @row-save="rowSave"
                @row-update="rowUpdate"
                @row-del="rowDel"
                @on-load="onLoad"></avue-crud>
    </basic-container>
</template>


<script>
    import request from '@/router/axios';
    import { domainUrl } from '@/config/env';
    export default {
        data() {
            return {
                page: {
                    total: 0,
                    pageSize:20
                },
                inputBh:"",
                inputMc:"",
                data: [],
                arrData:[],
                option: {
                    addBtn:true, //显示新增按钮
                    delBtn:true, //行内删除
                    editBtn:true, //行内编辑
                    viewBtn:true, //行内查看
                    columnBtn:false, //显示隐藏按钮
                    refreshBtn:false, //显示刷新按钮
                    index:true,
                    indexLabel:'序号',
                    border:true,
                    stripe: true,  //斑马纹
                    labelWidth:170, //弹出表单的label宽度

                    column: [
                        {
                            label: "店铺编号",
                            prop: "fDsptDpNumber",
                            row: true,
                            width:150,
                            span:16,
                            rules: [{
                                required: true,
                                message: "请输入店铺编号",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "店铺名称",
                            prop: "fDsptDpName",
                            row: true,
                            width:150,
                            minRows: 8,
                            span:16,
                            overHidden: true,
                            rules: [{
                                required: true,
                                message: "请输入店铺名称",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "对应金蝶系统客户编号",
                            prop: "fCustNumber",
                            row: true,
                            width:180,
                            span:16,
                            rules: [{
                                required: true,
                                message: "请输入对应金蝶系统客户编号",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "对应金蝶系统客户名称",
                            prop: "fCustName",
                            row: true,
                            width:180,
                            minRows: 8,
                            span:16,
                            overHidden: true,
                            rules: [{
                                required: true,
                                message: "请输入对应金蝶系统客户名称",
                                trigger: "blur"
                            }]
                        },
                        // {
                        //     label: "对应销售组织编码",
                        //     prop: "fSaleOrgNumber",
                        //     row: true,
                        //     width:150,
                        //     span:16,
                        //     rules: [{
                        //         required: true,
                        //         message: "请输入对应销售组织编码",
                        //         trigger: "blur"
                        //     }]
                        // },
                        // {
                        //     label: "对应销售组织名称",
                        //     prop: "fSaleOrgName",
                        //     row: true,
                        //     width:150,
                        //     minRows: 8,
                        //     span:16,
                        //     overHidden: true,
                        //     rules: [{
                        //         required: true,
                        //         message: "请输入对应销售组织名称",
                        //         trigger: "blur"
                        //     }]
                        // }
                    ]
                },
                btnnum:0, // 总共多少页
                // 开始椰树
                startnum:0,
                // 结束椰树
                endnum:1,
                fixedHeader:false,
                fixedCol:false,
                fixedA1:false,
                hLeft:0,
                hHeight:0
            };
        },
        created(){
            //this.getList();
        },
        methods: {
            getList(page,pageSize,bianMa,name){  //获取数据
                this.data = [];
                let obj = {
                    pageNum:page,
                    pageSize:pageSize,
                    number:bianMa,
                    name:name
                }
                let dataArr = request({
                    url:domainUrl + '/findShopMapping',
                    data:obj,
                    method:'POST'
                })
                dataArr.then(res => {
                    this.page.total = res.data.total;
                    this.page.pageSize = res.data.pageSize;
                    this.data = res.data.list;
                })
            },
            //查询
            submit(){
                this.getList(this.page.currentPage,this.page.pageSize,this.inputBh,this.inputMc)
            },
            //查询
            fuzzyQuery(list, keyWord) {
                var arr = [];
                for (var i = 0; i < list.length; i++) {
                    if (list[i].fDsptDpName.indexOf(keyWord) >= 0) {
                        arr.push(list[i]);
                    }
                }
                return arr;
            },
            //新增
            rowSave(form,done){
                if(form.fStatus == '使用'){
                    form.fStatus = 0;
                }else if(form.fStatus == '未使用'){
                    form.fStatus = 2;
                }
                let add = request({
                    url:domainUrl + '/insertShopMapping',
                    method:'post',
                    data:form
                })
                add.then(res => {
                    this.$message.success('新增数据成功!');
                    this.getList();
                })
                done();
            },
            //修改
            rowUpdate(form,index,done){
                if(form.fStatus == '使用'){
                    form.fStatus = 0;
                }else if(form.fStatus == '未使用'){
                    form.fStatus = 2;
                }
                let modify = request({
                    url:domainUrl + '/updateShopMapping',
                    method:'post',
                    data:form
                })
                modify.then(res => {
                    //this.data = res.data;
                    this.$message.success('修改数据成功!');
                    this.getList();
                })
                done();
            },
            //删除
            rowDel(form,index){
                let del = request({
                    url:domainUrl + '/deleteShopMapping?data=' + form.fid,
                    method:'get'
                })
                del.then(res => {
                    //this.data = res.data;
                    this.$message.success('删除数据成功!');
                    this.getList();
                })
            },
            //清空
            error(err){
                this.inputBh = "";
                this.inputMc = "";
            },
            onLoad(page){
                this.getList(page.currentPage,page.pageSize,this.inputBh,this.inputMc)
            },
            handleExcel(){
                if(this.data.length == 0){
                    this.$message.success('请选择需要导出的数据');
                }else {
                    let opt = {
                        title: '电商平台',
                        column: this.option.column,
                        data: this.data
                    }
                    this.$export.excel({
                        title: opt.title || new Date().getTime(),
                        columns: opt.column,
                        data: opt.data
                    });
                }
            }
        },

    };
</script>

<style>

    .el-card__body{
        padding: 0 10px;
    }
    .el-card__body h3{
        line-height: 0;
    }
    .el-input__inner{
        height: 30px;
    }
    .avue-form__row{
        height: 40px;
    }
    .el-form-item{
        margin-bottom: 0;
    }
    .is-leaf .cell{
        text-align: center;
    }
    .avue-crud .el-table th{
        padding: 0;
    }
    .el-col{
        margin-bottom: 10px;
    }
    .avue-form__menu--right{
        /*margin-top: -43px;*/
        width: 300px;
        float: right;
    }
    .el-form-item__label{
        text-align: left;
    }
    .avue-crud__dialog .avue-form__menu{
        padding-top: 0;
        margin-bottom: 30px;
    }
    #avue-view{
        overflow: hidden;
    }
</style>
<style scoped>
    .sqTop{
        float: left;
        width: 80px;
        line-height: 35px;
    }
    .avue-input{
        width: 160px;
        float: left;
        height: 35px;
    }
    .avue-input >>> .el-input__inner{
        width: 160px;
        float: left;
        height: 35px;
    }
    .zhi{
        width: 20px;
        float: left;
        line-height: 35px;
    }
    .btn-right{
        float: right;
    }
    .btn-right button{
        padding: 6px 30px;
        background: #409EFF;
        border: 1px solid #ddd;
        border-radius: 3px;
        color: #fff;
    }
    .btn-right button:first-child{
        margin-right: 10px;
    }
</style>

