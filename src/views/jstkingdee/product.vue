<template>
    <basic-container>
        <h3>商品信息</h3>
        <el-row :span="24">
            <el-col :span="6">
                <div class="sqTop">商品编号:</div>
                <avue-input v-model="inputBh" placeholder="请输入店铺编号" ></avue-input>
            </el-col>
            <el-col :span="6">
                <div class="sqTop">商品名称:</div>
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
                    //menu:false,
                    columnBtn:false, //显示隐藏按钮
                    refreshBtn:false, //显示刷新按钮
                    index:true,
                    indexLabel:'序号',
                    border:true,
                    stripe: true,  //斑马纹
                    labelWidth:170, //弹出表单的label宽度
                    column: [
                        {
                            label: "商品编码",
                            prop: "fDsMaterielNumber",
                            row: true,
                            width:150,
                            span:16,
                            rules: [{
                                required: true,
                                message: "请输入商品编码",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "商品名称",
                            prop: "fDsName",
                            row: true,
                            width:230,
                            minRows: 8,
                            span:16,
                            overHidden: true,
                            rules: [{
                                required: true,
                                message: "请输入商品名称",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "颜色规格",
                            prop: "fDsModel",
                            row: true,
                            width:150,
                            span:16,
                            rules: [{
                                required: true,
                                message: "请输入颜色规格",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "基本单位",
                            prop: "fUnit",
                            row: true,
                            width:80,
                            span:16,
                            rules: [{
                                required: true,
                                message: "请输入基本单位",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "金蝶系统物料编码",
                            prop: "fMaterielNumber",
                            row: true,
                            width:150,
                            span:16,
                            rules: [{
                                required: true,
                                message: "请输入金蝶系统物料编码",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "金蝶系统物料名称",
                            prop: "fName",
                            row: true,
                            width:150,
                            minRows: 8,
                            span:16,
                            overHidden: true,
                            rules: [{
                                required: true,
                                message: "请输入金蝶系统物料名称",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "状态",
                            prop: "fIsUsing",
                            type:"select",
                            row: true,
                            width:150,
                            span:16,
                            dicData:[
                                {
                                    id:0,
                                    value:"使用"
                                },{
                                    id:2,
                                    value:"未使用"
                                }
                            ],
                            rules: [{
                                required: true,
                                message: "请输入状态",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "金蝶规格型号",
                            prop: "fModel",
                            row: true,
                            width:150,
                            span:16,
                            rules: [{
                                required: true,
                                message: "请输入金蝶规格型号",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "销售单位编码",
                            prop: "fSaleUnitId",
                            row: true,
                            width:150,
                            span:16,
                            rules: [{
                                required: true,
                                message: "请输入销售单位编码",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "库存单位编码",
                            prop: "fStoreUnitID",
                            row: true,
                            width:150,
                            span:16,
                            rules: [{
                                required: true,
                                message: "请输入库存单位编码",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "基本单位编码",
                            prop: "fBaseUnitId",
                            row: true,
                            width:150,
                            span:16,
                            rules: [{
                                required: true,
                                message: "请输入基本单位编码",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "是否启用批号管理",
                            prop: "fIsBatchManage",
                            type:"select",
                            row: true,
                            width:150,
                            span:16,
                            dicData:[
                                {
                                    id:0,
                                    value:"是"
                                },{
                                    id:2,
                                    value:"否"
                                }
                            ],
                            rules: [{
                                required: true,
                                message: "请输入是否启用批号管理",
                                trigger: "blur"
                            }]
                        }
                    ]
                },
                btnnum:0, // 总共多少页
                // 开始椰树
                startnum:0,
                // 结束椰树
                endnum:1,
            };
        },
        created(){
            this.getList();
        },
        methods: {
            getList(){  //获取数据
                this.data = [];
                let dataArr = request({
                    url:domainUrl + '/findItemMapping?data=find',
                    method:'get'
                })
                dataArr.then(res => {
                    this.arrData = res.data;
                    this.page.total = res.data.length;
                    if(this.page.total>this.page.pageSize){
                        for (var i = 0;i<20;i++){
                            this.data.push(this.arrData[i])
                        }
                    }else {
                        for (var i = 0;i<this.arrData.length;i++){
                            this.data.push(this.arrData[i])
                        }
                    }
                    for (var i = 0;i<this.arrData.length;i++){
                        if(this.arrData[i].fIsUsing){
                            this.arrData[i].fIsUsing ='使用'
                        }else {
                            this.arrData[i].fIsUsing ='未使用'
                        }
                        if(this.arrData[i].fIsBatchManage){
                            this.arrData[i].fIsBatchManage = '是'
                        }else {
                            this.arrData[i].fIsBatchManage = '否'
                        }
                    }
                    for (var i = 0;i<this.data.length;i++){
                        if(this.data[i].fIsUsing){
                            this.data[i].fIsUsing ='使用'
                        }else {
                            this.data[i].fIsUsing ='未使用'
                        }
                        if(this.data[i].fIsBatchManage){
                            this.data[i].fIsBatchManage = '是'
                        }else {
                            this.data[i].fIsBatchManage = '否'
                        }
                    }
                    this.btnnum = Math.ceil(this.page.total/this.page.pageSize);
                })

            },
            //查询
            submit(){
                this.data = [];
                if(this.inputBh !="" && this.inputMc == ""){
                    for (var i=0;i<this.arrData.length;i++){
                        if(this.inputBh == this.arrData[i].fDsMaterielNumber){
                            this.data.push(this.arrData[i])
                        }
                    }
                }else if(this.inputBh !="" && this.inputMc != ""){
                    for (var i=0;i<this.arrData.length;i++){
                        if(this.inputBh == this.arrData[i].fDsMaterielNumber && this.inputMcr == this.arrData[i].fDsName){
                            this.data.push(this.arrData[i])
                        }
                    }
                }else if(this.inputBh =="" && this.inputMc != ""){
                    for (var i=0;i<this.arrData.length;i++){
                        if(this.inputMc == this.arrData[i].fDsName){
                            this.data.push(this.arrData[i])
                        }
                    }
                }else{
                    this.data =  this.arrData;
                }

                this.page.total = this.data.length;
            },
            //新增
            rowSave(form,done){
                if(form.fIsUsing == "使用"){
                    form.fIsUsing = 0
                }else {
                    form.fIsUsing = 2
                }
                if(form.fIsBatchManage == "是"){
                    form.fIsBatchManage = true;
                }else {
                    form.fIsBatchManage = false;
                }
                let add = request({
                    url:domainUrl + '/insertItemMapping',
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
                if(form.fIsUsing == "使用"){
                    form.fIsUsing = 0
                }else {
                    form.fIsUsing = 2
                }
                if(form.fIsBatchManage == "是"){
                    form.fIsBatchManage = true;
                }else {
                    form.fIsBatchManage = false;
                }
                let modify = request({
                    url:domainUrl + '/updateItemMapping',
                    method:'post',
                    data:form
                })
                modify.then(res => {
                    this.$message.success('修改数据成功!');
                    this.getList();
                })
                done();
            },
            //删除
            rowDel(form,index){
                let del = request({
                        url:domainUrl + '/deleteItemMapping?data=' + form.fid,
                        method:'get'
                    })
                del.then(res => {
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
                this.data = [];
                let maxPage = Math.ceil(page.total/page.pageSize);
                if(this.arrData.length != 0){
                    if(page.currentPage>this.endnum){
                        this.endnum = page.currentPage;
                        this.startnum = page.currentPage -1;
                        if(this.endnum == maxPage){
                            for (var i = this.startnum*page.pageSize;i<this.arrData.length;i++){
                                this.data.push(this.arrData[i])
                            }
                        }else {
                            for (var i = this.startnum*page.pageSize;i<this.endnum*page.pageSize;i++){
                                this.data.push(this.arrData[i])
                            }
                        }
                    }else {
                        this.endnum = page.currentPage;
                        this.startnum = page.currentPage -1;
                        for (var i = this.startnum*page.pageSize;i<this.endnum*page.pageSize;i++){
                            this.data.push(this.arrData[i])
                        }
                    }
                }
            },
            handleExcel(){
                if(this.arrData.length == 0){
                    this.$message.success('请选择需要导出的数据');
                }else if(this.page.total > 5000){
                    this.$message.success('您所导出的数据太大，请选择数据小于5000导出!');
                }else {
                    let opt = {
                        title: '商品信息',
                        column: this.option.column,
                        data: this.arrData
                    }
                    this.$export.excel({
                        title: opt.title || new Date().getTime(),
                        columns: opt.column,
                        data: opt.arrData
                    });
                }
            }
        }
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
        margin-bottom: 0;
    }
    .avue-form__menu--right{
        margin-top: -43px;
        width: 300px;
        float: right;
    }
    .avue-crud__dialog .avue-form__menu{
        padding-top: 0;
        margin-bottom: 30px;
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
