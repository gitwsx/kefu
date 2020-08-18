<!--<template>-->
  <!--<div class="affix">-->
    <!--<avue-affix id="avue-view">-->
      <!--<span class="affix-affix">固定在最顶部</span>-->
    <!--</avue-affix>-->
    <!--<div class="affix-line"></div>-->
    <!--<avue-affix id="avue-view"-->
                <!--:offset-top="50">-->
      <!--<span class="affix-affix">固定在距离顶部 50px 的位置</span>-->
    <!--</avue-affix>-->
    <!--<div class="affix-line"></div>-->
    <!--<avue-affix id="avue-view"-->
                <!--:offset-top="100">-->
      <!--<span class="affix-affix">固定在距离顶部 100px 的位置</span>-->
    <!--</avue-affix>-->
    <!--<div class="affix-line"></div>-->
    <!--<avue-affix id="avue-view"-->
                <!--:offset-top="150">-->
      <!--<span class="affix-affix">固定在距离顶部 150px 的位置</span>-->
    <!--</avue-affix>-->
    <!--<div style="height:2000px;">-->
      <!--<div style="padding:15px 20px;font-size:18px;">往下拉就会出现图钉</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->
<template>
  <basic-container>
    <h3>费用报销单</h3>
    <avue-crud :option="option" :page="page" :data="data" @sort-change="sortChange" @date-change="dateChange">

    </avue-crud>
  </basic-container>
</template>


<script>
export default {
    data() {
        return {
            page: {
                total: 122
            },
            data: [
                {
                    co_id: "201900000458 陈嘉佳杭州拍摄",
                    shop_id: "2020-05-01 20:08:05",
                    io_id: " 其他综合,",
                    io_date: "陈嘉佳杭州拍摄",
                    o_id: "范疆",
                    isread: "",
                    errorcause: "草稿",
                    FStatus: "有效",
                    FCreateDate: " 2020-05-01 20:08:05"
                },
                {
                    co_id: "201900000458 陈嘉佳杭州拍摄",
                    shop_id: "2020-05-01 20:08:05",
                    io_id: " 其他综合,",
                    io_date: "陈嘉佳杭州拍摄",
                    o_id: "范疆",
                    isread: "",
                    errorcause: "草稿",
                    FStatus: "有效",
                    FCreateDate: " 2020-05-01 20:08:05"
                }
            ],

            option: {
                dateBtn:true,
                dateDefault:true,
                index:true,
                indexLabel:'序号',
                border:true,
                stripe: true,  //斑马纹
                selection: true, //显示多选
                column: [
                    {
                        label: "数据标题",
                        prop: "co_id",
                        width:350
                    },
                    {
                        sortable:true, //显示排序
                        label: "申请日期",
                        prop: "shop_id",
                        type: "date",
                        width:150
                    },
                    {
                        label: "费用类型",
                        prop: " io_id,",
                        span: 14,
                        row: true
                    },
                    {
                        label: "报销事由",
                        prop: "io_date",
                        type: "text",
                        width:350
                    },
                    {
                        label: "报销人",
                        prop: "o_id",
                        type: "text"
                    },
                    {
                        label: "当前处理人",
                        prop: "isread",
                        type: "text",
                        width:100
                    },
                    {
                        sortable:true, //显示排序
                        label: "流程状态",
                        prop: "errorcause",
                        type: "textarea",
                        width:110
                    },
                    {
                        sortable:true, //显示排序
                        label: "付款状态",
                        prop: "FStatus",
                        type: "text",
                        width:110
                    },
                    {
                        label: "所属部门",
                        prop: " FCreateDate",
                        type: "date"
                    },
                    {
                        sortable:true, //显示排序
                        label: "合计总金额",
                        prop: " totalAmount",
                        type: "text",
                        width:120
                    },
                    {
                        sortable:true, //显示排序
                        label: "付款方式",
                        prop: " payment",
                        type: "text",
                        width:110
                    },
                    {
                        sortable:true, //显示排序
                        label: "付款组织",
                        prop: " organization",
                        type: "text",
                        width:110
                    },
                    {
                        label: "业务招待费单",
                        prop: " business",
                        type: "text",
                        width:130
                    },
                    {
                        label: "职员",
                        prop: " staff",
                        type: "text"
                    },
                    {
                        label: "备用金申请单",
                        prop: " imprest",
                        type: "text",
                        width:130
                    }
                ]
            }
        };
    },
    methods: {
        sortChange(val){
            this.$message.success('查看控制台');
            console.log(val);
        },
        dateChange(date){
            this.$message.success(date);
        }
    }
};
</script>

<style lang="scss">
  .is-leaf .cell{
    text-align: center;
  }
  .avue-date__radio{
    display: none;
  }
/*.affix {*/
  /*position: relative;*/
  /*background-color: #fff;*/
  /*&-affix {*/
    /*display: inline-block;*/
    /*color: #fff;*/
    /*padding: 10px 30px;*/
    /*text-align: center;*/
    /*background: rgba(0, 153, 229, 0.9);*/
  /*}*/
  /*&-line {*/
    /*height: 100px;*/
  /*}*/
/*}*/
</style>
