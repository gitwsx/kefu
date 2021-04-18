<template>
  <basic-container>
    <h3>出货异常明细</h3>
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
    <avue-crud :option="option" :page.sync="page" :data="data" :table-loading="loading" @on-load="onLoad"></avue-crud>
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
      loading:true, //等待
      pageNum:0,
      data: [],
      arrData:[],
      option: {
          addBtn:false, //显示新增按钮
          delBtn:false, //行内删除
          editBtn:false, //行内编辑
          menu:false,
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
                  label: "金蝶客户编码",
                  prop: "金蝶客户编码",
                  row: true,
                  width:110,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "公司ID",
                  prop: "公司ID",
                  width:180,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
                  row: true,
              },
              {
                  label: "订单ID",
                  prop: "订单ID",
                  row: true,
                  width:180,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "线上订单号",
                  prop: "线上订单号",
                  row: true,
                  width:110,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "创建时间",
                  prop: "创建者",
                  //sortable:true, //显示排序
                  type:"date",
                  row: true,
                  width:150,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "状态",
                  prop: "状态",
                  minRows: 8,
                  span: 24,
                  overHidden: true,
                  row: true,
                  width:150
              },
              {
                  label: "应付金额",
                  prop: "应付金额",
                  row: true,
                  width:110,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "出库日期",
                  prop: "出库日期",
                  type: "date",
                  sortable:true, //显示排序
                  row: true,
                  width:110,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "实付金额",
                  prop: "实付金额",
                  row: true,
                  width:110,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "优惠金额",
                  prop: "优惠金额",
                  row: true,
                  width:110,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "聚水潭仓库ID",
                  prop: "聚水潭仓库ID",
                  row: true,
                  width:110,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "聚水潭商品编码",
                  prop: "聚水潭商品编码",
                  row: true,
                  width:180,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "聚水潭商品名称",
                  prop: "聚水潭商品名称",
                  row: true,
                  width:150,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "聚水潭数量",
                  prop: "聚水潭数量",
                  row: true,
                  width:150,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },{
                  label: "聚水潭规格",
                  prop: "聚水潭规格",
                  row: true,
                  width:110,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "销售单价",
                  prop: "销售单价",
                  row: true,
                  width:150,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "销售金额",
                  prop: "销售金额",
                  row: true,
                  width:150,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },{
                  label: "金蝶物料编码",
                  prop: "金蝶物料编码",
                  row: true,
                  width:150,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },{
                  label: "分子",
                  prop: "分子",
                  row: true,
                  width:150,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },{
                  label: "分母",
                  prop: "分母",
                  row: true,
                  width:150,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "基本单位编码",
                  prop: "基本单位编码",
                  row: true,
                  width:150,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "基本单位",
                  prop: "基本单位",
                  row: true,
                  width:110,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "分摊后单价",
                  prop: "分摊后单价",
                  row: true,
                  width:150,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              },
              {
                  label: "分摊后金额",
                  prop: "分摊后金额",
                  row: true,
                  width:150,
                  minRows: 8,
                  span: 24,
                  overHidden: true,
              }
          ]
      },
        begin:"", //开始时间
        end:""  //结束时间
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
                url:domainUrl + '/saloutEntrysql',
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
        // utc2beijing (utc_datetime) { //把UTC时间转换成北京时间方法
        //   // 转为正常的时间格式 年-月-日 时:分:秒
        //     var T_pos = utc_datetime.indexOf('T');
        //     var Z_pos = utc_datetime.indexOf('Z');
        //     var year_month_day = utc_datetime.substr(0,T_pos);
        //     var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
        //     var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06
        //
        //     // 处理成为时间戳
        //     timestamp = new Date(Date.parse(new_datetime));
        //     timestamp = timestamp.getTime();
        //     timestamp = timestamp/1000;
        //
        //     // 增加8个小时，北京时间比utc时间多八个时区
        //     var timestamp = timestamp+8*60*60;
        //     // 时间戳转为时间
        //     var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, " ").replace(/日/g, " ");
        //     return beijing_datetime; // 2017-03-31 16:02:06
        // },
        //查询
        submit(){
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
        error(){
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
            }else if(this.page.total > 5000){
                this.$message.success('您所导出的数据太大，请选择数据小于5000导出!');
            } else {
                this.loading = true;
                let excel = request({
                    url:domainUrl + '/saloutEntrysqlLoad',
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
                        title: '出货异常明细',
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
    margin-bottom: 10px;
  }
  .avue-form__menu--right{
    /*margin-top: -43px;*/
    width: 300px;
    float: right;
  }
  .avue-form__menu--right{
    /*margin-top: -43px;*/
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
