<template>
    <basic-container>
        <div v-if="obj.roleid != 3">
            <div class="conLeft"  v-if="userId == 1 || userId == undefined">
                <h3 class="h3" style="font-weight: 400;color: #1f94f4;text-align: center;">最近服务客户</h3>
                <div class="table">
                    <ul>
                        <li v-for="item in unitArr" @click="openDetails(item.client_unit,item.client_name,item.client_phone)">{{item.client_unit}} ({{item.client_name}})</li>
                    </ul>
                </div>
            </div>
        </div>

        <div :class="[userId == 1 && obj.roleid != 3 ?'mid':'mid1']">
            <h3 class="h3">{{text}}</h3>
            <!--新增-->
            <div v-if="userId == 1 || userId == undefined || userId == 4">
                <div class="tijiao">
                    <el-row :span="24">
                        <el-col>
                            <div class="list-input">
                                <div class="list-left">提交时间:</div>
                                <avue-input class="list-right" readonly="readonly" v-model="form.time" placeholder="系统自动生成"></avue-input>
                            </div>
                        </el-col>
                        <el-col>
                            <div class="list-input" v-if="obj.roleid != 3">
                                <div class="list-left"><span style="color: red">*</span>指定处理人:</div>
                                <avue-input-tree class="list-right" readonly="readonly" v-model="form.zdr" :dic="dicName" placeholder="请选择指定处理人"></avue-input-tree>
                            </div>
                        </el-col>
                        <el-col>
                            <div class="list-input">
                                <div class="list-left">要求完成时间:</div>
                                <avue-input class="list-right" readonly="readonly" v-model="form.finishtime" placeholder="系统自动生成"></avue-input>
                            </div>
                        </el-col>
                        <el-col>
                            <div class="list-input">
                                <div class="list-left"><span style="color: red">*</span>标题:</div>
                                <avue-input class="list-right" v-model="form.title" type="tree" placeholder="请输入标题"></avue-input>
                            </div>
                        </el-col>
                        <el-col>
                            <div class="list-input">
                                <div class="list-left"><span style="color: red">*</span>客户单位:</div>
                                <avue-input class="list-right" v-model="form.clientUnit" placeholder="请输入客户单位"></avue-input>
								<avue-input-table :props="props" :column="column" :formatter="formatter" :on-load="onLoad" v-model="formUnit" placeholder="请选择数据"></avue-input-table>
								<i class="iconfont iconcategory"></i>
                            </div>
                        </el-col>
                        <el-col>
                            <div class="list-input">
                                <div class="list-left"><span style="color: red">*</span>客户姓名:</div>
                                <avue-input class="list-right" v-model="form.clientName" placeholder="请输入客户姓名"></avue-input>
                            </div>
                        </el-col>
                        <el-col>
                            <div class="list-input">
                                <div class="list-left"><span style="color: red">*</span>联系方式:</div>
                                <avue-input class="list-right" v-model="form.clientPhone" placeholder="请输入联系方式"></avue-input>
                            </div>
                        </el-col>
                        <el-col>
                            <div class="list-input">
                                <div class="list-left"><span style="color: red">*</span>金蝶类型:</div>
                                <avue-input-tree class="list-right" v-model="form.type" :dic="dicType" placeholder="请选择金蝶类型"></avue-input-tree>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="list-input">
                                <div class="list-left" style="width: 38%"><span style="color: red">*</span>紧急情况:</div>
                                <avue-radio v-model="form.sex" :dic="dic" @change="toJinji"></avue-radio>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="list-input" style="text-align: right">
                                <avue-radio v-model="form.xqlx" :dic="demand"></avue-radio>
                            </div>
                        </el-col>
                        <el-col>
                            <div class="list-input" style="height: 100px">
                                <div class="list-left"><span style="color: red">*</span>描述:</div>
                                <avue-input type="textarea" class="list-textarea" v-model="form.description" placeholder="请输入描述"></avue-input>
                            </div>
                        </el-col>
                        <el-col>
                            <p class="popP"><span style="color: red">*</span>提交图片</p>
                            <div class="imgSx1" v-if="imgArr.length != 0">
                                <div class="img-list1" v-for="item in imgArr">
                                    <viewer style="height: 100%">
                                        <img :src="item" title="点击放大">
                                    </viewer>
                                </div>
                            </div>
                            <div class="preview" v-on:paste="handlePaste" @mouseover="mouseover" @mouseleave="mouseLeave">
                                <span v-if="isImg" style="color: #999">将图片按Ctrl+V 粘贴至此处</span>
                                <img v-else :src="preview"></img>
                                <div class="scImg" v-if="isMouImg">
                                    <button @click="toImg">上传图片</button>
                                </div>
                            </div>
                        </el-col>
                        <el-col>
                            <div style="width: 60%;margin: 0 auto;">
                                <button class="btn" @click="submit" style="margin-right: 20px">提交</button>
                                <button class="btn" @click="qingkong">清空</button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <!--提交-->
            <div v-if="userId == 2">
                <div class="tijiao">
                    <div class="topText">
                        客户信息:
                    </div>
					<div name="first">
						<First></First>		
					</div>
					
					<div class="topText">
                        提交信息:
                    </div>
                    <el-row :span="24">
                        <el-col>
                            <div class="list-input">
                                <div class="list-left">提交时间:</div>
                                <avue-input class="list-right" readonly="readonly" v-model="formTj.time" placeholder="系统自动生成"></avue-input>
                            </div>
                        </el-col>
                        <el-col>
                            <div class="list-input">
                                <div class="list-left"><span style="color: red">*</span>是否已完成:</div>
                                <avue-radio v-model="formTj.deal" :dic="dicTj"></avue-radio>
                            </div>
                        </el-col>
                        <el-col>
                            <div class="list-input" style="height: 130px">
                                <div class="list-left"><span style="color: red">*</span>提交描述:</div>
                                <avue-input type="textarea" class="list-textarea" v-model="formTj.description" placeholder="请输入描述"></avue-input>
                            </div>
                        </el-col>
                        <el-col>
                            <p class="popP">提交图片</p>
                            <div class="imgSx1" v-if="imgArr.length != 0">
                                <div class="img-list1" v-for="item in imgArr">
                                    <viewer style="height: 100%;">
                                        <img :src="item" title="点击放大">
                                    </viewer>
                                </div>
                            </div>
                            <div class="preview" v-on:paste="handlePaste" @mouseover="mouseover" @mouseleave="mouseLeave">
                                <span v-if="isImg" style="color: #999">将图片按Ctrl+V 粘贴至此处</span>
                                <img v-else :src="preview"></img>
                                <div class="scImg" v-if="isMouImg">
                                    <button @click="toImg">上传图片</button>
                                </div>
                            </div>
                        </el-col>
                        <el-col>
                            <div style="width: 50%;margin: 0 auto">
                                <button class="btn" @click="sunTj" style="margin-right: 20px">提交</button>
                                <button class="btn" @click="qingkongTj">清空</button>
                            </div>

                        </el-col>
                    </el-row>
                </div>
            </div>
            <!--查看-->
            <div v-if="userId == 3">
                <div class="tijiao">
                    <!--客户信息-->
                    <div class="topText">
                        客户信息:
                    </div>
					<div name="first">
						<First></First>		
					</div>

					<!--提交信息-->
                    <div v-if="chakanArr.length != 0">
                        <div class="topText" style="border-bottom: none;margin-bottom: 0;padding-bottom: 0">
                            提交信息:
                        </div>
                        <div style="margin-top: 10px" v-for="(item,index) in chakanArr">
                            <div style="width: 100%;height: 20px;border-bottom: 1px solid #ddd;">
                                <i class="iconfont icondown" @click="toIcon(index,$event)"></i>
                            </div>
                            <div  :class="'listSucc'+index" ref="crud">
                                <div class="listSucc">
                                    <el-row :span="24">
                                        <el-col>
                                            <div class="list-input">
                                                <div class="list-left">提交时间:</div>
                                                <avue-input class="list-right" readonly v-model="item.realSubmitTime" placeholder="系统自动生成"></avue-input>
                                            </div>
                                        </el-col>
                                        <el-col>
                                            <div class="list-input">
                                                <div class="list-left">是否已完成:</div>
                                                <avue-radio v-model="item.finish" readonly :dic="dicTj"></avue-radio>
                                            </div>
                                        </el-col>
                                        <el-col>
                                            <div class="list-input" style="height: 130px">
                                                <div class="list-left">提交描述:</div>
                                                <avue-input type="textarea" readonly class="list-textarea" v-model="item.description" placeholder="请输入描述"></avue-input>
                                            </div>
                                        </el-col>
                                        <el-col>
                                            <p class="popP">提交图片</p>
                                            <div class="imgSx" v-if="item.picurls.length != 0">
                                                <div class="img-list" v-for="it in item.picurls">
                                                    <viewer style="height: 100%;">
                                                        <img :src="it" title="点击放大">
                                                    </viewer>
                                                </div>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--客户评价-->
                    <div v-if="pingjiaObj != undefined" style="margin-top: 10px">
                        <div class="topText">
                            客户评价:
                        </div>
                        <el-row :span="24">
                            <el-col>
                                <div class="list-input">
                                    <div class="list-left">评价时间:</div>
                                    <avue-input class="list-right" readonly v-model="pingjiaObj.realTime" placeholder="系统自动生成"></avue-input>
                                </div>
                            </el-col>
                            <el-col>
                                <div class="list-input" style="height: 40px;">
                                    <div class="list-left">是否已完成:</div>
                                    <avue-radio v-model="pingjiaObj.deal" readonly :dic="dicTj"></avue-radio>
                                </div>
                            </el-col>
                            <el-col>
                                <div class="list-input">
                                    <div class="list-left">满意度:</div>
                                    <avue-radio v-model="pingjiaObj.degree" readonly :dic="dicPj"></avue-radio>
                                </div>
                            </el-col>
                            <el-col>
                                <div class="list-input" style="height: 100px">
                                    <div class="list-left">评价说明:</div>
                                    <avue-input type="textarea" readonly class="list-textarea" v-model="pingjiaObj.content" placeholder="请输入描述"></avue-input>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <!--弹窗-->
        <div class="popUps" v-if="isFz">
            <div class="fuzhi">
                <p>保存成功！请复制地址，粘贴给客户。</p>
                <el-button class="fuBtn" type="text" size="medium"
                           v-clipboard:copy="sysAppIds"
                           v-clipboard:success="onCopy"
                >复制链接地址</el-button>
            </div>
        </div>
    </basic-container>
