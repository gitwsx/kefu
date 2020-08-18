<!--<template>-->
  <!--<basic-container>-->
    <!--<h3>请打开浏览器控制台，然后点击下面的按钮</h3>-->
    <!--<el-button type="danger"-->
               <!--size="small"-->
               <!--@click="handleNewError">触发一个错误</el-button>-->
  <!--</basic-container>-->
<!--</template>-->
<template>
  <basic-container>
    <el-button @click="handle"  style="margin-left: 20px">编 辑</el-button>
    <avue-form  :option="option" v-model="obj" @submit="submit"></avue-form>

  </basic-container>
</template>

<script>
    export default {
        data() {
            return {
                type: 0,
                obj: {},
                option: {

                    //detail:false,
                    group: [
                        {
                            label: '用户信息',
                            prop: 'group',
                            collapse:false,
                            arrow:true,
                            menuBtn:true,
                            menuPosition:'center',
                            icon: 'el-icon-edit-outline',
                            column: [
                                {
                                    label: '姓名',
                                    prop: 'name',
                                    detail:true,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入姓名',
                                            trigger: 'blur'
                                        }
                                    ]
                                }
                            ]
                        }, {
                            label: '退款申请',
                            prop: 'group1',
                            collapse:false,
                            icon: 'el-icon-view',
                            column: [
                                {
                                    label: '省份',
                                    prop: 'province',
                                    type: 'select',
                                    props: {
                                        label: 'name',
                                        value: 'code'
                                    },
                                    dicUrl: `https://cli.avuejs.com/api/area/getProvince`,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择省份',
                                            trigger: 'blur'
                                        }
                                    ]
                                },
                                {
                                    label: '多选',
                                    prop: 'checkbox',
                                    type: 'checkbox',
                                    props: {
                                        label: 'name',
                                        value: 'code'
                                    },
                                    span: 24,
                                    dicUrl: 'https://cli.avuejs.com/api/area/getProvince'
                                }
                            ]
                        }
                        , {
                            label: '用户信息',
                            prop: 'group2',
                            collapse:false,
                            icon: 'el-icon-edit-outline',
                            column: [
                                {
                                    label: '测试长度',
                                    prop: 'len',
                                    maxlength: 5,
                                }, {
                                    label: '测试自定义',
                                    prop: 'names',
                                    formslot: true
                                }
                            ]
                        }
                    ]
                }
            }
        },
        mounted() {
            setTimeout(() => {
                this.obj = {
                    name: 'small',
                    province: '110000',
                    checkbox: ['110000']
                }
            }, 100)
        },
        methods: {
            handle() {
                if(this.type===1){
                    this.option.detail=true;
                }else{
                    this.option.detail=false;
                }

            },
            submit() {
                this.$message.success(JSON.stringify(this.obj))
            }
        }
    }
</script>

<!--<script>-->
<!--export default {-->
  <!--methods: {-->
    <!--handleNewError() {-->
      <!--console.log(a); // eslint-disable-line-->
    <!--}-->
  <!--}-->
<!--};-->
<!--</script>-->