import { setToken, removeToken } from '@/util/auth'
import { setStore, getStore } from '@/util/store'
import { isURL, validatenull } from '@/util/validate'
import { encryption, deepClone } from '@/util/util'
import webiste from '@/config/website'
import request from '@/router/axios';
import { domainUrl } from '@/config/env';
import { loginByUsername, getUserInfo, getMenu, getTopMenu, logout, refeshToken } from '@/api/user'
import Cookie from 'js-cookie'

function addPath (ele, first) {
  const menu = webiste.menu;
  const propsConfig = menu.props;
  const propsDefault = {
    label: propsConfig.label || 'label',
    path: propsConfig.path || 'path',
    icon: propsConfig.icon || 'icon',
    children: propsConfig.children || 'children'
  }
  const icon = ele[propsDefault.icon];
  ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
  const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
  if (isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path].replace(/&/g, "$")
  }
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + '/index'
  } else {
    ele[propsDefault.children] && ele[propsDefault.children].forEach(child => {
      if (!isURL(child[propsDefault.path])) {
        child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path] ? child[propsDefault.path] : 'index'}`
      }
      addPath(child);
    })
  }

}
let useranme = "";
const user = {
  state: {
    userInfo: {},
    permission: {},
    roles: [],
    menuId: getStore({ name: 'menuId' }) || [],
    menu: getStore({ name: 'menu' }) || [],
    menuAll: getStore({ name: 'menuAll' }) || [],
    token: getStore({ name: 'token' }) || '',
  },

  actions: {
    //根据用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const user = encryption({
        data: userInfo,
        type: 'Aes',
        key: 'avue',
        param: ['useranme', 'password']
      });
        //useranme = userInfo.username;
      return new Promise((resolve) => {
        loginByUsername(user.username, user.password, userInfo.code, userInfo.redomStr).then(res => {
          const data = res.data.data;
          commit('SET_TOKEN', data);
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          resolve();
        })
      })
    },
    //根据手机号登录
    LoginByPhone ({ commit }, userInfo) {
      return new Promise((resolve) => {
        loginByUsername(userInfo.phone, userInfo.code).then(res => {
          const data = res.data.data;
          commit('SET_TOKEN', data);
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          resolve();
        })
      })
    },
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res) => {
          let data = res.data.data;
            if(Cookie.get('token') != undefined){
                const obj = JSON.parse(Cookie.get('token'))
                data.userInfo.username = obj.name;
                data.roles = obj.name;
            }
          commit('SET_USERIFNO', data.userInfo);
          commit('SET_ROLES', data.roles);
          commit('SET_PERMISSION', data.permission)
          resolve(data);
        }).catch(err => {
          reject(err);
        })
      })
    },
    //刷新token
    RefeshToken ({ state, commit }) {
      return new Promise((resolve, reject) => {
        refeshToken(state.refeshToken).then(res => {
          const data = res.data.data;
          commit('SET_TOKEN', data);
          resolve(data);
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_MENUID', {})
          commit('SET_MENUALL', []);
          commit('SET_MENU', [])
          commit('SET_ROLES', [])
          commit('DEL_ALL_TAG');
          commit('CLEAR_LOCK');
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //注销session
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_MENUID', {})
        commit('SET_MENUALL', []);
        commit('SET_MENU', [])
        commit('SET_ROLES', [])
        commit('DEL_ALL_TAG');
        commit('CLEAR_LOCK');
        removeToken()
        resolve()
      })
    },
    GetTopMenu () {
      return new Promise(resolve => {
        getTopMenu().then((res) => {
          const data = res.data.data || []
          resolve(data)
        })
      })
    },
    //获取系统菜单

    GetMenu ({ commit }, parentId) {
		let name = "";
		let obj = {}
		let arr = [];
		  if(Cookie.get('token') != undefined){
		      obj = JSON.parse(Cookie.get('token'))
				//console.log(obj,222222222222222)
		      useranme = obj.name;
		  }
		  //roleid  1表示 管理员， 2  表示 员工  3 表示 客户
		  if(obj.roleid == 1){
			arr = [
				 {
					label:"工单系统",
					path:"/workOrdeSystem",
					icon:'iconfont iconcategory',
					children:[
						{
							children: [],
							component: "views/jstkingdee/history",
							icon: "iconfont iconcategory",
							label: "未完成工单",
							path: "/history"
						},
						{
							label:'已完成工单',
							path:'/workOrder',
							component:'views/jstkingdee/workOrder',
							icon:'iconfont iconcategory',
							children:[]
						},
						{
							label: '工单信息',
							path: '/addWork',
							component:  'views/jstkingdee/addWork',
							icon: "iconfont iconcategory",
							id: 2,
							children: [],
						},
					]
				},
				{
					label:"计划系统",
					path:"/weeklyPlanningSystem",
					icon:'iconfont iconcategory',
					children:[
						{
							children:[],
							component:"views/jstkingdee/weeklyPlan",
							icon:"iconfont iconcategory",
							id:15,
							label:"周计划",
							path:"/weeklyPlan"
						},
						{
							children:[],
							component:"views/jstkingdee/addWeeklyPlan",
							icon:"iconfont iconcategory",
							id:16,
							label:"周计划信息",
							path:"/addWeeklyPlan"
						},
						{
							children:[],
							component:"views/jstkingdee/projectPlanList",
							icon:"iconfont iconcategory",
							id:16,
							label:"项目计划",
							path:"/projectPlanList"
						},
						{
							children:[],
							component:"views/jstkingdee/addProjectPlan",
							icon:"iconfont iconcategory",
							id:16,
							label:"项目信息",
							path:"/addProjectPlan"
						}
					]
				},
				{
					label:'日程管理',
					path:'/scheduleProject',
					icon:'iconfont iconcategory',
					children:[
						{
							children:[],
							component:"views/jstkingdee/schedule",
							icon:"iconfont iconcategory",
							id:15,
							label:"日程",
							path:"/schedule"
						},
					]
				},
				{
					label:"客户信息",
					path:"/clientSystem",
					icon:'iconfont iconcategory',
					children:[
						{
							children:[],
							component:"views/jstkingdee/warehouse",
							icon:"iconfont iconcategory",
							id:16,
							label:"客户账号管理",
							path:"/clientAccount"
						},
						{
							children:[],
							component:"views/jstkingdee/customer",
							icon:"iconfont iconcategory",
							id:16,
							label:"客户公众号信息",
							path:"/customer"
						},
					]
				},
				{
					label:"系统设置",
					path:"/system",
					icon:'iconfont iconcategory',
					children:[
						{
							children:[],
							component:"views/jstkingdee/account",
							icon:"iconfont iconcategory",
							id:16,
							label:"账号管理",
							path:"/account"
						},
						{
							children:[],
							component:"views/jstkingdee/projectList",
							icon:"iconfont iconcategory",
							id:16,
							label:"项目管理",
							path:"/projectList"
						}
					]
				},
				{
					label:"需求系统",
					path:"/demandSystem",
					icon:'iconfont iconcategory',
					children:[
						{
							children:[],
							component:"views/jstkingdee/demandList",
							icon:"iconfont iconcategory",
							id:16,
							label:"需求列表",
							path:"/demandList"
						},
						{
							children:[],
							component:"views/jstkingdee/demand",
							icon:"iconfont iconcategory",
							id:16,
							label:"需求信息",
							path:"/demand"
						},
					]
				}
			 ]  
		  }else if(obj.roleid == 2){
			  arr = [
				  {
				  	label:"工单系统",
				  	path:"/workOrdeSystem",
				  	icon:'iconfont iconcategory',
				  	children:[
				  		{
				  			children: [],
				  			component: "views/jstkingdee/history",
				  			icon: "iconfont iconcategory",
				  			label: "未完成工单",
				  			path: "/history"
				  		},
				  		{
				  			label:'已完成工单',
				  			path:'/workOrder',
				  			component:'views/jstkingdee/workOrder',
				  			icon:'iconfont iconcategory',
				  			children:[]
				  		},
				  		{
				  			label: '工单信息',
				  			path: '/addWork',
				  			component:  'views/jstkingdee/addWork',
				  			icon: "iconfont iconcategory",
				  			id: 2,
				  			children: [],
				  		},
				  	]
				  },
				  {
				  	label:"计划系统",
				  	path:"/weeklyPlanningSystem",
				  	icon:'iconfont iconcategory',
				  	children:[
				  		{
				  			children:[],
				  			component:"views/jstkingdee/weeklyPlan",
				  			icon:"iconfont iconcategory",
				  			id:15,
				  			label:"周计划",
				  			path:"/weeklyPlan"
				  		},
				  		{
				  			children:[],
				  			component:"views/jstkingdee/addWeeklyPlan",
				  			icon:"iconfont iconcategory",
				  			id:16,
				  			label:"周计划信息",
				  			path:"/addWeeklyPlan"
				  		},
						{
							children:[],
							component:"views/jstkingdee/projectPlanList",
							icon:"iconfont iconcategory",
							id:16,
							label:"项目计划",
							path:"/projectPlanList"
						},
						{
							children:[],
							component:"views/jstkingdee/addProjectPlan",
							icon:"iconfont iconcategory",
							id:16,
							label:"项目信息",
							path:"/addProjectPlan"
						}
				  	]
				  },
				  {
				  	label:'日程管理',
				  	path:'/scheduleProject',
				  	icon:'iconfont iconcategory',
				  	children:[
				  		{
				  			children:[],
				  			component:"views/jstkingdee/schedule",
				  			icon:"iconfont iconcategory",
				  			id:15,
				  			label:"日程",
				  			path:"/schedule"
				  		},
				  	]
				  },
				  {
				  	label:"客户信息",
				  	path:"/clientSystem",
				  	icon:'iconfont iconcategory',
				  	children:[
				  		{
				  			children:[],
				  			component:"views/jstkingdee/customer",
				  			icon:"iconfont iconcategory",
				  			id:16,
				  			label:"客户公众号信息",
				  			path:"/customer"
				  		},
				  	]
				  },
				  {
				  	label:"系统设置",
				  	path:"/system",
				  	icon:'iconfont iconcategory',
				  	children:[
				  		{
				  			children:[],
				  			component:"views/jstkingdee/projectList",
				  			icon:"iconfont iconcategory",
				  			id:16,
				  			label:"项目管理",
				  			path:"/projectList"
				  		}
				  	]
				  },
			  ]
		  }else if(obj.roleid == 3){
			  arr = [
				{
					label:"工单系统",
					path:"/workOrdeSystem",
					icon:'iconfont iconcategory',
					children:[
						{
							children: [],
							component: "views/jstkingdee/history",
							icon: "iconfont iconcategory",
							label: "未完成工单",
							path: "/history"
						},
						{
							label:'已完成工单',
							path:'/workOrder',
							component:'views/jstkingdee/workOrder',
							icon:'iconfont iconcategory',
							children:[]
						},
						{
							label: '工单信息',
							path: '/addWork',
							component:  'views/jstkingdee/addWork',
							icon: "iconfont iconcategory",
							id: 2,
							children: [],
						},
					]
				},
				  {
				  	label:'日程管理',
				  	path:'/scheduleProject',
				  	icon:'iconfont iconcategory',
				  	children:[
				  		{
				  			children:[],
				  			component:"views/jstkingdee/schedule",
				  			icon:"iconfont iconcategory",
				  			id:15,
				  			label:"日程",
				  			path:"/schedule"
				  		},
				  	]
				  },
			  ]
		  }


        return new Promise(resolve => {
            getMenu(parentId).then((res) => {
				const data = arr;
                //const data = res.data.data;
                let menu = deepClone(data);
                menu.forEach(ele => {
                    addPath(ele, true);
                })
                commit('SET_MENU', menu)
                resolve(menu)
            })
        })
  //     return new Promise(resolve => {
  //         getMenu(parentId).then((res) => {
  //             let login = request({
  //                 url:domainUrl + '/getMenu?uname=' + useranme,
  //                 method:'get'
  //             })
  //             login.then(ress => {
		
  //                 const data = ress.data.datas;
		// 		  //console.log(data,222222222222)
  //                 let menu = deepClone(data);
  //                 menu.forEach(ele => {
  //                     addPath(ele, true);
  //                 })
  //                 commit('SET_MENU', menu)
  //                 resolve(menu)
  //             })
  //             //const data = res.data.data;
  //         })
  //         getUserInfo().then((res) =>{
  //          name = res.data.data.userInfo.username;
  //         })

  //     })
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token;
      setStore({ name: 'token', content: state.token, type: 'session' })
    },
    SET_MENUID (state, menuId) {
      state.menuId = menuId;
      setStore({ name: 'menuId', content: state.menuId, type: 'session' })
    },
    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_MENUALL: (state, menuAll) => {
      state.menuAll = menuAll
      setStore({ name: 'menuAll', content: state.menuAll, type: 'session' })
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      let menuAll = state.menuAll;
      if (!validatenull(menu)) {
        const obj = menuAll.filter(ele => ele.path === menu[0].path)[0]
        if (!obj) {
          menuAll = menuAll.concat(menu);
          state.menuAll = menuAll
        }
        setStore({ name: 'menuAll', content: state.menuAll, type: 'session' })
      }
      setStore({ name: 'menu', content: state.menu, type: 'session' })
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = {};
      permission.forEach(ele => {
        state.permission[ele] = true;
      });
    }
  }

}
export default user