</template>

<script>
    import request from '@/router/axios';
    import { domainUrl } from '@/config/env';
    import {url} from '@/config/env';
	
	import First from './child/client.vue'
    export default {
        name: "addWork",
		components: { First },
        data(){
            return {
				page: {
				    total: 0,
				    pageSize:10,
					page:1,
				    //pageSizes:[10,15,20]
				},
                userId:0, //判断是哪个页面
                obj:{}, //获取用户信息
                text:"", //标题
                form:{
                    time:"",
                    title:"",
                    clientUnit:"",
                    clientName:"",
                    clientPhone:"",
                    type:0,
                    description:"",
                    sex:0,
                    xqlx:0,
                    picurls:[]
                },
                dic:[{label:'一般', value:0},{label:'急', value:1},{label:'紧急', value:2}],
                demand:[{label:'业务场景', value:0},{label:'技术要求', value:1}],
                dicType:[],
                dicName:[], //指定处理人
                isImg:true,
                isMouImg:false,
                preview:"",
                imgArr:[],  //提交图片数组
                formTj:{
                    time:"",
                    deal:1,
                    description:"",
                    picurls:[]
                },
                dicTj:[{label:"已完成",value:1},{label:"未完成",value:0}],
                dicPj:[{label:"满意",value:1},{label:"一般",value:2},{label:"不满意",value:3}],
                chakanArr:[], //提交信息数组
                pingjiaObj:{},
                isFz:false,

                unitArr:[],
                isKg:true,
				
				column:{
				  children:{
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
					},{
					  label: '电话号码',
					  search:true,
					  prop: 'tel'
					}],
				  },
				},
				props: {
				  label: 'unitName',
				  value: 'id'
				},
				formUnit:'0',
				kehuArr:[],
				unitName:'',
				custName:'',
				tel:'',
				
				isComplete:true
            }
        },
        created(){
            this.obj = JSON.parse(this.$cookie.get("token"));
            if(this.obj.roleid == 3){
                this.form.clientName = this.obj.realname;
                this.form.clientUnit = this.obj.unit;
                this.form.clientPhone = this.obj.tel;
			
            }
            let date = new Date();
            this.form.time = this.formatTime(date,0,0);
            this.form.finishtime = this.formatTime(date,1,0);
            this.getXlk();
            this.userId = this.$route.query.userId;
            if(this.userId == undefined){
                this.userId = 1;
            }
            let id = this.$route.query.id;
            this.formTj.id = id;
            if(this.userId == 1 || this.userId == undefined){
                this.text = "新增工单";
            }else if(this.userId == 2){
                this.text = "提交工单";
            }else if(this.userId == 3) {
                this.text = "查看工单";
            }else {
                this.text = "修改工单";
            }
            if(this.userId == 2 || this.userId == 3 || this.userId == 4){
                let dataArr = request({
                    url:domainUrl + '/view?id=' + id,
                    method:'GET'
                })
                dataArr.then(res => {
                    if(res.data.success){
                        this.form = res.data.wo;
                        this.formTj.time = this.formatTime(date,0,0);
                        this.chakanArr = res.data.submitList; //提交数组
                        this.pingjiaObj = res.data.comment; //客户评价
                        if(this.chakanArr.length != 0){
                            for (var i = 0;i<this.chakanArr.length;i++){
                                this.chakanArr[i].isFag = true;
                            }
                        }

                    }
                })
            }
			//this.unitList();
        },
        methods:{
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
			//确定选中
			formatter(row){
				this.form.clientUnit = row.unitName;
				this.form.clientName = row.custName;
				this.form.clientPhone = row.tel;
			},
			onLoad({ page, value,data }, callback){
					//首次加载去查询对应的值
					var self = this;
					if (value) {
						this.unitList(this.page.currentPage,this.page.pageSize,this.unitName,this.custName,this.tel);
						//分页查询信息
						callback({
						  total:self.page.total,
						  data: self.kehuArr
						})
					}
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
						},1000)

					}
			},
				
            openDetails(unit,name,phone){
                this.form.clientName = name;
                this.form.clientPhone = phone;
                this.form.clientUnit = unit;
            },
            //新增和修改提交
            submit(){
                this.form.picurls = this.imgArr;
                this.form.userId = this.obj.id;

                if(!this.form.title){
                    this.$message.error("请输入标题!");
                    return;
                }
                if(!this.form.clientUnit){
                    this.$message.error("请输入客户单位!");
                    return;
                }
                if(!this.form.clientName){
                    this.$message.error("请输入客户姓名!");
                    return;
                }
                if(!this.form.clientPhone){
                    this.$message.error("请输入联系方式!");
                    return;
                }
                if(!this.form.description){
                    this.$message.error("请输入描述!");
                    return;
                }
                if(!this.form.type){
                    this.$message.error("请选择金蝶类型!");
                    return;
                }
                if(this.isKg){
                    this.isKg = false;
                    if(this.userId == 1 || this.userId == undefined){
                        let dataArr = request({
                            url:domainUrl + '/add',
                            data:this.form,
                            method:'POST'
                        })
                        dataArr.then(res => {
                            if(res.data.success){
                                this.isKg = true;
                                this.qingkong();
                                this.$message.success("提交成功!");
                            }
                        })
                    }else {
                        this.form.id = this.formTj.id;
                        let dataArr = request({
                            url:domainUrl + '/updateWo',
                            data:this.form,
                            method:'POST'
                        })
                        dataArr.then(res => {
                            if(res.data.success){
                                this.isKg = true;
                                this.qingkong();
                                this.$message.success("修改成功!");
                            }
                        })
                    }
                }


            },
            //提交完成
            sunTj(){
                var self = this;	
                self.formTj.userId = this.obj.id;
                self.formTj.picurls = this.imgArr;
				if(self.isComplete){
					self.isComplete = false;
					let dataArr = request({
						url:domainUrl + '/submit',
						data:self.formTj,
						method:'POST'
					})
					dataArr.then(res => {
						if(res.data.success){
							this.isFz = true;
							self.isComplete = true;
							let obj = {
								url:"http://lingaokeji.top:8098?id=496",
								//url:"http://lingaokeji.top:8098?id="+self.formTj.id,
								tel:self.form.clientPhone
							}
							let weixin = request({
								url:domainUrl + '/sendMsgToCust',
								data:obj,
								method:'POST'
							})
							weixin.then(ress => {
								let sing = "尊敬的客户，您所提交的问题已经处理完了，请您用浏览器打开下面的链接进行评价，谢谢！"
								self.sysAppIds = sing + "http://lingaokeji.top:8098?id="+self.formTj.id;
								this.qingkongTj();
							})

						}
					})	
				}
            },
            //选择紧急情况
            toJinji(){
                let date = new Date();
                if(this.form.sex == 0){
                    this.form.finishtime = this.formatTime(date,1,0);
                }else {
                    this.form.finishtime = this.formatTime(date,0,2);
                }
            },
            //下拉框数据
            getXlk(){
                //金蝶类型
                let dataArr = request({
                    url:url+ '/getType',
                    method:'GET',
                    header: { 'content-Type': 'application/json' },
                })
                dataArr.then(res => {
                    this.dicType = res.data;
                })
                //指定人
                let dataArr1 = request({
                    url:domainUrl+ '/findUsers',
                    method:'GET',
                    header: { 'content-Type': 'application/json' },
                })
                dataArr1.then(res => {
                    this.dicName = res.data;
                    if(this.obj.roleid == 3){
                        this.form.zdr = 0;
                    }else {
                        this.form.zdr = this.obj.id;
                    }
                    //console.log(this.dicName,this.form.zdr)
                })
                //最近客户
                let dataArr2 = request({
                    url:domainUrl+ '/top10?userid='+ this.obj.id,
                    method:'GET',
                    header: { 'content-Type': 'application/json' },
                })
                dataArr2.then(res => {
                    this.unitArr = res.data;
                    //console.log(this.dicName,this.form.zdr)
                })
            },

            //鼠标移入
            mouseover(){
                if(this.preview != ""){
                    this.isMouImg = true;
                }
            },
            //鼠标移出
            mouseLeave(){
                this.isMouImg = false;
            },
            //点击上传图片
            toImg(){
                this.imgArr.push(this.preview);
                this.isImg = true;
                this.preview = "";
            },
            //清空
            qingkong(){
                //新增清空
                let date = new Date();
                this.form.time = this.formatTime(date,0,0);
                this.form.finishtime = this.formatTime(date,1,0);
                this.form.title = "";
                this.form.clientUnit = "";
                this.form.clientName = "";
                this.form.clientPhone = "";
                this.form.description = "";
                this.form.type = 0;
                this.form.sex = 0;
                this.form.zdr = 0;
                this.form.xqlx = 0;
                this.form.picurls = [];
                this.imgArr = [];


            },
            qingkongTj(){
                // 提交清空
                let date = new Date();
                this.formTj.time = this.formatTime(date,0,0);
                this.form.finishtime = this.formatTime(date,1,0);
                this.formTj.deal = 1;
                this.formTj.description = "";
                this.imgArr = [];
            },
            toIcon(index,$event){
                this.chakanArr[index].isFag =! this.chakanArr[index].isFag;
                let a = this.$refs.crud;
                console.log(this.chakanArr[index].isFag)
                if(this.chakanArr[index].isFag){
                    a[index].style.display = "block";
                }else {
                    a[index].style.display = "none";
                }
            },
            // 监听粘贴操作
            handlePaste(event) {
                const items = (event.clipboardData || window.clipboardData).items;
                let file = null;

                if (!items || items.length === 0) {
                    this.$message.error("当前浏览器不支持本地");
                    return;
                }
                // 搜索剪切板items
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf("image") !== -1) {
                        file = items[i].getAsFile();
                        break;
                    }
                }
                if (!file) {
                    this.$message.error("粘贴内容非图片");
                    return;
                }
                // 此时file就是我们的剪切板中的图片对象
                // 如果需要预览，可以执行下面代码
                const reader = new FileReader();
                reader.onload = event => {
                    console.log(this.isImg,11111111111111111)
                    this.isImg = false;
                    this.preview = event.target.result;
                    //this.formTj.picurl = event.target.result;
                };
                reader.readAsDataURL(file);
                this.file = file;
            },
            onCopy(e){
                this.isFz = false;
            },
            phoneValid(phone) {
                phone = phone === null ? '' : phone;
                if (phone.match(/^((1[3456789]{1})+\d{9})$/)) {
                    return true;
                }
                return false;
            },
            //时间格式方法
            formatTime (date,da,hou) {
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                const day = date.getDate() + da
                const hour = date.getHours() + hou
                const minute = date.getMinutes()
                const second = date.getSeconds()
                return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
            },
        }
    }
