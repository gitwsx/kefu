import Mock from 'mockjs'

const top = [
  {
    label: "首页",
    path: "/wel/index",
    icon: 'el-icon-document',
    meta: {
      i18n: '首页',
    },
    parentId: 0
  }
]
const first = [
    // {
    //     label: "出货异常明细表",
    //     path: '/jstSalOut',
    //     component: 'views/jstkingdee/jstSalOutBill',
    //     icon: 'icon-caidan',
    //     children: []
    // }, {
    //     label: "出货汇总核对表",
    //     path: '/jstInvoiceBill',
    //     component: 'views/jstkingdee/jstInvoiceBill',
    //     icon: 'icon-caidan',
    //     children: []
    // },
    // {
    //     label: "退货异常明细表",
    //     path: '/jstCheckRpt',
    //     component: 'views/jstkingdee/jstCheckRpt',
    //     icon: 'icon-caidan',
    //     children: []
    // },{
    //     label: "退货汇总核对表",
    //     path: '/jstOutBill',
    //     component: 'views/jstkingdee/jstOutBill',
    //     icon: 'icon-caidan',
    //     children: []
    // },
    {
        label:'电商平台',
        path:"/electricity",
        component:"views/jstkingdee/electricity",
        icon: 'icon-caidan',
        children: []
    },{
        label:'仓库管理',
        path:'/warehouse',
        component:'views/jstkingdee/warehouse',
        icon:'icon-caidan',
        children:[]
    },{
        label:'供应商管理',
        path:'/supplier',
        component:'views/jstkingdee/supplier',
        icon:'icon-caidan',
        children:[]
    }
    // {
    //     label:'商品信息',
    //     path:"/product",
    //     component:"views/jstkingdee/product",
    //     icon: 'icon-caidan',
    //     children: []
    // }
]
const second = []
const third = [{
  label: "测试页面",
  path: '/test',
  component: 'views/test',
  icon: 'icon-caidan',
  meta: {
    i18n: 'test',
  },
  children: []
}]
export default ({ mock }) => {
  if (!mock) return;
  let menu = [first, second, third];
  Mock.mock('/user/getMenu', 'get', (res) => {
    let body = JSON.parse(res.body);
    return {
      data: menu[body.type] || []
    }
  })
  Mock.mock('/user/getTopMenu', 'get', () => {
    return {
      data: top
    }
  })

}