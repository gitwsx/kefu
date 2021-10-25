<template>
    <basic-container>
        <h3>项目管理</h3>	
       <el-row>
            <el-col :span="10">
                <div class="sqTop">项目名称:</div>
                <avue-input class="input" v-model="inputBh" placeholder="请输入项目名称" ></avue-input>
            </el-col>
            <el-col :span="10">
                <div class="sqTop">客户单位:</div>
                <avue-input v-model="inputMc" placeholder="请输入客户单位" ></avue-input>
            </el-col>
            <el-col :span="4">
                <div class="btn-right" style="margin-top: 3px;float: right;">
                    <button style="margin-right: 5px;padding: 6px 15px" @click="submitcx">查询</button>
                    <button @click="error" style="padding: 6px 15px">清空</button>
                </div>
            </el-col>
            <avue-crud :option="option" :page.sync="page" :data="data" @on-load="onLoad" @row-save="handleRowSave" @row-update="handleRowUpdate" @row-del="deleteTd"></avue-crud>
        </el-row>
<!-- 		<avue-form :option="option" v-model="form" @submit="submit"></avue-form> -->

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
				obj:{},
				kehuArr:[],
                option:{
                    menuWidth:220,
                    addBtn:true, //显示新增按钮
                    delBtn:true, //行内删除
                    delBtnText:'删除',
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
                            label: "项目名称",
                            prop: "proName",
                            row: true,
                            width:300,
                            span:16,
                            //editDisabled:true,
                            rules: [{
                                required: true,
                                message: "请输入项目名称",
                                trigger: "blur"
                            }]
                        },
						{
						    sortable:true,
						    label: "单位名称",
						    prop: "custUnit",
							type:"table",
						    row: true,
						    //editDisabled:true,
						    span:16,
						    width:300,
							children: {
								border: true,
								column: [{
									label: '单位名称',
									width: 200,
									search:true,
									prop: 'unitName'
								}, {
									label: '姓名',
									search:true,
									prop: 'custName'
								}],
							},
							onLoad: ({ page, value,data }, callback) => {
								var self = this;
							
		
								//首次加载去查询对应的值
								if(data){
									this.unitName = data.unitName;
									this.custName = data.custName;
									this.tel = data.tel;
								}
								if(page){
									this.unitList(page.currentPage,page.pageSize,this.unitName,this.custName,this.tel);
									setTimeout(function(){
												//分页查询信息
										callback({
											total:self.page.total,
											data: self.kehuArr
										})		
									},500)
								}
							},
							props: {
								label: 'unitName',
								value: 'id'
							},
						},
                        {
                            sortable:true,
                            label: "姓名",
                            prop: "custName",
                            row: true,
                            //editDisabled:true,
                            span:16,
							addDisplay:false
                        },
                        
                    ]
                },

             }
        },
        created(){
			this.obj = JSON.parse(this.$cookie.get("token"));
        },
        methods:{
			submit (){
				console.log(this.form,11111111111)
			},
			unitList(page,pageSize,unitName,custName,tel){
				//客户信息
				//this.kehuArr = [];
				let obj = {
					pageNum:page,
					pageSize:pageSize,
					unitName:unitName,
					custName:custName,
					tel:tel		
				}
				let kehu = request({
					url:domainUrl+ '/custList',
					data:obj,
					method:'POST'
				})
				kehu.then(res => {
					this.kehuArr = res.data.list;
					this.page.total = res.data.total;
				})
			},
            getList(page,pageSize,unit,name){
                let obj = {
                    pageNum:page,
                    pageSize:pageSize,
                    proName:unit,
                    custUnit:name
                }
                let dataArr = request({
                    url:domainUrl + '/queryPro',
                    data:obj,
                    method:'POST'
                })
                dataArr.then(res => {
                    this.page.total = res.data.total;
                    this.page.pageSize = res.data.pageSize;
                    this.data = res.data.list;
                })
            },
            onLoad(page){
                this.getList(page.currentPage,page.pageSize,this.inputBh,this.inputMc)
            },
            //新增
            handleRowSave(row,done,loading){
				console.log(row,111111)
                let obj = {
                    proName:row.proName,
                    custId:row.custUnit,
                    userId:this.obj.id
                }
				done();
                let dataArr = request({
                    url:domainUrl + '/addPro',
                    data:obj,
                    method:'POST'
                })
                dataArr.then(res => {
                    if(res.data.success){
                        
                        this.$message.success("提交成功!");
                        this.getList(this.page.currentPage,this.page.pageSize,this.inputBh,this.inputMc)
                    }
                })
            },
            //编辑
            handleRowUpdate(row,index,done,loading){
				//console.log(row,1111111)
                let obj = {
                    id:row.id,
                    proName:row.proName,
                    custId:row.custId,
                    userId:this.obj.id
                }
				 done();
                let dataArr = request({
                    url:domainUrl + '/uptPro',
                    data:obj,
                    method:'POST'
                })
			
                dataArr.then(res => {
                    if(res.data.success){
                        this.$message.success("修改成功!");
                       
                        this.getList(this.page.currentPage,this.page.pageSize,this.inputBh,this.inputMc)
                    }
                })
            },
            //删除
            deleteTd(row,done){
                let dataArr1 = request({
                    url:domainUrl+ '/delPro?id=' + row.id,
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