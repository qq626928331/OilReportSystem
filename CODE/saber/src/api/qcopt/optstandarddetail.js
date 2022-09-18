import request from '@/router/axios';

//根据主ID获取明细集合
export const getStandarddetailList = (stadardId) => {
  return request({
    url: '/api/qcopt-optblend/optstandarddetail/list',
    method: 'get',
    params: {
      stadardId
    }
  })
}

//更新明细
export const updateStandarddetail = (optStandarddetail) => {
  return request({
    url: '/api/qcopt-optblend/optstandarddetail/update',
    method: 'post',
    data: optStandarddetail
  })
}

//更新明细
export const removeStandarddetail = (ids) => {
  return request({
    url: '/api/qcopt-optblend/optstandarddetail/remove',
    method: 'post',
    data: ids
  })
}

