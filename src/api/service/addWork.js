import axios from 'axios'
import Vue from 'vue'

import domainUrl from '@/config/env';
import url from '@/config/env';

let unitList = (data) => {
  let url = domainUrl + '/custList'
  return axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
    .catch((error) => {
      handelError(error, url)
    })
}


export {
  unitList,
  
}

