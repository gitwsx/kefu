<template>
    <basic-container>
       <h3>账号管理</h3>
        <avue-crud :option="option" :page.sync="page" :data="data" @on-load="onLoad" @row-save="handleRowSave" @row-update="handleRowUpdate" @row-del="deleteTd">
            <template slot-scope="{type,size,row}" slot="menu">
                <el-button icon="el-icon-edit" :size="size" :type="type" @click="handle(row)">初始化密码</el-button>
            </template>
        </avue-crud>
<!-- 		<div id="app1">
		     <div v-drag class="drag"></div>
		</div> -->
    </basic-container>
</template>

<script>
    import request from '@/router/axios';
    import { domainUrl } from '@/config/env';
    export default {
        name: "account",
		directives:{
			drag(el,bindings){
				el.onmousedown = function(e){
					var disx = e.pageX - el.offsetLeft;
					var disy = e.pageY - el.offsetTop;
					document.onmousemove = function (e){
						el.style.left = e.pageX - disx+'px';
						el.style.top = e.pageY - disx+'px';
					}
					document.onmouseup = function(){
						document.onmousemove = document.onmouseup = null;
					}
				}
			}
		},
        data(){
            return {
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
                            editDisabled:true,
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
						    label: "部门",
						    prop: "department",
							type:"select",
							//dicData: [{label:"总经理",value:1},{label:"实施部",value:2},{label:"客服部",value:3},{label:"开发部",value:4},{label:"行政部",value:5}],
						    dicUrl:domainUrl + "/findDepts",
							row: true,
						    //editDisabled:true,
						    span:16,
						    width:100,
							rules: [{
							    required: true,
							    message: "请选择部门",
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
                            width:100,
                        },
                        {
                            sortable:true,
                            label: "权限",
                            prop: "rolename",
                            type:'select',
                            row: true,
                            dicUrl:domainUrl + "/findRoles",
                            span:16,
                            width:80,
                            rules: [{
                                required: true,
                                message: "请选择权限",
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
                            width:70
                        },
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
                    url:domainUrl + '/findAll',
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
            handleRowSave(row,done,loading){
                let obj = {
                    userid:row.userid,
                    userName:row.userName,
                    unit:row.unit,
                    tel:row.tel,
                    roleid:row.rolename,
					department:row.department
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
                        this.getList(this.page.currentPage,this.page.pageSize)
                    }
                })
                console.log(row)
            },
            //编辑
            handleRowUpdate(row,index,done,loading){
				if(row.rolename == "管理员"){
					row.rolename = 1;
				}else if(row.rolename == "员工"){
					row.rolename = 2;
				}else if(row.rolename == "客户"){
					row.rolename = 3;
				}
                let obj = {
                    fid:row.fid,
                    roleid:row.rolename,
                    userid:row.userid,
					department:row.department,
					unit:row.unit,
					tel:row.tel,
                }
                let dataArr = request({
                    url:domainUrl + '/updateUser',
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
            handle(row){
                console.log(row,this.page)
                let dataArr1 = request({
                    url:domainUrl+ '/resetPassword?id=' + row.fid,
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
                        this.getList(this.page.currentPage,this.page.pageSize)
                    }else {
                        this.$message.error(res.data.msg);
                    }
                })
            }

        }
    }
</script>

<style scoped>
.drag{
            width: 100px;
            height: 100px;
            position: absolute;
            top: 0;
            left: 0;
            background-color: red;
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