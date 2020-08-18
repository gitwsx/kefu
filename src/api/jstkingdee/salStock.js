// import api from './index'
import { axios } from '@/utils/request'

// const api = 'http://192.168.5.186:8085/jst/'

const api = 'http://106.14.65.8:8080/jst_toKingdee/jst/'

// 获取数据
export function getStock (key, date) {
  if (key === 'invoiceError' || key === 'invoiceNotGo') {
    // 汇总前数据
    return axios({
      url: api + 'invoiceList',
      method: 'get',
      params: { data: key }
    })
  } else if (key === 'date') {
    // 时间
    return axios({
      url: api + 'salOutStockListByTime',
      method: 'get',
      params: { data: date }
    })
  } else {
    // 汇总后数据
    return axios({
      url: api + 'getSalOutStockList',
      method: 'get',
      params: { data: key }
    })
  }
}

export function getStockentry () {
  return axios({
    url: api + 'getSalOutStockEntryList',
    method: 'get',
    params: { data: 'SalOutStockEntry0' }
  })
}

export function sendDataId (data) {
  return axios({
    url: api + 'sendSaloutList',
    method: 'get',
    params: { data: data }
  })
}

export function setStorage () {
  return axios({
    url: api + 'exec',
    method: 'get',
    params: { data: 'saleTotal' }
  })
}
