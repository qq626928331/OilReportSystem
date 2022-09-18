/**
 * Created by lenovo on 2021/7/23.
 */

import axios from 'axios'
export const $getJson = function (method) {
  return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: method,
        dataType: 'json',
        crossDomain: true,
        cache: false
      }).then(res => {
      resolve(res)
    }).catch(error => {
    reject(error)
  })
})
}

