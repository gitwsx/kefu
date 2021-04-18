/**
 * 全局配置文件
 */
export default {
  title: "Avue",
  logo: "A",
  key: 'avue',//配置主键,目前用于存储
  indexTitle: '管易接口平台',
  lockPage: '/lock',
  tokenTime: 6000,
  //http的status默认放行不才用统一处理的,
  statusWhiteList: [400],
  //配置首页不可关闭
  isFirstPage: false,
  fistPage: {
    label: "首页",
    value: "/wel/index",
      //value:'views/jstkingdee/jstSalOutBill',
    params: {},
    query: {},
    meta: {
      i18n: '首页'
    },
    group: [],
    close: false
  },
  //配置菜单的属性
  menu: {
    iconDefault: 'icon-caidan',
    props: {
      label: 'label',
      path: 'path',
      icon: 'icon',
      children: 'children'
    }
  }
}