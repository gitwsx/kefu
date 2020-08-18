<template>
  <!--<basic-container>-->
    <!--<h3>这个页面会被 keep-alive</h3>-->
    <!--<el-tag>在下面的输入框输入任意字符后，切换到其它页面，再回到此页时输入框文字保留，证明被缓存</el-tag>-->
    <!--<br /> <br />-->
    <!--<el-tag>同时滚动下拉，返回时还会保持滚动条所在的位置</el-tag>-->
    <!--<br /> <br />-->
    <!--<el-input v-model="value"-->
              <!--placeholder="input here"></el-input>-->

    <!--<div style="height:1000px;"></div>-->
  <!--</basic-container>-->
  <basic-container>
    <avue-form  :option="option" v-model="obj" :upload-preview="uploadPreview" :upload-before="uploadBefore" :upload-after="uploadAfter" @submit="handleSubmit">
    </avue-form>
  </basic-container>

</template>

<script>
    var DIC = {
        VAILD: [{
            label: '真',
            value: 'true'
        }, {
            label: '假',
            value: 'false'
        }],
        SEX: [{
            label: '是',
            value: 0
        }, {
            label: '否',
            value: 1
        }],
        Amount:[{
            label: '是',
            value: 0
        }, {
            label: '否',
            value: 1
        }],
        Imprest:[{
            label: '是',
            value: 0
        }, {
            label: '否',
            value: 1
        }]
    }
