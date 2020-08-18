/**
 * 店铺接口
 */

import request from '@/router/axios'
const api = 'http://106.14.65.8:8080/jst_toKingdee/jst/'

export function fetchList(query) {
  return request({
    url: '/findItemMapping',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: '/deleteShopMapping/' + id,
    method: 'delete'
  })
}

export function addObj(obj) {
  return request({
    url: '/insertShopMapping/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/log/' + id,
    method: 'get'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/log/',
    method: 'put',
    data: obj
  })
}

export function sendLogs(logsList) {
  return request({
    url: '/admin/log/logs',
    method: 'post',
    data: logsList
  })
}
