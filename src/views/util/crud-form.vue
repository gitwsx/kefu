
    <avue-form  :option="option" v-model="obj" @submit="submit"></avue-form>



<script>
    export default {
        computed: {
            title() {
                return this.type === 0 ? '编 辑' : '保 存'
            }
        },
        data() {
            return {
                type: 0,
                obj: {},
                option: {
                    detail:false,
                    group: [
                        {
                            label: '用户信息',
                            prop: 'jbxx',
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
                            prop: 'tksq',
                            icon: 'el-icon-view',
                            column: [
                                {
                                    label: '多选',
                                    prop: 'checkbox',
                                    type: 'checkbox',
                                    props: {
                                        label: 'name',
                                        value: 'code'
                                    },
                                    span: 24
                                }
                            ]
                        }
                        , {
                            label: '用户信息',
                            prop: 'yhxx',
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
                this.type = 1;
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

<style>
</style>