export default {
    data() {
        return {
            obj: {
                imgUrl:[
                    { "label": "avue@226d5c1a_image.png", "value": "/images/logo-bg.jpg" },
                    {"label": "avue@226d5c1a_video.png", "value": 'https://www.w3school.com.cn/i/movie.ogg'}
                ]
            },
            option: {
                emptyBtn:false,  //清空按钮
                submitBtn:false, //提交按钮
                group: [
                    {
                        label: '基本信息',
                        prop: 'jbxx',
                        collapse:true,
                        column: [
                            {
                                label: '流水号',
                                prop: 'lsh',
                                labelPosition:'top',
                                type:'text',
                                disabled:true,
                            },{
                                label: '申请日期',
                                prop: 'date',
                                type:'input',
                                labelPosition:'top'
                            },{
                                label: '通用类型',
                                prop: 'text',
                                type:'select',
                                labelPosition:'top',
                                maxlength: 3,
                                suffixIcon: 'el-icon-tickets',
                                prefixIcon: 'el-icon-tickets',
                                minlength: 2,
                                rules: [{
                                    required: true,
                                    message: "请选择通用类型",
                                    trigger: "blur"
                                }],
                                click:({value,column})=>{
                                    this.$message.success('click')
                                },
                                dicData: [{
                                    value: 'Shanghai',
                                    label: '上海'
                                }, {
                                    value: 'Beijing',
                                    label: '北京'
                                }, {
                                    value: 'Shenzhen',
                                    label: '深圳'
                                }]
                            },{
                                label: '所属部门',
                                prop: 'select',
                                type:'select',
                                labelPosition:'top',
                                drag: true,
                                multiple: true,
                                rules:{
                                    required: true
                                },
                                dicData: [{
                                    value: 'Shanghai',
                                    label: '上海'
                                }, {
                                    value: 'Beijing',
                                    label: '北京'
                                }, {
                                    value: 'Shenzhen',
                                    label: '深圳'
                                }]
                            }, {
                                label:'是/否属于业务部门',
                                prop: "switch",
                                span: 6,
                                type: "switch",
                                labelPosition:'top',
                                mock:{
                                    type:'dic'
                                },
                                hide: true,
                                row:true,
                            },{
                                label:'职员',
                                prop:'select',
                                labelPosition:'top',
                                row:true,
                                dicData: [{
                                    value: '1',
                                    label: '张三'
                                }, {
                                    value: '2',
                                    label: '李四'
                                }, {
                                    value: '3',
                                    label: '王五'
                                }]
                            },{
                                label: '账号名称',
                                prop: 'account',
                                type:'text',
                                labelPosition:'top'
                            },{
                                label: '开户银行',
                                prop: 'account',
                                type:'text',
                                labelPosition:'top'
                            },{
                                label: '银行账号',
                                prop: 'account',
                                type:'text',
                                labelPosition:'top'
                            },{
                                label: '联行号',
                                prop: 'account',
                                type:'text',
                                labelPosition:'top'
                            },{
                                label: "是否含有外币",
                                prop: "sex",
                                labelPosition:'top',
                                type: "radio",
                                dicData: DIC.SEX,
                                mock:{
                                    type:'dic'
                                },
                                change:({value,column})=>{
                                    console.log(column)
                                    this.$message.success('change')
                                }
                            },{
                                label: "预算金额",
                                prop: "sex",
                                labelPosition:'top',
                                type: "radio",
                                dicData: DIC.Amount,
                                mock:{
                                    type:'dic'
                                },
                                change:({value,column})=>{
                                    this.$message.success('change')
                                }
                            },{
                                label: "是否备用金",
                                prop: "sex",
                                labelPosition:'top',
                                type: "radio",
                                row:true,
                                dicData: DIC.Imprest,
                                mock:{
                                    type:'dic'
                                },
                                change:({value,column})=>{
                                    this.$message.success('change')
                                }
                            },{
                                label: "核销状态",
                                prop: "sex",
                                labelPosition:'top',
                                type:'text'
                            }
                        ]
                    }, {
                        label: '详情说明',
                        prop: 'tksq',

                        column: [
                            {
                                label: '报销事由',
                                prop: 'bxsy',
                                type: 'textarea',
                                labelPosition:'top',
                                span: 24
                            },{
                                label: '详情清单（仅支持多类目清单，不得传发票）',
                                prop: 'imgUrl',
                                type: 'upload',
                                loadText: '附件上传中，请稍等',
                                span: 24,
                                labelPosition:'top',
                                propsHttp: {
                                    res: 'data'
                                },
                                tip: '单个文件不超过10M',
                                action: '/imgupload'
                            },{
                                label:'汇总表',
                                prop:'hzb',

                                labelPosition:'top',
                                type:'dynamic',
                                span:24,
                                children:{
                                    column:[
                                        {
                                            label:'序号',
                                            prop:'ziIndex',
                                        },{
                                            label:'费用项目',
                                            prop:'ziIndex',
                                        },{
                                            label:'费用子项',
                                            prop:'ziIndex',
                                        },{
                                            label:'合计',
                                            prop:'ziIndex',
                                        }
                                    ]
                                }
                            },{
                                label:'费用详情',
                                prop:'fyxq',

                                labelPosition:'top',
                                type:'dynamic',
                                span:24,
                                children:{
                                    column:[
                                        {
                                            label: '上传发票',
                                            prop: "scfp",
                                            type: 'upload',
                                            loadText: '附件上传中，请稍等',
                                            span: 24,
                                            labelPosition:'top',
                                            propsHttp: {
                                                res: 'data'
                                            },
                                            //tip: '单个文件不超过10M',
                                            action: '/imgupload',
                                            width:150
                                        },{
                                            label: '发生日期',
                                            prop: "scTime",
                                            type: 'date',
                                            width:110
                                        },{
                                            label: '结束日期',
                                            prop: "jsTime",
                                            type: 'date',
                                            width:110
                                        },{
                                            label: '费用项目',
                                            prop: "jsTime",
                                            type: 'text',
                                            width:150,
                                            maxlength: 3,
                                            suffixIcon: 'el-icon-tickets',
                                            prefixIcon: 'el-icon-tickets',
                                            minlength: 2,
                                            rules: [{
                                                required: true,
                                                message: "请选择通用类型",
                                                trigger: "blur"
                                            }],
                                            click:({value,column})=>{
                                                this.$message.success('click')
                                            },
                                        },{
                                            label: '承担部门',
                                            prop: "jsTime",
                                            type: 'text',
                                            width:110,
                                            maxlength: 3,
                                            suffixIcon: 'el-icon-tickets',
                                            prefixIcon: 'el-icon-tickets',
                                            minlength: 2,
                                            rules: [{
                                                required: true,
                                                message: "请选择通用类型",
                                                trigger: "blur"
                                            }],
                                            click:({value,column})=>{
                                                this.$message.success('click')
                                            },
                                        },{
                                            label:'是否为专票',
                                            prop:'sfwzp',
                                            type:'select',
                                            width:110,
                                            dicData: [{
                                                value: '0',
                                                label: '是'
                                            }, {
                                                value: '1',
                                                label: '否'
                                            }]
                                        },{
                                            label:'不含税金额',
                                            prop:'bhsje',
                                            width:110
                                        },{
                                            label:'税率',
                                            prop:'sl',
                                            width:110
                                        },{
                                            label:'税额',
                                            prop:'se',
                                            width:110
                                        },{
                                            label:'小计',
                                            prop:'xj',
                                            width:110
                                        },{
                                            label:'其他说明',
                                            prop:'bhsje',
                                            width:150
                                        },{
                                            label:'其他附件',
                                            prop:'bhsje',
                                            type: 'upload',
                                            loadText: '附件上传中，请稍等',
                                            span: 24,
                                            labelPosition:'top',
                                            propsHttp: {
                                                res: 'data'
                                            },
                                            //tip: '单个文件不超过10M',
                                            action: '/imgupload',
                                            width:180
                                        },{
                                            label:'发票编码',
                                            prop:'fpbm',
                                            width:110
                                        }
                                    ]
                                }
                            }
                        ]
                    }, {
                        label: '付款信息',
                        prop: 'fkxx',

                        collapse:false,
                        column: [
                            {
                                label: '合计总金额',
                                prop: 'len',
                                labelPosition:'top'
                            }, {
                                label: '金额大写',
                                prop: 'names',
                                labelPosition:'top',
                            }, {
                                label: '合计税额',
                                prop: 'names',
                                labelPosition:'top',
                                span:24
                            }, {
                                label: '实付金额',
                                prop: 'names',
                                labelPosition:'top',
                                span:24
                            }, {
                                label: '付款组织',
                                prop: 'names',
                                labelPosition:'top',
                                type:'select',
                                dicData: [{
                                    value: '0',
                                    label: '杭州遥望网络科技有限公司'
                                }]
                            }, {
                                label: '付款账号',
                                prop: 'names',
                                labelPosition:'top',
                                type:'select',
                                dicData: [{
                                    value: '0',
                                    label: '123444445466'
                                }]
                            }, {
                                label: '付款方式',
                                prop: 'names',
                                labelPosition:'top',
                                type:'select',
                                span:24,
                                dicData: [{
                                    value: '0',
                                    label: '杭州银行资管平台'
                                }]
                            },{
                                label:'报销人',
                                prop:'bxName',
                                labelPosition:'top',
                            }
                        ]
                    }, {
                        label: '流程',
                        prop: 'fkxx',

                        collapse:false,
                        column: [
                            {
                                label: '抄送人',
                                prop: 'len',
                                labelPosition:'top',
                                span:24
                            }, {
                                label: '主管',
                                prop: 'names',
                                labelPosition:'top',
                                span:24
                            }, {
                                label: '会计',
                                prop: 'names',
                                labelPosition:'top',
                                span:24
                            }, {
                                label: '经理',
                                prop: 'names',
                                labelPosition:'top',
                                span:24
                            }
                        ]
                    }
                ]
            }
        }
    },
    created(){
        this.option1 = Object.assign(this.deepClone(this.option),{
            card:true
        })
    },
    mounted() {
        setTimeout(() => {
            let ti = new Date()
            let tiem = ti.getFullYear() + '-'+ (ti.getMonth()+1<10?'0'+(ti.getMonth()+1):(ti.getMonth()+1)) + '-'+ ti.getDate()+ ' '+ (ti.getHours()<10?'0'+ti.getHours():ti.getHours())+':'+(ti.getMinutes()<10?'0'+ti.getMinutes():ti.getMinutes())+':'+(ti.getSeconds()<10?'0'+ti.getSeconds():ti.getSeconds());
            this.obj = {
                lsh: '系统自动生成',
                date:tiem
            }
        }, 100)
    },
    methods: {
        handleSubmit(form){
            this.$message.success(JSON.stringify(this.form))
        },
        uploadBefore(file, done, loading,column) {
            console.log(file,column)
            //如果你想修改file文件,由于上传的file是只读文件，必须复制新的file才可以修改名字，完后赋值到done函数里,如果不修改的话直接写done()即可
            var newFile = new File([file], '1234', { type: file.type });
            done(newFile)
            this.$message.success('上传前的方法')
        },
        uploadAfter(res, done, loading,column) {
            console.log(res,column)
            done()
            this.$message.success('上传后的方法')
        },
        uploadPreview(file,column,done){
            console.log(file,column)
            done()//默认执行打开方法
            this.$message.success('自定义查看方法,查看控制台')
        },
    }
};
</script>

<style>
  .el-input__inner{
    //border: none;
  }
</style>
