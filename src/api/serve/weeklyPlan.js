import request from '@/router/axios'
import { baseUrl } from '@/config/env';

export function fetchList(query) {
  return request({
    url: '/findItemMapping',
    method: 'get',
    params: query
  })
}