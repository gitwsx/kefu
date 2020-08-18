<template>
  <basic-container>
    <h3>退货异常明细</h3>
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
    <!--<avue-form v-model="formCx" :option="option1" @submit="submit" @error="error"></avue-form>-->
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
                pageNum:0,
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
                        {
                            label: "主表错误原因",
                            prop: "主表错误原因",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "子表错误原因",
                            prop: "子表错误原因",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "内码",
                            prop: "内码",
                            row: true,
                            width:110,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "售后单号",
                            prop: "售后单号",
                            width:180,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                            row: true,
                        },
                        {
                            label: "申请时间",
                            prop: "申请时间",
                            type: "date",
                            sortable:true, //显示排序
                            row: true,
                            width:110,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },{
                            label: "平台退货退款单号",
                            prop: "平台退货退款单号",
                            row: true,
                            width:180,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "ERP内部订单号",
                            prop: "ERP内部订单号",
                            row: true,
                            width:130,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "线上订单号",
                            prop: "线上订单号",
                            //sortable:true, //显示排序
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "售后类型",
                            prop: "售后类型",
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                            row: true,
                            width:150
                        },
                        {
                            label: "登记时间",
                            prop: "登记时间",
                            type:"date",
                            row: true,
                            width:110,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "修改时间",
                            prop: "修改时间",
                            type:"date",
                            row: true,
                            width:110,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "状态",
                            prop: "状态",
                            row: true,
                            width:110,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "买家状态",
                            prop: "买家状态",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "备注",
                            prop: "备注",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },{
                            label: "问题类型",
                            prop: "问题类型",
                            row: true,
                            width:110,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "退款金额",
                            prop: "退款金额",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "补偿金额",
                            prop: "补偿金额",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },{
                            label: "货物状态",
                            prop: "货物状态",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },{
                            label: "店铺编号",
                            prop: "店铺编号",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },{
                            label: "店铺名称",
                            prop: "店铺名称",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "仓库ID",
                            prop: "仓库ID",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "最后确认日期",
                            prop: "最后确认日期",
                            type:"date",
                            row: true,
                            width:110,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "客户编码",
                            prop: "客户编码",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "仓库编码",
                            prop: "仓库编码",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "申请退货单号",
                            prop: "申请退货单号",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "售后子单号",
                            prop: "售后子单号",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "申请数量",
                            prop: "申请数量",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "单价",
                            prop: "单价",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "金额",
                            prop: "金额",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "商品名称",
                            prop: "商品名称",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "类型",
                            prop: "类型",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "规格",
                            prop: "规格",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "实收退货数量",
                            prop: "实收退货数量",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "创建日期",
                            prop: "创建日期",
                            type:"date",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "金蝶物料编码",
                            prop: "金蝶物料编码",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "金蝶基本单位编码",
                            prop: "金蝶基本单位编码",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "金蝶基本单位",
                            prop: "金蝶基本单位",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "分子",
                            prop: "分子",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "分母",
                            prop: "分母",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "销售基本单位编码",
                            prop: "销售基本单位编码",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
                        },
                        {
                            label: "销售基本单位",
                            prop: "销售基本单位",
                            row: true,
                            width:150,
                            minRows: 8,
                            span: 24,
                            overHidden: true,
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
                    url:domainUrl + '/returnEntrysql',
                    method:'post',
                    data:{
                        begin:this.begin,
                        end:this.end,
                        pageNum:this.pageNum
                    }
                })
                dataArr.then(res => {
                    this.loading = false;
                    this.page.total = res.data.totalElements;
                    this.page.pageSize = res.data.pageable.pageSize;
                    this.data = res.data.content;
                    this.arrData = res.data.content;
                })
            },
            //查询
            submit(form,done){
                if(this.begin ==""){
                    this.$message.success('请选择开始日期');
                }else if(this.end == ""){
                    this.$message.success('请选择结束日期');
                }else {
                    this.loading = true;
                    this.getList();
                }
            },
            //清空
            error(err){
                this.begin = "";
                this.end = "";
            },
            onLoad(page){
                this.data = [];
                if(this.arrData.length !=0){
                    this.pageNum = page.currentPage -1;
                    this.getList();
                }
            },
            handleExcel(){
                if(this.data.length == 0){
                    this.$message.success('请选择需要导出的数据');
                }else if(this.page.total>5000){
                    this.$message.success('您所导出的数据太大，请选择数据小于5000导出!');
                } else {
                    this.loading = true;
                    let excel = request({
                        url:domainUrl + '/returnEntrysqlLoad',
                        method:'post',
                        data:{
                            begin:this.begin,
                            end:this.end
                        }
                    })
                    excel.then(res => {
                        let arr = res.data.content;
                        this.loading = false;
                        let opt = {
                            title: '退货异常明细',
                            column: this.option.column,
                            data: arr
                        }
                        this.$export.excel({
                            title: opt.title || new Date().getTime(),
                            columns: opt.column,
                            data: opt.data
                        });
                    })
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