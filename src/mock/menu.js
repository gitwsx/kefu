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
    {
        label: "出货异常明细表",
        path: '/jstSalOut',
        component: 'views/jstkingdee/jstSalOutBill',
        icon: 'icon-caidan',
        children: []
    }, {
        label: "出货汇总核对表",
        path: '/jstInvoiceBill',
        component: 'views/jstkingdee/jstInvoiceBill',
        icon: 'icon-caidan',
        children: []
    },
    {
        label: "退货异常明细表",
        path: '/jstCheckRpt',
        component: 'views/jstkingdee/jstCheckRpt',
        icon: 'icon-caidan',
        children: []
    },{
        label: "退货汇总核对表",
        path: '/jstOutBill',
        component: 'views/jstkingdee/jstOutBill',
        icon: 'icon-caidan',
        children: []
    },{
        label:'电商平台',
        path:"/electricity",
        component:"views/jstkingdee/electricity",
        icon: 'icon-caidan',
        children: []
    },{
        label:'商品信息',
        path:"/product",
        component:"views/jstkingdee/product",
        icon: 'icon-caidan',
        children: []
    }
  // {
  //   label: "聚水潭单据管理",
  //   path: '/totaltable',
  //   icon: 'icon-caidan',
  //     redirect:'/jstSalOut',
  //   children: [
  //    {
  //     label: "出货异常明细表",
  //     path: '/jstSalOut',
  //     component: 'views/jstkingdee/jstSalOutBill',
  //        //component:'/wel/index',
  //     icon: 'icon-caidan',
  //     children: []
  //   }, {
  //     label: "出货汇总核对表",
  //     path: '/jstInvoiceBill',
  //     component: 'views/jstkingdee/jstInvoiceBill',
  //     icon: 'icon-caidan',
  //     children: []
  //   },
  //   {
  //     label: "退货异常明细表",
  //     path: '/jstCheckRpt',
  //     component: 'views/jstkingdee/jstCheckRpt',
  //     icon: 'icon-caidan',
  //     children: []
  //   },{
  //     label: "退货汇总核对表",
  //      path: '/jstOutBill',
  //      component: 'views/jstkingdee/jstOutBill',
  //      icon: 'icon-caidan',
  //      children: []
  //   }
  //  ]
  // },
//   {
//     label: "基础资料映射",
//     path: '/baseInfo',
//     icon: 'icon-caidan',
//     children: [{
//       label: "店铺",
//       path: '/shopmapping',
//       component: 'views/baseInfo/shopmapping',
//       icon: 'icon-caidan',
//       children: []
//     }, {
//       label: "物料映射",
//       path: '/materialMapping',
//       component: 'views/baseInfo/materialMapping',
//       icon: 'icon-caidan',
//       children: []
//     },
//     {
//       label: "仓库映射",
//       path: '/warehouseMapping',
//       component: 'views/baseInfo/warehouseMapping',
//       icon: 'icon-caidan',
//       children: []
//     }]
//   },
//   {
//     label: "系统设置",
//     path: '/totaltable',
//     icon: 'icon-caidan',
//     children: [{
//       label: "定时设置",
//       path: '/jstSalOut',
//       component: 'views/jstkingdee/jstSalOutBill',
//       icon: 'icon-caidan',
//       children: []
//     }, {
//       label: "传输参数设置",
//       path: '/jstInvoiceBill',
//       component: 'views/jstkingdee/jstInvoiceBill',
//       icon: 'icon-caidan',
//       children: []
//     },
//      {
//       label: "邮件设置",
//       path: '/jstInvoiceBill',
//       component: 'views/jstkingdee/jstInvoiceBill',
//       icon: 'icon-caidan',
//       children: []
//     }]
//   },
//   {
//   label: "缓冲",
//   path: '/cache',
//   component: 'views/util/cache',
//   icon: 'icon-caidan',
//   meta: {
//     // i18n: 'cache',
//     keepAlive: true
//   },
//   children: []
// }, {
//   label: "标签",
//   path: '/tags',
//   component: 'views/util/tags',
//   icon: 'icon-caidan',
//   meta: {
//     i18n: 'tags',
//   },
//   children: []
// }, {
//   label: "存储",
//   path: '/store',
//   component: 'views/util/store',
//   icon: 'icon-caidan',
//   meta: {
//     i18n: 'store',
//   },
//   children: []
// }, {
//   label: "全局函数",
//   path: 'https://avuejs.com/doc/api?test1=1&test2=2',
//   icon: 'icon-caidan',
//   meta: {
//     i18n: 'api',
//   }
// }, {
//   label: "日志监控",
//   path: '/logs',
//   component: 'views/util/logs',
//   icon: 'icon-caidan',
//   meta: {
//     i18n: 'logs',
//   },
//   children: []
// },
//
// {
//   label: "表格",
//   path: '/table',
//   component: 'views/util/table',
//   icon: 'icon-caidan',
//   meta: {
//     i18n: 'table',
//   },
//   children: []
// },
// {
//   label: "表单",
//   path: '/form',
//   component: 'views/util/form',
//   icon: 'icon-caidan',
//   meta: {
//     i18n: 'form'
//   },
//   children: []
// }, {
//   label: "权限",
//   path: '/permission',
//   component: 'views/util/permission',
//   icon: 'icon-caidan',
//   meta: {
//     i18n: 'permission',
//   },
//   children: []
// }, {
//   label: "返回顶部",
//   path: '/top',
//   component: 'views/util/top',
//   icon: 'icon-caidan',
//   meta: {
//     i18n: 'top',
//   },
//   children: []
// }, {
//   label: "表格表单",
//   path: '/crud-form',
//   component: 'views/util/crud-form',
//   icon: 'icon-caidan',
//   meta: {
//     i18n: 'crudForm',
//   },
//   children: []
// }, {
//   label: "图钉",
//   path: '/affix',
//   component: 'views/util/affix',
//   icon: 'icon-caidan',
//   meta: {
//     i18n: 'affix',
//   },
//   children: []
// }, {
//   label: "异常页",
//   path: '/error',
//   meta: {
//     i18n: 'error',
//   },
//   icon: 'icon-caidan',
//   children: [{
//     label: "403",
//     path: 'error',
//     component: 'components/error-page/403',
//     icon: 'icon-caidan',
//     children: []
//   }, {
//     label: "404",
//     path: '404',
//     component: 'components/error-page/404',
//     icon: 'icon-caidan',
//     children: []
//   }, {
//     label: "500",
//     path: '500',
//     component: 'components/error-page/500',
//     icon: 'icon-caidan',
//     children: []
//   }]
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