</script>

<style scoped>
	.iconcategory{
		position: absolute;
		top: 3px;
		right: 15px;
	}
	.avue-input-table{
		width: 20px;
		height: 20px;
		position: absolute;
		top: 0;
		right: 25px;
	}
    .conLeft{
        width: 20%;
        position: absolute;
        top: 130px;
        left: 50px;
    }
    .table ul{
        padding: 0;
        margin: 0;
    }
    .table ul li{
        width: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        list-style: none;
        font-size: 16px;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #ddd;
        cursor: pointer;
        padding-left: 10px;
    }
    .h3{
        color: #666;
    }
    .list-input{
        line-height: 35px;
		position: relative;
    }
    .list-input .list-left{
        width: 19%;
        float: left;
        color: #999;
    }
    .list-input .list-right{
        width: 81%;
    }
    .list-input .list-textarea{
        width: 80.5%;
        height: 110px;
        overflow: auto;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .list-input .list-textarea >>> .el-textarea__inner{
        border: none;
    }

    .popP{
        color: #999;
    }
    .preview{
        width: 100%;
        height: 200px;
        border: 1px solid #ddd;
        border-radius: 5px;
        float: left;
        position: relative;
    }
    .preview img{
        width: 100%;
        height: 100%;
    }
    .scImg{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0,0,0,0.3);
        text-align: center;
        line-height: 200px;
    }
    .scImg button{
        text-align: center;
        padding: 5px 40px;
        background: #fff;
        border-radius: 5px;
        color: #1f94f4;
        border: none;
    }
    .imgSx .img-list{
        width: 100%;
        height: 380px;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .imgSx .img-list img{
        width: 100%;
        height: 100%;
    }
    .imgSx1{
        width: 100%;
        height: 120px;
        overflow: auto;
    }
    .imgSx1 .img-list1{
        width: 100px;
        height: 100px;
        float: left;
        margin-right: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    .imgSx1 .img-list1 img{
        width: 100%;
        height: 100%;
    }

    .btn{
        width: 130px;
        height: 40px;
        line-height: 40px;
        background: #fff;
        color: #1f94f4;
        text-align: center;
        border: none;
        margin-top: 30px;
        padding: 0;
        border-radius: 5px;
        border: 1px solid #1f94f4;
    }

    /*提交工单*/
    .mid{
        width: 60%;
        /*margin-left: 30px;*/
        /*float: left;*/
        margin-left: 35%;
    }
    .mid1{
        width: 60%;
        margin: 0 auto;
    }
    .topText{
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
        padding-bottom: 10px;
        font-weight: bold;
    }

    .icondown{
        float: right;
        cursor: pointer;
    }
    .iconup2{
        float: right;
        cursor: pointer;
    }
    .listSucc{
        width: 100%;
        height: 180px;
        margin-top: 10px;
    }
    .popUps{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.2);
        z-index: 9;
    }
    .fuzhi{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 100px;
        background: #fff;
        text-align: center;
        border-radius: 5px;
    }
    .fuBtn{
        padding: 8px 30px;
        background: #409EFF;
        color: #fff;
    }

</style>