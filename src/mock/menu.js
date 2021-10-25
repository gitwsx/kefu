import Mock from 'mockjs'
import { loginByUsername, getUserInfo, getMenu, getTopMenu, logout, refeshToken } from '@/api/user'
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
        children: [],
        component: "views/jstkingdee/history",
        icon: "icon-caidan",
        label: "未完成工单",
        path: "/history"
    },
    {
        label:'已完成工单',
        path:'/workOrder',
        component:'views/jstkingdee/workOrder',
        icon:'icon-caidan',
        children:[]
    },
    {
        label: '工单信息',
        path: '/addWork',
        component:  'views/jstkingdee/addWork',
        icon: "icon-caidan",
        id: 2,
        children: [],
    },
	{
	    label: '周计划',
	    path: '/weeklyPlan',
	    component:  'views/jstkingdee/weeklyPlan',
	    icon: "icon-caidan",
	    id: 2,
	    children: [],
	},
	{
	    label: '项目信息',
	    path: '/projectList',
	    component:  'views/jstkingdee/projectList',
	    icon: "icon-caidan",
	    id: 2,
	    children: [],
	}
    // {
    //     label:'新增工单',
    //     path:"/addWork",
    //     component:"@/views/jstkingdee/addWork",
    //     icon: 'icon-caidan',
    //     children: []
    // },
    // {
    //     label:'客户账号管理',
    //     path:'/clientAccount',
    //     component:'views/jstkingdee/warehouse',
    //     icon:'icon-caidan',
    //     children:[]
    // }
	// {
	// 	label:"工单系统",
	// 	path:"/workOrdeSystem",
	// 	icon:'icon-caidan',
	// 	children:[
	// 		{
	// 		    children: [],
	// 		    component: "views/jstkingdee/workOrdeSystem/history",
	// 		    icon: "icon-caidan",
	// 		    label: "未完成工单",
	// 		    path: "/history"
	// 		},
	// 		{
	// 		    label:'已完成工单',
	// 		    path:'/workOrder',
	// 		    component:'views/jstkingdee/workOrdeSystem/workOrder',
	// 		    icon:'icon-caidan',
	// 		    children:[]
	// 		},
	// 		{
	// 		    label: '工单信息',
	// 		    path: '/addWork',
	// 		    component:  'views/jstkingdee/workOrdeSystem/addWork',
	// 		    icon: "icon-caidan",
	// 		    id: 2,
	// 		    children: [],
	// 		},
	// 	]
	// },
	// {
	// 	label:"周计划系统",
	// 	path:"/weeklyPlanningSystem",
	// 	icon:'icon-caidan',
	// 	children:[
	// 		{
	// 		    label: '周计划',
	// 		    path: '/weeklyPlan',
	// 		    component:  'views/jstkingdee/weeklyPlanningSystem/weeklyPlan',
	// 		    icon: "icon-caidan",
	// 		    children: [],
	// 		},
	// 		{
	// 		    label: '周计划',
	// 		    path: '/weeklyPlan',
	// 		    component:  'views/jstkingdee/weeklyPlanningSystem/addWeeklyPlan',
	// 		    icon: "icon-caidan",
	// 		    children: [],
	// 		}
	// 	]
	// },
	// {
	// 	label:"客户系统"，,
	// 	path:"/clientSystem",
	// 	icon:'icon-caidan',
	// 	children:[
	// 		{
	// 			label:"客户账号管理",
	// 			paht:"/clientAccount",
	// 			component:  'views/jstkingdee/clientSystem/warehouse',
	// 			icon: "icon-caidan",
	// 			children: [],
	// 		}
	// 	]
	// },
]
const second = []
const third = []
export default ({ mock }) => {  if (!mock) return;
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