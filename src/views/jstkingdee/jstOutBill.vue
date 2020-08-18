<template>
    <basic-container>
        <h3>退货汇总核对表</h3>
        <el-row :span="24">
            <el-col :span="12">
                <div class="sqTop">选择日期:</div>
                <avue-date class="sqInput" v-model="begin" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择开始日期"></avue-date>
                <div class="zhi">至</div>
                <avue-date v-model="end" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择结束日期"></avue-date>
            </el-col>
            <el-col :span="12">
                <div class="btn-right">
                    <button @click="handleExcel">导出excel</button>
                    <button style="margin-right: 10px" @click="submit">查询</button>
                    <button @click="error">清空</button>
                </div>

            </el-col>
        </el-row>
        <avue-crud :option="option" :page="page" :data="data" :table-loading="loading" @on-load="onLoad"></avue-crud>
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
                loading:true,
                data: [],
                arrData:[],
                option: {
                    addBtn:false, //显示新增按钮
                    delBtn:false, //行内删除
                    editBtn:false, //行内编辑
                    menu:false,
                    //menuWidth:1, //操作宽度
                    columnBtn:false, //显示隐藏按钮
                    refreshBtn:false, //显示刷新按钮
                    index:true,
                    indexLabel:'序号',
                    border:true,
                    stripe: true,  //斑马纹
                    column: [
                        // {
                        //     label: "fid",
                        //     prop: "fid",
                        //     row: true,
                        //     width:80
                        // },
                        {
                            label: "发货日期",
                            prop: "发货日期",
                            type:'date',
                            sortable:true, //显示排序
                            row: true,
                            width:110
                        },
                        {
                            label: "客户编码",
                            prop: "客户编码",
                            row: true,
                            width:130
                        },
                        {
                            label: "客户名称",
                            prop: "客户名称",
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                            row: true,
                            width:150
                        },
                        {
                            label: "总发货数量",
                            prop: "总发货数量",
                            row: true,
                            width:110
                        },
                        {
                            label: "优惠前金额",
                            prop: "优惠前金额",
                            type: "date",
                            row: true,
                            width:110
                        },
                        {
                            label: "总实付金额",
                            prop: "总实付金额",
                            row: true,
                            width:110
                        },
                        {
                            label: "单据张数",
                            prop: "单据张数",
                            row: true,
                            width:110
                        },
                        {
                            label: "记录行数",
                            prop: "记录行数",
                            row: true,
                            width:110
                        },
                        {
                            label: "有效记录数量",
                            prop: "有效记录数量",
                            row: true,
                            width:110
                        },
                        {
                            label: "有效记录分摊后金额",
                            prop: "有效记录分摊后金额",
                            row: true,
                            width:150
                        },
                        {
                            label: "生成出库单金额",
                            prop: " F_PAEZ_ShijiAmount",
                            row: true,
                            width:150
                        },
                        {
                            label: "有效记录实付金额",
                            prop: "有效记录实付金额",
                            row: true,
                            width:150
                        },{
                            label: "有效记录行数",
                            prop: "有效记录行数",
                            row: true,
                            width:110
                        },
                        {
                            label: "生成出库单号",
                            prop: "生成出库单号",
                            row: true,
                            width:150
                        },
                        {
                            label: "无效记录数量",
                            prop: "无效记录数量",
                            row: true,
                            width:110
                        },
                        {
                            label: "无效记录优惠前金额",
                            prop: "无效记录优惠前金额",
                            row: true,
                            width:150
                        },{
                            label: "无效记录分摊后金额",
                            prop: "无效记录分摊后金额",
                            row: true,
                            width:150
                        },
                        {
                            label: "无效单据实付金额",
                            prop: "无效单据实付金额",
                            row: true,
                            width:150
                        },
                        {
                            label: "无效记录行数",
                            prop: "无效记录行数",
                            row: true,
                            width:110
                        },
                        {
                            label: "数量差异|总数-有效数量-无效数量",
                            prop: "数量差异|总数-有效数量-无效数量",
                            row: true,
                            width:250
                        },
                        {
                            label: "优惠后金额差异|实付金额-有效分摊后金额-无效分摊后金额",
                            prop: "优惠后金额差异|实付金额-有效分摊后金额-无效分摊后金额",
                            row: true,
                            width:390
                        },
                        {
                            label: "有效分摊后金额和生成金蝶出库单金额差异",
                            prop: "有效分摊后金额和生成金蝶出库单金额差异",
                            row: true,
                            width:290
                        },
                        {
                            label: "记录数差异|总记录数-有效记录数-无效记录数",
                            prop: "记录数差异|总记录数-有效记录数-无效记录数",
                            row: true,
                            width:310
                        }
                    ]
                },
                btnnum:0, // 总共多少页
                // 开始椰树
                startnum:0,
                // 结束椰树
                endnum:1,
                begin:"",
                end:""
            };
        },
        created(){
            let date = new Date();
            this.end = date.getFullYear() + '-' + ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1)) + '-'+date.getDate();
            let time=(new Date).getTime()-24*60*60*1000;
            let yesterday=new Date(time);
            let month=yesterday.getMonth();
            let day=yesterday.getDate();
            this.begin=yesterday.getFullYear() + "-" + (yesterday.getMonth()> 9 ? (yesterday.getMonth() + 1) : "0" + (yesterday.getMonth() + 1)) + "-" +(yesterday.getDate()> 9 ? (yesterday.getDate()) : "0" + (yesterday.getDate()));
            this.getList();
        },
        methods: {
            getList(){  //获取数据
                let dataArr = request({
                    url:domainUrl + '/returnSql',
                    method:'post',
                    data:{
                        begin:this.begin,
                        end:this.end,
                        pageNum:0
                    }
                })
                dataArr.then(res => {
                    this.loading = false;
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
                    this.btnnum = Math.ceil(this.page.total/this.page.pageSize);
                })
            },
            //查询
            submit(){
                if(this.begin ==""){
                    this.$message.success('请选择开始日期');
                }else if(this.end == ""){
                    this.$message.success('请选择结束日期');
                }else {
                    this.getList();
                }
            },
            //清空
            error(){
                this.begin = "";
                this.end = "";
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
                } else {
                    let opt = {
                        title: '退货汇总核对表',
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
        height: 37px;
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
    .avue-form__menu--right{
        margin-top: -43px;
        width: 300px;
        float: right;
    }
</style>
<style lang="css" scoped>
    .sqTop{
        float: left;
        width: 80px;
        line-height: 35px;
    }
    .avue-date{
        width: 140px;
        float: left;
    }
    .avue-date >>> .el-input__inner{
        width: 140px;
        float: left;
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
    .avue-view >>>.avue-crud .avue-crud__menu{
        display: none;
    }
</style>