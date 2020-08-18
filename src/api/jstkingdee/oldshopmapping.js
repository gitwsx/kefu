
import request from '@/router/axios'
import { baseUrl } from '@/config/env';
//配置全局api
//import api from '@/api/API'    //先引入文件
//Vue.prototype.API=api;      //将引入的文件挂载到vue的原型中,引用 this.API.http
const api = "http://106.14.65.8:8080/jst_toKingdee/jst/"
const url =  api + 'findShopMapping';


export function findShop (data) {
  // 查询店铺
  console.log(data)
  console.log(url)
  return request({
    url: url,
    method: 'get',
    params: { "data": "find" }
  })
}

export function delShop (data) {
  // 删除店铺
  return request({
    url: api + 'deleteShopMapping',
    method: 'get',
    params: { data: data }
  })
}

export function updateShop (data) {
  // 更新店铺
  return request({
    url: api + 'updateShopMapping',
    method: 'post',
    data: data
  })
}

export function addShop (data) {
  // 添加店铺
  return request({
    url: api + 'insertItemMapping',
    method: 'post',
    data: data
  })
}

export function findItem (data) {
  // 查询店铺
  return request({
    url: api + 'findItemMapping',
    method: 'get',
    params: { data: data }
  })
}

export function delItem (data) {
  // 删除店铺
  return request({
    url: api + 'deleteItemMapping',
    method: 'get',
    params: { data: data }
  })
}

export function updateItem (data) {
  // 更新店铺
  return request({
    url: api + 'updateItemMapping',
    method: 'post',
    data: data
  })
}

export function addItem (data) {
  // 添加店铺
  return request({
    url: api + 'insertItemMapping',
    method: 'post',
    data: data
  })
}
