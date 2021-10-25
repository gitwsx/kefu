<template>
    <basic-container>
        <h3>客户公众号信息</h3>
        <avue-crud :option="option" :page.sync="page" :data="data" @on-load="onLoad" @row-update="handleRowUpdate" @row-del="deleteTd">
<!--            <template slot-scope="{type,size,row}" slot="menu">
                <el-button icon="el-icon-edit" :size="size" :type="type" @click="handle(row)">初始化密码</el-button>
            </template> -->
        </avue-crud>
    </basic-container>
</template>

<script>
    import request from '@/router/axios';
    import { domainUrl } from '@/config/env';
    export default {
        name: "account",
        data(){
            return {
                data:[],
                page: {
                    total: 0,
                    pageSize:20
                },
                option:{
                    menuWidth:220,
                    addBtn:false, //显示新增按钮
                    delBtn:true, //行内删除
                    // delBtnText:'禁用',
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
						    label: "客户编号",
						    prop: "id",
						    row: true,
						    //editDisabled:true,
						    span:16,
						    width:100,
							editDisabled:true,
						},
                        {
                            sortable:true,
                            label: "客户姓名",
                            prop: "custname",
                            row: true,
                            span:16,
                            //editDisabled:true,
                            rules: [{
                                required: true,
                                message: "请输入客户姓名",
                                trigger: "blur"
                            }]
                        },
                        {
                            sortable:true,
                            label: "微信昵称",
                            prop: "nickname",
                            row: true,
                            editDisabled:true,
                            span:16,
                        },
						{
						    label: "头像",
						    prop: "headimgurl",
						    dataType: 'string',
						    type: 'img',
							editDisabled:true,
						    row: true,
						    width:50,
						    span:16,
						},
                        {
                            sortable:true,
                            label: "单位名称",
                            prop: "custunit",
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
                            label: "手机号码",
                            prop: "tel",
                            row: true,
                            //editDisabled:true,
                            span:16,
                            width:130,
							rules: [{
							    required: true,
							    message: "请输入手机号码",
							    trigger: "blur"
							}]
                        },
                        // {
                        //     sortable:true,
                        //     label: "权限",
                        //     prop: "rolename",
                        //     type:'select',
                        //     row: true,
                        //     dicUrl:domainUrl + "/findRoles",
                        //     span:16,
                        //     width:80,
                        //     rules: [{
                        //         required: true,
                        //         message: "请选择权限",
                        //         trigger: "blur"
                        //     }]
                        // },

                    ]
                },

            }
        },
        created(){

        },
        methods:{
            getList(page,pageSize){
                let obj = {
                    pageNum:page,
                    pageSize:pageSize,
                }
                let dataArr = request({
                    url:domainUrl + '/list',
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
                this.getList(page.currentPage,page.pageSize)
            },
            //新增
            // handleRowSave(row,done,loading){
            //     let obj = {
            //         userid:row.userid,
            //         userName:row.userName,
            //         unit:row.unit,
            //         tel:row.tel,
            //         roleid:row.rolename
            //     }
            //     let dataArr = request({
            //         url:domainUrl + '/addUser',
            //         data:obj,
            //         method:'POST'
            //     })
            //     dataArr.then(res => {
            //         if(res.data.success){
            //             done();
            //             this.$message.success("提交成功!");
            //             this.getList(this.page.currentPage,this.page.pageSize)
            //         }
            //     })
            //     console.log(row)
            // },
            //编辑
            handleRowUpdate(row,index,done,loading){
			
                let obj = {
                    id:row.id,
                    tel:row.tel,
                    custname:row.custname,
					custunit:row.custunit,
                }
                let dataArr = request({
                    url:domainUrl + '/uptCustInfo',
                    data:obj,
                    method:'POST'
                })
                dataArr.then(res => {
                    if(res.data.success){
                        this.$message.success("提交成功!");
                        done();
                        this.getList(this.page.currentPage,this.page.pageSize)
                    }
                })
            },
            //初始化密码
            // handle(row){
            //     console.log(row,this.page)
            //     let dataArr1 = request({
            //         url:domainUrl+ '/resetPassword?id=' + row.fid,
            //         method:'GET',
            //         header: { 'content-Type': 'application/json' },
            //     })
            //     dataArr1.then(res => {
            //         if(res.data.success){
            //             this.$message.success(res.data.msg);
            //             this.getList(this.page.currentPage,this.page.pageSize)
            //         }else {
            //             this.$message.error(res.data.msg);
            //         }
            //     })
            // },
            //删除
            deleteTd(row,done){
                let dataArr1 = request({
                    url:domainUrl+ '/delCustInfo?id=' + row.id,
                    method:'GET',
                    header: { 'content-Type': 'application/json' },
                })
                dataArr1.then(res => {
                    if(res.data.success){
                        this.$message.success(res.data.msg);
                        this.getList(this.page.currentPage,this.page.pageSize)
                    }else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
			
        }
    }
</script>

<style scoped>
	.avue-crud >>> .avue-crud__menu{
		display: none;
	}
</style>
<style>
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