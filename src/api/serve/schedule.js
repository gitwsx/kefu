import request from '@/router/axios'
import { baseUrl } from '@/config/env';
import { domainUrl } from '@/config/env';


// 获取员工列表
export function listUser() {
  return request({
    url:domainUrl + '/findUsers',
    method: 'GET',
    header: { 'content-Type': 'application/json' },

  })
}

//获取项目列表
export function listProject() {
  return request({
    url:domainUrl + '/queryAllPro',
    method: 'GET',
    header: { 'content-Type': 'application/json' },

  })
}
// 获取客户列表
export function listCustomer(data) {
  return request({
    url: domainUrl + '/custList',
    data:data,
    method: 'post'
  })
}

// 获取待办列表
export function listPending(data) {
  return request({
    url: domainUrl + '/taskList',
    data:data,
    method: 'post'
  })
}

//删除日程
export function delSchedule(data){
	return request({
		url:domainUrl + '/delSchedule?id=' +data,
		method: 'GET',
		header: { 'content-Type': 'application/json' },
	})
}

//单个删除待办
export function delTask(data){
	return request({
		url:domainUrl + '/delTask?id=' +data,
		method: 'GET',
		header: { 'content-Type': 'application/json' },
	})
}

//批量删除待办
export function deleteByBatch(data){
	return request({
		url:domainUrl + '/deleteByBatch',
		data:data,
		method: 'post'
	})
}

//新增日程
export function writeSchedule(data) {
  return request({
    url: domainUrl + '/writeSchedule',
    data:data,
    method: 'post'
  })
}

//修改日程
export function uptSchedule(data){
	return request({
	  url: domainUrl + '/uptSchedule',
	  data:data,
	  method: 'post'
	})
}

//点击完成
export function doFinish(data){
	return request({
		url:domainUrl + '/doFinish?id=' +data,
		method: 'GET',
		header: { 'content-Type': 'application/json' },
	})
}
